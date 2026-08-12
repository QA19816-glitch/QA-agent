# QA Test Design And Execution Integration Design

## Goal

Upgrade `qa-test-execution` into the unified QA entry point for both requirements and existing test cases while preserving `qa-test-case-design` as an independently invocable skill.

The end-to-end path is:

```text
Requirement or existing test cases
  -> classify input
  -> design and validate cases when needed
  -> normalize execution manifest
  -> execute safe Web/API cases
  -> persist results and evidence
  -> file confirmed One2All BUGs
  -> publish linked Feishu case and execution documents
```

## Decisions

- Keep `qa-test-case-design` installed and independently callable.
- Make `qa-test-execution` the unified orchestration entry point.
- Reuse `qa-test-case-design`; do not copy its design rules, prompts, templates, or validator into the execution skill.
- Automatically continue from generated cases into safe execution.
- Pause only for destructive, production, payment, permission-changing, or requirement-ambiguous cases.
- Keep the test-case document and execution report as separate Feishu documents with reciprocal links when both writes succeed.

## Input Routing

### Existing test-case input

Treat input as executable cases when it contains stable case IDs, explicit preconditions, numbered steps, observable expected results, and priority. Accepted sources remain Feishu wiki/docx, Markdown, and structured JSON.

Run the case quality gate before execution. Invalid or incomplete cases route to `qa-test-case-design` for repair only when the requirement source is available. Otherwise mark the affected cases `Blocked` with exact gaps.

### Requirement input

Treat PRDs, requirements, user stories, prototypes, API specifications, technical notes, change lists, and historical defects without executable cases as design input.

Invoke `qa-test-case-design` to:

1. Separate facts, conflicts, assumptions, and gaps.
2. Create risk-prioritized, traceable, execution-ready cases.
3. Produce the preferred Feishu-style six-column case document.
4. Produce a structured execution manifest conforming to `qa-test-execution/assets/case-schema.json`.
5. Validate the saved cases before handing them to execution.

### Mixed input

When requirements and cases are both supplied, use the requirements to validate coverage and resolve traceability. Preserve valid case IDs. Add or repair only missing, conflicting, or non-executable coverage instead of regenerating the entire suite.

## Orchestration Architecture

`qa-test-execution` owns routing and durable workflow state. It delegates domain work:

- `qa-test-case-design`: case generation, repair, risk prioritization, traceability, and case-document formatting.
- `qa-web-ui-testing` plus the visible in-app browser: Web execution and browser evidence.
- `qa-api-testing`: API execution and request/response evidence.
- `one2all`: focused duplicate checking, defect submission, and saved-record verification.
- `feishu-cloud-docs`: case document and execution report creation and permission verification.

The execution skill must not fork or embed these skills' detailed methods. It defines their handoff contracts and verifies their outputs.

## Design-To-Execution Handoff

The handoff contains:

```json
{
  "requirement_source": "Feishu wiki URL or source label",
  "requirement_fingerprint": "sha256",
  "case_document_url": "https://...",
  "case_source_fingerprint": "sha256",
  "version": "generated revision",
  "cases": []
}
```

Every case must satisfy the existing execution schema and include a stable `case_id`, name, steps, expected results, priority, and executor. Trace labels and module names remain optional execution fields but are required in the formal case document when the requirement supplies stable identifiers.

The handoff is rejected when case IDs are duplicated, steps or expectations are empty, expectations are not observable, priority is invalid, or executor classification is missing.

## Unified Workflow

### 1. Preflight

1. Resolve Feishu wiki nodes to backing docx documents before reading.
2. Identify input as `requirements`, `cases`, or `mixed`.
3. Record environment, scope, build/version, roles, test data, and safety constraints.
4. Preserve the existing authenticated browser session.

### 2. Case preparation

- For `cases`, validate and normalize without rewriting valid source content.
- For `requirements`, invoke `qa-test-case-design`, validate its Markdown case document, and create the structured handoff.
- For `mixed`, preserve valid cases and generate or repair only the gaps.

Create the Feishu test-case document before execution when cases were generated or materially repaired. Grant the configured user `full_access` and record the verified document URL and permission result.

### 3. Safety classification

Classify each case before execution:

- `auto`: safe Web/API operations in an approved test environment.
- `approval_required`: destructive actions, production execution, payment/funds effects, permission changes, or irreversible external side effects.
- `blocked`: ambiguous requirement, missing account/data/environment, or unsupported executor.

Automatically begin all `auto` cases after validation. Pause only the affected `approval_required` cases, not the entire run. Record ambiguous cases as `Blocked` until clarified; never infer an expected result.

### 4. Execution

Use the existing append-only per-case lifecycle and status rules. Run P0/smoke cases first unless the source or user specifies another order. Resume skips terminal cases and must not regenerate cases when requirement and case fingerprints still match.

### 5. Failure and defect flow

For a reproducible product failure, capture evidence, verify the exact expectation, run a focused One2All duplicate check, submit once, and re-read the saved BUG. Persist the verified BUG ID and URL with the case result.

Do not create BUGs for design gaps, `Blocked`, or `Skipped` cases.

### 6. Reporting

Create a separate Feishu execution report with summary, module results, evidence, BUG links, blockers, risks, and verdict. Include the verified test-case document URL. When supported, update the case document with a backlink to the execution report; failure to add a backlink does not invalidate either successfully created document and must be reported explicitly.

## Durable State And Resume

Extend `manifest.json` with:

```json
{
  "input_kind": "requirements|cases|mixed",
  "requirement_source": "source label or URL",
  "requirement_fingerprint": "sha256 or null",
  "case_source": "local handoff path",
  "case_source_fingerprint": "sha256",
  "case_document_url": "verified URL or null",
  "case_document_permission": "full_access|failed|not_attempted",
  "execution_report_url": "verified URL or null"
}
```

Resume behavior:

- Matching requirement and case fingerprints reuse the existing generated cases and skip terminal execution results.
- A changed requirement fingerprint requires case impact analysis. Preserve unaffected IDs and regenerate only affected coverage.
- A changed case fingerprint creates a new execution run and never mixes results across revisions.
- A failed Feishu or BUG write is recorded as an external-write failure and may be retried without re-executing completed cases.

## Feishu Deliverables

### Test-case document

Use the established format: document title, 文档信息, 测试用例汇总, numbered module sections and subsections, and six-column tables with 用例ID、用例名称、前置条件、测试步骤、预期结果、优先级.

### Execution report

Use the existing execution report schema. Add:

- Requirement source and fingerprint/revision label.
- Test-case document URL.
- Generated, preserved, repaired, and blocked case counts.
- Approval-required cases and their disposition.

Create and permission each document through the API helper. Never claim creation, linking, or permission success without verified API results.

## Skill Changes

Update only `qa-test-execution` orchestration resources:

- Expand `SKILL.md` triggers to include requirement-to-report workflows.
- Add a design/execution routing reference and handoff contract.
- Extend the case schema with source and safety metadata while retaining backward compatibility.
- Extend run-state initialization and manifest validation for requirement and case fingerprints.
- Extend fixtures to cover requirement input, existing case input, and mixed input.
- Update UI metadata so the skill is presented as the integrated QA design-and-execution entry point.

Do not modify the behavior or file layout of `qa-test-case-design` unless implementation discovers a concrete missing output contract that cannot be expressed by the orchestration layer.

## Error Handling

- Requirement source cannot be read: stop before design and report the exact access failure.
- Case design validation fails: do not execute; repair once through `qa-test-case-design`, then report `Blocked` if still invalid.
- Feishu case-document creation fails: retain the validated local handoff and continue only if the user did not require the cloud document as an entry gate; disclose the failure.
- Authentication expires during execution: preserve state, request login once, and resume in the same session.
- Approval is withheld: mark only affected cases `Skipped` or leave them pending according to the user's decision.
- External BUG/report write fails: preserve test outcomes and retry the write independently.

## Verification

### Requirement-first fixture

Start from a small requirement source, generate cases, validate both the preferred case document and structured handoff, execute safe cases, and confirm both Feishu payloads contain reciprocal links.

### Case-first fixture

Start from existing valid cases and confirm no design regeneration occurs before execution.

### Mixed-input fixture

Preserve stable valid IDs, add missing coverage, and reject duplicate IDs or conflicting expectations.

### Resume fixture

Interrupt after at least one terminal case, resume with matching fingerprints, and confirm neither case generation nor completed execution repeats.

### Safety fixture

Include safe, destructive, payment, permission-changing, and ambiguous cases. Confirm safe cases auto-run while only affected high-risk cases pause or block.

## Acceptance Criteria

- A single `qa-test-execution` invocation can accept either requirements or existing test cases.
- Requirements produce validated, execution-ready cases through `qa-test-case-design` without duplicating its rules.
- Existing valid cases bypass generation.
- Safe cases begin automatically after validation.
- High-risk and ambiguous cases pause or block independently without stopping safe cases.
- Case generation and terminal execution are not repeated during a matching resume.
- Test-case and execution Feishu documents are separate, permissioned, and linked when API operations succeed.
- Confirmed failures retain evidence and verified One2All BUG references.
- `qa-test-case-design` remains independently invocable and behaviorally unchanged.
