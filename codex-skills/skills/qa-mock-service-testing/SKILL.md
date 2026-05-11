---
name: qa-mock-service-testing
description: Design and validate mocks, stubs, service virtualization, fake dependencies, sandbox integrations, simulated callbacks, API contract mocks, test doubles, and controlled error scenarios for QA and integration testing.
---

# QA Mock Service Testing

Use this skill when the user needs Mock/API sandbox/service virtualization or controlled dependency simulation.

## Coverage Model

- Contract fidelity: request/response schema, status codes, headers, auth, error format.
- Scenario control: success, validation failure, timeout, 5xx, rate limit, partial response, delayed callback.
- State behavior: idempotency, duplicate callback, ordering, retries, eventual consistency.
- Data setup: reusable fixtures, unique IDs, cleanup, deterministic clocks, locale/currency.
- Drift detection: compare mock behavior with real API docs or captured traffic.
- Safety: prevent fake endpoints and credentials from leaking into production config.

## Workflow

1. Identify dependency, contract source, and scenarios that need simulation.
2. Define fixture data and state transitions.
3. Add positive, negative, timeout, retry, and callback cases.
4. Verify the product handles each simulated response correctly.
5. Document mock limitations and real-environment checks still required.

## Output

```markdown
## Mock Scenario Matrix
| Dependency | Scenario | Mock behavior | Product expectation | Priority |

## Drift Risks
1. ...
```
