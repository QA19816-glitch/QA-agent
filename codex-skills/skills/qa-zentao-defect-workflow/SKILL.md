---
name: qa-zentao-defect-workflow
description: Prepare, submit, update, and verify bugs/defects specifically in Zentao/禅道 with clean titles, concise steps, actual results, expected results, severity, priority, attachments, screenshots, and focused Chinese bug descriptions. Use only when the user explicitly names Zentao/禅道 or supplies a Zentao URL, or when updating, triaging, retesting, or attaching evidence to an identified Zentao defect. Generic requests such as 提 BUG or 报 BUG default to One2 and must not trigger this skill.
---

# QA Zentao Defect Workflow

Use this skill only for explicitly identified Zentao work, such as “提交到禅道”, “复测禅道 BUG”, or a Zentao defect URL. Generic “提 BUG” requests belong to `one2all`. Never dual-write or fall back between the two platforms.

## Defaults

- Default Zentao project: `基建S`.
- Use concise Chinese wording.
- Write concise `[步骤]`、`[结果]`、`[期望]` only in the bug description body.
- Do not include `[环境]` or metadata such as 禅道产品ID、所属项目、project/product IDs in the bug description body.
- Keep bug titles clean; do not append timestamps, random IDs, run IDs, or other test-run suffixes.
- Embed screenshot evidence directly into the `[步骤]` rich-text body as visible inline images whenever available. For Zentao, do not use base64/data URI images because the editor may strip them; first save the screenshot as the bug's formal `files[]` attachment or through the Zen editor upload flow, then embed the resulting `/index.php?m=file&f=read&t=<ext>&fileID=<id>` URL in `[步骤]`. Show the section title `证据截图` and the image only; do not add a separate visible filename/caption line such as `证据截图：xxx.png`. Verify actual browser rendering before reporting success: the inline image must have non-zero `naturalWidth`/`naturalHeight`, visible layout size, and a saved Bug-detail screenshot showing the preview. Use downloadable-only attachments only when the user explicitly asks for attachments or inline image persistence fails after repair.
- Do not claim submission, attachment, or inline image display succeeded unless the tool/API/browser action actually succeeded and the saved image resource returns `200 image/*`.
- Never claim a Zentao bug is submitted until the saved detail page or API response has been re-read and confirmed to contain non-empty `[步骤]`、`[结果]`、`[期望]` content. If any section is empty or missing, immediately repair the `steps` field through API/edit flow and re-check; otherwise report the submission as failed/incomplete.

## Defect Quality Bar

Every bug should include:

- 标题: short, user-impact oriented.
- 所属项目: 基建S unless user says otherwise.
- `[步骤]`: numbered, deterministic, no irrelevant narration.
- `[结果]`: what happened, including only useful error text/status.
- `[期望]`: what should happen.
- 影响范围/严重程度: business impact, frequency, workaround.
- 证据: screenshots should be visible inline in the `[步骤]` body by default; use recordings, logs, request/response, and console/network evidence when useful.

## Workflow

1. Reproduce or verify the issue when possible.
2. Capture evidence before filing.
3. Deduplicate against existing bugs if the task asks for triage or if duplicate risk is obvious.
4. Submit or update using the project-local Zentao helper scripts when available.
5. Verify submission result, non-empty `[步骤]` / `[结果]` / `[期望]` description content, visible inline evidence, embedded image resource response, and actual browser rendering (`naturalWidth`/`naturalHeight` plus screenshot) before reporting success.

## Local Helpers

In this workspace, prefer project-local scripts under `tools/` when they match the task, such as:

- `zentao_submit_bug.mjs`
- `zentao_list_bugs.mjs`
- `zentao_view_bugs.mjs`
- `zentao_attach_bug40_evidence.mjs`
- `zentao_http_attach_bug40_evidence.mjs`

Read the target script before use if arguments are unclear.
