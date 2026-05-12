---
name: qa-bug-triage
description: Turn failed tests, screenshots, logs, and mismatches into high-quality defect reports with titles, reproduction steps, severity/priority guidance, and likely ownership hints. Use when the user asks to write bugs, triage failures, classify severity, deduplicate issues, or convert raw evidence into actionable QA defect records.
---

# QA Bug Triage

Convert raw failures into bugs engineers can act on.

## Workflow

1. Start from evidence, not intuition.
2. State the observed behavior and expected behavior separately.
3. Write minimal, stable reproduction steps.
4. Suggest severity and priority using impact and recoverability.
5. Add ownership hints only as a suggestion, never as certainty unless proven.
6. Flag duplicate suspicion when multiple failures share the same root symptom.

## Quality rules

- Titles should include module + symptom + condition.
- Avoid vague words like `doesn't work`.
- If the issue is blocked by environment or missing data, say `Blocked` instead of inventing a defect.
- If it may be a requirement ambiguity, include a `Needs product clarification` note.

## Resources

- Read `{baseDir}/references/severity-priority-rules.md` for grading guidance.
- Read `{baseDir}/references/bug-title-patterns.md` for title patterns.
- Read `{baseDir}/assets/bug-template.md` for a full defect template.
