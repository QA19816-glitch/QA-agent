---
name: qa-zentao-defect-workflow
description: Prepare, submit, update, and verify bugs/defects in Zentao/禅道 with clear reproduction steps, actual results, expected results, severity, priority, environment, attachments, screenshots, and concise Chinese bug descriptions. Use when the user asks to 提 bug, 提BUG, 报bug, 提缺陷, 提交缺陷, file bugs, submit Zentao defects, triage defects, retest bugs, or attach evidence.
---

# QA Zentao Defect Workflow

Use this skill for defect documentation and Zentao work. Trigger it for casual requests such as "提 bug", "提BUG", "报个 bug", "提交到禅道", "提缺陷", or "复测缺陷".

## Defaults

- Default Zentao project: `基建S`.
- Use concise Chinese wording.
- Write numbered `重现步骤`、`实际结果`、`预期结果`.
- Attach screenshot or video evidence automatically whenever available.
- Do not claim submission or attachment succeeded unless the tool/API/browser action actually succeeded.

## Defect Quality Bar

Every bug should include:

- 标题: ≤25 字，格式 `【Claude Code】现象 + 触发条件`；`【】` 内默认固定写 `Claude Code`，不要改成其他来源名。
- 所属项目: 基建S unless user says otherwise.
- 环境: URL/app version, browser/device, account/role, build, time.
- 重现步骤: numbered, deterministic, no irrelevant narration.
- 实际结果: what happened, including error text/status.
- 预期结果: what should happen.
- 影响范围/严重程度: business impact, frequency, workaround.
- 附件: screenshot, recording, logs, request/response, console/network evidence when useful.

## Workflow

1. Reproduce or verify the issue when possible.
2. Capture evidence before filing.
3. Deduplicate against existing bugs if the task asks for triage or if duplicate risk is obvious.
4. Submit or update using the project-local Zentao helper scripts when available.
5. Verify submission result and attachment result before reporting success.

## Local Helpers

In this workspace, prefer project-local scripts under `tools/` when they match the task, such as:

- `zentao_submit_bug.mjs`
- `zentao_list_bugs.mjs`
- `zentao_view_bugs.mjs`
- `zentao_attach_bug40_evidence.mjs`
- `zentao_http_attach_bug40_evidence.mjs`

Read the target script before use if arguments are unclear.
