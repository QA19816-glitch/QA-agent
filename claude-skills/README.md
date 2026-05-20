# Claude Code QA Skills

专为 **Claude Code CLI** 设计的 QA 技能库，由大王（QA负责人）维护。

## 包含技能（46个）

### 本地原生 Claude Code 技能（14个）
| 技能 | 描述 |
|------|------|
| cross-browser-testing | 跨浏览器兼容性测试 |
| data-quality-test | 数据质量验证（前端↔后端一致性） |
| exploratory-testing | 探索性测试，边界/异常路径发现 |
| frontend-performance-audit | 前端性能分析，Lighthouse/CWV |
| i18n-testing | 国际化/多语言/RTL 测试 |
| ios-simulator | iOS 模拟器自动化（simctl + idb） |
| pdf | PDF 生成/提取/审阅 |
| qa-run | E2E QA 流水线编排（需求→用例→执行→报告） |
| security-scan-agent | OWASP Top 10 安全扫描（SQL 注入/XSS/越权） |
| seo-testing | SEO 配置验证（TDK/robots/结构化数据） |
| tracking-testing | 埋点/事件追踪测试 |
| ui-auto-test | Mac 本地 UI 自动化（Playwright + Chromium） |
| visual-regression-testing | 视觉回归对比测试 |

### 迁移自 OpenClaw 的技能（32个）
accessibility-testing · api-performance-testing · bug-investigation · daily-report-writer · data-analyst · database-testing · diffs · excel-xlsx · feishu-doc · feishu-drive · feishu-perm · feishu-wiki · gstack-qa · mobile-appium-test · playwright-pro · qa-api-runner · qa-bug-triage · qa-prd-analyzer · qa-regression-planner · qa-release-gate-checker · qa-test-data-factory · qa-test-point-extractor · qa-test-report-generator · qa-testcase-writer · qa-traceability-mapper · qa-web-e2e-runner · security-testing · summarize · ux-qa-gate · web-screenshot · weekly-report-writer · zentao-qa-fullflow

### 从 Codex 迁移的技能（1个）
qa-zentao-defect-workflow

## 安装

```bash
# 克隆仓库
git clone https://github.com/QA19816-glitch/QA-agent.git
cd QA-agent

# 安装全部技能
bash claude-skills/scripts/install.sh all

# 安装单个技能
bash claude-skills/scripts/install.sh ui-auto-test
```

安装后重启 Claude Code 即可在对话中使用技能。

## 目录结构

```
claude-skills/
├── README.md             # 本文件
├── scripts/
│   └── install.sh        # 一键安装脚本
├── _lib/                 # 共享库（技能间复用代码）
└── <skill-name>/
    ├── skill.md          # 技能定义（YAML frontmatter + 执行指南）
    ├── references/       # 参考资料
    ├── assets/           # 模板/资源
    └── scripts/          # 辅助脚本
```

## 技能格式

每个技能的 `skill.md` 包含：
```yaml
---
name: skill-name
description: >
  触发条件和功能描述
---
# 技能内容
```

## 与其他技能库的关系

| 目录 | 运行时 | 说明 |
|------|--------|------|
| `claude-skills/` | Claude Code CLI | **本目录**，大王当前主力 |
| `codex-skills/` | Codex（已弃用） | 历史备份 |
| `skills/` | OpenClaw（已弃用） | 历史备份，248个技能 |
