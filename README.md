# QA Agent Skill Suite

一套面向软件测试 / QA 的全链路 OpenClaw Skills。

## 包含内容

### Skills 源码
位于 `skills/` 目录：

- `qa-prd-analyzer`
- `qa-test-point-extractor`
- `qa-testcase-writer`
- `qa-traceability-mapper`
- `qa-test-data-factory`
- `qa-api-runner`
- `qa-web-e2e-runner`
- `qa-bug-triage`
- `qa-test-report-generator`
- `qa-release-gate-checker`
- `qa-regression-planner`

### 打包产物
位于 `dist/` 目录：

- `qa-skill-suite-v1.zip`：整套打包下载
- `qa-skill-suite/*.skill`：每个技能的单独 `.skill` 包

## 适用场景

这套技能覆盖典型 QA 全链路：

1. 读取需求文档 / PRD
2. 提取测试点
3. 编写测试用例
4. 生成追踪矩阵
5. 设计测试数据
6. 执行 API 测试
7. 执行 Web E2E 测试
8. 缺陷整理与分级
9. 输出测试报告
10. 发版闸门判断
11. 回归范围规划

## 获取方式

### 方式 1：直接下载 ZIP
在 GitHub 页面点击 **Code → Download ZIP**。

### 方式 2：克隆仓库
```bash
git clone https://github.com/QA19816-glitch/QA-agent.git
```

## OpenClaw 使用方式

把 `skills/` 目录下的技能放进你的 OpenClaw workspace 的 `skills/` 目录即可。

常见路径示例：

```bash
~/.openclaw/workspace/skills/
```

放进去后，重新开一个新会话（或重启 gateway）让技能被加载。

## 目录结构

```text
QA-agent/
├── README.md
├── skills/
│   ├── qa-prd-analyzer/
│   ├── qa-test-point-extractor/
│   ├── qa-testcase-writer/
│   ├── qa-traceability-mapper/
│   ├── qa-test-data-factory/
│   ├── qa-api-runner/
│   ├── qa-web-e2e-runner/
│   ├── qa-bug-triage/
│   ├── qa-test-report-generator/
│   ├── qa-release-gate-checker/
│   └── qa-regression-planner/
└── dist/
    ├── qa-skill-suite-v1.zip
    └── qa-skill-suite/
```

## 备注

这套技能目前偏向通用 QA 工作流。如果你有团队自己的：
- 用例模板
- 缺陷等级定义
- 准出标准
- 行业专项场景（电商 / 金融 / ERP / OA / AI 产品）

建议继续做定制化增强。


## 本机 Skills 全量清单

仓库里还附带了一份从当前机器导出的完整技能清单：

- `inventory/ALL_SKILLS.md`：完整人类可读列表（含功能、状态、来源）
- `inventory/all-skills-manifest.json`：结构化 JSON 清单
- `dist/qa-agent-complete-bundle.zip`：包含上面清单 + `dist/qa-skill-suite-v1.zip` 的总压缩包

> 注意：这里包含的是“本机可见 skills 的清单元数据”，不是把 OpenClaw 自带的所有 bundled skill 源码都复制进仓库。
