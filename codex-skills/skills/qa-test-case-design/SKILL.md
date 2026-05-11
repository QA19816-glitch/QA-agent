---
name: qa-test-case-design
description: Design detailed manual or executable test cases from requirements, prototypes, PRDs, user stories, APIs, bugs, or change notes. Use for equivalence classes, boundary values, decision tables, state transitions, pairwise combinations, scenario tests, negative tests, regression suites, smoke suites, and Feishu-style test case documents.
---

# QA Test Case Design

Use this skill when the user asks for full test cases, not just test points.

## Design Heuristics

- Start from user journeys, business rules, roles, states, data fields, and integrations.
- Use equivalence classes and boundary values for fields, limits, amounts, dates, files, lists, and pagination.
- Use decision tables for rule combinations and permission matrices.
- Use state transition tests for orders, approvals, payments, tickets, inventory, workflows, and async jobs.
- Add negative, abnormal, concurrency, duplicate submit, timeout, retry, rollback, stale data, and permission-bypass cases.
- Mark inferred cases when the requirement does not explicitly state the rule.
- Keep steps executable and expected results observable.

## Preferred Feishu Test Case Style

When generating test cases from requirements, default to the user's preferred structure:

1. Document title.
2. 文档信息.
3. 测试用例汇总.
4. Numbered module sections and subsections.
5. Each subsection contains a table with columns:
   `用例ID`、`用例名称`、`前置条件`、`测试步骤`、`预期结果`、`优先级`.

Number test steps and expected results inside cells. Avoid one giant table unless the user explicitly asks for it.

## Output Discipline

- Use stable IDs such as `TC-模块-001`.
- Priority: P0 core/blocking, P1 high-risk/common, P2 normal, P3 low-risk/edge.
- Include preconditions and test data.
- Keep each case focused on one outcome.
- For large deliverables, use `feishu-cloud-docs` by default when Feishu access is available.
