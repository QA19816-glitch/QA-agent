---
name: qa-mobile-testing
description: Plan and execute mobile app QA for Android and iOS feature flows, installation, permissions, push notifications, deep links, offline behavior, network switching, app lifecycle, device compatibility, screenshots, logs, and store-release readiness.
---

# QA Mobile Testing

Use this skill for Android/iOS app validation. For Android emulator execution, combine with `android-emulator-qa` when installed.

## Coverage Model

- Install/update/uninstall: fresh install, upgrade, retained data, migration, app size, first launch.
- Permissions: camera, photos, location, notifications, contacts, Bluetooth, denial/retry/settings path.
- Lifecycle: cold start, background/foreground, process kill, rotation, low memory, logout/session expiry.
- Network: offline, weak network, switching Wi-Fi/cellular, retry, cache, conflict resolution.
- Device differences: screen size, density, notch/safe area, OS versions, manufacturer differences.
- Mobile features: push notification, deep links, biometrics, payment SDK, sharing, file picker, camera/gallery.
- Evidence: screenshots, screen recordings, logs, crash stack, device model, OS version, app build.

## Workflow

1. Identify app package/bundle, build version, environment, account, devices, and OS range.
2. Run install/launch smoke before feature testing.
3. Test the core feature flow on one reference device, then targeted compatibility checks.
4. Include lifecycle and network disruption around the riskiest step.
5. Capture device info, screenshots, logs, and exact steps for defects.

## Output

```markdown
## Mobile QA Coverage
| Area | Scenario | Device/OS | Expected | Priority |

## Evidence
- Screenshots:
- Logs:
- Build:
```
