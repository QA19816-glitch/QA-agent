# Feishu Execution Report Schema

Use `assets/report-template.md` and preserve this order:

1. Document title.
2. `文档信息`: source, environment, build/version, scope, executor, start/end time.
3. `测试执行汇总`: total, Pass, Fail, Blocked, Skipped, pass rate, final verdict.
4. Numbered module sections with result tables.
5. `缺陷汇总`: confirmed BUG ID, title, severity, priority, status, link.
6. `阻塞与遗留风险`.
7. `执行结论` and release recommendation.

For requirement-first or mixed runs, also include the requirement source, verified test-case document URL, generated/preserved/repaired/blocked case counts, and approval-required disposition.

Each result table uses:

| 用例ID | 用例名称 | 执行结果 | 实际结果 | 证据 | BUG | 执行方式 | 耗时 |

Calculate pass rate as `Pass / (Pass + Fail)`. Exclude `Blocked` and `Skipped` from the denominator and show `N/A` when no case was executed.

Evidence links must not expose local credentials or inaccessible temporary paths. Attach or upload material when the Feishu integration supports it; otherwise describe evidence and keep the local artifact path explicit.

Grant the configured user `full_access`. Report document creation and permission results separately.
