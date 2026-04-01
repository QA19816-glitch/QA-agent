#!/usr/bin/env bash
set -euo pipefail
REPO_DIR="${1:-$(pwd)}"
DEST="${2:-$HOME/.openclaw/workspace/skills}"
mkdir -p "$DEST"
cp -R "$REPO_DIR/skills/qa-api-runner" "$DEST/"
cp -R "$REPO_DIR/skills/openclaw-api-tester" "$DEST/"
cp -R "$REPO_DIR/skills/api-performance-testing" "$DEST/"
cp -R "$REPO_DIR/skills/postman" "$DEST/"
cp -R "$REPO_DIR/skills/openapi-spec" "$DEST/"
echo "Installed successfully to $DEST"
