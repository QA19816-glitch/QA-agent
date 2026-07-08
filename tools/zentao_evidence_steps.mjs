import path from "node:path";

export function htmlEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function textToParagraphHtml(value) {
  return String(value || "")
    .split("\n")
    .map((line) => `<p>${htmlEscape(line) || "<br>"}</p>`)
    .join("");
}

export async function evidenceImagesHtml(files = [], options = {}) {
  const evidenceFiles = files.filter(Boolean);
  if (!evidenceFiles.length) return "";

  const title = options.title || "证据截图";
  const maxWidth = Number(options.maxWidth || 960);
  const urls = options.imageUrls || options.inlineUrls || [];
  if (urls.length && urls.length !== evidenceFiles.length) {
    throw new Error(`内嵌证据图片 URL 数量(${urls.length})与文件数量(${evidenceFiles.length})不一致。`);
  }
  if (!urls.length && !options.allowFilenameOnly) {
    throw new Error("禅道证据截图不能使用 data URI。请先上传为正式 files[] 附件或编辑器图片，拿到 file read URL 后通过 imageUrls/inlineUrls 内嵌。");
  }

  const parts = [`<p><strong>${htmlEscape(title)}</strong></p>`];
  for (const [index, file] of evidenceFiles.entries()) {
    const name = path.basename(file);
    const url = urls[index];
    if (!url) continue;
    parts.push(
      `<p><img src="${htmlEscape(url)}" alt="${htmlEscape(name)}" style="max-width:${maxWidth}px;height:auto;border:1px solid #d8dee4;" /></p>`,
    );
  }
  return parts.join("");
}

export async function stepsHtmlWithInlineEvidenceUrls(value, files = [], imageUrls = [], options = {}) {
  return stepsHtmlWithInlineEvidence(value, files, { ...options, imageUrls });
}

export async function stepsHtmlWithInlineEvidence(value, files = [], options = {}) {
  return `${textToParagraphHtml(value)}${await evidenceImagesHtml(files, options)}`;
}

export function hasInlineEvidenceReference(text, files = []) {
  return files.filter(Boolean).some((file) => String(text || "").includes(path.basename(file)));
}
