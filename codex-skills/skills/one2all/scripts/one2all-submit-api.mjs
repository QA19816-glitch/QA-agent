#!/usr/bin/env node

/**
 * One2All API submitter.
 *
 * The API contract is deliberately kept in one place so the field rules stay
 * identical to the browser submitter. Authentication is supplied through an
 * explicitly configured header or token; secrets are never stored in this
 * skill or inferred from browser state.
 */

import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import process from "node:process";
import { performance } from "node:perf_hooks";

const siteUrl = (process.env.ONE2ALL_BASE_URL || "https://pm-prod.vibeworld.top").replace(/\/$/, "");
const apiBaseUrl = (process.env.ONE2ALL_API_BASE_URL || `${siteUrl}/api/v1/platform`).replace(/\/$/, "");
const createPath = process.env.ONE2ALL_API_CREATE_PATH || "/quality/bugs";
const listPath = process.env.ONE2ALL_API_LIST_PATH || "/quality/bugs";
const detailPath = process.env.ONE2ALL_API_DETAIL_PATH || "/quality/bugs/{id}";
const uploadPath = process.env.ONE2ALL_API_UPLOAD_PATH || "/quality/bugs/materials/upload";
const requirementLookupPath = process.env.ONE2ALL_API_REQUIREMENT_LOOKUP_PATH || "/project-requirement-scope-options";
const uiPath = process.env.ONE2ALL_UI_PATH || "/workspace/quality-management";
const timeoutMs = Number(process.env.ONE2ALL_API_TIMEOUT_MS || 30_000);
const persistenceDelayMs = Number(process.env.ONE2ALL_API_PERSISTENCE_DELAY_MS || 350);
let workspaceId = String(process.env.ONE2ALL_API_WORKSPACE_ID ?? "2").trim();

const defaultRequirementPath = ["S基建", "未分类", "未分类Bug"];
const verifiedRequirementIds = new Map([
  [defaultRequirementPath.join("\u0000"), "109"],
]);

const severityLabels = { p0: "致命（P0）", p1: "严重（P1）", p2: "一般（P2）", p3: "轻微（P3）" };
const priorityLabels = { urgent: "紧急", high: "高", medium: "中", low: "低" };

function fail(message, code = 1) {
  process.stderr.write(`${JSON.stringify({ ok: false, error: message })}\n`);
  process.exit(code);
}

function usage() {
  process.stderr.write("Usage: one2all-submit-api.mjs [--dry-run] <bug.json>\n");
  process.exit(64);
}

function normalizeTitle(value) {
  return `【Codex自动化】${String(value || "").replace(/^(【Codex自动化】)+/, "")}`;
}

async function readSpec(file) {
  if (!file) usage();
  let spec;
  try {
    spec = JSON.parse(await fs.readFile(file, "utf8"));
  } catch (error) {
    throw new Error(`cannot read BUG spec: ${error.message}`);
  }
  if (!spec || typeof spec !== "object" || Array.isArray(spec)) throw new Error("BUG spec must be a JSON object");
  const path = Array.isArray(spec.requirement_path) && spec.requirement_path.length
    ? spec.requirement_path
    : defaultRequirementPath;
  const normalized = {
    ...spec,
    title: normalizeTitle(spec.title),
    project_set: path[0] || "",
    project: path[1] || "",
    requirement: path[2] || "",
    found_environment: spec.found_environment || "test",
    severity_key: spec.severity_key || "",
    priority_key: spec.priority_key || "",
    steps: spec.steps || "",
    actual_result: spec.actual_result || "",
    expected_result: spec.expected_result || "",
  };
  if (!normalized.title || normalized.title === "【Codex自动化】") throw new Error("title is required");
  for (const [key, label] of [["steps", "steps"], ["actual_result", "actual_result"], ["expected_result", "expected_result"]]) {
    if (!normalized[key]) throw new Error(`${label} is required`);
  }
  if (!normalized.project_set || !normalized.project || !normalized.requirement) {
    throw new Error("requirement_path must contain project set, project, and requirement");
  }
  if (!Object.hasOwn(severityLabels, normalized.severity_key)) throw new Error("severity_key must be p0, p1, p2, or p3");
  if (!Object.hasOwn(priorityLabels, normalized.priority_key)) throw new Error("priority_key must be urgent, high, medium, or low");
  if (normalized.screenshot_path && !existsSync(normalized.screenshot_path)) throw new Error(`Screenshot not found: ${normalized.screenshot_path}`);
  return normalized;
}

function pathUrl(path, query, base = apiBaseUrl) {
  const url = new URL(path.replace(/^\//, ""), `${base}/`);
  for (const [key, value] of Object.entries(query || {})) {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  }
  return url.toString();
}

function authHeaders() {
  const headers = { Accept: "application/json" };
  if (process.env.ONE2ALL_API_AUTH_HEADER) {
    const separator = process.env.ONE2ALL_API_AUTH_HEADER.indexOf(":");
    if (separator < 1) throw new Error("ONE2ALL_API_AUTH_HEADER must use 'Name: value' format");
    headers[process.env.ONE2ALL_API_AUTH_HEADER.slice(0, separator).trim()] = process.env.ONE2ALL_API_AUTH_HEADER.slice(separator + 1).trim();
  } else if (process.env.ONE2ALL_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.ONE2ALL_API_TOKEN}`;
  } else if (process.env.ONE2ALL_API_ALLOW_ANONYMOUS !== "1") {
    throw new Error("API authentication is not configured; set ONE2ALL_API_TOKEN or ONE2ALL_API_AUTH_HEADER");
  }
  if (workspaceId) headers["X-Workspace-ID"] = workspaceId;
  headers["X-Timezone"] = process.env.ONE2ALL_API_TIMEZONE || "Asia/Shanghai";
  return headers;
}

async function resolveWorkspaceId() {
  if (workspaceId) return workspaceId;
  const url = pathUrl("/api/v1/core/workspaces", undefined, siteUrl);
  const headers = authHeaders();
  delete headers["X-Workspace-ID"];
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(timeoutMs) });
  const decoded = decodeResponse({ status: response.status, body: await response.text() }, url);
  const candidates = collectRecords(decoded).filter(record => Number(record?.id) > 0 && record?.enabled !== false);
  const defaults = candidates.filter(record => record?.is_default === true);
  const selected = defaults.length === 1 ? defaults[0] : candidates.length === 1 ? candidates[0] : null;
  if (!selected) throw new Error("Workspace did not resolve uniquely; set ONE2ALL_API_WORKSPACE_ID");
  workspaceId = String(selected.id);
  return workspaceId;
}

async function request(method, path, { query, body, form } = {}) {
  const url = pathUrl(path, query);
  const headers = authHeaders();
  if (form) {
    const formEntries = form.map(({ name, value, fileName, type }) => ({ name, value, fileName, type }));
    const multipart = new FormData();
    for (const entry of formEntries) {
      if (entry.fileName) multipart.append(entry.name, new Blob([Buffer.from(entry.value, "base64")], { type: entry.type || "application/octet-stream" }), entry.fileName);
      else multipart.append(entry.name, entry.value);
    }
    const response = await fetch(url, { method, headers, body: multipart, signal: AbortSignal.timeout(timeoutMs) });
    return decodeResponse({ status: response.status, body: await response.text() }, url);
  }
  const payload = body === undefined ? undefined : JSON.stringify(body);
  if (payload) headers["Content-Type"] = "application/json";
  const response = await fetch(url, { method, headers, body: payload, signal: AbortSignal.timeout(timeoutMs) });
  return decodeResponse({ status: response.status, body: await response.text() }, url);
}

function decodeResponse(result, url) {
  const status = Number(result?.status || 0);
  let body = null;
  if (result?.body) {
    try {
      body = JSON.parse(result.body);
    } catch {
      body = result.body;
    }
  }
  if (status < 200 || status >= 300) {
    const detail = body?.message || body?.error || (body && typeof body === "object" ? JSON.stringify(body) : result?.body) || `HTTP ${status}`;
    throw new Error(`One2All API ${status}: ${detail}`);
  }
  return body;
}

function collectRecords(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.flatMap(collectRecords);
  if (typeof value !== "object") return [];
  for (const key of ["items", "records", "list", "data", "results", "bugs", "requirements"]) {
    if (value[key] !== undefined && value[key] !== null) return collectRecords(value[key]);
  }
  return [value];
}

function recordId(record) {
  return record?.id ?? record?.bug_id ?? record?.bugId ?? record?.requirement_id ?? record?.requirementId ?? record?.number;
}

function recordTitle(record) {
  return String(record?.title ?? record?.name ?? "").trim();
}

function extractId(value) {
  if (!value || typeof value !== "object") return "";
  return String(value.id ?? value.bug_id ?? value.bugId ?? value.data?.id ?? value.data?.bug_id ?? value.data?.bugId ?? "");
}

function reproductionText(spec, inlineImageUrl) {
  const text = `[步骤]\n${spec.steps}\n\n[实际结果]\n${spec.actual_result}\n\n[期望结果]\n${spec.expected_result}`;
  if (!inlineImageUrl) return text;
  const escapedUrl = String(inlineImageUrl).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  return `${text}\n\n证据截图\n<img src="${escapedUrl}" alt="证据截图">`;
}

async function duplicateCheck(spec) {
  const response = await request("GET", listPath, { query: { q: spec.title, limit: 20, offset: 0 } });
  const exact = collectRecords(response).filter(record => recordTitle(record) === spec.title);
  if (exact.length) {
    const id = recordId(exact[0]);
    throw new Error(`Duplicate BUG title already exists: ${spec.title}${id ? ` (${id})` : ""}`);
  }
  return { checked: true, candidates: collectRecords(response).length };
}

async function resolveRequirement(spec) {
  if (spec.requirement_id) return String(spec.requirement_id);
  if (process.env.ONE2ALL_API_REQUIREMENT_ID) return process.env.ONE2ALL_API_REQUIREMENT_ID;
  const verifiedId = verifiedRequirementIds.get([spec.project_set, spec.project, spec.requirement].join("\u0000"));
  if (verifiedId) return verifiedId;
  let response;
  try {
    response = await request("GET", requirementLookupPath, { query: { project_set: spec.project_set, project: spec.project, title: spec.requirement, search: spec.requirement } });
  } catch (error) {
    throw new Error(`Requirement lookup failed; provide requirement_id or configure ONE2ALL_API_REQUIREMENT_LOOKUP_PATH: ${error.message}`);
  }
  const scope = response?.data || response;
  const projectSets = Array.isArray(scope?.project_sets) ? scope.project_sets : [];
  const projects = Array.isArray(scope?.projects) ? scope.projects : [];
  const requirements = Array.isArray(scope?.requirements) ? scope.requirements : [];
  const matchingProjectSets = projectSets.filter(record => recordTitle(record) === spec.project_set);
  const projectSetIds = new Set(matchingProjectSets.map(recordId).filter(Boolean).map(String));
  const matchingProjects = projects.filter(record =>
    recordTitle(record) === spec.project && projectSetIds.has(String(record.project_new_id ?? record.project_set_id ?? record.parent_id ?? ""))
  );
  const projectIds = new Set(matchingProjects.map(recordId).filter(Boolean).map(String));
  const candidates = requirements.filter(record =>
    recordTitle(record) === spec.requirement &&
    projectSetIds.has(String(record.project_new_id ?? record.project_set_id ?? "")) &&
    projectIds.has(String(record.version_task_new_id ?? record.project_id ?? record.parent_id ?? ""))
  );
  if (candidates.length === 0) throw new Error(`Requirement did not resolve: ${spec.project_set} / ${spec.project} / ${spec.requirement}`);
  if (candidates.length !== 1) throw new Error(`Requirement must resolve to exactly one candidate: ${spec.project_set} / ${spec.project} / ${spec.requirement} (found ${candidates.length})`);
  const id = recordId(candidates[0]);
  if (!id) throw new Error("Requirement API response did not contain an id");
  return String(id);
}

function buildPayload(spec, requirementId, inlineImageUrl = null) {
  const text = reproductionText(spec, inlineImageUrl);
  const numericRequirementId = Number(requirementId);
  return {
    title: spec.title,
    ...(requirementId ? { requirement_id: Number.isSafeInteger(numericRequirementId) && numericRequirementId > 0 ? numericRequirementId : requirementId } : {}),
    status: spec.status || "triage",
    bug_type: spec.bug_type || "code_error",
    defect_domain: spec.defect_domain || "functional",
    severity_key: spec.severity_key,
    priority_key: spec.priority_key,
    priority: spec.priority_key,
    due_date: spec.due_date ?? null,
    found_environment: spec.found_environment,
    operating_system: spec.operating_system || "",
    browser: spec.browser || "",
    assignee_user_id: spec.assignee_user_id ?? null,
    reviewer_user_id: spec.reviewer_user_id ?? null,
    resolution_reason: spec.resolution_reason || "",
    resolution_note: spec.resolution_note || "",
    reproduction_steps: text,
    reproduction_materials: inlineImageUrl ? [{ url: inlineImageUrl }] : [],
    actual_result: spec.actual_result,
    expected_result: spec.expected_result,
    source_execution_id: spec.source_execution_id ?? null,
    source_test_id: spec.source_test_id ?? null,
  };
}

async function uploadScreenshot(spec, requirementId) {
  if (!spec.screenshot_path) return null;
  if (!requirementId) throw new Error("Screenshot upload requires requirement_id");
  const bytes = await fs.readFile(spec.screenshot_path);
  const fileName = spec.screenshot_path.split(/[\\/]/).pop() || "evidence.png";
  const extension = fileName.split(".").pop()?.toLowerCase();
  const mimeType = ({ jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", webp: "image/webp" })[extension] || "image/png";
  const result = await request("POST", uploadPath, { form: [
    { name: "file", value: Buffer.from(bytes).toString("base64"), fileName, type: mimeType },
    { name: "requirement_id", value: String(requirementId) },
  ] });
  const url = result?.url || result?.data?.url || result?.material_url || result?.data?.material_url || result?.data?.material?.url || result?.material?.url;
  if (!url) throw new Error("Screenshot upload response did not contain a material URL");
  return url;
}

async function main() {
  const started = performance.now();
  let args = process.argv.slice(2);
  const dryRun = args[0] === "--dry-run";
  if (dryRun) args = args.slice(1);
  if (args.length !== 1) usage();
  const spec = await readSpec(args[0]);
  await resolveWorkspaceId();
  const [duplicate, requirementId] = await Promise.all([
    duplicateCheck(spec),
    resolveRequirement(spec),
  ]);
  let inlineImageUrl = null;
  const payload = buildPayload(spec, requirementId);
  if (dryRun) {
    process.stdout.write(`${JSON.stringify({ ok: true, dry_run: true, transport: "api", duplicate_check: duplicate, requirement_id: requirementId, would_upload_screenshot: Boolean(spec.screenshot_path), request: { method: "POST", path: createPath, payload } })}\n`);
    return;
  }
  inlineImageUrl = await uploadScreenshot(spec, requirementId);
  const createStarted = performance.now();
  const created = await request("POST", createPath, { body: buildPayload(spec, requirementId, inlineImageUrl) });
  const createDurationMs = Math.round(performance.now() - createStarted);
  const bugId = extractId(created);
  if (!bugId) throw new Error("Create API response did not contain a BUG id");
  const verificationStarted = performance.now();
  if (persistenceDelayMs > 0) await new Promise(resolve => setTimeout(resolve, persistenceDelayMs));
  const [detail, listResult] = await Promise.all([
    request("GET", detailPath.replace("{id}", encodeURIComponent(bugId))),
    request("GET", listPath, { query: { q: spec.title, limit: 20, offset: 0 } }),
  ]);
  const saved = detail?.data || detail;
  const savedTitle = recordTitle(saved);
  if (savedTitle !== spec.title) throw new Error(`Saved BUG title mismatch: ${savedTitle || "missing"}`);
  const savedEnvironment = saved?.found_environment ?? saved?.foundEnvironment ?? saved?.environment;
  if (savedEnvironment !== spec.found_environment) throw new Error(`Saved environment mismatch: ${savedEnvironment ?? "missing"}`);
  const savedRequirementId = saved?.requirement_id ?? saved?.requirementId ?? saved?.requirement?.id;
  if (String(savedRequirementId ?? "") !== String(requirementId)) throw new Error(`Saved requirement mismatch: ${savedRequirementId ?? "missing"}`);
  const savedSeverity = saved?.severity_key ?? saved?.severityKey ?? saved?.severity?.key ?? saved?.severity;
  if (![spec.severity_key, severityLabels[spec.severity_key]].includes(savedSeverity)) throw new Error(`Saved severity mismatch: ${savedSeverity ?? "missing"}`);
  const savedPriority = saved?.priority_key ?? saved?.priorityKey ?? saved?.priority?.key ?? saved?.priority;
  if (![spec.priority_key, priorityLabels[spec.priority_key]].includes(savedPriority)) throw new Error(`Saved priority mismatch: ${savedPriority ?? "missing"}`);
  const savedReproduction = String(saved?.reproduction_steps ?? saved?.reproductionSteps ?? saved?.steps ?? "");
  for (const section of ["[步骤]", "[实际结果]", "[期望结果]"]) {
    if (!savedReproduction.includes(section)) throw new Error(`Saved reproduction is missing: ${section}`);
  }
  if (inlineImageUrl && !JSON.stringify(saved).includes(inlineImageUrl)) throw new Error("Saved detail does not contain the inline screenshot URL");
  const persistedRows = collectRecords(listResult).filter(record => recordTitle(record) === spec.title);
  const persisted = persistedRows.some(record => String(recordId(record) ?? "") === String(bugId));
  if (!persisted) throw new Error(`Created BUG was not persisted in the exact-title list: ${spec.title} (${bugId})`);
  const verificationDurationMs = Math.round(performance.now() - verificationStarted);
  const uiUrl = new URL(`${uiPath.replace(/\/$/, "")}/bugs/${encodeURIComponent(bugId)}`, `${siteUrl}/`);
  process.stdout.write(`${JSON.stringify({ ok: true, transport: "api", persisted: true, bug_number: String(created.bug_number || created.number || saved.bug_number || saved.number || `BUG-${bugId}`), bug_id: bugId, title: spec.title, url: uiUrl.toString(), requirement: [spec.project_set, spec.project, spec.requirement].join(" / "), requirement_id: requirementId, severity: severityLabels[spec.severity_key], priority: priorityLabels[spec.priority_key], found_environment: spec.found_environment, inline_image_url: inlineImageUrl, create_duration_ms: createDurationMs, verification_duration_ms: verificationDurationMs, duration_ms: Math.round(performance.now() - started) })}\n`);
}

main().catch(error => fail(error.message));
