---
name: zentao-auto-bug
description: >
  自动向禅道（ZenTao）提交 BUG 并上传附件截图，无需浏览器手动操作。
  适用于禅道 21.x 开源版。使用 REST API 创建缺陷单，Playwright 上传附件。
  触发：用户说"提BUG"、"自动提单"、"把这个问题提到禅道"、"file bug"、"附件也上传"。
---

# 禅道自动提 BUG 技能

Claude Code 全自动完成：REST API 创建缺陷 → Playwright 上传截图附件 → 验证结果。

## 前置配置

在 `~/.claude/config/integrations.json` 中配置禅道凭据：

```json
{
  "zentao": {
    "url": "http://YOUR_ZENTAO_HOST:PORT",
    "account": "YOUR_ACCOUNT",
    "password": "YOUR_PASSWORD",
    "default_product_id": 3
  }
}
```

## 提单格式规范

### steps 字段（三段式，HTML 格式）

```html
<p><strong>[步骤]</strong></p>
<p>1. 第一步</p>
<p>2. 第二步</p>
<p><br></p>
<p><strong>[结果]</strong></p>
<p>1. 实际发生了什么</p>
<p><br></p>
<p><strong>[期望]</strong></p>
<p>1. 应该发生什么</p>
```

> 注意：**不写 [环境] 段**，环境信息通过 `project`、`os`、`browser` 字段传递。

### 标题规范
- ≤ 25 字
- 格式：`[模块] 现象 + 触发条件`
- 严重度：1=Critical / 2=Major / 3=Minor / 4=Suggestion

## 工作流

### 步骤一：获取 Token

```python
import json, urllib.request

def get_zentao_token(url, account, password):
    data = json.dumps({"account": account, "password": password}).encode()
    req = urllib.request.Request(
        f"{url}/api.php/v1/tokens",
        data=data, headers={"Content-Type": "application/json"}
    )
    return json.loads(urllib.request.urlopen(req).read())["token"]
```

### 步骤二：创建 BUG

```python
def create_bug(url, token, product_id, title, steps, severity=3, pri=3,
               bug_type="codeerror", project_id=None):
    payload = {
        "title": title,
        "steps": steps,        # HTML 格式，三段式
        "severity": severity,  # 1-4
        "pri": pri,            # 1-4
        "type": bug_type,      # codeerror/config/install/designdefect/performance/security/...
        "openedBuild": "trunk",
    }
    if project_id:
        payload["project"] = project_id

    data = json.dumps(payload).encode()
    req = urllib.request.Request(
        f"{url}/api.php/v1/products/{product_id}/bugs",
        data=data, method="POST",
        headers={"Token": token, "Content-Type": "application/json"}
    )
    resp = json.loads(urllib.request.urlopen(req).read())
    return resp["id"]
```

### 步骤三：上传附件（Playwright）

> 禅道 21.x REST API 文件上传端点无效，必须走 Playwright 进 iframe 操作。

```python
import asyncio
from playwright.async_api import async_playwright

async def upload_attachment(zentao_url, account, password, bug_id, file_path):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # 登录
        await page.goto(f"{zentao_url}/index.php?m=user&f=login")
        await page.fill("#account", account)
        await page.fill("#password", password)
        await page.click("#submit")
        await page.wait_for_timeout(2000)

        # 进入 BUG 编辑页
        await page.goto(f"{zentao_url}/index.php?m=bug&f=edit&bugID={bug_id}")
        await page.wait_for_load_state("networkidle")
        await page.wait_for_timeout(5000)  # 等 ZUI3 fileselector 组件渲染

        # 附件 input 在 app-qa iframe 里
        iframe = page.frame_locator('iframe[name="app-qa"]')
        file_input = iframe.locator('input[type="file"]').first
        await file_input.set_input_files(file_path)
        await page.wait_for_timeout(3000)

        # 保存
        await iframe.locator('button:has-text("保存")').first.click()
        await page.wait_for_timeout(3000)

        await browser.close()
```

### 完整调用示例

```python
import asyncio

# 配置
ZENTAO_URL = "http://YOUR_HOST:8088"
ACCOUNT    = "your_account"
PASSWORD   = "your_password"
PRODUCT_ID = 3   # 产品ID
PROJECT_ID = 5   # 项目ID（可选）

steps_html = """<p><strong>[步骤]</strong></p>
<p>1. 打开页面 https://example.com/dashboard</p>
<p>2. 点击"新建"按钮</p>
<p><br></p>
<p><strong>[结果]</strong></p>
<p>1. 页面崩溃，控制台报 TypeError: Cannot read property 'id' of undefined</p>
<p><br></p>
<p><strong>[期望]</strong></p>
<p>1. 成功弹出新建弹窗</p>"""

token  = get_zentao_token(ZENTAO_URL, ACCOUNT, PASSWORD)
bug_id = create_bug(
    url        = ZENTAO_URL,
    token      = token,
    product_id = PRODUCT_ID,
    title      = "【Dashboard】点击新建按钮页面崩溃",
    steps      = steps_html,
    severity   = 2,
    pri        = 2,
    project_id = PROJECT_ID,
)
print(f"BUG 创建成功，ID = {bug_id}")

# 上传截图
asyncio.run(upload_attachment(ZENTAO_URL, ACCOUNT, PASSWORD, bug_id, "/tmp/screenshot.png"))
print("附件上传完成")
```

## 验证

```python
def verify_bug(url, token, bug_id):
    req = urllib.request.Request(
        f"{url}/api.php/v1/bugs/{bug_id}",
        headers={"Token": token}
    )
    bug = json.loads(urllib.request.urlopen(req).read())
    files = bug.get("files", {})
    print(f"标题: {bug['title']}")
    print(f"状态: {bug['status']}")
    print(f"附件数: {len(files)}")
    for f in (files.values() if isinstance(files, dict) else files):
        print(f"  - {f['title']} ({f['size']} bytes)")
```

## 已知限制

| 场景 | 状态 | 说明 |
|------|------|------|
| REST API 创建 BUG | ✅ 正常 | `POST /api.php/v1/products/{id}/bugs` |
| REST API 上传附件 (`/api.php/v1/files`) | ❌ 无效 | 禅道 21.x 返回"文件格式不在规定范围内" |
| REST API 上传附件 (`/api.php/v2/files`) | ❌ 无效 | 返回 HTTP 200 空响应，文件未保存 |
| Playwright 附件上传 | ✅ 正常 | 需等待 5 秒 ZUI3 渲染，在 `iframe[name="app-qa"]` 操作 |

## 依赖

```bash
# Python 标准库（无需额外安装）: urllib, json, asyncio

# Playwright（附件上传时需要）
pip install playwright
python -m playwright install chromium
```

## 完整脚本

见同目录 `scripts/zentao_file_bug.py`，支持命令行调用：

```bash
python scripts/zentao_file_bug.py \
  --url http://HOST:8088 \
  --account admin \
  --password secret \
  --product-id 3 \
  --title "【登录页】密码框无法输入中文" \
  --steps-file /tmp/steps.html \
  --severity 2 \
  --screenshot /tmp/evidence.png
```
