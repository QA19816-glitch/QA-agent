---
name: qa-test-execution
description: Execute existing test cases one by one from Feishu wiki/docx, Markdown, or structured JSON; preserve Pass/Fail/Blocked/Skipped results; resume interrupted runs; capture Web/API evidence; submit confirmed defects to One2All; and publish Feishu execution reports. Use when the user asks to 照着测试用例执行测试、执行测试用例、跑冒烟/回归、记录测试结果、失败提 BUG、生成测试执行报告, or requests an end-to-end QA execution workflow.
---

# QA Test Execution

Treat the supplied test cases as the source of truth. Execute supported Web and API cases in order, persist each outcome immediately, and produce verified defects and a Feishu report without inventing requirements.

## Required Inputs

Obtain or infer:

- Test-case source: Feishu wiki/docx URL, Markdown, or structured JSON.
- Target environment and permitted scope.
- Required roles, accounts, and test data.

For a Feishu wiki link, resolve the wiki token to its backing docx before reading. In this workspace prefer `/Users/jiguang/Documents/New project 8/tools/feishu_doc_ops.mjs`.

If no executable cases exist, use `qa-test-case-design` first. Do not redesign valid cases during execution.

## Workflow

1. Parse cases into the schema in `assets/case-schema.json`. Keep source IDs, steps, expected results, and priority unchanged.
2. Read `references/execution-rules.md`, classify each case as `web`, `api`, or `manual`, and identify unsafe or missing prerequisites.
3. Initialize durable state:

   ```bash
   python3 scripts/qa_run_state.py init --source cases.json --environment test --output-root .qa-runs
   ```

   Reuse the returned run directory when its fingerprint matches. Use `pending` to obtain only unfinished cases.
4. Execute smoke/P0 cases first unless the source or user specifies another order.
5. Before each case, mark it `Running`. Immediately after observation, record exactly one terminal result: `Pass`, `Fail`, `Blocked`, or `Skipped`.
6. For a Web case, use `qa-web-ui-testing` and the visible Codex in-app browser by default. Preserve the authenticated session. Use Chinese locale and Shanghai timezone.
7. For an API case, use `qa-api-testing`. Verify both transport and business results; sanitize credentials and personal data.
8. For a manual or unsupported case, record `Blocked` with the missing executor or prerequisite. Never simulate a pass.
9. On failure, collect evidence and follow the failure gate below.
10. Validate the completed run, render `assets/report-template.md`, and create the report through `feishu-cloud-docs`.

Run commands from this skill directory or use absolute script paths. See `python3 scripts/qa_run_state.py --help` for all state operations.

## Result Rules

- `Pass`: every numbered expected result is observed.
- `Fail`: at least one expected result is contradicted by reproducible evidence.
- `Blocked`: execution cannot start or finish because a prerequisite or supported executor is unavailable.
- `Skipped`: the case is intentionally outside the requested run scope; always record the reason.

Do not use `Fail` for unclear requirements. Do not use `Pass` when evidence is incomplete.

## Failure Gate And One2All

Before submitting a BUG:

1. Re-read the source expected result.
2. Capture minimal steps, actual result, environment, and relevant screenshot/console/network/API evidence.
3. Reproduce once when repetition is safe.
4. Delegate focused duplicate checking and submission to `one2all`.

Use One2All's persistent named browser session. Determine severity from impact and priority from urgency independently. Destructive flows, uncertain expected behavior, or insufficient impact evidence require user confirmation before submission.

Persist the verified BUG ID and URL in the case result. A BUG submission failure does not change the test result from `Fail`.

## Resume And Integrity

- State is append-only under `.qa-runs/<run-id>/results.jsonl`.
- Resume skips cases whose latest result is terminal. A rerun uses `init --new-run`; never append a second terminal result to the same run.
- A changed source or environment creates a different fingerprint and run.
- Never edit the source case document to store runtime state.
- Never store tokens, cookies, authorization headers, passwords, or personal data in evidence.
- Run `scripts/validate_execution.py <run-dir>` before reporting completion.

## Report

Read `references/report-schema.md` before producing the final report. Create a Feishu document by default, grant `full_access` to configured OpenID `ou_f0136616b2e5fcdd98a977e75fb9e2d0`, and verify both API results. Return the document URL and permission result only after they succeed.

The final verdict is:

- `Pass`: all executed cases pass and there are no blockers.
- `Conditional Pass`: no release-blocking failure remains, but blockers, skipped risk, or accepted failures exist.
- `Fail`: a release-blocking or unresolved material failure remains.

## Safety

- Never execute destructive, production, payment, bulk-delete, or permission-changing cases without explicit authorization.
- Do not file defects for `Blocked` or `Skipped` cases.
- Do not repeat completed side-effecting cases during resume.
- Do not claim a BUG, report, attachment, or permission succeeded without re-reading the saved/API result.
