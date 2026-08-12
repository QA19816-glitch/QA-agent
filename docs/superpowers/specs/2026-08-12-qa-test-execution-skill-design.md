# QA Test Execution Skill Design

## Goal

Add a Codex-native `qa-test-execution` skill that treats an existing test-case document as the execution source of truth, executes supported Web and API cases one by one, persists every result immediately, files verified failures to One2All, and publishes a Feishu execution report.

The skill must reuse the repository's existing QA skills and avoid introducing a proprietary test platform or another login surface.

## Scope

### Included

- Read test cases from Feishu wiki/docx, Markdown, and structured JSON.
- Normalize the preferred six-column case format without rewriting the source cases.
- Execute Web cases in the visible Codex in-app browser by default.
- Execute API cases using safe HTTP tooling without exposing credentials.
- Record `Pass`, `Fail`, `Blocked`, or `Skipped` for each case.
- Persist each result immediately and resume an interrupted run without repeating completed cases.
- Capture failure evidence: screenshot, actual result, console errors, and relevant network/request-response data when available.
- Deduplicate and submit confirmed failures through the existing `one2all` skill.
- Generate a Feishu execution report and grant the configured user full access when the API succeeds.

### Excluded

- Generating new test cases; route that work to `qa-test-case-design` first.
- Mobile-native execution unless a compatible mobile executor is installed later.
- Load, security, or destructive production testing without explicit scope and authorization.
- Installing UiPath, Katalon, TestRail, or another external platform.

## Chosen Architecture

Create an independent orchestration skill at `codex-skills/skills/qa-test-execution`.

This is preferred over expanding `qa-test-case-design` because design and execution have different state, safety, evidence, and side-effect requirements. It is preferred over expanding `qa-specialist-orchestrator` because that skill should remain a broad router rather than own durable execution state.

The new skill coordinates existing capabilities:

1. `qa-test-case-design` supplies execution-ready cases when input is incomplete.
2. `qa-web-ui-testing` and the visible in-app browser execute Web cases.
3. `qa-api-testing` executes API cases.
4. `one2all` deduplicates and submits confirmed failures.
5. `feishu-cloud-docs` publishes the final report.

## Input Contract

Required input is a test-case source plus the target environment. The parser accepts:

- Feishu wiki or docx URL, resolved through the workspace Feishu helper.
- Markdown tables using the preferred columns.
- Structured JSON matching the bundled schema.

Each normalized case contains:

```json
{
  "case_id": "LOGIN-001",
  "module": "Login",
  "name": "Valid account login",
  "preconditions": ["Test account exists"],
  "steps": ["Open login page", "Enter credentials", "Submit"],
  "expected": ["Home page is displayed"],
  "priority": "P0",
  "executor": "web"
}
```

Cases missing an executable target, required account, test data, or an observable expected result are marked `Blocked` with a concrete reason. The runner does not invent missing requirements.

## Execution Model

### Preflight

1. Resolve and parse the source document.
2. Validate case IDs and required fields.
3. Confirm environment reachability and preserve the existing authenticated browser session.
4. Classify cases as `web`, `api`, or `manual/unsupported`.
5. Create or resume a run using a stable fingerprint of source, environment, and case set.

### Per-case lifecycle

1. Mark the case `Running` and persist it.
2. Establish preconditions using safe, scoped actions.
3. Perform steps in source order using normal user interactions or API requests.
4. Compare observed results with every numbered expected result.
5. Persist `Pass`, `Fail`, `Blocked`, or `Skipped` immediately.
6. On `Fail`, collect evidence and verify reproducibility before defect submission.

The source case remains immutable. Execution annotations live in the run state and report.

### Status rules

- `Pass`: every expected result is observed.
- `Fail`: an expected result is contradicted by reproducible evidence.
- `Blocked`: execution cannot proceed because a prerequisite or supported executor is unavailable.
- `Skipped`: intentionally excluded by the requested scope, with a recorded reason.

## Durable State And Resume

Run state is stored under a configurable workspace artifact directory, defaulting to `.qa-runs/<run-id>/`:

```text
.qa-runs/<run-id>/
  manifest.json
  results.jsonl
  evidence/
  report.md
```

- `manifest.json` records source fingerprint, environment, scope, timestamps, and summary.
- `results.jsonl` is append-only so every completed transition survives interruption.
- `evidence/` contains sanitized screenshots and text evidence.
- Resume skips terminal cases unless the user explicitly requests rerun.
- A changed source fingerprint creates a new run; it never silently mixes revisions.

Generated run artifacts are ignored by Git by default.

## Browser And API Rules

- Web execution uses the visible Codex in-app browser so the user can observe it.
- Reuse the current authenticated session and avoid repeated login prompts.
- Browser locale is `zh-CN`, `Accept-Language` is Chinese, and timezone is `Asia/Shanghai`.
- Use semantic locators and normal user input; DOM mutation is not valid test evidence.
- State-changing API cases require a test environment and scoped test data.
- Secrets, cookies, authorization headers, and personal data are redacted from state, evidence, reports, and BUG descriptions.

## Failure And BUG Workflow

A failed case does not automatically become a BUG until the runner has:

1. Rechecked the expected result against the source case.
2. Captured a minimal reproducible path and actual result.
3. Reproduced once when repetition is safe.
4. Checked for an existing matching One2All BUG through the `one2all` workflow.

For a confirmed unique failure, the runner submits a concise One2All BUG using the persistent login path. Severity and priority are determined independently from observed impact and urgency. Destructive flows, ambiguous impact, or uncertain expected behavior require user confirmation before submission.

The saved BUG ID and URL are written back to the case result. A failed submission does not erase the test failure; it records `bug_submission: failed` with the reason.

## Feishu Report

The final report contains:

1. Document title and execution metadata.
2. Summary counts and pass rate.
3. Module-level results.
4. A result table with case ID, name, result, actual result, evidence, BUG, executor, and duration.
5. Blockers, skipped scope, and residual risks.
6. Final QA verdict: `Pass`, `Conditional Pass`, or `Fail`.

The report is created through the Feishu API helper. The default user OpenID is granted `full_access`. Success is reported only after document creation and permission API results are verified.

## Safety Boundaries

- Never run destructive, payment, production, bulk-delete, or permission-changing cases without explicit authorization.
- Do not submit a BUG for a `Blocked` case or an ambiguous requirement.
- Do not duplicate completed cases on resume.
- Do not claim a BUG or Feishu report exists until its persisted/API result is verified.
- Preserve user changes and existing sessions.

## Skill Package

```text
codex-skills/skills/qa-test-execution/
  SKILL.md
  agents/openai.yaml
  references/execution-rules.md
  references/report-schema.md
  assets/case-schema.json
  assets/report-template.md
  scripts/qa_run_state.py
  scripts/validate_execution.py
```

The package will be initialized with the native `skill-creator` tooling, validated structurally, exercised against fixture cases, then synchronized to `/Users/jiguang/.codex/skills/qa-test-execution` after approval.

## Acceptance Criteria

- A fixture containing Web, API, blocked, and skipped cases parses deterministically.
- Per-case results survive an interrupted process and resume without duplicates.
- Failure evidence is sanitized and linked to the corresponding case.
- BUG submission is delegated to `one2all` and the returned record is persisted.
- Report validation rejects missing case IDs, invalid statuses, count mismatches, and unsanitized credential fields.
- The installed native skill passes the repository's skill validation.
