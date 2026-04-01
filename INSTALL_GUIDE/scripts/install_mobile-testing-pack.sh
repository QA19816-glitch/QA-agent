#!/usr/bin/env bash
set -euo pipefail
REPO_DIR="${1:-$(pwd)}"
DEST="${2:-$HOME/.openclaw/workspace/skills}"
mkdir -p "$DEST"
cp -R "$REPO_DIR/skills/mobile-appium-test" "$DEST/"
cp -R "$REPO_DIR/skills/android-adb" "$DEST/"
cp -R "$REPO_DIR/skills/ios-simulator" "$DEST/"
cp -R "$REPO_DIR/skills/testflight" "$DEST/"
cp -R "$REPO_DIR/skills/node-connect" "$DEST/"
echo "Installed successfully to $DEST"
