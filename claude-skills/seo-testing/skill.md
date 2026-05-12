---
name: seo-testing
description: >
  SEO 测试：验证页面 TDK、Canonical、robots/sitemap、结构化数据、Core Web Vitals、
  OG/Twitter Cards、Heading 层级、图片 alt、内链等 SEO 配置项是否符合规范。
  触发：用户说"SEO 测试"、"检查 SEO"、"TDK 验证"、"检查 meta"、"Core Web Vitals"。
---

# SEO Testing

验证页面 SEO 配置的完整性和正确性，输出结构化检查报告。

## 执行原则

- 用 curl/Python 抓取页面 HTML，解析 meta/link/script 标签
- Core Web Vitals 用 Lighthouse CLI 或 PageSpeed API 评测
- 输出：通过 ✅ / 警告 ⚠️ / 失败 ❌ 三级结论
- 不改动页面代码，只检测和报告

---

## Phase 0 — 确认检测目标

向用户确认：
1. **目标 URL**（支持多页：首页、详情页、列表页）
2. **检测范围**（全量 / 仅 TDK / 仅技术 SEO）
3. **关键词预期**（可选，用于 TDK 覆盖率验证）

---

## Phase 1 — 基础 Meta 检测

```bash
# 抓取页面 HTML
curl -sL "TARGET_URL" -A "Mozilla/5.0" -o /tmp/seo_page.html

# 用 Python 解析
python3 << 'EOF'
from html.parser import HTMLParser
import re

with open('/tmp/seo_page.html', encoding='utf-8', errors='ignore') as f:
    html = f.read()

checks = {}

# Title
title = re.search(r'<title[^>]*>(.*?)</title>', html, re.DOTALL | re.I)
checks['title'] = title.group(1).strip() if title else None

# Meta description
desc = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\'](.*?)["\']', html, re.I)
checks['description'] = desc.group(1) if desc else None

# Meta keywords
kw = re.search(r'<meta[^>]*name=["\']keywords["\'][^>]*content=["\'](.*?)["\']', html, re.I)
checks['keywords'] = kw.group(1) if kw else None

# Canonical
canon = re.search(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\'](.*?)["\']', html, re.I)
checks['canonical'] = canon.group(1) if canon else None

# Robots meta
robots = re.search(r'<meta[^>]*name=["\']robots["\'][^>]*content=["\'](.*?)["\']', html, re.I)
checks['robots_meta'] = robots.group(1) if robots else 'not set'

# OG tags
og_title = re.search(r'<meta[^>]*property=["\']og:title["\'][^>]*content=["\'](.*?)["\']', html, re.I)
og_desc = re.search(r'<meta[^>]*property=["\']og:description["\'][^>]*content=["\'](.*?)["\']', html, re.I)
og_image = re.search(r'<meta[^>]*property=["\']og:image["\'][^>]*content=["\'](.*?)["\']', html, re.I)
checks['og_title'] = og_title.group(1) if og_title else None
checks['og_description'] = og_desc.group(1) if og_desc else None
checks['og_image'] = og_image.group(1) if og_image else None

# H1
h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.I | re.DOTALL)
checks['h1_count'] = len(h1s)
checks['h1_text'] = [re.sub(r'<[^>]+>', '', h).strip() for h in h1s[:3]]

# 图片 alt
imgs = re.findall(r'<img[^>]*>', html, re.I)
no_alt = [img for img in imgs if 'alt=' not in img.lower()]
checks['images_total'] = len(imgs)
checks['images_no_alt'] = len(no_alt)

# 结构化数据
ld_json = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html, re.I | re.DOTALL)
checks['structured_data_count'] = len(ld_json)

for k, v in checks.items():
    print(f"{k}: {v}")
EOF
```

---

## Phase 2 — 技术 SEO 检测

```bash
BASE_URL="https://example.com"

# robots.txt
curl -s "$BASE_URL/robots.txt" | head -20

# sitemap.xml
curl -s "$BASE_URL/sitemap.xml" | head -20

# HTTPS 重定向
curl -sI "http://$(echo $BASE_URL | sed 's|https://||')" | grep -i location

# 页面加载速度（响应时间）
curl -w "total: %{time_total}s | TTFB: %{time_starttransfer}s\n" -o /dev/null -s "$BASE_URL"
```

---

## Phase 3 — Core Web Vitals（需安装 Lighthouse）

```bash
# 检查是否有 lighthouse
npx lighthouse --version 2>/dev/null || npm install -g lighthouse

# 运行 Lighthouse
npx lighthouse "TARGET_URL" \
  --only-categories=performance,seo,accessibility \
  --output=json \
  --output-path=/tmp/lighthouse_report.json \
  --chrome-flags="--headless --no-sandbox" \
  --quiet

# 解析结果
python3 << 'EOF'
import json
with open('/tmp/lighthouse_report.json') as f:
    r = json.load(f)

cats = r.get('categories', {})
audits = r.get('audits', {})

print("=== Lighthouse 评分 ===")
for k, v in cats.items():
    score = round(v['score'] * 100) if v['score'] else 'N/A'
    print(f"  {k}: {score}")

print("\n=== SEO 关键项 ===")
seo_keys = ['meta-description', 'title', 'hreflang', 'canonical', 'robots-txt',
            'tap-targets', 'font-size', 'link-text', 'crawlable-anchors']
for k in seo_keys:
    if k in audits:
        a = audits[k]
        status = '✅' if a.get('score', 0) == 1 else ('⚠️' if a.get('score', 0) > 0 else '❌')
        print(f"  {status} {a['title']}")
EOF
```

---

## Phase 4 — 检测清单与评分

| 检测项 | 标准 | 结果 |
|--------|------|------|
| Title | 10-70 字，含关键词 | - |
| Meta Description | 70-160 字 | - |
| H1 | 唯一，含核心关键词 | - |
| Canonical | 存在且指向自身 | - |
| robots.txt | 可访问，未封锁重要页面 | - |
| sitemap.xml | 存在，包含目标页面 | - |
| HTTPS | 全站 HTTPS，HTTP 301 重定向 | - |
| OG Tags | og:title/description/image 齐全 | - |
| 结构化数据 | 有效 JSON-LD | - |
| 图片 alt | 所有图片有 alt | - |
| Core Web Vitals | LCP<2.5s, FID<100ms, CLS<0.1 | - |
| 页面 TTFB | <800ms | - |

---

## Phase 5 — 输出报告

```
## SEO 测试报告
- 测试页面：URL
- 测试时间：YYYY-MM-DD

### 基础配置
✅ Title: "xxx" (28字)
✅ Description: "xxx" (95字)
❌ Canonical: 缺失
⚠️ H1: 2个（应唯一）

### 技术 SEO
✅ HTTPS 重定向正常
✅ robots.txt 可访问
❌ sitemap.xml 404

### Core Web Vitals
- Performance: 72
- SEO: 89

### 问题汇总（需修复 X 项，建议 X 项）
...
```
