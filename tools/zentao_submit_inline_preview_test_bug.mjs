import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = "http://13.158.151.116:8088";
const outDir = path.resolve("artifacts/zentao-inline-preview-test-bug");
const createUrl = `${baseUrl}/index.php?m=bug&f=create&productID=3`;
const browseUrl = `${baseUrl}/index.php?m=bug&f=browse&product=3&branch=all&browseType=all&param=0&orderBy=id_desc&recTotal=100&recPerPage=100`;
const username = "ken";
const password = "eHe8-o3u";
const evidenceFile = path.resolve("artifacts/zentao-template-test-bug/zentao-template-test-evidence.png");
const evidenceName = path.basename(evidenceFile);

const titleCandidates = [
  "【Codex自动化】测试Bug模板校验-详情页图片预览",
  "【Codex自动化】测试Bug模板校验-步骤图片可见",
  "【Codex自动化】测试Bug模板校验-正文图片预览",
  "【Codex自动化】测试Bug模板校验-截图直接展示",
];

const stepsText = [
  "[步骤]",
  "1. 在 Codex 中触发禅道自动提 Bug 验证。",
  "2. 自动创建测试缺陷，并上传一张正式 PNG 证据图。",
  "3. 将该正式文件的图片地址写入步骤正文。",
  "",
  "[结果]",
  "1. 本条测试缺陷用于验证详情页步骤正文能直接预览截图。",
  "",
  "[期望]",
  "1. 缺陷正文仅包含 [步骤]、[结果]、[期望] 三段。",
  "2. 进入 Bug 详情页后，无需下载附件即可直接看到截图预览。",
].join("\n");

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

  playwrightCookies() {
    return [...this.cookies.entries()].map(([name, value]) => ({
      name,
      value,
      domain: "13.158.151.116",
      path: "/",
      httpOnly: name === "zentaosid",
      secure: false,
      sameSite: "Lax",
    }));
  }
}

function md5(value) {
  return crypto.createHash("md5").update(value).digest("hex");
}

function htmlEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function htmlUnescape(value) {
  return String(value || "")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function normalize(value) {
  return htmlUnescape(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, "");
}

function stepsHtml(imageUrl = "") {
  const body = stepsText.split("\n").map((line) => `<p>${htmlEscape(line) || "<br>"}</p>`).join("");
  if (!imageUrl) return `${body}<p><strong>证据截图</strong></p>`;
  return `${body}<p><strong>证据截图</strong></p><p><img src="${htmlEscape(imageUrl)}" alt="${htmlEscape(evidenceName)}" style="max-width:960px;height:auto;border:1px solid #d8dee4;" /></p>`;
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

async function getRecentIds(jar) {
  const { text } = await textRequest(jar, browseUrl);
  await fs.writeFile(path.join(outDir, "zentao-browse-current.html"), text).catch(() => {});
  const ids = [...new Set([...text.matchAll(/m=bug&f=view&bugID=(\d+)|bugID=(\d+)|BUG\s*#(\d+)|data-id=["'](\d+)["']|href=["'][^"']*bug-view-(\d+)|&quot;id&quot;:(\d+)|"id":(\d+)/g)].map((match) => match[1] || match[2] || match[3] || match[4] || match[5] || match[6] || match[7]).filter(Boolean))];
  return ids.slice(0, 80);
}

function extractBugDetail(id, html) {
  const compact = normalize(html);
  const title = htmlUnescape(
    html.match(/entity-title-text[^>]*>([\s\S]*?)<\/span>/i)?.[1]
      ?? html.match(/<title>BUG\s+#\d+\s+([\s\S]*?)\s+-\s+/i)?.[1]
      ?? "",
  ).replace(/\s+/g, " ").trim();
  return { id: String(id), title, deleted: compact.includes("已删除"), exists: Boolean(title), compact, html };
}

async function viewBug(jar, id, label = "view") {
  const { text } = await textRequest(jar, `${baseUrl}/index.php?m=bug&f=view&bugID=${encodeURIComponent(id)}`);
  await fs.writeFile(path.join(outDir, `zentao-bug-${id}-${label}.html`), text).catch(() => {});
  return extractBugDetail(id, text);
}

async function chooseTitle(jar) {
  const ids = await getRecentIds(jar);
  const details = [];
  for (const id of ids) {
    const detail = await viewBug(jar, id, "dedupe").catch(() => null);
    if (detail?.exists && !detail.deleted) details.push(detail);
  }
  for (const title of titleCandidates) {
    if (!details.some((item) => item.title === title)) return { title, duplicateCheck: { scannedIds: ids, exact: [] } };
  }
  throw new Error(`测试标题均已存在，未创建重复 Bug：${JSON.stringify(details.filter((item) => titleCandidates.includes(item.title)).map(({ id, title }) => ({ id, title })))}`);
}

async function postForm(jar, url, html, overrides, attachEvidence = false) {
  const form = new FormData();
  const names = new Set();
  for (const [name, value] of extractFields(html)) {
    names.add(name);
    form.append(name, value);
  }
  for (const [name, value] of Object.entries(overrides)) {
    if (names.has(name)) form.set(name, value);
    else form.append(name, value);
  }
  if (!names.has("openedBuild[]")) form.append("openedBuild[]", "trunk");
  if (attachEvidence) {
    const bytes = await fs.readFile(evidenceFile);
    form.append("files[]", new File([bytes], evidenceName, { type: "image/png" }));
  }
  const response = await request(jar, url, {
    method: "POST",
    body: form,
    headers: { Referer: url, "X-Requested-With": "XMLHttpRequest" },
  });
  return { response, text: await response.text() };
}

function baseOverrides(title, extra = {}) {
  return {
    title,
    product: "3",
    project: "5",
    execution: "6",
    module: "0",
    plan: "0",
    story: "0",
    task: "0",
    type: "others",
    severity: "4",
    pri: "4",
    keywords: "Codex 自动化 测试模板 请忽略",
    ...extra,
  };
}

function findAttachedFileID(viewHtml) {
  const unescaped = htmlUnescape(viewHtml);
  const namePattern = evidenceName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const filesList = unescaped.match(/<ul class="files-list[\s\S]*?<\/ul>|<ul class='files-list[\s\S]*?<\/ul>/i)?.[0] ?? unescaped;
  const ids = new Set();
  for (const match of filesList.matchAll(new RegExp(`fileTitle(\\d+)[\\s\\S]{0,500}${namePattern}`, "gi"))) ids.add(match[1]);
  for (const match of filesList.matchAll(new RegExp(`fileID=(\\d+)[\\s\\S]{0,500}${namePattern}`, "gi"))) ids.add(match[1]);
  for (const match of filesList.matchAll(new RegExp(`${namePattern}[\\s\\S]{0,500}fileID=(\\d+)`, "gi"))) ids.add(match[1]);
  const newest = [...ids].map(Number).filter(Number.isFinite).sort((a, b) => b - a)[0];
  if (newest) return String(newest);
  throw new Error("未能从新 Bug 详情页解析证据附件 fileID");
}

async function verifyImageBytes(jar, imageUrl, bugID) {
  const response = await request(jar, imageUrl, { headers: { Referer: `${baseUrl}/index.php?m=bug&f=view&bugID=${bugID}` } });
  const bytes = Buffer.from(await response.arrayBuffer());
  return {
    status: response.status,
    contentType: response.headers.get("content-type") || "",
    bytes: bytes.length,
    pngSignature: bytes.subarray(0, 8).toString("hex") === "89504e470d0a1a0a",
  };
}

async function findCreatedBug(jar, title) {
  const ids = await getRecentIds(jar);
  const matches = [];
  for (const id of ids) {
    const detail = await viewBug(jar, id, "created-match").catch(() => null);
    if (detail?.exists && !detail.deleted && detail.title === title) matches.push(detail);
  }
  if (matches.length !== 1) throw new Error(`提交后同标题有效单数量异常：${JSON.stringify(matches.map(({ id, title: bugTitle }) => ({ id, title: bugTitle })))}`);
  return matches[0];
}

async function collectFrameImages(page, selector) {
  const results = [];
  for (const frame of page.frames()) {
    const count = await frame.locator(selector).count().catch(() => 0);
    if (count) {
      await frame.locator(selector).first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
    }
    const frameImages = await frame.evaluate(async () => {
      const nodes = [
        ...new Set([
          ...document.querySelectorAll('img[alt="zentao-template-test-evidence.png"]'),
          ...document.querySelectorAll('.detail-main img[src*="m=file"]'),
          ...document.querySelectorAll(".article img"),
        ]),
      ];
      await Promise.all(nodes.map((img) => img.decode?.().catch(() => undefined)));
      return nodes.map((img, index) => {
        const rect = img.getBoundingClientRect();
        const style = getComputedStyle(img);
        let sample = null;
        try {
          const canvas = document.createElement("canvas");
          canvas.width = 32;
          canvas.height = 16;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          let nonTransparent = 0;
          let nonWhite = 0;
          for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 8) nonTransparent += 1;
            if (data[i] < 245 || data[i + 1] < 245 || data[i + 2] < 245) nonWhite += 1;
          }
          sample = { nonTransparent, nonWhite, total: data.length / 4 };
        } catch (error) {
          sample = { error: error.message };
        }
        return {
          index,
          src: img.getAttribute("src"),
          currentSrc: img.currentSrc,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          clientWidth: img.clientWidth,
          clientHeight: img.clientHeight,
          rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
          display: style.display,
          visibility: style.visibility,
          opacity: style.opacity,
          sample,
        };
      });
    }).catch(() => []);
    for (const image of frameImages) results.push({ frameUrl: frame.url(), ...image });
  }
  return results;
}

async function verifyRenderedPreview(jar, bugID) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    locale: "zh-CN",
    timezoneId: "Asia/Shanghai",
    viewport: { width: 1440, height: 1200 },
    extraHTTPHeaders: { "Accept-Language": "zh-CN,zh;q=0.9" },
  });
  await context.addCookies(jar.playwrightCookies());
  const page = await context.newPage();
  const imageResponses = [];
  const requestFailures = [];
  page.on("response", (response) => {
    const request = response.request();
    if (request.resourceType() === "image" || response.url().includes("m=file&f=")) {
      imageResponses.push({
        url: response.url(),
        status: response.status(),
        contentType: response.headers()["content-type"] || "",
        disposition: response.headers()["content-disposition"] || "",
      });
    }
  });
  page.on("requestfailed", (request) => requestFailures.push({ url: request.url(), failure: request.failure()?.errorText || "" }));

  const viewUrl = `${baseUrl}/index.php?m=bug&f=view&bugID=${bugID}`;
  await page.goto(viewUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1200);
  const selector = ['img[alt="zentao-template-test-evidence.png"]', '.detail-main img[src*="m=file"]', ".article img"].join(", ");
  const images = await collectFrameImages(page, selector);
  const fullScreenshot = path.join(outDir, `zentao-bug-${bugID}-visual-check-full.png`);
  await page.screenshot({ path: fullScreenshot, fullPage: true });
  let imageScreenshot = null;
  const imageFrame = page.frames().find((frame) => frame.url() === images[0]?.frameUrl);
  if (imageFrame && images[0]?.rect?.width > 0 && images[0]?.rect?.height > 0) {
    imageScreenshot = path.join(outDir, `zentao-bug-${bugID}-visual-check-image.png`);
    await imageFrame.locator(selector).first().screenshot({ path: imageScreenshot });
  }
  await browser.close();
  return {
    ok: images.some((img) => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0 && img.rect.width > 0 && img.rect.height > 0 && (img.sample?.nonWhite ?? 0) > 0),
    images,
    imageResponses,
    requestFailures,
    fullScreenshot,
    imageScreenshot,
  };
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  await fs.access(evidenceFile);
  const jar = new CookieJar();
  await login(jar);
  const { title, duplicateCheck } = await chooseTitle(jar);

  const { text: createHtml } = await textRequest(jar, createUrl, { headers: { Referer: browseUrl } });
  await fs.writeFile(path.join(outDir, "zentao-create-current.html"), createHtml).catch(() => {});
  const createResult = await postForm(jar, createUrl, createHtml, baseOverrides(title, { steps: stepsHtml("") }), true);
  await fs.writeFile(path.join(outDir, "zentao-create-response.txt"), createResult.text);

  const created = await findCreatedBug(jar, title);
  const bugID = created.id;
  const fileID = findAttachedFileID(created.html);
  const imageUrl = `${baseUrl}/index.php?m=file&f=read&t=png&fileID=${fileID}`;

  const editUrl = `${baseUrl}/index.php?m=bug&f=edit&bugID=${bugID}`;
  const { text: editHtml } = await textRequest(jar, editUrl);
  const editResult = await postForm(
    jar,
    editUrl,
    editHtml,
    baseOverrides(title, {
      id: bugID,
      steps: stepsHtml(imageUrl),
      comment: "修复验证：正式附件图片已写入步骤正文，详情页应直接显示预览。",
    }),
    false,
  );
  await fs.writeFile(path.join(outDir, `zentao-bug-${bugID}-inline-response.txt`), editResult.text);

  const finalDetail = await viewBug(jar, bugID, "final");
  const imageCheck = await verifyImageBytes(jar, imageUrl, bugID);
  const visual = await verifyRenderedPreview(jar, bugID);
  const compact = finalDetail.compact;
  const verify = {
    hasTitle: finalDetail.title === title,
    hasSections: ["[步骤]", "[结果]", "[期望]"].every((section) => compact.includes(section)),
    hasNoEnvironmentSection: !compact.includes("[环境]") && !compact.includes("禅道产品ID"),
    hasImageTag: finalDetail.html.includes("<img") && finalDetail.html.includes(`fileID=${fileID}`),
    hasEvidenceName: compact.includes(evidenceName),
    hasBaseS: compact.includes("所属项目基建S"),
    imageResourceOk: imageCheck.status === 200 && imageCheck.contentType.includes("image/") && imageCheck.pngSignature,
    visualPreviewOk: visual.ok,
  };
  const output = path.join(outDir, "zentao-inline-preview-test-result.json");
  const result = {
    ok: Object.values(verify).every(Boolean),
    bugID,
    title,
    viewUrl: `${baseUrl}/index.php?m=bug&f=view&bugID=${bugID}`,
    fileID,
    imageUrl,
    duplicateCheck,
    createStatus: createResult.response.status,
    editStatus: editResult.response.status,
    imageCheck,
    visual,
    verify,
    output,
  };
  await fs.writeFile(output, JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
  if (!result.ok) process.exit(2);
}

main().catch(async (error) => {
  await fs.mkdir(outDir, { recursive: true }).catch(() => {});
  const output = path.join(outDir, "zentao-inline-preview-test-result.json");
  await fs.writeFile(output, JSON.stringify({ ok: false, message: error?.message || String(error), stack: error?.stack }, null, 2)).catch(() => {});
  console.error(JSON.stringify({ ok: false, message: error?.message || String(error), output }, null, 2));
  process.exit(1);
});
