#!/usr/bin/env bash
set -euo pipefail
REPO_DIR="${1:-$(pwd)}"
DEST="${2:-$HOME/.openclaw/workspace/skills}"
mkdir -p "$DEST"
cp -R "$REPO_DIR/skills/qa-bug-triage" "$DEST/"
cp -R "$REPO_DIR/skills/incident-fupan" "$DEST/"
cp -R "$REPO_DIR/skills/qa-release-gate-checker" "$DEST/"
cp -R "$REPO_DIR/skills/qa-regression-planner" "$DEST/"
cp -R "$REPO_DIR/skills/qa-traceability-mapper" "$DEST/"
echo "Installed pack successfully to $DEST"
