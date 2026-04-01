# 测试专项技能

## 需求分析 / 测试设计 / 用例 / 追踪 / 发布准入（8）

1. `afrexai-qa-test-plan`
   - 功能作用：You are a Quality Assurance architect. Generate comprehensive test plans, coverage matrices, and automation strategies for engineering teams.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/afrexai-qa-test-plan>
2. `qa-prd-analyzer`
   - 功能作用：Analyze PRDs, Feishu docs, wiki pages, specs, change notes, and prototype text into structured feature breakdowns, business flows, hidden assumptions, ambiguity lists, and QA risk summaries. Use when the user asks to analyze a requirement, break down a feature, review a spec, find missing cases, or identify unclear/risky requirements before test design.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-prd-analyzer>
3. `qa-regression-planner`
   - 功能作用：Plan focused QA regression scope from requirement changes, bug fixes, impacted modules, and system dependencies. Use when the user asks what to regress, wants a change-impact-based regression plan, or needs a lean smoke vs full-regression split for a release.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-regression-planner>
4. `qa-release-gate-checker`
   - 功能作用：Decide whether a build is releasable by checking core-flow status, unresolved defects, coverage gaps, and residual risks. Use when the user asks if a version can ship, wants a release gate decision, or needs a concise go/no-go QA judgement from current evidence.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-release-gate-checker>
5. `qa-test-point-extractor`
   - 功能作用：Convert requirements, flows, API specs, and feature summaries into structured QA test points covering happy path, negative path, boundary, permission, state transition, compatibility, and resilience. Use when the user asks to extract test points, design coverage, list edge cases, or expand testing scope before formal test cases are written.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-test-point-extractor>
6. `qa-test-report-generator`
   - 功能作用：Summarize QA execution into release-facing test reports with scope, environment, pass/fail counts, defect distribution, residual risk, and release recommendation. Use when the user asks to generate a test report, release summary, QA conclusion, execution recap, or stakeholder-ready testing status update.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-test-report-generator>
7. `qa-testcase-writer`
   - 功能作用：Turn QA test points or requirements into standardized test cases with preconditions, data, steps, expected results, priority, and automation hints. Use when the user asks to write test cases, generate smoke/regression cases, convert test points into executable cases, or format cases for docs, Feishu, spreadsheets, or case-management tools.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-testcase-writer>
8. `qa-traceability-mapper`
   - 功能作用：Build QA traceability between requirements, test points, test cases, execution results, and defects. Use when the user asks for a traceability matrix, coverage mapping, gap analysis, release coverage proof, or help linking requirements to tests and bugs.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-traceability-mapper>

## 功能测试 / 冒烟测试 / 回归测试 / 巡检（10）

1. `afrexai-qa-engine`
   - 功能作用：Complete quality assurance system — from test strategy to automation frameworks, coverage analysis, and release readiness. Works for any stack, any team size.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/afrexai-qa-engine>
2. `afrexai-qa-testing-engine`
   - 功能作用：> The definitive testing methodology for AI agents. From test strategy to execution, coverage to reporting — everything you need to ship quality software.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/afrexai-qa-testing-engine>
3. `gstack-qa`
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/gstack-qa>
4. `qa-patrol`
   - 功能作用：>
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-patrol>
5. `test-generator`
   - 功能作用：Automated test case generator. Unit tests, integration tests, end-to-end tests, mock objects, test fixtures, coverage analysis, edge case generation.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/test-generator>
6. `test-master`
   - 功能作用：Use when writing tests, creating test strategies, or building automation frameworks. Invoke for unit tests, integration tests, E2E, coverage analysis, performance testing, security testing.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/test-master>
7. `test-patterns`
   - 功能作用：Write and run tests across languages and frameworks. Use when setting up test suites, writing unit/integration/E2E tests, measuring coverage, mocking dependencies, or debugging test failures. Covers Node.js (Jest/Vitest), Python (pytest), Go, Rust, and Bash.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/test-patterns>
8. `test-runner`
   - 功能作用：Write and run tests across languages and frameworks.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/test-runner>
9. `test-sentinel`
   - 功能作用：Writes and runs tests (unit, integration, E2E), performs linting, and auto-fixes failures
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/test-sentinel>
10. `ux-qa-gate`
   - 功能作用：Self-review gate for UI/UX work before delivering to the user. Run automatically after building, modifying, or completing any user-facing feature, page, component, or flow. Triggers on: finishing a build task, completing a UI change, delivering a web app feature, wrapping up frontend work. Also use when asked to QA this, review the UX, check for usability issues, or run the gate. What it does: (1) Functional completeness check — verifies every button, link, form, and flow works end-to-end, (2) Heuristic review — walks through all 10 Nielsen Norman usability heuristics with a detailed checklist, (3) State and edge case sweep — checks empty, loading, error, success, partial, overflow, and auth states, (4) Interaction and responsiveness — verifies clickability, keyboard access, and responsive layout, (5) Severity classification — blockers and major issues fixed before delivery, minor items noted. Catches missing functionality, broken flows, empty states, and usability problems before the user sees them.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/ux-qa-gate>

## 接口测试 / API 测试 / Mock（7）

1. `api-doc-generator`
   - 功能作用：自动从代码生成 API 文档。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/api-doc-generator>
2. `api-performance-testing`
   - 功能作用：Plan, execute, and analyze API performance and load testing for REST and HTTP services using k6, Locust, or Newman-compatible workflows. Use when the user mentions 接口性能, 压测, load test, stress test, benchmark, throughput, latency, TPS, QPS, 并发, API bottleneck, slow endpoints, rate limits, or wants structured API performance validation before release.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/api-performance-testing>
3. `openapi-spec`
   - 功能作用：Deep OpenAPI workflow—design-first vs code-first, reusable schemas, security schemes, errors, examples, linting, compatibility, and codegen. Use when documenting REST APIs or driving clients and gateways from a spec.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/openapi-spec>
4. `openclaw-api-tester`
   - 功能作用：Test API endpoints and document responses. Define tests in plain English, run them, get formatted results. Agent-driven Postman alternative.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/openclaw-api-tester>
5. `postman`
   - 功能作用：Build, test, and automate APIs with Postman collections, environments, and Newman CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/postman>
6. `qa-api-runner`
   - 功能作用：Generate, execute, and summarize API smoke, regression, and negative tests from API docs or endpoint descriptions. Use when the user asks to run API tests, validate endpoint behavior, exercise request/response contracts, verify auth and error handling, or turn API specs into executable checks.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-api-runner>
7. `sovereign-api-mock-generator`
   - 功能作用：Generates mock API servers from OpenAPI specs or examples. Realistic fake data, configurable delays, error simulation.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/sovereign-api-mock-generator>

## Web UI / E2E / 浏览器自动化测试（13）

1. `e2e-test-orchestrator`
   - 功能作用：端到端（E2E）测试编排与执行。用于用户要求：设计测试用例、基于 Playwright/Cypress 实现自动化脚本、通过源码优先定位元素并在必要时使用截图/图像识别兜底、执行测试、自动修复脚本问题（如定位器或等待策略）、并输出结构化测试报告。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/e2e-test-orchestrator>
2. `e2e-testing`
   - 功能作用：Playwright 与 Cypress E2E 测试规范，涵盖目录结构、Page Object、CI 集成、视口与设备配置。当用户提到 E2E、端到端测试、Playwright、Cypress、集成测试时自动激活。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/e2e-testing>
3. `e2e-testing-patterns`
   - 功能作用：Build reliable, fast E2E test suites with Playwright and Cypress. Critical user journey coverage, flaky test elimination, CI/CD integration.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/e2e-testing-patterns>
4. `playwright-browser-automation`
   - 功能作用：Browser automation using Playwright API directly. Navigate websites, interact with elements, extract data, take screenshots, generate PDFs, record videos, and automate complex workflows. More reliable than MCP approach.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/playwright-browser-automation>
5. `playwright-cli-openclaw`
   - 功能作用：官方Microsoft Playwright CLI网页自动化工具，支持所有主流浏览器的无头/有头自动化操作，包括页面导航、元素交互、截图、录制、测试等功能。当用户提到网页自动化、浏览器操作、爬虫、截图、录制用户操作、E2E测试时触发。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/playwright-cli-openclaw>
6. `playwright-mcp`
   - 功能作用：Browser automation via Playwright MCP server. Navigate websites, click elements, fill forms, extract data, take screenshots, and perform full browser automation workflows.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/playwright-mcp>
7. `playwright-npx`
   - 功能作用：Fast browser automation using Node.js scripts with Playwright (run via `node script.mjs`). Use for web scraping, screenshots, form automation, and any browser task requiring programmatic control. For simple page fetching without JavaScript execution, use web_fetch first. For interactive CLI browsing without writing code, use browser tool or playwright-cli. This skill is ideal when you need full control, custom logic, or reusable scripts.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/playwright-npx>
8. `playwright-pro`
   - 功能作用：Production-grade Playwright testing toolkit. Use when the user mentions Playwright tests, end-to-end testing, browser automation, fixing flaky tests, test migration, CI/CD testing, or test suites. Generate tests, fix flaky failures, migrate from Cypress/Selenium, sync with TestRail, run on BrowserStack. 55 templates, 3 agents, smart reporting.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/playwright-pro>
9. `playwright-skill`
   - 功能作用：Complete browser automation with Playwright. Auto-detects dev servers, writes clean test scripts to /tmp. Test pages, fill forms, take screenshots, check responsive design, validate UX, test login flows, check links, automate any browser task. Use when user wants to test websites, automate browser interactions, validate web functionality, or perform any browser-based testing.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/playwright-skill>
10. `qa-browser-tester`
   - 功能作用：>
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-browser-tester>
11. `qa-web-e2e-runner`
   - 功能作用：Execute browser-based QA flows for web apps, capture assertions, screenshots, and failure evidence, and summarize end-to-end results. Use when the user asks to run UI smoke tests, verify business flows in a browser, regression-test key pages, or reproduce front-end issues with observable evidence.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-web-e2e-runner>
12. `visual-regression-testing`
   - 功能作用：AI-powered visual regression testing skill for e-commerce websites. Designs screenshot comparison workflows, mobile/desktop visual checks, and change detection alerts to prevent conversion-killing UI bugs.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/visual-regression-testing>
13. `web-screenshot`
   - 功能作用：🖼️ 任意URL全页面截图 + PDF导出工具。当用户要求截取网页、保存网页快照、截图存档、做QA对比、导出PDF时使用。支持百度/知乎/微信公众号/小红书等中文网站，自动等待JS渲染交付PNG/JPG/PDF。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/web-screenshot>

## APP / 移动端 / 终端测试（7）

1. `android-adb`
   - 功能作用：Control Android devices via ADB with support for UI layout analysis (uiautomator) and visual feedback (screencap). Use when you need to interact with Android apps, perform UI automation, take screenshots, or run complex ADB command sequences.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/android-adb>
2. `ios-simulator`
   - 功能作用：Automate iOS Simulator workflows (simctl + idb): create/boot/erase devices, install/launch apps, push notifications, privacy grants, screenshots, and accessibility-based UI navigation. Use when working with iOS apps, Xcode, Simulator, simctl, idb, UI automation, or iOS testing.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/ios-simulator>
3. `midscene-android-automation`
   - 功能作用：>
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/midscene-android-automation>
4. `mobile-appium-test`
   - 功能作用：>
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/mobile-appium-test>
5. `node-connect`
   - 功能作用：Diagnose OpenClaw node connection and pairing failures for Android, iOS, and macOS companion apps. Use when QR/setup code/manual connect fails, local Wi-Fi works but VPS/tailnet does not, or errors mention pairing required, unauthorized, bootstrap token invalid or expired, gateway.bind, gateway.remote.url, Tailscale, or plugins.entries.device-pair.config.publicUrl.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/node-connect>
6. `qa-skill`
   - 功能作用：Generate comprehensive test cases and quality assurance documentation from SwiftUI iOS code. Use when iOS application code is available and needs testing strategies, test cases, and quality validation. This skill receives input from dev-skill and completes the auto-dev-pipeline by providing testing coverage.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-skill>
7. `testflight`
   - 功能作用：Distribute iOS and macOS beta builds with TestFlight, tester management, and CI/CD automation.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/testflight>

## 性能测试 / SEO测试 / 安全测试 / 埋点测试（27）

1. `add-analytics`
   - 功能作用：Add Google Analytics 4 tracking to any project. Detects framework, adds tracking code, sets up events, and configures privacy settings.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/add-analytics>
2. `analytics-tracking-2`
   - 功能作用：When the user wants to set up, improve, or audit analytics tracking and measurement. Also use when the user mentions "set up tracking," "GA4," "Google Analytics," "conversion tracking," "event tracking," "UTM parameters," "tag manager," "GTM," "analytics implementation," "tracking plan," "how do I measure this," "track conversions," "attribution," "Mixpanel," "Segment," "are my events firing," or "analytics isn't working." Use this whenever someone asks how to know if something is working or wants to measure marketing results. For A/B test measurement, see ab-test-setup.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/analytics-tracking-2>
3. `check-analytics`
   - 功能作用：Audit existing Google Analytics implementation. Checks for common issues, missing configurations, and optimization opportunities.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/check-analytics>
4. `cs-analytics-tracking`
   - 功能作用：Set up, audit, and debug analytics tracking implementation — GA4, Google Tag Manager, event taxonomy, conversion tracking, and data quality. Use when building a tracking plan from scratch, auditing existing analytics for gaps or errors, debugging missing events, or setting up GTM. Trigger keywords: GA4 setup, Google Tag Manager, GTM, event tracking, analytics implementation, conversion tracking, tracking plan, event taxonomy, custom dimensions, UTM tracking, analytics audit, missing events, tracking broken. NOT for analyzing marketing campaign data — use campaign-analytics for that. NOT for BI dashboards — use product-analytics for in-product event analysis.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/cs-analytics-tracking>
5. `frontend-performance`
   - 功能作用：Analyzes and improves frontend performance: LCP, FCP, CLS, bundle size, lazy loading, and runtime efficiency. Use when 性能优化, 首屏慢, 卡顿, 打包体积, performance optimization, or improving Core Web Vitals.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/frontend-performance>
6. `frontend-performance-audit`
   - 功能作用：分析前端页面性能并输出结构化优化报告。适用于页面速度慢、lighthouse 指标差、core web vitals 不达标、首屏慢、交互卡顿、bundle 过大、阻塞渲染资源过多等场景。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/frontend-performance-audit>
7. `performance-profiler`
   - 功能作用：分析代码性能，识别瓶颈并提供优化建议。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/performance-profiler>
8. `performance-testing`
   - 功能作用：性能测试技能，用于验证系统性能、响应时间、吞吐量、资源使用率等。当用户需要进行压力测试、负载测试、稳定性测试时使用。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/performance-testing>
9. `performance-tuning`
   - 功能作用：Deep performance tuning workflow—goals and measurement, profiling, hotspots, caching and concurrency trade-offs, system-specific tuning (DB, GC, network), and verification. Use when fixing latency, throughput, or resource saturation.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/performance-tuning>
10. `pls-seo-audit`
   - 功能作用：Scan content and websites for SEO gaps, identify opportunities to outrank competitors. Use when: (1) Analyzing page SEO, (2) Checking meta tags and structured data, (3) Reviewing content for keyword optimization, (4) Auditing technical SEO factors.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/pls-seo-audit>
11. `react-performance`
   - 功能作用：React and Next.js performance optimization patterns. Use when writing,
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/react-performance>
12. `security-audit-toolkit`
   - 功能作用：Audit codebases and infrastructure for security issues. Use when scanning dependencies for vulnerabilities, detecting hardcoded secrets, checking OWASP top 10 issues, verifying SSL/TLS, auditing file permissions, or reviewing code for injection and auth flaws.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/security-audit-toolkit>
13. `security-auditor`
   - 功能作用：Use when reviewing code for security vulnerabilities, implementing authentication flows, auditing OWASP Top 10, configuring CORS/CSP headers, handling secrets, input validation, SQL injection prevention, XSS protection, or any security-related code review.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/security-auditor>
14. `security-scanner`
   - 功能作用：Automated security scanning and vulnerability detection for web applications, APIs, and infrastructure. Use when you need to scan targets for vulnerabilities, check SSL certificates, find open ports, detect misconfigurations, or perform security audits. Integrates with nmap, nuclei, and other security tools.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/security-scanner>
15. `sensors-analytics-tracking`
   - 功能作用：Plan, audit, and validate Sensors Analytics (神策) tracking for web, H5, app, and mini-program scenarios. Use when the user mentions 神策, Sensors Analytics, 埋点, 事件 tracking, event taxonomy, 埋点方案, 数据校验, 漏埋/错埋/重复埋点, funnel, conversion tracking, or wants to connect a product flow to 神策平台.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/sensors-analytics-tracking>
16. `seo-optimizer`
   - 功能作用：This skill should be used when analyzing HTML/CSS websites for SEO optimization, fixing SEO issues, generating SEO reports, or implementing SEO best practices. Use when the user requests SEO audits, optimization, meta tag improvements, schema markup implementation, sitemap generation, or general search engine optimization tasks.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/seo-optimizer>
17. `shelly-seo-analyzer`
   - 功能作用：Analyze any webpage URL for SEO issues and get actionable recommendations. Checks title tags, meta descriptions, heading structure, keyword density, image alt tags, Open Graph, and more.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/shelly-seo-analyzer>
18. `sw-analytics-tracking`
   - 功能作用：When the user wants to set up, improve, or audit analytics tracking and measurement.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/sw-analytics-tracking>
19. `web-auto-analyzer`
   - 功能作用：Automatically analyze websites for performance metrics and audit issues using Lighthouse.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/web-auto-analyzer>
20. `web-perf`
   - 功能作用：Analyzes web performance using Chrome DevTools MCP. Measures Core Web Vitals (FCP, LCP, TBT, CLS, Speed Index), identifies render-blocking resources, network dependency chains, layout shifts, caching issues, and accessibility gaps. Use when asked to audit, profile, debug, or optimize page load performance, Lighthouse scores, or site speed.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/web-perf>
21. `webperf`
   - 功能作用：Web performance measurement and debugging toolkit. Use when the user asks about web performance, wants to audit a page, or says "analyze performance", "debug lcp", "check ttfb", "measure core web vitals", "audit images", or similar.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/webperf>
22. `webperf-core-web-vitals`
   - 功能作用：Intelligent Core Web Vitals analysis with automated workflows and decision trees. Measures LCP, CLS, INP with guided debugging that automatically determines follow-up analysis based on results. Includes workflows for LCP deep dive (5 phases), CLS investigation (loading vs interaction), INP debugging (latency breakdown + attribution), and cross-skill integration with loading, interaction, and media skills. Use when the user asks about Core Web Vitals, LCP optimization, layout shifts, or interaction responsiveness. Compatible with Chrome DevTools MCP.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/webperf-core-web-vitals>
23. `webperf-interaction`
   - 功能作用：Intelligent interaction performance analysis with automated workflows for INP debugging, scroll jank investigation, and main thread blocking. Includes decision trees that automatically run script attribution when long frames detected, break down input latency phases, and correlate layout shifts with interactions. Features workflows for complete interaction audit, third-party script impact analysis, and animation performance debugging. Cross-skill integration with Core Web Vitals (INP/CLS correlation) and Loading (script execution analysis). Use when the user asks about slow interactions, janky scrolling, unresponsive pages, or INP optimization. Compatible with Chrome DevTools MCP.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/webperf-interaction>
24. `webperf-loading`
   - 功能作用：Intelligent loading performance analysis with automated workflows for TTFB investigation (DNS/connection/server breakdown), render-blocking detection, script performance deep dive (first vs third-party attribution), font optimization, and resource hints validation. Includes decision trees that automatically analyze TTFB sub-parts when slow, detect script loading anti-patterns (async/defer/preload conflicts), identify render-blocking resources, and validate resource hints usage. Features workflows for complete loading audit (6 phases), backend performance investigation, and priority optimization. Cross-skill integration with Core Web Vitals (LCP resource loading), Interaction (script execution blocking), and Media (lazy loading strategy). Use when the user asks about TTFB, FCP, render-blocking, slow loading, font performance, script optimization, or resource hints. Compatible with Chrome DevTools MCP.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/webperf-loading>
25. `webperf-media`
   - 功能作用：Intelligent media optimization with automated workflows for images, videos, and SVGs. Includes decision trees that detect LCP images (triggers format/lazy-loading/priority analysis), identify layout shift risks (missing dimensions), and flag lazy loading issues (above-fold lazy or below-fold eager). Features workflows for complete media audit, LCP image investigation, video performance (poster optimization), and SVG embedded bitmap detection. Cross-skill integration with Core Web Vitals (LCP/CLS impact) and Loading (priority hints, resource preloading). Provides performance budgets and format recommendations based on content type. Use when the user asks about image optimization, LCP is an image/video, layout shifts from media, or media loading strategy. Compatible with Chrome DevTools MCP.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/webperf-media>
26. `webperf-resources`
   - 功能作用：Intelligent network quality analysis with adaptive loading strategies. Detects connection type (2g/3g/4g), bandwidth, RTT, and save-data mode, then automatically triggers appropriate optimization workflows. Includes decision trees that recommend image compression for slow connections, critical CSS inlining for high RTT, and save-data optimizations (disable autoplay, reduce quality). Features connection-aware performance budgets (500KB for 2g, 1.5MB for 3g, 3MB for 4g+) and adaptive loading implementation guides. Cross-skill integration with Loading (TTFB impact), Media (responsive images), and Core Web Vitals (connection impact on LCP/INP). Use when the user asks about slow connections, mobile optimization, save-data support, or adaptive loading strategies. Compatible with Chrome DevTools MCP.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/webperf-resources>
27. `website-seo`
   - 功能作用：Complete on-page SEO system for any website — page optimization, schema markup, technical SEO checklist, internal linking strategy, Core Web Vitals guidance, and AI-driven content gap analysis. Works for any CMS (WordPress, Webflow, Squarespace, custom).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/website-seo>

## 缺陷管理 / 复盘 / 协同（8）

1. `atlassian-jira`
   - 功能作用：Manage Jira Cloud issues — search, create, update, comment, transition. Use when user mentions Jira, issues, tickets, sprints, bugs, tasks, or issue keys like PROJ-123.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/atlassian-jira>
2. `bug-investigation`
   - 功能作用：Systematically reproduces, locates, and diagnoses frontend bugs using steps, hypotheses, DevTools, and minimal repro. Use when 排查bug, bug定位, 调试, debugging, 复现问题, or investigating frontend issues.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/bug-investigation>
3. `incident-fupan`
   - 功能作用：事故复盘 / Incident Fupan — structured root cause analysis for production failures, outages, bugs, and near-misses. Use when: (1) 事故复盘 or incident review is needed, (2) a production incident just happened and needs root cause analysis, (3) an agent made a costly mistake and you want to prevent recurrence, (4) building safety rules or kill switches from incident patterns. Triggers on: 复盘, fupan, postmortem, incident review, root cause analysis, 事故分析. Generates a full report with timeline, 5 Whys root cause, impact assessment, fix/prevention actions, and new defensive rules. NOT for: routine debugging, feature planning, or non-incident analysis.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/incident-fupan>
4. `incident-response`
   - 功能作用：Structured incident response for OpenClaw system failures. Use when a user reports something broken, missing, changed, or misbehaving — config loss, agent routing failures, binding changes, gateway crashes, missing settings, or any system regression. Follows a strict 7-phase loop: Triage → Evidence → 5 Whys → Restore → Prevent → Monitor → Document. Triggers on: "investigate", "why did X stop working", "something changed", "bindings lost", "gateway down", "gateway crashed", "setting disappeared", "something disappeared", "fix this", "who changed X", "root cause", "audit", "misconfigured", "agent not responding".
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/incident-response>
5. `jira`
   - 功能作用：Use when the user mentions Jira issues (e.g., "PROJ-123"), asks about tickets, wants to create/view/update issues, check sprint status, or manage their Jira workflow. Triggers on keywords like "jira", "issue", "ticket", "sprint", "backlog", or issue key patterns.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/jira>
6. `linear`
   - 功能作用：Query and manage Linear issues, projects, and team workflows.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/linear>
7. `mantis-manager`
   - 功能作用：Manage Mantis Bug Tracker (issues, projects, users, filters, configs) via the official Mantis REST API. Supports full CRUD operations on issues, projects, users, attachments, notes, tags, relationships, and configuration management. Features dynamic instance switching with context-aware base URL and token resolution.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/mantis-manager>
8. `qa-bug-triage`
   - 功能作用：Turn failed tests, screenshots, logs, and mismatches into high-quality defect reports with titles, reproduction steps, severity/priority guidance, and likely ownership hints. Use when the user asks to write bugs, triage failures, classify severity, deduplicate issues, or convert raw evidence into actionable QA defect records.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-bug-triage>

## 测试支撑环境 / 数据库 / 日志 / 可观测 / 消息系统（15）

1. `db-readonly`
   - 功能作用：Run safe read-only queries against MySQL or PostgreSQL for data inspection, reporting, and troubleshooting. Use when the user asks to read tables, inspect schema, count rows, sample data, or export query results without modifying data.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/db-readonly>
2. `grafana-api`
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/grafana-api>
3. `kafka`
   - 功能作用：Produce, consume, and manage Kafka topics with lag monitoring and data export. Use when publishing messages, consuming topics, monitoring consumer lag.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/kafka>
4. `kibana`
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/kibana>
5. `logging-observability`
   - 功能作用：Structured logging, distributed tracing, and metrics collection patterns for building observable systems. Use when implementing logging infrastructure, setting up distributed tracing with OpenTelemetry, designing metrics collection (RED/USE methods), configuring alerting and dashboards, or reviewing observability practices. Covers structured JSON logging, context propagation, trace sampling, Prometheus/Grafana stack, alert design, and PII/secret scrubbing.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/logging-observability>
6. `mqtt-client`
   - 功能作用：This is a simple client for connecting to an mqtt instance
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/mqtt-client>
7. `mysqladm`
   - 功能作用：MySQL database management via mysql CLI or Python mysql-connector. Use when: (1) executing queries and displaying results, (2) managing schemas (create/alter tables, indexes), (3) database backup/restore, (4) performance analysis (slow queries, index usage), (5) user and permission management. NOT for: complex ETL workflows (use specialized tools), real-time streaming (use CDC tools), or when mysql CLI is not installed/accessible.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/mysqladm>
8. `postgres-mcp-skill`
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/postgres-mcp-skill>
9. `prometheus`
   - 功能作用：Query Prometheus monitoring data to check server metrics, resource usage, and system health. Use when the user asks about server status, disk space, CPU/memory usage, network stats, or any metrics collected by Prometheus. Supports multiple Prometheus instances with aggregated queries, config file or environment variables, and HTTP Basic Auth.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/prometheus>
10. `promql-cli`
   - 功能作用：CLI for querying Prometheus and PromQL-compatible engines (Thanos, Cortex, VictoriaMetrics, Grafana Mimir, Grafana Tempo...) — instant queries, range queries, metric discovery (metrics/labels/meta subcommands), output formats (table/csv/json/graph). Apply when executing PromQL queries, troubleshooting performance issues on a software having observability, investigating latency/error rates/saturation, or analyzing time series data.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/promql-cli>
11. `qa-test-data-factory`
   - 功能作用：Design and generate QA test data sets for validation, boundaries, permissions, workflow states, imports, and integration scenarios. Use when the user asks for test data, edge-case values, account/data setup plans, or scenario matrices needed to execute tests reliably.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/qa-test-data-factory>
12. `rabbitmq-client-guide`
   - 功能作用：RabbitMQ 客户端代码指南。当用户需要编写、调试或审查 RabbitMQ 应用代码时使用。涵盖：用任意语言（Java/Go/Python/PHP/.NET）写生产者或消费者；排查连接暴增、消息丢失、Broken pipe、消费慢、漏消费等客户端问题；审查 spring-boot-starter-amqp、amqp091-go、pika、php-amqplib 等库的代码；实现 RPC 模式、confirm、手动 ack、prefetch 调优、连接复用、重连机制。用户贴了 RabbitMQ 相关代码片段或描述了客户端侧的消息异常时，始终触发此技能。不适用于 RabbitMQ 服务端运维部署、Kafka 等其他消息系统、或纯架构设计问题。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/rabbitmq-client-guide>
13. `sql-toolkit`
   - 功能作用：Query, design, migrate, and optimize SQL databases. Use when working with SQLite, PostgreSQL, or MySQL — schema design, writing queries, creating migrations, indexing, backup/restore, and debugging slow queries. No ORMs required.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/sql-toolkit>
14. `tcpdump`
   - 功能作用：Tcpdump reference tool. Use when working with tcpdump in devtools contexts.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/tcpdump>
15. `wireshark-analysis`
   - 功能作用：Network traffic analysis with Wireshark and tshark. Capture packets, write display and BPF filters, follow TCP/UDP/TLS streams, detect C2 beacons, troubleshoot connectivity, and perform forensic PCAP analysis.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/wireshark-analysis>

## 测试平台 / CI / 环境自动化（18）

1. `ci-cd`
   - 功能作用：Automate builds, tests, and deployments across web, mobile, and backend applications.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/ci-cd>
2. `cicd-pipeline`
   - 功能作用：Create, debug, and manage CI/CD pipelines with GitHub Actions. Use when the user needs to set up automated testing, deployment, releases, or workflows. Covers workflow syntax, common patterns, secrets management, caching, matrix builds, and troubleshooting.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/cicd-pipeline>
3. `cloudflare-api`
   - 功能作用：Connect to Cloudflare API for DNS management, tunnels, and zone administration. Use when user needs to manage domains, DNS records, or create tunnels.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/cloudflare-api>
4. `cloudflare-tunnel-manager`
   - 功能作用：Create and manage secure Cloudflare Tunnels using cloudflared. Expose local services to the internet safely, configure DNS routing, set up zero-trust access controls, and manage tunnel authentication without opening firewall ports.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/cloudflare-tunnel-manager>
5. `docker-compose`
   - 功能作用：Define multi-container applications with proper dependency handling, networking, and volume management.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/docker-compose>
6. `docker-diag`
   - 功能作用：Advanced log analysis for Docker containers using signal extraction.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/docker-diag>
7. `docker-skill`
   - 功能作用：Installs and uses Docker reliably with official docs. Use when installing Docker (Desktop or Engine), building or running containers, writing Dockerfiles, using docker compose, or when the user asks about containers, images, or Docker CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/docker-skill>
8. `github-actions`
   - 功能作用：Design, debug, and harden GitHub Actions workflows with reusable pipelines, safe permissions, and faster CI and release automation.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/github-actions>
9. `gitlab`
   - 功能作用：Avoid common GitLab CI/CD mistakes — rules gotchas, silent failures, and YAML merge traps.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/gitlab>
10. `helm`
   - 功能作用：Create, lint, template, and package Kubernetes Helm charts with checks. Use when scaffolding charts, linting templates, or packaging chart releases.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/helm>
11. `initial-traefik`
   - 功能作用：Initialize and configure Traefik reverse proxy with Docker. Install Traefik, configure Docker Compose, set up service routing via path prefix or host-based routing, enable features like dashboard metrics logging tracing, configure Dashboard access via nip.io or path prefix
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/initial-traefik>
12. `jenkins`
   - 功能作用：Interact with Jenkins CI/CD server via REST API. Use when you need to trigger builds, check build status, view console output, manage jobs, or monitor Jenkins nodes and queue. Supports deployment to different Jenkins instances via environment variables.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/jenkins>
13. `k8s`
   - 功能作用：Avoid common Kubernetes mistakes — resource limits, probe configuration, selector mismatches, and RBAC pitfalls.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/k8s>
14. `kubectl`
   - 功能作用：Execute and manage Kubernetes clusters via kubectl commands. Query resources, deploy applications, debug containers, manage configurations, and monitor cluster health. Use when working with Kubernetes clusters, containers, deployments, or pod diagnostics.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/kubectl>
15. `kubernetes-devops`
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/kubernetes-devops>
16. `nginx`
   - 功能作用：Configure Nginx for reverse proxy, load balancing, SSL termination, and high-performance static serving.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/nginx>
17. `terraform-iac`
   - 功能作用：Deep Terraform/IaC workflow—module boundaries, state, workspaces, plan/apply safety, drift, secrets, CI integration, and team governance. Use when building infra as code, refactoring modules, or debugging state issues.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/terraform-iac>
18. `traefik`
   - 功能作用：Avoid common Traefik mistakes — router priority, TLS configuration, Docker labels syntax, and middleware ordering.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/traefik>

