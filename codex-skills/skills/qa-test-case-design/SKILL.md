---
name: qa-test-case-design
description: Design risk-prioritized, traceable, execution-ready test cases from requirements, PRDs, user stories, prototypes, APIs, technical notes, change lists, historical defects, or multiple conflicting sources. Use when the user asks to 编写测试用例、生成测试用例、测试用例设计、冒烟/回归用例、Feishu-style test case documents, boundary/negative/permission/state/concurrency coverage, or requirement-to-case traceability.
---

# QA Test Case Design

Generate full test cases rather than a flat list of test points. Preserve the user's preferred Chinese and Feishu delivery style by default.

## Workflow

1. Inventory the supplied sources, in-scope behavior, exclusions, roles, states, rules, data, dependencies, and known risks.
2. Separate confirmed facts, source conflicts, assumptions, and information gaps. Never silently choose between conflicting sources.
3. Rank coverage by business impact and failure probability. Use P0-P3 and explain the highest-risk decisions.
4. Select appropriate design methods: equivalence classes, boundary values, decision tables, state transitions, pairwise combinations, user journeys, error guessing, and regression history.
5. Add positive, negative, boundary, permission, state, duplicate-submit, concurrency, timeout, retry, rollback, stale-data, and integration coverage where relevant.
6. Bind every case to a requirement, story, rule, or risk ID. When no ID exists, create a stable short trace label and mark it as derived.
7. Keep each case independently executable: explicit preconditions, deterministic data, numbered actions, and observable expected results.
8. Produce a smoke subset, recommended execution order, automation candidates, and release-blocking checks when the scope warrants them.
9. Deliver a usable first draft when information is incomplete, while marking assumptions and gaps instead of inventing fields, endpoints, error codes, environments, or root causes.

## Output Selection

- Default to the Feishu-style document for Chinese requirements and formal QA deliverables. Read `output-templates/feishu-test-cases.md`.
- Use the structured template when the user requests Markdown, JSON-ready fields, a case-management import shape, or explicit Trace/Type/Test data columns. Read `output-templates/structured-test-cases.md`.
- For a small smoke request from one simple source, keep the output lightweight. Do not force report-style sections that do not improve execution.
- For multiple sources, high-risk scope, formal review, or release decisions, read and follow `prompts/advanced-test-case-design.md`.

## Feishu Defaults

- Use: document title, 文档信息, 测试用例汇总, then numbered module sections and subsections.
- Put a separate table under each subsection with columns: `用例ID`、`用例名称`、`前置条件`、`测试步骤`、`预期结果`、`优先级`.
- Number steps and expected results inside cells.
- Avoid one giant table and avoid replacing the case document with report-style narrative.
- Add traceability, test data, assumptions, smoke scope, and automation notes outside the core six-column table unless the user asks for expanded columns.

## Quality Gates

- Give high-risk paths positive, negative, and boundary coverage, or explain the omission.
- Ensure priority reflects real impact and probability; do not distribute priorities evenly.
- Keep case IDs stable and unique, such as `TC-LOGIN-001`.
- Ensure every expected result is pass/fail observable; avoid “系统正常” or “符合预期”.
- Prevent duplicate low-value cases and hidden multi-purpose cases.
- Keep trace-matrix case IDs consistent with the case tables.
- Read `references/case-writing-rules.md` when detailed design or automation guidance is needed.
- Run `scripts/validate_testcases.py` against saved Markdown deliverables when the task creates a local artifact.

## Pre-delivery Check

- [ ] Scope, source list, and priority logic are clear for formal/high-risk work.
- [ ] Facts, conflicts, assumptions, and gaps are separated.
- [ ] Required Feishu sections or requested structured fields are present.
- [ ] Steps are numbered and expected results are observable.
- [ ] High-risk paths include positive, negative, and boundary protection.
- [ ] Trace references and case IDs are aligned.
- [ ] Smoke subset, execution order, and automation candidates are included when useful.
