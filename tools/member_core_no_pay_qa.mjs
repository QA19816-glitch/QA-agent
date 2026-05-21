import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright";

const runDir = path.join(os.tmpdir(), `member-core-no-pay-${Date.now()}`);
const adminState = path.resolve("artifacts/qa-run/admin-storage-state.json");
const frontBase = "https://base-web-test.guadd.fun";
const adminBase = "https://base-admin-test.guadd.fun";
const zhCNContext = {
  locale: "zh-CN",
  timezoneId: "Asia/Shanghai",
  extraHTTPHeaders: {
    "Accept-Language": "zh-CN,zh;q=0.9",
  },
};

async function wait(page, ms = 800) {
  await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(ms);
}

async function shot(page, name) {
  const file = path.join(runDir, `${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  return file;
}

async function info(page) {
  return page.evaluate(() => {
    const visible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    };
    const text = (el) => (el.innerText || el.textContent || "").trim().replace(/\s+/g, " ");
    return {
      url: location.href,
      title: document.title,
      bodyText: document.body.innerText.replace(/\s+/g, " ").slice(0, 12000),
      buttons: [...document.querySelectorAll("button,[role=button],.ant-btn,.el-button")].filter(visible).map(text).filter(Boolean).slice(0, 180),
      links: [...document.querySelectorAll("a")].filter(visible).map((a) => ({ text: text(a), href: a.href })).filter((x) => x.text || x.href).slice(0, 120),
      inputs: [...document.querySelectorAll("input,textarea")].filter(visible).map((el) => ({
        placeholder: el.getAttribute("placeholder") || "",
        type: el.getAttribute("type") || "",
        value: el.value,
        disabled: el.disabled,
      })).slice(0, 120),
      rows: document.querySelectorAll("tbody tr,.ant-table-row,.el-table__row").length,
      cards: document.querySelectorAll("[class*=card],[class*=Card],.ant-card,.el-card").length,
    };
  });
}

function addFinding(findings, finding) {
  findings.push({ id: `M${String(findings.length + 1).padStart(2, "0")}`, ...finding });
}

function hasPaymentConfirmText(text) {
  return /确认支付|立即支付|支付中|支付宝|微信支付|Pay now|Confirm Payment/i.test(text);
}

async function safeClick(page, texts, name) {
  const before = await info(page);
  for (const text of texts) {
    const loc = page.getByText(text, { exact: false }).first();
    if (!(await loc.count())) continue;
    const label = await loc.innerText().catch(() => text);
    if (hasPaymentConfirmText(label)) return { clicked: false, stopped: true, label };
    await Promise.all([
      page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {}),
      loc.click({ timeout: 5000, force: true }).catch(() => {}),
    ]);
    await wait(page, 1200);
    const after = await info(page);
    if (hasPaymentConfirmText(after.bodyText)) {
      const evidence = await shot(page, `${name}-pay-stop`);
      return { clicked: true, stoppedBeforeRealPay: true, label, before: before.url, after: after.url, evidence, info: after };
    }
    const evidence = await shot(page, name);
    return { clicked: true, label, before: before.url, after: after.url, evidence, info: after };
  }
  return { clicked: false, before: before.url };
}

async function runFront(context) {
  const page = await context.newPage();
  const errors = [];
  page.on("response", (res) => {
    if (res.status() >= 400 && !/\.(png|jpe?g|gif|svg|ico|css|woff2?)($|\?)/i.test(res.url())) {
      errors.push({ status: res.status(), url: res.url() });
    }
  });
  page.on("requestfailed", (req) => {
    if (!/\.(png|jpe?g|gif|svg|ico|css|woff2?)($|\?)/i.test(req.url())) {
      errors.push({ failure: req.failure()?.errorText || "failed", url: req.url() });
    }
  });

  const checkpoints = [];
  await page.goto(`${frontBase}/user/mine?tab=collect`, { waitUntil: "domcontentloaded", timeout: 45000 }).catch(() => {});
  await wait(page, 1800);
  checkpoints.push({ name: "mine", url: page.url(), info: await info(page), evidence: await shot(page, "front-mine") });
  const openMember = await safeClick(page, ["开通VIP会员", "开通会员", "会员中心", "VIP"], "front-open-member");
  checkpoints.push({ name: "open-member-action", action: openMember, info: openMember.info ?? await info(page), evidence: openMember.evidence });
  await page.goto(`${frontBase}/user/mine?tab=collect`, { waitUntil: "domcontentloaded", timeout: 45000 }).catch(() => {});
  await wait(page, 1200);
  const orderAction = await safeClick(page, ["订单列表", "订单", "Order"], "front-order-action");
  checkpoints.push({ name: "order-action", action: orderAction, info: orderAction.info ?? await info(page), evidence: orderAction.evidence });
  const buyPrepay = await safeClick(page, ["立即开通", "立即购买", "开通", "购买", "确认订单"], "front-buy-prepay");
  checkpoints.push({ name: "buy-prepay", action: buyPrepay, info: buyPrepay.info ?? await info(page), evidence: buyPrepay.evidence, noRealPayment: true });

  await page.close();
  return { checkpoints, errors };
}

async function runAdmin(context) {
  const page = await context.newPage();
  const errors = [];
  page.on("response", (res) => {
    if (res.status() >= 400 && !/\.(png|jpe?g|gif|svg|ico|css|woff2?)($|\?)/i.test(res.url())) {
      errors.push({ status: res.status(), url: res.url() });
    }
  });
  const checkpoints = [];
  await page.goto(`${adminBase}/login`, { waitUntil: "domcontentloaded", timeout: 45000 }).catch(() => {});
  await wait(page, 1000);
  if (/用户名|密码|登 录/.test((await info(page)).bodyText)) {
    await page.locator('input#username,input[placeholder="admin"],input[type="text"]').first().fill("admin");
    await page.locator('input#password,input[type="password"]').first().fill("test123456");
    await Promise.all([
      page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {}),
      page.getByText("登 录", { exact: true }).click({ timeout: 5000 }).catch(() => {}),
    ]);
    await wait(page, 2500);
  }
  for (const [name, url] of [
    ["vip-package", `${adminBase}/productSubscription/vipPackage`],
    ["product-order", `${adminBase}/productSubscription/productOrder`],
  ]) {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 }).catch(() => {});
    await wait(page, 1800);
    checkpoints.push({ name, url, info: await info(page), evidence: await shot(page, `admin-${name}`) });
  }
  const vipCreate = await safeClick(page, ["创 建", "创建", "新增", "添加"], "admin-vip-create");
  checkpoints.push({ name: "vip-create-action", action: vipCreate, info: vipCreate.info ?? await info(page), evidence: vipCreate.evidence });
  await page.close();
  return { checkpoints, errors };
}

function analyze(front, admin) {
  const findings = [];
  for (const cp of admin.checkpoints) {
    const text = cp.info?.bodyText || "";
    if (/menu\.productSubscription\./.test(text)) {
      addFinding(findings, {
        title: "会员后台菜单显示国际化key",
        scope: cp.name,
        evidence: cp.evidence,
        actual: "商品订购管理下展示 menu.productSubscription.vipPackage / menu.productSubscription.productOrder 等 key。",
        expected: "应展示「会员包商品管理」「商品订单管理」等中文业务名称。",
        url: cp.info.url,
      });
    }
    if (/productSubscription/.test(cp.info?.url || "") && cp.info.rows === 0 && cp.info.cards === 0 && !/创 建|搜索|重 置|订单|会员包|商品/.test(text.replace(/menu\.productSubscription\.\w+/g, ""))) {
      addFinding(findings, {
        title: `${cp.name === "vip-package" ? "会员包商品管理" : "商品订单管理"}页面主体为空`,
        scope: cp.name,
        evidence: cp.evidence,
        actual: "页面只有菜单/面包屑，没有筛选项、列表、创建入口或空状态说明。",
        expected: "应展示会员包商品管理或商品订单管理的筛选、列表、创建/查看等核心功能。",
        url: cp.info.url,
      });
    }
  }
  for (const cp of front.checkpoints) {
    const text = cp.info?.bodyText || "";
    if (/会员|VIP|订单/.test(cp.name + text) && /Log in to see more|登录弹窗|No account|Sign up or log in/.test(text) && !/订单编号|有效期|会员套餐|开通记录|订单状态/.test(text)) {
      addFinding(findings, {
        title: `前台${cp.name.includes("order") ? "订单" : "会员"}页面未展示登录后业务内容`,
        scope: cp.name,
        evidence: cp.evidence,
        actual: "页面停留在登录/游客提示，未展示会员权益、会员套餐、订单记录或明确的登录完成状态。",
        expected: "登录用户进入会员中心/订单列表应展示对应会员权益、套餐或订单信息；未登录时应明确引导登录。",
        url: cp.info.url,
      });
    }
  }
  const frontBusinessErrors = front.errors.filter((item) => !/cloudflareinsights|favicon/.test(item.url)).slice(0, 8);
  if (frontBusinessErrors.length) {
    addFinding(findings, {
      title: "前台会员链路存在接口请求异常",
      scope: "front",
      evidence: front.checkpoints.at(-1)?.evidence,
      actual: `会员/订单链路检测到 ${frontBusinessErrors.length} 个业务请求异常。`,
      expected: "会员中心、订单列表和支付前置流程不应出现阻断业务的接口错误。",
      details: frontBusinessErrors,
    });
  }
  return findings;
}

async function main() {
  await fs.mkdir(runDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const frontContext = await browser.newContext({ viewport: { width: 390, height: 844 }, ...zhCNContext, ignoreHTTPSErrors: true });
  const adminContext = await browser.newContext({ viewport: { width: 1440, height: 1200 }, ...zhCNContext, ignoreHTTPSErrors: true, storageState: adminState });
  const front = await runFront(frontContext);
  const admin = await runAdmin(adminContext);
  const findings = analyze(front, admin);
  const result = {
    ok: true,
    runDir,
    paymentRule: "未点击确认支付/立即支付/支付按钮；支付前置页即停止。",
    front,
    admin,
    findings,
  };
  await fs.writeFile(path.join(runDir, "member-core-no-pay-result.json"), JSON.stringify(result, null, 2));
  await browser.close();
  console.log(JSON.stringify({
    ok: true,
    runDir,
    findingCount: findings.length,
    findings: findings.map(({ id, title, actual, expected, evidence, url }) => ({ id, title, actual, expected, evidence, url })),
  }, null, 2));
}

main().catch((error) => {
  console.error(JSON.stringify({ ok: false, runDir, message: error?.message ?? String(error), stack: error?.stack }, null, 2));
  process.exit(1);
});
