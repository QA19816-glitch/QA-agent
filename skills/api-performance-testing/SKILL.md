---
name: api-performance-testing
description: Plan, execute, and analyze API performance and load testing for REST and HTTP services using k6, Locust, or Newman-compatible workflows. Use when the user mentions 接口性能, 压测, load test, stress test, benchmark, throughput, latency, TPS, QPS, 并发, API bottleneck, slow endpoints, rate limits, or wants structured API performance validation before release.
---

# API Performance Testing

Use this skill for **接口性能测试 / 压测设计 / 压测结果分析 / 接口性能回归**.

## Workflow

1. Clarify the test target first:
   - environment
   - base URL
   - auth mode
   - safe traffic limit
   - read-only or write path
2. Define the performance goal before testing:
   - latency target (P50 / P95 / P99)
   - TPS / QPS target
   - concurrency target
   - error-rate threshold
3. Split scenarios into layers:
   - smoke performance check
   - baseline load
   - peak load
   - stress / break point
   - endurance / soak
4. Identify critical assertions:
   - status code stability
   - business success ratio
   - timeout ratio
   - latency percentile
   - bottleneck endpoint
5. Output both **test design** and **result interpretation**.

## Output rules

- Distinguish functional API correctness from performance behaviour.
- Do not recommend destructive load on production unless explicitly approved.
- Redact tokens and secrets.
- End with a section named `性能结论与风险`.

## Resources

- Read `{baseDir}/references/load-test-models.md` for scenario design.
- Read `{baseDir}/references/api-performance-checklist.md` for validation checklist.
- Read `{baseDir}/assets/api-performance-template.md` for output format.
