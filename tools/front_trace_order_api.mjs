import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const targetOrigin = process.argv[2] || "https://base-web-test02.guadd.fun";
const targetPath = process.argv[3] || "/order";
const targetUrl = `${targetOrigin}${targetPath}`;
const probePath = path.resolve("artifacts/front-profile-probe/base-web-test02.guadd.fun_user_mine_tab_collect/result.json");
const outDir = path.resolve("artifacts/front-order-trace", `${targetOrigin.replace(/^https?:\/\//, "").replace(/[/:?&=#]+/g, "_")}${targetPath.replace(/[/:?&=#]+/g, "_")}`);
const zhCNContext = {
  locale: "zh-CN",
  timezoneId: "Asia/Shanghai",
  extraHTTPHeaders: {
    "Accept-Language": "zh-CN,zh;q=0.9",
  },
};

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const probe = JSON.parse(await fs.readFile(probePath, "utf8"));
  const localStorageDump = probe?.localStorageDump || {};
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    ...zhCNContext,
    ignoreHTTPSErrors: true,
  });
  await context.addInitScript((entries) => {
    for (const [key, value] of Object.entries(entries)) localStorage.setItem(key, value);
  }, localStorageDump);
  const page = await context.newPage();
  const traces = [];

  page.on("request", (req) => {
    const url = req.url();
    if (!/guadd\.fun/.test(url)) return;
    traces.push({
      type: "request",
      url,
      method: req.method(),
      headers: req.headers(),
      postData: req.postData() || "",
    });
  });
  page.on("response", async (res) => {
    const url = res.url();
    if (!/guadd\.fun/.test(url)) return;
    const record = {
      type: "response",
      url,
      status: res.status(),
      headers: await res.allHeaders().catch(() => ({})),
    };
    if (/api|order|membership|user/i.test(url)) {
      const text = await res.text().catch(() => "");
      record.body = text.slice(0, 2000);
    }
    traces.push(record);
  });

  await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2000);

  const pageState = await page.evaluate(() => ({
    url: location.href,
    title: document.title,
    bodyText: document.body.innerText.replace(/\s+/g, " ").slice(0, 3000),
    localStorage: { ...localStorage },
  }));

  await page.screenshot({ path: path.join(outDir, "order.png"), fullPage: true }).catch(() => {});
  await fs.writeFile(path.join(outDir, "order.html"), await page.content()).catch(() => {});
  await fs.writeFile(path.join(outDir, "trace.json"), JSON.stringify({ pageState, traces }, null, 2));
  console.log(JSON.stringify({
    pageState,
    interesting: traces.filter((item) => /order|membership|user|api/i.test(item.url)).slice(0, 40),
    output: path.join(outDir, "trace.json"),
  }, null, 2));
  await context.close();
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
