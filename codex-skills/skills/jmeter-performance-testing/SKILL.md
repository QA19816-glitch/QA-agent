---
name: jmeter-performance-testing
description: Use when the user asks for Apache JMeter, JMeter, JMX, JTL, .jmx plans, .jtl result analysis, non-GUI load tests, stress tests, spike tests, soak tests, capacity tests, ramp-up design, thread groups, timers, assertions, or JMeter HTML reports.
---

# JMeter Performance Testing

Use this skill for Apache JMeter planning, JMX review, command-line execution, result analysis, and QA release reporting.

## Safety

- Do not run meaningful load against production or shared test systems until the user confirms the target, concurrency, ramp-up, duration, and acceptable risk.
- Start with a low-risk smoke load before a larger load, stress, spike, or soak run.
- Never put real passwords, tokens, payment data, or personal data into a JMX, CSV data file, command history, or report. Ask for test credentials or a safe token handoff when needed.
- If JMeter, Java, plugins, or browser drivers are missing, report the gap. Do not install software or plugins without user approval.
- Preserve user JMX files. If editing a plan, make a copy or keep changes scoped and explain them.

## Required Context

Collect or infer:

- Target environment and base URL
- Test goal: smoke, load, stress, spike, soak, capacity, or regression benchmark
- Business flows or API endpoints
- Auth method and test data source
- Virtual users, ramp-up, duration, think time, and expected throughput
- SLO/SLA thresholds: error rate, p95/p99 latency, throughput, resource ceilings
- Monitoring source: Grafana, Prometheus, APM, logs, database metrics, or none

If details are missing, propose a conservative default:

- Smoke: 1-5 users, 1-3 minutes
- Load baseline: 10-50 users, 5-15 minutes
- Ramp-up: at least 1-5 minutes unless the goal is spike testing
- Pass gate: HTTP errors under 1%, p95 latency within the agreed threshold, no obvious server saturation

## Workflow

1. Define the test model.
   - Map real user journeys or endpoint groups.
   - Separate read, write, login, search, order, payment mock, and admin flows when relevant.
   - Identify data dependencies and cleanup needs.

2. Review or build the JMX.
   - Use Thread Group, HTTP Request Defaults, Header Manager, Cookie Manager, Cache Manager, CSV Data Set Config, Timers, Assertions, and Summary/Aggregate reporting.
   - Avoid GUI-only listeners such as View Results Tree in load runs.
   - Add response assertions for business success, not only HTTP 200.
   - Use realistic think time and ramp-up instead of all users firing at once.

3. Run from CLI.
   - Prefer non-GUI mode:

```bash
jmeter -n -t test-plan.jmx -l results/run.jtl -j results/jmeter.log -e -o results/html
```

   - Generate an HTML report from an existing JTL:

```bash
jmeter -g results/run.jtl -o results/html
```

   - Use timestamped output directories and keep raw JTL, JMeter log, HTML report, and environment notes together.

4. Analyze results.
   - Report samples, throughput, average, median, p90, p95, p99, min/max, error rate, top failing samplers, and observed bottlenecks.
   - Compare against SLO/SLA and previous baselines when available.
   - Correlate with backend metrics: CPU, memory, GC, DB slow queries, cache hit rate, queue lag, error logs, and network saturation.

5. Deliver QA output.
   - State scope, environment, run time, load model, pass/fail verdict, key metrics, defects, risks, and next actions.
   - For defects, include clear reproduction steps, actual result, expected result, evidence files, and suggested severity.

## JMX Review Checklist

- Thread count, ramp-up, loop count, scheduler duration match the stated goal.
- HTTP defaults avoid duplicated host/protocol values across samplers.
- Headers include content type, auth, app version, user agent, and required tracing IDs where applicable.
- CSV data has enough rows for the planned concurrency and loop count.
- Assertions validate response code and business content.
- Timers model real pacing and avoid accidental over-pressure.
- Extractors handle tokens, IDs, and dynamic values reliably.
- Error handling does not hide failures.
- Reports and listeners are suitable for non-GUI execution.

## Output Format

Use this concise structure unless the user asks for another format:

```markdown
## JMeter Test Summary
Target:
Goal:
Load model:
Duration:
Result: Pass/Fail/Blocked

### Key Metrics
- Samples:
- Throughput:
- Error rate:
- Latency p50/p90/p95/p99:

### Findings
1. ...

### Evidence
- JTL:
- HTML report:
- Logs:

### Next Actions
1. ...
```
