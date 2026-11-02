---
name: qa-security-testing
description: Plan safe security QA checks for authentication, authorization, sessions, access control, injection, XSS, CSRF, file upload, privacy, sensitive data exposure, audit logs, rate limits, and OWASP-style web/API risks. Use for defensive testing only.
---

# QA Security Testing

Use this skill for defensive security QA in authorized environments.

## Safety

- Test only systems the user is authorized to test.
- Prefer staging/test environments and safe test accounts.
- Do not provide exploit chains, persistence, evasion, credential theft, or destructive actions.
- Never expose real secrets or private data in reports.

## Coverage Model

- Auth/session: login, logout, expired token, refresh token, remember-me, device/session revocation.
- Authorization: role matrix, object-level access, tenant isolation, direct URL/API access, privilege downgrade.
- Input handling: SQL/NoSQL injection indicators, XSS output encoding, command/template injection risk.
- CSRF/CORS: unsafe methods, origin handling, preflight, cookies, SameSite.
- Upload/download: extension/MIME mismatch, file size, path traversal, preview safety, permissioned download.
- Sensitive data: logs, responses, browser storage, exports, screenshots, error messages.
- Abuse controls: rate limit, captcha, lockout, replay, idempotency, audit trail.

## Workflow

1. Define authorized scope, environment, account roles, and allowed intensity.
2. Build a risk-based checklist from data sensitivity and exposed attack surface.
3. Use safe probes and configuration review before any active testing.
4. Record reproducible evidence with minimal sensitive data.
5. Classify severity by impact, exploitability, affected users, and compensating controls.

## Output

```markdown
## Security QA Checklist
| Area | Scenario | Expected Control | Result | Severity |

## Findings
1. ...
```
