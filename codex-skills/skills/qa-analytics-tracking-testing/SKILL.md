---
name: qa-analytics-tracking-testing
description: Test analytics tracking, event instrumentation, exposure logs, funnels, attribution, A/B experiment events, BI reports, dashboards, dataLayer, SDK events, privacy consent, and event schema quality for web, mobile, and backend products.
---

# QA Analytics Tracking Testing

Use this skill for 埋点, analytics, BI, funnels, experiment events, and tracking verification.

## Coverage Model

- Event trigger: page view, exposure, click, submit, success, failure, cancel, share, payment, login/logout.
- Event schema: event name, required properties, enum values, IDs, timestamps, version, platform, user/account role.
- Deduplication: refresh, back/forward, duplicate click, retry, offline replay, app lifecycle.
- Funnel integrity: start/end pairing, conversion step order, abandonment, error attribution.
- Privacy and consent: opt-in/out, PII masking, region rules, disabled tracking for sensitive states.
- Delivery: SDK queue, network request, server ingestion, warehouse table, dashboard/report visibility.
- Experiment: exposure only once per assignment, variant consistency, eligibility, holdout, metric attribution.

## Workflow

1. Read the tracking spec, event schema, or dashboard definition.
2. Build a matrix by user flow and event.
3. Verify trigger timing and property values with browser network, app logs, server logs, or warehouse queries.
4. Test negative paths and duplicate-trigger risks.
5. Reconcile event counts with source actions or backend records when possible.

## Output

```markdown
## Tracking Test Matrix
| Flow | Event | Trigger | Required properties | Expected | Priority |

## Data Risks
1. ...
```

Do not include real private user data in event examples or reports.
