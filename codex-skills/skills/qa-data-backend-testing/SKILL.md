---
name: qa-data-backend-testing
description: Design and execute backend data QA for databases, migrations, ETL, scheduled jobs, queues, caches, reconciliation, reports, exports, imports, audit logs, permissions, and consistency across services.
---

# QA Data And Backend Testing

Use this skill for data correctness, backend side effects, and non-UI validation.

## Coverage Model

- Database writes: create/update/delete, constraints, defaults, precision, nulls, soft delete, audit columns.
- Transactions: rollback, partial failure, retry, duplicate processing, idempotency, concurrency.
- Jobs and queues: schedule, retry/dead-letter, order, delay, duplicate messages, backfill.
- Cache/search: invalidation, stale data, indexing delay, eventual consistency, pagination.
- Imports/exports: schema, encoding, CSV/Excel injection, row limits, failed row reports, resumability.
- Reports: aggregation, filters, timezone, currency, permissions, reconciliation against source data.
- Migrations: backward compatibility, data transformation, rollback, historical records, performance.
- Observability: logs, metrics, alerts, trace IDs, audit records.

## Workflow

1. Identify source of truth, data flow, downstream consumers, and consistency requirements.
2. Build test data with unique markers and cleanup rules.
3. Verify API/UI result plus persisted data or downstream effect.
4. Test failure and retry paths where safe.
5. Reconcile totals, counts, status transitions, and audit records.

## Output

```markdown
## Backend/Data Test Matrix
| Flow | Source | Check | Expected | Evidence |

## Data Risks
1. ...
```

Avoid destructive production checks unless the user explicitly confirms target, data, and rollback plan.
