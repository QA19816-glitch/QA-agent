---
name: qa-automation-engineering
description: Design, review, implement, and improve automated tests for UI, API, integration, regression, smoke, CI quality gates, test data, fixtures, mocking, page objects, reliability, flaky test diagnosis, coverage strategy, and maintainable QA automation.
---

# QA Automation Engineering

Use this skill for automated test architecture and reliability.

## Automation Strategy

- Automate stable, high-value checks: smoke, critical regression, API contracts, permission matrix, data integrity.
- Keep unstable exploratory cases manual until behavior stabilizes.
- Prefer API and integration checks for fast deterministic coverage; use UI automation for user-visible critical paths.
- Add observability to failures: screenshot, trace, console/network logs, request IDs, test data IDs.
- Separate test data setup, action, assertion, and cleanup.

## Design Rules

- Tests should assert user/business outcomes, not incidental implementation details.
- Use stable selectors (`data-testid`, role/name, IDs from UI snapshots) over brittle CSS paths.
- Isolate state with unique data, seeded fixtures, or transactional cleanup.
- Avoid sleeps; wait for explicit UI, network, or data conditions.
- Track flaky tests with failure signature, frequency, owner, and quarantine criteria.
- CI gates should distinguish blocking smoke failures from non-blocking exploratory/report jobs.

## Workflow

1. Identify target layer: unit, API, integration, UI, E2E, performance smoke.
2. Choose the smallest automation layer that proves the risk.
3. Inspect existing repo patterns before adding frameworks or abstractions.
4. Implement focused tests and evidence capture.
5. Run locally, then explain CI integration and maintenance notes.

## Output

```markdown
## Automation Plan
| Risk | Test layer | Tool | Data strategy | CI gate |

## Reliability Notes
1. ...
```
