---
name: qa-specialist-orchestrator
description: Route broad QA requests to the right testing specialties and produce an end-to-end QA plan across functional, API, web, mobile, data, security, performance, automation, compatibility, accessibility, i18n, release regression, defect management, and AI/LLM testing. Use when the user asks for full QA coverage, test strategy, QA skill selection, testing capability planning, or multi-specialty QA work.
---

# QA Specialist Orchestrator

Use this skill when the task is broad, ambiguous, or spans multiple QA disciplines. Select the smallest set of relevant skills, then execute or delegate the work through those specialties.

## Default Routing

- Requirements to coverage: use `requirement-to-testpoints`, then `qa-test-case-design`.
- Requirement tracking and release evidence matrix: use `qa-requirement-traceability`.
- Test strategy, scope, risk, schedule, staffing, entry/exit criteria: use `qa-test-strategy`.
- Step-by-step test cases: use `qa-test-case-design`.
- API, contract, auth, idempotency, webhooks, Postman/curl checks: use `qa-api-testing`.
- Mocks, stubs, service virtualization, sandbox callbacks: use `qa-mock-service-testing`.
- Website or web app flow validation: use `qa-web-ui-testing` and prefer the visible in-app browser when available.
- Public website SEO checks: use `qa-seo-testing`.
- Android/iOS/mobile app testing: use `qa-mobile-testing`; for Android emulator execution, also use `android-emulator-qa` if installed.
- Database, backend jobs, data reconciliation, migrations: use `qa-data-backend-testing`.
- Analytics events, BI dashboards, funnels, A/B experiments: use `qa-analytics-tracking-testing`.
- Security and privacy checks: use `qa-security-testing`.
- Performance/load: use `jmeter-performance-testing`; for Android profiling, use `android-performance` if installed.
- Reliability, failover, timeout, retry, recovery drills: use `qa-reliability-resilience-testing`.
- Logs, metrics, traces, alerts, auditability, dashboards: use `qa-observability-testing`.
- Automated test architecture, flaky tests, CI quality gates: use `qa-automation-engineering`.
- Compatibility, accessibility, localization, timezone/currency/language: use `qa-compatibility-accessibility-i18n`.
- Desktop client install/update/native integration: use `qa-desktop-client-testing`.
- Cloud infrastructure, deployment, config, IAM, rollback: use `qa-cloud-infra-testing`.
- Test environment readiness, accounts, data, feature flags, platform support: use `qa-test-environment-platform`.
- Orders, payments, refunds, subscriptions, reconciliation: use `qa-payment-order-testing`.
- Release smoke, regression, UAT, go/no-go: use `qa-release-regression`.
- Online巡检, canary, production verification, post-release monitoring: use `qa-production-inspection`.
- Defect filing, reproduction evidence, Zentao workflow: use `qa-zentao-defect-workflow`.
- AI/LLM feature testing, prompt quality, hallucination, evals: use `qa-ai-llm-testing`.
- QA reports, execution summaries, or deliverables: use `feishu-cloud-docs` by default when Feishu access is available.

## Workflow

1. Clarify or infer the product type, environment, target users, risk level, and release stage.
2. Build a concise specialty map: what to test, why it matters, which skill owns it, and expected evidence.
3. Identify blockers: missing requirements, accounts, test data, environment, monitoring, tools, or permissions.
4. Execute the highest-risk or user-requested specialty first.
5. Produce a practical output: coverage matrix, test plan, test cases, execution report, bug list, or release verdict.

## Output Shape

For broad planning, use:

```markdown
## QA Specialty Coverage
| Area | Scope | Priority | Skill | Evidence |

## Risks And Gaps
1. ...

## Next Execution Order
1. ...
```

Keep the result actionable. Do not create every possible artifact unless the user asks for a full QA package.
