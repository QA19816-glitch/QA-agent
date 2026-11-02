---
name: qa-api-testing
description: Plan, design, execute, and report API testing for REST, GraphQL, RPC, webhooks, integrations, authentication, authorization, contracts, schemas, idempotency, pagination, rate limits, retries, and error handling. Use when the user asks for interface testing, backend API checks, Postman/curl cases, API automation, or API defect analysis.
---

# QA API Testing

Use this skill for API-level testing and integration quality.

## Coverage Model

- Contract: method, path, query, headers, body schema, content type, status codes.
- Auth: unauthenticated, expired token, wrong role, cross-tenant access, permission downgrade.
- Validation: required fields, type mismatch, boundary values, invalid enum, malformed JSON, oversized payload.
- Business rules: state constraints, calculations, stock/balance changes, duplicate operations, idempotency keys.
- Data behavior: sorting, filtering, pagination, search, null handling, timezone, currency precision.
- Error handling: 4xx/5xx structure, stable error codes, retryability, partial failure, rollback.
- Integration: callbacks, webhooks, third-party timeout, signature verification, replay attack protection.
- Observability: trace IDs, logs, metrics, audit records.

## Execution Workflow

1. Read the API source: OpenAPI, docs, network traces, controller code, or examples.
2. Build a coverage table by endpoint and risk.
3. Create curl/Postman-style examples only with safe test data.
4. Verify both HTTP status and business response.
5. For state-changing APIs, verify database or downstream side effects when accessible.
6. Capture request, response, environment, account, and timestamp for defects.

## Output

```markdown
## API Test Coverage
| Endpoint | Scenario | Data | Expected | Priority |

## Execution Notes
1. ...

## Defects Or Risks
1. ...
```

Never place real credentials, production tokens, payment data, or private personal data in examples or reports.
