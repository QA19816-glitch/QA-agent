---
name: qa-desktop-client-testing
description: Test desktop client apps on macOS, Windows, or Linux including install/update/uninstall, permissions, file handling, tray/menu behavior, shortcuts, offline mode, crash logs, auto-update, signing/notarization, native integrations, and cross-OS compatibility.
---

# QA Desktop Client Testing

Use this skill for Electron, native, or desktop-installed apps.

## Coverage Model

- Install/update/uninstall: fresh install, upgrade, downgrade block, retained config, cleanup.
- OS integration: menu bar, tray, dock/taskbar, shortcuts, file associations, notifications, startup item.
- Permissions: filesystem, camera, microphone, screen recording, accessibility, network, keychain/credential store.
- App lifecycle: launch, quit, relaunch, crash recovery, multiple windows, sleep/wake, offline/online.
- Files: open/save/export/import, drag/drop, path with spaces/non-ASCII, large files, permission-denied paths.
- Auto-update: update prompt, download failure, rollback, signed package, notarization/Gatekeeper.
- Evidence: OS version, app version/build, logs, crash reports, screenshots/recordings.

## Workflow

1. Identify OS targets, app package, build channel, and install method.
2. Run install/launch smoke and permission prompts first.
3. Validate core workflow plus OS integration.
4. Test update and crash/log evidence if release readiness is in scope.
5. Capture reproducible defects with environment and artifacts.

## Output

```markdown
## Desktop QA Matrix
| OS | Scenario | Expected | Result | Evidence |
```
