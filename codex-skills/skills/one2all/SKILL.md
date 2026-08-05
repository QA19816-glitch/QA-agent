---
name: one2all
description: Submit, update, deduplicate, and verify BUGs in the One2/One2All quality-management platform with visible-browser evidence, requirement association, impact-based severity and priority, screenshots, and saved-detail verification. Use when the user asks to 提 BUG, 报 BUG, 提交缺陷, or file a defect without naming a platform; also use when One2, One2All, one2all, 当前平台, or the One2 quality-management URL is named. Do not use for requests that explicitly name Zentao/禅道.
---

# One2All Defect Workflow

File defects only in One2. Keep Zentao independent: never dual-write, fall back to Zentao, or change Zentao records.

## Platform

- Open `http://192.168.113.115:32633/one2all/workspace/quality-management`.
- Use the Codex right-side visible in-app browser and reuse its signed-in session.
- Before browser work, read and follow the native in-app Browser skill.
- Do not inspect or export cookies, tokens, local storage, or passwords.
- If the right-side session cannot be claimed or its upload control is blocked, use `codex-skills/skills/one2all/scripts/one2all-browser` as the visible fallback. It uses a dedicated local Profile and an exact One2All host allowlist; do not start an unscoped temporary browser.
- On the first fallback run, stop on the One2All login page and ask the user to sign in once in that visible window. Later runs must reuse the same Profile automatically.
- If login has expired, keep the page open and ask the user to sign in; do not submit a partially filled BUG.

## Required Inputs

Build the defect from the user's description, screenshots, recordings, logs, and verified reproduction. Require enough facts to determine:

- the affected function and minimum reproduction path;
- actual and expected results;
- a unique One2 requirement;
- severity and priority using real impact;
- evidence to attach when evidence exists.

Ask the user only when a required fact cannot be discovered safely. Never invent impact, requirement ownership, or reproduction facts.

## Field Rules

Read [references/field-rules.md](references/field-rules.md) before creating or editing a BUG.

Enforce these defaults:

- Add exactly one leading `【Codex自动化】` marker to the title.
- Set `found_environment` to the exact value `test` when the actual environment is not explicitly known. Preserve a known actual environment instead.
- Leave developer owner empty unless the user explicitly names one.
- Leave the deadline empty unless the user or requirement provides one.
- Judge severity and priority independently from evidence. Never keep the form defaults merely because they are preselected.
- If evidence cannot support the level, ask before submission. Do not silently use `一般 / 中`.
- Automatically associate the requirement only when project scope and defect evidence produce one unique high-confidence match. Never choose from a generic keyword, list position, recent selection, or form default.
- If multiple plausible requirements remain, or the available facts cannot distinguish the project, version, module, or requirement, show the candidates and wait for the user's choice.
- Write concise `[步骤]`, `[实际结果]`, and `[期望结果]` sections, and keep the separate actual/expected fields consistent with them.

## Workflow

1. Confirm the target is One2. A generic request such as “提 BUG” defaults to One2; an explicit “禅道” request belongs only to the Zentao skill.
2. Reproduce or otherwise verify the issue when feasible, and capture evidence before filing.
3. Determine severity and priority from the impact matrix and record the supporting facts in working notes.
4. Search the One2 defect list by title keywords, affected function, trigger, actual result, and likely root cause.
5. Treat records as duplicates only when function, trigger, result, and root cause are substantially the same. Return the existing BUG number and do not create another record.
6. Resolve the exact requirement from the user's explicit scope plus the defect title, affected function, reproduction steps, actual result, expected result, and available evidence. Auto-select only one unique high-confidence candidate whose project scope and functional meaning agree with the defect. If candidates are ambiguous, cross-project, weakly supported, or tied, show them and wait for the user's choice. Never select the first, newest, default, or merely keyword-similar requirement.
7. Open the One2 form, select the requirement first, then upload screenshots or recordings. Do not submit without available evidence when upload fails; retry once, then stop and report the failure.
8. Fill every applicable field. Before submitting, re-check the title marker, displayed project set/project/requirement path, `found_environment`, severity, priority, steps, actual result, expected result, and evidence count.
9. Submit once. If the result is uncertain, search by title and creation time before attempting any retry.
10. Re-read the saved list row and detail page. Confirm the BUG number, title, requirement, severity, priority, environment, non-empty reproduction sections, separate actual/expected fields, and material count.
11. Preview each saved image or video. For images, verify a successful resource load plus non-zero natural and visible dimensions.
12. Report success only after every required saved field and attachment check passes. Keep the verified detail page open for the user.

## Browser Session Recovery

Use the fallback only after the right-side browser is unavailable or cannot complete a required interaction:

```sh
codex-skills/skills/one2all/scripts/one2all-browser
```

The wrapper stores the browser Profile in `~/.agent-browser/profiles/one2all` by default. Set `ONE2ALL_BROWSER_PROFILE_DIR` only when a different private local directory is explicitly required. Never copy the Profile into Git or convert it to an exported auth-state file.

## Failure Handling

- If a saved field is missing, or the saved requirement differs from the verified pre-submit selection, use the One2 edit UI to repair it and re-read the detail page.
- If the edit or create UI reports failure, do not claim success and do not switch to Zentao.
- If a duplicate is accidentally created, remove only the new duplicate after confirming its exact BUG number, then verify the retained record.
- Never delete or close an existing non-test BUG without explicit user authorization.

## Observed API Contract

Use the UI for the first implementation; treat these paths only as field-contract evidence:

- `POST /quality/bugs`
- `PATCH /quality/bugs/{id}`
- `POST /quality/bugs/materials/upload` with `file` and `requirement_id`

Do not build or expose a separate authentication flow. Use the visible browser session.
