import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = "http://13.158.151.116:8088";
const bugID = process.argv[2] || "891";
const username = "ken";
const password = "eHe8-o3u";
const outDir = path.resolve("artifacts/zentao-visual-check");
const viewUrl = `${baseUrl}/index.php?m=bug&f=view&bugID=${bugID}`;

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

async function request(jar, url, options = {}) {
  const headers = new Headers(options.headers || {});
  const cookie = jar.header();
  if (cookie) headers.set("Cookie", cookie);
  const response = await fetch(url, { ...options, headers, redirect: "manual" });
  jar.add(response.headers.getSetCookie?.() ?? response.headers.get("set-cookie"));
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

async function login() {
  const jar = new CookieJar();
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
  return jar;
}

function clipFromRect(rect, viewport) {
  const x = Math.max(0, Math.floor(rect.x));
  const y = Math.max(0, Math.floor(rect.y));
  const width = Math.max(1, Math.min(Math.ceil(rect.width), viewport.width - x));
  const height = Math.max(1, Math.min(Math.ceil(rect.height), viewport.height - y));
  return { x, y, width, height };
}

async function collectFrameImages(page, selector) {
  const results = [];
  for (const frame of page.frames()) {
    const frameUrl = frame.url();
    const count = await frame.locator(selector).count().catch(() => 0);
    if (count) {
      await frame.locator(selector).first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
    }
    const frameImages = await frame
      .evaluate(async () => {
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
      })
      .catch(() => []);
    for (const image of frameImages) results.push({ frameUrl, ...image });
  }
  return results;
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const jar = await login();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    locale: "zh-CN",
    timezoneId: "Asia/Shanghai",
    viewport: { width: 1440, height: 1200 },
    extraHTTPHeaders: { "Accept-Language": "zh-CN,zh;q=0.9" },
  });
  await context.addCookies(jar.playwrightCookies());

  const page = await context.newPage();
  const requestFailures = [];
  const imageResponses = [];
  page.on("requestfailed", (request) => {
    requestFailures.push({ url: request.url(), failure: request.failure()?.errorText || "" });
  });
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

  await page.goto(viewUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1200);

  const evidenceSelector = [
    'img[alt="zentao-template-test-evidence.png"]',
    '.detail-main img[src*="m=file"]',
    '.article img',
  ].join(", ");
  const images = await collectFrameImages(page, evidenceSelector);
  const articleImageCount = images.length;

  const fullScreenshot = path.join(outDir, `bug${bugID}-visual-check-full.png`);
  await page.screenshot({ path: fullScreenshot, fullPage: true });

  let imageScreenshot = null;
  const imageFrame = page.frames().find((frame) => frame.url() === images[0]?.frameUrl);
  if (imageFrame && images[0]?.rect?.width > 0 && images[0]?.rect?.height > 0) {
    imageScreenshot = path.join(outDir, `bug${bugID}-visual-check-image.png`);
    await imageFrame.locator(evidenceSelector).first().screenshot({ path: imageScreenshot });
  }

  const result = {
    ok: images.some((img) => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0 && img.rect.width > 0 && img.rect.height > 0 && (img.sample?.nonWhite ?? 0) > 0),
    bugID,
    viewUrl,
    finalUrl: page.url(),
    title: await page.title(),
    articleImageCount,
    images,
    imageResponses,
    requestFailures,
    fullScreenshot,
    imageScreenshot,
    checkedAt: new Date().toISOString(),
  };

  const output = path.join(outDir, `bug${bugID}-visual-check-result.json`);
  await fs.writeFile(output, JSON.stringify(result, null, 2));
  await browser.close();
  console.log(JSON.stringify({ ...result, output }, null, 2));
  if (!result.ok) process.exit(2);
}

main().catch(async (error) => {
  await fs.mkdir(outDir, { recursive: true }).catch(() => {});
  const output = path.join(outDir, `bug${bugID}-visual-check-result.json`);
  await fs.writeFile(output, JSON.stringify({ ok: false, message: error?.message || String(error), stack: error?.stack }, null, 2)).catch(() => {});
  console.error(JSON.stringify({ ok: false, message: error?.message || String(error), output }, null, 2));
  process.exit(1);
});
