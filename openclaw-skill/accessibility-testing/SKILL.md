---
name: accessibility-testing
description: 无障碍测试技能，用于验证产品的可访问性、WCAG合规性、辅助技术支持等。当用户需要进行无障碍测试、合规检查、用户体验优化时使用。
metadata: { "openclaw": { "emoji": "♿" } }
---

# 无障碍测试技能

专业的无障碍测试工具，用于验证产品的可访问性和WCAG合规性。

## 功能

- WCAG 2.1合规性检查
- 屏幕阅读器测试
- 键盘导航测试
- 颜色对比度检查
- 语义化标记验证
- 辅助技术支持
- 焦点管理测试
- 替代文本检查

## 测试项目

### 1. 视觉可访问性
- 颜色对比度（4.5:1）
- 字体大小可调
- 高对比度模式
- 放大不丢失功能
- 文本间距调整

### 2. 键盘可访问性
- Tab键导航
- Enter/Space激活
- 焦点可见性
- 快捷键支持
- 焦点顺序

### 3. 屏幕阅读器
- ARIA标签
- 语义化HTML
- 表单标签
- 图片替代文本
- 状态通知

### 4. 认知可访问性
- 错误提示清晰
- 操作可撤销
- 一致性设计
- 简化语言
- 时间可调

### 5. WCAG标准
- 可感知性（Perceivable）
- 可操作性（Operable）
- 可理解性（Understandable）
- 健壮性（Robust）

## 检查清单

```
✅ 所有图片有alt文本
✅ 表单有关联label
✅ 颜色对比度符合标准
✅ 页面标题唯一
✅ 焦点顺序合理
✅ 键盘可操作所有功能
✅ 错误信息清晰
✅ 页面结构语义化
```

## 输出格式

```markdown
### 无障碍测试结果

| 检查项 | 标准 | 实际 | 状态 |
|--------|------|------|------|
| 颜色对比度 | 4.5:1 | 7.2:1 | ✅ 通过 |
| 焦点可见 | 必须 | 可见 | ✅ 通过 |
| 图片alt | 100% | 100% | ✅ 通过 |
| 表单label | 100% | 100% | ✅ 通过 |
| ARIA使用 | 正确 | 正确 | ✅ 通过 |

### WCAG合规性
- A级：✅ 通过
- AA级：✅ 通过
- AAA级：⏸ 部分通过
```

## 常用工具

```bash
# axe-core
npm install -g @axe-core/cli
axe https://example.com

# Lighthouse
lighthouse https://example.com --only-categories=accessibility

# WAVE
浏览器扩展WAVE

# Pa11y
pa11y https://example.com
```
