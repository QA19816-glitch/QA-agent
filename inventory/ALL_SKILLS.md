# 本机 OpenClaw Skills 清单

- 总数：**92**
- 已就绪（ready）：**56**
- 需额外安装/配置：**36**
- 软件测试类：**11**
- 非软件测试类：**81**

## 分类统计

- **QA / 软件测试**：11 个（ready 11 / total 11）
- **文档 / 知识库 / 飞书**：4 个（ready 4 / total 4）
- **开发 / GitHub / Agent 工具**：12 个（ready 8 / total 12）
- **安全 / 基础设施 / 连接诊断**：3 个（ready 2 / total 3）
- **笔记 / 任务 / 效率工具**：7 个（ready 0 / total 7）
- **消息 / 协作 / 社交**：8 个（ready 0 / total 8）
- **音频 / 视频 / PDF / 媒体**：9 个（ready 3 / total 9）
- **设备 / 智能家居 / 影音控制**：7 个（ready 0 / total 7）
- **生活 / 搜索 / 地点 / 天气**：4 个（ready 1 / total 4）
- **其他**：27 个（ready 27 / total 27）

## 全量技能明细

### QA / 软件测试

- **qa-api-runner** [ready] (openclaw-workspace)
  - 功能：Generate, execute, and summarize API smoke, regression, and negative tests from API docs or endpoint descriptions. Use when the user asks to run API tests, validate endpoint behavior, exercise request/response contracts, verify auth and error handling, or turn API specs into executable checks.
  - 状态说明：已就绪
- **qa-bug-triage** [ready] (openclaw-workspace)
  - 功能：Turn failed tests, screenshots, logs, and mismatches into high-quality defect reports with titles, reproduction steps, severity/priority guidance, and likely ownership hints. Use when the user asks to write bugs, triage failures, classify severity, deduplicate issues, or convert raw evidence into actionable QA defect records.
  - 状态说明：已就绪
- **qa-prd-analyzer** [ready] (openclaw-workspace)
  - 功能：Analyze PRDs, Feishu docs, wiki pages, specs, change notes, and prototype text into structured feature breakdowns, business flows, hidden assumptions, ambiguity lists, and QA risk summaries. Use when the user asks to analyze a requirement, break down a feature, review a spec, find missing cases, or identify unclear/risky requirements before test design.
  - 状态说明：已就绪
- **qa-regression-planner** [ready] (openclaw-workspace)
  - 功能：Plan focused QA regression scope from requirement changes, bug fixes, impacted modules, and system dependencies. Use when the user asks what to regress, wants a change-impact-based regression plan, or needs a lean smoke vs full-regression split for a release.
  - 状态说明：已就绪
- **qa-release-gate-checker** [ready] (openclaw-workspace)
  - 功能：Decide whether a build is releasable by checking core-flow status, unresolved defects, coverage gaps, and residual risks. Use when the user asks if a version can ship, wants a release gate decision, or needs a concise go/no-go QA judgement from current evidence.
  - 状态说明：已就绪
- **qa-test-data-factory** [ready] (openclaw-workspace)
  - 功能：Design and generate QA test data sets for validation, boundaries, permissions, workflow states, imports, and integration scenarios. Use when the user asks for test data, edge-case values, account/data setup plans, or scenario matrices needed to execute tests reliably.
  - 状态说明：已就绪
- **qa-test-point-extractor** [ready] (openclaw-workspace)
  - 功能：Convert requirements, flows, API specs, and feature summaries into structured QA test points covering happy path, negative path, boundary, permission, state transition, compatibility, and resilience. Use when the user asks to extract test points, design coverage, list edge cases, or expand testing scope before formal test cases are written.
  - 状态说明：已就绪
- **qa-test-report-generator** [ready] (openclaw-workspace)
  - 功能：Summarize QA execution into release-facing test reports with scope, environment, pass/fail counts, defect distribution, residual risk, and release recommendation. Use when the user asks to generate a test report, release summary, QA conclusion, execution recap, or stakeholder-ready testing status update.
  - 状态说明：已就绪
- **qa-testcase-writer** [ready] (openclaw-workspace)
  - 功能：Turn QA test points or requirements into standardized test cases with preconditions, data, steps, expected results, priority, and automation hints. Use when the user asks to write test cases, generate smoke/regression cases, convert test points into executable cases, or format cases for docs, Feishu, spreadsheets, or case-management tools.
  - 状态说明：已就绪
- **qa-traceability-mapper** [ready] (openclaw-workspace)
  - 功能：Build QA traceability between requirements, test points, test cases, execution results, and defects. Use when the user asks for a traceability matrix, coverage mapping, gap analysis, release coverage proof, or help linking requirements to tests and bugs.
  - 状态说明：已就绪
- **qa-web-e2e-runner** [ready] (openclaw-workspace)
  - 功能：Execute browser-based QA flows for web apps, capture assertions, screenshots, and failure evidence, and summarize end-to-end results. Use when the user asks to run UI smoke tests, verify business flows in a browser, regression-test key pages, or reproduce front-end issues with observable evidence.
  - 状态说明：已就绪

### 文档 / 知识库 / 飞书

- **feishu-doc** [ready] (openclaw-extra)
  - 功能：Feishu document read/write operations. Activate when user mentions Feishu docs, cloud docs, or docx links.
  - 状态说明：已就绪
- **feishu-drive** [ready] (openclaw-extra)
  - 功能：Feishu cloud storage file management. Activate when user mentions cloud space, folders, drive.
  - 状态说明：已就绪
- **feishu-perm** [ready] (openclaw-extra)
  - 功能：Feishu permission management for documents and files. Activate when user mentions sharing, permissions, collaborators.
  - 状态说明：已就绪
- **feishu-wiki** [ready] (openclaw-extra)
  - 功能：Feishu knowledge base navigation. Activate when user mentions knowledge base, wiki, or wiki links.
  - 状态说明：已就绪

### 开发 / GitHub / Agent 工具

- **clawhub** [ready] (openclaw-bundled)
  - 功能：Use the ClawHub CLI to search, install, update, and publish agent skills from clawhub.com. Use when you need to fetch new skills on the fly, sync installed skills to latest or a specific version, or publish new/updated skill folders with the npm-installed clawhub CLI.
  - 状态说明：已就绪
- **coding-agent** [ready] (openclaw-bundled)
  - 功能：Delegate coding tasks to Codex, Claude Code, or Pi agents via background process. Use when: (1) building/creating new features or apps, (2) reviewing PRs (spawn in temp dir), (3) refactoring large codebases, (4) iterative coding that needs file exploration. NOT for: simple one-liner fixes (just edit), reading code (use read tool), thread-bound ACP harness requests in chat (for example spawn/run Codex or Claude Code in a Discord thread; use sessions_spawn with runtime:"acp"), or any work in ~/clawd workspace (never spawn agents here). Claude Code: use --print --permission-mode bypassPermissions (no PTY). Codex/Pi/OpenCode: pty:true required.
  - 状态说明：已就绪
- **gemini** [ready] (openclaw-bundled)
  - 功能：Gemini CLI for one-shot Q&A, summaries, and generation.
  - 状态说明：已就绪
- **gh-issues** [ready] (openclaw-bundled)
  - 功能：Fetch GitHub issues, spawn sub-agents to implement fixes and open PRs, then monitor and address PR review comments. Usage: /gh-issues [owner/repo] [--label bug] [--limit 5] [--milestone v1.0] [--assignee @me] [--fork user/repo] [--watch] [--interval 5] [--reviews-only] [--cron] [--dry-run] [--model glm-5] [--notify-channel -1002381931352]
  - 状态说明：已就绪
- **github** [ready] (openclaw-bundled)
  - 功能：GitHub operations via `gh` CLI: issues, PRs, CI runs, code review, API queries. Use when: (1) checking PR status or CI, (2) creating/commenting on issues, (3) listing/filtering PRs or issues, (4) viewing run logs. NOT for: complex web UI interactions requiring manual browser flows (use browser tooling when available), bulk operations across many repos (script with gh api), or when gh auth is not configured.
  - 状态说明：已就绪
- **gog** [needs setup] (openclaw-bundled)
  - 功能：Google Workspace CLI for Gmail, Calendar, Drive, Contacts, Sheets, and Docs.
  - 状态说明：缺少命令: gog
- **mcporter** [needs setup] (openclaw-bundled)
  - 功能：Use the mcporter CLI to list, configure, auth, and call MCP servers/tools directly (HTTP or stdio), including ad-hoc servers, config edits, and CLI/type generation.
  - 状态说明：缺少命令: mcporter
- **model-usage** [needs setup] (openclaw-bundled)
  - 功能：Use CodexBar CLI local cost usage to summarize per-model usage for Codex or Claude, including the current (most recent) model or a full model breakdown. Trigger when asked for model-level usage/cost data from codexbar, or when you need a scriptable per-model summary from codexbar cost JSON.
  - 状态说明：缺少命令: codexbar
- **oracle** [needs setup] (openclaw-bundled)
  - 功能：Best practices for using the oracle CLI (prompt + file bundling, engines, sessions, and file attachment patterns).
  - 状态说明：缺少命令: oracle
- **session-logs** [ready] (openclaw-bundled)
  - 功能：Search and analyze your own session logs (older/parent conversations) using jq.
  - 状态说明：已就绪
- **skill-creator** [ready] (openclaw-bundled)
  - 功能：Create, edit, improve, or audit AgentSkills. Use when creating a new skill from scratch or when asked to improve, review, audit, tidy up, or clean up an existing skill or SKILL.md file. Also use when editing or restructuring a skill directory (moving files to references/ or scripts/, removing stale content, validating against the AgentSkills spec). Triggers on phrases like "create a skill", "author a skill", "tidy up a skill", "improve this skill", "review the skill", "clean up the skill", "audit the skill".
  - 状态说明：已就绪
- **tmux** [ready] (openclaw-bundled)
  - 功能：Remote-control tmux sessions for interactive CLIs by sending keystrokes and scraping pane output.
  - 状态说明：已就绪

### 安全 / 基础设施 / 连接诊断

- **1password** [needs setup] (openclaw-bundled)
  - 功能：Set up and use 1Password CLI (op). Use when installing the CLI, enabling desktop app integration, signing in (single or multi-account), or reading/injecting/running secrets via op.
  - 状态说明：缺少命令: op
- **healthcheck** [ready] (openclaw-bundled)
  - 功能：Host security hardening and risk-tolerance configuration for OpenClaw deployments. Use when a user asks for security audits, firewall/SSH/update hardening, risk posture, exposure review, OpenClaw cron scheduling for periodic checks, or version status checks on a machine running OpenClaw (laptop, workstation, Pi, VPS).
  - 状态说明：已就绪
- **node-connect** [ready] (openclaw-bundled)
  - 功能：Diagnose OpenClaw node connection and pairing failures for Android, iOS, and macOS companion apps. Use when QR/setup code/manual connect fails, local Wi-Fi works but VPS/tailnet does not, or errors mention pairing required, unauthorized, bootstrap token invalid or expired, gateway.bind, gateway.remote.url, Tailscale, or plugins.entries.device-pair.config.publicUrl.
  - 状态说明：已就绪

### 笔记 / 任务 / 效率工具

- **apple-notes** [needs setup] (openclaw-bundled)
  - 功能：Manage Apple Notes via the `memo` CLI on macOS (create, view, edit, delete, search, move, and export notes). Use when a user asks OpenClaw to add a note, list notes, search notes, or manage note folders.
  - 状态说明：缺少命令: memo
- **apple-reminders** [needs setup] (openclaw-bundled)
  - 功能：Manage Apple Reminders via remindctl CLI (list, add, edit, complete, delete). Supports lists, date filters, and JSON/plain output.
  - 状态说明：缺少命令: remindctl
- **bear-notes** [needs setup] (openclaw-bundled)
  - 功能：Create, search, and manage Bear notes via grizzly CLI.
  - 状态说明：缺少命令: grizzly
- **notion** [needs setup] (openclaw-bundled)
  - 功能：Notion API for creating and managing pages, databases, and blocks.
  - 状态说明：缺少环境变量: NOTION_API_KEY
- **obsidian** [needs setup] (openclaw-bundled)
  - 功能：Work with Obsidian vaults (plain Markdown notes) and automate via obsidian-cli.
  - 状态说明：缺少命令: obsidian-cli
- **things-mac** [needs setup] (openclaw-bundled)
  - 功能：Manage Things 3 via the `things` CLI on macOS (add/update projects+todos via URL scheme; read/search/list from the local Things database). Use when a user asks OpenClaw to add a task to Things, list inbox/today/upcoming, search tasks, or inspect projects/areas/tags.
  - 状态说明：缺少命令: things
- **trello** [needs setup] (openclaw-bundled)
  - 功能：Manage Trello boards, lists, and cards via the Trello REST API.
  - 状态说明：缺少环境变量: TRELLO_API_KEY, TRELLO_TOKEN

### 消息 / 协作 / 社交

- **bluebubbles** [needs setup] (openclaw-bundled)
  - 功能：Use when you need to send or manage iMessages via BlueBubbles (recommended iMessage integration). Calls go through the generic message tool with channel="bluebubbles".
  - 状态说明：缺少配置: channels.bluebubbles
- **discord** [needs setup] (openclaw-bundled)
  - 功能：Discord ops via the message tool (channel=discord).
  - 状态说明：缺少配置: channels.discord.token
- **himalaya** [needs setup] (openclaw-bundled)
  - 功能：CLI to manage emails via IMAP/SMTP. Use `himalaya` to list, read, write, reply, forward, search, and organize emails from the terminal. Supports multiple accounts and message composition with MML (MIME Meta Language).
  - 状态说明：缺少命令: himalaya
- **imsg** [needs setup] (openclaw-bundled)
  - 功能：iMessage/SMS CLI for listing chats, history, and sending messages via Messages.app.
  - 状态说明：缺少命令: imsg
- **slack** [needs setup] (openclaw-bundled)
  - 功能：Use when you need to control Slack from OpenClaw via the slack tool, including reacting to messages or pinning/unpinning items in Slack channels or DMs.
  - 状态说明：缺少配置: channels.slack
- **voice-call** [needs setup] (openclaw-bundled)
  - 功能：Start voice calls via the OpenClaw voice-call plugin.
  - 状态说明：缺少配置: plugins.entries.voice-call.enabled
- **wacli** [needs setup] (openclaw-bundled)
  - 功能：Send WhatsApp messages to other people or search/sync WhatsApp history via the wacli CLI (not for normal user chats).
  - 状态说明：缺少命令: wacli
- **xurl** [needs setup] (openclaw-bundled)
  - 功能：A CLI tool for making authenticated requests to the X (Twitter) API. Use this skill when you need to post tweets, reply, quote, search, read posts, manage followers, send DMs, upload media, or interact with any X API v2 endpoint.
  - 状态说明：缺少命令: xurl

### 音频 / 视频 / PDF / 媒体

- **gifgrep** [needs setup] (openclaw-bundled)
  - 功能：Search GIF providers with CLI/TUI, download results, and extract stills/sheets.
  - 状态说明：缺少命令: gifgrep
- **nano-pdf** [ready] (openclaw-bundled)
  - 功能：Edit PDFs with natural-language instructions using the nano-pdf CLI.
  - 状态说明：已就绪
- **openai-whisper** [ready] (openclaw-bundled)
  - 功能：Local speech-to-text with the Whisper CLI (no API key).
  - 状态说明：已就绪
- **openai-whisper-api** [needs setup] (openclaw-bundled)
  - 功能：Transcribe audio via OpenAI Audio Transcriptions API (Whisper).
  - 状态说明：缺少环境变量: OPENAI_API_KEY
- **sag** [needs setup] (openclaw-bundled)
  - 功能：ElevenLabs text-to-speech with mac-style say UX.
  - 状态说明：缺少命令: sag；缺少环境变量: ELEVENLABS_API_KEY
- **sherpa-onnx-tts** [needs setup] (openclaw-bundled)
  - 功能：Local text-to-speech via sherpa-onnx (offline, no cloud)
  - 状态说明：缺少环境变量: SHERPA_ONNX_RUNTIME_DIR, SHERPA_ONNX_MODEL_DIR
- **songsee** [needs setup] (openclaw-bundled)
  - 功能：Generate spectrograms and feature-panel visualizations from audio with the songsee CLI.
  - 状态说明：缺少命令: songsee
- **summarize** [needs setup] (openclaw-bundled)
  - 功能：Summarize or extract text/transcripts from URLs, podcasts, and local files (great fallback for “transcribe this YouTube/video”).
  - 状态说明：缺少命令: summarize
- **video-frames** [ready] (openclaw-bundled)
  - 功能：Extract frames or short clips from videos using ffmpeg.
  - 状态说明：已就绪

### 设备 / 智能家居 / 影音控制

- **blucli** [needs setup] (openclaw-bundled)
  - 功能：BluOS CLI (blu) for discovery, playback, grouping, and volume.
  - 状态说明：缺少命令: blu
- **camsnap** [needs setup] (openclaw-bundled)
  - 功能：Capture frames or clips from RTSP/ONVIF cameras.
  - 状态说明：缺少命令: camsnap
- **eightctl** [needs setup] (openclaw-bundled)
  - 功能：Control Eight Sleep pods (status, temperature, alarms, schedules).
  - 状态说明：缺少命令: eightctl
- **openhue** [needs setup] (openclaw-bundled)
  - 功能：Control Philips Hue lights and scenes via the OpenHue CLI.
  - 状态说明：缺少命令: openhue
- **peekaboo** [needs setup] (openclaw-bundled)
  - 功能：Capture and automate macOS UI with the Peekaboo CLI.
  - 状态说明：缺少命令: peekaboo
- **sonoscli** [needs setup] (openclaw-bundled)
  - 功能：Control Sonos speakers (discover/status/play/volume/group).
  - 状态说明：缺少命令: sonos
- **spotify-player** [needs setup] (openclaw-bundled)
  - 功能：Terminal Spotify playback/search via spogo (preferred) or spotify_player.
  - 状态说明：至少需要一个命令: spogo, spotify_player

### 生活 / 搜索 / 地点 / 天气

- **blogwatcher** [needs setup] (openclaw-bundled)
  - 功能：Monitor blogs and RSS/Atom feeds for updates using the blogwatcher CLI.
  - 状态说明：缺少命令: blogwatcher
- **goplaces** [needs setup] (openclaw-bundled)
  - 功能：Query Google Places API (New) via the goplaces CLI for text search, place details, resolve, and reviews. Use for human-friendly place lookup or JSON output for scripts.
  - 状态说明：缺少命令: goplaces；缺少环境变量: GOOGLE_PLACES_API_KEY
- **ordercli** [needs setup] (openclaw-bundled)
  - 功能：Foodora-only CLI for checking past orders and active order status (Deliveroo WIP).
  - 状态说明：缺少命令: ordercli
- **weather** [ready] (openclaw-bundled)
  - 功能：Get current weather and forecasts via wttr.in or Open-Meteo. Use when: user asks about weather, temperature, or forecasts for any location. NOT for: historical weather data, severe weather alerts, or detailed meteorological analysis. No API key needed.
  - 状态说明：已就绪

### 其他

- **APITester Agent-Driven API Testing** [ready] (openclaw-workspace)
  - 功能：Test API endpoints and document responses. Define tests in plain English, run them, get formatted results. Agent-driven Postman alternative.
  - 状态说明：已就绪
- **Test Generator** [ready] (openclaw-workspace)
  - 功能：Automated test case generator. Unit tests, integration tests, end-to-end tests, mock objects, test fixtures, coverage analysis, edge case generation.
  - 状态说明：已就绪
- **bug-investigation** [ready] (openclaw-workspace)
  - 功能：Systematically reproduces, locates, and diagnoses frontend bugs using steps, hypotheses, DevTools, and minimal repro. Use when 排查bug, bug定位, 调试, debugging, 复现问题, or investigating frontend issues.
  - 状态说明：已就绪
- **e2e-test-orchestrator** [ready] (openclaw-workspace)
  - 功能：端到端（E2E）测试编排与执行。用于用户要求：设计测试用例、基于 Playwright/Cypress 实现自动化脚本、通过源码优先定位元素并在必要时使用截图/图像识别兜底、执行测试、自动修复脚本问题（如定位器或等待策略）、并输出结构化测试报告。
  - 状态说明：已就绪
- **e2e-testing** [ready] (openclaw-workspace)
  - 功能：Playwright 与 Cypress E2E 测试规范，涵盖目录结构、Page Object、CI 集成、视口与设备配置。当用户提到 E2E、端到端测试、Playwright、Cypress、集成测试时自动激活。
  - 状态说明：已就绪
- **e2e-testing-patterns** [ready] (openclaw-workspace)
  - 功能：Build reliable, fast E2E test suites with Playwright and Cypress. Critical user journey coverage, flaky test elimination, CI/CD integration.
  - 状态说明：已就绪
- **frontend-performance-audit** [ready] (openclaw-workspace)
  - 功能：分析前端页面性能并输出结构化优化报告。适用于页面速度慢、lighthouse 指标差、core web vitals 不达标、首屏慢、交互卡顿、bundle 过大、阻塞渲染资源过多等场景。
  - 状态说明：已就绪
- **mobile-appium-test** [ready] (openclaw-workspace)
  - 功能：Android UI automation testing using Appium with USB-connected real devices. Use when the user wants to run Appium tests on physical Android devices connected via USB, including: device connection verification, app installation, UI element inspection, test execution, screenshot capture, and log collection. Requires ADB and Appium Server installed.
  - 状态说明：已就绪
- **mobile-responsive** [ready] (openclaw-workspace)
  - 功能：Deep responsive design workflow—breakpoints, content priority, touch targets, typography, performance on mobile networks, and testing on real devices. Use when fixing mobile UX, defining responsive patterns, or auditing layouts across viewports.
  - 状态说明：已就绪
- **performance-tuning** [ready] (openclaw-workspace)
  - 功能：Deep performance tuning workflow—goals and measurement, profiling, hotspots, caching and concurrency trade-offs, system-specific tuning (DB, GC, network), and verification. Use when fixing latency, throughput, or resource saturation.
  - 状态说明：已就绪
- **playwright-browser-automation** [ready] (openclaw-workspace)
  - 功能：Browser automation using Playwright API directly. Navigate websites, interact with elements, extract data, take screenshots, generate PDFs, record videos, and automate complex workflows. More reliable than MCP approach.
  - 状态说明：已就绪
- **playwright-cli** [ready] (openclaw-workspace)
  - 功能：官方Microsoft Playwright CLI网页自动化工具，支持所有主流浏览器的无头/有头自动化操作，包括页面导航、元素交互、截图、录制、测试等功能。当用户提到网页自动化、浏览器操作、爬虫、截图、录制用户操作、E2E测试时触发。
  - 状态说明：已就绪
- **playwright-mcp** [ready] (openclaw-workspace)
  - 功能：Browser automation via Playwright MCP server. Navigate websites, click elements, fill forms, extract data, take screenshots, and perform full browser automation workflows.
  - 状态说明：已就绪
- **playwright-npx** [ready] (openclaw-workspace)
  - 功能：Fast browser automation using Node.js scripts with Playwright (run via `node script.mjs`). Use for web scraping, screenshots, form automation, and any browser task requiring programmatic control. For simple page fetching without JavaScript execution, use web_fetch first. For interactive CLI browsing without writing code, use browser tool or playwright-cli. This skill is ideal when you need full control, custom logic, or reusable scripts.
  - 状态说明：已就绪
- **playwright-pro** [ready] (openclaw-workspace)
  - 功能：Production-grade Playwright testing toolkit. Use when the user mentions Playwright tests, end-to-end testing, browser automation, fixing flaky tests, test migration, CI/CD testing, or test suites. Generate tests, fix flaky failures, migrate from Cypress/Selenium, sync with TestRail, run on BrowserStack. 55 templates, 3 agents, smart reporting.
  - 状态说明：已就绪
- **playwright-skill** [ready] (openclaw-workspace)
  - 功能：Complete browser automation with Playwright. Auto-detects dev servers, writes clean test scripts to /tmp. Test pages, fill forms, take screenshots, check responsive design, validate UX, test login flows, check links, automate any browser task. Use when user wants to test websites, automate browser interactions, validate web functionality, or perform any browser-based testing.
  - 状态说明：已就绪
- **qa** [ready] (openclaw-workspace)
  - 功能：Systematically QA test a web application and fix bugs found. Runs QA testing,then iteratively fixes bugs in source code, committing each fix atomically andre-verifying. Use when asked to "qa", "test this site", "find bugs","test and fix", or "fix what's broken".Proactively suggest when the user says a feature is ready for testingor asks "does this work?".Three tiers: Quick (critical/high only), Standard (+ medium), Exhaustive (+ cosmetic).Produces before/after health scores, fix evidence, and a ship-readiness summary.
  - 状态说明：已就绪
- **qa-browser-tester** [ready] (openclaw-workspace)
  - 功能：Launch a real headless browser on the server and perform exhaustive end-to-end QA testing of a web application — clicking every button, filling every form, navigating every menu, and simulating a complete user journey. Use this skill whenever the user asks to "test the app", "check if everything works", "simulate a user", "run QA", "click through the site", or "browse the website automatically". Also trigger when the user says things like "בדוק את האתר", "תדמה משתמש", or "תבדוק שהכל עובד". Always use this skill — do not attempt browser automation without it, as it contains critical Docker-safe configuration required for Chromium to run on Linux servers.
  - 状态说明：已就绪
- **qa-patrol** [ready] (openclaw-workspace)
  - 功能：Automated QA testing for web apps using local browser automation. Runs entirely on your machine — no data leaves, no cloud services, no external servers. Level 1 (smoke tests) needs only a URL. Level 2 (auth/payment testing) uses optional env vars for test credentials. Level 3 (static analysis, DB checks) optionally reads local files and connects to a user-provided database. Supports Supabase/Firebase auth, Stripe payments, React Native Web, Next.js, and SPAs.
  - 状态说明：已就绪
- **qa-skill** [ready] (openclaw-workspace)
  - 功能：Generate comprehensive test cases and quality assurance documentation from SwiftUI iOS code. Use when iOS application code is available and needs testing strategies, test cases, and quality validation. This skill receives input from dev-skill and completes the auto-dev-pipeline by providing testing coverage.
  - 状态说明：已就绪
- **security-audit** [ready] (openclaw-workspace)
  - 功能：Audit codebases and infrastructure for security issues. Use when scanning dependencies for vulnerabilities, detecting hardcoded secrets, checking OWASP top 10 issues, verifying SSL/TLS, auditing file permissions, or reviewing code for injection and auth flaws.
  - 状态说明：已就绪
- **security-auditor** [ready] (openclaw-workspace)
  - 功能：Use when reviewing code for security vulnerabilities, implementing authentication flows, auditing OWASP Top 10, configuring CORS/CSP headers, handling secrets, input validation, SQL injection prevention, XSS protection, or any security-related code review.
  - 状态说明：已就绪
- **security-scanner** [ready] (openclaw-workspace)
  - 功能：Automated security scanning and vulnerability detection for web applications, APIs, and infrastructure. Use when you need to scan targets for vulnerabilities, check SSL certificates, find open ports, detect misconfigurations, or perform security audits. Integrates with nmap, nuclei, and other security tools.
  - 状态说明：已就绪
- **test-master** [ready] (openclaw-workspace)
  - 功能：Use when writing tests, creating test strategies, or building automation frameworks. Invoke for unit tests, integration tests, E2E, coverage analysis, performance testing, security testing.
  - 状态说明：已就绪
- **test-patterns** [ready] (openclaw-workspace)
  - 功能：Write and run tests across languages and frameworks. Use when setting up test suites, writing unit/integration/E2E tests, measuring coverage, mocking dependencies, or debugging test failures. Covers Node.js (Jest/Vitest), Python (pytest), Go, Rust, and Bash.
  - 状态说明：已就绪
- **test-sentinel** [ready] (openclaw-workspace)
  - 功能：Writes and runs tests (unit, integration, E2E), performs linting, and auto-fixes failures
  - 状态说明：已就绪
- **ux-qa-gate** [ready] (openclaw-workspace)
  - 功能：Self-review gate for UI/UX work before delivering to the user. Run automatically after building, modifying, or completing any user-facing feature, page, component, or flow. Triggers on: finishing a build task, completing a UI change, delivering a web app feature, wrapping up frontend work. Also use when asked to QA this, review the UX, check for usability issues, or run the gate. What it does: (1) Functional completeness check — verifies every button, link, form, and flow works end-to-end, (2) Heuristic review — walks through all 10 Nielsen Norman usability heuristics with a detailed checklist, (3) State and edge case sweep — checks empty, loading, error, success, partial, overflow, and auth states, (4) Interaction and responsiveness — verifies clickability, keyboard access, and responsive layout, (5) Severity classification — blockers and major issues fixed before delivery, minor items noted. Catches missing functionality, broken flows, empty states, and usability problems before the user sees them.
  - 状态说明：已就绪
