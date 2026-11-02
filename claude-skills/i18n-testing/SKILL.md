---
name: i18n-testing
description: 国际化/本地化测试。Use when the user mentions 国际化、i18n、多语言、翻译未覆盖、语言切换、RTL、货币/日期/数字格式、时区、翻译 key 裸露到页面。典型场景：禅道 #40 这种"菜单显示 menu.xxx 国际化 key"的问题。
---

# i18n-testing — 国际化测试技能

## 触发场景

- 页面/菜单/按钮文案出现 `menu.xxx.yyy` 这样的裸 key
- 切语言（中/英/日/阿/西等）后部分文案没变
- 金额/日期/时间/数字格式未随 locale 变（`1,000.00` vs `1.000,00`）
- 时区偏差导致时间显示错误（UTC vs 本地）
- RTL 语言（阿拉伯/希伯来）排版错乱
- 长文案撑破 UI（德语、俄语常见）
- 用户上传的非 ASCII 字符落库/搜索/排序有问题

## 输入

- 站点 URL + 要覆盖的语言清单（默认 zh-CN / en-US / 按项目补）
- 菜单/关键页面 URL 列表（或让 playwright-pro 自己爬）
- 可选：i18n 资源文件路径（`locales/*.json`、`messages/*.properties`），能做"键覆盖率"对照

## 执行步骤

1. **静态检查**（有资源文件时）
   - 扫描源码 `t('xxx')` / `i18n.t(...)` / `$t(...)` 的 key
   - 比对资源文件，输出缺失键矩阵（按语言 × 按 key）
   - 检查资源文件 JSON 语法、key 重复、空串

2. **动态检查**（用 playwright-pro）
   - 逐语言切换，截图关键页
   - 正则抓"裸 key"：`/\b[a-z][a-zA-Z0-9]*\.[a-z][a-zA-Z0-9.]+\b/` 在 DOM 文本节点里出现即可疑
   - 对比不同语言版本的 DOM 文本是否真的变了
   - 金额/日期：用 `Intl.NumberFormat` / `Intl.DateTimeFormat` 预期值 vs 页面实际值

3. **布局检查**
   - 英文页截图 vs 德语/俄语页截图（visual-regression-testing）
   - 检查溢出、截断、换行异常

4. **时区 / locale API 检查**（可选）
   - 后端：同一数据在 `Accept-Language: zh-CN` vs `en-US` 的返回差异
   - 时间戳是否带时区信息

## 输出

- 缺失 key 矩阵（CSV / 表格）
- 每语言截图对照页
- 问题清单分类：`missing-key` / `not-translated` / `format-mismatch` / `layout-broken` / `rtl-broken` / `bare-key-leak`
- 喂给 qa-bug-triage，按 feedback_bug_template 规范提单

## 判断优先级

- P0：交易/支付/风控页文案未翻译
- P1：核心功能页裸 key / 格式错误
- P2：非核心页长文案溢出
- P3：文案风格/大小写不一致

## 常见坑

- 只看首屏不够，懒加载模块翻译资源可能 404
- `<title>` / meta description 经常漏翻
- 报错弹窗、Toast、Form 校验消息最容易漏
- 数据来自后端的字段（分类、状态）通常后端不做 i18n

记得最终报告走 feishu-doc，默认管理权给大王。
