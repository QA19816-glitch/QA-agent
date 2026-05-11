---
name: qa-requirement-traceability
description: Build and audit requirement traceability matrices linking requirements, user stories, acceptance criteria, test points, test cases, execution results, defects, risk, and release coverage.
---

# QA Requirement Traceability

Use this skill for 需求追踪, RTM, coverage audit, acceptance criteria mapping, and release evidence.

## Coverage Model

- Requirement item, source link, owner, status, acceptance criteria.
- Test point and detailed test case coverage.
- Execution result, build/environment, evidence, defect IDs.
- Risk priority and release gate impact.
- Gaps: uncovered requirement, untested acceptance criteria, orphan test case, unresolved defect.

## Workflow

1. Read requirements, stories, acceptance criteria, test cases, and execution records.
2. Normalize IDs and module names.
3. Map each requirement to test points/cases and execution evidence.
4. Mark gaps and inferred coverage clearly.
5. Produce a concise RTM and release-readiness summary.

## Output

```markdown
## Requirement Traceability Matrix
| Requirement | Acceptance criteria | Test cases | Result | Defects | Risk |

## Coverage Gaps
1. ...
```

For stakeholder deliverables, use `feishu-cloud-docs` by default when available.
