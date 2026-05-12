#!/usr/bin/env bash
# Install Claude Code QA skills to ~/.claude/skills/
# Usage: bash scripts/install.sh [skill-name|all]

set -e

SKILLS_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="$HOME/.claude/skills"

install_skill() {
  local skill="$1"
  local src="$SKILLS_DIR/$skill"
  local dst="$TARGET/$skill"

  if [ ! -d "$src" ]; then
    echo "ERROR: skill '$skill' not found in $SKILLS_DIR"
    return 1
  fi

  mkdir -p "$TARGET"
  if [ -d "$dst" ]; then
    echo "SKIP (exists): $skill — remove $dst to reinstall"
  else
    cp -r "$src" "$dst"
    echo "INSTALLED: $skill"
  fi
}

# Determine what to install
if [ "${1:-}" = "all" ] || [ -z "${1:-}" ]; then
  echo "Installing all Claude Code QA skills to $TARGET"
  for skill_dir in "$SKILLS_DIR"/*/; do
    skill=$(basename "$skill_dir")
    [[ "$skill" == scripts ]] && continue
    [[ "$skill" == _lib ]] && continue
    install_skill "$skill"
  done
  # Always install _lib
  if [ -d "$SKILLS_DIR/_lib" ]; then
    mkdir -p "$TARGET"
    cp -r "$SKILLS_DIR/_lib" "$TARGET/_lib" 2>/dev/null || true
    echo "INSTALLED: _lib"
  fi
else
  install_skill "$1"
fi

echo ""
echo "Done. Restart Claude Code to activate skills."
