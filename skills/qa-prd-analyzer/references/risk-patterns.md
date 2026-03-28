# Common QA risk patterns

## Requirement risks
- Contradictory rules across PRD, prototype, and API spec
- Missing acceptance criteria
- UI copy defines behavior that backend spec does not mention
- Happy path described, failure path omitted

## Data risks
- No unique-key strategy
- No clear time zone rule
- No idempotency rule for retries/resubmits
- Missing archival/deletion behavior

## Permission risks
- View/edit/export rights not separated
- Admin behavior defined, normal-user behavior omitted
- Cross-tenant access not specified

## Workflow risks
- Resubmission after rejection not specified
- Cancellation and rollback semantics missing
- Concurrent edits or approvals undefined

## Integration risks
- Callback/webhook failure handling missing
- External system latency not considered
- Version mismatch across dependent systems

## Release risks
- No migration/backfill plan
- No compatibility guidance for old clients
- No fallback path when feature flags are off
