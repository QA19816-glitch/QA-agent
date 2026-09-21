---
name: one2all
description: Submit, deduplicate, and verify BUGs in the One2/One2All quality-management platform through the fast direct API workflow. Use when the user asks to 提 BUG, 报 BUG, 提交缺陷, 快速提 BUG, 随机提一个, or names One2, One2All, one2all, 当前平台, or the One2 quality-management URL. Do not use for requests that explicitly name Zentao/禅道.
---

# One2All Fast API Defect Workflow

File defects only in One2All. This skill is API-only: do not open the browser, troubleshoot MCP, rediscover endpoints, or replay form interactions.

## One-Time Setup

Read [references/field-rules.md](references/field-rules.md) before creating a BUG.

On macOS, save each user's own API token in Keychain:

```sh
scripts/one2all-setup --api-token-stdin
scripts/one2all-setup --check
```

The Keychain service is `codex-one2all-api-token`. The token is never printed, committed, or written into the skill directory. An installation may instead provide `ONE2ALL_API_TOKEN` or `ONE2ALL_API_AUTH_HEADER` in its private runtime.

## Submit

Build one JSON specification and run exactly one command:

```sh
scripts/one2all-submit /private/tmp/one2all-bug.json
```

Required fields:

- `title`
- `severity_key`: `p0`, `p1`, `p2`, or `p3`
- `priority_key`: `urgent`, `high`, `medium`, or `low`
- `steps`
- `actual_result`
- `expected_result`

Defaults:

- requirement: `S基建 / 未分类 / 未分类Bug`
- `requirement_id`: `109`
- `found_environment`: exact value `test`
- workspace: `2`

Preserve an explicitly supplied requirement, requirement ID, environment, owner, deadline, operating system, or browser.

The submitter performs one exact-title duplicate check, creates once, waits briefly, then verifies the saved detail and exact-title list in parallel. Report success only when its JSON contains both `ok:true` and `persisted:true`.

## Speed Rules

1. When complete defect facts are available, immediately build the JSON and invoke `one2all-submit` once.
2. Do not run a dry-run before a normal submission.
3. Do not open a browser, inspect login state, call MCP, probe endpoints manually, or repeat verification outside the submitter.
4. Do not submit twice. A persistence failure is an error requiring investigation, not permission to retry automatically.
5. For `随机提一个` or `随便提一个`, use an already verified, not-yet-submitted real issue. If none exists, immediately ask for title, steps, actual result, and expected result; never invent a BUG or spend minutes exploring.
6. Enter real line breaks in reproduction text. Never save visible `\n` literals.
7. Return the BUG number, detail URL, total duration, creation duration, verification duration, and persistence status from the command JSON.

## Evidence Mode

When `screenshot_path` is supplied, the API uploads the image after resolving the requirement, adds the returned material URL to the BUG, and embeds it under `证据截图` in the reproduction text. Do not continue without required evidence if upload fails.

## Configuration

See [references/api-config.example.env](references/api-config.example.env) for non-secret overrides. Never place real tokens, authorization headers, passwords, cookies, usernames, Keychain exports, or browser state in this directory.

Use [references/bug-spec.example.json](references/bug-spec.example.json) as the input contract example. `--dry-run` is for installation diagnostics only; it performs duplicate checking and prints the payload without creating a BUG.

## Failure Rules

- Exact duplicate found: stop and return the existing-match error.
- Requirement is not uniquely supported and no verified mapping applies: ask the user to choose.
- Create response has no BUG ID: stop; do not retry automatically.
- Detail or exact-title list does not contain the created BUG after the persistence delay: return failure; do not POST again.
- Saved requirement, environment, severity, priority, title, or reproduction sections mismatch: report incomplete rather than claiming success.
- Never delete, close, or modify an existing non-test BUG without explicit authorization.
