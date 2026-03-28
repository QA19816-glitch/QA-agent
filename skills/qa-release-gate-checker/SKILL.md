---
name: qa-release-gate-checker
description: Decide whether a build is releasable by checking core-flow status, unresolved defects, coverage gaps, and residual risks. Use when the user asks if a version can ship, wants a release gate decision, or needs a concise go/no-go QA judgement from current evidence.
---

# QA Release Gate Checker

Produce a sharp ship / no-ship recommendation.

## Workflow

1. Gather the latest execution summary, critical defect list, and coverage status.
2. Check ship gates in this order:
   - core user path health
   - severity of open defects
   - data/security risk
   - regression coverage sufficiency
   - blocker dependencies and rollout constraints
3. Make one recommendation only:
   - GO
   - GO WITH CONDITIONS
   - NO-GO
4. Back the recommendation with the fewest decisive facts needed.

## Output rules

- Keep it executive-readable.
- If evidence is incomplete, say so and lower confidence.
- Do not hide uncertainty behind soft language.

## Resources

- Read `{baseDir}/references/release-gate-rules.md` for the decision rubric.
- Read `{baseDir}/assets/release-gate-template.md` for the final format.
