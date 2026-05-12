---
name: qa-test-point-extractor
description: Convert requirements, flows, API specs, and feature summaries into structured QA test points covering happy path, negative path, boundary, permission, state transition, compatibility, and resilience. Use when the user asks to extract test points, design coverage, list edge cases, or expand testing scope before formal test cases are written.
---

# QA Test Point Extractor

Turn analyzed requirements into a coverage-oriented test point set.

## Workflow

1. Start from the latest requirement understanding, not from memory.
2. Group test points by module or scenario.
3. Cover at least these categories when relevant:
   - happy path
   - field validation
   - boundary values
   - permission and role differences
   - status/state transitions
   - concurrency/repeat operations
   - integration failures
   - recovery/rollback
   - usability/compatibility hints
4. Mark each point with a risk or priority when obvious.
5. Identify gaps where a test point exists only because the requirement is vague.

## Output rules

- Write test points as concise, testable statements.
- Avoid turning them into full step-by-step cases unless explicitly asked.
- Merge duplicates; split overloaded points.
- Surface missing coverage categories explicitly.

## Resources

- Read `{baseDir}/references/test-design-techniques.md` for design heuristics.
- Read `{baseDir}/references/common-boundary-cases.md` for reusable edge-case prompts.
- Read `{baseDir}/references/permission-state-patterns.md` for role/state coverage prompts.
- Read `{baseDir}/assets/test-point-template.md` when the user wants a structured template.
