---
name: qa-reliability-resilience-testing
description: Plan reliability and resilience QA for timeouts, retries, circuit breakers, failover, disaster recovery, graceful degradation, chaos testing, fault injection, queues, rate limits, observability, backup/restore, and production-readiness drills.
---

# QA Reliability Resilience Testing

Use this skill for system behavior under failure.

## Safety

- Do not run fault injection, chaos, failover, or destructive recovery tests against shared or production systems without explicit user confirmation.
- Start with design review, staging tests, and low-impact probes.
- Always define rollback, monitoring, blast radius, and stop conditions.

## Coverage Model

- Dependency failure: timeout, 5xx, DNS failure, slow response, partial outage, stale cache.
- Retry behavior: backoff, max attempts, idempotency, duplicate messages, retry storms.
- Queues: backlog, dead-letter, poison messages, ordering, delayed jobs, reprocessing.
- Failover: primary/secondary, multi-region, leader election, connection drain, session impact.
- Degradation: read-only mode, cached response, feature flag off, user-facing error copy.
- Recovery: backup restore, data reconciliation, replay, alert clearance, runbook accuracy.
- Observability: alerts, dashboards, logs, traces, SLO burn, incident timeline.

## Workflow

1. Identify critical user flow and dependencies.
2. Define failure modes and expected product behavior.
3. Choose safe validation method: config review, mock failure, staging injection, or controlled drill.
4. Record metrics, logs, user-visible behavior, and recovery time.
5. Report residual risk and production-readiness gaps.

## Output

```markdown
## Resilience Test Plan
| Failure mode | Expected behavior | Method | Stop condition | Evidence |

## Readiness Gaps
1. ...
```
