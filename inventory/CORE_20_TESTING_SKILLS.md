# 核心 20 个测试实战 Skills

这 20 个是长期保留、最有实战价值的一组。优先级高于“能装但未必常用”的长尾技能。

1. **qa-prd-analyzer** [ready]
   - 功能：Analyze PRDs, Feishu docs, wiki pages, specs, change notes, and prototype text into structured feature breakdowns, business flows, hidden assumptions, ambiguity lists, and QA risk summaries. Use when the user asks to analyze a requirement, break down a feature, review a spec, find missing cases, or identify unclear/risky requirements before test design.
   - 说明：OK
2. **qa-test-point-extractor** [ready]
   - 功能：Convert requirements, flows, API specs, and feature summaries into structured QA test points covering happy path, negative path, boundary, permission, state transition, compatibility, and resilience. Use when the user asks to extract test points, design coverage, list edge cases, or expand testing scope before formal test cases are written.
   - 说明：OK
3. **qa-testcase-writer** [ready]
   - 功能：Turn QA test points or requirements into standardized test cases with preconditions, data, steps, expected results, priority, and automation hints. Use when the user asks to write test cases, generate smoke/regression cases, convert test points into executable cases, or format cases for docs, Feishu, spreadsheets, or case-management tools.
   - 说明：OK
4. **qa-traceability-mapper** [ready]
   - 功能：Build QA traceability between requirements, test points, test cases, execution results, and defects. Use when the user asks for a traceability matrix, coverage mapping, gap analysis, release coverage proof, or help linking requirements to tests and bugs.
   - 说明：OK
5. **qa-test-data-factory** [ready]
   - 功能：Design and generate QA test data sets for validation, boundaries, permissions, workflow states, imports, and integration scenarios. Use when the user asks for test data, edge-case values, account/data setup plans, or scenario matrices needed to execute tests reliably.
   - 说明：OK
6. **qa-api-runner** [ready]
   - 功能：Generate, execute, and summarize API smoke, regression, and negative tests from API docs or endpoint descriptions. Use when the user asks to run API tests, validate endpoint behavior, exercise request/response contracts, verify auth and error handling, or turn API specs into executable checks.
   - 说明：OK
7. **qa-web-e2e-runner** [ready]
   - 功能：Execute browser-based QA flows for web apps, capture assertions, screenshots, and failure evidence, and summarize end-to-end results. Use when the user asks to run UI smoke tests, verify business flows in a browser, regression-test key pages, or reproduce front-end issues with observable evidence.
   - 说明：OK
8. **qa-bug-triage** [ready]
   - 功能：Turn failed tests, screenshots, logs, and mismatches into high-quality defect reports with titles, reproduction steps, severity/priority guidance, and likely ownership hints. Use when the user asks to write bugs, triage failures, classify severity, deduplicate issues, or convert raw evidence into actionable QA defect records.
   - 说明：OK
9. **qa-test-report-generator** [ready]
   - 功能：Summarize QA execution into release-facing test reports with scope, environment, pass/fail counts, defect distribution, residual risk, and release recommendation. Use when the user asks to generate a test report, release summary, QA conclusion, execution recap, or stakeholder-ready testing status update.
   - 说明：OK
10. **qa-regression-planner** [ready]
   - 功能：Plan focused QA regression scope from requirement changes, bug fixes, impacted modules, and system dependencies. Use when the user asks what to regress, wants a change-impact-based regression plan, or needs a lean smoke vs full-regression split for a release.
   - 说明：OK
11. **qa-release-gate-checker** [ready]
   - 功能：Decide whether a build is releasable by checking core-flow status, unresolved defects, coverage gaps, and residual risks. Use when the user asks if a version can ship, wants a release gate decision, or needs a concise go/no-go QA judgement from current evidence.
   - 说明：OK
12. **playwright-pro** [ready]
   - 功能：Production-grade Playwright testing toolkit. Use when the user mentions Playwright tests, end-to-end testing, browser automation, fixing flaky tests, test migration, CI/CD testing, or test suites. Generate tests, fix flaky failures, migrate from Cypress/Selenium, sync with TestRail, run on BrowserStack. 55 templates, 3 agents, smart reporting.
   - 说明：OK
13. **e2e-test-orchestrator** [ready]
   - 功能：端到端（E2E）测试编排与执行。用于用户要求：设计测试用例、基于 Playwright/Cypress 实现自动化脚本、通过源码优先定位元素并在必要时使用截图/图像识别兜底、执行测试、自动修复脚本问题（如定位器或等待策略）、并输出结构化测试报告。
   - 说明：OK
14. **qa-patrol** [ready]
   - 功能：Automated QA testing for web apps using local browser automation. Runs entirely on your machine — no data leaves, no cloud services, no external servers. Level 1 (smoke tests) needs only a URL. Level 2 (auth/payment testing) uses optional env vars for test credentials. Level 3 (static analysis, DB checks) optionally reads local files and connects to a user-provided database. Supports Supabase/Firebase auth, Stripe payments, React Native Web, Next.js, and SPAs.
   - 说明：OK
15. **qa-browser-tester** [ready]
   - 功能：Launch a real headless browser on the server and perform exhaustive end-to-end QA testing of a web application — clicking every button, filling every form, navigating every menu, and simulating a complete user journey. Use this skill whenever the user asks to "test the app", "check if everything works", "simulate a user", "run QA", "click through the site", or "browse the website automatically". Also trigger when the user says things like "בדוק את האתר", "תדמה משתמש", or "תבדוק שהכל עובד". Always use this skill — do not attempt browser automation without it, as it contains critical Docker-safe configuration required for Chromium to run on Linux servers.
   - 说明：OK
16. **mobile-appium-test** [ready]
   - 功能：Android UI automation testing using Appium with USB-connected real devices. Use when the user wants to run Appium tests on physical Android devices connected via USB, including: device connection verification, app installation, UI element inspection, test execution, screenshot capture, and log collection. Requires ADB and Appium Server installed.
   - 说明：OK
17. **security-scanner** [ready]
   - 功能：Automated security scanning and vulnerability detection for web applications, APIs, and infrastructure. Use when you need to scan targets for vulnerabilities, check SSL certificates, find open ports, detect misconfigurations, or perform security audits. Integrates with nmap, nuclei, and other security tools.
   - 说明：OK
18. **frontend-performance-audit** [ready]
   - 功能：分析前端页面性能并输出结构化优化报告。适用于页面速度慢、lighthouse 指标差、core web vitals 不达标、首屏慢、交互卡顿、bundle 过大、阻塞渲染资源过多等场景。
   - 说明：OK
19. **bug-investigation** [ready]
   - 功能：Systematically reproduces, locates, and diagnoses frontend bugs using steps, hypotheses, DevTools, and minimal repro. Use when 排查bug, bug定位, 调试, debugging, 复现问题, or investigating frontend issues.
   - 说明：OK
20. **coding-agent** [ready]
   - 功能：Delegate coding tasks to Codex, Claude Code, or Pi agents via background process. Use when: (1) building/creating new features or apps, (2) reviewing PRs (spawn in temp dir), (3) refactoring large codebases, (4) iterative coding that needs file exploration. NOT for: simple one-liner fixes (just edit), reading code (use read tool), thread-bound ACP harness requests in chat (for example spawn/run Codex or Claude Code in a Discord thread; use sessions_spawn with runtime:"acp"), or any work in ~/clawd workspace (never spawn agents here). Claude Code: use --print --permission-mode bypassPermissions (no PTY). Codex/Pi/OpenCode: pty:true required.
   - 说明：OK
