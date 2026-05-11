---
name: qa-web-ui-testing
description: Validate web apps and websites with visible browser testing, exploratory testing, user-flow checks, forms, navigation, responsive layout, console/network evidence, screenshots, cross-browser checks, and UI regression risk analysis.
---

# QA Web UI Testing

Use this skill for browser-based product validation. For local or visible website testing, prefer the Codex in-app browser when available so the user can watch. Use terminal Playwright only when the user asks for CLI automation or the visible browser is unavailable.

## Coverage Model

- Navigation: landing routes, deep links, back/forward, auth redirects, empty/error states.
- Forms: required fields, validation copy, masks, upload limits, duplicate submit, disabled/loading states.
- Core flows: create, read, update, delete, search, filter, sort, export, payment/order/approval paths.
- State: refresh persistence, stale data, optimistic updates, offline/timeout behavior, concurrent edits.
- Layout: desktop/mobile breakpoints, text overflow, fixed toolbars, modals, drawers, toasts, keyboard focus.
- Evidence: screenshot, console errors, network failures, request/response snippets, environment and account.

## Workflow

1. Identify target URL, role/account, browser, viewport, and flow.
2. Smoke test page load, console, and obvious network errors.
3. Walk the happy path, then focused negative and boundary paths.
4. Re-check after navigation, refresh, and role switch when relevant.
5. Capture screenshot evidence for every defect or ambiguous UI behavior.

## Defect Notes

For each defect, write:

```markdown
1. 重现步骤:
2. 实际结果:
3. 预期结果:
4. 环境/账号:
5. 证据:
```

If filing to Zentao, use `qa-zentao-defect-workflow`.
