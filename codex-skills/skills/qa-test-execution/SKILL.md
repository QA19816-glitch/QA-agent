---
name: qa-test-execution
description: Design and execute an end-to-end QA workflow from requirements, PRDs, prototypes, API specifications, change notes, Feishu wiki/docx, Markdown, structured JSON, or existing test cases. Use when the user asks to 生成并执行测试用例、从需求开始测试、照着测试用例执行、跑冒烟/回归、记录结果、失败提 BUG、生成测试用例和执行报告, or wants one integrated requirement-to-case-to-One2All-to-Feishu workflow.
---

# QA Test Design And Execution

Act as the unified QA entry point. Preserve `qa-test-case-design` as the independent design specialist and invoke it when cases must be generated or repaired; never duplicate its design rules in this skill.

## Route The Input

Read [references/design-execution-handoff.md](references/design-execution-handoff.md), then classify input:

- `requirements`: PRD, requirement, story, prototype, API specification, technical note, change list, or defects without execution-ready cases.
- `cases`: stable IDs, explicit preconditions, numbered steps, observable expectations, and priorities already exist.
- `mixed`: requirements and cases both exist.

For Feishu wiki links, resolve the wiki token to its backing docx before reading. In this workspace prefer `/Users/jiguang/Documents/New project 8/tools/feishu_doc_ops.mjs`.

## Prepare Cases

### Requirements

1. Invoke `qa-test-case-design` to generate risk-prioritized, traceable, execution-ready cases.
2. Create its preferred Feishu-style case document and a structured handoff matching `assets/case-schema.json`.
3. Run the design skill's `scripts/validate_testcases.py` against the saved Markdown artifact.
4. Continue automatically into safe execution after validation.

### Existing cases

Validate and normalize them without rewriting valid IDs, steps, expectations, or priorities. Do not invoke case generation when the source is already execution-ready.

### Mixed input

Preserve valid stable IDs. Invoke `qa-test-case-design` only to repair conflicts or add missing coverage; never regenerate the whole suite unnecessarily.

## Classify Safety

Assign each case one `safety` value:

- `auto`: safe Web/API operation in an approved test environment.
- `approval_required`: destructive, production, payment/funds, permission-changing, or irreversible external effect.
- `blocked`: ambiguous expectation, missing environment/account/data, or unsupported executor.

Automatically execute `auto` cases. Pause only affected `approval_required` cases. Record `blocked` cases as `Blocked`; never infer their expected results.

## Start Or Resume

Initialize state with the structured handoff:

```bash
python3 scripts/qa_run_state.py init \
  --source cases.json \
  --environment test \
  --input-kind requirements \
  --requirement-source '<source URL or label>' \
  --requirement-fingerprint '<sha256>' \
  --case-document-url '<verified Feishu URL>' \
  --output-root .qa-runs
```

Omit optional requirement or document values for case-first input. A matching fingerprint resumes the existing run; changed cases create a new run. Use `pending --only-auto` to obtain the safe automatic queue.

## Execute

1. Read [references/execution-rules.md](references/execution-rules.md).
2. Run smoke/P0 cases first unless the user or source specifies another order.
3. Mark each case `Running`, execute source steps in order, then immediately append one terminal result: `Pass`, `Fail`, `Blocked`, or `Skipped`.
4. For Web, use `qa-web-ui-testing` and the visible in-app browser. Preserve authentication and use Chinese locale plus Shanghai timezone.
5. For API, use `qa-api-testing`; verify both transport and business effects and redact secrets.
6. Never simulate unsupported manual execution.

Resume skips terminal cases and reuses generated cases when requirement and case fingerprints match. A rerun uses `init --new-run`; never append a second terminal result to the same run.

## Confirm Failures And File BUGs

Before submitting a BUG, re-read the exact expected result, capture minimal reproducible evidence, reproduce once when safe, and delegate focused duplicate checking plus submission to `one2all`.

Use One2All's persistent session. Determine severity from impact and priority from urgency independently. Persist only verified BUG IDs and URLs. Do not create BUGs for design gaps, `Blocked`, or `Skipped` cases.

## Publish Feishu Deliverables

1. When cases were generated or materially repaired, create a separate Feishu test-case document using `qa-test-case-design` formatting.
2. Validate the run with `scripts/validate_execution.py <run-dir>`.
3. Read [references/report-schema.md](references/report-schema.md) and create the Feishu execution report.
4. Put the verified case-document URL in the report and add a report backlink to the case document when supported.
5. Grant configured OpenID `ou_f0136616b2e5fcdd98a977e75fb9e2d0` `full_access` to both documents.

Report document creation, linking, and permission results separately. Never claim any external write succeeded without verified API results.

## Safety And Integrity

- Never auto-run destructive, production, payment, bulk-delete, permission-changing, or irreversible cases.
- Never store passwords, tokens, cookies, authorization headers, or personal data in state or evidence.
- Preserve source cases; runtime annotations live only in `.qa-runs/<run-id>/` and Feishu reports.
- A failed BUG or Feishu write must not erase execution results and may be retried without rerunning terminal cases.
