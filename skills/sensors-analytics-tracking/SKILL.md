---
name: sensors-analytics-tracking
description: Plan, audit, and validate Sensors Analytics (神策) tracking for web, H5, app, and mini-program scenarios. Use when the user mentions 神策, Sensors Analytics, 埋点, 事件 tracking, event taxonomy, 埋点方案, 数据校验, 漏埋/错埋/重复埋点, funnel, conversion tracking, or wants to connect a product flow to 神策平台.
---

# Sensors Analytics Tracking

Use this skill when the task is specifically about **神策埋点设计、接入、联调、验收、回归**.

## What this skill covers

- Event taxonomy design
- Property naming conventions
- Page exposure / click / submit / success / failure events
- Identity stitching (`anonymous_id`, `distinct_id`, login merge)
- H5 / Web / App / Mini-program tracking differences
- 埋点漏报、重报、错报、时机错误排查
- 神策验收 checklist
- 与 QA 用例、回归计划联动

## Workflow

1. Clarify the business flow first.
2. Convert the flow into an event map:
   - page view / exposure
   - click / interaction
   - submit / request
   - success / failure
   - state transition
3. Define event properties with stable names and data types.
4. Check identity rules separately from event rules.
5. For QA validation, verify:
   - event fired
   - firing timing correct
   - property completeness
   - property values correct
   - duplicates / missing events
   - wrong distinct_id / account merge
6. End with a section named `神策验收结论`.

## Output rules

- Separate **埋点设计** from **埋点测试结果**.
- Do not mix business meaning and technical field names.
- Mark assumptions clearly when the product flow is incomplete.
- Prefer Chinese output unless the user requests English.

## Resources

- Read `{baseDir}/references/event-taxonomy.md` for naming guidance.
- Read `{baseDir}/references/sensors-qa-checklist.md` for QA validation checklist.
- Read `{baseDir}/assets/sensors-tracking-template.md` for a copy-paste template.
