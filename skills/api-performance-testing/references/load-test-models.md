# API load test models

## 1. Smoke performance
- Small traffic
- Quick latency sanity check
- Validate script/auth/data first

## 2. Baseline load
- Stable expected business traffic
- Observe P95/P99 and error rate

## 3. Peak load
- Higher but realistic burst traffic
- Validate queueing, autoscaling, rate limits

## 4. Stress / break test
- Push beyond target until degradation
- Find throughput ceiling and failure mode

## 5. Endurance / soak
- Lower sustained traffic over longer time
- Detect leaks, retries, pool exhaustion, gradual slowdown
