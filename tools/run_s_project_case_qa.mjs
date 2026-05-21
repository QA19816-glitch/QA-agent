import fs from "node:fs/promises";
import path from "node:path";
import { chromium, devices } from "playwright";

const runId = new Date().toISOString().replace(/[:.]/g, "-");
const outDir = path.resolve("artifacts/s-project-case-qa", runId);
const feishuCases = path.resolve("artifacts/feishu/base-web-admin-test-cases-20260520.md");

const frontBase = "https://base-web-test.guadd.fun";
const adminBase = "https://base-admin-test.guadd.fun";
const zentaoOrigin = "http://13.158.151.116:8088";
const zentaoCreateBugUrl = `${zentaoOrigin}/index.php?m=bug&f=create&productID=3`;
const zentaoBrowseUrl = `${zentaoOrigin}/index.php?m=bug&f=browse&product=3&branch=all&browseType=all&param=0&orderBy=id_desc&recTotal=100&recPerPage=100`;

const credentials = {
  front: { account: "915726010@qq.com", password: "123456" },
  admin: { account: "admin", password: "test123456" },
  zentao: { account: "ken", password: "eHe8-o3u" },
};

const zhCNContext = {
  locale: "zh-CN",
  timezoneId: "Asia/Shanghai",
  extraHTTPHeaders: {
    "Accept-Language": "zh-CN,zh;q=0.9",
  },
};

async function ensureDir() {
  await fs.mkdir(outDir, { recursive: true });
}

function compact(value, max = 9000) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
}

function safeName(value) {
  return String(value || "page")
    .replace(/^https?:\/\//, "")
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "page";
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function stepsToHtml({ steps, actual, expected }) {
  const lines = [
    "[步骤]",
    ...steps.map((item, index) => `${index + 1}. ${item}`),
    "",
    "[结果]",
    ...actual.map((item, index) => `${index + 1}. ${item}`),
    "",
    "[期望]",
    ...expected.map((item, index) => `${index + 1}. ${item}`),
  ];
  return lines.map((line) => `<p>${escapeHtml(line) || "<br>"}</p>`).join("");
}

async function snapshot(page, name) {
  const png = path.join(outDir, `${safeName(name)}.png`);
  const html = path.join(outDir, `${safeName(name)}.html`);
  await page.screenshot({ path: png, fullPage: true }).catch(() => {});
  await fs.writeFile(html, await page.content()).catch(() => {});
  return { png, html };
}

async function installMonitors(page, bucket) {
  page.on("console", (msg) => {
    if (["error", "warning"].includes(msg.type())) {
      bucket.console.push({ type: msg.type(), text: msg.text().slice(0, 1000) });
    }
  });
  page.on("pageerror", (error) => bucket.pageErrors.push(error.message));
  page.on("requestfailed", (request) => bucket.requestFailures.push({
    url: request.url(),
    method: request.method(),
    failure: request.failure()?.errorText || "",
  }));
  page.on("response", (response) => {
    if (response.status() >= 400) {
      bucket.errorResponses.push({
        url: response.url(),
        status: response.status(),
        statusText: response.statusText(),
      });
    }
  });
}

async function pageInfo(page) {
  return page.evaluate(() => {
    const visible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    };
    const text = (el) => (el.innerText || el.textContent || "").trim().replace(/\s+/g, " ");
    const bottomItems = [...document.querySelectorAll("a,button,[role=button]")].filter((el) => {
      const rect = el.getBoundingClientRect();
      return visible(el) && rect.top > window.innerHeight - 150;
    }).map((el) => ({ text: text(el), href: el.href || "", rect: el.getBoundingClientRect().toJSON?.() || null })).slice(0, 20);
    return {
      url: location.href,
      title: document.title,
      bodyText: document.body.innerText.replace(/\s+/g, " ").slice(0, 12000),
      headings: [...document.querySelectorAll("h1,h2,h3,[class*=title],[class*=Title]")].filter(visible).map(text).filter(Boolean).slice(0, 120),
      buttons: [...document.querySelectorAll("button,[role=button],.ant-btn,.el-button")].filter(visible).map(text).filter(Boolean).slice(0, 180),
      links: [...document.querySelectorAll("a[href]")].filter(visible).map((a) => ({ text: text(a), href: a.href })).slice(0, 220),
      inputs: [...document.querySelectorAll("input,textarea")].filter(visible).map((el) => ({
        placeholder: el.getAttribute("placeholder") || "",
        name: el.getAttribute("name") || "",
        type: el.getAttribute("type") || "",
        disabled: el.disabled,
        readonly: el.readOnly,
      })).slice(0, 100),
      selects: [...document.querySelectorAll("select")].filter(visible).map((el) => ({
        name: el.getAttribute("name") || "",
        options: [...el.options].map((opt) => opt.textContent?.trim()).filter(Boolean).slice(0, 80),
      })).slice(0, 50),
      tableRows: document.querySelectorAll("tbody tr,.ant-table-row,.el-table__row").length,
      cards: document.querySelectorAll("[class*=card],[class*=Card],.ant-card,.el-card").length,
      videos: document.querySelectorAll("video").length,
      images: document.querySelectorAll("img").length,
      bottomItems,
      rawI18nKeys: [...document.body.innerText.matchAll(/\b(?:menu|page|productSubscription|vip|payment|component)\.[a-zA-Z0-9_.-]+/g)].map((m) => m[0]).slice(0, 80),
    };
  });
}

async function waitSettled(page, ms = 1200) {
  await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(ms);
}

async function gotoAndCollect(page, name, url) {
  let response = null;
  let error = null;
  try {
    response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await waitSettled(page);
  } catch (err) {
    error = err?.message || String(err);
  }
  const info = error ? { url: page.url(), bodyText: "", links: [], buttons: [], rawI18nKeys: [] } : await pageInfo(page);
  const evidence = await snapshot(page, name);
  return { name, requestedUrl: url, status: response?.status() ?? null, error, info, evidence };
}

async function clickText(page, texts, screenshotName) {
  for (const text of texts) {
    const locator = page.getByText(text, { exact: false }).first();
    if (!(await locator.count())) continue;
    await Promise.all([
      page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {}),
      locator.click({ timeout: 5000, force: true }).catch(() => {}),
    ]);
    await page.waitForTimeout(1200);
    return { clicked: text, evidence: await snapshot(page, screenshotName), info: await pageInfo(page) };
  }
  return { clicked: null };
}

async function loginGeneric(page, account, password, scope) {
  const before = await pageInfo(page).catch(() => ({ bodyText: "" }));
  const loginTexts = ["登录", "Log in", "Login", "Sign in", "Sign up or log in"];
  if (!/密码|password|登录|log in|sign in/i.test(before.bodyText)) {
    await clickText(page, loginTexts, `${scope}-open-login`);
  }
  const inputs = [
    'input[type="email"]',
    'input[name*="email" i]',
    'input[name*="account" i]',
    'input[name*="user" i]',
    'input[placeholder*="邮箱"]',
    'input[placeholder*="账号"]',
    'input[placeholder*="手机"]',
    'input[placeholder*="email" i]',
    'input[type="text"]',
  ];
  let accountInput = null;
  for (const selector of inputs) {
    const loc = page.locator(selector).first();
    if (await loc.count()) {
      accountInput = loc;
      break;
    }
  }
  const passwordInput = page.locator('input[type="password"], input[placeholder*="密码"], input[placeholder*="password" i]').first();
  if (!accountInput || !(await passwordInput.count())) {
    return { ok: false, reason: "login_inputs_not_found", before, after: await pageInfo(page).catch(() => null) };
  }
  await accountInput.fill(account);
  await passwordInput.fill(password);
  const boxes = page.locator('input[type="checkbox"]');
  for (let i = 0; i < Math.min(await boxes.count(), 3); i += 1) {
    await boxes.nth(i).check({ force: true }).catch(() => {});
  }
  const submit = page.locator('button:has-text("登录"),button:has-text("Login"),button:has-text("Sign in"),button[type=submit],[role=button]:has-text("登录")').first();
  if (await submit.count()) {
    await Promise.all([
      page.waitForLoadState("networkidle", { timeout: 18000 }).catch(() => {}),
      submit.click({ force: true }),
    ]);
  } else {
    await passwordInput.press("Enter");
  }
  await waitSettled(page, 2200);
  const after = await pageInfo(page);
  const failed = /密码错误|账号.*错误|登录失败|invalid|incorrect|error/i.test(after.bodyText);
  return { ok: !failed && !/\/login|\/signin/i.test(after.url), reason: failed ? "login_error_text" : null, before, after, evidence: await snapshot(page, `${scope}-login-after`) };
}

async function parseCases() {
  const md = await fs.readFile(feishuCases, "utf8");
  const modules = [...md.matchAll(/(?:^|\n)(\d+)\.\s+([^\n]+)/g)].map((match) => ({
    order: Number(match[1]),
    name: match[2].trim(),
  })).filter((item) => item.order >= 1 && item.order <= 8);
  return {
    title: md.match(/^#\s+(.+)$/m)?.[1] || "S项目优化需求 - 测试用例",
    totalCases: Number(md.match(/用例总数：(\d+)/)?.[1] || 0),
    moduleCount: Number(md.match(/模块数：(\d+)/)?.[1] || modules.length),
    modules,
  };
}

function addFinding(findings, finding) {
  const key = `${finding.scope}|${finding.title}`;
  if (findings.some((item) => `${item.scope}|${item.title}` === key)) return;
  findings.push({
    id: `BUG-${String(findings.length + 1).padStart(2, "0")}`,
    severity: finding.severity ?? 3,
    priority: finding.priority ?? 2,
    ...finding,
  });
}

function analyzePageFindings(findings, checkpoint, expected = {}) {
  const { info, evidence, requestedUrl, status, error, name } = checkpoint;
  const body = info?.bodyText || "";
  if (error || (status && status >= 400)) {
    addFinding(findings, {
      scope: name,
      title: `【Codex自动化】${name} 页面无法正常打开`,
      steps: [`打开 ${requestedUrl}`],
      actual: [`页面返回状态 ${status ?? "无响应"}${error ? `，错误：${error}` : ""}。`],
      expected: ["页面应正常打开并展示对应业务内容。"],
      evidence: evidence?.png,
    });
  }
  if (info?.rawI18nKeys?.length) {
    addFinding(findings, {
      scope: name,
      title: `【Codex自动化】${name} 页面展示未翻译国际化key`,
      steps: [`打开 ${requestedUrl}`, "观察页面菜单、标题或正文文案。"],
      actual: [`页面可见 ${info.rawI18nKeys.slice(0, 8).join("、")} 等国际化 key。`],
      expected: ["页面应展示中文业务名称，不应把国际化 key 直接暴露给用户。"],
      evidence: evidence?.png,
    });
  }
  if (expected.texts?.length) {
    const missing = expected.texts.filter((text) => !body.includes(text));
    if (missing.length) {
      addFinding(findings, {
        scope: name,
        title: `【Codex自动化】${name} 缺少需求要求的配置项`,
        steps: [`打开 ${requestedUrl}`, `检查是否展示：${expected.texts.join("、")}。`],
        actual: [`页面未发现：${missing.join("、")}。`],
        expected: [`页面应按用例展示并支持配置：${expected.texts.join("、")}。`],
        evidence: evidence?.png,
      });
    }
  }
}

function analyzeFront(findings, front) {
  for (const cp of front.checkpoints) analyzePageFindings(findings, cp);
  const order = front.checkpoints.find((item) => item.name === "前台未登录订单页");
  if (order?.info?.bodyText && !/登录|log in|sign in|密码|password/i.test(order.info.bodyText) && /order|orders|订单|No orders/i.test(order.info.bodyText)) {
    addFinding(findings, {
      scope: "前台会员订单",
      title: "【Codex自动化】未登录用户可直接进入订单页",
      steps: ["清空登录态后打开前台站点。", "访问 /order 或从个人中心进入订单列表。", "观察是否触发登录拦截。"],
      actual: ["页面直接进入订单页并展示订单空态/订单入口，未弹出登录框或跳转登录。"],
      expected: ["订单列表属于个人数据，未登录用户应先登录后才能访问。"],
      evidence: order.evidence?.png,
      priority: 1,
    });
  }
  const feed = front.checkpoints.find((item) => item.name === "前台视频流页");
  if (feed && feed.info?.videos === 0 && !/视频|播放|评论|收藏|点赞|VIP/i.test(feed.info?.bodyText || "")) {
    addFinding(findings, {
      scope: "抖音视频流",
      title: "【Codex自动化】视频流入口未展示视频播放内容",
      steps: ["打开前台站点。", "进入视频/抖音 feed 流相关入口。", "观察是否有视频播放容器和互动区。"],
      actual: ["页面未检测到 video 元素或视频播放互动内容，无法执行自动播放、滑动切换、点赞评论等 P0 用例。"],
      expected: ["视频流页面应展示可播放视频、右侧互动区、评论入口和底部信息区。"],
      evidence: feed.evidence?.png,
      priority: 1,
    });
  }
}

function analyzeAdmin(findings, admin) {
  for (const cp of admin.checkpoints) {
    const expected = cp.name === "后台功能页面管理"
      ? { texts: ["抖音视频流", "内容形式", "内容分类", "标签"] }
      : cp.name === "后台底部导航框架"
        ? { texts: ["会员中心", "商品订单记录"] }
        : cp.name === "后台组件配置"
          ? { texts: ["瀑布流-横", "图标广告", "类型入口"] }
          : cp.name === "后台会员包商品管理"
            ? { texts: ["社区"] }
            : {};
    analyzePageFindings(findings, cp, expected);
    const businessText = (cp.info?.bodyText || "").replace(/退出|登录|首页|设置|管理员|使用指引|系统/g, "").trim();
    if (/productSubscription|vipPackage|productOrder/.test(cp.info?.url || "") && businessText.length < 80 && cp.info.tableRows === 0 && cp.info.cards === 0) {
      addFinding(findings, {
        scope: cp.name,
        title: `【Codex自动化】${cp.name} 页面主体为空`,
        steps: ["登录后台。", `打开 ${cp.requestedUrl}。`, "观察页面主体内容。"],
        actual: ["页面未展示业务列表、筛选条件、新增/编辑入口或明确空态说明。"],
        expected: ["页面应展示会员包商品/商品订单的管理能力或明确空态与创建入口。"],
        evidence: cp.evidence?.png,
        priority: 1,
      });
    }
  }
  if (!admin.login?.ok) {
    addFinding(findings, {
      scope: "后台登录",
      title: "【Codex自动化】后台测试账号无法登录",
      steps: [`打开后台 ${adminBase}/contentManage/comic。`, "输入账号 admin 和提供的密码。", "点击登录。"],
      actual: [`登录未成功：${admin.login?.reason || "未知原因"}。`],
      expected: ["测试账号应能登录后台，以便执行后台配置类用例。"],
      evidence: admin.login?.evidence?.png,
      priority: 0,
    });
  }
}

async function runFront(browser) {
  const bucket = { console: [], pageErrors: [], requestFailures: [], errorResponses: [] };
  const context = await browser.newContext({ ...devices["Pixel 7"], ...zhCNContext, ignoreHTTPSErrors: true });
  const page = await context.newPage();
  await installMonitors(page, bucket);
  const checkpoints = [];

  checkpoints.push(await gotoAndCollect(page, "前台首页-移动端", `${frontBase}/`));
  checkpoints.push(await gotoAndCollect(page, "前台视频流页", `${frontBase}/domain/video_detail`));
  const feedInteraction = await clickText(page, ["评论", "Comment", "点赞", "收藏", "VIP"], "前台视频流互动尝试");
  checkpoints.push({ name: "前台视频流互动尝试", requestedUrl: page.url(), status: null, info: feedInteraction.info || await pageInfo(page), evidence: feedInteraction.evidence || await snapshot(page, "前台视频流互动尝试") });
  checkpoints.push(await gotoAndCollect(page, "前台会员中心未登录", `${frontBase}/membership-center`));

  await context.close();

  const guestContext = await browser.newContext({ ...devices["Pixel 7"], ...zhCNContext, ignoreHTTPSErrors: true });
  const guestPage = await guestContext.newPage();
  await installMonitors(guestPage, bucket);
  checkpoints.push(await gotoAndCollect(guestPage, "前台未登录订单页", `${frontBase}/order`));
  await guestContext.close();

  const loginContext = await browser.newContext({ ...devices["Pixel 7"], ...zhCNContext, ignoreHTTPSErrors: true });
  const loginPage = await loginContext.newPage();
  await installMonitors(loginPage, bucket);
  await gotoAndCollect(loginPage, "前台登录前我的页", `${frontBase}/user/mine?tab=collect`);
  const login = await loginGeneric(loginPage, credentials.front.account, credentials.front.password, "front");
  checkpoints.push({ name: "前台登录后我的页", requestedUrl: loginPage.url(), status: null, info: await pageInfo(loginPage).catch(() => login.after), evidence: await snapshot(loginPage, "前台登录后我的页") });
  await loginContext.close();

  return { bucket, login, checkpoints };
}

async function runAdmin(browser) {
  const bucket = { console: [], pageErrors: [], requestFailures: [], errorResponses: [] };
  const context = await browser.newContext({ viewport: { width: 1440, height: 1200 }, ...zhCNContext, ignoreHTTPSErrors: true });
  const page = await context.newPage();
  await installMonitors(page, bucket);
  await gotoAndCollect(page, "后台登录前漫画管理", `${adminBase}/contentManage/comic`);
  const login = await loginGeneric(page, credentials.admin.account, credentials.admin.password, "admin");
  const checkpoints = [];
  const targets = [
    ["后台漫画内容管理", `${adminBase}/contentManage/comic`],
    ["后台功能页面管理", `${adminBase}/operation/functionPage`],
    ["后台底部导航框架", `${adminBase}/operation/bottomNavigation`],
    ["后台组件配置", `${adminBase}/operation/component`],
    ["后台会员包商品管理", `${adminBase}/productSubscription/vipPackage`],
    ["后台商品订单管理", `${adminBase}/productSubscription/productOrder`],
  ];
  for (const [name, url] of targets) {
    const cp = await gotoAndCollect(page, name, url);
    checkpoints.push(cp);
    if (name === "后台功能页面管理") {
      const creation = await clickText(page, ["新建", "新增", "创建", "添加"], "后台功能页面创建弹窗");
      if (creation.clicked) {
        checkpoints.push({ name: "后台功能页面创建弹窗", requestedUrl: page.url(), status: null, info: creation.info, evidence: creation.evidence });
        await page.keyboard.press("Escape").catch(() => {});
      }
    }
    if (name === "后台会员包商品管理") {
      const creation = await clickText(page, ["新建", "新增", "创建", "添加"], "后台会员包创建弹窗");
      if (creation.clicked) {
        checkpoints.push({ name: "后台会员包创建弹窗", requestedUrl: page.url(), status: null, info: creation.info, evidence: creation.evidence });
        await page.keyboard.press("Escape").catch(() => {});
      }
    }
  }
  await context.close();
  return { bucket, login, checkpoints };
}

async function loginZentaoIfNeeded(page) {
  const text = await page.evaluate(() => document.body.innerText).catch(() => "");
  if (!/登录|密码|Password|Login/i.test(text)) return;
  await page.locator('input[name="account"], input[type="text"]').first().fill(credentials.zentao.account);
  await page.locator('input[name="password"], input[type="password"]').first().fill(credentials.zentao.password);
  await Promise.all([
    page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {}),
    page.locator('button[type=submit], input[type=submit], button:has-text("登录"), button:has-text("Login")').first().click(),
  ]);
  await waitSettled(page, 1500);
}

async function zentaoBodyText(page) {
  const frames = await Promise.all(page.frames().map(async (frame) => ({
    name: frame.name(),
    url: frame.url(),
    text: await frame.evaluate(() => document.body.innerText.replace(/\s+/g, " ").slice(0, 20000)).catch(() => ""),
  })));
  return { frames, text: frames.map((frame) => frame.text).join(" ") };
}

async function findZentaoFrame(page) {
  await waitSettled(page, 1800);
  return page.frames().find((frame) => frame.name() === "app-qa") ?? page.mainFrame();
}

async function submitFindingToZentao(browser, finding) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    ...zhCNContext,
    ignoreHTTPSErrors: true,
    storageState: path.resolve("artifacts/qa-run/zentao-storage-state.json"),
  }).catch(() => browser.newContext({ viewport: { width: 1440, height: 1200 }, ...zhCNContext, ignoreHTTPSErrors: true }));
  const page = await context.newPage();
  const result = { title: finding.title, submitted: false, skippedDuplicate: false, bugID: null, error: null };
  try {
    await page.goto(zentaoBrowseUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    await loginZentaoIfNeeded(page);
    await page.goto(zentaoBrowseUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    await waitSettled(page, 1500);
    let browse = await zentaoBodyText(page);
    if (browse.text.includes(finding.title)) {
      result.skippedDuplicate = true;
      result.note = "same title already exists in current bug list";
      return result;
    }

    await page.goto(zentaoCreateBugUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    await loginZentaoIfNeeded(page);
    await page.goto(zentaoCreateBugUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    const frame = await findZentaoFrame(page);
    await frame.locator('input[name="title"]').fill(finding.title);
    await frame.evaluate(({ severity, priority, html, keywords }) => {
      const setValue = (selector, value) => {
        const el = document.querySelector(selector);
        if (!el) return;
        el.value = value;
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
      };
      setValue('input[name="type"]', "codeerror");
      setValue('input[name="severity"]', String(severity || 3));
      setValue('input[name="pri"]', String(priority || 2));
      setValue('input[name="keywords"]', keywords || "S项目优化 自动测试");
      setValue('input[name="project"], select[name="project"], input[name="projectID"], select[name="projectID"]', "5");
      const allBuilds = document.querySelector('input[name="allBuilds"]');
      const buildSelect = document.querySelector('select[name="openedBuild[]"]');
      if (allBuilds) allBuilds.checked = false;
      if (buildSelect) {
        buildSelect.innerHTML = '<option value="trunk" selected>主干</option>';
        buildSelect.value = "trunk";
        buildSelect.dispatchEvent(new Event("change", { bubbles: true }));
      }
      const textarea = document.querySelector("textarea[name='steps'], textarea");
      if (textarea) {
        textarea.value = html;
        textarea.textContent = html;
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
        textarea.dispatchEvent(new Event("change", { bubbles: true }));
      }
      const editable = document.querySelector("[contenteditable=true]");
      if (editable) {
        editable.innerHTML = html;
        editable.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: html }));
        editable.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }, {
      severity: finding.severity,
      priority: finding.priority,
      html: stepsToHtml(finding),
      keywords: finding.scope,
    });
    if (finding.evidence) {
      const fileInput = frame.locator('input[type="file"], input[name="files[]"]').first();
      if (await fileInput.count()) await fileInput.setInputFiles(finding.evidence).catch(() => {});
    }
    await snapshot(page, `zentao-before-${finding.id}`);
    await Promise.all([
      page.waitForLoadState("networkidle", { timeout: 22000 }).catch(() => {}),
      frame.getByText("保存", { exact: true }).last().click(),
    ]);
    await waitSettled(page, 3000);
    await snapshot(page, `zentao-after-${finding.id}`);

    await page.goto(zentaoBrowseUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    await waitSettled(page, 1800);
    browse = await zentaoBodyText(page);
    const escaped = finding.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result.bugID = browse.text.match(new RegExp(`(\\d+)\\s+${escaped}`))?.[1] ?? null;
    result.submitted = Boolean(result.bugID) || browse.text.includes(finding.title);
  } catch (error) {
    result.error = error?.message || String(error);
  } finally {
    await context.close().catch(() => {});
  }
  return result;
}

async function main() {
  await ensureDir();
  const cases = await parseCases();
  const browser = await chromium.launch({ headless: true });
  const findings = [];
  let front;
  let admin;
  try {
    front = await runFront(browser);
    admin = await runAdmin(browser);
    analyzeFront(findings, front);
    analyzeAdmin(findings, admin);

    const zentao = [];
    for (const finding of findings.slice(0, 8)) {
      zentao.push(await submitFindingToZentao(browser, finding));
    }
    const result = {
      ok: true,
      runId,
      generatedAt: new Date().toISOString(),
      outDir,
      cases,
      coverage: {
        totalCases: cases.totalCases,
        modules: cases.modules.map((module) => module.name),
        executedCheckpoints: (front?.checkpoints?.length || 0) + (admin?.checkpoints?.length || 0),
        note: "用例中涉及批量数据准备、支付、跨端真实设备、后台写入保存和并发冲突的场景，本轮以可访问环境的P0/P1主链路、只读配置检查和安全拦截验证为主。",
      },
      front,
      admin,
      findings,
      zentao,
    };
    await fs.writeFile(path.join(outDir, "s-project-case-qa-result.json"), JSON.stringify(result, null, 2));
    await fs.writeFile(path.join(outDir, "s-project-case-qa-summary.md"), buildMarkdownReport(result));
    console.log(JSON.stringify({
      ok: true,
      outDir,
      result: path.join(outDir, "s-project-case-qa-result.json"),
      report: path.join(outDir, "s-project-case-qa-summary.md"),
      findings: findings.length,
      zentaoSubmitted: zentao.filter((item) => item.submitted).length,
      zentaoSkippedDuplicate: zentao.filter((item) => item.skippedDuplicate).length,
    }, null, 2));
  } finally {
    await browser.close();
  }
}

function uniqueProblems(bucket) {
  const response = (bucket?.errorResponses || [])
    .filter((item) => !/_rsc=|favicon|analytics|google|sentry/i.test(item.url))
    .slice(-20);
  const failed = (bucket?.requestFailures || [])
    .filter((item) => !/_rsc=|favicon|analytics|google|sentry/i.test(item.url))
    .slice(-20);
  const consoleErrors = (bucket?.console || [])
    .filter((item) => /error|failed|失败|exception|TypeError/i.test(item.text))
    .slice(-20);
  return { response, failed, consoleErrors };
}

function buildMarkdownReport(result) {
  const frontProblems = uniqueProblems(result.front.bucket);
  const adminProblems = uniqueProblems(result.admin.bucket);
  const lines = [
    `# ${result.cases.title} 执行报告`,
    "",
    "## 一、文档信息",
    "",
    `- 执行时间：${result.generatedAt}`,
    `- 前端站点：${frontBase}`,
    `- 后台地址：${adminBase}/contentManage/comic`,
    `- 用例总数：${result.cases.totalCases} 条`,
    `- 模块数：${result.cases.moduleCount} 个`,
    `- 执行检查点：${result.coverage.executedCheckpoints} 个`,
    "",
    "## 二、执行结论",
    "",
    `- 发现缺陷：${result.findings.length} 个`,
    `- 禅道新提交：${result.zentao.filter((item) => item.submitted).length} 个`,
    `- 禅道重复跳过：${result.zentao.filter((item) => item.skippedDuplicate).length} 个`,
    `- 前台登录：${result.front.login?.ok ? "通过" : "未通过"}`,
    `- 后台登录：${result.admin.login?.ok ? "通过" : "未通过"}`,
    "",
    "## 三、模块覆盖",
    "",
    ...result.cases.modules.map((module) => `- ${module.order}. ${module.name}`),
    "",
    "## 四、缺陷列表",
    "",
  ];
  if (!result.findings.length) {
    lines.push("- 未发现可自动判定的新增缺陷。");
  } else {
    for (const finding of result.findings) {
      const zentao = result.zentao.find((item) => item.title === finding.title);
      lines.push(`### ${finding.id} ${finding.title}`);
      lines.push("");
      lines.push(`- 范围：${finding.scope}`);
      lines.push(`- 严重程度：${finding.severity}，优先级：${finding.priority}`);
      lines.push(`- 禅道：${zentao?.bugID ? `已提交 #${zentao.bugID}` : zentao?.skippedDuplicate ? "同标题已存在，跳过重复提交" : zentao?.error ? `提交失败：${zentao.error}` : "未提交"}`);
      lines.push(`- 证据：${finding.evidence || "无"}`);
      lines.push("- 步骤：");
      for (const [index, step] of finding.steps.entries()) lines.push(`  ${index + 1}. ${step}`);
      lines.push("- 实际结果：");
      for (const [index, item] of finding.actual.entries()) lines.push(`  ${index + 1}. ${item}`);
      lines.push("- 预期结果：");
      for (const [index, item] of finding.expected.entries()) lines.push(`  ${index + 1}. ${item}`);
      lines.push("");
    }
  }
  lines.push("## 五、网络与控制台摘要");
  lines.push("");
  lines.push(`- 前台响应错误：${frontProblems.response.length} 个，请见结构化结果。`);
  lines.push(`- 前台请求失败：${frontProblems.failed.length} 个，请见结构化结果。`);
  lines.push(`- 前台控制台错误：${frontProblems.consoleErrors.length} 个，请见结构化结果。`);
  lines.push(`- 后台响应错误：${adminProblems.response.length} 个，请见结构化结果。`);
  lines.push(`- 后台请求失败：${adminProblems.failed.length} 个，请见结构化结果。`);
  lines.push(`- 后台控制台错误：${adminProblems.consoleErrors.length} 个，请见结构化结果。`);
  lines.push("");
  lines.push("## 六、说明");
  lines.push("");
  lines.push(result.coverage.note);
  lines.push("");
  lines.push(`结构化结果：${path.join(outDir, "s-project-case-qa-result.json")}`);
  return `${lines.join("\n")}\n`;
}

main().catch((error) => {
  console.error(JSON.stringify({ ok: false, message: error?.message || String(error), stack: error?.stack }, null, 2));
  process.exit(1);
});
