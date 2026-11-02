---
name: qa-release-regression
description: Plan and execute release QA, smoke tests, regression suites, UAT support, production verification, rollback checks, go/no-go decisions, risk acceptance, release notes QA, and post-release monitoring.
---

# QA Release Regression

Use this skill for release readiness and regression control.

## Release QA Flow

1. Confirm release scope, changed modules, bug fixes, data migrations, config changes, and feature flags.
2. Define entry criteria: build deployed, env stable, accounts/data ready, known blockers triaged.
3. Run smoke first: login, navigation, core create/update/search/order/payment/approval paths, health checks.
4. Run risk-based regression: changed areas, adjacent modules, historical defect zones, high-traffic flows.
5. Verify fixed bugs with original steps, then add regression around root cause.
6. Check non-functional gates: performance smoke, security sanity, logs/alerts, compatibility targets.
7. Produce go/no-go with blockers, accepted risks, rollback notes, and production verification plan.

## Output

```markdown
## Release QA Summary
Build/Version:
Environment:
Scope:
Verdict: Go / No-Go / Conditional Go

## Smoke And Regression
| Area | Scenario | Result | Evidence |

## Blockers And Risks
1. ...

## Production Verification
1. ...
```

When this is an execution summary or QA deliverable, use `feishu-cloud-docs` by default when available.
