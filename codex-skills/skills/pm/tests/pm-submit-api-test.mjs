#!/usr/bin/env node

import assert from "node:assert/strict";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import fs from "node:fs/promises";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const skillDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const submitter = path.join(skillDir, "scripts", "pm-submit");
const setup = path.join(skillDir, "scripts", "pm-setup");
const temporaryDir = await fs.mkdtemp(path.join(os.tmpdir(), "pm-api-test-"));
const specPath = path.join(temporaryDir, "bug.json");
const missingPersistenceSpecPath = path.join(temporaryDir, "missing-persistence.json");
const fakeSecurityPath = path.join(temporaryDir, "security");
const securityLogPath = path.join(temporaryDir, "security.log");
const requestLog = [];
let createdBug = null;
let persistInList = true;

const inlineSpec = {
  title: "接口提交回归测试",
  severity_key: "p3",
  priority_key: "low",
  steps: "1. 打开页面 2. 触发问题 3. 查看结果 4. 记录异常",
  actual_result: "1. 页面提示错误 2. 数据未保存",
  expected_result: "1. 操作成功 2. 数据正常保存",
};
const inlineSpecBase64 = Buffer.from(JSON.stringify(inlineSpec), "utf8").toString("base64");
await fs.writeFile(specPath, JSON.stringify(inlineSpec));
await fs.writeFile(missingPersistenceSpecPath, JSON.stringify({
  title: "接口持久化失败回归测试",
  severity_key: "p2",
  priority_key: "high",
  steps: "1. 调用创建接口",
  actual_result: "详情存在但列表不存在",
  expected_result: "详情和列表都能查询到",
}));
await fs.writeFile(fakeSecurityPath, "#!/bin/sh\nprintf '%s\\n' \"$*\" >> \"$PM_TEST_SECURITY_LOG\"\nif [ \"${1:-}\" = 'find-generic-password' ]; then printf '%s\\n' 'test-keychain-token'; fi\n", { mode: 0o700 });

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  let body = "";
  for await (const chunk of request) body += chunk;
  requestLog.push({
    method: request.method,
    path: url.pathname,
    query: Object.fromEntries(url.searchParams),
    body,
    authorization: request.headers.authorization || "",
    workspace: request.headers["x-workspace-id"] || "",
  });
  response.setHeader("Content-Type", "application/json");
  if (request.method === "GET" && url.pathname === "/quality/bugs") {
    const items = createdBug && persistInList && url.searchParams.get("q") === createdBug.title
      ? [{ id: "9001", title: createdBug.title }]
      : [];
    return response.end(JSON.stringify({ items }));
  }
  if (request.method === "POST" && url.pathname === "/quality/bugs") {
    createdBug = JSON.parse(body);
    return response.end(JSON.stringify({ id: "9001", bug_number: "BUG-9001" }));
  }
  if (request.method === "GET" && url.pathname === "/quality/bugs/9001" && createdBug) {
    return response.end(JSON.stringify({ id: "9001", ...createdBug }));
  }
  response.statusCode = 404;
  response.end(JSON.stringify({ message: "not found" }));
});

await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
const baseUrl = `http://127.0.0.1:${address.port}`;

function run(extraArgs, { file = specPath, useKeychain = false, appendFile = true } = {}) {
  return new Promise((resolve, reject) => {
    const env = {
      ...process.env,
      PM_BASE_URL: baseUrl,
      PM_API_BASE_URL: baseUrl,
      PM_API_PERSISTENCE_DELAY_MS: "0",
    };
    delete env.PM_API_AUTH_HEADER;
    if (useKeychain) {
      delete env.PM_API_TOKEN;
      env.PM_KEYCHAIN_SECURITY_BIN = fakeSecurityPath;
      env.PM_TEST_SECURITY_LOG = securityLogPath;
    } else {
      env.PM_API_TOKEN = "test-token";
    }
    const child = spawn(submitter, appendFile ? [...extraArgs, file] : extraArgs, {
      env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", chunk => { stdout += chunk; });
    child.stderr.on("data", chunk => { stderr += chunk; });
    child.on("error", reject);
    child.on("close", code => code === 0 ? resolve(JSON.parse(stdout)) : reject(new Error(stderr.trim())));
  });
}

function runSetup(input) {
  return new Promise((resolve, reject) => {
    const child = spawn(setup, ["--api-token-stdin"], {
      env: {
        ...process.env,
        PM_KEYCHAIN_SECURITY_BIN: fakeSecurityPath,
        PM_TEST_SECURITY_LOG: securityLogPath,
      },
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", chunk => { stdout += chunk; });
    child.stderr.on("data", chunk => { stderr += chunk; });
    child.on("error", reject);
    child.on("close", code => code === 0 ? resolve({ stdout, stderr }) : reject(new Error(stderr.trim())));
    child.stdin.end(`${input}\n`);
  });
}

try {
  const setupSecret = "setup-secret-token";
  const setupResult = await runSetup(setupSecret);
  assert.equal(`${setupResult.stdout}${setupResult.stderr}`.includes(setupSecret), false, "setup must not print the API token");
  assert.equal(
    (await fs.readFile(securityLogPath, "utf8")).includes("-s codex-pm-api-token -a pm-api"),
    true,
    "setup must save the token under the configured Keychain service and account",
  );

  const dryRun = await run(["--dry-run"]);
  assert.equal(dryRun.ok, true);
  assert.equal(dryRun.transport, "api");
  assert.equal(dryRun.requirement_id, "109");
  assert.equal(dryRun.request.payload.requirement_id, 109);
  assert.equal(dryRun.request.payload.found_environment, "test");
  assert.equal(dryRun.request.payload.reproduction_steps, "[步骤]\n1. 打开页面\n2. 触发问题\n3. 查看结果\n4. 记录异常");
  assert.doesNotMatch(dryRun.request.payload.reproduction_steps, /\[实际结果\]|\[期望结果\]/);
  assert.equal(dryRun.request.payload.actual_result, "1. 页面提示错误\n2. 数据未保存");
  assert.equal(dryRun.request.payload.expected_result, "1. 操作成功\n2. 数据正常保存");
  assert.equal(requestLog.some(item => item.method === "POST"), false, "dry-run must not create a BUG");
  assert.equal(requestLog.some(item => item.path.includes("workspaces")), false, "verified workspace must not be rediscovered");
  assert.equal(requestLog.some(item => item.path.includes("requirement-scope")), false, "verified requirement must not be rediscovered");

  requestLog.length = 0;
  createdBug = null;
  const result = await run(["--json-base64", inlineSpecBase64], { useKeychain: true, appendFile: false });
  assert.equal(result.ok, true);
  assert.equal(result.transport, "api");
  assert.equal(result.input_mode, "inline_base64");
  assert.equal(result.persisted, true);
  assert.equal(result.bug_number, "BUG-9001");
  assert.equal(result.url, `${baseUrl}/workspace/quality-management/bugs/9001`);
  assert.match(await fs.readFile(securityLogPath, "utf8"), /find-generic-password -s codex-pm-api-token -a pm-api -w/);
  assert.equal(typeof result.create_duration_ms, "number");
  assert.equal(typeof result.verification_duration_ms, "number");
  assert.deepEqual(requestLog.slice(0, 2).map(item => `${item.method} ${item.path}`), [
    "GET /quality/bugs",
    "POST /quality/bugs",
  ]);
  assert.deepEqual(new Set(requestLog.slice(2).map(item => `${item.method} ${item.path}`)), new Set([
    "GET /quality/bugs/9001",
    "GET /quality/bugs",
  ]));
  assert.equal(requestLog.every(item => item.workspace === "2"), true);
  assert.equal(requestLog.every(item => item.authorization === "Bearer test-keychain-token"), true);
  const createBody = JSON.parse(requestLog[1].body);
  assert.equal(createBody.title, "【Codex自动化】接口提交回归测试");
  assert.equal(createBody.requirement_id, 109);
  assert.equal(createBody.severity_key, "p3");
  assert.equal(createBody.priority_key, "low");
  assert.equal(createBody.reproduction_steps, "[步骤]\n1. 打开页面\n2. 触发问题\n3. 查看结果\n4. 记录异常");
  assert.doesNotMatch(createBody.reproduction_steps, /\[实际结果\]|\[期望结果\]/);
  assert.equal(createBody.actual_result, "1. 页面提示错误\n2. 数据未保存");
  assert.equal(createBody.expected_result, "1. 操作成功\n2. 数据正常保存");

  requestLog.length = 0;
  createdBug = null;
  persistInList = false;
  await assert.rejects(
    run([], { file: missingPersistenceSpecPath }),
    /was not persisted in the exact-title list/,
  );
  assert.equal(requestLog.filter(item => item.method === "POST").length, 1, "persistence failure must not retry creation");
  process.stdout.write("PM项目管理平台 API submitter tests passed.\n");
} finally {
  server.close();
  await fs.rm(temporaryDir, { recursive: true, force: true });
}
