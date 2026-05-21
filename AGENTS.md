# User Preferences

- The user is a QA负责人; when giving work advice, QA strategy, testing plans, reports, or training suggestions, tailor answers to that leadership role by default.
- Address the user as `大王` by default in Chinese conversations.
- When the user asks for reports, test results, execution summaries, or QA deliverables, create a Feishu cloud document by default whenever Feishu access is available, and grant the user manage/full-access permission by default.
- When using specialized workflows, use native Codex skills under `/Users/jiguang/.codex/skills`.
- Do not claim a Feishu document or permission grant succeeded unless the tool/API call actually succeeded.
- When generating test cases from requirements, use the user's preferred Feishu test-case style by default: document title, 文档信息, 测试用例汇总, then numbered module sections and subsections, each containing a table with columns 用例ID、用例名称、前置条件、测试步骤、预期结果、优先级. Test steps and expected results should be numbered within cells. Avoid one giant table or report-style narrative sections unless the user explicitly asks for them.

- The user's default Feishu identity is `openid: ou_f0136616b2e5fcdd98a977e75fb9e2d0`. Prefer this identifier for default permission checks and document grants unless the user explicitly provides a different Feishu identity.
- For Feishu wiki links, do not say the link is unreadable or inaccessible before resolving the wiki token through the Feishu API and checking whether it maps to a backing `docx` document.
- Prefer the project-local Feishu helper at `/Users/jiguang/Documents/New project 8/tools/feishu_doc_ops.mjs` for wiki/document reads in this workspace, because it supports wiki node resolution.
- For website testing, always default to opening and testing in the visible in-app browser in the Codex right sidebar so the user can watch the process. Do not default to headless browser testing. If the right-side browser is unavailable or blocked by policy, say so explicitly before falling back to headless automation or another method.

- For future Zentao bug submissions, set 所属项目 to 基建S by default; write concise `[步骤]`、`[结果]`、`[期望]` only; do not include `[环境]` or metadata such as 禅道产品ID、所属项目、project/product IDs in the bug description body; keep bug titles clean and do not append timestamps, random IDs, run IDs, or other test-run suffixes; only include key facts, keep steps to the minimum reproducible path, avoid long narrative; automatically upload/attach screenshot evidence whenever available so the user does not need to upload files manually.
- Never report a Zentao bug as submitted until the saved detail page/API response has been re-read and confirmed to contain non-empty `[步骤]`、`[结果]`、`[期望]` content. If the description is empty or missing any section, immediately repair it through API/edit flow and re-check; otherwise report submission as failed/incomplete, not done.
- For future Zentao bug titles filed by Codex automation, use only the leading `【Codex自动化】` marker by default; do not add extra bracketed business scope tags such as `【S项目优化】` unless the user explicitly asks for that exact marker. Put business scope/context in the description, keywords, or report instead.
- Default Zentao bug browse URL: `http://13.158.151.116:8088/index.php?m=bug&f=browse&product=3&branch=all&browseType=all&param=0&orderBy=id_desc&recTotal=7&recPerPage=20`.
- Do not reinstall, restore, maintain, upgrade, troubleshoot, clean, or inspect OpenClaw unless the user explicitly asks to resume it.
- For frontend/browser automation against Chinese test sites, explicitly set Playwright `locale: "zh-CN"` and `Accept-Language: zh-CN,zh;q=0.9` (and `timezoneId: "Asia/Shanghai"` when using browser contexts). Do not file i18n/text defects from an English browser environment.
