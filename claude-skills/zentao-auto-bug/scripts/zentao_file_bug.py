#!/usr/bin/env python3
"""
zentao_file_bug.py — 自动向禅道提交 BUG 并上传附件

用法:
  python zentao_file_bug.py \
    --url http://HOST:8088 \
    --account admin --password secret \
    --product-id 3 --project-id 5 \
    --title "【模块】问题描述" \
    --steps "步骤文本（纯文本，自动转 HTML）" \
    --severity 2 --pri 2 \
    --screenshot /tmp/evidence.png

也可通过环境变量传凭据：
  ZENTAO_URL / ZENTAO_ACCOUNT / ZENTAO_PASSWORD
"""

import argparse, asyncio, json, sys, urllib.request


# ─── API helpers ──────────────────────────────────────────────────────────────

def get_token(url, account, password):
    data = json.dumps({"account": account, "password": password}).encode()
    req = urllib.request.Request(
        f"{url}/api.php/v1/tokens", data=data,
        headers={"Content-Type": "application/json"}
    )
    return json.loads(urllib.request.urlopen(req).read())["token"]


def text_to_html(text):
    """把三段式纯文本转成禅道 steps HTML 格式。"""
    lines = text.strip().splitlines()
    parts = []
    for line in lines:
        line = line.strip()
        if not line:
            parts.append("<p><br></p>")
        elif line.startswith("[") and line.endswith("]"):
            parts.append(f"<p><strong>{line}</strong></p>")
        else:
            parts.append(f"<p>{line}</p>")
    return "\n".join(parts)


def create_bug(url, token, product_id, title, steps_html,
               severity=3, pri=3, bug_type="codeerror", project_id=None):
    payload = {
        "title": title,
        "steps": steps_html,
        "severity": severity,
        "pri": pri,
        "type": bug_type,
        "openedBuild": "trunk",
    }
    if project_id:
        payload["project"] = project_id

    data = json.dumps(payload).encode()
    req = urllib.request.Request(
        f"{url}/api.php/v1/products/{product_id}/bugs",
        data=data, method="POST",
        headers={"Token": token, "Content-Type": "application/json"},
    )
    resp = json.loads(urllib.request.urlopen(req).read())
    return resp["id"]


def verify_bug(url, token, bug_id):
    req = urllib.request.Request(
        f"{url}/api.php/v1/bugs/{bug_id}",
        headers={"Token": token}
    )
    return json.loads(urllib.request.urlopen(req).read())


# ─── Playwright attachment upload ─────────────────────────────────────────────

async def _upload(zentao_url, account, password, bug_id, file_path):
    from playwright.async_api import async_playwright

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        await page.goto(f"{zentao_url}/index.php?m=user&f=login")
        await page.fill("#account", account)
        await page.fill("#password", password)
        await page.click("#submit")
        await page.wait_for_timeout(2000)

        await page.goto(f"{zentao_url}/index.php?m=bug&f=edit&bugID={bug_id}")
        await page.wait_for_load_state("networkidle")
        await page.wait_for_timeout(5000)  # ZUI3 fileselector 需要时间渲染

        iframe = page.frame_locator('iframe[name="app-qa"]')
        file_input = iframe.locator('input[type="file"]').first
        count = await file_input.count()
        if count == 0:
            raise RuntimeError("未找到附件 input，ZUI3 组件可能未渲染")

        await file_input.set_input_files(file_path)
        await page.wait_for_timeout(3000)
        await iframe.locator('button:has-text("保存")').first.click()
        await page.wait_for_timeout(3000)
        await browser.close()


def upload_attachment(zentao_url, account, password, bug_id, file_path):
    asyncio.run(_upload(zentao_url, account, password, bug_id, file_path))


# ─── CLI ──────────────────────────────────────────────────────────────────────

def main():
    import os

    p = argparse.ArgumentParser(description="自动向禅道提 BUG 并上传附件")
    p.add_argument("--url",        default=os.environ.get("ZENTAO_URL", ""))
    p.add_argument("--account",    default=os.environ.get("ZENTAO_ACCOUNT", ""))
    p.add_argument("--password",   default=os.environ.get("ZENTAO_PASSWORD", ""))
    p.add_argument("--product-id", type=int, required=True)
    p.add_argument("--project-id", type=int, default=None)
    p.add_argument("--title",      required=True)
    p.add_argument("--steps",      default="", help="纯文本步骤（自动转 HTML）")
    p.add_argument("--steps-file", default=None, help="已是 HTML 格式的 steps 文件路径")
    p.add_argument("--severity",   type=int, default=3, choices=[1,2,3,4])
    p.add_argument("--pri",        type=int, default=3, choices=[1,2,3,4])
    p.add_argument("--type",       default="codeerror")
    p.add_argument("--screenshot", default=None, help="截图路径，自动上传为附件")
    args = p.parse_args()

    if not args.url or not args.account or not args.password:
        print("错误：请提供 --url / --account / --password 或设置环境变量", file=sys.stderr)
        sys.exit(1)

    if args.steps_file:
        with open(args.steps_file) as f:
            steps_html = f.read()
    elif args.steps:
        steps_html = text_to_html(args.steps)
    else:
        steps_html = "<p><strong>[步骤]</strong></p><p>1. （请补充）</p>"

    print("获取 Token...")
    token = get_token(args.url, args.account, args.password)

    print(f"创建 BUG：{args.title}")
    bug_id = create_bug(
        url=args.url, token=token,
        product_id=args.product_id,
        title=args.title,
        steps_html=steps_html,
        severity=args.severity,
        pri=args.pri,
        bug_type=args.type,
        project_id=args.project_id,
    )
    print(f"✅ BUG 创建成功，ID = {bug_id}")

    if args.screenshot:
        print(f"上传附件：{args.screenshot}")
        upload_attachment(args.url, args.account, args.password, bug_id, args.screenshot)
        print("✅ 附件上传完成")

    bug = verify_bug(args.url, token, bug_id)
    files = bug.get("files", {})
    print(f"\n验证结果：")
    print(f"  标题: {bug['title']}")
    print(f"  状态: {bug.get('status', 'unknown')}")
    print(f"  附件: {len(files)} 个")
    for f in (files.values() if isinstance(files, dict) else files):
        print(f"    - {f['title']} ({f['size']} bytes)")


if __name__ == "__main__":
    main()
