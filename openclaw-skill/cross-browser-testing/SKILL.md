---
name: cross-browser-testing
description: 跨浏览器测试技能，用于验证产品在不同浏览器、操作系统、设备上的兼容性。当用户需要进行浏览器兼容性测试时使用。
metadata: { "openclaw": { "emoji": "🌐" } }
---

# 跨浏览器测试技能

专业的浏览器兼容性测试工具，用于验证产品在不同环境中的兼容性。

## 功能

- 多浏览器测试
- 多版本测试
- 响应式测试
- 操作系统兼容
- 设备兼容
- 分辨率测试
- 功能一致性
- 样式一致性

## 测试矩阵

### 浏览器覆盖
| 浏览器 | Windows | macOS | Linux | iOS | Android |
|--------|---------|-------|-------|-----|---------|
| Chrome | ✅ | ✅ | ✅ | ✅ | ✅ |
| Firefox | ✅ | ✅ | ✅ | ✅ | ✅ |
| Safari | - | ✅ | - | ✅ | - |
| Edge | ✅ | ✅ | - | - | ✅ |
| Safari iOS | - | - | - | ✅ | - |
| Chrome Mobile | - | - | - | ✅ | ✅ |

### 版本覆盖
- Chrome: 最新版 + 近2个主要版本
- Firefox: 最新版 + 近2个主要版本
- Safari: 最新版 + 近1个主要版本
- Edge: 最新版 + 近1个主要版本

## 测试项目

### 1. 功能测试
- 核心功能
- 交互操作
- 表单提交
- 数据展示
- 错误处理

### 2. 样式测试
- 布局一致性
- 字体渲染
- 颜色显示
- 动画效果
- 响应式布局

### 3. 性能测试
- 页面加载
- 渲染速度
- 内存占用
- JavaScript执行

### 4. 兼容性测试
- CSS特性支持
- JavaScript API
- HTML5特性
- 字体支持
- 图片格式

## 输出格式

```markdown
### 跨浏览器测试结果

| 浏览器 | 版本 | 系统 | 功能 | 样式 | 性能 | 状态 |
|--------|------|------|------|------|------|------|
| Chrome | 120 | Win11 | ✅ | ✅ | ✅ | 通过 |
| Firefox | 121 | Win11 | ✅ | ✅ | ✅ | 通过 |
| Safari | 17 | macOS | ✅ | ✅ | ✅ | 通过 |
| Edge | 120 | Win11 | ✅ | ✅ | ✅ | 通过 |

### 问题汇总
- Safari: Flexbox间隙问题
- IE11: 不支持ES6
```

## 常用工具

```bash
# BrowserStack（需要账号）

# Sauce Labs（需要账号）

# Playwright多浏览器
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Selenium Grid
```
