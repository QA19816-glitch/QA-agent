# 非测试技能类

## 开发 / GitHub / Agent 工具（11）

1. `capability-evolver-pro`
   - 功能作用：>
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/capability-evolver-pro>
2. `clawhub`
   - 功能作用：Use the ClawHub CLI to search, install, update, and publish agent skills from clawhub.com. Use when you need to fetch new skills on the fly, sync installed skills to latest or a specific version, or publish new/updated skill folders with the npm-installed clawhub CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/clawhub>
3. `coding-agent-common`
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/coding-agent-common>
4. `deerflow-super-agent-harness`
   - 功能作用：Install, configure, and extend DeerFlow 2.0 — an open-source super agent harness that orchestrates sub-agents, memory, sandboxes, and skills to handle complex multi-step tasks.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/deerflow-super-agent-harness>
5. `find-skills-3`
   - 功能作用：Helps users discover and install agent skills when they ask questions like "how do I do X", "find a skill for X", "is there a skill that can...", or express interest in extending capabilities. This skill should be used when the user is looking for functionality that might exist as an installable skill.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/find-skills-3>
6. `gh-issues`
   - 功能作用：Fetch GitHub issues, spawn sub-agents to implement fixes and open PRs, then monitor and address PR review comments. Usage: /gh-issues [owner/repo] [--label bug] [--limit 5] [--milestone v1.0] [--assignee @me] [--fork user/repo] [--watch] [--interval 5] [--reviews-only] [--cron] [--dry-run] [--model glm-5] [--notify-channel -1002381931352]
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/gh-issues>
7. `github`
   - 功能作用：Interact with GitHub using the `gh` CLI. Use `gh issue`, `gh pr`, `gh run`, and `gh api` for issues, PRs, CI runs, and advanced queries.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/github>
8. `healthcheck`
   - 功能作用：Host security hardening and risk-tolerance configuration for OpenClaw deployments. Use when a user asks for security audits, firewall/SSH/update hardening, risk posture, exposure review, OpenClaw cron scheduling for periodic checks, or version status checks on a machine running OpenClaw (laptop, workstation, Pi, VPS).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/healthcheck>
9. `self-improving-agent-skill`
   - 功能作用：基于对经验的持续学习，不断优化 Agent 能力。适用于完成重要任务后、出现错误时、会话结束时，或用户输入“自我进化”“总结经验”“从经验中学习”等指令时触发。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/self-improving-agent-skill>
10. `skill-creator`
   - 功能作用：Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Claude's capabilities with specialized knowledge, workflows, or tool integrations.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/skill-creator>
11. `skill-vetter`
   - 功能作用：Security-first skill vetting for AI agents. Use before installing any skill from ClawdHub, GitHub, or other sources. Checks for red flags, permission scope, and suspicious patterns.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/skill-vetter>

## 飞书 / 文档 / 知识库 / 媒体内容（18）

1. `daily-report-writer`
   - 功能作用：根据输入生成日报 Markdown 草稿并写入 reports 目录
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/daily-report-writer>
2. `feishu-doc`
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/feishu-doc>
3. `feishu-drive`
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/feishu-drive>
4. `feishu-perm`
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/feishu-perm>
5. `feishu-wiki`
   - 功能作用：|
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/feishu-wiki>
6. `html-to-pdf`
   - 功能作用：Convert HTML files and URLs to PDF using Puppeteer. Use when a user needs to convert HTML documents, web pages, or reports to PDF format with custom formatting options (margins, page size, orientation, headers/footers).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/html-to-pdf>
7. `image-edit`
   - 功能作用：Edit images with AI inpainting, outpainting, background removal, upscaling, and restoration tools.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/image-edit>
8. `image-handler`
   - 功能作用：Read, analyze, convert, and manipulate image files (PNG, JPG, GIF, WebP, TIFF, BMP, HEIC, SVG, ICO). Use when working with images: reading metadata, converting formats, resizing, rotating, compressing, or batch processing. Triggers on mentions of image files, file paths with image extensions, or requests to process/convert images.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/image-handler>
9. `lh-video-gen`
   - 功能作用：Generate vertical short videos (9:16) from a Markdown script. Parses script sections, generates TTS audio, renders subtitle cards, and composites into MP4 with FFmpeg.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/lh-video-gen>
10. `openclaw-slides`
   - 功能作用：Create stunning, animation-rich HTML presentations from scratch or convert PowerPoint files (.ppt/.pptx) to beautiful web slides. Use when the user wants to build a pitch deck, presentation, slideshow, or slide deck — or convert an existing PPT to a web presentation. Generates zero-dependency single HTML files with keyboard/touch navigation and scroll-triggered animations. Style options include Neon Cyber, Bold Signal, Swiss Modern, Paper & Ink, and 8 more curated presets.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/openclaw-slides>
11. `pdf-skill`
   - 功能作用：Create, read, edit, merge, split PDF files. Supports text extraction, table extraction, form filling, watermarks, OCR, and HTML-to-PDF conversion.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/pdf-skill>
12. `powerpoint-pptx`
   - 功能作用：Create, inspect, and edit Microsoft PowerPoint presentations and PPTX decks with reliable layouts, templates, placeholders, notes, charts, and visual QA. Use when (1) the task is about PowerPoint or `.pptx`; (2) layouts, placeholders, notes, charts, comments, or template fidelity matter; (3) the deck must render cleanly after edits.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/powerpoint-pptx>
13. `pptx-generator`
   - 功能作用：专业PPT生成器。Use when user wants to create editable PowerPoint presentations with professional layouts, multiple styles, and beautiful designs. Supports business, academic, creative styles. 可编辑PPT、幻灯片制作、演示文稿。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/pptx-generator>
14. `smart-weekly-report`
   - 功能作用：> **使用方法**：将本文件内容复制到你使用的 AI 对话框中，然后用自然语言描述你本周的工作情况，AI 将自动生成结构化周报。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/smart-weekly-report>
15. `summarize`
   - 功能作用：Summarize URLs or files with the summarize CLI (web, PDFs, images, audio, YouTube).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/summarize>
16. `video-gif-converter`
   - 功能作用：Convert short video moments into GIF-friendly snippets for demos, support, product walkthroughs, and social sharing. Use when a team needs lightweight motion previews instead of full video files.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/video-gif-converter>
17. `video-stitcher`
   - 功能作用：视频片段拼接和后期处理。输入视频片段列表，输出完整视频。支持转场效果、背景音乐、字幕叠加。底层使用 FFmpeg 或 Remotion。触发词：拼接视频、合并视频、视频剪辑、video stitch、concatenate videos、add transitions。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/video-stitcher>
18. `weekly-report-writer`
   - 功能作用：用于撰写结构清晰的中文周报。只要用户提到“周报、weekly report、本周总结、工作复盘、下周计划、给老板汇报”，即使没有明确说“写周报”，也应主动使用此技能来生成可直接发送的周报内容。
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/weekly-report-writer>

## 安全 / 基础设施 / 运维观测（5）

1. `aws-infra`
   - 功能作用：Chat-based AWS infrastructure assistance using AWS CLI and console context. Use for querying, auditing, and monitoring AWS resources (EC2, S3, IAM, Lambda, ECS/EKS, RDS, CloudWatch, billing, etc.), and for proposing safe changes with explicit confirmation before any write/destructive action.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/aws-infra>
2. `cloudflare-toolkit`
   - 功能作用：Manage Cloudflare domains, DNS records, SSL settings, zone configuration, firewall rules, tunnels, and analytics via the Cloudflare API. Use when the user asks to set up a domain, add/edit/delete DNS records, configure SSL, check zone settings, manage Cloudflare Tunnels, view analytics, or any Cloudflare account management task.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/cloudflare-toolkit>
3. `grafana-lens`
   - 功能作用：Grafana tools for data visualization, monitoring, alerting, security, and SRE investigation. Use grafana_query, grafana_query_logs, grafana_query_traces, grafana_create_dashboard, grafana_update_dashboard, grafana_create_alert, grafana_share_dashboard, grafana_annotate, grafana_explore_datasources, grafana_list_metrics, grafana_search, grafana_get_dashboard, grafana_check_alerts, grafana_push_metrics, grafana_explain_metric, grafana_security_check, and grafana_investigate. Trigger when asked about metrics, dashboards, monitoring, alerts, costs, token usage, data visualization, PromQL, Prometheus, LogQL, Loki, log queries, error logs, log search, TraceQL, Tempo, traces, distributed tracing, span search, find slow traces, debug session traces, annotations, deployments, sharing charts, investigating alert notifications, pushing custom data (calendar, git, fitness, finance) to Grafana for visualization, pushing historical data, backfilling metrics, recording past data with timestamps, modifying dashboards, adding panels, removing panels, changing dashboard settings, updating dashboard time range, explain metric, metric trend, what is this metric, how has this changed, is this metric normal, why did my bill spike, cost visibility, security monitoring, security check, security audit, am I being attacked, is my agent compromised, suspicious activity, threat detection, prompt injection detection, set up security alerts, investigate, debug, triage, root cause, what's wrong, why is X broken, anomaly detection, RED method, USE method, alert fatigue, postmortem, incident summary.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/grafana-lens>
4. `monitoring`
   - 功能作用：Set up observability for applications and infrastructure with metrics, logs, traces, and alerts.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/monitoring>
5. `system-resource-monitor`
   - 功能作用：A clean, reliable system resource monitor for CPU load, RAM, Swap, and Disk usage. Optimized for OpenClaw.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/system-resource-monitor>

## 数据 / 办公 / 个人效率 / 其他（52）

1. `1password`
   - 功能作用：Set up and use 1Password CLI (op). Use when installing the CLI, enabling desktop app integration, signing in (single or multi-account), or reading/injecting/running secrets via op.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/1password>
2. `apple-notes`
   - 功能作用：Manage Apple Notes via the `memo` CLI on macOS (create, view, edit, delete, search, move, and export notes). Use when a user asks OpenClaw to add a note, list notes, search notes, or manage note folders.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/apple-notes>
3. `apple-reminders`
   - 功能作用：Manage Apple Reminders via remindctl CLI (list, add, edit, complete, delete). Supports lists, date filters, and JSON/plain output.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/apple-reminders>
4. `atlassian-confluence`
   - 功能作用：Read and write Confluence Cloud pages — search, create, update, manage labels. Use when user mentions Confluence, wiki, documentation, pages, or knowledge base.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/atlassian-confluence>
5. `automate-excel`
   - 功能作用：Automates reading, writing, merging, transforming, and validating Excel (.xlsx/.xls) files. Use when the user works with spreadsheets, .xlsx files, Excel data, CSV-to-Excel conversion, batch Excel processing, or report generation from tables.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/automate-excel>
6. `baidu-web-search`
   - 功能作用：Use Baidu Qianfan web search API for real-time web retrieval. Use when the user needs to search the web, get latest news, verify facts, or expresses intent like "查一下","搜一下","最近","今天","今年", or asks about events/people/products that require looking up.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/baidu-web-search>
7. `bear-notes`
   - 功能作用：Create, search, and manage Bear notes via grizzly CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/bear-notes>
8. `blogwatcher`
   - 功能作用：Monitor blogs and RSS/Atom feeds for updates using the blogwatcher CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/blogwatcher>
9. `blucli`
   - 功能作用：BluOS CLI (blu) for discovery, playback, grouping, and volume.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/blucli>
10. `bluebubbles`
   - 功能作用：Use when you need to send or manage iMessages via BlueBubbles (recommended iMessage integration). Calls go through the generic message tool with channel="bluebubbles".
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/bluebubbles>
11. `camsnap`
   - 功能作用：Capture frames or clips from RTSP/ONVIF cameras.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/camsnap>
12. `crash-fixer`
   - 功能作用：Autonomous crash analysis and bug fixing. Monitors crash reports from Cloudflare D1, deduplicates, analyzes with Codex 5.3 High, generates fixes, and creates PRs. Usage: /crash-fixer [--hours 24] [--limit 5] [--dry-run]
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/crash-fixer>
13. `discord`
   - 功能作用：Discord ops via the message tool (channel=discord).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/discord>
14. `eightctl`
   - 功能作用：Control Eight Sleep pods (status, temperature, alarms, schedules).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/eightctl>
15. `excel-xlsx`
   - 功能作用：Create, inspect, and edit Microsoft Excel workbooks and XLSX files with reliable formulas, dates, types, formatting, recalculation, and template preservation. Use when (1) the task is about Excel, `.xlsx`, `.xlsm`, `.xls`, `.csv`, or `.tsv`; (2) formulas, formatting, workbook structure, or compatibility matter; (3) the file must stay reliable after edits.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/excel-xlsx>
16. `fastlane`
   - 功能作用：iOS/macOS app automation — builds, signing, TestFlight, App Store via CLI
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/fastlane>
17. `gemini`
   - 功能作用：Gemini CLI for one-shot Q&A, summaries, and generation.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/gemini>
18. `gifgrep`
   - 功能作用：Search GIF providers with CLI/TUI, download results, and extract stills/sheets.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/gifgrep>
19. `gog`
   - 功能作用：Google Workspace CLI for Gmail, Calendar, Drive, Contacts, Sheets, and Docs.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/gog>
20. `goplaces`
   - 功能作用：Query Google Places API (New) via the goplaces CLI for text search, place details, resolve, and reviews. Use for human-friendly place lookup or JSON output for scripts.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/goplaces>
21. `himalaya`
   - 功能作用：CLI to manage emails via IMAP/SMTP. Use `himalaya` to list, read, write, reply, forward, search, and organize emails from the terminal. Supports multiple accounts and message composition with MML (MIME Meta Language).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/himalaya>
22. `imsg`
   - 功能作用：iMessage/SMS CLI for listing chats, history, and sending messages via Messages.app.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/imsg>
23. `mcporter`
   - 功能作用：Use the mcporter CLI to list, configure, auth, and call MCP servers/tools directly (HTTP or stdio), including ad-hoc servers, config edits, and CLI/type generation.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/mcporter>
24. `mobile-responsive`
   - 功能作用：Deep responsive design workflow—breakpoints, content priority, touch targets, typography, performance on mobile networks, and testing on real devices. Use when fixing mobile UX, defining responsive patterns, or auditing layouts across viewports.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/mobile-responsive>
25. `model-usage`
   - 功能作用：Use CodexBar CLI local cost usage to summarize per-model usage for Codex or Claude, including the current (most recent) model or a full model breakdown. Trigger when asked for model-level usage/cost data from codexbar, or when you need a scriptable per-model summary from codexbar cost JSON.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/model-usage>
26. `nano-pdf`
   - 功能作用：Edit PDFs with natural-language instructions using the nano-pdf CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/nano-pdf>
27. `notion`
   - 功能作用：Notion API for creating and managing pages, databases, and blocks.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/notion>
28. `obsidian`
   - 功能作用：Work with Obsidian vaults (plain Markdown notes) and automate via obsidian-cli.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/obsidian>
29. `openai-whisper`
   - 功能作用：Local speech-to-text with the Whisper CLI (no API key).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/openai-whisper>
30. `openai-whisper-api`
   - 功能作用：Transcribe audio via OpenAI Audio Transcriptions API (Whisper).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/openai-whisper-api>
31. `openclaw-agent-browser`
   - 功能作用：Headless browser automation CLI for AI agents. Use when interacting with websites — navigating pages, filling forms, clicking buttons, taking screenshots, extracting data, scraping, testing web apps, downloading files, or automating any browser task. Triggers on requests to "open a website", "fill out a form", "click a button", "take a screenshot", "scrape data", "test this web app", "login to a site", "monitor a page", or any task requiring programmatic web interaction.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/openclaw-agent-browser>
32. `openclaw-log-analyzer`
   - 功能作用：Intelligent log analysis tool for monitoring cron jobs, detecting errors, analyzing patterns, and generating reports. Supports automatic error detection, log aggregation, and Discord notifications.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/openclaw-log-analyzer>
33. `openhue`
   - 功能作用：Control Philips Hue lights and scenes via the OpenHue CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/openhue>
34. `oracle`
   - 功能作用：Best practices for using the oracle CLI (prompt + file bundling, engines, sessions, and file attachment patterns).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/oracle>
35. `ordercli`
   - 功能作用：Foodora-only CLI for checking past orders and active order status (Deliveroo WIP).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/ordercli>
36. `peekaboo`
   - 功能作用：Capture and automate macOS UI with the Peekaboo CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/peekaboo>
37. `pls-audit-website`
   - 功能作用：Perform full health check on websites, identifying technical friction points and user experience issues. Use when: (1) Auditing website performance, (2) Checking for broken links, (3) Analyzing page structure, (4) Testing accessibility, (5) Reviewing security headers.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/pls-audit-website>
38. `sag`
   - 功能作用：ElevenLabs text-to-speech with mac-style say UX.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/sag>
39. `session-logs`
   - 功能作用：Search and analyze your own session logs (older/parent conversations) using jq.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/session-logs>
40. `sherpa-onnx-tts`
   - 功能作用：Local text-to-speech via sherpa-onnx (offline, no cloud)
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/sherpa-onnx-tts>
41. `slack`
   - 功能作用：Use when you need to control Slack from OpenClaw via the slack tool, including reacting to messages or pinning/unpinning items in Slack channels or DMs.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/slack>
42. `songsee`
   - 功能作用：Generate spectrograms and feature-panel visualizations from audio with the songsee CLI.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/songsee>
43. `sonoscli`
   - 功能作用：Control Sonos speakers (discover/status/play/volume/group).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/sonoscli>
44. `spotify-player`
   - 功能作用：Terminal Spotify playback/search via spogo (preferred) or spotify_player.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/spotify-player>
45. `things-mac`
   - 功能作用：Manage Things 3 via the `things` CLI on macOS (add/update projects+todos via URL scheme; read/search/list from the local Things database). Use when a user asks OpenClaw to add a task to Things, list inbox/today/upcoming, search tasks, or inspect projects/areas/tags.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/things-mac>
46. `tmux`
   - 功能作用：Remote-control tmux sessions for interactive CLIs by sending keystrokes and scraping pane output.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/tmux>
47. `trello`
   - 功能作用：Manage Trello boards, lists, and cards via the Trello REST API.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/trello>
48. `video-frames`
   - 功能作用：Extract frames or short clips from videos using ffmpeg.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/video-frames>
49. `voice-call`
   - 功能作用：Start voice calls via the OpenClaw voice-call plugin.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/voice-call>
50. `wacli`
   - 功能作用：Send WhatsApp messages to other people or search/sync WhatsApp history via the wacli CLI (not for normal user chats).
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/wacli>
51. `weather`
   - 功能作用：Get current weather and forecasts via wttr.in or Open-Meteo. Use when: user asks about weather, temperature, or forecasts for any location. NOT for: historical weather data, severe weather alerts, or detailed meteorological analysis. No API key needed.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/weather>
52. `xurl`
   - 功能作用：A CLI tool for making authenticated requests to the X (Twitter) API. Use this skill when you need to post tweets, reply, quote, search, read posts, manage followers, send DMs, upload media, or interact with any X API v2 endpoint.
   - GitHub 链接：<https://github.com/QA19816-glitch/QA-agent/tree/main/skills/xurl>

