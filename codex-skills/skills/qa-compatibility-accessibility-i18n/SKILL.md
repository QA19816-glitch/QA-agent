---
name: qa-compatibility-accessibility-i18n
description: Test compatibility, accessibility, localization, internationalization, responsive behavior, browser/device matrix, assistive technology basics, keyboard navigation, color contrast, language expansion, timezone, currency, number/date formats, and RTL or multilingual UI risks.
---

# QA Compatibility Accessibility I18n

Use this skill for quality dimensions that vary by environment, ability, language, and locale.

## Compatibility

- Browsers: Chrome, Safari/WebKit, Firefox, Edge when relevant.
- Devices: desktop, tablet, mobile; common screen sizes and DPR.
- OS: Windows/macOS/iOS/Android versions by user base.
- Network and hardware: slow network, low memory, high latency, touch vs mouse/keyboard.

## Accessibility

- Keyboard-only navigation, visible focus, logical tab order, no keyboard traps.
- Labels, names, roles, alt text, form errors, modals/dialog focus.
- Contrast, text scaling, reduced motion, screen reader basics.
- Touch target size and non-color-only status indicators.

## Localization And I18n

- Text expansion/contraction, truncation, line breaks, mixed language UI.
- Date/time/timezone, currency, decimals, thousands separators, units.
- Sorting/search behavior for non-English text.
- Encoding, emoji, special characters, RTL if supported.
- Language switch persistence and fallback behavior.

## Output

```markdown
## Matrix
| Dimension | Target | Scenario | Expected | Priority |

## Issues
1. ...
```

For web UI verification, combine with `qa-web-ui-testing`; for mobile devices, combine with `qa-mobile-testing`.
