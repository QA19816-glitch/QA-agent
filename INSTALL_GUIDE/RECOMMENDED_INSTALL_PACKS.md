# 建议安装技能 / 安装包

如果你不想一个个挑 skill，直接按场景安装一整包。

压缩包目录：<https://github.com/QA19816-glitch/QA-agent/tree/main/dist/install-packs>

## QA 核心安装包

适合大多数测试同学开箱即用：需求分析、测试点、用例、接口、Web 测试、缺陷与报告。

- 下载 zip：<https://github.com/QA19816-glitch/QA-agent/blob/main/dist/install-packs/qa-core-pack.zip>
- 一键安装脚本：[`install_qa-core-pack.sh`](./scripts/install_qa-core-pack.sh)
  ```bash
  bash INSTALL_GUIDE/scripts/install_qa-core-pack.sh /path/to/QA-agent ~/.openclaw/workspace/skills
  ```

包含的 skills：

1. `qa-prd-analyzer`
   - 功能作用：Analyze PRDs, Feishu docs, wiki pages, specs, change notes, and prototype text into structured feature breakdowns, business flows, hidden assumptions, ambiguity lists, and QA risk summaries. Use when the user asks to analyze a requirement, break down a feature, review a spec, find missing cases, or identify unclear/risky requirements before test design.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-prd-analyzer>
2. `qa-test-point-extractor`
   - 功能作用：Convert requirements, flows, API specs, and feature summaries into structured QA test points covering happy path, negative path, boundary, permission, state transition, compatibility, and resilience. Use when the user asks to extract test points, design coverage, list edge cases, or expand testing scope before formal test cases are written.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-test-point-extractor>
3. `qa-testcase-writer`
   - 功能作用：Turn QA test points or requirements into standardized test cases with preconditions, data, steps, expected results, priority, and automation hints. Use when the user asks to write test cases, generate smoke/regression cases, convert test points into executable cases, or format cases for docs, Feishu, spreadsheets, or case-management tools.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-testcase-writer>
4. `qa-api-runner`
   - 功能作用：Generate, execute, and summarize API smoke, regression, and negative tests from API docs or endpoint descriptions. Use when the user asks to run API tests, validate endpoint behavior, exercise request/response contracts, verify auth and error handling, or turn API specs into executable checks.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-api-runner>
5. `qa-browser-tester`
   - 功能作用：>
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-browser-tester>
6. `qa-web-e2e-runner`
   - 功能作用：Execute browser-based QA flows for web apps, capture assertions, screenshots, and failure evidence, and summarize end-to-end results. Use when the user asks to run UI smoke tests, verify business flows in a browser, regression-test key pages, or reproduce front-end issues with observable evidence.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-web-e2e-runner>
7. `qa-bug-triage`
   - 功能作用：Turn failed tests, screenshots, logs, and mismatches into high-quality defect reports with titles, reproduction steps, severity/priority guidance, and likely ownership hints. Use when the user asks to write bugs, triage failures, classify severity, deduplicate issues, or convert raw evidence into actionable QA defect records.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-bug-triage>
8. `qa-regression-planner`
   - 功能作用：Plan focused QA regression scope from requirement changes, bug fixes, impacted modules, and system dependencies. Use when the user asks what to regress, wants a change-impact-based regression plan, or needs a lean smoke vs full-regression split for a release.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-regression-planner>
9. `qa-release-gate-checker`
   - 功能作用：Decide whether a build is releasable by checking core-flow status, unresolved defects, coverage gaps, and residual risks. Use when the user asks if a version can ship, wants a release gate decision, or needs a concise go/no-go QA judgement from current evidence.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-release-gate-checker>
10. `qa-test-report-generator`
   - 功能作用：Summarize QA execution into release-facing test reports with scope, environment, pass/fail counts, defect distribution, residual risk, and release recommendation. Use when the user asks to generate a test report, release summary, QA conclusion, execution recap, or stakeholder-ready testing status update.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-test-report-generator>

## 前端 / 页面性能专项安装包

适合做页面渲染性能、LCP/INP/CLS、首屏加载、前端性能优化与诊断。

- 下载 zip：<https://github.com/QA19816-glitch/QA-agent/blob/main/dist/install-packs/frontend-performance-pack.zip>
- 一键安装脚本：[`install_frontend-performance-pack.sh`](./scripts/install_frontend-performance-pack.sh)
  ```bash
  bash INSTALL_GUIDE/scripts/install_frontend-performance-pack.sh /path/to/QA-agent ~/.openclaw/workspace/skills
  ```

包含的 skills：

1. `frontend-performance`
   - 功能作用：Analyzes and improves frontend performance: LCP, FCP, CLS, bundle size, lazy loading, and runtime efficiency. Use when 性能优化, 首屏慢, 卡顿, 打包体积, performance optimization, or improving Core Web Vitals.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/frontend-performance>
2. `frontend-performance-audit`
   - 功能作用：分析前端页面性能并输出结构化优化报告。适用于页面速度慢、lighthouse 指标差、core web vitals 不达标、首屏慢、交互卡顿、bundle 过大、阻塞渲染资源过多等场景。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/frontend-performance-audit>
3. `react-performance`
   - 功能作用：React and Next.js performance optimization patterns. Use when writing,
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/react-performance>
4. `webperf-core-web-vitals`
   - 功能作用：Intelligent Core Web Vitals analysis with automated workflows and decision trees. Measures LCP, CLS, INP with guided debugging that automatically determines follow-up analysis based on results. Includes workflows for LCP deep dive (5 phases), CLS investigation (loading vs interaction), INP debugging (latency breakdown + attribution), and cross-skill integration with loading, interaction, and media skills. Use when the user asks about Core Web Vitals, LCP optimization, layout shifts, or interaction responsiveness. Compatible with Chrome DevTools MCP.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/webperf-core-web-vitals>
5. `web-perf`
   - 功能作用：Analyzes web performance using Chrome DevTools MCP. Measures Core Web Vitals (FCP, LCP, TBT, CLS, Speed Index), identifies render-blocking resources, network dependency chains, layout shifts, caching issues, and accessibility gaps. Use when asked to audit, profile, debug, or optimize page load performance, Lighthouse scores, or site speed.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/web-perf>
6. `webperf-loading`
   - 功能作用：Intelligent loading performance analysis with automated workflows for TTFB investigation (DNS/connection/server breakdown), render-blocking detection, script performance deep dive (first vs third-party attribution), font optimization, and resource hints validation. Includes decision trees that automatically analyze TTFB sub-parts when slow, detect script loading anti-patterns (async/defer/preload conflicts), identify render-blocking resources, and validate resource hints usage. Features workflows for complete loading audit (6 phases), backend performance investigation, and priority optimization. Cross-skill integration with Core Web Vitals (LCP resource loading), Interaction (script execution blocking), and Media (lazy loading strategy). Use when the user asks about TTFB, FCP, render-blocking, slow loading, font performance, script optimization, or resource hints. Compatible with Chrome DevTools MCP.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/webperf-loading>
7. `webperf-interaction`
   - 功能作用：Intelligent interaction performance analysis with automated workflows for INP debugging, scroll jank investigation, and main thread blocking. Includes decision trees that automatically run script attribution when long frames detected, break down input latency phases, and correlate layout shifts with interactions. Features workflows for complete interaction audit, third-party script impact analysis, and animation performance debugging. Cross-skill integration with Core Web Vitals (INP/CLS correlation) and Loading (script execution analysis). Use when the user asks about slow interactions, janky scrolling, unresponsive pages, or INP optimization. Compatible with Chrome DevTools MCP.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/webperf-interaction>
8. `webperf-media`
   - 功能作用：Intelligent media optimization with automated workflows for images, videos, and SVGs. Includes decision trees that detect LCP images (triggers format/lazy-loading/priority analysis), identify layout shift risks (missing dimensions), and flag lazy loading issues (above-fold lazy or below-fold eager). Features workflows for complete media audit, LCP image investigation, video performance (poster optimization), and SVG embedded bitmap detection. Cross-skill integration with Core Web Vitals (LCP/CLS impact) and Loading (priority hints, resource preloading). Provides performance budgets and format recommendations based on content type. Use when the user asks about image optimization, LCP is an image/video, layout shifts from media, or media loading strategy. Compatible with Chrome DevTools MCP.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/webperf-media>
9. `web-auto-analyzer`
   - 功能作用：Automatically analyze websites for performance metrics and audit issues using Lighthouse.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/web-auto-analyzer>
10. `performance-profiler`
   - 功能作用：分析代码性能，识别瓶颈并提供优化建议。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/performance-profiler>

## API / 接口专项安装包

适合做接口测试、API smoke/regression、Mock、OpenAPI 驱动测试。

- 下载 zip：<https://github.com/QA19816-glitch/QA-agent/blob/main/dist/install-packs/api-testing-pack.zip>
- 一键安装脚本：[`install_api-testing-pack.sh`](./scripts/install_api-testing-pack.sh)
  ```bash
  bash INSTALL_GUIDE/scripts/install_api-testing-pack.sh /path/to/QA-agent ~/.openclaw/workspace/skills
  ```

包含的 skills：

1. `qa-api-runner`
   - 功能作用：Generate, execute, and summarize API smoke, regression, and negative tests from API docs or endpoint descriptions. Use when the user asks to run API tests, validate endpoint behavior, exercise request/response contracts, verify auth and error handling, or turn API specs into executable checks.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-api-runner>
2. `openclaw-api-tester`
   - 功能作用：Test API endpoints and document responses. Define tests in plain English, run them, get formatted results. Agent-driven Postman alternative.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/openclaw-api-tester>
3. `api-performance-testing`
   - 功能作用：Plan, execute, and analyze API performance and load testing for REST and HTTP services using k6, Locust, or Newman-compatible workflows. Use when the user mentions 接口性能, 压测, load test, stress test, benchmark, throughput, latency, TPS, QPS, 并发, API bottleneck, slow endpoints, rate limits, or wants structured API performance validation before release.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/api-performance-testing>
4. `postman`
   - 功能作用：Build, test, and automate APIs with Postman collections, environments, and Newman CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/postman>
5. `openapi-spec`
   - 功能作用：Deep OpenAPI workflow—design-first vs code-first, reusable schemas, security schemes, errors, examples, linting, compatibility, and codegen. Use when documenting REST APIs or driving clients and gateways from a spec.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/openapi-spec>

## Web 自动化 / E2E 专项安装包

适合浏览器自动化、E2E、回归测试、截图与视觉回归。

- 下载 zip：<https://github.com/QA19816-glitch/QA-agent/blob/main/dist/install-packs/web-e2e-pack.zip>
- 一键安装脚本：[`install_web-e2e-pack.sh`](./scripts/install_web-e2e-pack.sh)
  ```bash
  bash INSTALL_GUIDE/scripts/install_web-e2e-pack.sh /path/to/QA-agent ~/.openclaw/workspace/skills
  ```

包含的 skills：

1. `qa-web-e2e-runner`
   - 功能作用：Execute browser-based QA flows for web apps, capture assertions, screenshots, and failure evidence, and summarize end-to-end results. Use when the user asks to run UI smoke tests, verify business flows in a browser, regression-test key pages, or reproduce front-end issues with observable evidence.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-web-e2e-runner>
2. `qa-browser-tester`
   - 功能作用：>
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-browser-tester>
3. `playwright-pro`
   - 功能作用：Production-grade Playwright testing toolkit. Use when the user mentions Playwright tests, end-to-end testing, browser automation, fixing flaky tests, test migration, CI/CD testing, or test suites. Generate tests, fix flaky failures, migrate from Cypress/Selenium, sync with TestRail, run on BrowserStack. 55 templates, 3 agents, smart reporting.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/playwright-pro>
4. `playwright-cli-openclaw`
   - 功能作用：官方Microsoft Playwright CLI网页自动化工具，支持所有主流浏览器的无头/有头自动化操作，包括页面导航、元素交互、截图、录制、测试等功能。当用户提到网页自动化、浏览器操作、爬虫、截图、录制用户操作、E2E测试时触发。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/playwright-cli-openclaw>
5. `visual-regression-testing`
   - 功能作用：AI-powered visual regression testing skill for e-commerce websites. Designs screenshot comparison workflows, mobile/desktop visual checks, and change detection alerts to prevent conversion-killing UI bugs.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/visual-regression-testing>

## APP / 移动测试专项安装包

适合 Android / iOS 自动化、真机与模拟器测试。

- 下载 zip：<https://github.com/QA19816-glitch/QA-agent/blob/main/dist/install-packs/mobile-testing-pack.zip>
- 一键安装脚本：[`install_mobile-testing-pack.sh`](./scripts/install_mobile-testing-pack.sh)
  ```bash
  bash INSTALL_GUIDE/scripts/install_mobile-testing-pack.sh /path/to/QA-agent ~/.openclaw/workspace/skills
  ```

包含的 skills：

1. `mobile-appium-test`
   - 功能作用：>
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/mobile-appium-test>
2. `android-adb`
   - 功能作用：Control Android devices via ADB with support for UI layout analysis (uiautomator) and visual feedback (screencap). Use when you need to interact with Android apps, perform UI automation, take screenshots, or run complex ADB command sequences.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/android-adb>
3. `ios-simulator`
   - 功能作用：Automate iOS Simulator workflows (simctl + idb): create/boot/erase devices, install/launch apps, push notifications, privacy grants, screenshots, and accessibility-based UI navigation. Use when working with iOS apps, Xcode, Simulator, simctl, idb, UI automation, or iOS testing.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/ios-simulator>
4. `testflight`
   - 功能作用：Distribute iOS and macOS beta builds with TestFlight, tester management, and CI/CD automation.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/testflight>
5. `node-connect`
   - 功能作用：Diagnose OpenClaw node connection and pairing failures for Android, iOS, and macOS companion apps. Use when QR/setup code/manual connect fails, local Wi-Fi works but VPS/tailnet does not, or errors mention pairing required, unauthorized, bootstrap token invalid or expired, gateway.bind, gateway.remote.url, Tailscale, or plugins.entries.device-pair.config.publicUrl.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/node-connect>

## 缺陷 / 复盘 / 发布准入专项安装包

适合缺陷归档、事故复盘、回归范围与发布准入判断。

- 下载 zip：<https://github.com/QA19816-glitch/QA-agent/blob/main/dist/install-packs/release-gate-pack.zip>
- 一键安装脚本：[`install_release-gate-pack.sh`](./scripts/install_release-gate-pack.sh)
  ```bash
  bash INSTALL_GUIDE/scripts/install_release-gate-pack.sh /path/to/QA-agent ~/.openclaw/workspace/skills
  ```

包含的 skills：

1. `qa-bug-triage`
   - 功能作用：Turn failed tests, screenshots, logs, and mismatches into high-quality defect reports with titles, reproduction steps, severity/priority guidance, and likely ownership hints. Use when the user asks to write bugs, triage failures, classify severity, deduplicate issues, or convert raw evidence into actionable QA defect records.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-bug-triage>
2. `incident-fupan`
   - 功能作用：事故复盘 / Incident Fupan — structured root cause analysis for production failures, outages, bugs, and near-misses. Use when: (1) 事故复盘 or incident review is needed, (2) a production incident just happened and needs root cause analysis, (3) an agent made a costly mistake and you want to prevent recurrence, (4) building safety rules or kill switches from incident patterns. Triggers on: 复盘, fupan, postmortem, incident review, root cause analysis, 事故分析. Generates a full report with timeline, 5 Whys root cause, impact assessment, fix/prevention actions, and new defensive rules. NOT for: routine debugging, feature planning, or non-incident analysis.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/incident-fupan>
3. `qa-release-gate-checker`
   - 功能作用：Decide whether a build is releasable by checking core-flow status, unresolved defects, coverage gaps, and residual risks. Use when the user asks if a version can ship, wants a release gate decision, or needs a concise go/no-go QA judgement from current evidence.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-release-gate-checker>
4. `qa-regression-planner`
   - 功能作用：Plan focused QA regression scope from requirement changes, bug fixes, impacted modules, and system dependencies. Use when the user asks what to regress, wants a change-impact-based regression plan, or needs a lean smoke vs full-regression split for a release.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-regression-planner>
5. `qa-traceability-mapper`
   - 功能作用：Build QA traceability between requirements, test points, test cases, execution results, and defects. Use when the user asks for a traceability matrix, coverage mapping, gap analysis, release coverage proof, or help linking requirements to tests and bugs.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-traceability-mapper>


## 开发 / Agent 工具安装包

适合需要 GitHub、Agent 工具、技能发现、技能创建与治理能力的人。

- 下载 zip：<https://github.com/QA19816-glitch/QA-agent/blob/main/dist/install-packs/dev-agent-tools-pack.zip>

包含的 skills：
- `github`
- `gh-issues`
- `clawhub`
- `find-skills-3`
- `skill-creator`
- `skill-auditor`
- `skill-vetter`
- `deerflow-super-agent-harness`

## 飞书 / 文档 / 内容安装包

适合需要 Feishu 文档、知识库、总结、PDF/PPT、内容处理的人。

- 下载 zip：<https://github.com/QA19816-glitch/QA-agent/blob/main/dist/install-packs/feishu-docs-content-pack.zip>

包含的 skills：
- `feishu-doc`
- `feishu-drive`
- `feishu-perm`
- `feishu-wiki`
- `summarize`
- `pdf-skill`
- `html-to-pdf`
- `pptx-generator`
- `openclaw-slides`
- `image-handler`

## 办公 / 效率 / 数据安装包

适合需要 Excel、Notion、Obsidian、天气、会话日志、办公效率工具的人。

- 下载 zip：<https://github.com/QA19816-glitch/QA-agent/blob/main/dist/install-packs/productivity-office-pack.zip>

包含的 skills：
- `automate-excel`
- `excel-xlsx`
- `weather`
- `tmux`
- `1password`
- `obsidian`
- `notion`
- `trello`
- `gog`
- `session-logs`
