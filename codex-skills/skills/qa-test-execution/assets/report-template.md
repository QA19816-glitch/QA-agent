# {{TITLE}}

## 文档信息

| 项目 | 内容 |
|---|---|
| 用例来源 | {{SOURCE}} |
| 需求来源 | {{REQUIREMENT_SOURCE}} |
| 测试用例文档 | {{CASE_DOCUMENT_URL}} |
| 测试环境 | {{ENVIRONMENT}} |
| 构建/版本 | {{VERSION}} |
| 执行范围 | {{SCOPE}} |
| 执行时间 | {{STARTED_AT}} - {{FINISHED_AT}} |

## 测试执行汇总

| 总数 | Pass | Fail | Blocked | Skipped | 通过率 | 结论 |
|---:|---:|---:|---:|---:|---:|---|
| {{TOTAL}} | {{PASS}} | {{FAIL}} | {{BLOCKED}} | {{SKIPPED}} | {{PASS_RATE}} | {{VERDICT}} |

生成 {{GENERATED}} 条，保留 {{PRESERVED}} 条，修复 {{REPAIRED}} 条，待授权 {{APPROVAL_REQUIRED}} 条。

## 1. 分模块执行结果

| 用例ID | 用例名称 | 执行结果 | 实际结果 | 证据 | BUG | 执行方式 | 耗时 |
|---|---|---|---|---|---|---|---:|
{{RESULT_ROWS}}

## 2. 缺陷汇总

{{BUG_SUMMARY}}

## 3. 阻塞与遗留风险

{{RISKS}}

## 4. 执行结论

{{CONCLUSION}}
