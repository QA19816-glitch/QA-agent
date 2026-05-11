---
name: qa-observability-testing
description: Test observability quality including logs, metrics, traces, dashboards, alerts, audit logs, request IDs, business monitoring, SLO signals, incident evidence, and whether failures are diagnosable.
---

# QA Observability Testing

Use this skill when the test target includes 可观测, monitoring, logging, tracing, alerting, auditability, or incident readiness.

## Coverage Model

- Logs: structured fields, severity, trace/request ID, user/account masking, error context.
- Metrics: request count, error rate, latency, queue depth, business counters, saturation.
- Traces: distributed span continuity, external calls, slow segments, sampled errors.
- Alerts: threshold, routing, deduplication, recovery notification, false-positive risk.
- Dashboards: release health, module health, business funnel, drill-down paths.
- Audit: who/what/when/before-after values for sensitive actions.
- Diagnosability: can an on-call engineer identify affected scope and likely cause?

## Workflow

1. Identify critical flows and expected signals.
2. Trigger success and safe failure cases in a test environment.
3. Verify logs/metrics/traces/audit records appear with usable fields.
4. Check dashboards and alert rules when accessible.
5. Report gaps that would slow incident response.

## Output

```markdown
## Observability QA Matrix
| Flow | Signal | Expected | Evidence | Gap |
```
