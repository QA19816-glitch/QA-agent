---
name: qa-test-strategy
description: Create QA test strategies, test plans, coverage models, risk matrices, entry and exit criteria, environment plans, test data plans, and QA schedules for product releases, projects, features, migrations, integrations, and high-risk changes.
---

# QA Test Strategy

Use this skill to turn a release, feature, migration, or project into a practical QA strategy.

## Inputs To Gather

- Product/module, release goal, target users, supported platforms, and environments.
- Requirement links, designs, API docs, data changes, dependencies, and known risks.
- Release stage: discovery, development, SIT, UAT, pre-release, production verification.
- Constraints: deadline, QA capacity, environment stability, test data, account permissions.
- Quality bars: severity thresholds, SLO/SLA, compliance needs, rollback conditions.

## Strategy Workflow

1. Define scope: in scope, out of scope, assumptions, dependencies.
2. Rank risks by user impact, business impact, technical complexity, change size, reversibility, and historical defects.
3. Choose test layers: unit evidence, API, integration, UI, data, performance, security, compatibility, accessibility, observability, release verification.
4. Map coverage to requirements and risks. Separate explicit requirements from inferred QA risks.
5. Define environments, test data, accounts, mocks, monitoring, and evidence artifacts.
6. Set entry criteria, exit criteria, suspension/resumption criteria, and go/no-go rules.
7. Produce an execution sequence that starts with smoke and high-risk paths before broad regression.

## Output

Use concise tables:

```markdown
## Test Strategy
Objective:
Scope:
Out of scope:
Assumptions:

## Risk Matrix
| Risk | Impact | Probability | Priority | Test response |

## Test Layers
| Layer | Coverage | Owner | Evidence |

## Entry/Exit Criteria
| Type | Criteria |

## Execution Plan
1. ...
```

When the user asks for a report or QA deliverable, create a Feishu cloud document if access is available.
