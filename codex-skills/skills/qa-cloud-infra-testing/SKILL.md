---
name: qa-cloud-infra-testing
description: Test cloud infrastructure, deployment, configuration, feature flags, environment parity, IAM, secrets, networking, CDN, object storage, observability, rollout/rollback, blue-green/canary deploys, and operational readiness.
---

# QA Cloud Infra Testing

Use this skill for infrastructure and deployment quality.

## Coverage Model

- Environment parity: config, secrets, feature flags, dependencies, seed data, version drift.
- Deployment: build artifact, migration order, health checks, blue-green/canary, rollback, zero-downtime claims.
- IAM/secrets: least privilege, secret rotation, missing/expired credentials, audit logs.
- Networking: DNS, TLS, CORS, CDN cache, WAF, firewall/security groups, private endpoints.
- Storage: bucket permissions, lifecycle, backups, restore, signed URLs, large object behavior.
- Observability: logs, metrics, traces, dashboards, alerts, runbooks.
- Capacity: autoscaling, resource limits, queue backpressure, rate limits.

## Workflow

1. Identify deployment target, release method, infra changes, and rollback plan.
2. Build pre-deploy, deploy, and post-deploy checks.
3. Verify health endpoints, logs/metrics, config, and critical user flow.
4. Test rollback in staging or dry-run mode when possible.
5. Document operational gaps and release blockers.

## Output

```markdown
## Infra QA Checklist
| Area | Check | Expected | Evidence | Priority |

## Rollout/Rollback Notes
1. ...
```

Do not expose secrets in outputs. Mask tokens, keys, and internal credentials.
