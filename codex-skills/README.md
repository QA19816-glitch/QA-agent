# Codex QA Skills

This folder records the Codex skills exported from a local QA-focused Codex setup.
Share this folder or repository link with another Codex user so they can install the same skill set.

## What Is Included

- QA strategy, test case design, requirement-to-test-point extraction, and traceability skills.
- Web UI, API, mobile, Android emulator, performance, security, compatibility, i18n, data, release, production inspection, and observability QA skills.
- Feishu/Lark document workflow guidance.
- Zentao defect workflow guidance.
- Playwright, PDF, JMeter, and web article extraction helper skills.

See [MANIFEST.md](MANIFEST.md) for the full list.

## Install

From the repository root:

```bash
bash codex-skills/scripts/install.sh
```

By default this copies the bundled skills into:

```bash
~/.codex/skills
```

To install into another Codex home:

```bash
CODEX_HOME=/path/to/.codex bash codex-skills/scripts/install.sh
```

## Notes

- Credentials are not included. Feishu/Lark, Zentao, browser sessions, and project-specific helper scripts must be configured locally by each user.
- Existing skills with the same folder names are replaced during installation.
- System skills under `~/.codex/skills/.system` are intentionally not exported.
- These skills are plain text workflows and helper scripts. Review them before installing in a shared or production environment.
