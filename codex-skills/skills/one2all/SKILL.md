---
name: one2all
description: Submit, update, deduplicate, and verify BUGs in the One2/One2All quality-management platform with a fast persistent-login path or a full evidence workflow. Use when the user asks to 提 BUG, 报 BUG, 提交缺陷, 快速提 BUG, 随机提一个, or file a defect without naming a platform; also use when One2, One2All, one2all, 当前平台, or the One2 quality-management URL is named. Do not use for requests that explicitly name Zentao/禅道.
---

# One2All Defect Workflow

File defects only in One2All. Never dual-write or fall back to Zentao.

## Start Here

Read [references/field-rules.md](references/field-rules.md) before creating or editing a BUG.

API submission requires local runtime authentication. Configure one of these without committing the value:

```sh
export ONE2ALL_API_TOKEN='<local-token>'
# or: export ONE2ALL_API_AUTH_HEADER='Authorization: Bearer <local-token>'
scripts/one2all-setup --check
```

On macOS, the preferred one-time setup is `scripts/one2all-setup --api-token-stdin`. It stores the token in Keychain service `codex-one2all-api-token`; later submissions load it automatically without printing or writing it into the project.

Use `scripts/one2all-setup --username <username>` only to configure the explicit browser fallback; for non-interactive fallback setup, pass the password through stdin with `--password-stdin`. Never put credentials in this skill folder. See [references/api-config.example.env](references/api-config.example.env) for non-secret endpoint settings. `ONE2ALL_BASE_URL`, `ONE2ALL_AUTH_PROFILE`, and `ONE2ALL_BROWSER_PROFILE_DIR` are optional per-user overrides. The production browser path has no app prefix; set `ONE2ALL_BROWSER_APP_PREFIX=/one2all` only for the legacy internal deployment. Do not hardcode secrets into a shared copy.

The shared MCP endpoint and generic configuration are in [references/mcp-config.toml](references/mcp-config.toml). Run `scripts/one2all-setup --install-mcp` for optional OAuth setup. The one-shot submitter defaults to direct HTTP API transport. Configure `ONE2ALL_API_TOKEN` or `ONE2ALL_API_AUTH_HEADER` in the local runtime; never write either secret into this skill. Set `ONE2ALL_TRANSPORT=browser` only for diagnostics or an explicit fallback. In a new Codex task, prefer the MCP only when its exposed tools cover duplicate search, BUG creation, saved-detail verification, and any requested screenshot upload/inline embedding. Otherwise use the one-shot API submitter immediately; never delay a BUG submission to troubleshoot MCP.

For BUG creation, use the one-shot submitter (API by default):

```sh
scripts/one2all-submit /private/tmp/one2all-bug.json
```

The JSON input must contain `title`, `severity_key`, `priority_key`, `steps`, `actual_result`, and `expected_result`. `requirement_path` defaults to the verified `S基建 / 未分类 / 未分类Bug` mapping (`requirement_id=109`), `found_environment` defaults to exact value `test`, and `screenshot_path` is optional. The API submitter normalizes the title marker, performs one focused duplicate check, resolves a unique requirement (or accepts `requirement_id`), creates once, uploads a screenshot when supplied, then verifies persistence through the detail and exact-title list APIs in parallel.

API settings contain no credentials: `ONE2ALL_BASE_URL`, `ONE2ALL_API_CREATE_PATH`, `ONE2ALL_API_LIST_PATH`, `ONE2ALL_API_DETAIL_PATH`, and `ONE2ALL_API_UPLOAD_PATH` override paths when a deployment differs. For direct HTTP outside the browser session, provide `ONE2ALL_API_TOKEN` or `ONE2ALL_API_AUTH_HEADER`; do not write either value to this skill. If the API requires an explicit requirement ID, pass `requirement_id` in the BUG JSON or set `ONE2ALL_API_REQUIREMENT_ID`. `--dry-run` performs duplicate and requirement checks and prints the exact API payload without creating a BUG.

Use [references/bug-spec.example.json](references/bug-spec.example.json) as the input contract example. Use `--dry-run` to exercise duplicate search, requirement resolution, payload construction, and pre-submit validation without uploading evidence or creating a BUG.

The browser state and private Profile are retained only for diagnostics and the explicit browser fallback. Each user saves their own credentials locally; the skill never contains usernames or passwords. Set `ONE2ALL_AUTH_PROFILE` only when a user deliberately chooses another local vault name. Run the entire submission in one outer command. Do not implement normal submissions as a sequence of separate `one2all-browser` calls; that wrapper is for diagnostics and recovery only. Do not first attempt write interactions through the Codex right-side micro-app; its embedded dialog clicks are known to be unreliable. Use the right-side browser when the user explicitly asks to watch there or for read-only inspection.

The allowlist contains only the One2All host plus `open.feishu.cn` and `accounts.feishu.cn`. Never inspect or export passwords, cookies, tokens, local storage, or auth-state files. These session-recovery rules apply only to the explicit browser fallback: if login has expired, let the fallback use the saved auth-vault entry in the same session. Ask the user to log in only when the saved login fails. Do not refresh, close, rebuild, or switch browser sessions while a valid session exists.

## Choose a Mode

### Fast Mode

Use fast mode when the user says `只要提成功`, `随机提一个`, `随便提一个`, `不要复杂`, or `快速提交`, or when the user provides complete defect facts and does not request a full evidence package.

Hard speed rule: when complete defect facts are already available, do not open a browser, rediscover endpoints, troubleshoot MCP, run a dry-run, or manually repeat API probes. Build the JSON and invoke `one2all-submit` exactly once. Success means its JSON contains both `ok:true` and `persisted:true`.

1. Build one JSON spec and invoke `one2all-submit` once. The default path performs duplicate check, create, optional material upload, and saved-detail readback through the API; do not manually replay the form step by step.
2. Use the user's defect. For a random request, use an already verified, not-yet-submitted real issue. If none is available, immediately ask for title, steps, actual result, and expected result; do not spend minutes exploring or invent a defect.
3. Run one focused duplicate check using the title or distinctive actual result. Do not perform broad historical research.
4. Resolve one supported requirement. The local verified default is `S基建 / 未分类 / 未分类Bug` with `requirement_id=109`; preserve an explicitly supplied requirement instead.
5. Determine severity and priority independently from actual impact. Fast mode does not authorize copying form defaults.
6. Fill required fields. Skip screenshots only when deterministic text or numeric evidence is sufficient and the user did not request an attachment. When an image is attached, upload it after selecting the requirement and embed it inline in the reproduction steps under `证据截图`; do not leave it as download-only material.
7. Enter real line breaks in steps and results; do not save visible `\n` literals.
8. Let the submitter submit once. It performs one delayed persistence check through detail and exact-title list APIs in parallel; never click or POST again automatically.
9. Require the submitter's verified JSON result. It confirms persistence, BUG number, title, requirement, severity, priority, environment, non-empty reproduction sections, and inline screenshot URL when present.
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

The explicit browser fallback persists login through agent-browser's named state `one2all`, the per-user `one2all` auth-vault entry, and the private first-start Profile in `~/.agent-browser/profiles/one2all`. Set `ONE2ALL_BROWSER_PROFILE_DIR` only when explicitly required. Never copy the Profile, credentials, or named state into Git or a shared skill package.

If the session is unavailable:

1. Run `one2all-submit --dry-run <spec>` once. This exercises API validation without creating a BUG; set `ONE2ALL_TRANSPORT=browser` only when diagnosing the API deployment.
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

The API client treats the paths above as the stable write contract. List/detail and requirement lookup paths are configurable because they were not part of the observed public contract. Requirement resolution fails closed when no unique `requirement_id` can be obtained; pass `requirement_id` directly when the deployment does not expose the configured lookup path.
