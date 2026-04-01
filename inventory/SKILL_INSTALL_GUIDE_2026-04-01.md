# QA-agent Skills 安装导览（2026-04-01）

仓库地址：https://github.com/QA19816-glitch/QA-agent

> 这份清单适合直接分享给别人。别人可以先看总类，再按“测试技能类 / 非测试技能类 / 建议安装类”找到自己需要的技能，然后点进对应 GitHub 目录安装。

## GitHub 入口链接

- 仓库主页：<https://github.com/QA19816-glitch/QA-agent>
- skills 目录：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills>
- inventory 目录：<https://github.com/QA19816-glitch/QA-agent/tree/main/inventory>

## 一、总类

- 测试技能类：**113** 个
- 非测试技能类：**86** 个
- 全部 skills 总数：**199** 个

## 二、测试技能类

### 需求分析 / 测试设计 / 用例 / 追踪 / 发布准入（8）

1. `afrexai-qa-test-plan`
   - 分类名称：需求分析 / 测试设计 / 用例 / 追踪 / 发布准入
   - 功能作用：You are a Quality Assurance architect. Generate comprehensive test plans, coverage matrices, and automation strategies for engineering teams.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/afrexai-qa-test-plan>
2. `qa-prd-analyzer`
   - 分类名称：需求分析 / 测试设计 / 用例 / 追踪 / 发布准入
   - 功能作用：Analyze PRDs, Feishu docs, wiki pages, specs, change notes, and prototype text into structured feature breakdowns, business flows, hidden assumptions, ambiguity lists, and QA risk summaries. Use when the user asks to analyze a requirement, break down a feature, review a spec, find missing cases, or identify unclear/risky requirements before test design.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-prd-analyzer>
3. `qa-regression-planner`
   - 分类名称：需求分析 / 测试设计 / 用例 / 追踪 / 发布准入
   - 功能作用：Plan focused QA regression scope from requirement changes, bug fixes, impacted modules, and system dependencies. Use when the user asks what to regress, wants a change-impact-based regression plan, or needs a lean smoke vs full-regression split for a release.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-regression-planner>
4. `qa-release-gate-checker`
   - 分类名称：需求分析 / 测试设计 / 用例 / 追踪 / 发布准入
   - 功能作用：Decide whether a build is releasable by checking core-flow status, unresolved defects, coverage gaps, and residual risks. Use when the user asks if a version can ship, wants a release gate decision, or needs a concise go/no-go QA judgement from current evidence.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-release-gate-checker>
5. `qa-test-point-extractor`
   - 分类名称：需求分析 / 测试设计 / 用例 / 追踪 / 发布准入
   - 功能作用：Convert requirements, flows, API specs, and feature summaries into structured QA test points covering happy path, negative path, boundary, permission, state transition, compatibility, and resilience. Use when the user asks to extract test points, design coverage, list edge cases, or expand testing scope before formal test cases are written.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-test-point-extractor>
6. `qa-test-report-generator`
   - 分类名称：需求分析 / 测试设计 / 用例 / 追踪 / 发布准入
   - 功能作用：Summarize QA execution into release-facing test reports with scope, environment, pass/fail counts, defect distribution, residual risk, and release recommendation. Use when the user asks to generate a test report, release summary, QA conclusion, execution recap, or stakeholder-ready testing status update.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-test-report-generator>
7. `qa-testcase-writer`
   - 分类名称：需求分析 / 测试设计 / 用例 / 追踪 / 发布准入
   - 功能作用：Turn QA test points or requirements into standardized test cases with preconditions, data, steps, expected results, priority, and automation hints. Use when the user asks to write test cases, generate smoke/regression cases, convert test points into executable cases, or format cases for docs, Feishu, spreadsheets, or case-management tools.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-testcase-writer>
8. `qa-traceability-mapper`
   - 分类名称：需求分析 / 测试设计 / 用例 / 追踪 / 发布准入
   - 功能作用：Build QA traceability between requirements, test points, test cases, execution results, and defects. Use when the user asks for a traceability matrix, coverage mapping, gap analysis, release coverage proof, or help linking requirements to tests and bugs.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-traceability-mapper>

### 功能测试 / 冒烟测试 / 回归测试 / 巡检（10）

1. `afrexai-qa-engine`
   - 分类名称：功能测试 / 冒烟测试 / 回归测试 / 巡检
   - 功能作用：Complete quality assurance system — from test strategy to automation frameworks, coverage analysis, and release readiness. Works for any stack, any team size.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/afrexai-qa-engine>
2. `afrexai-qa-testing-engine`
   - 分类名称：功能测试 / 冒烟测试 / 回归测试 / 巡检
   - 功能作用：> The definitive testing methodology for AI agents. From test strategy to execution, coverage to reporting — everything you need to ship quality software.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/afrexai-qa-testing-engine>
3. `gstack-qa`
   - 分类名称：功能测试 / 冒烟测试 / 回归测试 / 巡检
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/gstack-qa>
4. `qa-patrol`
   - 分类名称：功能测试 / 冒烟测试 / 回归测试 / 巡检
   - 功能作用：>
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-patrol>
5. `test-generator`
   - 分类名称：功能测试 / 冒烟测试 / 回归测试 / 巡检
   - 功能作用：Automated test case generator. Unit tests, integration tests, end-to-end tests, mock objects, test fixtures, coverage analysis, edge case generation.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/test-generator>
6. `test-master`
   - 分类名称：功能测试 / 冒烟测试 / 回归测试 / 巡检
   - 功能作用：Use when writing tests, creating test strategies, or building automation frameworks. Invoke for unit tests, integration tests, E2E, coverage analysis, performance testing, security testing.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/test-master>
7. `test-patterns`
   - 分类名称：功能测试 / 冒烟测试 / 回归测试 / 巡检
   - 功能作用：Write and run tests across languages and frameworks. Use when setting up test suites, writing unit/integration/E2E tests, measuring coverage, mocking dependencies, or debugging test failures. Covers Node.js (Jest/Vitest), Python (pytest), Go, Rust, and Bash.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/test-patterns>
8. `test-runner`
   - 分类名称：功能测试 / 冒烟测试 / 回归测试 / 巡检
   - 功能作用：Write and run tests across languages and frameworks.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/test-runner>
9. `test-sentinel`
   - 分类名称：功能测试 / 冒烟测试 / 回归测试 / 巡检
   - 功能作用：Writes and runs tests (unit, integration, E2E), performs linting, and auto-fixes failures
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/test-sentinel>
10. `ux-qa-gate`
   - 分类名称：功能测试 / 冒烟测试 / 回归测试 / 巡检
   - 功能作用：Self-review gate for UI/UX work before delivering to the user. Run automatically after building, modifying, or completing any user-facing feature, page, component, or flow. Triggers on: finishing a build task, completing a UI change, delivering a web app feature, wrapping up frontend work. Also use when asked to QA this, review the UX, check for usability issues, or run the gate. What it does: (1) Functional completeness check — verifies every button, link, form, and flow works end-to-end, (2) Heuristic review — walks through all 10 Nielsen Norman usability heuristics with a detailed checklist, (3) State and edge case sweep — checks empty, loading, error, success, partial, overflow, and auth states, (4) Interaction and responsiveness — verifies clickability, keyboard access, and responsive layout, (5) Severity classification — blockers and major issues fixed before delivery, minor items noted. Catches missing functionality, broken flows, empty states, and usability problems before the user sees them.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/ux-qa-gate>

### 接口测试 / API 测试 / Mock（7）

1. `api-doc-generator`
   - 分类名称：接口测试 / API 测试 / Mock
   - 功能作用：自动从代码生成 API 文档。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/api-doc-generator>
2. `api-performance-testing`
   - 分类名称：接口测试 / API 测试 / Mock
   - 功能作用：Plan, execute, and analyze API performance and load testing for REST and HTTP services using k6, Locust, or Newman-compatible workflows. Use when the user mentions 接口性能, 压测, load test, stress test, benchmark, throughput, latency, TPS, QPS, 并发, API bottleneck, slow endpoints, rate limits, or wants structured API performance validation before release.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/api-performance-testing>
3. `openapi-spec`
   - 分类名称：接口测试 / API 测试 / Mock
   - 功能作用：Deep OpenAPI workflow—design-first vs code-first, reusable schemas, security schemes, errors, examples, linting, compatibility, and codegen. Use when documenting REST APIs or driving clients and gateways from a spec.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/openapi-spec>
4. `openclaw-api-tester`
   - 分类名称：接口测试 / API 测试 / Mock
   - 功能作用：Test API endpoints and document responses. Define tests in plain English, run them, get formatted results. Agent-driven Postman alternative.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/openclaw-api-tester>
5. `postman`
   - 分类名称：接口测试 / API 测试 / Mock
   - 功能作用：Build, test, and automate APIs with Postman collections, environments, and Newman CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/postman>
6. `qa-api-runner`
   - 分类名称：接口测试 / API 测试 / Mock
   - 功能作用：Generate, execute, and summarize API smoke, regression, and negative tests from API docs or endpoint descriptions. Use when the user asks to run API tests, validate endpoint behavior, exercise request/response contracts, verify auth and error handling, or turn API specs into executable checks.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-api-runner>
7. `sovereign-api-mock-generator`
   - 分类名称：接口测试 / API 测试 / Mock
   - 功能作用：Generates mock API servers from OpenAPI specs or examples. Realistic fake data, configurable delays, error simulation.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/sovereign-api-mock-generator>

### Web UI / E2E / 浏览器自动化测试（13）

1. `e2e-test-orchestrator`
   - 分类名称：Web UI / E2E / 浏览器自动化测试
   - 功能作用：端到端（E2E）测试编排与执行。用于用户要求：设计测试用例、基于 Playwright/Cypress 实现自动化脚本、通过源码优先定位元素并在必要时使用截图/图像识别兜底、执行测试、自动修复脚本问题（如定位器或等待策略）、并输出结构化测试报告。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/e2e-test-orchestrator>
2. `e2e-testing`
   - 分类名称：Web UI / E2E / 浏览器自动化测试
   - 功能作用：Playwright 与 Cypress E2E 测试规范，涵盖目录结构、Page Object、CI 集成、视口与设备配置。当用户提到 E2E、端到端测试、Playwright、Cypress、集成测试时自动激活。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/e2e-testing>
3. `e2e-testing-patterns`
   - 分类名称：Web UI / E2E / 浏览器自动化测试
   - 功能作用：Build reliable, fast E2E test suites with Playwright and Cypress. Critical user journey coverage, flaky test elimination, CI/CD integration.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/e2e-testing-patterns>
4. `playwright-browser-automation`
   - 分类名称：Web UI / E2E / 浏览器自动化测试
   - 功能作用：Browser automation using Playwright API directly. Navigate websites, interact with elements, extract data, take screenshots, generate PDFs, record videos, and automate complex workflows. More reliable than MCP approach.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/playwright-browser-automation>
5. `playwright-cli-openclaw`
   - 分类名称：Web UI / E2E / 浏览器自动化测试
   - 功能作用：官方Microsoft Playwright CLI网页自动化工具，支持所有主流浏览器的无头/有头自动化操作，包括页面导航、元素交互、截图、录制、测试等功能。当用户提到网页自动化、浏览器操作、爬虫、截图、录制用户操作、E2E测试时触发。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/playwright-cli-openclaw>
6. `playwright-mcp`
   - 分类名称：Web UI / E2E / 浏览器自动化测试
   - 功能作用：Browser automation via Playwright MCP server. Navigate websites, click elements, fill forms, extract data, take screenshots, and perform full browser automation workflows.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/playwright-mcp>
7. `playwright-npx`
   - 分类名称：Web UI / E2E / 浏览器自动化测试
   - 功能作用：Fast browser automation using Node.js scripts with Playwright (run via `node script.mjs`). Use for web scraping, screenshots, form automation, and any browser task requiring programmatic control. For simple page fetching without JavaScript execution, use web_fetch first. For interactive CLI browsing without writing code, use browser tool or playwright-cli. This skill is ideal when you need full control, custom logic, or reusable scripts.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/playwright-npx>
8. `playwright-pro`
   - 分类名称：Web UI / E2E / 浏览器自动化测试
   - 功能作用：Production-grade Playwright testing toolkit. Use when the user mentions Playwright tests, end-to-end testing, browser automation, fixing flaky tests, test migration, CI/CD testing, or test suites. Generate tests, fix flaky failures, migrate from Cypress/Selenium, sync with TestRail, run on BrowserStack. 55 templates, 3 agents, smart reporting.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/playwright-pro>
9. `playwright-skill`
   - 分类名称：Web UI / E2E / 浏览器自动化测试
   - 功能作用：Complete browser automation with Playwright. Auto-detects dev servers, writes clean test scripts to /tmp. Test pages, fill forms, take screenshots, check responsive design, validate UX, test login flows, check links, automate any browser task. Use when user wants to test websites, automate browser interactions, validate web functionality, or perform any browser-based testing.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/playwright-skill>
10. `qa-browser-tester`
   - 分类名称：Web UI / E2E / 浏览器自动化测试
   - 功能作用：>
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-browser-tester>
11. `qa-web-e2e-runner`
   - 分类名称：Web UI / E2E / 浏览器自动化测试
   - 功能作用：Execute browser-based QA flows for web apps, capture assertions, screenshots, and failure evidence, and summarize end-to-end results. Use when the user asks to run UI smoke tests, verify business flows in a browser, regression-test key pages, or reproduce front-end issues with observable evidence.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-web-e2e-runner>
12. `visual-regression-testing`
   - 分类名称：Web UI / E2E / 浏览器自动化测试
   - 功能作用：AI-powered visual regression testing skill for e-commerce websites. Designs screenshot comparison workflows, mobile/desktop visual checks, and change detection alerts to prevent conversion-killing UI bugs.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/visual-regression-testing>
13. `web-screenshot`
   - 分类名称：Web UI / E2E / 浏览器自动化测试
   - 功能作用：🖼️ 任意URL全页面截图 + PDF导出工具。当用户要求截取网页、保存网页快照、截图存档、做QA对比、导出PDF时使用。支持百度/知乎/微信公众号/小红书等中文网站，自动等待JS渲染交付PNG/JPG/PDF。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/web-screenshot>

### APP / 移动端 / 终端测试（7）

1. `android-adb`
   - 分类名称：APP / 移动端 / 终端测试
   - 功能作用：Control Android devices via ADB with support for UI layout analysis (uiautomator) and visual feedback (screencap). Use when you need to interact with Android apps, perform UI automation, take screenshots, or run complex ADB command sequences.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/android-adb>
2. `ios-simulator`
   - 分类名称：APP / 移动端 / 终端测试
   - 功能作用：Automate iOS Simulator workflows (simctl + idb): create/boot/erase devices, install/launch apps, push notifications, privacy grants, screenshots, and accessibility-based UI navigation. Use when working with iOS apps, Xcode, Simulator, simctl, idb, UI automation, or iOS testing.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/ios-simulator>
3. `midscene-android-automation`
   - 分类名称：APP / 移动端 / 终端测试
   - 功能作用：>
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/midscene-android-automation>
4. `mobile-appium-test`
   - 分类名称：APP / 移动端 / 终端测试
   - 功能作用：>
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/mobile-appium-test>
5. `node-connect`
   - 分类名称：APP / 移动端 / 终端测试
   - 功能作用：Diagnose OpenClaw node connection and pairing failures for Android, iOS, and macOS companion apps. Use when QR/setup code/manual connect fails, local Wi-Fi works but VPS/tailnet does not, or errors mention pairing required, unauthorized, bootstrap token invalid or expired, gateway.bind, gateway.remote.url, Tailscale, or plugins.entries.device-pair.config.publicUrl.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/node-connect>
6. `qa-skill`
   - 分类名称：APP / 移动端 / 终端测试
   - 功能作用：Generate comprehensive test cases and quality assurance documentation from SwiftUI iOS code. Use when iOS application code is available and needs testing strategies, test cases, and quality validation. This skill receives input from dev-skill and completes the auto-dev-pipeline by providing testing coverage.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-skill>
7. `testflight`
   - 分类名称：APP / 移动端 / 终端测试
   - 功能作用：Distribute iOS and macOS beta builds with TestFlight, tester management, and CI/CD automation.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/testflight>

### 性能测试 / SEO测试 / 安全测试 / 埋点测试（27）

1. `add-analytics`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Add Google Analytics 4 tracking to any project. Detects framework, adds tracking code, sets up events, and configures privacy settings.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/add-analytics>
2. `analytics-tracking-2`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：When the user wants to set up, improve, or audit analytics tracking and measurement. Also use when the user mentions "set up tracking," "GA4," "Google Analytics," "conversion tracking," "event tracking," "UTM parameters," "tag manager," "GTM," "analytics implementation," "tracking plan," "how do I measure this," "track conversions," "attribution," "Mixpanel," "Segment," "are my events firing," or "analytics isn't working." Use this whenever someone asks how to know if something is working or wants to measure marketing results. For A/B test measurement, see ab-test-setup.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/analytics-tracking-2>
3. `check-analytics`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Audit existing Google Analytics implementation. Checks for common issues, missing configurations, and optimization opportunities.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/check-analytics>
4. `cs-analytics-tracking`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Set up, audit, and debug analytics tracking implementation — GA4, Google Tag Manager, event taxonomy, conversion tracking, and data quality. Use when building a tracking plan from scratch, auditing existing analytics for gaps or errors, debugging missing events, or setting up GTM. Trigger keywords: GA4 setup, Google Tag Manager, GTM, event tracking, analytics implementation, conversion tracking, tracking plan, event taxonomy, custom dimensions, UTM tracking, analytics audit, missing events, tracking broken. NOT for analyzing marketing campaign data — use campaign-analytics for that. NOT for BI dashboards — use product-analytics for in-product event analysis.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/cs-analytics-tracking>
5. `frontend-performance`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Analyzes and improves frontend performance: LCP, FCP, CLS, bundle size, lazy loading, and runtime efficiency. Use when 性能优化, 首屏慢, 卡顿, 打包体积, performance optimization, or improving Core Web Vitals.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/frontend-performance>
6. `frontend-performance-audit`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：分析前端页面性能并输出结构化优化报告。适用于页面速度慢、lighthouse 指标差、core web vitals 不达标、首屏慢、交互卡顿、bundle 过大、阻塞渲染资源过多等场景。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/frontend-performance-audit>
7. `performance-profiler`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：分析代码性能，识别瓶颈并提供优化建议。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/performance-profiler>
8. `performance-testing`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：性能测试技能，用于验证系统性能、响应时间、吞吐量、资源使用率等。当用户需要进行压力测试、负载测试、稳定性测试时使用。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/performance-testing>
9. `performance-tuning`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Deep performance tuning workflow—goals and measurement, profiling, hotspots, caching and concurrency trade-offs, system-specific tuning (DB, GC, network), and verification. Use when fixing latency, throughput, or resource saturation.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/performance-tuning>
10. `pls-seo-audit`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Scan content and websites for SEO gaps, identify opportunities to outrank competitors. Use when: (1) Analyzing page SEO, (2) Checking meta tags and structured data, (3) Reviewing content for keyword optimization, (4) Auditing technical SEO factors.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/pls-seo-audit>
11. `react-performance`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：React and Next.js performance optimization patterns. Use when writing,
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/react-performance>
12. `security-audit-toolkit`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Audit codebases and infrastructure for security issues. Use when scanning dependencies for vulnerabilities, detecting hardcoded secrets, checking OWASP top 10 issues, verifying SSL/TLS, auditing file permissions, or reviewing code for injection and auth flaws.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/security-audit-toolkit>
13. `security-auditor`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Use when reviewing code for security vulnerabilities, implementing authentication flows, auditing OWASP Top 10, configuring CORS/CSP headers, handling secrets, input validation, SQL injection prevention, XSS protection, or any security-related code review.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/security-auditor>
14. `security-scanner`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Automated security scanning and vulnerability detection for web applications, APIs, and infrastructure. Use when you need to scan targets for vulnerabilities, check SSL certificates, find open ports, detect misconfigurations, or perform security audits. Integrates with nmap, nuclei, and other security tools.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/security-scanner>
15. `sensors-analytics-tracking`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Plan, audit, and validate Sensors Analytics (神策) tracking for web, H5, app, and mini-program scenarios. Use when the user mentions 神策, Sensors Analytics, 埋点, 事件 tracking, event taxonomy, 埋点方案, 数据校验, 漏埋/错埋/重复埋点, funnel, conversion tracking, or wants to connect a product flow to 神策平台.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/sensors-analytics-tracking>
16. `seo-optimizer`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：This skill should be used when analyzing HTML/CSS websites for SEO optimization, fixing SEO issues, generating SEO reports, or implementing SEO best practices. Use when the user requests SEO audits, optimization, meta tag improvements, schema markup implementation, sitemap generation, or general search engine optimization tasks.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/seo-optimizer>
17. `shelly-seo-analyzer`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Analyze any webpage URL for SEO issues and get actionable recommendations. Checks title tags, meta descriptions, heading structure, keyword density, image alt tags, Open Graph, and more.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/shelly-seo-analyzer>
18. `sw-analytics-tracking`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：When the user wants to set up, improve, or audit analytics tracking and measurement.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/sw-analytics-tracking>
19. `web-auto-analyzer`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Automatically analyze websites for performance metrics and audit issues using Lighthouse.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/web-auto-analyzer>
20. `web-perf`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Analyzes web performance using Chrome DevTools MCP. Measures Core Web Vitals (FCP, LCP, TBT, CLS, Speed Index), identifies render-blocking resources, network dependency chains, layout shifts, caching issues, and accessibility gaps. Use when asked to audit, profile, debug, or optimize page load performance, Lighthouse scores, or site speed.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/web-perf>
21. `webperf`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Web performance measurement and debugging toolkit. Use when the user asks about web performance, wants to audit a page, or says "analyze performance", "debug lcp", "check ttfb", "measure core web vitals", "audit images", or similar.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/webperf>
22. `webperf-core-web-vitals`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Intelligent Core Web Vitals analysis with automated workflows and decision trees. Measures LCP, CLS, INP with guided debugging that automatically determines follow-up analysis based on results. Includes workflows for LCP deep dive (5 phases), CLS investigation (loading vs interaction), INP debugging (latency breakdown + attribution), and cross-skill integration with loading, interaction, and media skills. Use when the user asks about Core Web Vitals, LCP optimization, layout shifts, or interaction responsiveness. Compatible with Chrome DevTools MCP.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/webperf-core-web-vitals>
23. `webperf-interaction`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Intelligent interaction performance analysis with automated workflows for INP debugging, scroll jank investigation, and main thread blocking. Includes decision trees that automatically run script attribution when long frames detected, break down input latency phases, and correlate layout shifts with interactions. Features workflows for complete interaction audit, third-party script impact analysis, and animation performance debugging. Cross-skill integration with Core Web Vitals (INP/CLS correlation) and Loading (script execution analysis). Use when the user asks about slow interactions, janky scrolling, unresponsive pages, or INP optimization. Compatible with Chrome DevTools MCP.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/webperf-interaction>
24. `webperf-loading`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Intelligent loading performance analysis with automated workflows for TTFB investigation (DNS/connection/server breakdown), render-blocking detection, script performance deep dive (first vs third-party attribution), font optimization, and resource hints validation. Includes decision trees that automatically analyze TTFB sub-parts when slow, detect script loading anti-patterns (async/defer/preload conflicts), identify render-blocking resources, and validate resource hints usage. Features workflows for complete loading audit (6 phases), backend performance investigation, and priority optimization. Cross-skill integration with Core Web Vitals (LCP resource loading), Interaction (script execution blocking), and Media (lazy loading strategy). Use when the user asks about TTFB, FCP, render-blocking, slow loading, font performance, script optimization, or resource hints. Compatible with Chrome DevTools MCP.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/webperf-loading>
25. `webperf-media`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Intelligent media optimization with automated workflows for images, videos, and SVGs. Includes decision trees that detect LCP images (triggers format/lazy-loading/priority analysis), identify layout shift risks (missing dimensions), and flag lazy loading issues (above-fold lazy or below-fold eager). Features workflows for complete media audit, LCP image investigation, video performance (poster optimization), and SVG embedded bitmap detection. Cross-skill integration with Core Web Vitals (LCP/CLS impact) and Loading (priority hints, resource preloading). Provides performance budgets and format recommendations based on content type. Use when the user asks about image optimization, LCP is an image/video, layout shifts from media, or media loading strategy. Compatible with Chrome DevTools MCP.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/webperf-media>
26. `webperf-resources`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Intelligent network quality analysis with adaptive loading strategies. Detects connection type (2g/3g/4g), bandwidth, RTT, and save-data mode, then automatically triggers appropriate optimization workflows. Includes decision trees that recommend image compression for slow connections, critical CSS inlining for high RTT, and save-data optimizations (disable autoplay, reduce quality). Features connection-aware performance budgets (500KB for 2g, 1.5MB for 3g, 3MB for 4g+) and adaptive loading implementation guides. Cross-skill integration with Loading (TTFB impact), Media (responsive images), and Core Web Vitals (connection impact on LCP/INP). Use when the user asks about slow connections, mobile optimization, save-data support, or adaptive loading strategies. Compatible with Chrome DevTools MCP.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/webperf-resources>
27. `website-seo`
   - 分类名称：性能测试 / SEO测试 / 安全测试 / 埋点测试
   - 功能作用：Complete on-page SEO system for any website — page optimization, schema markup, technical SEO checklist, internal linking strategy, Core Web Vitals guidance, and AI-driven content gap analysis. Works for any CMS (WordPress, Webflow, Squarespace, custom).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/website-seo>

### 缺陷管理 / 复盘 / 协同（8）

1. `atlassian-jira`
   - 分类名称：缺陷管理 / 复盘 / 协同
   - 功能作用：Manage Jira Cloud issues — search, create, update, comment, transition. Use when user mentions Jira, issues, tickets, sprints, bugs, tasks, or issue keys like PROJ-123.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/atlassian-jira>
2. `bug-investigation`
   - 分类名称：缺陷管理 / 复盘 / 协同
   - 功能作用：Systematically reproduces, locates, and diagnoses frontend bugs using steps, hypotheses, DevTools, and minimal repro. Use when 排查bug, bug定位, 调试, debugging, 复现问题, or investigating frontend issues.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/bug-investigation>
3. `incident-fupan`
   - 分类名称：缺陷管理 / 复盘 / 协同
   - 功能作用：事故复盘 / Incident Fupan — structured root cause analysis for production failures, outages, bugs, and near-misses. Use when: (1) 事故复盘 or incident review is needed, (2) a production incident just happened and needs root cause analysis, (3) an agent made a costly mistake and you want to prevent recurrence, (4) building safety rules or kill switches from incident patterns. Triggers on: 复盘, fupan, postmortem, incident review, root cause analysis, 事故分析. Generates a full report with timeline, 5 Whys root cause, impact assessment, fix/prevention actions, and new defensive rules. NOT for: routine debugging, feature planning, or non-incident analysis.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/incident-fupan>
4. `incident-response`
   - 分类名称：缺陷管理 / 复盘 / 协同
   - 功能作用：Structured incident response for OpenClaw system failures. Use when a user reports something broken, missing, changed, or misbehaving — config loss, agent routing failures, binding changes, gateway crashes, missing settings, or any system regression. Follows a strict 7-phase loop: Triage → Evidence → 5 Whys → Restore → Prevent → Monitor → Document. Triggers on: "investigate", "why did X stop working", "something changed", "bindings lost", "gateway down", "gateway crashed", "setting disappeared", "something disappeared", "fix this", "who changed X", "root cause", "audit", "misconfigured", "agent not responding".
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/incident-response>
5. `jira`
   - 分类名称：缺陷管理 / 复盘 / 协同
   - 功能作用：Use when the user mentions Jira issues (e.g., "PROJ-123"), asks about tickets, wants to create/view/update issues, check sprint status, or manage their Jira workflow. Triggers on keywords like "jira", "issue", "ticket", "sprint", "backlog", or issue key patterns.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/jira>
6. `linear`
   - 分类名称：缺陷管理 / 复盘 / 协同
   - 功能作用：Query and manage Linear issues, projects, and team workflows.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/linear>
7. `mantis-manager`
   - 分类名称：缺陷管理 / 复盘 / 协同
   - 功能作用：Manage Mantis Bug Tracker (issues, projects, users, filters, configs) via the official Mantis REST API. Supports full CRUD operations on issues, projects, users, attachments, notes, tags, relationships, and configuration management. Features dynamic instance switching with context-aware base URL and token resolution.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/mantis-manager>
8. `qa-bug-triage`
   - 分类名称：缺陷管理 / 复盘 / 协同
   - 功能作用：Turn failed tests, screenshots, logs, and mismatches into high-quality defect reports with titles, reproduction steps, severity/priority guidance, and likely ownership hints. Use when the user asks to write bugs, triage failures, classify severity, deduplicate issues, or convert raw evidence into actionable QA defect records.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-bug-triage>

### 测试支撑环境 / 数据库 / 日志 / 可观测 / 消息系统（15）

1. `db-readonly`
   - 分类名称：测试支撑环境 / 数据库 / 日志 / 可观测 / 消息系统
   - 功能作用：Run safe read-only queries against MySQL or PostgreSQL for data inspection, reporting, and troubleshooting. Use when the user asks to read tables, inspect schema, count rows, sample data, or export query results without modifying data.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/db-readonly>
2. `grafana-api`
   - 分类名称：测试支撑环境 / 数据库 / 日志 / 可观测 / 消息系统
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/grafana-api>
3. `kafka`
   - 分类名称：测试支撑环境 / 数据库 / 日志 / 可观测 / 消息系统
   - 功能作用：Produce, consume, and manage Kafka topics with lag monitoring and data export. Use when publishing messages, consuming topics, monitoring consumer lag.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/kafka>
4. `kibana`
   - 分类名称：测试支撑环境 / 数据库 / 日志 / 可观测 / 消息系统
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/kibana>
5. `logging-observability`
   - 分类名称：测试支撑环境 / 数据库 / 日志 / 可观测 / 消息系统
   - 功能作用：Structured logging, distributed tracing, and metrics collection patterns for building observable systems. Use when implementing logging infrastructure, setting up distributed tracing with OpenTelemetry, designing metrics collection (RED/USE methods), configuring alerting and dashboards, or reviewing observability practices. Covers structured JSON logging, context propagation, trace sampling, Prometheus/Grafana stack, alert design, and PII/secret scrubbing.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/logging-observability>
6. `mqtt-client`
   - 分类名称：测试支撑环境 / 数据库 / 日志 / 可观测 / 消息系统
   - 功能作用：This is a simple client for connecting to an mqtt instance
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/mqtt-client>
7. `mysqladm`
   - 分类名称：测试支撑环境 / 数据库 / 日志 / 可观测 / 消息系统
   - 功能作用：MySQL database management via mysql CLI or Python mysql-connector. Use when: (1) executing queries and displaying results, (2) managing schemas (create/alter tables, indexes), (3) database backup/restore, (4) performance analysis (slow queries, index usage), (5) user and permission management. NOT for: complex ETL workflows (use specialized tools), real-time streaming (use CDC tools), or when mysql CLI is not installed/accessible.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/mysqladm>
8. `postgres-mcp-skill`
   - 分类名称：测试支撑环境 / 数据库 / 日志 / 可观测 / 消息系统
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/postgres-mcp-skill>
9. `prometheus`
   - 分类名称：测试支撑环境 / 数据库 / 日志 / 可观测 / 消息系统
   - 功能作用：Query Prometheus monitoring data to check server metrics, resource usage, and system health. Use when the user asks about server status, disk space, CPU/memory usage, network stats, or any metrics collected by Prometheus. Supports multiple Prometheus instances with aggregated queries, config file or environment variables, and HTTP Basic Auth.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/prometheus>
10. `promql-cli`
   - 分类名称：测试支撑环境 / 数据库 / 日志 / 可观测 / 消息系统
   - 功能作用：CLI for querying Prometheus and PromQL-compatible engines (Thanos, Cortex, VictoriaMetrics, Grafana Mimir, Grafana Tempo...) — instant queries, range queries, metric discovery (metrics/labels/meta subcommands), output formats (table/csv/json/graph). Apply when executing PromQL queries, troubleshooting performance issues on a software having observability, investigating latency/error rates/saturation, or analyzing time series data.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/promql-cli>
11. `qa-test-data-factory`
   - 分类名称：测试支撑环境 / 数据库 / 日志 / 可观测 / 消息系统
   - 功能作用：Design and generate QA test data sets for validation, boundaries, permissions, workflow states, imports, and integration scenarios. Use when the user asks for test data, edge-case values, account/data setup plans, or scenario matrices needed to execute tests reliably.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-test-data-factory>
12. `rabbitmq-client-guide`
   - 分类名称：测试支撑环境 / 数据库 / 日志 / 可观测 / 消息系统
   - 功能作用：RabbitMQ 客户端代码指南。当用户需要编写、调试或审查 RabbitMQ 应用代码时使用。涵盖：用任意语言（Java/Go/Python/PHP/.NET）写生产者或消费者；排查连接暴增、消息丢失、Broken pipe、消费慢、漏消费等客户端问题；审查 spring-boot-starter-amqp、amqp091-go、pika、php-amqplib 等库的代码；实现 RPC 模式、confirm、手动 ack、prefetch 调优、连接复用、重连机制。用户贴了 RabbitMQ 相关代码片段或描述了客户端侧的消息异常时，始终触发此技能。不适用于 RabbitMQ 服务端运维部署、Kafka 等其他消息系统、或纯架构设计问题。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/rabbitmq-client-guide>
13. `sql-toolkit`
   - 分类名称：测试支撑环境 / 数据库 / 日志 / 可观测 / 消息系统
   - 功能作用：Query, design, migrate, and optimize SQL databases. Use when working with SQLite, PostgreSQL, or MySQL — schema design, writing queries, creating migrations, indexing, backup/restore, and debugging slow queries. No ORMs required.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/sql-toolkit>
14. `tcpdump`
   - 分类名称：测试支撑环境 / 数据库 / 日志 / 可观测 / 消息系统
   - 功能作用：Tcpdump reference tool. Use when working with tcpdump in devtools contexts.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/tcpdump>
15. `wireshark-analysis`
   - 分类名称：测试支撑环境 / 数据库 / 日志 / 可观测 / 消息系统
   - 功能作用：Network traffic analysis with Wireshark and tshark. Capture packets, write display and BPF filters, follow TCP/UDP/TLS streams, detect C2 beacons, troubleshoot connectivity, and perform forensic PCAP analysis.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/wireshark-analysis>

### 测试平台 / CI / 环境自动化（18）

1. `ci-cd`
   - 分类名称：测试平台 / CI / 环境自动化
   - 功能作用：Automate builds, tests, and deployments across web, mobile, and backend applications.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/ci-cd>
2. `cicd-pipeline`
   - 分类名称：测试平台 / CI / 环境自动化
   - 功能作用：Create, debug, and manage CI/CD pipelines with GitHub Actions. Use when the user needs to set up automated testing, deployment, releases, or workflows. Covers workflow syntax, common patterns, secrets management, caching, matrix builds, and troubleshooting.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/cicd-pipeline>
3. `cloudflare-api`
   - 分类名称：测试平台 / CI / 环境自动化
   - 功能作用：Connect to Cloudflare API for DNS management, tunnels, and zone administration. Use when user needs to manage domains, DNS records, or create tunnels.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/cloudflare-api>
4. `cloudflare-tunnel-manager`
   - 分类名称：测试平台 / CI / 环境自动化
   - 功能作用：Create and manage secure Cloudflare Tunnels using cloudflared. Expose local services to the internet safely, configure DNS routing, set up zero-trust access controls, and manage tunnel authentication without opening firewall ports.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/cloudflare-tunnel-manager>
5. `docker-compose`
   - 分类名称：测试平台 / CI / 环境自动化
   - 功能作用：Define multi-container applications with proper dependency handling, networking, and volume management.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/docker-compose>
6. `docker-diag`
   - 分类名称：测试平台 / CI / 环境自动化
   - 功能作用：Advanced log analysis for Docker containers using signal extraction.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/docker-diag>
7. `docker-skill`
   - 分类名称：测试平台 / CI / 环境自动化
   - 功能作用：Installs and uses Docker reliably with official docs. Use when installing Docker (Desktop or Engine), building or running containers, writing Dockerfiles, using docker compose, or when the user asks about containers, images, or Docker CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/docker-skill>
8. `github-actions`
   - 分类名称：测试平台 / CI / 环境自动化
   - 功能作用：Design, debug, and harden GitHub Actions workflows with reusable pipelines, safe permissions, and faster CI and release automation.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/github-actions>
9. `gitlab`
   - 分类名称：测试平台 / CI / 环境自动化
   - 功能作用：Avoid common GitLab CI/CD mistakes — rules gotchas, silent failures, and YAML merge traps.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/gitlab>
10. `helm`
   - 分类名称：测试平台 / CI / 环境自动化
   - 功能作用：Create, lint, template, and package Kubernetes Helm charts with checks. Use when scaffolding charts, linting templates, or packaging chart releases.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/helm>
11. `initial-traefik`
   - 分类名称：测试平台 / CI / 环境自动化
   - 功能作用：Initialize and configure Traefik reverse proxy with Docker. Install Traefik, configure Docker Compose, set up service routing via path prefix or host-based routing, enable features like dashboard metrics logging tracing, configure Dashboard access via nip.io or path prefix
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/initial-traefik>
12. `jenkins`
   - 分类名称：测试平台 / CI / 环境自动化
   - 功能作用：Interact with Jenkins CI/CD server via REST API. Use when you need to trigger builds, check build status, view console output, manage jobs, or monitor Jenkins nodes and queue. Supports deployment to different Jenkins instances via environment variables.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/jenkins>
13. `k8s`
   - 分类名称：测试平台 / CI / 环境自动化
   - 功能作用：Avoid common Kubernetes mistakes — resource limits, probe configuration, selector mismatches, and RBAC pitfalls.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/k8s>
14. `kubectl`
   - 分类名称：测试平台 / CI / 环境自动化
   - 功能作用：Execute and manage Kubernetes clusters via kubectl commands. Query resources, deploy applications, debug containers, manage configurations, and monitor cluster health. Use when working with Kubernetes clusters, containers, deployments, or pod diagnostics.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/kubectl>
15. `kubernetes-devops`
   - 分类名称：测试平台 / CI / 环境自动化
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/kubernetes-devops>
16. `nginx`
   - 分类名称：测试平台 / CI / 环境自动化
   - 功能作用：Configure Nginx for reverse proxy, load balancing, SSL termination, and high-performance static serving.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/nginx>
17. `terraform-iac`
   - 分类名称：测试平台 / CI / 环境自动化
   - 功能作用：Deep Terraform/IaC workflow—module boundaries, state, workspaces, plan/apply safety, drift, secrets, CI integration, and team governance. Use when building infra as code, refactoring modules, or debugging state issues.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/terraform-iac>
18. `traefik`
   - 分类名称：测试平台 / CI / 环境自动化
   - 功能作用：Avoid common Traefik mistakes — router priority, TLS configuration, Docker labels syntax, and middleware ordering.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/traefik>

## 二、非测试技能类

### 开发 / GitHub / Agent 工具（11）

1. `capability-evolver-pro`
   - 分类名称：开发 / GitHub / Agent 工具
   - 功能作用：>
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/capability-evolver-pro>
2. `clawhub`
   - 分类名称：开发 / GitHub / Agent 工具
   - 功能作用：Use the ClawHub CLI to search, install, update, and publish agent skills from clawhub.com. Use when you need to fetch new skills on the fly, sync installed skills to latest or a specific version, or publish new/updated skill folders with the npm-installed clawhub CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/clawhub>
3. `coding-agent-common`
   - 分类名称：开发 / GitHub / Agent 工具
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/coding-agent-common>
4. `deerflow-super-agent-harness`
   - 分类名称：开发 / GitHub / Agent 工具
   - 功能作用：Install, configure, and extend DeerFlow 2.0 — an open-source super agent harness that orchestrates sub-agents, memory, sandboxes, and skills to handle complex multi-step tasks.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/deerflow-super-agent-harness>
5. `find-skills-3`
   - 分类名称：开发 / GitHub / Agent 工具
   - 功能作用：Helps users discover and install agent skills when they ask questions like "how do I do X", "find a skill for X", "is there a skill that can...", or express interest in extending capabilities. This skill should be used when the user is looking for functionality that might exist as an installable skill.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/find-skills-3>
6. `gh-issues`
   - 分类名称：开发 / GitHub / Agent 工具
   - 功能作用：Fetch GitHub issues, spawn sub-agents to implement fixes and open PRs, then monitor and address PR review comments. Usage: /gh-issues [owner/repo] [--label bug] [--limit 5] [--milestone v1.0] [--assignee @me] [--fork user/repo] [--watch] [--interval 5] [--reviews-only] [--cron] [--dry-run] [--model glm-5] [--notify-channel -1002381931352]
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/gh-issues>
7. `github`
   - 分类名称：开发 / GitHub / Agent 工具
   - 功能作用：Interact with GitHub using the `gh` CLI. Use `gh issue`, `gh pr`, `gh run`, and `gh api` for issues, PRs, CI runs, and advanced queries.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/github>
8. `healthcheck`
   - 分类名称：开发 / GitHub / Agent 工具
   - 功能作用：Host security hardening and risk-tolerance configuration for OpenClaw deployments. Use when a user asks for security audits, firewall/SSH/update hardening, risk posture, exposure review, OpenClaw cron scheduling for periodic checks, or version status checks on a machine running OpenClaw (laptop, workstation, Pi, VPS).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/healthcheck>
9. `self-improving-agent-skill`
   - 分类名称：开发 / GitHub / Agent 工具
   - 功能作用：基于对经验的持续学习，不断优化 Agent 能力。适用于完成重要任务后、出现错误时、会话结束时，或用户输入“自我进化”“总结经验”“从经验中学习”等指令时触发。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/self-improving-agent-skill>
10. `skill-creator`
   - 分类名称：开发 / GitHub / Agent 工具
   - 功能作用：Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Claude's capabilities with specialized knowledge, workflows, or tool integrations.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/skill-creator>
11. `skill-vetter`
   - 分类名称：开发 / GitHub / Agent 工具
   - 功能作用：Security-first skill vetting for AI agents. Use before installing any skill from ClawdHub, GitHub, or other sources. Checks for red flags, permission scope, and suspicious patterns.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/skill-vetter>

### 飞书 / 文档 / 知识库 / 媒体内容（18）

1. `daily-report-writer`
   - 分类名称：飞书 / 文档 / 知识库 / 媒体内容
   - 功能作用：根据输入生成日报 Markdown 草稿并写入 reports 目录
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/daily-report-writer>
2. `feishu-doc`
   - 分类名称：飞书 / 文档 / 知识库 / 媒体内容
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/feishu-doc>
3. `feishu-drive`
   - 分类名称：飞书 / 文档 / 知识库 / 媒体内容
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/feishu-drive>
4. `feishu-perm`
   - 分类名称：飞书 / 文档 / 知识库 / 媒体内容
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/feishu-perm>
5. `feishu-wiki`
   - 分类名称：飞书 / 文档 / 知识库 / 媒体内容
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/feishu-wiki>
6. `html-to-pdf`
   - 分类名称：飞书 / 文档 / 知识库 / 媒体内容
   - 功能作用：Convert HTML files and URLs to PDF using Puppeteer. Use when a user needs to convert HTML documents, web pages, or reports to PDF format with custom formatting options (margins, page size, orientation, headers/footers).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/html-to-pdf>
7. `image-edit`
   - 分类名称：飞书 / 文档 / 知识库 / 媒体内容
   - 功能作用：Edit images with AI inpainting, outpainting, background removal, upscaling, and restoration tools.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/image-edit>
8. `image-handler`
   - 分类名称：飞书 / 文档 / 知识库 / 媒体内容
   - 功能作用：Read, analyze, convert, and manipulate image files (PNG, JPG, GIF, WebP, TIFF, BMP, HEIC, SVG, ICO). Use when working with images: reading metadata, converting formats, resizing, rotating, compressing, or batch processing. Triggers on mentions of image files, file paths with image extensions, or requests to process/convert images.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/image-handler>
9. `lh-video-gen`
   - 分类名称：飞书 / 文档 / 知识库 / 媒体内容
   - 功能作用：Generate vertical short videos (9:16) from a Markdown script. Parses script sections, generates TTS audio, renders subtitle cards, and composites into MP4 with FFmpeg.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/lh-video-gen>
10. `openclaw-slides`
   - 分类名称：飞书 / 文档 / 知识库 / 媒体内容
   - 功能作用：Create stunning, animation-rich HTML presentations from scratch or convert PowerPoint files (.ppt/.pptx) to beautiful web slides. Use when the user wants to build a pitch deck, presentation, slideshow, or slide deck — or convert an existing PPT to a web presentation. Generates zero-dependency single HTML files with keyboard/touch navigation and scroll-triggered animations. Style options include Neon Cyber, Bold Signal, Swiss Modern, Paper & Ink, and 8 more curated presets.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/openclaw-slides>
11. `pdf-skill`
   - 分类名称：飞书 / 文档 / 知识库 / 媒体内容
   - 功能作用：Create, read, edit, merge, split PDF files. Supports text extraction, table extraction, form filling, watermarks, OCR, and HTML-to-PDF conversion.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/pdf-skill>
12. `powerpoint-pptx`
   - 分类名称：飞书 / 文档 / 知识库 / 媒体内容
   - 功能作用：Create, inspect, and edit Microsoft PowerPoint presentations and PPTX decks with reliable layouts, templates, placeholders, notes, charts, and visual QA. Use when (1) the task is about PowerPoint or `.pptx`; (2) layouts, placeholders, notes, charts, comments, or template fidelity matter; (3) the deck must render cleanly after edits.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/powerpoint-pptx>
13. `pptx-generator`
   - 分类名称：飞书 / 文档 / 知识库 / 媒体内容
   - 功能作用：专业PPT生成器。Use when user wants to create editable PowerPoint presentations with professional layouts, multiple styles, and beautiful designs. Supports business, academic, creative styles. 可编辑PPT、幻灯片制作、演示文稿。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/pptx-generator>
14. `smart-weekly-report`
   - 分类名称：飞书 / 文档 / 知识库 / 媒体内容
   - 功能作用：> **使用方法**：将本文件内容复制到你使用的 AI 对话框中，然后用自然语言描述你本周的工作情况，AI 将自动生成结构化周报。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/smart-weekly-report>
15. `summarize`
   - 分类名称：飞书 / 文档 / 知识库 / 媒体内容
   - 功能作用：Summarize URLs or files with the summarize CLI (web, PDFs, images, audio, YouTube).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/summarize>
16. `video-gif-converter`
   - 分类名称：飞书 / 文档 / 知识库 / 媒体内容
   - 功能作用：Convert short video moments into GIF-friendly snippets for demos, support, product walkthroughs, and social sharing. Use when a team needs lightweight motion previews instead of full video files.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/video-gif-converter>
17. `video-stitcher`
   - 分类名称：飞书 / 文档 / 知识库 / 媒体内容
   - 功能作用：视频片段拼接和后期处理。输入视频片段列表，输出完整视频。支持转场效果、背景音乐、字幕叠加。底层使用 FFmpeg 或 Remotion。触发词：拼接视频、合并视频、视频剪辑、video stitch、concatenate videos、add transitions。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/video-stitcher>
18. `weekly-report-writer`
   - 分类名称：飞书 / 文档 / 知识库 / 媒体内容
   - 功能作用：用于撰写结构清晰的中文周报。只要用户提到“周报、weekly report、本周总结、工作复盘、下周计划、给老板汇报”，即使没有明确说“写周报”，也应主动使用此技能来生成可直接发送的周报内容。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/weekly-report-writer>

### 安全 / 基础设施 / 运维观测（5）

1. `aws-infra`
   - 分类名称：安全 / 基础设施 / 运维观测
   - 功能作用：Chat-based AWS infrastructure assistance using AWS CLI and console context. Use for querying, auditing, and monitoring AWS resources (EC2, S3, IAM, Lambda, ECS/EKS, RDS, CloudWatch, billing, etc.), and for proposing safe changes with explicit confirmation before any write/destructive action.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/aws-infra>
2. `cloudflare-toolkit`
   - 分类名称：安全 / 基础设施 / 运维观测
   - 功能作用：Manage Cloudflare domains, DNS records, SSL settings, zone configuration, firewall rules, tunnels, and analytics via the Cloudflare API. Use when the user asks to set up a domain, add/edit/delete DNS records, configure SSL, check zone settings, manage Cloudflare Tunnels, view analytics, or any Cloudflare account management task.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/cloudflare-toolkit>
3. `grafana-lens`
   - 分类名称：安全 / 基础设施 / 运维观测
   - 功能作用：Grafana tools for data visualization, monitoring, alerting, security, and SRE investigation. Use grafana_query, grafana_query_logs, grafana_query_traces, grafana_create_dashboard, grafana_update_dashboard, grafana_create_alert, grafana_share_dashboard, grafana_annotate, grafana_explore_datasources, grafana_list_metrics, grafana_search, grafana_get_dashboard, grafana_check_alerts, grafana_push_metrics, grafana_explain_metric, grafana_security_check, and grafana_investigate. Trigger when asked about metrics, dashboards, monitoring, alerts, costs, token usage, data visualization, PromQL, Prometheus, LogQL, Loki, log queries, error logs, log search, TraceQL, Tempo, traces, distributed tracing, span search, find slow traces, debug session traces, annotations, deployments, sharing charts, investigating alert notifications, pushing custom data (calendar, git, fitness, finance) to Grafana for visualization, pushing historical data, backfilling metrics, recording past data with timestamps, modifying dashboards, adding panels, removing panels, changing dashboard settings, updating dashboard time range, explain metric, metric trend, what is this metric, how has this changed, is this metric normal, why did my bill spike, cost visibility, security monitoring, security check, security audit, am I being attacked, is my agent compromised, suspicious activity, threat detection, prompt injection detection, set up security alerts, investigate, debug, triage, root cause, what's wrong, why is X broken, anomaly detection, RED method, USE method, alert fatigue, postmortem, incident summary.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/grafana-lens>
4. `monitoring`
   - 分类名称：安全 / 基础设施 / 运维观测
   - 功能作用：Set up observability for applications and infrastructure with metrics, logs, traces, and alerts.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/monitoring>
5. `system-resource-monitor`
   - 分类名称：安全 / 基础设施 / 运维观测
   - 功能作用：A clean, reliable system resource monitor for CPU load, RAM, Swap, and Disk usage. Optimized for OpenClaw.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/system-resource-monitor>

### 数据 / 办公 / 个人效率 / 其他（52）

1. `1password`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Set up and use 1Password CLI (op). Use when installing the CLI, enabling desktop app integration, signing in (single or multi-account), or reading/injecting/running secrets via op.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/1password>
2. `apple-notes`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Manage Apple Notes via the `memo` CLI on macOS (create, view, edit, delete, search, move, and export notes). Use when a user asks OpenClaw to add a note, list notes, search notes, or manage note folders.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/apple-notes>
3. `apple-reminders`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Manage Apple Reminders via remindctl CLI (list, add, edit, complete, delete). Supports lists, date filters, and JSON/plain output.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/apple-reminders>
4. `atlassian-confluence`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Read and write Confluence Cloud pages — search, create, update, manage labels. Use when user mentions Confluence, wiki, documentation, pages, or knowledge base.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/atlassian-confluence>
5. `automate-excel`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Automates reading, writing, merging, transforming, and validating Excel (.xlsx/.xls) files. Use when the user works with spreadsheets, .xlsx files, Excel data, CSV-to-Excel conversion, batch Excel processing, or report generation from tables.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/automate-excel>
6. `baidu-web-search`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Use Baidu Qianfan web search API for real-time web retrieval. Use when the user needs to search the web, get latest news, verify facts, or expresses intent like "查一下","搜一下","最近","今天","今年", or asks about events/people/products that require looking up.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/baidu-web-search>
7. `bear-notes`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Create, search, and manage Bear notes via grizzly CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/bear-notes>
8. `blogwatcher`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Monitor blogs and RSS/Atom feeds for updates using the blogwatcher CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/blogwatcher>
9. `blucli`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：BluOS CLI (blu) for discovery, playback, grouping, and volume.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/blucli>
10. `bluebubbles`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Use when you need to send or manage iMessages via BlueBubbles (recommended iMessage integration). Calls go through the generic message tool with channel="bluebubbles".
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/bluebubbles>
11. `camsnap`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Capture frames or clips from RTSP/ONVIF cameras.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/camsnap>
12. `crash-fixer`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Autonomous crash analysis and bug fixing. Monitors crash reports from Cloudflare D1, deduplicates, analyzes with Codex 5.3 High, generates fixes, and creates PRs. Usage: /crash-fixer [--hours 24] [--limit 5] [--dry-run]
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/crash-fixer>
13. `discord`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Discord ops via the message tool (channel=discord).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/discord>
14. `eightctl`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Control Eight Sleep pods (status, temperature, alarms, schedules).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/eightctl>
15. `excel-xlsx`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Create, inspect, and edit Microsoft Excel workbooks and XLSX files with reliable formulas, dates, types, formatting, recalculation, and template preservation. Use when (1) the task is about Excel, `.xlsx`, `.xlsm`, `.xls`, `.csv`, or `.tsv`; (2) formulas, formatting, workbook structure, or compatibility matter; (3) the file must stay reliable after edits.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/excel-xlsx>
16. `fastlane`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：iOS/macOS app automation — builds, signing, TestFlight, App Store via CLI
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/fastlane>
17. `gemini`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Gemini CLI for one-shot Q&A, summaries, and generation.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/gemini>
18. `gifgrep`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Search GIF providers with CLI/TUI, download results, and extract stills/sheets.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/gifgrep>
19. `gog`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Google Workspace CLI for Gmail, Calendar, Drive, Contacts, Sheets, and Docs.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/gog>
20. `goplaces`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Query Google Places API (New) via the goplaces CLI for text search, place details, resolve, and reviews. Use for human-friendly place lookup or JSON output for scripts.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/goplaces>
21. `himalaya`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：CLI to manage emails via IMAP/SMTP. Use `himalaya` to list, read, write, reply, forward, search, and organize emails from the terminal. Supports multiple accounts and message composition with MML (MIME Meta Language).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/himalaya>
22. `imsg`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：iMessage/SMS CLI for listing chats, history, and sending messages via Messages.app.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/imsg>
23. `mcporter`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Use the mcporter CLI to list, configure, auth, and call MCP servers/tools directly (HTTP or stdio), including ad-hoc servers, config edits, and CLI/type generation.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/mcporter>
24. `mobile-responsive`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Deep responsive design workflow—breakpoints, content priority, touch targets, typography, performance on mobile networks, and testing on real devices. Use when fixing mobile UX, defining responsive patterns, or auditing layouts across viewports.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/mobile-responsive>
25. `model-usage`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Use CodexBar CLI local cost usage to summarize per-model usage for Codex or Claude, including the current (most recent) model or a full model breakdown. Trigger when asked for model-level usage/cost data from codexbar, or when you need a scriptable per-model summary from codexbar cost JSON.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/model-usage>
26. `nano-pdf`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Edit PDFs with natural-language instructions using the nano-pdf CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/nano-pdf>
27. `notion`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Notion API for creating and managing pages, databases, and blocks.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/notion>
28. `obsidian`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Work with Obsidian vaults (plain Markdown notes) and automate via obsidian-cli.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/obsidian>
29. `openai-whisper`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Local speech-to-text with the Whisper CLI (no API key).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/openai-whisper>
30. `openai-whisper-api`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Transcribe audio via OpenAI Audio Transcriptions API (Whisper).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/openai-whisper-api>
31. `openclaw-agent-browser`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Headless browser automation CLI for AI agents. Use when interacting with websites — navigating pages, filling forms, clicking buttons, taking screenshots, extracting data, scraping, testing web apps, downloading files, or automating any browser task. Triggers on requests to "open a website", "fill out a form", "click a button", "take a screenshot", "scrape data", "test this web app", "login to a site", "monitor a page", or any task requiring programmatic web interaction.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/openclaw-agent-browser>
32. `openclaw-log-analyzer`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Intelligent log analysis tool for monitoring cron jobs, detecting errors, analyzing patterns, and generating reports. Supports automatic error detection, log aggregation, and Discord notifications.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/openclaw-log-analyzer>
33. `openhue`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Control Philips Hue lights and scenes via the OpenHue CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/openhue>
34. `oracle`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Best practices for using the oracle CLI (prompt + file bundling, engines, sessions, and file attachment patterns).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/oracle>
35. `ordercli`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Foodora-only CLI for checking past orders and active order status (Deliveroo WIP).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/ordercli>
36. `peekaboo`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Capture and automate macOS UI with the Peekaboo CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/peekaboo>
37. `pls-audit-website`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Perform full health check on websites, identifying technical friction points and user experience issues. Use when: (1) Auditing website performance, (2) Checking for broken links, (3) Analyzing page structure, (4) Testing accessibility, (5) Reviewing security headers.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/pls-audit-website>
38. `sag`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：ElevenLabs text-to-speech with mac-style say UX.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/sag>
39. `session-logs`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Search and analyze your own session logs (older/parent conversations) using jq.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/session-logs>
40. `sherpa-onnx-tts`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Local text-to-speech via sherpa-onnx (offline, no cloud)
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/sherpa-onnx-tts>
41. `slack`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Use when you need to control Slack from OpenClaw via the slack tool, including reacting to messages or pinning/unpinning items in Slack channels or DMs.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/slack>
42. `songsee`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Generate spectrograms and feature-panel visualizations from audio with the songsee CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/songsee>
43. `sonoscli`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Control Sonos speakers (discover/status/play/volume/group).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/sonoscli>
44. `spotify-player`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Terminal Spotify playback/search via spogo (preferred) or spotify_player.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/spotify-player>
45. `things-mac`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Manage Things 3 via the `things` CLI on macOS (add/update projects+todos via URL scheme; read/search/list from the local Things database). Use when a user asks OpenClaw to add a task to Things, list inbox/today/upcoming, search tasks, or inspect projects/areas/tags.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/things-mac>
46. `tmux`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Remote-control tmux sessions for interactive CLIs by sending keystrokes and scraping pane output.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/tmux>
47. `trello`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Manage Trello boards, lists, and cards via the Trello REST API.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/trello>
48. `video-frames`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Extract frames or short clips from videos using ffmpeg.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/video-frames>
49. `voice-call`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Start voice calls via the OpenClaw voice-call plugin.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/voice-call>
50. `wacli`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Send WhatsApp messages to other people or search/sync WhatsApp history via the wacli CLI (not for normal user chats).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/wacli>
51. `weather`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：Get current weather and forecasts via wttr.in or Open-Meteo. Use when: user asks about weather, temperature, or forecasts for any location. NOT for: historical weather data, severe weather alerts, or detailed meteorological analysis. No API key needed.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/weather>
52. `xurl`
   - 分类名称：数据 / 办公 / 个人效率 / 其他
   - 功能作用：A CLI tool for making authenticated requests to the X (Twitter) API. Use this skill when you need to post tweets, reply, quote, search, read posts, manage followers, send DMs, upload media, or interact with any X API v2 endpoint.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/xurl>

## 四、建议安装类

### A. QA 核心安装包（大多数测试同学先装这一组）

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

### B. 前端 / 页面性能专项安装包

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

### C. API / 接口专项安装包

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

### D. Web 自动化 / E2E 专项安装包

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

### E. APP / 移动测试专项安装包

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

### F. 缺陷 / 复盘 / 发布准入专项安装包

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

