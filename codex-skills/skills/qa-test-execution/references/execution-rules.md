# Execution Rules

## Classification

- `web`: steps can be completed through a browser and results are observable in UI or browser telemetry.
- `api`: steps define or can safely derive an HTTP request and observable response/business effect.
- `manual`: native device, hardware, visual judgment, external approval, or another executor is required.

When classification is uncertain, use `manual` and mark the case `Blocked` with the missing information.

## Preflight

1. Confirm source revision, environment, build/version, role, and scope.
2. Check environment reachability without changing application state.
3. Reuse authenticated sessions. Ask for login only when the session is actually expired.
4. Identify destructive or external side effects before execution.
5. Establish stable test data; never use production personal, payment, or credential data.

## Web Execution

- Use the visible in-app browser so the user can watch execution.
- Set locale `zh-CN`, `Accept-Language: zh-CN,zh;q=0.9`, and timezone `Asia/Shanghai` where context settings are available.
- Perform normal user input and semantic locator actions. DOM mutation does not count as execution evidence.
- Record meaningful console errors and failed requests, but do not treat unrelated noise as a failure.
- Capture a focused screenshot for a confirmed UI failure. Include enough context to identify page and state.

## API Execution

- Record method, sanitized URL, sanitized headers, sanitized request body, status, and relevant response body.
- Verify status, response schema/business fields, and persistent/downstream effects when accessible.
- Do not retry non-idempotent requests unless the case explicitly permits it.
- Redact keys matching password, secret, token, authorization, cookie, set-cookie, api-key, session, credential, email, phone, or identity fields.

## Result Recording

Record one event after every meaningful transition. Terminal events require:

- `Pass`: concise observed result.
- `Fail`: actual result and at least one evidence reference.
- `Blocked`: concrete prerequisite or executor gap.
- `Skipped`: explicit scope reason.

Durations are measured in seconds. Evidence paths should be relative to the run directory when possible.

## Failure Confirmation

Reproduce a failure once only when safe. Do not repeat irreversible or high-impact actions. Compare the actual result with the exact source expectation, check relevant console/network data, and distinguish product defect from environment instability, invalid data, expired authentication, and requirement ambiguity.

Only confirmed product failures proceed to One2All.
