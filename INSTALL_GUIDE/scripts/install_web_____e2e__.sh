#!/usr/bin/env bash
set -euo pipefail
REPO_DIR="${1:-$(pwd)}"
DEST="${2:-$HOME/.openclaw/workspace/skills}"
mkdir -p "$DEST"
cp -R "$REPO_DIR/skills/qa-web-e2e-runner" "$DEST/"
cp -R "$REPO_DIR/skills/qa-browser-tester" "$DEST/"
cp -R "$REPO_DIR/skills/playwright-pro" "$DEST/"
cp -R "$REPO_DIR/skills/playwright-cli-openclaw" "$DEST/"
cp -R "$REPO_DIR/skills/visual-regression-testing" "$DEST/"
echo "Installed pack successfully to $DEST"
