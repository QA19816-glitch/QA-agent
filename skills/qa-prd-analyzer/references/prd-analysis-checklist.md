# PRD analysis checklist

Use this checklist selectively, not mechanically.

## 1. Business intent
- What user problem is being solved?
- What is explicitly in scope?
- What is explicitly out of scope?
- What release/version is this tied to?

## 2. Users and permissions
- Which roles can access the feature?
- Which roles can create, edit, approve, delete, export, or view?
- Are there organization, tenant, or environment restrictions?

## 3. Entry points
- Where does the feature start from?
- Are there multiple entry paths?
- Are there deep links, notifications, or QR/code-based entry paths?

## 4. Core flow
- What is the happy path?
- What state changes happen?
- What data is created or mutated?
- What external dependencies participate?

## 5. Validation rules
- Required vs optional fields
- Length, format, range, and uniqueness constraints
- Permission and status gating
- Upload/download restrictions
- Time-based rules

## 6. State machine
- Draft / submitted / approved / rejected / cancelled / expired / deleted
- Allowed transitions
- Forbidden transitions
- Re-entry and retry behavior

## 7. Error handling
- Network failure
- Partial success
- Duplicate submit
- Timeout / retry
- Upstream dependency failure
- Permission revoked during operation

## 8. Observability and audit
- What should be logged?
- What user-facing messages should appear?
- Are audit records or notifications required?

## 9. Testability gaps
- Missing examples
- Undefined edge behavior
- No acceptance criteria
- Contradictions across documents
