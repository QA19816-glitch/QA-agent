---
name: qa-traceability-mapper
description: Build QA traceability between requirements, test points, test cases, execution results, and defects. Use when the user asks for a traceability matrix, coverage mapping, gap analysis, release coverage proof, or help linking requirements to tests and bugs.
---

# QA Traceability Mapper

Create evidence that coverage exists and show where it does not.

## Workflow

1. Normalize the source artifacts into stable IDs or labels.
2. Map in this direction whenever possible:
   requirement -> test point -> test case -> execution result -> defect
3. Highlight gaps explicitly:
   - uncovered requirement
   - requirement covered only by happy path
   - test case without a clear source requirement
   - failed case with no tracked defect
4. Summarize coverage quality, not just coverage quantity.

## Output rules

- Prefer a matrix when the target surface supports it; otherwise use grouped bullets.
- Keep ambiguous links marked as `tentative`.
- End with a short `Coverage risks` section.

## Resources

- Read `{baseDir}/references/coverage-rules.md` for mapping rules.
- Read `{baseDir}/assets/traceability-template.md` for a ready template.
