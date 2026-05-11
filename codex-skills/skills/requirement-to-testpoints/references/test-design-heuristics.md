# Test Design Heuristics

Use these prompts to broaden coverage without turning the output into full test cases.

## Functional And Validation

- Does each actor have a clear happy path?
- Which fields need type, length, format, required, uniqueness, and cross-field validation?
- What changes after create, edit, submit, approve, reject, publish, cancel, archive, or delete?
- Are UI permissions aligned with API permissions?

## Business Rules

- Convert every if/then, threshold, formula, quota, dependency, or status rule into a testable point.
- Check rule combinations, precedence, conflicts, defaults, rounding, and idempotency.
- Include examples for calculation or policy rules when the requirement gives numbers.

## Boundary Conditions

- Empty, null, missing, whitespace-only, duplicate, unsupported character, emoji, and very long text.
- Minimum, maximum, one below, one above, zero, negative, decimal, overflow, and large batch values.
- Start/end time, expired time, future time, cross-day, cross-month, leap day, time zone, and daylight-saving cases when time matters.

## Exception And Resilience

- Network interruption, API timeout, service unavailable, partial save, retry, rollback, and degraded dependency.
- Repeated click, duplicate submit, concurrent edit, stale page, revoked permission, and session expiration.
- Dirty data, missing related data, inconsistent upstream data, and empty result sets.

## Non-Functional

- Performance: response time, throughput, large data volume, import/export volume, and long-running tasks.
- Security: authorization bypass, privilege escalation, SQL injection, XSS, CSRF, sensitive data exposure, and audit logs.
- Compatibility: browser, mobile, locale, file format, and network condition.
- Usability and accessibility: error messages, keyboard flow, focus, screen-reader labels, and recovery guidance.
