---
name: one2all
description: Submit, update, deduplicate, and verify BUGs in the One2/One2All quality-management platform with a fast persistent-login path or a full evidence workflow. Use when the user asks to 提 BUG, 报 BUG, 提交缺陷, 快速提 BUG, 随机提一个, or file a defect without naming a platform; also use when One2, One2All, one2all, 当前平台, or the One2 quality-management URL is named. Do not use for requests that explicitly name Zentao/禅道.
---

# One2All Defect Workflow

File defects only in One2All. Never dual-write or fall back to Zentao.

## Start Here

Read [references/field-rules.md](references/field-rules.md) before creating or editing a BUG.

For BUG creation, use the dedicated visible session first:

```sh
codex-skills/skills/one2all/scripts/one2all-browser
```

The wrapper reuses the named `one2all` browser state, keeps its private Profile as the first-start fallback, and opens the new-BUG page directly. Do not first attempt write interactions through the Codex right-side micro-app; its embedded dialog clicks are known to be unreliable. Use the right-side browser when the user explicitly asks to watch there or for read-only inspection.

The allowlist contains only the One2All host plus `open.feishu.cn` and `accounts.feishu.cn`, which are required for the configured OAuth login. Never inspect or export passwords, cookies, tokens, local storage, or auth-state files. If login has expired, keep the dedicated visible window open, ask the user to log in or authorize Feishu once, and continue in the same session. Do not refresh, close, rebuild, or switch browser sessions while a valid session exists.

## Choose a Mode

### Fast Mode

Use fast mode when the user says `只要提成功`, `随机提一个`, `随便提一个`, `不要复杂`, or `快速提交`, or when the user provides complete defect facts and does not request a full evidence package.

1. Reuse the dedicated session and open `/one2all/workspace/quality-management/bugs/new` directly.
2. Use the user's defect. For a random request, verify one real issue on the scoped page; never invent a defect.
3. Run one focused duplicate check using the title or distinctive actual result. Do not perform broad historical research.
4. Resolve one supported requirement. For One2All/PM quality-management defects only, use the verified self-test mapping `test > test > PMMCP`. Never reuse it for unrelated business defects.
5. Determine severity and priority independently from actual impact. Fast mode does not authorize copying form defaults.
6. Fill required fields. Skip screenshots only when deterministic text or numeric evidence is sufficient and the user did not request an attachment.
7. Enter real line breaks in steps and results; do not save visible `\n` literals.
8. Submit once. If the result is uncertain, search by title and creation time instead of clicking again.
9. Re-read the saved list row and detail page. Confirm BUG number, title, requirement, severity, priority, environment, and non-empty reproduction, actual, and expected results.
10. Return the verified BUG number and detail URL.

### Full Mode

Use full mode for release blockers, high-risk defects, formal acceptance, requested screenshots or evidence, ambiguous requirement ownership, or likely duplicates.

1. Reproduce the issue and capture available evidence.
2. Determine severity and priority from impact facts.
3. Search by function, trigger, actual result, and likely root cause. Treat records as duplicates only when all materially match.
4. Resolve one unique high-confidence requirement. If candidates remain ambiguous, show them and wait for the user's choice.
5. Select the requirement before uploading evidence.
6. Fill all applicable fields and re-check title, requirement path, environment, severity, priority, steps, actual, expected, and material count.
7. Submit once and re-read the saved list row and detail page.
8. Preview saved materials. For images, verify successful loading and non-zero natural and visible dimensions.
9. Report success only after required saved fields and attachments pass verification.

## Field Defaults

- Add exactly one leading `【Codex自动化】` marker.
- Use the actual environment when known; otherwise use exact value `test`.
- Leave owner and deadline empty unless explicitly provided.
- Judge severity and priority independently; ask only when impact facts cannot be established.
- Keep separate reproduction, actual-result, and expected-result fields consistent.
- Do not select a requirement from list position, recent selection, generic keywords, or form defaults.

## Session Recovery

The wrapper persists login through agent-browser's named state `one2all` and stores the private first-start Profile in `~/.agent-browser/profiles/one2all`. Set `ONE2ALL_BROWSER_PROFILE_DIR` only when explicitly required. Never copy the Profile or named state into Git.

If the session is unavailable:

1. Run the wrapper once and inspect the visible page.
2. If it opens the login page, ask the user to complete login or Feishu authorization once.
3. Reuse the same `one2all` session after authorization.
4. Do not launch an unscoped temporary browser.

## Failure Rules

- If submission status is uncertain, search before retrying.
- If a saved field or requirement is wrong, repair it through the edit UI and re-read detail.
- If upload fails in full mode, retry once and stop rather than submitting without required evidence.
- If the Profile appears damaged, do not delete it automatically.
- Never delete or close an existing non-test BUG without explicit user authorization.

## API Contract Evidence

Use the UI; treat these paths only as field-contract evidence:

- `POST /quality/bugs`
- `PATCH /quality/bugs/{id}`
- `POST /quality/bugs/materials/upload` with `file` and `requirement_id`
