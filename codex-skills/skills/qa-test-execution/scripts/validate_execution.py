#!/usr/bin/env python3
"""Validate a qa-test-execution run before reporting completion."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any


TERMINAL = {"Pass", "Fail", "Blocked", "Skipped"}
SENSITIVE = re.compile(
    r"password|passwd|secret|token|authorization|cookie|set-cookie|api[-_]?key|session|credential",
    re.IGNORECASE,
)
SENSITIVE_TEXT = re.compile(
    r"(?:authorization|cookie|set-cookie|password|secret|token|api[-_]?key)\s*[:=]\s*\S+",
    re.IGNORECASE,
)


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def scan_sensitive(value: Any, path: str, errors: list[str]) -> None:
    if isinstance(value, dict):
        for key, child in value.items():
            if SENSITIVE.search(str(key)):
                errors.append(f"敏感字段：{path}.{key}")
            scan_sensitive(child, f"{path}.{key}", errors)
    elif isinstance(value, list):
        for index, child in enumerate(value):
            scan_sensitive(child, f"{path}[{index}]", errors)
    elif isinstance(value, str) and SENSITIVE_TEXT.search(value):
        errors.append(f"疑似敏感文本：{path}")


def validate(run_dir: Path, allow_incomplete: bool) -> list[str]:
    errors: list[str] = []
    manifest_path = run_dir / "manifest.json"
    results_path = run_dir / "results.jsonl"
    if not manifest_path.is_file():
        return ["缺少 manifest.json"]
    if not results_path.is_file():
        return ["缺少 results.jsonl"]

    try:
        manifest = load_json(manifest_path)
    except (OSError, json.JSONDecodeError) as exc:
        return [f"manifest.json 无效：{exc}"]
    required_manifest = {"run_id", "source_path", "environment", "fingerprint", "case_ids", "case_count"}
    missing = sorted(required_manifest - set(manifest))
    if missing:
        errors.append(f"manifest 缺少字段：{', '.join(missing)}")

    case_ids = manifest.get("case_ids", [])
    if not isinstance(case_ids, list) or len(case_ids) != len(set(case_ids)):
        errors.append("manifest.case_ids 无效或重复")
        case_ids = []
    if manifest.get("case_count") != len(case_ids):
        errors.append("manifest.case_count 与 case_ids 数量不一致")

    events: list[dict[str, Any]] = []
    for number, line in enumerate(results_path.read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip():
            continue
        try:
            event = json.loads(line)
        except json.JSONDecodeError as exc:
            errors.append(f"results.jsonl 第 {number} 行无效：{exc}")
            continue
        if not isinstance(event, dict):
            errors.append(f"results.jsonl 第 {number} 行不是对象")
            continue
        events.append(event)
        if event.get("case_id") not in case_ids:
            errors.append(f"第 {number} 行引用未知用例：{event.get('case_id')}")
        if event.get("status") not in TERMINAL | {"Running"}:
            errors.append(f"第 {number} 行状态无效：{event.get('status')}")
        if event.get("status") == "Fail" and not event.get("actual"):
            errors.append(f"{event.get('case_id')} Fail 缺少 actual")
        if event.get("status") == "Pass" and not event.get("actual"):
            errors.append(f"{event.get('case_id')} Pass 缺少 actual")
        if event.get("status") in {"Blocked", "Skipped"} and not event.get("reason"):
            errors.append(f"{event.get('case_id')} {event.get('status')} 缺少 reason")
        scan_sensitive(event, f"results[{number}]", errors)

    latest: dict[str, dict[str, Any]] = {}
    terminal_counts: dict[str, int] = {}
    for event in events:
        case_id = event.get("case_id")
        if case_id:
            latest[case_id] = event
        if event.get("status") in TERMINAL:
            terminal_counts[case_id] = terminal_counts.get(case_id, 0) + 1
    duplicates = sorted(case_id for case_id, count in terminal_counts.items() if count > 1)
    if duplicates:
        errors.append(f"用例存在多个终态记录，需显式新建 rerun：{', '.join(duplicates)}")

    incomplete = sorted(case_id for case_id in case_ids if latest.get(case_id, {}).get("status") not in TERMINAL)
    if incomplete and not allow_incomplete:
        errors.append(f"仍有未完成用例：{', '.join(incomplete)}")

    for event in latest.values():
        if event.get("status") == "Fail" and not event.get("evidence"):
            errors.append(f"{event.get('case_id')} Fail 缺少 evidence")
        for evidence in event.get("evidence", []):
            evidence_path = Path(evidence)
            resolved = evidence_path if evidence_path.is_absolute() else run_dir / evidence_path
            if not resolved.is_file():
                errors.append(f"{event.get('case_id')} 证据文件不存在：{evidence}")

    evidence_root = run_dir / "evidence"
    if evidence_root.is_dir():
        for evidence_file in evidence_root.rglob("*"):
            if not evidence_file.is_file() or evidence_file.stat().st_size > 2_000_000:
                continue
            if evidence_file.suffix.lower() not in {".txt", ".json", ".jsonl", ".log", ".md", ".har"}:
                continue
            try:
                content = evidence_file.read_text(encoding="utf-8", errors="ignore")
            except OSError as exc:
                errors.append(f"无法读取证据文件 {evidence_file.name}：{exc}")
                continue
            if SENSITIVE_TEXT.search(content):
                errors.append(f"证据文件疑似包含敏感文本：{evidence_file.relative_to(run_dir)}")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("run_dir", type=Path)
    parser.add_argument("--allow-incomplete", action="store_true")
    args = parser.parse_args()
    errors = validate(args.run_dir.resolve(), args.allow_incomplete)
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1
    print(f"OK: {args.run_dir.resolve()}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
