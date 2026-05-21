import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const origin = "https://base-web-test.guadd.fun";
const membershipUrl = `${origin}/membership-center`;
const probePath = path.resolve("artifacts/front-profile-probe/base-web-test02.guadd.fun_user_mine_tab_collect/result.json");
const outDir = path.resolve("artifacts/front-create-pending-membership-order");
const zhCNContext = {
  locale: "zh-CN",
  timezoneId: "Asia/Shanghai",
  extraHTTPHeaders: {
    "Accept-Language": "zh-CN,zh;q=0.9",
  },
};

function pickInteresting(traces) {
  return traces.filter((item) => /membership|order|pay|cash|collect|trade|user\//i.test(item.url || ""));
}

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
    const body = /membership|order|pay|cash|trade|user\//i.test(url)
      ? (await res.text().catch(() => "")).slice(0, 3000)
      : undefined;
    traces.push({
      type: "response",
      url,
      status: res.status(),
      headers: await res.allHeaders().catch(() => ({})),
      ...(body ? { body } : {}),
    });
  });

  await page.goto(membershipUrl, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(2500);

  await page.screenshot({ path: path.join(outDir, "01-membership-center.png"), fullPage: true }).catch(() => {});

  const buyButton = page.getByText("立即购买", { exact: false }).last();
  if (!(await buyButton.count())) throw new Error("未找到立即购买按钮");

  await Promise.all([
    page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {}),
    buyButton.click({ timeout: 5000 }),
  ]);
  await page.waitForTimeout(3500);

  const pageState = await page.evaluate(() => ({
    url: location.href,
    title: document.title,
    bodyText: document.body.innerText.replace(/\s+/g, " ").slice(0, 4000),
    localStorage: { ...localStorage },
  }));

  await page.screenshot({ path: path.join(outDir, "02-after-buy-click.png"), fullPage: true }).catch(() => {});
  await fs.writeFile(path.join(outDir, "page.html"), await page.content()).catch(() => {});
  await fs.writeFile(path.join(outDir, "trace.json"), JSON.stringify({ pageState, traces }, null, 2));

  const interesting = pickInteresting(traces);
  console.log(JSON.stringify({
    pageState,
    interesting: interesting.slice(-40),
    output: path.join(outDir, "trace.json"),
  }, null, 2));

  await context.close();
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
