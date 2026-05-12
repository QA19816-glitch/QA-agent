#!/usr/bin/env python3
"""
Feishu helper for Claude Code QA pipeline.

Wraps the minimal subset of Feishu Open Platform APIs that the migrated codex
QA skills expect: create / read / write / append / list_blocks for docx, plus
permission grant.

Defaults: every created document automatically grants "full_access" (admin) to
大王's open_id (ou_f0136616b2e5fcdd98a977e75fb9e2d0).

Usage:
  feishu.py create --title "QA 测试报告" [--folder <fldcnXXX>] [--content <markdown>] [--no-grant]
  feishu.py read --doc-token <tok>
  feishu.py append --doc-token <tok> --content <markdown>
  feishu.py grant --doc-token <tok> --open-id <ou_xxx> [--perm full_access|edit|view]
  feishu.py token   # dump a tenant_access_token (debug)

Output is JSON on stdout. Non-zero exit on error.

Credentials are read from /Users/jiguang/.openclaw/openclaw.json
(channels.feishu.accounts.default).
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

OPENCLAW_CONFIG = Path("/Users/jiguang/.openclaw/openclaw.json")
DEFAULT_OWNER_OPEN_ID = "ou_f0136616b2e5fcdd98a977e75fb9e2d0"
TOKEN_CACHE = Path.home() / ".claude" / "cache" / "feishu_token.json"
FEISHU_BASE = "https://open.feishu.cn/open-apis"


def load_creds() -> tuple[str, str]:
    data = json.loads(OPENCLAW_CONFIG.read_text())
    acc = data["channels"]["feishu"]["accounts"]["default"]
    return acc["appId"], acc["appSecret"]


def http(method: str, url: str, *, token: str | None = None, json_body=None, params=None):
    if params:
        url = f"{url}?{urllib.parse.urlencode(params)}"
    headers = {"Content-Type": "application/json; charset=utf-8"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    body = json.dumps(json_body).encode() if json_body is not None else None
    req = urllib.request.Request(url, data=body, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            raw = resp.read().decode()
    except urllib.error.HTTPError as e:
        raw = e.read().decode()
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return {"_raw": raw}


def tenant_token() -> str:
    if TOKEN_CACHE.exists():
        try:
            c = json.loads(TOKEN_CACHE.read_text())
            if c.get("expire_at", 0) > time.time() + 60:
                return c["token"]
        except Exception:
            pass
    app_id, app_secret = load_creds()
    r = http(
        "POST",
        f"{FEISHU_BASE}/auth/v3/tenant_access_token/internal",
        json_body={"app_id": app_id, "app_secret": app_secret},
    )
    if r.get("code") != 0:
        raise SystemExit(f"tenant_access_token failed: {r}")
    TOKEN_CACHE.parent.mkdir(parents=True, exist_ok=True)
    TOKEN_CACHE.write_text(
        json.dumps({"token": r["tenant_access_token"], "expire_at": time.time() + r.get("expire", 7200) - 120})
    )
    return r["tenant_access_token"]


def create_doc(title: str, folder_token: str | None) -> dict:
    tok = tenant_token()
    body = {"title": title}
    if folder_token:
        body["folder_token"] = folder_token
    r = http("POST", f"{FEISHU_BASE}/docx/v1/documents", token=tok, json_body=body)
    if r.get("code") != 0:
        raise SystemExit(f"create doc failed: {r}")
    doc = r["data"]["document"]
    return doc  # {document_id, revision_id, title}


def grant_perm(doc_token: str, open_id: str, perm: str = "full_access") -> dict:
    tok = tenant_token()
    r = http(
        "POST",
        f"{FEISHU_BASE}/drive/v1/permissions/{doc_token}/members",
        token=tok,
        params={"type": "docx", "need_notification": "false"},
        json_body={"member_type": "openid", "member_id": open_id, "perm": perm, "type": "user"},
    )
    return r


HEADING_BLOCK_TYPES = {"#": 3, "##": 4, "###": 5, "####": 6, "#####": 7, "######": 8}
# Feishu docx block_type: 2=text, 3-8=heading1-6, 12=bullet, 13=ordered, 14=code, 15=quote


def _line_to_block(line: str) -> dict:
    s = line.rstrip()
    # Heading
    for mark, bt in HEADING_BLOCK_TYPES.items():
        if s.startswith(mark + " "):
            text = s[len(mark) + 1:]
            key = f"heading{bt - 2}"
            return {"block_type": bt, key: {"elements": [{"text_run": {"content": text}}], "style": {}}}
    # Bullet
    if s.lstrip().startswith(("- ", "* ")):
        text = s.lstrip()[2:]
        return {"block_type": 12, "bullet": {"elements": [{"text_run": {"content": text}}], "style": {}}}
    # Ordered (simple: "1. ")
    if len(s) > 2 and s[0].isdigit() and s[1:].lstrip().startswith((". ", ") ")):
        dot = s.find(". ") if ". " in s else s.find(") ")
        text = s[dot + 2:]
        return {"block_type": 13, "ordered": {"elements": [{"text_run": {"content": text}}], "style": {}}}
    # Default text
    return {"block_type": 2, "text": {"elements": [{"text_run": {"content": s}}], "style": {}}}


def _page_children_count(doc_token: str, tok: str) -> int:
    r = http(
        "GET",
        f"{FEISHU_BASE}/docx/v1/documents/{doc_token}/blocks/{doc_token}/children",
        token=tok,
        params={"page_size": 500, "document_revision_id": "-1"},
    )
    if r.get("code") != 0:
        return 0
    return len(r.get("data", {}).get("items", []))


def append_markdown(doc_token: str, markdown: str, chunk: int = 20) -> dict:
    """Append markdown as blocks at the end of the document.

    Each non-empty line becomes one block (heading/bullet/ordered/plain text).
    Inserts in batches of `chunk` so we don't blow past API limits; each batch
    targets `index = current_children_count` so blocks land at the end.
    """
    tok = tenant_token()
    lines = [ln for ln in markdown.splitlines() if ln.strip() != ""]
    if not lines:
        return {"ok": True, "skipped": "empty"}
    blocks = [_line_to_block(ln) for ln in lines]

    batches = []
    last_code = 0
    total_added = 0
    for i in range(0, len(blocks), chunk):
        batch = blocks[i : i + chunk]
        idx = _page_children_count(doc_token, tok)
        r = http(
            "POST",
            f"{FEISHU_BASE}/docx/v1/documents/{doc_token}/blocks/{doc_token}/children",
            token=tok,
            json_body={"children": batch, "index": idx},
        )
        last_code = r.get("code", -1)
        if last_code != 0:
            return {"ok": False, "added": total_added, "error": r, "batches": batches}
        total_added += len(batch)
        batches.append({"index": idx, "added": len(batch)})
    return {"ok": True, "added": total_added, "batches": batches}


def read_doc(doc_token: str) -> dict:
    tok = tenant_token()
    # lang: 0=中文 1=英文 2=日文
    r = http("GET", f"{FEISHU_BASE}/docx/v1/documents/{doc_token}/raw_content", token=tok, params={"lang": 0})
    return r


def list_blocks(doc_token: str) -> dict:
    tok = tenant_token()
    r = http("GET", f"{FEISHU_BASE}/docx/v1/documents/{doc_token}/blocks", token=tok, params={"page_size": 500})
    return r


def wiki_node(token: str) -> dict:
    tok = tenant_token()
    r = http("GET", f"{FEISHU_BASE}/wiki/v2/spaces/get_node", token=tok, params={"token": token, "obj_type": "wiki"})
    return r


def cmd_create(args) -> dict:
    doc = create_doc(args.title, args.folder)
    doc_token = doc["document_id"]
    grant_result = None
    if not args.no_grant:
        grant_result = grant_perm(doc_token, args.owner_open_id, args.perm)
    out = {
        "ok": True,
        "doc_token": doc_token,
        "title": doc.get("title", args.title),
        "url": f"https://feishu.cn/docx/{doc_token}",
        "granted_to": args.owner_open_id if not args.no_grant else None,
        "grant_result": grant_result,
    }
    if args.content:
        out["append_result"] = append_markdown(doc_token, args.content)
    return out


def main() -> None:
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)

    c = sub.add_parser("create")
    c.add_argument("--title", required=True)
    c.add_argument("--folder", help="folder_token (optional)")
    c.add_argument("--content", help="initial markdown content", default=None)
    c.add_argument("--owner-open-id", default=DEFAULT_OWNER_OPEN_ID)
    c.add_argument("--perm", default="full_access", choices=["full_access", "edit", "view"])
    c.add_argument("--no-grant", action="store_true")
    c.set_defaults(fn=cmd_create)

    r = sub.add_parser("read")
    r.add_argument("--doc-token", required=True)
    r.set_defaults(fn=lambda a: read_doc(a.doc_token))

    a = sub.add_parser("append")
    a.add_argument("--doc-token", required=True)
    a.add_argument("--content", required=True)
    a.set_defaults(fn=lambda x: append_markdown(x.doc_token, x.content))

    g = sub.add_parser("grant")
    g.add_argument("--doc-token", required=True)
    g.add_argument("--open-id", default=DEFAULT_OWNER_OPEN_ID)
    g.add_argument("--perm", default="full_access", choices=["full_access", "edit", "view"])
    g.set_defaults(fn=lambda x: grant_perm(x.doc_token, x.open_id, x.perm))

    b = sub.add_parser("blocks")
    b.add_argument("--doc-token", required=True)
    b.set_defaults(fn=lambda x: list_blocks(x.doc_token))

    t = sub.add_parser("token")
    t.set_defaults(fn=lambda _: {"tenant_access_token": tenant_token()})

    w = sub.add_parser("wiki")
    w.add_argument("--token", required=True, help="wiki node token (from /wiki/<token> URL)")
    w.set_defaults(fn=lambda x: wiki_node(x.token))

    args = p.parse_args()
    result = args.fn(args)
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
