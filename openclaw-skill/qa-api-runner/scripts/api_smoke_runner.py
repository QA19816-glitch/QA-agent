#!/usr/bin/env python3
"""Tiny API runner scaffold for ad-hoc QA smoke checks.

Usage:
  python api_smoke_runner.py spec.json

Spec format:
{
  "base_url": "https://example.com",
  "headers": {"Authorization": "Bearer ..."},
  "cases": [
    {"name": "get health", "method": "GET", "path": "/health", "expect_status": 200}
  ]
}
"""

from __future__ import annotations

import json
import sys
import urllib.error
import urllib.request
from pathlib import Path


def run_case(base_url: str, headers: dict, case: dict) -> dict:
    url = base_url.rstrip('/') + '/' + case['path'].lstrip('/')
    data = case.get('json')
    payload = None if data is None else json.dumps(data).encode('utf-8')
    req = urllib.request.Request(url, data=payload, method=case.get('method', 'GET').upper())
    merged_headers = {'Content-Type': 'application/json', **headers, **case.get('headers', {})}
    for k, v in merged_headers.items():
        req.add_header(k, v)
    try:
        with urllib.request.urlopen(req, timeout=case.get('timeout', 20)) as resp:
            body = resp.read().decode('utf-8', errors='replace')
            status = resp.getcode()
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='replace')
        status = e.code
    result = {
        'name': case.get('name', url),
        'method': req.get_method(),
        'url': url,
        'status': status,
        'expect_status': case.get('expect_status'),
        'ok': status == case.get('expect_status'),
        'body_excerpt': body[:500],
    }
    return result


def main() -> int:
    if len(sys.argv) != 2:
        print('Usage: python api_smoke_runner.py spec.json')
        return 1
    spec = json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
    base_url = spec['base_url']
    headers = spec.get('headers', {})
    results = [run_case(base_url, headers, case) for case in spec.get('cases', [])]
    print(json.dumps(results, ensure_ascii=False, indent=2))
    return 0 if all(r['ok'] for r in results) else 2


if __name__ == '__main__':
    raise SystemExit(main())
