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


## 软件测试大礼包（已扩容）

仓库现已包含一整套更大的 testing / QA skill 集合，覆盖：

- 功能测试
- 接口测试
- 自动化测试
- E2E / Playwright
- APP / Appium
- H5 / 响应式测试
- 性能测试
- 安全测试
- Bug 排查
- 测试报告 / 回归规划

### 推荐直接下载

- `dist/testing-skills-suite-v2.zip`：当前工作区中的测试技能源码总包
- `dist/qa-skill-suite-v1.zip`：最初那套 11 个自定义 QA skills
- `inventory/TESTING_SKILLS.md`：测试技能完整清单与状态
- `inventory/testing-skills-manifest.json`：结构化测试技能清单

说明：
- `skills/` 目录中包含当前工作区里的测试相关 skill 源码。
- 某些 OpenClaw 自带 bundled skills（如 `github`、`tmux`、`clawhub`、`coding-agent`）在当前机器已 ready，但不会把 OpenClaw 自带源码整包复制进仓库；会通过清单记录状态。


## 最终实战版（核心 20 + 工作补充）

现在仓库里最新、最值得直接下载的是这一套：

- `dist/qa-work-skills-final-v3.zip`：终版总包
- `inventory/CORE_20_TESTING_SKILLS.md`：长期保留的 20 个测试核心 skills
- `inventory/WORK_UTILITY_SKILLS.md`：PDF / 图片 / 视频 / 转录等工作常用补充 skills
- `inventory/FINAL_SKILLS_CHECK.md`：最终检查清单
- `inventory/ALL_SKILLS.md`：这台机器当前可见的完整 skills 总表

说明：
- 终版总包内含当前工作区全部 skill 源码，以及多份 inventory 清单。
- 某些 OpenClaw bundled skills 是系统自带的，仓库不复制其系统源码，但会在清单中标出 ready 状态。
- `gifgrep`、`songsee` 目前由于本机包源不可用，未能成功 ready，已在最终清单中注明。


## IT / 测试负责人增强版

如果你的工作不只是做测试，还会碰到汇报、文档、表格、项目协作、Jira/Confluence、日志排障，这一版更适合：

- `dist/qa-it-lead-skills-v4.zip`：当前最完整的 IT / 测试负责人总包
- `inventory/IT_LEAD_SKILLS_ADDED.md`：新增的 PPT / Excel / Jira / Confluence / 日志 / 周报 skills 清单
- `inventory/FINAL_FULL_CHECK_IT.md`：包含这批新增技能的最终检查清单

这一版额外纳入：
- PPT / 演示文稿：`pptx-generator`、`openclaw-slides`、`powerpoint-pptx`
- Excel：`automate-excel`、`excel-xlsx`
- Atlassian：`atlassian-jira`、`atlassian-confluence`
- 日志/汇报：`openclaw-log-analyzer`、`weekly-report-writer`、`smart-weekly-report`、`daily-report-writer`
- 安全与秘钥：`1password`


## BUG / 缺陷管理 / APP 移动端增强版

这一版把缺陷管理和移动端测试相关的能力也补齐了，适合测试负责人、质量负责人、移动端测试、发布管理：

- `dist/qa-it-lead-skills-v5.zip`：当前最新总包
- `inventory/BUG_MOBILE_SKILLS_ADDED.md`：缺陷管理 / APP 移动端测试清单
- `inventory/FINAL_FULL_CHECK_BUG_MOBILE.md`：含这批技能的最终检查清单

这一版额外纳入：
- 缺陷管理：`jira`、`linear`、`mantis-manager`、`qa-bug-triage`、`bug-investigation`
- 移动端：`mobile-appium-test`、`midscene-android-automation`、`android-adb`、`ios-simulator`
- 发版 / 分发：`testflight`、`fastlane`
- 视觉 / 稳定性：`visual-regression-testing`、`incident-fupan`、`incident-response`、`crash-fixer`、`ci-cd`


## 监控 / DB / API / 抓包增强版（v6）

这一版继续往“测试负责人 + IT 负责人”的排障与联调工具箱扩：

- `dist/qa-it-lead-skills-v6.zip`：当前最新总包
- `inventory/OPS_API_DB_SKILLS_ADDED.md`：监控 / 日志 / 数据库 / API / 抓包技能清单
- `inventory/FINAL_FULL_CHECK_OPS_API_DB.md`：包含这批技能的最终检查清单

这一版额外纳入：
- 监控 / 观测：`monitoring`、`logging-observability`、`grafana-lens`、`grafana-api`、`prometheus`、`promql-cli`、`kibana`
- 数据库：`sql-toolkit`、`db-readonly`、`mysqladm`、`postgres-mcp-skill`
- API 治理：`openapi-spec`、`api-doc-generator`、`sovereign-api-mock-generator`、`postman`
- 抓包 / 网络：`tcpdump`、`wireshark-analysis`
- 系统依赖：`mitmproxy`、`tshark`、`newman`、`psql`、`redis-cli`、`mysql`

备注：`redis-skill` 由于 ClawHub 下载限流，本轮仍未成功拉取，已在清单中标注。


## 平台 / 网关 / MQ / K8s / CI-CD 增强版（v7）

这一版把测试负责人通用工具箱的最后一块也补上了，偏平台、基础设施、容器编排、消息队列、CI/CD：

- `dist/qa-it-lead-skills-v7.zip`：当前最新总包
- `inventory/PLATFORM_CICD_K8S_SKILLS_ADDED.md`：平台 / 网关 / MQ / K8s / CI-CD 技能清单
- `inventory/FINAL_FULL_CHECK_PLATFORM_V7.md`：包含这批技能的最终检查清单

这一版额外纳入：
- Docker / K8s / Helm：`docker-skill`、`docker-compose`、`docker-diag`、`kubectl`、`k8s`、`kubernetes-devops`、`helm`
- MQ / 网关：`kafka`、`mqtt-client`、`rabbitmq-client-guide`、`nginx`、`traefik`、`initial-traefik`
- 云服务 / IaC：`aws-infra`、`cloudflare-toolkit`、`cloudflare-api`、`cloudflare-tunnel-manager`、`terraform-iac`
- CI/CD：`github-actions`、`cicd-pipeline`、`gitlab`、`jenkins`

说明：
- 一部分 skill 已装入工作区并会随 ZIP 一起分发，但当前 `openclaw skills list` 不一定逐个暴露出来；清单里已标记为 `installed-dir-unlisted`。
- 本机已补装 `kubectl`、`helm`、`k9s`、`terraform`、`aws`、`cloudflared`、`kcat`、`nginx`、`MQTTX`。


## SEO / 埋点 / 神策增强版（v8）

这一版把 SEO 测试、Lighthouse、Core Web Vitals、埋点审计和神策埋点也补齐了：

- `dist/qa-it-lead-skills-v8.zip`：当前最新总包
- `dist/sensors-analytics-tracking.skill`：神策埋点专用单独 skill 包
- `inventory/SEO_TRACKING_SKILLS_ADDED.md`：SEO / 埋点 / 神策技能清单
- `inventory/FINAL_FULL_CHECK_SEO_TRACKING.md`：包含这批技能的最终检查清单

这一版额外纳入：
- SEO：`seo-optimizer`、`website-seo`、`pls-seo-audit`、`shelly-seo-analyzer`
- Lighthouse / 性能：`web-auto-analyzer`、`webperf-core-web-vitals`、`lighthouse CLI`
- 埋点 / 分析：`check-analytics`、`add-analytics`、`analytics-tracking-2`、`cs-analytics-tracking`、`sw-analytics-tracking`
- 神策专用：`sensors-analytics-tracking`

说明：
- 神策没有找到足够靠谱的现成公开 skill，所以仓库里额外附带了我为你补的 `sensors-analytics-tracking` 自定义技能。
- 这套适合 Web/H5/App 的事件方案设计、埋点验收、漏埋/错埋/重复埋点排查，以及打通神策平台前的事件模型整理。
