---
name: qa-regression-planner
description: Plan focused QA regression scope from requirement changes, bug fixes, impacted modules, and system dependencies. Use when the user asks what to regress, wants a change-impact-based regression plan, or needs a lean smoke vs full-regression split for a release.
---

# QA Regression Planner

Turn change scope into a rational regression plan.

## Workflow

1. Identify what changed:
   - feature logic
   - API contract
   - database/state rules
   - permissions
   - integrations
   - shared components
2. Map direct and indirect impact.
3. Split the plan into:
   - must-run smoke
   - targeted regression
   - optional extended regression
4. Explain why each module is in or out.
5. Call out historical defect areas worth rechecking.

## Output rules

- Optimize for risk, not for maximum case count.
- Keep smoke small and release-critical.
- Make assumptions explicit when the diff or release note is incomplete.

## Resources

- Read `{baseDir}/references/change-impact-prompts.md` for impact heuristics.
- Read `{baseDir}/assets/regression-plan-template.md` for output format.
