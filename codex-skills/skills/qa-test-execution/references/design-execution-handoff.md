# Design-To-Execution Handoff

## Input Decision

Use `requirements` when the source describes behavior but lacks stable executable cases. Use `cases` when every case has a stable ID, explicit actions, observable expectations, priority, and enough context to classify an executor. Use `mixed` when both are supplied.

Do not treat a list of test points as execution-ready cases.

## Delegation Contract

For `requirements`, invoke `qa-test-case-design` and require two outputs:

1. A human-reviewable test-case document in the preferred Feishu format.
2. A structured JSON handoff matching `assets/case-schema.json`.

The design skill owns coverage methods, risk priority, traceability, wording, and document structure. This execution skill owns normalization, safety classification, durable state, execution, defects, and reporting.

## Handoff Fields

Top-level fields:

- `source`: requirement or case source label/URL.
- `version`: source revision, build, or generated revision.
- `requirement_source`: original requirement label/URL when applicable.
- `requirement_fingerprint`: SHA-256 of normalized requirement content when applicable.
- `case_document_url`: verified Feishu case-document URL when created.
- `cases`: execution cases.

Case fields:

- Required: `case_id`, `name`, `steps`, `expected`, `priority`, `executor`.
- Recommended: `module`, `preconditions`, `trace`, `tags`, `safety`, `safety_reason`.

## Quality Gate

Reject the handoff before execution when:

- IDs are missing or duplicated.
- Steps or expectations are empty.
- Expected results are vague or not observable.
- Priority is outside P0-P3.
- Executor or safety classification is invalid.
- `approval_required` or `blocked` lacks `safety_reason`.

For mixed input, preserve valid IDs and generate only missing or repaired coverage. Record generated, preserved, repaired, and blocked counts in the execution report.

## Resume

Matching requirement and case fingerprints reuse the existing cases and execution run. A changed requirement requires impact analysis: preserve unaffected IDs and generate only affected cases. A changed case fingerprint starts a new run and never mixes results from two case revisions.
