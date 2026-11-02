#!/usr/bin/env python3
"""Validate Markdown test-case deliverables produced by qa-test-case-design."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


FEISHU_COLUMNS = ["用例ID", "用例名称", "前置条件", "测试步骤", "预期结果", "优先级"]
CASE_ID_PATTERN = re.compile(r"\bTC-[A-Z0-9\u4e00-\u9fff]+-\d{3}\b")
PRIORITY_PATTERN = re.compile(r"\bP[0-3]\b")


def table_rows(text: str) -> list[str]:
    return [line.strip() for line in text.splitlines() if line.strip().startswith("|")]


def validate(path: Path, lightweight: bool) -> list[str]:
    text = path.read_text(encoding="utf-8", errors="strict")
    errors: list[str] = []

    required_sections = ["文档信息", "测试用例汇总"]
    if not lightweight:
        required_sections.extend(["追踪矩阵", "假设", "执行建议"])
    for section in required_sections:
        if section not in text:
            errors.append(f"缺少必要章节或内容：{section}")

    rows = table_rows(text)
    header = next((row for row in rows if all(column in row for column in FEISHU_COLUMNS)), None)
    if header is None:
        errors.append("未找到包含六个默认字段的飞书测试用例表头")

    case_ids = CASE_ID_PATTERN.findall(text)
    if not case_ids:
        errors.append("未找到符合 TC-MODULE-001 格式的用例 ID")
    elif len(case_ids) == len(set(case_ids)) and "追踪矩阵" in text and not lightweight:
        errors.append("追踪矩阵未再次引用任何用例 ID")

    if not PRIORITY_PATTERN.search(text):
        errors.append("未找到 P0-P3 优先级")

    if "符合预期" in text or "系统正常" in text:
        errors.append("预期结果包含不可判定的空泛表述")

    if "测试步骤" in text and not re.search(r"(?:^|<br>|\s)1[.、)]\s*\S+", text, re.MULTILINE):
        errors.append("测试步骤未检测到编号内容")

    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate a Feishu-style Markdown test-case document")
    parser.add_argument("path", type=Path, help="Markdown test-case document")
    parser.add_argument("--lightweight", action="store_true", help="Allow a reduced smoke-case document")
    args = parser.parse_args()

    if not args.path.is_file():
        print(f"ERROR: file not found: {args.path}", file=sys.stderr)
        return 2

    errors = validate(args.path, args.lightweight)
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1

    print(f"OK: {args.path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

