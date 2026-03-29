#!/usr/bin/env python3
from __future__ import annotations

import json
from collections import defaultdict
from pathlib import Path

WORKSPACE = Path('/Users/jiguang/.openclaw/workspace-main')
RAW_PATH = Path('/tmp/openclaw_skills_list.raw')
REPO = 'https://github.com/QA19816-glitch/QA-agent'
BRANCH = 'main'

raw = RAW_PATH.read_text(encoding='utf-8')
obj, end = json.JSONDecoder().raw_decode(raw)
skills = obj['skills']

# -------- classification --------
TESTING_EXPLICIT = {
    'qa', 'qa-api-runner', 'qa-browser-tester', 'qa-bug-triage', 'qa-patrol',
    'qa-prd-analyzer', 'qa-regression-planner', 'qa-release-gate-checker',
    'qa-skill', 'qa-test-data-factory', 'qa-test-point-extractor',
    'qa-test-report-generator', 'qa-testcase-writer', 'qa-traceability-mapper',
    'qa-web-e2e-runner', 'api-performance-testing', 'bug-investigation',
    'e2e-test-orchestrator', 'e2e-testing', 'e2e-testing-patterns',
    'frontend-performance-audit', 'mobile-appium-test', 'mobile-responsive',
    'openapi-spec', 'APITester Agent-Driven API Testing', 'performance-tuning',
    'playwright-browser-automation', 'playwright-cli', 'playwright-mcp',
    'playwright-npx', 'playwright-pro', 'playwright-skill', 'Postman',
    'security-audit', 'security-auditor', 'security-scanner', 'Test Generator',
    'test-master', 'test-patterns', 'test-sentinel', 'ux-qa-gate',
    'web-screenshot', 'webperf-core-web-vitals', 'Chrome DevTools Auto Analyzer',
    'add-analytics', 'analytics-tracking', 'check-analytics',
    'sensors-analytics-tracking', 'seo-optimizer', 'seo-analyzer', 'website-seo'
}

PROJECT_COLLAB = {
    'jira', 'GitHub Actions', 'GitLab', 'linear', 'weekly-report-writer',
    'daily-report-writer', 'smart-weekly-report', 'confluence',
    'atlassian-confluence', 'atlassian-jira'
}

MEDIA_DOCS = {
    'feishu-doc', 'feishu-drive', 'feishu-perm', 'feishu-wiki', 'nano-pdf', 'pdf',
    'html-to-pdf', 'Image Editing', 'openclaw-slides', 'Powerpoint / PPTX',
    'pptx-generator', 'video-gif-converter', 'video-stitcher', 'lh-video-gen',
    'summarize', 'openai-whisper', 'openai-whisper-api', 'video-frames', 'gifgrep'
}

DEV_AGENT = {
    'clawhub', 'coding-agent', 'gemini', 'gh-issues', 'github', 'find-skills',
    'skill-creator', 'skill-vetter', 'Capability Evolver', 'self-improving-agent-skill',
    'agent-browser', 'deerflow-super-agent-harness', 'session-logs', 'tmux',
    'openclaw-api-tester', 'log-analyzer', 'sql-toolkit', 'openclaw-log-analyzer'
}

INFRA = {
    '1password', 'aws-infra', 'cloudflare-tunnel', 'CI-CD', 'cicd-pipeline',
    'db-readonly', 'Docker Compose', 'Docker Pro Diagnostic', 'helm',
    'initial-traefik', 'jenkins', 'Kubernetes', 'kafka', 'kibana',
    'kubectl-skill', 'kubernetes-devops', 'logging-observability', 'Monitoring',
    'mqtt-client', 'Nginx', 'postgres', 'prometheus', 'rabbitmq-client-guide',
    'system_resource_monitor', 'tcpdump', 'terraform-iac', 'Traefik',
    'Wireshark Network Traffic Analysis', 'grafana', 'healthcheck', 'node-connect'
}

MOBILE_DEVICE = {
    'android-automation', 'android-device-automation', 'fastlane', 'TestFlight'
}

SEARCH_LIFE = {
    'weather', 'baidu-web-search'
}

MANUAL_CN = {
    'find-skills': '智能搜索和发现可安装 skill，适合找能力、找插件、找扩展。',
    'skill-creator': '用于新建或改造 OpenClaw skill，帮助定制专属能力。',
    'skill-vetter': '安装前安全扫描 skill，检查权限范围、可疑行为和风险信号。',
    'Capability Evolver': '分析运行日志和失败模式，生成能力优化与演进建议。',
    'self-improving-agent-skill': '让 Agent 从经验中学习，沉淀改进点，持续优化表现。',
    'agent-browser': '网页自动化与数据抓取，适合打开网站、填表、点击、截图、采集。',
    'summarize': '总结网页、文件、PDF、图片、音频、YouTube 等长内容。',
    'baidu-web-search': '基于百度搜索进行实时中文网页检索。',
    'github': '通过 gh CLI 管理仓库、PR、Issue、Actions 等 GitHub 工作流。',
    'deerflow-super-agent-harness': '安装和配置 DeerFlow 2.0 超级代理框架，用于多代理、记忆、沙箱和复杂任务编排。',
}


def classify(name: str, desc: str) -> tuple[str, bool]:
    lname = name.lower()
    ldesc = desc.lower()
    if name in TESTING_EXPLICIT or lname.startswith('qa-') or 'test' in lname or 'testing' in lname or 'playwright' in lname or 'seo' in lname:
        return 'QA / 软件测试', True
    if name in DEV_AGENT or 'agent' in lname or 'github' in lname or 'skill' in lname:
        return '开发 / GitHub / Agent 工具', False
    if name in MEDIA_DOCS or 'pdf' in lname or 'video' in lname or 'ppt' in lname or 'feishu' in lname:
        return '文档 / 知识库 / 媒体内容', False
    if name in INFRA or any(k in lname for k in ['docker', 'k8', 'kube', 'grafana', 'prometheus', 'nginx', 'cloudflare', 'terraform', 'monitor', 'infra', 'observ', 'tcpdump']):
        return '安全 / 基础设施 / 运维观测', False
    if name in PROJECT_COLLAB or any(k in lname for k in ['jira', 'gitlab', 'linear', 'report']):
        return '协作 / 项目 / 工作流', False
    if name in MOBILE_DEVICE or any(k in lname for k in ['android', 'ios', 'testflight', 'fastlane']):
        return '移动 / 设备 / 终端', False
    if name in SEARCH_LIFE or any(k in lname for k in ['search', 'weather', 'maps', 'places']):
        return '搜索 / 生活 / 通用工具', False
    if any(k in ldesc for k in ['slack', 'telegram', 'discord', 'message', 'chat']) or any(k in lname for k in ['slack', 'discord']):
        return '协作 / 项目 / 工作流', False
    return '其他', False


def setup_note(s: dict) -> str:
    missing = s.get('missing', {}) or {}
    parts: list[str] = []
    if missing.get('bins'):
        parts.append('缺少命令: ' + ', '.join(missing['bins']))
    if missing.get('anyBins'):
        parts.append('至少需要一个命令: ' + ', '.join(missing['anyBins']))
    if missing.get('env'):
        parts.append('缺少环境变量: ' + ', '.join(missing['env']))
    if missing.get('config'):
        parts.append('缺少配置: ' + ', '.join(missing['config']))
    if missing.get('os'):
        parts.append('系统限制: ' + ', '.join(missing['os']))
    return '；'.join(parts) if parts else '已就绪'


def cn_intro(s: dict) -> str:
    name = s['name']
    if name in MANUAL_CN:
        return MANUAL_CN[name]
    return s['description'].strip().replace('\n', ' ')

for s in skills:
    cat, is_test = classify(s['name'], s['description'])
    s['category'] = cat
    s['is_testing'] = is_test
    s['status'] = 'ready' if s['eligible'] else 'needs setup'
    s['setup_note'] = setup_note(s)
    s['cn_intro'] = cn_intro(s)

skills = sorted(skills, key=lambda x: (x['category'], x['name'].lower()))
all_count = len(skills)
ready_count = sum(1 for s in skills if s['eligible'])
needs_count = all_count - ready_count
testing = [s for s in skills if s['is_testing']]
non_testing = [s for s in skills if not s['is_testing']]

category_order = [
    'QA / 软件测试',
    '开发 / GitHub / Agent 工具',
    '文档 / 知识库 / 媒体内容',
    '安全 / 基础设施 / 运维观测',
    '协作 / 项目 / 工作流',
    '移动 / 设备 / 终端',
    '搜索 / 生活 / 通用工具',
    '其他',
]
by_cat = defaultdict(list)
for s in skills:
    by_cat[s['category']].append(s)
non_test_by_cat = defaultdict(list)
for s in non_testing:
    non_test_by_cat[s['category']].append(s)

inventory_dir = WORKSPACE / 'inventory'
inventory_dir.mkdir(parents=True, exist_ok=True)

manifest = {
    'repo': REPO,
    'branch': BRANCH,
    'workspaceDir': obj['workspaceDir'],
    'managedSkillsDir': obj['managedSkillsDir'],
    'summary': {
        'total': all_count,
        'ready': ready_count,
        'needs_setup': needs_count,
        'testing': len(testing),
        'non_testing': len(non_testing),
    },
    'skills': skills,
}
(inventory_dir / 'all-skills-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

# README.md
readme_lines = [
    '# QA-agent / OpenClaw Skills Hub',
    '',
    '这是大王当前维护的一份 **OpenClaw Skills 仓库**：既包含软件测试专项 skills，也包含研发、Agent、浏览器自动化、GitHub、文档、搜索、基础设施等非测试专项能力。',
    '',
    '## 本次新增（按你的图片 + DeerFlow 2.0 要求补装）',
    '',
    '- **开发 / Agent 工具**',
    '  - `find-skills`：智能搜索和发现可安装 skill。',
    '  - `skill-creator`：创建/改造自定义 skills。',
    '  - `Capability Evolver`：根据日志和历史表现生成能力优化建议。',
    '  - `self-improving-agent-skill`：让 Agent 从经验中持续学习。',
    '  - `github`：管理仓库、PR、Issue、Actions。',
    '  - `deerflow-super-agent-harness`：对接 DeerFlow 2.0，多代理/记忆/沙箱任务编排。',
    '- **安全 / 治理**',
    '  - `skill-vetter`：安装前安全审查与风险扫描。',
    '- **网页自动化 / 内容处理 / 搜索**',
    '  - `agent-browser`：网页自动化、抓取、截图、表单操作。',
    '  - `summarize`：长文、URL、PDF、音频、视频总结。',
    '  - `baidu-web-search`：百度实时中文检索（当前需补 `BAIDU_API_KEY` 才算 fully ready）。',
    '',
    '## 当前仓库规模',
    '',
    f'- 总技能数：**{all_count}**',
    f'- Ready：**{ready_count}**',
    f'- Needs setup：**{needs_count}**',
    f'- 测试专项：**{len(testing)}**',
    f'- 非测试专项：**{len(non_testing)}**',
    '',
    '## 直接入口',
    '',
    f'- **GitHub 仓库主页**：<{REPO}>',
    f'- **全局技能总清单**：<{REPO}/blob/{BRANCH}/inventory/ALL_SKILLS.md>',
    f'- **测试专项清单**：<{REPO}/blob/{BRANCH}/inventory/SOFTWARE_TESTING_SPECIALTIES.md>',
    f'- **非测试专项清单**：<{REPO}/blob/{BRANCH}/inventory/NON_TESTING_SPECIALTIES.md>',
    '',
    '## 使用方式',
    '',
    '1. 克隆仓库',
    '   ```bash',
    f'   git clone {REPO}.git',
    '   ```',
    '2. 把需要的 skill 目录复制到你的 OpenClaw workspace `skills/` 下',
    '3. 新开会话，或重启 gateway，让技能生效',
    '',
    '## 说明',
    '',
    '- `ready` = 当前环境下已经能直接用。',
    '- `needs setup` = skill 已装入仓库，但还缺 CLI / 环境变量 / 配置。',
    '- 本仓库适合做“技能超市 + 测试工具箱 + 非测试能力中心”。',
]
(WORKSPACE / 'README.md').write_text('\n'.join(readme_lines).rstrip() + '\n', encoding='utf-8')

# ALL_SKILLS.md
lines = [
    '# 全局 OpenClaw Skills 总清单',
    '',
    f'- 仓库主页：<{REPO}>',
    f'- 测试专项清单：<{REPO}/blob/{BRANCH}/inventory/SOFTWARE_TESTING_SPECIALTIES.md>',
    f'- 非测试专项清单：<{REPO}/blob/{BRANCH}/inventory/NON_TESTING_SPECIALTIES.md>',
    '',
    '## 总览',
    '',
    f'- 总技能数：**{all_count}**',
    f'- Ready：**{ready_count}**',
    f'- Needs setup：**{needs_count}**',
    f'- 测试专项：**{len(testing)}**',
    f'- 非测试专项：**{len(non_testing)}**',
    '',
    '## 分类统计',
    '',
]
for cat in category_order:
    items = by_cat.get(cat, [])
    if not items:
        continue
    r = sum(1 for s in items if s['eligible'])
    lines.append(f'- **{cat}**：{len(items)} 个（ready {r} / total {len(items)}）')
lines += ['', '## 分类 + Skills + 功能介绍', '']
for cat in category_order:
    items = by_cat.get(cat, [])
    if not items:
        continue
    lines.append(f'### {cat}')
    lines.append('')
    for s in items:
        lines.append(f'- **{s["name"]}** [{s["status"]}]')
        lines.append(f'  - 功能介绍：{s["cn_intro"]}')
        lines.append(f'  - 状态说明：{s["setup_note"]}')
    lines.append('')
(inventory_dir / 'ALL_SKILLS.md').write_text('\n'.join(lines).rstrip() + '\n', encoding='utf-8')

# Testing specialties (preserve curated style, refresh links + header)
test_doc = [
    '# 软件测试专项 Skills 总清单',
    '',
    '这份清单专门从“软件测试负责人 / QA 负责人”的视角整理，而不是按 OpenClaw 系统分类。',
    '',
    f'- 仓库主页：<{REPO}>',
    f'- 全局技能总表：<{REPO}/blob/{BRANCH}/inventory/ALL_SKILLS.md>',
    f'- 非测试专项清单：<{REPO}/blob/{BRANCH}/inventory/NON_TESTING_SPECIALTIES.md>',
    '',
    '---',
    '',
    '## 1. 测试设计 / 需求分析 / 用例 / 追踪 / 报告',
    '',
    '- **qa-prd-analyzer**：分析 PRD / 需求文档 / 变更说明，输出功能拆解、流程、歧义点和测试风险。',
    '- **qa-test-point-extractor**：从需求、流程、接口文档中提取覆盖正常、异常、边界、权限和状态流转的测试点。',
    '- **qa-testcase-writer**：把测试点转成标准测试用例，包含前置条件、步骤、预期结果和优先级。',
    '- **qa-traceability-mapper**：建立需求 → 测试点 → 用例 → 执行 → 缺陷的追踪矩阵。',
    '- **qa-test-data-factory**：设计和生成边界值、权限、状态流转等测试数据。',
    '- **qa-test-report-generator**：生成测试报告，汇总范围、结果、风险和发布建议。',
    '- **qa-regression-planner**：按变更影响范围规划回归。',
    '- **qa-release-gate-checker**：做发布闸门判断，给出 go / no-go 结论。',
    '',
    '## 2. 功能测试 / 冒烟 / 回归 / 巡检',
    '',
    '- **qa**：系统化 QA 测试 Web 应用并自动修 bug。',
    '- **qa-browser-tester**：真实浏览器 headless 进行点击、表单、菜单和主流程测试。',
    '- **qa-patrol**：本地浏览器自动化 QA，适合烟雾测试和基础回归。',
    '- **Test Generator**：自动生成单测 / 集成 / E2E 测试用例。',
    '- **test-master**：测试策略、自动化框架、性能/安全测试设计。',
    '- **test-patterns**：多语言测试模式，支持单测 / 集成 / E2E / 覆盖率。',
    '- **test-sentinel**：写测试、跑测试、lint、自动修失败。',
    '- **ux-qa-gate**：UI/UX 交付前自检，检查功能、可用性、边界状态和交互细节。',
    '',
    '## 3. 接口测试 / 合同测试 / Mock / 自动化',
    '',
    '- **qa-api-runner**：执行 API 冒烟、回归、异常测试，校验状态码、鉴权、断言。',
    '- **APITester Agent-Driven API Testing**：用自然语言定义接口测试并执行。',
    '- **API Mock Server Generator**：从 OpenAPI 或示例生成 Mock API 服务器。',
    '- **openapi-spec**：OpenAPI 规范设计、schema 复用、安全方案和 codegen。',
    '- **Postman**：管理 collection / environment / Newman 自动化。',
    '',
    '## 4. Web UI / E2E / 浏览器自动化测试',
    '',
    '- **qa-web-e2e-runner**：执行 Web UI 端到端测试，记录步骤、断言、截图和结论。',
    '- **e2e-test-orchestrator**：编排 Playwright / Cypress E2E 测试、修复脚本、生成报告。',
    '- **e2e-testing**：E2E 测试规范和模式。',
    '- **e2e-testing-patterns**：Playwright / Cypress 最佳实践、反 flaky、CI 集成。',
    '- **playwright-browser-automation**：直接用 Playwright 做网页自动化。',
    '- **playwright-cli** / **playwright-mcp** / **playwright-npx**：不同执行方式的 Playwright 自动化。',
    '- **playwright-pro** / **playwright-skill**：更完整的 Playwright 测试/迁移/反 flaky 能力。',
    '- **web-screenshot**：网页截图 / PDF 导出，适合 UI 对比和存档。',
    '',
    '## 5. APP / 移动端 / 终端专项',
    '',
    '- **mobile-appium-test**：Appium + Android UI 自动化测试。',
    '- **android-automation**：ADB + uiautomator Android 自动化。',
    '- **android-device-automation**：基于截图的 Android 视觉自动化。',
    '- **mobile-responsive**：移动端响应式设计 / UX 审查。',
    '- **fastlane**：iOS/macOS 构建、签名、TestFlight、发布。',
    '- **TestFlight**：TestFlight beta 分发和测试管理。',
    '',
    '## 6. 性能 / SEO / 安全 / 埋点测试',
    '',
    '- **api-performance-testing**：接口性能测试与压测设计。',
    '- **frontend-performance-audit**：前端性能诊断，输出优化报告。',
    '- **webperf-core-web-vitals**：分析 LCP / CLS / INP 等指标。',
    '- **Chrome DevTools Auto Analyzer**：基于 Lighthouse / DevTools 自动分析网站性能问题。',
    '- **performance-tuning**：系统级性能调优和瓶颈定位。',
    '- **seo-optimizer** / **seo-analyzer** / **website-seo**：SEO 审计与优化。',
    '- **security-audit** / **security-auditor** / **security-scanner**：安全测试、风险审计、漏洞扫描。',
    '- **add-analytics** / **analytics-tracking** / **check-analytics** / **sensors-analytics-tracking**：埋点设计、埋点审计、神策专项验收。',
    '',
    '## 7. 缺陷管理 / 复盘 / 协同',
    '',
    '- **qa-bug-triage**：把失败结果、截图、日志整理成缺陷单并建议优先级。',
    '- **bug-investigation**：复现、定位和分析前端 bug。',
    '- **jira** / **linear**：问题单、迭代、项目协作。',
    '- **incident-fupan**：事故复盘 / RCA / postmortem。',
    '',
    '## 推荐入口',
    '',
    f'- 仓库主页：<{REPO}>',
    f'- 全局技能总表：<{REPO}/blob/{BRANCH}/inventory/ALL_SKILLS.md>',
    f'- 非测试专项清单：<{REPO}/blob/{BRANCH}/inventory/NON_TESTING_SPECIALTIES.md>',
]
(inventory_dir / 'SOFTWARE_TESTING_SPECIALTIES.md').write_text('\n'.join(test_doc).rstrip() + '\n', encoding='utf-8')

# Non-testing specialties
non_lines = [
    '# 非测试专项 Skills 总清单',
    '',
    '这份清单把“非软件测试”能力集中整理出来，适合做研发工具箱、Agent 能力中心、文档中台和运维支撑目录。',
    '',
    f'- 仓库主页：<{REPO}>',
    f'- 全局技能总表：<{REPO}/blob/{BRANCH}/inventory/ALL_SKILLS.md>',
    f'- 测试专项清单：<{REPO}/blob/{BRANCH}/inventory/SOFTWARE_TESTING_SPECIALTIES.md>',
    '',
    f'- 非测试专项总数：**{len(non_testing)}**',
    '',
    '## 分类 + Skills + 功能介绍',
    '',
]
for cat in category_order:
    if cat == 'QA / 软件测试':
        continue
    items = non_test_by_cat.get(cat, [])
    if not items:
        continue
    non_lines.append(f'### {cat}')
    non_lines.append('')
    for s in items:
        non_lines.append(f'- **{s["name"]}** [{s["status"]}]')
        non_lines.append(f'  - 功能介绍：{s["cn_intro"]}')
        non_lines.append(f'  - 状态说明：{s["setup_note"]}')
    non_lines.append('')
(inventory_dir / 'NON_TESTING_SPECIALTIES.md').write_text('\n'.join(non_lines).rstrip() + '\n', encoding='utf-8')

# inventory index
index_lines = [
    '# Inventory Index',
    '',
    f'- 仓库主页：<{REPO}>',
    f'- 全局技能总清单：<{REPO}/blob/{BRANCH}/inventory/ALL_SKILLS.md>',
    f'- 测试专项清单：<{REPO}/blob/{BRANCH}/inventory/SOFTWARE_TESTING_SPECIALTIES.md>',
    f'- 非测试专项清单：<{REPO}/blob/{BRANCH}/inventory/NON_TESTING_SPECIALTIES.md>',
    '',
    f'- 总技能数：**{all_count}**',
    f'- Ready：**{ready_count}**',
    f'- Needs setup：**{needs_count}**',
]
(inventory_dir / 'README.md').write_text('\n'.join(index_lines).rstrip() + '\n', encoding='utf-8')

print(f'Generated README.md + inventory docs. total={all_count}, testing={len(testing)}, non_testing={len(non_testing)}')
