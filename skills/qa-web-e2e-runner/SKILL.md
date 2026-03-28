---
name: qa-web-e2e-runner
description: Execute browser-based QA flows for web apps, capture assertions, screenshots, and failure evidence, and summarize end-to-end results. Use when the user asks to run UI smoke tests, verify business flows in a browser, regression-test key pages, or reproduce front-end issues with observable evidence.
---

# QA Web E2E Runner

Run critical UI flows with clear checkpoints and evidence.

## Workflow

1. Confirm the target site, environment, account, and allowed actions.
2. Prefer business-flow coverage over pixel-perfect nitpicks unless the request is visual QA.
3. For each flow, record:
   - precondition
   - user action
   - assertion point
   - evidence on failure
4. Capture screenshots when a failure or ambiguous state appears.
5. Distinguish product bugs from flaky environment/setup issues.

## Execution rules

- Prefer browser-native automation tools where available.
- Do not mutate production data without explicit approval.
- Avoid brittle assertions on timestamps, animation timing, or transient copy unless the user asked for that exact check.
- If login or MFA is required and not available, stop and report the blocker cleanly.

## Resources

- Read `{baseDir}/references/web-flow-patterns.md` for common flow coverage.
- Read `{baseDir}/references/ui-assertion-checklist.md` for assertion prompts.
- Read `{baseDir}/assets/e2e-result-template.md` for reporting format.
