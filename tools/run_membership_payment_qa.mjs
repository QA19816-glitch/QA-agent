import fs from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { chromium } from "playwright";

const runId = new Date().toISOString().replace(/[:.]/g, "-");
const outDir = path.resolve("artifacts/membership-payment-qa", runId);
const frontUrl = "https://base-web-test.guadd.fun/user/mine?tab=collect";
const adminUrl = "https://base-admin-test.guadd.fun/productSubscription/vipPackage";
const adminOrderUrl = "https://base-admin-test.guadd.fun/productSubscription/productOrder";
const zhCNContext = {
  locale: "zh-CN",
  timezoneId: "Asia/Shanghai",
  extraHTTPHeaders: {
    "Accept-Language": "zh-CN,zh;q=0.9",
  },
};

async function ask(prompt, fallback = "") {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(`${prompt}${fallback ? ` (${fallback})` : ""}: `);
  rl.close();
  return (answer.trim() || fallback).trim();
}

async function askHidden(prompt) {
  return new Promise((resolve) => {
    output.write(`${prompt}: `);
    let value = "";
    const wasRaw = input.isRaw;
    if (input.isTTY) input.setRawMode(true);
    input.resume();
    const onData = (chunk) => {
      for (const char of chunk.toString("utf8")) {
        if (char === "\r" || char === "\n") {
          input.off("data", onData);
          if (input.isTTY) input.setRawMode(wasRaw ?? false);
          output.write("\n");
          resolve(value.trim());
          return;
        }
        if (char === "\u0003") process.exit(130);
        if (char === "\b" || char === "\u007f") value = value.slice(0, -1);
        else value += char;
      }
    };
    input.on("data", onData);
  });
}

async function snapshot(page, name) {
  const png = path.join(outDir, `${name}.png`);
  const html = path.join(outDir, `${name}.html`);
  await page.screenshot({ path: png, fullPage: true }).catch(() => {});
  await fs.writeFile(html, await page.content()).catch(() => {});
  return { png, html };
}

function compact(text) {
  return (text || "").replace(/\s+/g, " ").trim();
}

async function pageInfo(page) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await page.evaluate(() => {
    const text = (el) => (el.innerText || el.textContent || "").trim().replace(/\s+/g, " ");
    const visible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    };
    return {
      url: location.href,
      title: document.title,
      bodyText: document.body.innerText.replace(/\s+/g, " ").slice(0, 9000),
      headings: [...document.querySelectorAll("h1,h2,h3,[class*=title],[class*=Title]")].filter(visible).map(text).filter(Boolean).slice(0, 80),
      buttons: [...document.querySelectorAll("button,[role=button],.ant-btn,.el-button")].filter(visible).map(text).filter(Boolean).slice(0, 140),
      links: [...document.querySelectorAll("a")].filter(visible).map((a) => ({ text: text(a), href: a.href })).filter((x) => x.text || x.href).slice(0, 160),
      inputs: [...document.querySelectorAll("input,textarea")].filter(visible).map((el) => ({
        placeholder: el.getAttribute("placeholder") || "",
        type: el.getAttribute("type") || "",
        value: el.value ? "***" : "",
        disabled: el.disabled,
      })).slice(0, 80),
      tableRows: document.querySelectorAll("tbody tr,.ant-table-row,.el-table__row").length,
      cards: document.querySelectorAll("[class*=card],[class*=Card],.ant-card,.el-card").length,
      rawI18nKeys: [...document.body.innerText.matchAll(/\b(?:menu|page|productSubscription|payment|vip)\.[a-zA-Z0-9_.-]+/g)].map((m) => m[0]).slice(0, 40),
    };
      });
    } catch (error) {
      if (!/Execution context was destroyed|navigation/i.test(error?.message || "") || attempt === 2) throw error;
      await page.waitForLoadState("domcontentloaded", { timeout: 10000 }).catch(() => {});
      await page.waitForTimeout(800);
    }
  }
}

async function installMonitors(page, bucket) {
  page.on("console", (msg) => {
    if (["error", "warning"].includes(msg.type())) bucket.console.push({ type: msg.type(), text: msg.text().slice(0, 800) });
  });
  page.on("requestfailed", (req) => bucket.requestFailures.push({
    url: req.url(),
    method: req.method(),
    failure: req.failure()?.errorText || "",
  }));
  page.on("response", (res) => {
    if (res.status() >= 400) bucket.errorResponses.push({ url: res.url(), status: res.status(), statusText: res.statusText() });
  });
  page.on("pageerror", (error) => bucket.pageErrors.push(error.message));
}

async function openLoginIfNeeded(page) {
  const info = await pageInfo(page);
  if (/密码|password/i.test(info.bodyText)) return;
  const clickedAvatar = await page.evaluate(() => {
    const visible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    };
    const buttons = [...document.querySelectorAll("button")].filter(visible);
    const avatar = buttons.find((button) => {
      const rect = button.getBoundingClientRect();
      const text = (button.innerText || button.textContent || "").trim();
      return !text && rect.left < 420 && rect.top < 520 && rect.width >= 40 && rect.height >= 40;
    });
    if (!avatar) return false;
    avatar.click();
    return true;
  }).catch(() => false);
  if (clickedAvatar) {
    await page.waitForTimeout(1200);
    const afterAvatar = await pageInfo(page);
    if (/密码|password|email|邮箱/i.test(afterAvatar.bodyText)) return;
  }
  const candidates = [
    'button:has-text("Log in")',
    '[role=button]:has-text("Log in")',
    'button:has-text("登录")',
    '[role=button]:has-text("登录")',
  ];
  for (const selector of candidates) {
    const login = page.locator(selector).first();
    if (await login.count()) {
      await login.click({ timeout: 5000, force: true }).catch(() => {});
      await page.waitForTimeout(1000);
      return;
    }
  }
  const textLogin = page.getByText(/^Log in$|^登录$/i).first();
  if (await textLogin.count()) await textLogin.click({ timeout: 5000, force: true }).catch(() => {});
  await page.waitForTimeout(1000);
}

async function fillLogin(page, account, password) {
  await openLoginIfNeeded(page);
  const candidates = [
    'input[type="email"]',
    'input[name*="email" i]',
    'input[name*="account" i]',
    'input[name*="user" i]',
    'input[placeholder*="邮箱"]',
    'input[placeholder*="email" i]',
    'input[placeholder*="账号"]',
    'input[placeholder*="手机"]',
    'input[type="text"]',
  ];
  let accountInput;
  for (const selector of candidates) {
    const loc = page.locator(selector).first();
    if (await loc.count()) {
      accountInput = loc;
      break;
    }
  }
  const passwordInput = page.locator('input[type="password"], input[placeholder*="密码"], input[placeholder*="password" i]').first();
  if (!accountInput || !(await passwordInput.count())) return false;
  await accountInput.fill(account);
  await passwordInput.fill(password);
  const checkboxes = page.locator('input[type="checkbox"]');
  for (let i = 0; i < Math.min(await checkboxes.count(), 3); i += 1) {
    const box = checkboxes.nth(i);
    if (await box.isVisible().catch(() => false)) await box.check({ force: true }).catch(() => {});
  }
  const submit = page.locator('button:has-text("登录"), button:has-text("Login"), button:has-text("Sign in"), button[type="submit"], [role=button]:has-text("登录")').first();
  if (await submit.count()) {
    await Promise.all([
      page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {}),
      submit.click(),
    ]);
  } else {
    await passwordInput.press("Enter");
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  }
  await page.waitForTimeout(2500);
  return true;
}

async function loginWithCandidates(page, url, account, passwords, prefix) {
  const attempts = [];
  for (const password of passwords) {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
    await snapshot(page, `${prefix}-login-before-${attempts.length + 1}`);
    const before = await pageInfo(page);
    const hasLoginEntry = /登录|log in|sign in|密码|password/i.test(before.bodyText);
    if (!hasLoginEntry) return { ok: true, passwordUsedIndex: attempts.length, alreadyLoggedIn: true };
    const filled = await fillLogin(page, account, password);
    const after = await pageInfo(page);
    await snapshot(page, `${prefix}-login-after-${attempts.length + 1}`);
    const ok = filled && !/密码错误|账号.*错误|登录失败|invalid|incorrect/i.test(after.bodyText) && !/\/login|\/signin/i.test(after.url);
    attempts.push({ filled, url: after.url, ok, text: after.bodyText.slice(0, 500) });
    if (ok) return { ok: true, passwordUsedIndex: attempts.length - 1, attempts };
  }
  return { ok: false, attempts };
}

async function safeClickByText(page, patterns, name, stopPatterns = []) {
  const before = await pageInfo(page);
  for (const pattern of patterns) {
    const loc = page.getByText(pattern, { exact: false }).first();
    if (!(await loc.count())) continue;
    const text = compact(await loc.innerText().catch(() => pattern));
    if (stopPatterns.some((stop) => new RegExp(stop, "i").test(text))) return { clicked: false, stopped: true, text };
    await Promise.all([
      page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {}),
      loc.click({ timeout: 5000 }).catch(() => {}),
    ]);
    await page.waitForTimeout(1500);
    const after = await pageInfo(page);
    await snapshot(page, name);
    return { clicked: true, pattern, text, before: before.url, after: after.url, afterText: after.bodyText.slice(0, 1200) };
  }
  return { clicked: false };
}

function addFinding(findings, item) {
  findings.push({ id: `F${String(findings.length + 1).padStart(2, "0")}`, ...item });
}

function analyzePage(findings, scope, info, evidence, extra = {}) {
  if (info.rawI18nKeys?.length) {
    addFinding(findings, {
      scope,
      title: `${scope} 页面展示国际化 key`,
      severity: 3,
      priority: 2,
      evidence,
      actual: `页面可见 ${info.rawI18nKeys.slice(0, 6).join("、")} 等未翻译 key。`,
      expected: "页面菜单、标题、按钮等文案应展示面向用户的中文业务名称。",
      ...extra,
    });
  }
  const businessTextLength = info.bodyText.replace(/退出|登录|首页|我的|设置|管理员|使用指引/g, "").trim().length;
  if ((/productSubscription|vipPackage|productOrder/.test(info.url) || /会员|支付|订单/.test(scope)) && businessTextLength < 80 && info.tableRows === 0 && info.cards === 0) {
    addFinding(findings, {
      scope,
      title: `${scope} 页面内容为空，核心功能不可用`,
      severity: 2,
      priority: 2,
      evidence,
      actual: "页面打开后没有可操作的业务列表、会员包卡片、订单记录或配置入口。",
      expected: "会员/支付相关页面应展示业务数据、空状态说明或明确的创建/购买入口。",
      ...extra,
    });
  }
}

async function runFront(context, credentials) {
  const page = await context.newPage();
  const monitor = { console: [], requestFailures: [], errorResponses: [], pageErrors: [] };
  await installMonitors(page, monitor);
  const result = { monitor, checkpoints: [] };
  result.login = await loginWithCandidates(page, frontUrl, credentials.frontAccount, credentials.frontPasswords, "front");
  await page.goto(frontUrl, { waitUntil: "domcontentloaded", timeout: 45000 }).catch(() => {});
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  const collectInfo = await pageInfo(page);
  const collectShot = await snapshot(page, "front-collect-page");
  result.checkpoints.push({ name: "我的收藏", info: collectInfo, evidence: collectShot.png });

  const membershipNav = await safeClickByText(page, ["会员", "VIP", "开通", "续费", "购买"], "front-membership-entry", ["确认支付", "立即支付", "Pay"]);
  result.checkpoints.push({ name: "会员入口", action: membershipNav, info: await pageInfo(page), evidence: path.join(outDir, "front-membership-entry.png") });

  const packageInfo = await pageInfo(page);
  const packageShot = await snapshot(page, "front-membership-package");
  result.checkpoints.push({ name: "会员包/购买页", info: packageInfo, evidence: packageShot.png });

  const buyAction = await safeClickByText(page, ["立即开通", "立即购买", "购买", "开通", "确认订单"], "front-payment-before-real-pay", ["确认支付", "立即支付", "支付", "Pay"]);
  const payInfo = await pageInfo(page);
  const payShot = await snapshot(page, "front-payment-stop");
  result.checkpoints.push({ name: "支付前置流程", action: buyAction, info: payInfo, evidence: payShot.png, note: "真实支付按钮未点击。" });
  await page.close();
  return result;
}

async function runAdmin(context, credentials) {
  const page = await context.newPage();
  const monitor = { console: [], requestFailures: [], errorResponses: [], pageErrors: [] };
  await installMonitors(page, monitor);
  const result = { monitor, checkpoints: [] };
  result.login = await loginWithCandidates(page, adminUrl, credentials.adminAccount, credentials.adminPasswords, "admin");
  if (!result.login.ok) {
    const blockedInfo = await pageInfo(page);
    const blockedShot = await snapshot(page, "admin-login-blocked");
    result.checkpoints.push({ name: "后台登录阻塞", blocked: true, info: blockedInfo, evidence: blockedShot.png });
    await page.close();
    return result;
  }
  await page.goto(adminUrl, { waitUntil: "domcontentloaded", timeout: 45000 }).catch(() => {});
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  const vipInfo = await pageInfo(page);
  const vipShot = await snapshot(page, "admin-vip-package");
  result.checkpoints.push({ name: "后台会员包商品管理", info: vipInfo, evidence: vipShot.png });

  const createAction = await safeClickByText(page, ["新增", "创建", "新建", "添加"], "admin-vip-package-create-dialog");
  result.checkpoints.push({ name: "后台会员包创建入口", action: createAction, info: await pageInfo(page), evidence: path.join(outDir, "admin-vip-package-create-dialog.png") });

  await page.goto(adminOrderUrl, { waitUntil: "domcontentloaded", timeout: 45000 }).catch(() => {});
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  const orderInfo = await pageInfo(page);
  const orderShot = await snapshot(page, "admin-product-order");
  result.checkpoints.push({ name: "后台商品订单管理", info: orderInfo, evidence: orderShot.png });
  await page.close();
  return result;
}

function analyzeResults(results) {
  const findings = [];
  for (const cp of results.front.checkpoints) analyzePage(findings, `前台-${cp.name}`, cp.info, cp.evidence, { url: cp.info?.url });
  for (const cp of results.admin.checkpoints.filter((item) => !item.blocked)) analyzePage(findings, cp.name, cp.info, cp.evidence, { url: cp.info?.url });
  if (!results.admin.login.ok) {
    addFinding(findings, {
      scope: "后台登录",
      title: "后台账号无法登录，会员包与订单后台测试被阻塞",
      severity: 2,
      priority: 1,
      evidence: results.admin.checkpoints[0]?.evidence,
      actual: "使用提供的后台账号密码候选登录均提示失败，无法进入会员包管理和商品订单管理页面。",
      expected: "测试账号应能登录后台，进入会员包商品管理和商品订单管理页面完成配置/订单验证。",
      url: results.admin.checkpoints[0]?.info?.url,
      blocked: true,
    });
  }
  for (const [area, run] of [["前台", results.front], ["后台", results.admin]]) {
    const badResponses = run.monitor.errorResponses.filter((res) => !/\.(png|jpe?g|gif|svg|ico|css|woff2?)($|\?)/i.test(res.url));
    const failures = run.monitor.requestFailures.filter((req) => !/\.(png|jpe?g|gif|svg|ico|css|woff2?)($|\?)/i.test(req.url));
    if (badResponses.length || failures.length || run.monitor.pageErrors.length) {
      addFinding(findings, {
        scope: area,
        title: `${area}会员/支付流程存在接口或脚本异常`,
        severity: 2,
        priority: 2,
        evidence: area === "前台" ? results.front.checkpoints.at(-1)?.evidence : results.admin.checkpoints.at(-1)?.evidence,
        actual: `检测到 ${badResponses.length} 个 4xx/5xx 响应、${failures.length} 个请求失败、${run.monitor.pageErrors.length} 个页面脚本错误。`,
        expected: "会员/支付流程不应出现阻断业务使用的接口错误或前端脚本异常。",
        details: { badResponses: badResponses.slice(0, 8), failures: failures.slice(0, 8), pageErrors: run.monitor.pageErrors.slice(0, 5) },
      });
    }
  }
  return findings;
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const frontAccount = await ask("front account", "915726010@qq.com");
  const frontPasswords = (await askHidden("front password candidates, comma separated")).split(",").map((x) => x.trim()).filter(Boolean);
  const adminAccount = await ask("admin account", "admin");
  const adminPasswords = (await askHidden("admin password candidates, comma separated")).split(",").map((x) => x.trim()).filter(Boolean);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, ...zhCNContext, ignoreHTTPSErrors: true });
  const results = {
    runId,
    outDir,
    scope: {
      frontUrl,
      adminUrl,
      adminOrderUrl,
      paymentRule: "真实支付不测试；遇到确认支付/立即支付/支付按钮即停止。",
    },
    front: await runFront(context, { frontAccount, frontPasswords }),
    admin: await runAdmin(context, { adminAccount, adminPasswords }),
  };
  results.findings = analyzeResults(results);
  await fs.writeFile(path.join(outDir, "membership-payment-qa-result.json"), JSON.stringify(results, null, 2));
  await browser.close();
  console.log(JSON.stringify({
    ok: true,
    outDir,
    findingCount: results.findings.length,
    findings: results.findings.map((f) => ({ id: f.id, title: f.title, evidence: f.evidence })),
  }, null, 2));
  process.exit(0);
}

main().catch(async (error) => {
  await fs.mkdir(outDir, { recursive: true }).catch(() => {});
  await fs.writeFile(path.join(outDir, "error.json"), JSON.stringify({ message: error?.message, stack: error?.stack }, null, 2)).catch(() => {});
  console.error(JSON.stringify({ ok: false, outDir, message: error?.message ?? String(error), stack: error?.stack }, null, 2));
  process.exit(1);
});
