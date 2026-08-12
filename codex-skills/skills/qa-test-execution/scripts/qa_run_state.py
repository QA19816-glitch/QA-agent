#!/usr/bin/env python3
"""Create and update durable, append-only QA execution state."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


TERMINAL = {"Pass", "Fail", "Blocked", "Skipped"}
STATUSES = TERMINAL | {"Running"}
PRIORITIES = {"P0": 0, "P1": 1, "P2": 2, "P3": 3}
EXECUTORS = {"web", "api", "manual"}
INPUT_KINDS = {"requirements", "cases", "mixed"}
SAFETY_LEVELS = {"auto", "approval_required", "blocked"}
SENSITIVE = re.compile(
    r"password|passwd|secret|token|authorization|cookie|api[-_]?key|session|credential",
    re.IGNORECASE,
)
SENSITIVE_TEXT = re.compile(
    r"(?:authorization|cookie|set-cookie|password|secret|token|api[-_]?key)\s*[:=]\s*\S+",
    re.IGNORECASE,
)


def now() -> str:
    return datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds")


def read_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def canonical_hash(value: Any) -> str:
    payload = json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def validate_cases(data: Any) -> list[dict[str, Any]]:
    if not isinstance(data, dict) or not isinstance(data.get("cases"), list):
        raise ValueError("source must be a JSON object containing a cases array")
    cases = data["cases"]
    if not cases:
        raise ValueError("cases array is empty")

    seen: set[str] = set()
    required = ("case_id", "name", "steps", "expected", "priority", "executor")
    for index, case in enumerate(cases, 1):
        if not isinstance(case, dict):
            raise ValueError(f"case #{index} must be an object")
        missing = [key for key in required if not case.get(key)]
        if missing:
            raise ValueError(f"case #{index} missing fields: {', '.join(missing)}")
        case_id = str(case["case_id"])
        if case_id in seen:
            raise ValueError(f"duplicate case_id: {case_id}")
        seen.add(case_id)
        if not isinstance(case["steps"], list) or not all(str(x).strip() for x in case["steps"]):
            raise ValueError(f"{case_id}: steps must be a non-empty string array")
        if not isinstance(case["expected"], list) or not all(str(x).strip() for x in case["expected"]):
            raise ValueError(f"{case_id}: expected must be a non-empty string array")
        if case["priority"] not in PRIORITIES:
            raise ValueError(f"{case_id}: priority must be P0-P3")
        if case["executor"] not in EXECUTORS:
            raise ValueError(f"{case_id}: executor must be web, api, or manual")
        safety = case.get("safety", "auto")
        if safety not in SAFETY_LEVELS:
            raise ValueError(f"{case_id}: safety must be auto, approval_required, or blocked")
        if safety in {"approval_required", "blocked"} and not str(case.get("safety_reason", "")).strip():
            raise ValueError(f"{case_id}: {safety} requires safety_reason")
    return cases


def fingerprint(
    data: dict[str, Any],
    environment: str,
    input_kind: str,
    requirement_fingerprint: str,
) -> str:
    return canonical_hash(
        {
            "source": data,
            "environment": environment,
            "input_kind": input_kind,
            "requirement_fingerprint": requirement_fingerprint,
        }
    )


def load_events(run_dir: Path) -> list[dict[str, Any]]:
    path = run_dir / "results.jsonl"
    if not path.exists():
        return []
    events: list[dict[str, Any]] = []
    for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip():
            continue
        try:
            event = json.loads(line)
        except json.JSONDecodeError as exc:
            raise ValueError(f"invalid results.jsonl line {number}: {exc}") from exc
        if not isinstance(event, dict):
            raise ValueError(f"invalid results.jsonl line {number}: expected object")
        events.append(event)
    return events


def latest_events(events: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
    latest: dict[str, dict[str, Any]] = {}
    for event in events:
        case_id = event.get("case_id")
        if case_id:
            latest[str(case_id)] = event
    return latest


def atomic_write_json(path: Path, value: Any) -> None:
    temp = path.with_suffix(path.suffix + ".tmp")
    temp.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    os.replace(temp, path)


def find_run(output_root: Path, digest: str) -> Path | None:
    if not output_root.exists():
        return None
    for manifest_path in sorted(output_root.glob("*/manifest.json"), reverse=True):
        try:
            if read_json(manifest_path).get("fingerprint") == digest:
                return manifest_path.parent
        except (OSError, json.JSONDecodeError):
            continue
    return None


def cmd_init(args: argparse.Namespace) -> int:
    source = args.source.resolve()
    data = read_json(source)
    cases = validate_cases(data)
    requirement_fingerprint = args.requirement_fingerprint or data.get("requirement_fingerprint", "")
    if requirement_fingerprint and not re.fullmatch(r"[a-fA-F0-9]{64}", requirement_fingerprint):
        raise ValueError("requirement fingerprint must be a 64-character SHA-256")
    digest = fingerprint(data, args.environment, args.input_kind, requirement_fingerprint)
    root = args.output_root.resolve()
    existing = find_run(root, digest)
    if existing and not args.new_run:
        print(json.dumps({"run_dir": str(existing), "resumed": True, "fingerprint": digest}, ensure_ascii=False))
        return 0

    stamp = datetime.now().astimezone().strftime("%Y%m%d-%H%M%S")
    run_dir = root / f"{stamp}-{digest[:8]}"
    suffix = 1
    while run_dir.exists():
        run_dir = root / f"{stamp}-{digest[:8]}-{suffix}"
        suffix += 1
    (run_dir / "evidence").mkdir(parents=True)
    (run_dir / "results.jsonl").touch()
    manifest = {
        "schema_version": 2,
        "run_id": run_dir.name,
        "input_kind": args.input_kind,
        "source_path": str(source),
        "source_label": data.get("source", source.name),
        "source_version": data.get("version", ""),
        "requirement_source": args.requirement_source or data.get("requirement_source", ""),
        "requirement_fingerprint": requirement_fingerprint,
        "case_document_url": args.case_document_url or data.get("case_document_url", ""),
        "case_document_permission": args.case_document_permission,
        "environment": args.environment,
        "scope": args.scope,
        "fingerprint": digest,
        "started_at": now(),
        "case_count": len(cases),
        "case_ids": [case["case_id"] for case in cases],
    }
    atomic_write_json(run_dir / "manifest.json", manifest)
    print(json.dumps({"run_dir": str(run_dir), "resumed": False, "fingerprint": digest}, ensure_ascii=False))
    return 0


def source_cases(run_dir: Path) -> list[dict[str, Any]]:
    manifest = read_json(run_dir / "manifest.json")
    return validate_cases(read_json(Path(manifest["source_path"])))


def cmd_pending(args: argparse.Namespace) -> int:
    run_dir = args.run_dir.resolve()
    cases = source_cases(run_dir)
    latest = latest_events(load_events(run_dir))
    pending = [case for case in cases if args.rerun or latest.get(case["case_id"], {}).get("status") not in TERMINAL]
    if args.only_auto:
        pending = [case for case in pending if case.get("safety", "auto") == "auto"]
    pending.sort(key=lambda case: (PRIORITIES[case["priority"]], case["case_id"]))
    print(json.dumps({"cases": pending}, ensure_ascii=False, indent=2))
    return 0


def reject_sensitive(value: Any, path: str = "event") -> None:
    if isinstance(value, dict):
        for key, child in value.items():
            if SENSITIVE.search(str(key)):
                raise ValueError(f"sensitive field is not allowed: {path}.{key}")
            reject_sensitive(child, f"{path}.{key}")
    elif isinstance(value, list):
        for index, child in enumerate(value):
            reject_sensitive(child, f"{path}[{index}]")
    elif isinstance(value, str) and SENSITIVE_TEXT.search(value):
        raise ValueError(f"sensitive text is not allowed: {path}")


def cmd_record(args: argparse.Namespace) -> int:
    run_dir = args.run_dir.resolve()
    case_ids = {case["case_id"] for case in source_cases(run_dir)}
    if args.case_id not in case_ids:
        raise ValueError(f"unknown case_id: {args.case_id}")
    if args.status not in STATUSES:
        raise ValueError(f"invalid status: {args.status}")
    if args.status == "Fail" and not args.actual:
        raise ValueError("Fail requires --actual")
    if args.status in {"Blocked", "Skipped"} and not args.reason:
        raise ValueError(f"{args.status} requires --reason")
    if args.status == "Pass" and not args.actual:
        raise ValueError("Pass requires --actual")
    previous = latest_events(load_events(run_dir)).get(args.case_id)
    if previous and previous.get("status") in TERMINAL:
        raise ValueError(
            f"{args.case_id} already has terminal status {previous.get('status')}; "
            "create a new run for rerun"
        )

    event: dict[str, Any] = {
        "case_id": args.case_id,
        "status": args.status,
        "timestamp": now(),
    }
    optional = {
        "actual": args.actual,
        "reason": args.reason,
        "executor": args.executor,
        "duration_seconds": args.duration,
        "evidence": args.evidence,
        "bug_id": args.bug_id,
        "bug_url": args.bug_url,
        "notes": args.notes,
    }
    event.update({key: value for key, value in optional.items() if value not in (None, [], "")})
    reject_sensitive(event)
    with (run_dir / "results.jsonl").open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(event, ensure_ascii=False, separators=(",", ":")) + "\n")
        handle.flush()
        os.fsync(handle.fileno())
    print(json.dumps(event, ensure_ascii=False))
    return 0


def build_summary(run_dir: Path) -> dict[str, Any]:
    manifest = read_json(run_dir / "manifest.json")
    cases = source_cases(run_dir)
    latest = latest_events(load_events(run_dir))
    counts = Counter(event.get("status") for event in latest.values() if event.get("status") in TERMINAL)
    executed = counts["Pass"] + counts["Fail"]
    rate = None if executed == 0 else round(counts["Pass"] * 100 / executed, 2)
    pending = sum(1 for case in cases if latest.get(case["case_id"], {}).get("status") not in TERMINAL)
    summary = {
        "run_id": manifest["run_id"],
        "source": manifest.get("source_label"),
        "environment": manifest.get("environment"),
        "total": len(cases),
        "Pass": counts["Pass"],
        "Fail": counts["Fail"],
        "Blocked": counts["Blocked"],
        "Skipped": counts["Skipped"],
        "pending": pending,
        "pass_rate": rate,
    }
    return summary


def cmd_summary(args: argparse.Namespace) -> int:
    print(json.dumps(build_summary(args.run_dir.resolve()), ensure_ascii=False, indent=2))
    return 0


def parser() -> argparse.ArgumentParser:
    root = argparse.ArgumentParser(description=__doc__)
    sub = root.add_subparsers(dest="command", required=True)

    init = sub.add_parser("init", help="create or resume a run")
    init.add_argument("--source", required=True, type=Path)
    init.add_argument("--environment", required=True)
    init.add_argument("--input-kind", choices=sorted(INPUT_KINDS), default="cases")
    init.add_argument("--requirement-source", default="")
    init.add_argument("--requirement-fingerprint", default="")
    init.add_argument("--case-document-url", default="")
    init.add_argument(
        "--case-document-permission",
        choices=["full_access", "failed", "not_attempted"],
        default="not_attempted",
    )
    init.add_argument("--scope", default="all")
    init.add_argument("--output-root", type=Path, default=Path(".qa-runs"))
    init.add_argument("--new-run", action="store_true")
    init.set_defaults(func=cmd_init)

    pending = sub.add_parser("pending", help="print unfinished cases in priority order")
    pending.add_argument("run_dir", type=Path)
    pending.add_argument("--rerun", action="store_true")
    pending.add_argument("--only-auto", action="store_true", help="return only safety=auto cases")
    pending.set_defaults(func=cmd_pending)

    record = sub.add_parser("record", help="append a case state event")
    record.add_argument("run_dir", type=Path)
    record.add_argument("--case-id", required=True)
    record.add_argument("--status", required=True, choices=sorted(STATUSES))
    record.add_argument("--actual")
    record.add_argument("--reason")
    record.add_argument("--executor", choices=sorted(EXECUTORS))
    record.add_argument("--duration", type=float)
    record.add_argument("--evidence", action="append", default=[])
    record.add_argument("--bug-id")
    record.add_argument("--bug-url")
    record.add_argument("--notes")
    record.set_defaults(func=cmd_record)

    summary = sub.add_parser("summary", help="print latest result counts")
    summary.add_argument("run_dir", type=Path)
    summary.set_defaults(func=cmd_summary)
    return root


def main() -> int:
    try:
        args = parser().parse_args()
        return args.func(args)
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
