---
name: qa-prd-analyzer
description: Analyze PRDs, Feishu docs, wiki pages, specs, change notes, and prototype text into structured feature breakdowns, business flows, hidden assumptions, ambiguity lists, and QA risk summaries. Use when the user asks to analyze a requirement, break down a feature, review a spec, find missing cases, or identify unclear/risky requirements before test design.
---

# QA PRD Analyzer

Use this skill to turn requirement material into a test-ready understanding.

## Workflow

1. Read the source material first. Prefer the original requirement document over summaries.
2. Build a structured view of the feature:
   - business goal
   - actors and permissions
   - core flow
   - alternate flows
   - data objects and states
   - validations and constraints
   - integrations and dependencies
3. Separate **explicit requirements** from **implied requirements**.
4. Flag ambiguity instead of pretending certainty.
5. Score notable risks by impact and likelihood.
6. End with a section named `Questions / Clarifications Needed` when anything important is underspecified.

## Output rules

- Keep facts and assumptions separate.
- Use crisp module names that can be reused by downstream QA skills.
- Prefer tables only when the surface supports them well; otherwise use bullets.
- If the request is broad, organize by feature module.

## Resources

- Read `{baseDir}/references/prd-analysis-checklist.md` for the review checklist.
- Read `{baseDir}/references/risk-patterns.md` when surfacing QA risks.
- Read `{baseDir}/assets/output-template.md` when the user wants a ready-to-paste analysis format.
