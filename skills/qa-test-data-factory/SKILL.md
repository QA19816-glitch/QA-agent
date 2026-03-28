---
name: qa-test-data-factory
description: Design and generate QA test data sets for validation, boundaries, permissions, workflow states, imports, and integration scenarios. Use when the user asks for test data, edge-case values, account/data setup plans, or scenario matrices needed to execute tests reliably.
---

# QA Test Data Factory

Design data that makes tests meaningful and repeatable.

## Workflow

1. Identify fields, constraints, statuses, roles, and dependencies.
2. Produce data by category:
   - valid baseline
   - boundary values
   - invalid inputs
   - duplicate/conflict data
   - permission-differentiated data
   - lifecycle/state data
   - integration/mock data
3. Keep data generation reproducible. Name accounts and records clearly.
4. If the user needs execution-ready data, produce a preparation checklist or import-ready structure.
5. Call out sensitive-data concerns; do not use real personal or production secrets.

## Output rules

- Keep each data row tied to a test intent.
- Prefer tabular structure when useful.
- Include cleanup/reset notes when data is stateful.

## Resources

- Read `{baseDir}/references/data-design-patterns.md` for data strategies.
- Read `{baseDir}/assets/test-data-sheet-template.md` for a reusable sheet format.
