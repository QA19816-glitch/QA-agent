import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = "http://13.158.151.116:8088";
const username = "ken";
const password = "eHe8-o3u";
const bugID = process.argv[2] || "903";
const outDir = path.resolve("artifacts/zentao-inline-preview-test-bug");

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

function htmlUnescape(value) {
  return String(value || "")
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
    if (/^<textarea/i.test(tag)) value = htmlUnescape(tag.match(/<textarea\b[^>]*>([\s\S]*?)<\/textarea>/i)?.[1] ?? "");
    if (/^<select/i.test(tag)) {
      const selected = [...tag.matchAll(/<option\b([^>]*)>([\s\S]*?)<\/option>/gi)].find((option) => /\bselected\b/i.test(option[1]));
      value = selected ? attr(`<option ${selected[1]}>`, "value") : attr(tag, "value");
    }
    fields.push([name, value]);
  }
  return fields;
}

function removeEvidenceCaption(html) {
  return String(html || "")
    .replace(/<p>\s*证据截图\s*[：:]\s*[^<]*(?:\.png|\.jpg|\.jpeg|\.webp|\.gif)\s*<\/p>/gi, "")
    .replace(/<p>\s*证据截图\s*[：:]\s*[^<]*<\/p>(?=\s*<p><img\b)/gi, "");
}

async function request(jar, url, options = {}) {
  const headers = new Headers(options.headers || {});
  const cookie = jar.header();
  if (cookie) headers.set("Cookie", cookie);
  const response = await fetch(url, { ...options, headers, redirect: "manual" });
  jar.add(response.headers.getSetCookie?.() ?? response.headers.get("set-cookie"));
  if (response.status >= 300 && response.status < 400 && response.headers.get("location")) {
    return request(jar, new URL(response.headers.get("location"), url).toString(), { ...options, method: "GET", body: undefined });
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

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const jar = new CookieJar();
  await login(jar);

  const editUrl = `${baseUrl}/index.php?m=bug&f=edit&bugID=${bugID}`;
  const viewUrl = `${baseUrl}/index.php?m=bug&f=view&bugID=${bugID}`;
  const { text: editHtml } = await textRequest(jar, editUrl);
  await fs.writeFile(path.join(outDir, `zentao-bug-${bugID}-caption-edit.html`), editHtml);

  const currentSteps = htmlUnescape(
    editHtml.match(/<textarea\b[^>]*name=(["'])steps\1[^>]*>([\s\S]*?)<\/textarea>/i)?.[2]
      ?? editHtml.match(/<zen-editor\b[^>]*name=(["'])steps\1[\s\S]*?<article slot="content">([\s\S]*?)<\/article>/i)?.[2]
      ?? editHtml.match(/"steps"\s*:\s*"((?:\\.|[^"\\])*)"/i)?.[1]?.replace(/\\"/g, '"').replace(/\\\//g, "/").replace(/\\n/g, "\n")
      ?? "",
  );
  const nextSteps = removeEvidenceCaption(currentSteps);

  const form = new FormData();
  const names = new Set();
  for (const [name, value] of extractFields(editHtml)) {
    names.add(name);
    form.append(name, value);
  }
  form.set("steps", nextSteps);
  form.set("product", "3");
  form.set("project", "5");
  form.set("execution", "6");
  form.set("type", "others");
  form.set("severity", "4");
  form.set("pri", "4");
  form.set("comment", "按配置精简证据展示：删除截图文件名说明行，仅保留标题和图片预览。");
  if (!names.has("openedBuild[]")) form.append("openedBuild[]", "trunk");

  const response = await request(jar, editUrl, {
    method: "POST",
    body: form,
    headers: { Referer: editUrl, "X-Requested-With": "XMLHttpRequest" },
  });
  const responseText = await response.text();
  await fs.writeFile(path.join(outDir, `zentao-bug-${bugID}-caption-response.txt`), responseText);

  const { text: finalHtml } = await textRequest(jar, viewUrl, { headers: { Referer: editUrl } });
  await fs.writeFile(path.join(outDir, `zentao-bug-${bugID}-caption-final.html`), finalHtml);
  const compact = htmlUnescape(finalHtml).replace(/\s+/g, "");
  const articleHtml = finalHtml.match(/<div class="article">([\s\S]*?)<\/div><\/div><\/div><div class="detail-section">/i)?.[1] ?? "";
  const result = {
    ok: !/证据截图[：:][^<\s]*(png|jpg|jpeg|webp|gif)/i.test(htmlUnescape(articleHtml).replace(/\s+/g, "")) && finalHtml.includes("<img") && finalHtml.includes("m=file") && compact.includes("所属项目基建S"),
    bugID,
    viewUrl,
    responseStatus: response.status,
    hasImage: finalHtml.includes("<img") && finalHtml.includes("m=file"),
    hasVisibleFilenameCaption: /证据截图[：:][^<\s]*(png|jpg|jpeg|webp|gif)/i.test(htmlUnescape(articleHtml).replace(/\s+/g, "")),
    hasBaseS: compact.includes("所属项目基建S"),
    output: path.join(outDir, `zentao-bug-${bugID}-caption-result.json`),
  };
  await fs.writeFile(result.output, JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
  if (!result.ok) process.exit(2);
}

main().catch(async (error) => {
  await fs.mkdir(outDir, { recursive: true }).catch(() => {});
  const output = path.join(outDir, `zentao-bug-${bugID}-caption-result.json`);
  await fs.writeFile(output, JSON.stringify({ ok: false, message: error?.message || String(error), stack: error?.stack }, null, 2)).catch(() => {});
  console.error(JSON.stringify({ ok: false, message: error?.message || String(error), output }, null, 2));
  process.exit(1);
});
