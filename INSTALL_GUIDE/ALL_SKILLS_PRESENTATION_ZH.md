# QA-agent Skills 安装清单及一键打包地址（248 演讲分享版）

这是一份面向“演讲分享 / 团队介绍 / 安装说明”的中文整理版。它不是简单堆技能名，而是把 **248 个 skills 按用途重新分组**，让人一眼看懂：这些 skill 到底分哪几类、适合什么场景、重点该讲哪些。

## 📌 一、GitHub 官方地址及核心清单入口
- GitHub 仓库主页：https://github.com/QA19816-glitch/QA-agent
- 全量技能目录：https://github.com/QA19816-glitch/QA-agent/blob/main/INSTALL_GUIDE/ALL_SKILLS.md
- 测试专项清单：https://github.com/QA19816-glitch/QA-agent/blob/main/INSTALL_GUIDE/TESTING_SPECIALTIES.md
- 非测试专项清单：https://github.com/QA19816-glitch/QA-agent/blob/main/INSTALL_GUIDE/NON_TESTING_SPECIALTIES.md
- 建议安装清单：https://github.com/QA19816-glitch/QA-agent/blob/main/INSTALL_GUIDE/RECOMMENDED_INSTALL_PACKS.md

## 📦 二、一键打包下载地址
- 全量技能包（248 个）：https://raw.githubusercontent.com/QA19816-glitch/QA-agent/main/dist/all-skills-bundle-v1.zip
- 测试专项包（127 个）：https://raw.githubusercontent.com/QA19816-glitch/QA-agent/main/dist/testing-specialties-skills-bundle-v1.zip
- 非测试专项包（121 个）：https://raw.githubusercontent.com/QA19816-glitch/QA-agent/main/dist/non-testing-specialties-skills-bundle-v1.zip
- 建议安装包（10 个）：https://raw.githubusercontent.com/QA19816-glitch/QA-agent/main/dist/essential-setup-skills-bundle-v1.zip

## 🧪 三、软件测试专项 Skills（共 127 个）
### 1. 需求分析 / 测试设计 / 用例 / 追踪 / 报告（9 个）
把需求、流程和规格说明转成测试点、测试用例、追踪矩阵和测试报告，适合测试前置和质量闭环。

**包含技能：**
afrexai-qa-test-plan、qa-prd-analyzer、qa-regression-planner、qa-release-gate-checker、qa-test-data-factory、qa-test-point-extractor、qa-test-report-generator、qa-testcase-writer、qa-traceability-mapper

**重点可讲：**
- `qa-prd-analyzer`：把 PRD、飞书文档或产品说明拆成结构化测试需求，适合需求评审和测试前置。

### 2. 功能测试 / 回归测试 / 巡检 / 缺陷（17 个）
覆盖日常功能验证、回归检查、线上巡检、缺陷整理与事故复盘，是 QA 的主战场。

**包含技能：**
accessibility-testing、afrexai-qa-engine、afrexai-qa-testing-engine、bug-investigation、gstack-qa、incident-fupan、qa-browser-tester、qa-bug-triage、qa-patrol、qa-test-suite、regression-testing、test-generator、test-master、test-patterns、test-runner、test-sentinel、ux-qa-gate

### 3. 接口测试 / API / Mock（7 个）
面向接口联调、契约验证、异常测试、Mock 服务和接口自动化执行。

**包含技能：**
api-performance-testing、api-testing、openapi-spec、openclaw-api-tester、postman、qa-api-runner、sovereign-api-mock-generator

**重点可讲：**
- `qa-api-runner`：根据接口文档或接口描述，自动生成并执行 API 测试。

### 4. Web UI / E2E / 浏览器自动化（13 个）
用浏览器自动化和端到端测试验证页面、核心链路和真实用户操作。

**包含技能：**
cross-browser-testing、e2e-test-orchestrator、e2e-testing、e2e-testing-patterns、playwright-browser-automation、playwright-cli-openclaw、playwright-mcp、playwright-npx、playwright-pro、playwright-skill、qa-web-e2e-runner、visual-regression-testing、web-screenshot

**重点可讲：**
- `qa-web-e2e-runner`：执行 Web 端到端测试，自动留证并输出结论。
- `playwright-browser-automation`：用 Playwright 直接做浏览器自动化，适合网页操作、抓取和测试。

### 5. APP / 移动端 / 终端测试（9 个）
覆盖 Android、iOS、模拟器、真机和移动端适配等测试场景。

**包含技能：**
android-adb、ios-simulator、midscene-android-automation、mobile-appium-test、mobile-responsive、mobile-testing、node-connect、qa-skill、testflight

### 6. 性能 / SEO / 安全 / 埋点（33 个）
聚焦前端性能、SEO、埋点校验与安全测试，适合上线前专项保障。

**包含技能：**
add-analytics、afrexai-web-performance-engine、analytics-tracking-2、check-analytics、cs-analytics-tracking、frontend-performance、frontend-performance-audit、geo-testing、perf-test-suite、performance-profiler、performance-testing、performance-tuning、pls-seo-audit、react-performance、security-audit-toolkit、security-auditor、security-scanner、security-testing、sensors-analytics-tracking、seo-optimizer、seo-testing、shelly-seo-analyzer、sw-analytics-tracking、tracking-testing、web-auto-analyzer、web-perf、webperf、webperf-core-web-vitals、webperf-interaction、webperf-loading、webperf-media、webperf-resources、website-seo

**重点可讲：**
- `frontend-performance-audit`：分析前端页面性能并给出优化建议。

### 7. 测试支撑环境 / 可观测 / 平台（38 个）
数据库、日志、监控、容器、K8s、消息队列和 CI/CD 等测试支撑底座。

**包含技能：**
aws-infra、ci-cd、cicd-pipeline、cloudflare-api、cloudflare-toolkit、cloudflare-tunnel-manager、database-testing、db-readonly、docker-compose、docker-diag、docker-skill、github-actions、gitlab、grafana-api、grafana-lens、helm、initial-traefik、jenkins、k8s、kafka、kibana、kubectl、kubernetes-devops、logging-observability、monitoring、mqtt-client、mysqladm、nginx、postgres-mcp-skill、prometheus、promql-cli、rabbitmq-client-guide、sql-toolkit、tcpdump、terraform-iac、test-automation、traefik、wireshark-analysis

**重点可讲：**
- `grafana-lens`：用 Grafana 看指标、日志、trace 和安全告警，适合排障和监控分析。
- `db-readonly`：对数据库执行安全只读查询，适合查数和排障。

### 8. 其他测试相关（1 个）
补充类测试能力，用于丰富整个测试体系。

**包含技能：**
api-doc-generator

## 🌐 四、非测试专项 Skills（共 121 个）
### 1. 开发 / GitHub / Agent 工具（25 个）
偏研发协作与智能代理能力，适合代码工作流、skill 管理、自动化开发和复杂任务编排。

**包含技能：**
acp-router、agent-browser、agent-browser-clawdbot、byte-rover、capability-evolver、capability-evolver-pro、clawhub、coding-agent、coding-agent-common、deerflow-super-agent-harness、delegate-task、diffs、find-skills-3、gh-issues、github、healthcheck、openclaw-control-center、openspace-self-evolving-agents、prose、self-improving-agent、self-improving-agent-skill、skill-auditor、skill-creator、skill-discovery、skill-vetter

**重点可讲：**
- `github`：用 gh CLI 管 GitHub 仓库、PR、Issue 和 CI。
- `coding-agent`：把复杂编码任务委托给专门 coding agent。
- `find-skills-3`：按任务需求搜索适合的 skill。
- `skill-creator`：把一套工作方法写成可复用的 skill。
- `skill-vetter`：在安装 skill 前做安全审查。
- `openspace-self-evolving-agents`：让 Agent 通过 OpenSpace 进行技能复用和自进化。
- `openclaw-control-center`：本地控制中心，用来查看 OpenClaw 的运行状态、token、任务和协作链路。

### 2. 飞书 / 文档 / 知识库 / 媒体内容（27 个）
偏文档协作、知识管理、演示材料、媒体加工和内容生产。

**包含技能：**
daily-report-writer、feishu-doc、feishu-drive、feishu-perm、feishu-wiki、html-to-pdf、image-edit、image-handler、lh-video-gen、nano-banana、nano-banana-pro、openai-image-gen、openclaw-slides、pdf-skill、petclaw-image-gen、petclaw-video-gen、powerpoint-pptx、ppt-agent-workflow-san、ppt-generator、pptx-generator、research-paper-writer、smart-weekly-report、summarize、veo-video-gen、video-gif-converter、video-stitcher、weekly-report-writer

**重点可讲：**
- `feishu-doc`：直接创建和编辑飞书云文档。
- `feishu-wiki`：直接读写飞书知识库 / Wiki 页面。
- `summarize`：快速总结网页、文档、PDF、音视频内容。
- `ppt-agent-workflow-san`：渐进式 PPT 工作流，从主题到结构到完整演示稿逐步产出。

### 3. 办公 / 效率 / 通用工具（41 个）
偏日常办公、效率提升、信息处理、个人管理和多种通用工具。

**包含技能：**
1password、apple-notes、apple-reminders、automate-excel、bear-notes、best-prompts、blogwatcher、blucli、camsnap、data-analyst、eightctl、excel-xlsx、gemini、gifgrep、gog、goplaces、mcporter、model-usage、notion、obsidian、openai-whisper、openai-whisper-api、openhue、oracle、ordercli、peekaboo、petclaw-1、sag、session-logs、songsee、sonoscli、spotify-player、star-office-ui、stock-analysis、task-scheduler、things-mac、tmux、trello、voice-call、weather、xurl

**重点可讲：**
- `data-analyst`：读 CSV / Excel 做数据清洗、统计分析和图表生成。
- `star-office-ui`：像素办公室状态看板，适合把 AI/Agent 状态可视化展示。
- `best-prompts`：高质量 Prompt 模板合集，适合论文、开发、PPT、内容创作等场景快速复用。

### 4. 协作 / 工作流 / 消息（6 个）
偏团队协作、消息渠道、项目流程与沟通集成。

**包含技能：**
bluebubbles、discord、himalaya、imsg、slack、wacli

### 5. 其他非测试相关（21 个）
补充型能力，覆盖搜索、平台工具、专题工具和一些独立应用场景。

**包含技能：**
atlassian-confluence、atlassian-jira、baidu-web-search、brave-search、crash-fixer、fastlane、incident-response、jira、linear、mantis-manager、nano-pdf、openclaw-agent-browser、openclaw-log-analyzer、petclaw-2、petclaw-web-search、pls-audit-website、sherpa-onnx-tts、system-resource-monitor、video-frames、web-access、xiaohongshu

**重点可讲：**
- `web-access`：把搜索、网页抓取、网页登录和网页交互统一收口到一个联网入口。

## ✅ 五、建议安装 Skills 清单（共 10 个）
这 10 个仍然适合作为“核心起步包”。原因不是它们涵盖全部场景，而是它们能构成一个最小可用闭环：发现 skill、总结信息、写飞书文档、做日报周报、连 GitHub、审查 skill 安全、沉淀新 skill。

1. `find-skills-3`
   - 功能作用：帮助用户发现并安装适合当前任务的 skill。
   - GitHub 链接：https://github.com/QA19816-glitch/QA-agent/tree/main/skills/find-skills-3
2. `summarize`
   - 功能作用：快速总结网页、PDF、图片、音频、视频和本地文件内容。
   - GitHub 链接：https://github.com/QA19816-glitch/QA-agent/tree/main/skills/summarize
3. `feishu-doc`
   - 功能作用：直接创建、编辑和更新飞书云文档。
   - GitHub 链接：https://github.com/QA19816-glitch/QA-agent/tree/main/skills/feishu-doc
4. `feishu-wiki`
   - 功能作用：直接读写飞书知识库 / Wiki 页面。
   - GitHub 链接：https://github.com/QA19816-glitch/QA-agent/tree/main/skills/feishu-wiki
5. `daily-report-writer`
   - 功能作用：快速生成日报草稿。
   - GitHub 链接：https://github.com/QA19816-glitch/QA-agent/tree/main/skills/daily-report-writer
6. `weekly-report-writer`
   - 功能作用：快速生成结构化中文周报。
   - GitHub 链接：https://github.com/QA19816-glitch/QA-agent/tree/main/skills/weekly-report-writer
7. `github`
   - 功能作用：统一处理 GitHub 仓库、PR、Issue 和 CI 流程。
   - GitHub 链接：https://github.com/QA19816-glitch/QA-agent/tree/main/skills/github
8. `skill-vetter`
   - 功能作用：在安装 skill 前做安全审查。
   - GitHub 链接：https://github.com/QA19816-glitch/QA-agent/tree/main/skills/skill-vetter
9. `skill-creator`
   - 功能作用：帮助把工作方法沉淀成 skill。
   - GitHub 链接：https://github.com/QA19816-glitch/QA-agent/tree/main/skills/skill-creator
10. `deerflow-super-agent-harness`
   - 功能作用：处理复杂任务时的多代理编排框架。
   - GitHub 链接：https://github.com/QA19816-glitch/QA-agent/tree/main/skills/deerflow-super-agent-harness

## 📋 六、核心总结
- GitHub 全量：**248 个**
- 测试专项：**127 个**
- 非测试专项：**121 个**
- 建议安装：**10 个**
- 如果是演讲分享，推荐的讲法是：**先讲总量和分类，再讲重点场景，最后讲建议安装**。
