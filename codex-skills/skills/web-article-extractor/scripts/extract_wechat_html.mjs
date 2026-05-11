#!/usr/bin/env node
import fs from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: extract_wechat_html.mjs <html-file>");
  process.exit(2);
}

const html = fs.readFileSync(file, "utf8");

function decodeHtml(input) {
  return String(input)
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

function firstMeta(name) {
  const re = new RegExp(`<meta[^>]+(?:property|name)=["']${name}["'][^>]+content=["']([^"']*)["'][^>]*>`, "i");
  return decodeHtml(html.match(re)?.[1] ?? "");
}

const title =
  firstMeta("og:title") ||
  decodeHtml(html.match(/var msg_title = ['"]([\s\S]*?)['"]\.html/)?.[1] ?? "");
const author =
  firstMeta("og:article:author") ||
  firstMeta("author") ||
  decodeHtml(html.match(/var nickname = htmlDecode\(["']([\s\S]*?)["']\)/)?.[1] ?? "");
const description = firstMeta("description") || firstMeta("og:description");
const sourceUrl = firstMeta("og:url");

const contentMatch = html.match(/id=["']js_content["'][^>]*>([\s\S]*?)<\/div>\s*(?:<script|\n)/i);
if (!contentMatch) {
  const verification = /环境异常|完成验证|captcha|TCaptcha|verify/i.test(html);
  console.log(JSON.stringify({
    ok: false,
    reason: verification ? "verification_page" : "content_not_found",
    title,
    author,
    description,
    sourceUrl,
  }, null, 2));
  process.exit(1);
}

let body = contentMatch[1]
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<style[\s\S]*?<\/style>/gi, "")
  .replace(/<img[^>]*>/gi, "\n[image]\n")
  .replace(/<\/?(p|h[1-6]|section|br|li|ul|ol|blockquote)[^>]*>/gi, "\n")
  .replace(/<[^>]+>/g, "");

body = decodeHtml(body)
  .replace(/[ \t]+/g, " ")
  .replace(/\n{3,}/g, "\n\n")
  .trim();

console.log(JSON.stringify({
  ok: true,
  title,
  author,
  description,
  sourceUrl,
  text: body,
}, null, 2));
