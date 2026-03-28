---
name: qa-api-runner
description: Generate, execute, and summarize API smoke, regression, and negative tests from API docs or endpoint descriptions. Use when the user asks to run API tests, validate endpoint behavior, exercise request/response contracts, verify auth and error handling, or turn API specs into executable checks.
---

# QA API Runner

Execute API checks carefully and leave reproducible evidence.

## Workflow

1. Confirm the execution target:
   - environment/base URL
   - auth method
   - safe-to-write scope
2. Prefer non-destructive checks first. Ask before destructive or irreversible actions.
3. Build a compact suite around:
   - contract / schema checks
   - status code and business code checks
   - required/optional parameter handling
   - boundary and negative inputs
   - auth/permission behavior
   - duplicate submit / idempotency when relevant
4. Record the exact request shape used, redacting secrets.
5. Summarize failures with enough detail for bug creation.

## Tooling guidance

- Prefer first-class tools if the environment provides them.
- Otherwise use safe command-line or script execution.
- Keep secrets out of logs and final output.
- Do not hit production with load-like loops unless explicitly approved.

## Resources

- Read `{baseDir}/references/api-assertion-rules.md` for assertion coverage.
- Read `{baseDir}/assets/api-result-template.md` for reporting format.
- Use `{baseDir}/scripts/api_smoke_runner.py` as a local scaffold when a simple request runner helps.
