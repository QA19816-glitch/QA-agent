---
name: feishu-cloud-docs
description: Create, read, append, and permission Feishu/Lark cloud documents for reports, test results, execution summaries, QA deliverables, release notes, and stakeholder-ready documents. Use whenever the user asks for a report, test report, execution summary, QA deliverable, Feishu doc, cloud doc, or editable/shareable document.
---

# Feishu Cloud Docs

Default to Feishu cloud documents for reports and QA deliverables when Feishu access is configured.

## Required Behavior

- For reports, test results, execution summaries, and QA deliverables, create a Feishu cloud document by default whenever Feishu access is available.
- Grant the user editable/manage access by default. Prefer `full_access`; use `edit` only if full access is not supported for the target.
- Never claim a document was created, written, or permissioned unless the API call succeeded and returned a real token or URL.
- If permission grant is skipped because no trusted user identifier is configured, say that clearly and ask for a Feishu email, open_id, or user_id.
- Do not use browser automation to fake Feishu document writes.
- Treat permission changes as external sharing actions: confirm before granting access to a newly supplied identifier unless the user already requested that exact grant.

## Local Tool

Use a Codex-native helper when it is configured locally:

```bash
node "$CODEX_HOME/tools/feishu_doc_ops.mjs" check-config
node "$CODEX_HOME/tools/feishu_doc_ops.mjs" create-report <payload.json>
node "$CODEX_HOME/tools/feishu_doc_ops.mjs" fetch-docx <docx-url-or-token> [basename]
node "$CODEX_HOME/tools/feishu_doc_ops.mjs" add-permission-file <payload.json>
node "$CODEX_HOME/tools/feishu_doc_ops.mjs" list-permission-file <payload.json>
```

The helper reads credentials from `$CODEX_HOME/feishu.json` or `FEISHU_APP_ID` / `FEISHU_APP_SECRET`.

## Create Report Payload

Use `assets/create-report-payload.json` as the shape:

```json
{
  "title": "QA Test Report",
  "content": "# QA Test Report\n\nSummary...",
  "grant": {
    "member_type": "email",
    "member_id": "user@example.com",
    "perm": "full_access"
  }
}
```

If `grant` is omitted, the helper uses `defaultGrant` from `$CODEX_HOME/feishu.json` when configured.

## Permission Payload

Use `assets/permission-payload.json` as the shape. Valid `perm` values include `view`, `edit`, and `full_access`.

## Reporting Back

After a successful create/write, return the Feishu URL, document token, and permission result. If `permission.attempted` is false, state that the document exists but user access was not automatically granted.
