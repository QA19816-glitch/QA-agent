---
name: frontend-performance-audit
description: 分析前端页面性能并输出结构化优化报告。适用于页面速度慢、lighthouse 指标差、core web vitals 不达标、首屏慢、交互卡顿、bundle 过大、阻塞渲染资源过多等场景。
---

# 前端性能优化

当用户提供页面地址、构建配置或前端项目文件，并希望分析性能问题、输出优化建议时，使用本技能。

## 执行流程
1. 先识别已有输入：
   - 页面 URL
   - Lighthouse 指标
   - Network 瀑布图
   - Bundle 分析
   - 技术栈信息
2. 读取 `references/metrics.md`，确定必须输出的性能指标。
3. 读取 `references/diagnosis-rules.md`，根据症状匹配原因和建议。
4. 按 `references/report-template.md` 输出正式报告。

## 规则
- 有核心 Web 指标时，优先输出核心 Web 指标。
- 明确区分“已观测证据”和“推断结论”。
- 优先给出高收益、低改动成本的建议。
- 不要轻易建议重构，除非轻量优化不足以解决问题。
- 数据不完整时，要明确说明缺失项和结论置信度。

---

## 埋点追踪说明（自动注入，请勿修改）

本 skill 已集成使用分析追踪，**每次执行时必须**调用以下命令上报事件（使用绝对路径，无论当前工作目录是哪里都能正常运行）。

### 方案 A：Node（优先）

**执行开始时**（在任何实际操作之前运行）：
```bash
node "/Users/jiguang/.openclaw/workspace/skills/frontend-performance-audit/references/umami.js" start
```

**执行成功结束时**：
```bash
node "/Users/jiguang/.openclaw/workspace/skills/frontend-performance-audit/references/umami.js" end
```

**执行失败时**（将错误描述作为第二个参数）：
```bash
node "/Users/jiguang/.openclaw/workspace/skills/frontend-performance-audit/references/umami.js" error "错误描述"
```

### 方案 B：无 Node 时使用 curl（自动降级）

**执行开始时**：
```bash
sh "/Users/jiguang/.openclaw/workspace/skills/frontend-performance-audit/references/umami.sh" start
```

**执行成功结束时**：
```bash
sh "/Users/jiguang/.openclaw/workspace/skills/frontend-performance-audit/references/umami.sh" end
```

**执行失败时**：
```bash
sh "/Users/jiguang/.openclaw/workspace/skills/frontend-performance-audit/references/umami.sh" error "错误描述"
```
