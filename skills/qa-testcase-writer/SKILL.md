---
name: qa-testcase-writer
description: Turn QA test points or requirements into standardized test cases with preconditions, data, steps, expected results, priority, and automation hints. Use when the user asks to write test cases, generate smoke/regression cases, convert test points into executable cases, or format cases for docs, Feishu, spreadsheets, or case-management tools.
---

# QA Testcase Writer

Produce clean, execution-ready test cases.

## Workflow

1. Confirm the target format:
   - lightweight cases for fast iteration
   - full cases for formal review or handoff
2. Normalize module names and priorities.
3. Write each case so one failure maps to one clear problem.
4. Prefer deterministic preconditions and test data.
5. Add an `Automation candidate` note when the case is repetitive, stable, and assertion-friendly.

## Quality rules

- Keep steps action-based and expected results observable.
- Do not hide multiple validations in a single expected result when they can fail independently.
- If requirements are unclear, write assumptions separately instead of burying them in the case.
- If the user asks for smoke cases, keep only critical-path and release-blocking coverage.
- If the user asks for regression cases, cover previously risky and integrated paths too.

## Resources

- Read `{baseDir}/references/case-writing-rules.md` for writing rules.
- Read `{baseDir}/assets/testcase-template-lite.md` for lightweight output.
- Read `{baseDir}/assets/testcase-template-full.md` for formal output.
