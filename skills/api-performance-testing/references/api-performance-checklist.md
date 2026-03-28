# API performance checklist

## Before test
- Confirm environment and auth
- Confirm safe traffic cap
- Confirm test data and cleanup plan
- Confirm whether write endpoints are allowed

## During test
- Response time P50/P95/P99
- Error ratio and timeout ratio
- Status code distribution
- Business success ratio
- CPU / memory / DB / cache / downstream indicators if available

## After test
- Identify bottleneck endpoints
- Compare against SLA / target
- Separate infra bottleneck from app bottleneck
- Record reproducible scenario parameters
