import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const outDir = path.resolve("artifacts/s-project-case-qa/2026-05-20T06-18-19-519Z");
const baseUrl = "http://13.158.151.116:8088";
const username = "ken";
const password = "eHe8-o3u";

const bugUpdates = {
  207: {
    title: "【Codex自动化】误提-前台视频流页旧路由探测误判",
    severity: "4",
    pri: "4",
    keywords: "误提 旧路由 fullscreen-feed",
    steps: [
      "[步骤]",
      "1. 自动测试脚本误将旧路由 /domain/video_detail 作为抖音 feed 流入口。",
      "2. 复核首页底部导航，实际 feed 流入口为 /fullscreen-feed。",
      "3. 补测 https://base-web-test.guadd.fun/fullscreen-feed。",
      "",
      "[结果]",
      "1. /fullscreen-feed 返回 200。",
      "2. 页面存在 video 元素、播放时间、倍速、关注、点赞、分享等视频流互动区。",
      "3. 原 BUG 由旧路由探测产生，不应作为有效缺陷处理。",
      "",
      "[期望]",
      "1. 请关闭该误提交记录。",
      "2. 后续以 /fullscreen-feed 作为抖音 feed 流入口继续验证。",
    ].join("\n"),
  },
  208: {
    title: "【Codex自动化】未登录用户可直接进入订单页",
    severity: "3",
    pri: "1",
    keywords: "前台会员订单 未登录 登录拦截",
    steps: [
      "[步骤]",
      "1. 清空前台登录态后打开 https://base-web-test.guadd.fun/。",
      "2. 直接访问 https://base-web-test.guadd.fun/order，或从个人中心进入订单列表。",
      "3. 观察是否触发登录拦截。",
      "",
      "[结果]",
      "1. 页面直接进入订单页。",
      "2. 页面展示 My Orders / No orders yet 等订单空态内容。",
      "3. 未弹出登录框，也未跳转登录页。",
      "",
      "[期望]",
      "1. 订单列表属于个人数据，未登录用户应先登录后才能访问。",
      "2. 未登录访问订单页时应弹出登录框或跳转登录页。",
    ].join("\n"),
  },
  209: {
    title: "【Codex自动化】误提-视频流入口未展示内容为旧路由误判",
    severity: "4",
    pri: "4",
    keywords: "误提 旧路由 fullscreen-feed",
    steps: [
      "[步骤]",
      "1. 自动测试脚本误将旧路由 /domain/video_detail 的异常作为视频流入口异常。",
      "2. 复核首页底部导航，实际 feed 流入口为 /fullscreen-feed。",
      "3. 补测 https://base-web-test.guadd.fun/fullscreen-feed。",
      "",
      "[结果]",
      "1. /fullscreen-feed 返回 200。",
      "2. 页面存在 video 元素和互动区，可继续执行视频流播放、关注、点赞、分享等用例。",
      "3. 原 BUG 不成立，不应计入有效缺陷。",
      "",
      "[期望]",
      "1. 请关闭该误提交记录。",
      "2. 后续报告仅统计有效缺陷。",
    ].join("\n"),
  },
  211: {
    title: "【Codex自动化】后台功能页面管理缺少需求要求的配置项",
    severity: "3",
    pri: "2",
    keywords: "后台功能页面管理 抖音视频流 内容形式",
    steps: [
      "[步骤]",
      "1. 登录后台 https://base-admin-test.guadd.fun/contentManage/comic。",
      "2. 打开 https://base-admin-test.guadd.fun/operation/functionPage。",
      "3. 检查功能页面管理是否提供「抖音视频流」类型。",
      "4. 检查创建/配置区域是否展示「内容形式」「内容分类」「标签」。",
      "",
      "[结果]",
      "1. 页面未发现「抖音视频流」类型。",
      "2. 页面未发现「内容形式」配置项。",
      "3. 仅能看到现有功能页面管理内容，无法按用例创建抖音视频流功能页面。",
      "",
      "[期望]",
      "1. 功能页面类型列表中应包含「抖音视频流」。",
      "2. 选择抖音视频流后应展示「内容形式」「内容分类」「标签」配置项。",
      "3. 内容形式应仅允许视频可选，小说/漫画/社区置灰不可选。",
    ].join("\n"),
  },
  212: {
    title: "【Codex自动化】后台底部导航框架缺少需求要求的配置项",
    severity: "3",
    pri: "2",
    keywords: "底部导航 会员中心 商品订单记录",
    steps: [
      "[步骤]",
      "1. 登录后台 https://base-admin-test.guadd.fun/contentManage/comic。",
      "2. 打开 https://base-admin-test.guadd.fun/operation/bottomNavigation。",
      "3. 检查底部导航框架配置项。",
      "4. 查找是否支持「会员中心」「商品订单记录」跳转配置。",
      "",
      "[结果]",
      "1. 页面未发现「会员中心」配置项。",
      "2. 页面未发现「商品订单记录」配置项。",
      "3. 运营无法按用例配置会员中心和商品订单记录入口。",
      "",
      "[期望]",
      "1. 底部导航配置应支持新增第 6、7 个入口。",
      "2. 跳转配置中应支持「会员中心」和「商品订单记录」。",
      "3. 前端底部导航应按配置展示并可正常跳转。",
    ].join("\n"),
  },
  213: {
    title: "【Codex自动化】后台组件配置缺少需求要求的配置项",
    severity: "3",
    pri: "2",
    keywords: "组件配置 瀑布流-横 图标广告 类型入口",
    steps: [
      "[步骤]",
      "1. 登录后台 https://base-admin-test.guadd.fun/contentManage/comic。",
      "2. 打开 https://base-admin-test.guadd.fun/operation/component。",
      "3. 检查可添加/可配置组件列表。",
      "4. 查找用例要求的「瀑布流-横」「图标广告」「类型入口」组件。",
      "",
      "[结果]",
      "1. 页面未发现「瀑布流-横」配置项。",
      "2. 页面未发现「图标广告」配置项。",
      "3. 页面未发现「类型入口」配置项。",
      "4. 无法执行新增组件相关 P0/P1 用例。",
      "",
      "[期望]",
      "1. 组件配置应支持「瀑布流-横」组件。",
      "2. 组件配置应支持「图标广告」和「图标广告-滚动」组件。",
      "3. 组件配置应支持「类型入口」和「类型入口-圆形」组件。",
    ].join("\n"),
  },
};

class CookieJar {
  constructor() {
    this.cookies = new Map();
  }
  add(header) {
    if (!header) return;
    const items = Array.isArray(header) ? header : header.split(/,(?=\s*[^;,\s]+=)/g);
    for (const item of items) {
      const pair = item.split(";")[0];
      const index = pair.indexOf("=");
      if (index > 0) this.cookies.set(pair.slice(0, index).trim(), pair.slice(index + 1).trim());
    }
  }
  header() {
    return [...this.cookies.entries()].map(([key, value]) => `${key}=${value}`).join("; ");
  }
}

function md5(value) {
  return crypto.createHash("md5").update(value).digest("hex");
}

function htmlEscape(value) {
  return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function stepsHtml(value) {
  return value.split("\n").map((line) => `<p>${htmlEscape(line) || "<br>"}</p>`).join("");
}

function htmlUnescape(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`${name}=(["'])(.*?)\\1`, "i"));
  return match ? htmlUnescape(match[2]) : "";
}

function extractFields(html) {
  const fields = [];
  for (const match of html.matchAll(/<(input|textarea|select)\b[\s\S]*?<\/\1>|<input\b[^>]*>/gi)) {
    const tag = match[0];
    const name = attr(tag, "name");
    if (!name || name === "files[]") continue;
    if (/type=(["'])file\1/i.test(tag)) continue;
    const type = attr(tag, "type").toLowerCase();
    if (type === "submit" || type === "button") continue;
    let value = attr(tag, "value");
    if (/^<textarea/i.test(tag)) {
      const text = tag.match(/<textarea\b[^>]*>([\s\S]*?)<\/textarea>/i)?.[1] ?? "";
      value = htmlUnescape(text);
    }
    if (/^<select/i.test(tag)) {
      const selected = [...tag.matchAll(/<option\b([^>]*)>([\s\S]*?)<\/option>/gi)]
        .find((option) => /\bselected\b/i.test(option[1]));
      value = selected ? attr(`<option ${selected[1]}>`, "value") : attr(tag, "value");
    }
    fields.push([name, value]);
  }
  return fields;
}

function extractDetailText(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
  return htmlUnescape(text);
}

async function request(jar, url, options = {}) {
  const headers = new Headers(options.headers || {});
  const cookie = jar.header();
  if (cookie) headers.set("Cookie", cookie);
  const response = await fetch(url, { ...options, headers, redirect: "manual" });
  const setCookie = response.headers.getSetCookie?.() ?? response.headers.get("set-cookie");
  jar.add(setCookie);
  if (response.status >= 300 && response.status < 400 && response.headers.get("location")) {
    return request(jar, new URL(response.headers.get("location"), url).toString(), {
      ...options,
      method: "GET",
      body: undefined,
    });
  }
  return response;
}

async function textRequest(jar, url, options = {}) {
  const response = await request(jar, url, options);
  return { response, text: await response.text() };
}

async function login(jar) {
  const loginUrl = `${baseUrl}/index.php?m=user&f=login`;
  await textRequest(jar, loginUrl);
  const { text: random } = await textRequest(jar, `${baseUrl}/index.php?m=user&f=refreshRandom`, {
    headers: { Referer: loginUrl, "X-Requested-With": "XMLHttpRequest" },
  });
  const verifyRand = random.trim();
  const body = new URLSearchParams({
    account: username,
    password: md5(md5(password) + verifyRand),
    passwordStrength: "1",
    referer: "/",
    verifyRand,
    keepLogin: "1",
    captcha: "",
  });
  const { text } = await textRequest(jar, loginUrl, {
    method: "POST",
    body,
    headers: {
      Referer: loginUrl,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  const data = JSON.parse(text);
  if (data.result === "fail") throw new Error(`禅道登录失败：${data.message || "unknown"}`);
}

async function updateBug(jar, bugID, update) {
  const editUrl = `${baseUrl}/index.php?m=bug&f=edit&bugID=${bugID}`;
  const viewUrl = `${baseUrl}/index.php?m=bug&f=view&bugID=${bugID}`;
  const { text: editHtml } = await textRequest(jar, editUrl, {
    headers: { Referer: `${baseUrl}/index.php?m=bug&f=browse&product=3` },
  });
  if (!/编辑Bug|Bug标题|保存|重现步骤/.test(editHtml)) {
    throw new Error(`未进入 BUG ${bugID} 编辑页：${editHtml.replace(/\s+/g, " ").slice(0, 300)}`);
  }

  const form = new FormData();
  const names = new Set();
  for (const [name, value] of extractFields(editHtml)) {
    names.add(name);
    form.append(name, value);
  }
  const overrides = {
    id: String(bugID),
    title: update.title,
    product: "3",
    project: "5",
    type: bugID === "207" || bugID === "209" ? "others" : "codeerror",
    severity: update.severity,
    pri: update.pri,
    keywords: update.keywords,
    steps: stepsHtml(update.steps),
    comment: "修复自动提交时描述未写入的问题，补齐步骤、结果和期望。",
  };
  for (const [name, value] of Object.entries(overrides)) {
    if (names.has(name)) form.set(name, value);
    else form.append(name, value);
  }
  if (!names.has("openedBuild[]")) form.append("openedBuild[]", "trunk");

  const response = await request(jar, editUrl, {
    method: "POST",
    body: form,
    headers: { Referer: editUrl, "X-Requested-With": "XMLHttpRequest" },
  });
  const responseText = await response.text();

  const { text: viewHtml } = await textRequest(jar, viewUrl, { headers: { Referer: editUrl } });
  const detailText = extractDetailText(viewHtml);
  const requiredSnippets = update.steps
    .split("\n")
    .filter((line) => /^1\.|^2\.|^3\./.test(line))
    .slice(0, 4);
  return {
    bugID,
    status: response.status,
    responsePreview: responseText.replace(/\s+/g, " ").slice(0, 300),
    hasTitle: detailText.includes(update.title),
    hasSteps: requiredSnippets.every((snippet) => detailText.includes(snippet)),
    hasResult: detailText.includes("[结果]"),
    hasExpected: detailText.includes("[期望]"),
    hasBaseS: detailText.includes("所属项目 基建S"),
    excerpt: (detailText.match(/\[步骤\][\s\S]{0,700}/)?.[0] || detailText).slice(0, 900),
    viewUrl,
  };
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const jar = new CookieJar();
  await login(jar);
  const results = [];
  for (const [bugID, update] of Object.entries(bugUpdates)) {
    results.push(await updateBug(jar, bugID, update));
  }
  const ok = results.every((item) => item.hasTitle && item.hasSteps && item.hasResult && item.hasExpected && item.hasBaseS);
  const output = path.join(outDir, "zentao-repair-bug-descriptions.json");
  await fs.writeFile(output, JSON.stringify({ ok, results }, null, 2));
  console.log(JSON.stringify({ ok, results, output }, null, 2));
}

main().catch((error) => {
  console.error(JSON.stringify({ ok: false, message: error?.message || String(error), stack: error?.stack }, null, 2));
  process.exit(1);
});
