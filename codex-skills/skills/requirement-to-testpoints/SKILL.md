---
name: requirement-to-testpoints
description: Extract structured QA test points from PRDs, requirement documents, change notes, product specs, user flows, API specs, prototypes, or feature summaries. Use when the user asks to extract test points, testing points, QA coverage, coverage gaps, edge cases, requirement-to-test mapping, or an initial checklist before writing full test cases.
---

# Requirement To Test Points

Turn requirements into a concise, reviewable QA test point set. Treat the result as a strong first draft that still needs human business review.

## Workflow

1. Start from the current requirement artifact or user-provided text. Do not rely on memory when a fresh document is available.
2. Identify modules, submodules, actors, roles, status flows, business rules, data fields, external dependencies, and unclear assumptions.
3. Extract test points for each module across these dimensions:
   - Functional flow: happy path, field validation, state changes, role differences.
   - Business rules: if/then logic, calculations, constraints, combinations, conflicts.
   - Boundary conditions: numeric, text, time, list size, file size/type, empty and overflow cases.
   - Exception and resilience: timeout, retry, duplicate submit, concurrency, partial failure, stale data, rollback.
   - Non-functional: performance, security, compatibility, usability, accessibility, observability when relevant.
4. Merge duplicates, split overloaded points, and assign priority or risk: P0/P1/P2/P3 or High/Medium/Low.
5. Mark core-path coverage separately from inferred coverage. If a point is inferred from common risk rather than explicitly stated, label it as inferred.
6. Surface gaps and questions instead of pretending vague requirements are complete.

## Output

Default to a structured Markdown table unless the user requests another format. Include:

- ID
- Module or scenario
- Dimension
- Test point
- Priority or risk
- Preconditions or test data
- Requirement source or evidence
- Notes, gaps, or inference marker

Keep points short and testable. Do not expand into full step-by-step test cases unless the user asks for test cases. When the user asks to continue from test points into full cases, use `qa-test-case-design` and preserve the module/risk structure from the extracted points.

When the user provides a large file or asks for a reusable deliverable, write the result to a project file such as `test-points.md` or a user-specified path, and briefly summarize the coverage in the response.

## References

- Read `references/test-design-heuristics.md` for reusable extraction heuristics when coverage is broad or risk-heavy.
- Read `references/domain-risk-prompts.md` when the requirement involves common product domains such as orders, payments, uploads, approvals, messaging, integrations, or permissions.
- Use `assets/test-point-template.md` as the output skeleton when writing a file.
