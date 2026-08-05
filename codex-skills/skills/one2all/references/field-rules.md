# One2 Field Rules

Read this reference before creating or editing a One2 BUG.

## Field Mapping

| One2 field | Rule |
| --- | --- |
| `title` | One leading `【Codex自动化】`; concise; no timestamp, run ID, random suffix, or second bracketed scope marker |
| `requirement_id` | Auto-select only one unique high-confidence match supported by project scope and defect evidence; ask when ambiguous |
| `bug_type` | Infer from evidence; otherwise keep the platform default `code_error` |
| `severity_key` | Select from the impact matrix below; never default mechanically |
| `priority`, `priority_key` | Select from urgency below; keep both values aligned |
| `due_date` | `null` unless explicitly provided |
| `found_environment` | Known actual environment, otherwise exact value `test` |
| `operating_system` | Actual environment evidence only |
| `browser` | Actual environment evidence only |
| `assignee_user_id` | `null` unless explicitly provided |
| `reproduction_steps` | Concise rich text with `[步骤]`, `[实际结果]`, `[期望结果]` |
| `actual_result` | Same fact as the actual-result section |
| `expected_result` | Same fact as the expected-result section |
| `reproduction_materials` | Platform-returned material URLs only |

## Requirement Association

Resolve the requirement from evidence instead of selector order or name similarity.

Use these signals together:

- explicit project set, project, requirement name, requirement link, or scope supplied by the user;
- affected function and business module;
- title, minimum reproduction path, actual result, and expected result;
- requirement project, version, module, title, description, and acceptance scope;
- screenshots, logs, test cases, or requirement documents that establish ownership.

Automatically associate a requirement only when one candidate is uniquely supported, its project scope matches, its functional meaning matches the defect, and no other candidate is comparably plausible. Generic words such as `测试`, `优化`, `登录`, or `异常` are never sufficient by themselves.

Stop and ask the user to choose when candidates are tied, cross-project, weakly supported, or cannot be distinguished from the available facts. Never choose the first item, newest item, most recently used item, form default, or superficially most similar title.

Before submission, verify the displayed project set/project/requirement path. After submission, re-read the saved detail and confirm the persisted requirement is identical. Repair and re-check any missing or mismatched value; otherwise report the submission as incomplete.

## Severity

Severity measures impact, not scheduling.

| Key | Label | Use when |
| --- | --- | --- |
| `p0` | 致命 | Core service is unavailable; serious data destruction; major security, money, or compliance risk; broad impact with no viable workaround |
| `p1` | 严重 | A core business flow is blocked; key functionality is broadly unavailable; many users or a key business goal are affected; no effective workaround |
| `p2` | 一般 | A non-core or local function is wrong or impaired; scope is limited; an acceptable workaround exists |
| `p3` | 轻微 | Copy, styling, minor interaction, or a rare edge case is affected without changing the main result or blocking the core flow |

Before selecting a level, assess affected users/data, core-flow blockage, data/money/security risk, frequency, and workaround availability. Ask the user if these facts remain insufficient.

## Priority

Priority measures repair urgency and is independent of severity.

| Key | Label | Use when |
| --- | --- | --- |
| `urgent` | 紧急 | Release blocking, active core incident, security/data/money risk, or immediate containment is required |
| `high` | 高 | Current-iteration core goal or important business flow is materially affected, or a high-frequency user problem needs priority repair |
| `medium` | 中 | Ordinary limited-impact defect with a workaround; normal iteration scheduling is acceptable |
| `low` | 低 | Minor experience issue, rare edge case, or optimization suitable for later backlog |

Do not mechanically bind the two dimensions. Valid combinations can include `p0 / high` for rare but destructive risk and `p3 / high` for a high-frequency minor experience defect.

## Reproduction Template

```text
[步骤]
1. <minimum deterministic step>
2. <trigger>

[实际结果]
<observed result>

[期望结果]
<expected behavior>
```
