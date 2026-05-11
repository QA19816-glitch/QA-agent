---
name: qa-production-inspection
description: Plan and execute safe production inspection, online巡检, post-release verification, synthetic checks, smoke monitoring, canary validation, alert review, log spot checks, and rollback decision evidence without destructive production actions.
---

# QA Production Inspection

Use this skill for online巡检, production verification, canary checks, and post-release monitoring.

## Safety

- Prefer read-only checks and synthetic/test accounts.
- Do not mutate production data unless the user explicitly confirms the account, data, rollback, and business impact.
- Keep inspection scoped, timestamped, and evidence-backed.

## Coverage Model

- Availability: health endpoints, homepage/app entry, login, critical APIs.
- Core journeys: read-only smoke, synthetic transaction where safe, entitlement/order visibility.
- Release health: canary metrics, error rate, latency, saturation, queue backlog, logs.
- Data sanity: counts, recent records, reconciliation dashboards, delayed jobs.
- User impact: customer-facing errors, support tickets, analytics drop, alert noise.
- Rollback evidence: blocker criteria, affected scope, recovery validation.

## Workflow

1. Confirm release version, environment, time window, and allowed actions.
2. Run low-risk smoke and metrics checks first.
3. Inspect logs/alerts/traces for the changed module.
4. Verify user-visible symptoms, not only dashboards.
5. Produce continue/rollback/watch verdict with evidence.

## Output

```markdown
## Production Inspection
Version:
Window:
Verdict: Pass / Watch / Rollback Recommended

| Check | Result | Evidence |
```
