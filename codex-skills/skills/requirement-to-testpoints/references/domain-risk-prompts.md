# Domain Risk Prompts

Load this file when requirements touch common product domains. Add only relevant points.

## Orders, Inventory, And Payments

- Inventory reservation, release, oversell prevention, and stock rollback.
- Price, discount, coupon, tax, shipping fee, rounding, and currency calculations.
- Payment success, failure, timeout, callback duplication, reconciliation, refund, and chargeback flows.
- Order status transitions and forbidden transitions.

## File Upload And Content

- File type, size, extension spoofing, malware scanning, preview, download permission, and retention.
- Upload interruption, resume, duplicate files, concurrent upload, and storage quota.
- Content moderation, sensitive words, privacy visibility, deletion, and audit trail.

## Approval And Workflow

- Approval levels, delegation, withdrawal, rejection, resubmission, escalation, and timeout.
- Current approver versus historical approver permissions.
- State changes made in another session while the user is acting.

## Accounts, Roles, And Permissions

- Creator, owner, collaborator, admin, auditor, anonymous, and expired-user differences.
- Visibility versus edit permission.
- Export, download, share, invite, transfer, and delete authority.
- Backend API behavior when UI controls are hidden.

## Integration And APIs

- Third-party timeout, malformed response, duplicate callback, retry policy, rate limit, and circuit breaker behavior.
- Data mapping, required fields, enum drift, version compatibility, and eventual consistency.
- Webhook signature, replay protection, and idempotency key behavior.
