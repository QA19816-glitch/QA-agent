---
name: qa-test-environment-platform
description: Manage and verify QA test environments, platform readiness, environment parity, accounts, test data, configuration, feature flags, service dependencies, deploy status, access, reset/cleanup, and environment health for testing.
---

# QA Test Environment Platform

Use this skill for 测试支撑环境, environment readiness, and platform checks before execution.

## Coverage Model

- Environment inventory: URL, version, branch, deployment time, feature flags, dependency versions.
- Access: accounts, roles, permissions, VPN/IP allowlist, admin panels, third-party sandbox credentials.
- Test data: seed data, unique data, cleanup/reset, masking, data freshness.
- Dependencies: API gateways, queues, caches, object storage, search index, payment sandbox, SMS/email.
- Stability: health checks, logs, error rate, scheduled jobs, database migrations, background workers.
- Parity: config differences from staging/production, mock vs real dependency, known limitations.

## Workflow

1. Build an environment readiness checklist before test execution.
2. Verify deployed version and feature flags.
3. Confirm accounts, permissions, and data.
4. Run health and dependency smoke checks.
5. Record blockers and workarounds.

## Output

```markdown
## Environment Readiness
| Area | Check | Result | Owner | Notes |

## Blockers
1. ...
```
