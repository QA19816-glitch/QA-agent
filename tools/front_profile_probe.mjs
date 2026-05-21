import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright";

const chromeRoot = path.join(os.homedir(), "Library/Application Support/Google/Chrome");
const srcProfile = path.join(chromeRoot, "Default");
const targetUrl = process.argv[2] || "https://base-web-test.guadd.fun/user/mine?tab=collect";
const safeName = targetUrl.replace(/^https?:\/\//, "").replace(/[/?&=#]+/g, "_");
const outDir = path.resolve("artifacts/front-profile-probe", safeName);
const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "front-profile-probe-"));
const zhCNContext = {
  locale: "zh-CN",
  timezoneId: "Asia/Shanghai",
  extraHTTPHeaders: {
    "Accept-Language": "zh-CN,zh;q=0.9",
  },
};

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function copyFileIfExists(src, dest) {
  try {
    await ensureDir(path.dirname(dest));
    await fs.copyFile(src, dest);
  } catch {}
}

async function copyDirIfExists(src, dest) {
  try {
    await ensureDir(dest);
    await fs.cp(src, dest, { recursive: true, force: true });
  } catch {}
}

async function main() {
  await ensureDir(outDir);
  await copyFileIfExists(path.join(chromeRoot, "Local State"), path.join(tempRoot, "Local State"));
  await copyDirIfExists(path.join(srcProfile, "Local Storage"), path.join(tempRoot, "Default/Local Storage"));
  await copyDirIfExists(path.join(srcProfile, "IndexedDB"), path.join(tempRoot, "Default/IndexedDB"));
  await copyFileIfExists(path.join(srcProfile, "Preferences"), path.join(tempRoot, "Default/Preferences"));
  await copyFileIfExists(path.join(srcProfile, "Cookies"), path.join(tempRoot, "Default/Cookies"));
  await copyFileIfExists(path.join(srcProfile, "Network/Cookies"), path.join(tempRoot, "Default/Network/Cookies"));

  const context = await chromium.launchPersistentContext(tempRoot, {
    headless: true,
    viewport: { width: 1440, height: 1000 },
    ...zhCNContext,
    ignoreHTTPSErrors: true,
    args: ["--profile-directory=Default"],
  });
  const page = await context.newPage();
  await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});

  const localStorageDump = await page.evaluate(() => ({ ...localStorage })).catch(() => ({}));
  const cookies = await context.cookies();
  const guaddCookies = cookies.filter((item) => /guadd\.fun$/.test(item.domain));
  const pageState = await page.evaluate(() => ({
    url: location.href,
    title: document.title,
    bodyText: document.body.innerText.replace(/\s+/g, " ").slice(0, 3000),
  }));

  await page.screenshot({ path: path.join(outDir, "page.png"), fullPage: true }).catch(() => {});
  await fs.writeFile(path.join(outDir, "page.html"), await page.content()).catch(() => {});
  await fs.writeFile(path.join(outDir, "result.json"), JSON.stringify({
    tempRoot,
    pageState,
    localStorageDump,
    guaddCookies,
  }, null, 2));

  console.log(JSON.stringify({
    tempRoot,
    pageState,
    localStorageKeys: Object.keys(localStorageDump),
    guaddCookies: guaddCookies.map(({ domain, name, value }) => ({ domain, name, value })),
    targetUrl,
    output: path.join(outDir, "result.json"),
  }, null, 2));

  await context.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
