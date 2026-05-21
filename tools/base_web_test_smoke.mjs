import fs from "node:fs/promises";
import path from "node:path";
import { chromium, devices } from "playwright";

const BASE_URL = "https://base-web-test.guadd.fun/";
const OUT_DIR = path.resolve("artifacts/base-web-test-qa");
const ZH_CN_CONTEXT = {
  locale: "zh-CN",
  timezoneId: "Asia/Shanghai",
  extraHTTPHeaders: {
    "Accept-Language": "zh-CN,zh;q=0.9",
  },
};

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function uniqBy(items, keyFn) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    const key = keyFn(item);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
}

function clip(text, length = 220) {
  return String(text || "").replace(/\s+/g, " ").trim().slice(0, length);
}

function safeName(input) {
  const cleaned = String(input)
    .replace(/^https?:\/\//, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 80);
  return cleaned || null;
}

async function collectPageBasics(page) {
  const title = await page.title();
  const h1 = await page.locator("h1").first().textContent().catch(() => null);
  const bodyText = await page.locator("body").innerText().catch(() => "");
  const links = await page.locator("a[href]").evaluateAll((nodes) =>
    nodes
      .map((node) => ({
        text: (node.textContent || "").replace(/\s+/g, " ").trim(),
        href: node.href,
      }))
      .filter((item) => item.href),
  );
  return { title, h1: h1?.trim() || null, bodySnippet: clip(bodyText), links };
}

async function visit(browser, url, { name, device } = {}) {
  const context = await browser.newContext(device ? { ...devices[device], ...ZH_CN_CONTEXT } : {
    viewport: { width: 1440, height: 900 },
    ...ZH_CN_CONTEXT,
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const requestFailures = [];
  const responses = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });
  page.on("requestfailed", (request) => {
    requestFailures.push({
      url: request.url(),
      method: request.method(),
      failure: request.failure()?.errorText || "unknown",
    });
  });
  page.on("response", (response) => {
    const status = response.status();
    if (status >= 400) {
      responses.push({
        url: response.url(),
        status,
      });
    }
  });

  const startedAt = new Date().toISOString();
  let topResponse = null;
  let error = null;

  try {
    topResponse = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
  }

  let basics = { title: null, h1: null, bodySnippet: "", links: [] };
  if (!error) {
    basics = await collectPageBasics(page);
    const fileBase =
      safeName(name) ||
      safeName(new URL(url).pathname) ||
      safeName(url) ||
      "page";
    await page.screenshot({
      path: path.join(OUT_DIR, `${fileBase}.png`),
      fullPage: true,
    }).catch(() => {});
  }

  const result = {
    name: name || url,
    device: device || "desktop",
    startedAt,
    requestedUrl: url,
    finalUrl: page.url(),
    topStatus: topResponse?.status() ?? null,
    title: basics.title,
    h1: basics.h1,
    bodySnippet: basics.bodySnippet,
    consoleErrors,
    requestFailures,
    responseErrors: responses,
    linkCount: basics.links.length,
    links: basics.links,
    error,
  };

  await context.close();
  return result;
}

function pickTargets(homeLinks) {
  const sameHostLinks = homeLinks.filter((item) => item.href.startsWith("https://base-web-test.guadd.fun/"));
  const priorityMatchers = [/\/category\//, /\/video\//, /\/user\/mine/];

  const selected = [];
  for (const matcher of priorityMatchers) {
    const match = sameHostLinks.find((item) => matcher.test(item.href));
    if (match) selected.push(match);
  }

  return uniqBy(selected, (item) => item.href).slice(0, 3);
}

async function main() {
  await ensureDir(OUT_DIR);
  const browser = await chromium.launch({ headless: true });

  try {
    console.log("Visiting desktop home...");
    const home = await visit(browser, BASE_URL, { name: "home-desktop" });
    console.log("Visiting mobile home...");
    const mobileHome = await visit(browser, BASE_URL, { name: "home-mobile", device: "Pixel 7" });
    const targets = pickTargets(home.links);
    const targetResults = [];
    for (const target of targets) {
      console.log(`Visiting target: ${target.href}`);
      targetResults.push(await visit(browser, target.href, { name: target.text || target.href }));
    }

    const summary = {
      baseUrl: BASE_URL,
      generatedAt: new Date().toISOString(),
      home,
      mobileHome,
      targets,
      targetResults,
    };

    await fs.writeFile(path.join(OUT_DIR, "smoke-results.json"), JSON.stringify(summary, null, 2));
    console.log(JSON.stringify({
      ok: true,
      outDir: OUT_DIR,
      targetCount: targetResults.length,
      generatedAt: summary.generatedAt,
    }, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
