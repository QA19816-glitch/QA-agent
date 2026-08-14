---
name: one2all
description: Submit, update, deduplicate, and verify BUGs in the One2/One2All quality-management platform with a fast persistent-login path or a full evidence workflow. Use when the user asks to 提 BUG, 报 BUG, 提交缺陷, 快速提 BUG, 随机提一个, or file a defect without naming a platform; also use when One2, One2All, one2all, 当前平台, or the One2 quality-management URL is named. Do not use for requests that explicitly name Zentao/禅道.
---

# One2All Defect Workflow

File defects only in One2All. Never dual-write or fall back to Zentao.

## Start Here

Read [references/field-rules.md](references/field-rules.md) before creating or editing a BUG.

On first use after installation, save that user's own One2All credentials locally:

```sh
scripts/one2all-setup --username <username>
```

For non-interactive setup, pass the password through stdin with `--password-stdin`. Run `scripts/one2all-setup --check` to verify dependencies and the local auth-vault entry. Never put credentials in this skill folder. `ONE2ALL_BASE_URL`, `ONE2ALL_AUTH_PROFILE`, and `ONE2ALL_BROWSER_PROFILE_DIR` are optional per-user overrides; do not hardcode them into a shared copy.

The shared MCP endpoint and generic configuration are in [references/mcp-config.toml](references/mcp-config.toml). Run `scripts/one2all-setup --install-mcp` for optional OAuth setup. In a new Codex task, prefer the MCP only when its exposed tools cover duplicate search, BUG creation, saved-detail verification, and any requested screenshot upload/inline embedding. Otherwise use the one-shot browser submitter immediately; never delay a BUG submission to troubleshoot MCP.

For BUG creation, use the one-shot submitter:

```sh
scripts/one2all-submit /private/tmp/one2all-bug.json
```

The JSON input must contain `title`, `requirement_path` (project set, project, requirement), `severity_key`, `priority_key`, `steps`, `actual_result`, and `expected_result`. `found_environment` defaults to exact value `test`; `screenshot_path` is optional. The submitter normalizes the title marker, performs one focused duplicate check, opens the form from the initialized quality-management list, selects the requirement with stable DOM selectors, uploads and embeds a screenshot when supplied, submits once, and verifies the saved detail.

Use [references/bug-spec.example.json](references/bug-spec.example.json) as the input contract example. Use `--dry-run` to exercise duplicate search, form initialization, requirement selection, field entry, severity selection, and pre-submit validation without uploading evidence or creating a BUG.

The submitter reuses the named `one2all` browser state, the private Profile, and a per-user auth-vault entry named `one2all`. Each user saves their own credentials locally; the skill never contains usernames or passwords. Set `ONE2ALL_AUTH_PROFILE` only when a user deliberately chooses another local vault name. Run the entire submission in one outer command. Do not implement normal submissions as a sequence of separate `one2all-browser` calls; that wrapper is for diagnostics and recovery only. Do not first attempt write interactions through the Codex right-side micro-app; its embedded dialog clicks are known to be unreliable. Use the right-side browser when the user explicitly asks to watch there or for read-only inspection.

The allowlist contains only the One2All host plus `open.feishu.cn` and `accounts.feishu.cn`. Never inspect or export passwords, cookies, tokens, local storage, or auth-state files. If login has expired, let the submitter use the saved auth-vault entry in the same session. Ask the user to log in only when the saved login fails. Do not refresh, close, rebuild, or switch browser sessions while a valid session exists.

## Choose a Mode

### Fast Mode

Use fast mode when the user says `只要提成功`, `随机提一个`, `随便提一个`, `不要复杂`, or `快速提交`, or when the user provides complete defect facts and does not request a full evidence package.

1. Build one JSON spec and invoke `one2all-submit` once. Do not manually replay the form step by step.
2. Use the user's defect. For a random request, verify one real issue on the scoped page; never invent a defect.
3. Run one focused duplicate check using the title or distinctive actual result. Do not perform broad historical research.
4. Resolve one supported requirement. For One2All/PM quality-management defects only, use the verified self-test mapping `test > test > PMMCP`. Never reuse it for unrelated business defects.
5. Determine severity and priority independently from actual impact. Fast mode does not authorize copying form defaults.
6. Fill required fields. Skip screenshots only when deterministic text or numeric evidence is sufficient and the user did not request an attachment. When an image is attached, upload it after selecting the requirement and embed it inline in the reproduction steps under `证据截图`; do not leave it as download-only material.
7. Enter real line breaks in steps and results; do not save visible `\n` literals.
8. Let the submitter submit once. If the result is uncertain, it searches by exact title instead of clicking again.
9. Require the submitter's verified JSON result. It confirms BUG number, title, requirement, severity, available priority control, environment, non-empty reproduction sections, and inline screenshot dimensions.
10. Return the verified BUG number and detail URL from that JSON result.

### Full Mode

Use full mode for release blockers, high-risk defects, formal acceptance, requested screenshots or evidence, ambiguous requirement ownership, or likely duplicates.

1. Reproduce the issue and capture available evidence.
2. Determine severity and priority from impact facts.
3. Search by function, trigger, actual result, and likely root cause. Treat records as duplicates only when all materially match.
4. Resolve one unique high-confidence requirement. If candidates remain ambiguous, show them and wait for the user's choice.
5. Select the requirement before uploading evidence.
6. Fill all applicable fields and re-check title, requirement path, environment, severity, priority, steps, actual, expected, and material count.
7. Submit once and re-read the saved list row and detail page.
8. Preview saved materials. For images, verify successful loading and non-zero natural and visible dimensions in the reproduction steps; download-only materials are incomplete unless the user explicitly asks for attachments only.
9. Report success only after required saved fields and attachments pass verification.

## Field Defaults

- Add exactly one leading `【Codex自动化】` marker.
- `发现环境` is a hard rule: when the user has not supplied a real environment, always fill the exact value `test`; never leave it blank, copy a stale/form default, or ask the user to clarify an unspecified environment. If the user explicitly supplies another actual environment, preserve that value.
- Leave owner and deadline empty unless explicitly provided.
- Judge severity and priority independently; ask only when impact facts cannot be established.
- Keep separate reproduction, actual-result, and expected-result fields consistent.
- Do not select a requirement from list position, recent selection, generic keywords, or form defaults.
- Before reporting a successful submission, re-read the saved BUG and verify `发现环境` is exactly `test` unless the user explicitly supplied a different environment.

## Session Recovery

The submitter persists login through agent-browser's named state `one2all`, the per-user `one2all` auth-vault entry, and the private first-start Profile in `~/.agent-browser/profiles/one2all`. Set `ONE2ALL_BROWSER_PROFILE_DIR` only when explicitly required. Never copy the Profile, credentials, or named state into Git or a shared skill package.

If the session is unavailable:

1. Run `one2all-submit --dry-run <spec>` once.
2. If the login page appears, allow the saved auth-vault login to run in the same session.
3. Ask the user for manual login only if saved authentication fails.
4. Reuse the same `one2all` session and do not launch an unscoped temporary browser.

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
