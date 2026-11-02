---
name: qa-payment-order-testing
description: Test high-risk commerce flows including orders, carts, checkout, payments, refunds, subscriptions, coupons, inventory, invoices, reconciliation, callbacks, idempotency, fraud controls, and financial data correctness.
---

# QA Payment Order Testing

Use this skill for orders, membership purchases, checkout, payment, refund, subscription, and financial correctness.

## Coverage Model

- Cart/order: add/remove, quantity, SKU status, price changes, stock lock, order timeout, cancellation.
- Pricing: discounts, coupons, tax, shipping, currency, rounding, membership price, promotion conflicts.
- Payment: channel selection, success/failure/cancel, timeout, duplicate submit, callback delay, replay, idempotency.
- Fulfillment: entitlement delivery, inventory deduction/release, invoice, notification, order status transitions.
- Refund/after-sale: partial/full refund, repeated refund, original channel, entitlement rollback, reconciliation.
- Subscription: renewal, trial, upgrade/downgrade, grace period, cancellation, expired card.
- Data: ledger, payment records, order records, callback logs, audit trail, report totals.
- Risk: unauthorized order access, cross-user payment result, tampered amount, stale price.

## Workflow

1. Map the order/payment state machine.
2. Build cases around each state transition and external callback.
3. Use sandbox payment channels or mocks; never use real payment credentials unless explicitly authorized.
4. Verify UI/API response plus backend order/payment/entitlement records.
5. Reconcile totals and capture callback/request IDs for defects.

## Output

```markdown
## Commerce Test Matrix
| Flow | State | Scenario | Expected | Data check | Priority |

## Financial Risks
1. ...
```
