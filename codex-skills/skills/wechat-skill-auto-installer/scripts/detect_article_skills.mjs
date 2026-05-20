#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const [articleFile, manifestFile] = process.argv.slice(2);
if (!articleFile || !manifestFile) {
  console.error("Usage: detect_article_skills.mjs <article-json-or-text> <manifest-json>");
  process.exit(2);
}

function readArticle(file) {
  const raw = fs.readFileSync(file, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return [
      parsed.title,
      parsed.author,
      parsed.description,
      parsed.sourceUrl,
      parsed.text,
    ].filter(Boolean).join("\n");
  } catch {
    return raw;
  }
}

const text = readArticle(articleFile);
const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
const manifestSkills = Array.isArray(manifest.skills) ? manifest.skills : [];
const installedRoot = path.join(process.env.CODEX_HOME || path.join(process.env.HOME || "", ".codex"), "skills");
const installedSkillNames = fs.existsSync(installedRoot)
  ? fs.readdirSync(installedRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)
  : [];
const skillNames = new Set([
  ...manifestSkills.map((skill) => skill.name).filter(Boolean),
  ...installedSkillNames,
]);

const exactMatches = [];
for (const skill of manifestSkills) {
  if (!skill?.name) continue;
  const escaped = skill.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(^|[^a-zA-Z0-9_-])${escaped}([^a-zA-Z0-9_-]|$)`, "i");
  if (re.test(text)) exactMatches.push(skill.name);
}

const lower = text.toLowerCase();
const inferred = new Set();
if (
  /owasp|安全测试|sql\s*注入|sql injection|xss|越权|漏洞扫描|渗透测试|安全审计|csrf|idor|broken access control/i.test(text)
) {
  [
    "qa-security-testing",
    "security-testing",
    "security-auditor",
    "security-scanner",
    "security-audit",
  ].forEach((name) => inferred.add(name));
}

if (
  /codex\s*\+\s*(zentao|禅道)|claude code\s*\+\s*(zentao|禅道)|自动提\s*bug|自动提缺陷|一体化缺陷提报|qa-agent/i.test(text)
) {
  [
    "qa-specialist-orchestrator",
    "qa-web-ui-testing",
    "qa-api-testing",
    "qa-data-backend-testing",
    "qa-security-testing",
    "qa-compatibility-accessibility-i18n",
    "qa-zentao-defect-workflow",
    "feishu-cloud-docs",
    "playwright",
    "web-article-extractor",
  ].forEach((name) => inferred.add(name));
}

if (lower.includes("测试用例") || lower.includes("test case")) inferred.add("qa-test-case-design");
if (lower.includes("测试策略") || lower.includes("test strategy")) inferred.add("qa-test-strategy");
if (lower.includes("需求") && (lower.includes("测试点") || lower.includes("test point"))) inferred.add("requirement-to-testpoints");
if (lower.includes("回归") || lower.includes("release")) inferred.add("qa-release-regression");
if (lower.includes("移动端") || lower.includes("app测试") || lower.includes("android") || lower.includes("ios")) inferred.add("qa-mobile-testing");

const all = [...new Set([...exactMatches, ...inferred])].filter((name) =>
  skillNames.has(name)
);

const installed = [];
const missing = [];
for (const name of all) {
  if (fs.existsSync(path.join(installedRoot, name))) installed.push(name);
  else missing.push(name);
}

console.log(JSON.stringify({
  ok: true,
  matched: all,
  exactMatches,
  inferredMatches: [...inferred].filter((name) => skillNames.has(name)),
  installed,
  missing,
}, null, 2));
