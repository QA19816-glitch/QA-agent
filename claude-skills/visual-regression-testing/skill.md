---
name: visual-regression-testing
description: >
  视觉回归测试：对比两个版本/环境的页面截图，检测 UI 走样、样式错位、元素丢失、颜色偏差。
  触发：用户说"视觉回归"、"UI 对比"、"页面截图对比"、"看看改版有没有视觉问题"、"和上个版本比一下"。
---

# Visual Regression Testing

用截图对比方式发现 UI 变更引入的视觉问题，适合版本发布前和改版后的快速扫描。

## 执行原则

- 对比维度：同一页面的两个版本（新旧版本 / 测试环境 vs 生产环境）
- 差异阈值：像素差 > 0.1% 标记为警告，> 1% 标记为失败
- 截图范围：全页 full-page（含折叠区域）
- 输出：差异高亮图 + 差异百分比 + 建议

---

## Phase 0 — 确认对比目标

向用户确认：
1. **对比页面列表**（首页 / 详情页 / 个人中心 / 等）
2. **基准版本**（旧版 URL 或本地截图）
3. **对比版本**（新版 URL）
4. **设备/分辨率**（默认 1440×900 桌面 + 375×812 移动端）

---

## Phase 1 — 安装依赖

```bash
mkdir -p /tmp/vrt && cd /tmp/vrt
npm init -y 2>/dev/null
npm install @playwright/test pixelmatch pngjs 2>/dev/null
npx playwright install chromium 2>/dev/null
```

---

## Phase 2 — 批量截图

```javascript
// /tmp/vrt/screenshot.js
const { chromium } = require('@playwright/test');
const fs = require('fs');

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'profile', path: '/profile' },
  // 根据实际页面补充
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile',  width: 375,  height: 812 },
];

async function capture(baseUrl, label) {
  const browser = await chromium.launch({ headless: true });
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    for (const p of PAGES) {
      await page.goto(baseUrl + p.path, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(500); // 等动画稳定
      const dir = `/tmp/vrt/shots/${label}`;
      fs.mkdirSync(dir, { recursive: true });
      await page.screenshot({ path: `${dir}/${p.name}-${vp.name}.png`, fullPage: true });
      console.log(`截图: ${label}/${p.name}-${vp.name}.png`);
    }
    await ctx.close();
  }
  await browser.close();
}

// 用法：BASE_URL=xxx COMPARE_URL=yyy node screenshot.js
const baseUrl    = process.env.BASE_URL    || 'https://base-web-test.guadd.fun';
const compareUrl = process.env.COMPARE_URL || 'https://base-web.guadd.fun';

(async () => {
  await capture(baseUrl, 'baseline');
  await capture(compareUrl, 'current');
  console.log('截图完成，运行 diff.js 对比');
})();
```

---

## Phase 3 — 像素对比

```javascript
// /tmp/vrt/diff.js
const fs = require('fs');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

const dir = '/tmp/vrt/shots';
const diffDir = '/tmp/vrt/diffs';
fs.mkdirSync(diffDir, { recursive: true });

const results = [];

function compare(name) {
  const baseline = PNG.sync.read(fs.readFileSync(`${dir}/baseline/${name}`));
  const current  = PNG.sync.read(fs.readFileSync(`${dir}/current/${name}`));

  const { width, height } = baseline;
  if (current.width !== width || current.height !== height) {
    results.push({ name, status: '⚠️ 尺寸变化', diff: 'N/A',
      baselineSize: `${width}x${height}`, currentSize: `${current.width}x${current.height}` });
    return;
  }

  const diffImg = new PNG({ width, height });
  const numDiff = pixelmatch(baseline.data, current.data, diffImg.data, width, height, { threshold: 0.1 });
  const diffPct = ((numDiff / (width * height)) * 100).toFixed(2);

  const diffPath = `${diffDir}/${name}`;
  fs.writeFileSync(diffPath, PNG.sync.write(diffImg));

  const status = numDiff === 0 ? '✅ 无差异' : diffPct > 1 ? '❌ 差异较大' : '⚠️ 轻微差异';
  results.push({ name, status, diff: `${diffPct}%`, diffPath });
}

const files = fs.readdirSync(`${dir}/baseline`).filter(f => f.endsWith('.png'));
files.forEach(compare);

console.log('\n=== 视觉回归对比结果 ===');
results.forEach(r => {
  console.log(`${r.status} ${r.name}  差异=${r.diff}`);
  if (r.diffPath) console.log(`  差异图: ${r.diffPath}`);
});

const failures = results.filter(r => r.status.includes('❌'));
console.log(`\n汇总: ${results.length} 页 / ❌ ${failures.length} 失败 / ⚠️ ${results.filter(r=>r.status.includes('⚠️')).length} 警告`);
```

```bash
cd /tmp/vrt
BASE_URL="https://test.example.com" COMPARE_URL="https://prod.example.com" node screenshot.js
node diff.js
```

---

## Phase 4 — 输出报告

```
## 视觉回归测试报告
- 基准：旧版/测试环境
- 对比：新版/生产环境
- 时间：YYYY-MM-DD

| 页面 | 分辨率 | 差异 | 结论 |
|------|--------|------|------|
| home | 1440px | 0% | ✅ |
| profile | 375px | 3.2% | ❌ |

差异截图：/tmp/vrt/diffs/profile-mobile.png

结论：X 页无问题，X 页需人工复核
```
