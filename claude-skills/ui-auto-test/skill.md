---
name: ui-auto-test
description: >
  Mac 本地 UI 自动化测试：给定 URL 和测试场景，用 Playwright 拉起真实 Chromium 浏览器，
  执行点击/填表/断言，截图留存失败证据，输出结构化测试报告。
  触发：用户说"跑 UI 自动化"、"帮我自动化测测"、"用浏览器跑一下"、"自动化回归"、"UI 冒烟"。
---

# UI Auto Test

在 Mac 本地用 Playwright 驱动真实 Chromium 执行 UI 自动化测试，无需预先搭建项目。

## 执行原则

- 每次执行前检查 Playwright 可用性，不可用则自动安装
- 优先 headless，需截图或调试时用 headed
- 写内联脚本，不依赖外部测试框架配置
- 失败必截图，截图路径必须报告给用户
- 断言失败 ≠ 环境问题，要区分并说明
- 不得修改生产数据，增删改操作需用户明确授权

---

## Phase 0 — 环境检查与准备

```bash
# 检查 Node.js
node --version || echo "Node.js 未安装，请先安装 Node.js"

# 检查 Playwright
npx playwright --version 2>/dev/null || echo "需要安装 Playwright"

# 安装 Playwright（如未安装）
npm init -y && npm install @playwright/test
npx playwright install chromium
```

> 如果已有项目目录，在项目目录下执行；否则在 /tmp/pw-autotest/ 下临时运行。

---

## Phase 1 — 收集测试信息

开始前向用户确认：
1. **目标 URL** — 要测试的页面地址
2. **测试场景** — 要验证什么（流程/功能/页面）
3. **账号凭据** — 是否需要登录（账号/密码）
4. **断言预期** — 成功的标准是什么（文本、元素、URL）

如果用户直接给 URL 没说场景，默认执行**冒烟测试**（页面可访问、关键元素存在、无 JS 报错）。

---

## Phase 2 — 编写并执行测试脚本

### 工作目录

```bash
mkdir -p /tmp/pw-autotest && cd /tmp/pw-autotest
npm init -y 2>/dev/null
npm install @playwright/test 2>/dev/null
npx playwright install chromium 2>/dev/null
```

### 脚本模板（内联，无需配置文件）

```javascript
// /tmp/pw-autotest/test.spec.js
const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: 'zh-CN',
  });
  const page = await context.newPage();
  
  const results = [];
  const screenshotDir = '/tmp/pw-autotest/screenshots';
  require('fs').mkdirSync(screenshotDir, { recursive: true });
  
  async function check(name, fn) {
    try {
      await fn();
      results.push({ name, status: 'PASS' });
      console.log(`✅ PASS: ${name}`);
    } catch (e) {
      const shot = `${screenshotDir}/${name.replace(/\s+/g, '_')}.png`;
      await page.screenshot({ path: shot, fullPage: true });
      results.push({ name, status: 'FAIL', error: e.message, screenshot: shot });
      console.log(`❌ FAIL: ${name}\n   ${e.message}\n   截图: ${shot}`);
    }
  }

  // ========== 测试用例（根据用户需求替换） ==========

  await check('页面可访问', async () => {
    await page.goto('TARGET_URL', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForSelector('body');
  });

  await check('无 JS 报错', async () => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.waitForTimeout(2000);
    if (errors.length > 0) throw new Error(errors.join('; '));
  });

  // ========== 用例结束 ==========

  await browser.close();
  
  const pass = results.filter(r => r.status === 'PASS').length;
  const fail = results.filter(r => r.status === 'FAIL').length;
  console.log(`\n=== 结果汇总: ${pass} 通过 / ${fail} 失败 ===`);
  results.filter(r => r.status === 'FAIL').forEach(r => {
    console.log(`  ❌ ${r.name}: ${r.error}`);
    if (r.screenshot) console.log(`     截图: ${r.screenshot}`);
  });
})();
```

### 执行

```bash
cd /tmp/pw-autotest && node test.spec.js
```

---

## Phase 3 — 常用交互模板

### 登录流程
```javascript
await check('登录', async () => {
  await page.goto('LOGIN_URL');
  await page.fill('input[name="username"]', 'USER');
  await page.fill('input[name="password"]', 'PASS');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/dashboard**', { timeout: 10000 });
});
```

### 表单提交
```javascript
await check('表单提交', async () => {
  await page.fill('SELECTOR', 'VALUE');
  await page.click('SUBMIT_SELECTOR');
  await expect(page.locator('SUCCESS_SELECTOR')).toBeVisible({ timeout: 5000 });
});
```

### 弹窗/Toast 验证
```javascript
await check('成功提示', async () => {
  await page.locator('TOAST_SELECTOR').waitFor({ state: 'visible', timeout: 5000 });
  const text = await page.locator('TOAST_SELECTOR').innerText();
  if (!text.includes('成功')) throw new Error(`提示文案异常: ${text}`);
});
```

### 列表不为空
```javascript
await check('列表有数据', async () => {
  const count = await page.locator('LIST_ITEM_SELECTOR').count();
  if (count === 0) throw new Error('列表为空');
});
```

### 截图留存（无论成败）
```javascript
await page.screenshot({ path: '/tmp/pw-autotest/screenshots/full_page.png', fullPage: true });
```

---

## Phase 4 — 输出报告

执行完成后，用以下格式汇报：

```
## UI 自动化测试报告
- 测试时间：YYYY-MM-DD HH:mm
- 目标：URL
- 环境：浏览器版本

| 用例 | 结果 | 备注 |
|------|------|------|
| 页面可访问 | ✅ PASS | |
| 登录流程 | ❌ FAIL | 提交后无跳转 |

失败截图：
- /tmp/pw-autotest/screenshots/xxx.png

结论：X 通过 / X 失败，建议...
```

如飞书报告需求，调用 feishu-doc skill 上传截图并写入文档。

---

## 常见问题处理

| 问题 | 原因 | 解决 |
|------|------|------|
| `EACCES` 安装失败 | 权限不足 | `sudo npm install` 或指定 prefix |
| 元素找不到 | 选择器错误 / 页面未加载 | 加 `waitForSelector` / 增大 timeout |
| 截图全黑 | headless 渲染问题 | 改 `headless: false` 调试 |
| 网络超时 | 环境网络问题 | 检查 VPN / 代理 |
| 登录失败 | 验证码 / 二次验证 | 提前告知用户手动处理 |
