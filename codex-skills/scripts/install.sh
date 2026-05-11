#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUNDLE_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
SOURCE_DIR="${BUNDLE_DIR}/skills"
TARGET_CODEX_HOME="${CODEX_HOME:-${HOME}/.codex}"
TARGET_SKILLS_DIR="${TARGET_CODEX_HOME}/skills"

if [[ ! -d "${SOURCE_DIR}" ]]; then
  echo "Missing skills directory: ${SOURCE_DIR}" >&2
  exit 1
fi

mkdir -p "${TARGET_SKILLS_DIR}"

count=0
for skill_dir in "${SOURCE_DIR}"/*; do
  [[ -d "${skill_dir}" ]] || continue
  skill_name="$(basename "${skill_dir}")"
  rm -rf "${TARGET_SKILLS_DIR:?}/${skill_name}"
  cp -R "${skill_dir}" "${TARGET_SKILLS_DIR}/"
  count=$((count + 1))
done

echo "Installed ${count} Codex skills into ${TARGET_SKILLS_DIR}"
