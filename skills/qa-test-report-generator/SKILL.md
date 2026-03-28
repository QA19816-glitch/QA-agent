---
name: qa-test-report-generator
description: Summarize QA execution into release-facing test reports with scope, environment, pass/fail counts, defect distribution, residual risk, and release recommendation. Use when the user asks to generate a test report, release summary, QA conclusion, execution recap, or stakeholder-ready testing status update.
---

# QA Test Report Generator

Turn execution artifacts into a decision-ready report.

## Workflow

1. Gather facts from execution outputs, traceability, and defects.
2. Report only what was actually tested.
3. Separate facts, risks, and recommendations.
4. Keep the release recommendation explicit:
   - recommend release
   - conditional release
   - do not recommend release
5. Call out blockers, uncovered areas, and environment limitations.

## Output rules

- Start with scope and environment.
- Include counts only when they are reliable.
- Explain why the release recommendation was made.
- Keep stakeholder copy concise; attach detail underneath.

## Resources

- Read `{baseDir}/references/report-judgement-rules.md` for recommendation heuristics.
- Read `{baseDir}/assets/test-report-template.md` for report format.
