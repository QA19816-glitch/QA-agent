#!/usr/bin/env python3
from __future__ import annotations

import re
import shutil
import zipfile
from pathlib import Path

BASE = Path('/Users/jiguang/.openclaw/workspace-main')
SKILLS_DIR = BASE / 'skills'
DIST_DIR = BASE / 'dist'
INV_DIR = BASE / 'inventory'
TMP_DIR = BASE / 'tmp' / 'category-bundles'
TMP_DIR.mkdir(parents=True, exist_ok=True)
DIST_DIR.mkdir(parents=True, exist_ok=True)

REPO = 'https://github.com/QA19816-glitch/QA-agent'
BRANCH = 'main'

ALIASES = {
    'Test Generator': 'test-generator',
    'APITester Agent-Driven API Testing': 'openclaw-api-tester',
    'API Mock Server Generator': 'sovereign-api-mock-generator',
    'Postman': 'postman',
    'TestFlight': 'testflight',
    'Chrome DevTools Auto Analyzer': 'web-auto-analyzer',
    'analytics-tracking': 'analytics-tracking-2',
    'seo-analyzer': 'shelly-seo-analyzer',
    'security-audit': 'security-audit-toolkit',
    'grafana': 'grafana-api',
    'Wireshark Network Traffic Analysis': 'wireshark-analysis',
    'docker': 'docker-skill',
    'Docker Compose': 'docker-compose',
    'Docker Pro Diagnostic': 'docker-diag',
    'kubectl-skill': 'kubectl',
    'Kubernetes': 'k8s',
    'cloudflare': 'cloudflare-api',
    'cloudflare-tunnel': 'cloudflare-tunnel-manager',
    'GitHub Actions': 'github-actions',
    'GitLab': 'gitlab',
    'Jenkins': 'jenkins',
    'CI-CD': 'ci-cd',
    'Monitoring': 'monitoring',
    'Capability Evolver': 'capability-evolver-pro',
    'agent-browser': 'openclaw-agent-browser',
    'Image Editing': 'image-edit',
    'pdf': 'pdf-skill',
    'Powerpoint / PPTX': 'powerpoint-pptx',
    'Excel / XLSX': 'excel-xlsx',
    'Nginx': 'nginx',
    'Traefik': 'traefik',
    'android-automation': 'android-adb',
    'android-device-automation': 'midscene-android-automation',
    'qa': 'gstack-qa',
    'find-skills': 'find-skills-3',
    'coding-agent': 'coding-agent-common',
    'playwright-cli': 'playwright-cli-openclaw',
    'postgres': 'postgres-mcp-skill',
    'log-analyzer': 'openclaw-log-analyzer',
    'confluence': 'atlassian-confluence',
}

BUNDLES = [
    {
        'key': 'testing-specialties',
        'title': '测试专项 Skills 分类包',
        'doc': INV_DIR / 'SOFTWARE_TESTING_SPECIALTIES.md',
        'zip': DIST_DIR / 'testing-specialties-skills-bundle-v1.zip',
        'root': 'testing-specialties-skills-bundle-v1',
    },
    {
        'key': 'non-testing-specialties',
        'title': '非测试专项 Skills 分类包',
        'doc': INV_DIR / 'NON_TESTING_SPECIALTIES.md',
        'zip': DIST_DIR / 'non-testing-specialties-skills-bundle-v1.zip',
        'root': 'non-testing-specialties-skills-bundle-v1',
    },
    {
        'key': 'essential-setup',
        'title': '建议安装 Skills 分类包',
        'doc': INV_DIR / 'ESSENTIAL_SETUP_SKILLS.md',
        'zip': DIST_DIR / 'essential-setup-skills-bundle-v1.zip',
        'root': 'essential-setup-skills-bundle-v1',
    },
]


def extract_display_names(doc: Path) -> list[str]:
    txt = doc.read_text(encoding='utf-8')
    names: list[str] = []
    for line in txt.splitlines():
        s = line.strip()
        pats = [
            r'-\s+([A-Za-z0-9 .+\-/]+)：',
            r'-\s+\*\*([^*]+)\*\*：',
            r'\d+\)\s*([A-Za-z0-9 .+\-/]+)$',
            r'-\s+`([^`]+)`',
        ]
        for pat in pats:
            m = re.match(pat, s)
            if m:
                names.append(m.group(1).strip())
                break
    uniq: list[str] = []
    seen = set()
    for n in names:
        if n not in seen:
            seen.add(n)
            uniq.append(n)
    return uniq


def resolve_folder(display_name: str) -> str | None:
    if (SKILLS_DIR / display_name / 'SKILL.md').exists():
        return display_name
    alias = ALIASES.get(display_name)
    if alias and (SKILLS_DIR / alias / 'SKILL.md').exists():
        return alias
    cand = display_name.lower().replace(' / ', '-').replace(' ', '-')
    if (SKILLS_DIR / cand / 'SKILL.md').exists():
        return cand
    return None


def copytree_filtered(src: Path, dst: Path) -> None:
    shutil.copytree(src, dst)


def build_bundle(bundle: dict) -> tuple[int, list[tuple[str, str]]]:
    display_names = extract_display_names(bundle['doc'])
    mappings: list[tuple[str, str]] = []
    unresolved: list[str] = []
    for name in display_names:
        folder = resolve_folder(name)
        if folder:
            mappings.append((name, folder))
        else:
            unresolved.append(name)
    if unresolved:
        raise RuntimeError(f"Unresolved skill names for {bundle['key']}: {unresolved}")

    root = TMP_DIR / bundle['root']
    if root.exists():
        shutil.rmtree(root)
    (root / 'skills').mkdir(parents=True, exist_ok=True)
    (root / 'inventory').mkdir(parents=True, exist_ok=True)

    # copy referenced doc
    shutil.copy2(bundle['doc'], root / 'inventory' / bundle['doc'].name)

    readme = []
    readme.append(f"# {bundle['title']}")
    readme.append('')
    readme.append(f"- Source repository: {REPO}")
    readme.append(f"- Source doc: {REPO}/blob/{BRANCH}/inventory/{bundle['doc'].name}")
    readme.append(f"- Included skills: **{len(mappings)}**")
    readme.append('')
    readme.append('## Included skills')
    readme.append('')
    for display_name, folder in mappings:
        readme.append(f"- {display_name} -> skills/{folder}")
    readme.append('')
    readme.append('## Usage')
    readme.append('')
    readme.append('1. Unzip this package')
    readme.append('2. Copy the included `skills/` subfolders into your OpenClaw workspace `skills/` directory')
    readme.append('3. Start a new session or restart gateway so the skills are loaded')
    (root / 'README.md').write_text('\n'.join(readme) + '\n', encoding='utf-8')

    mapping_md = ['# Display Name -> Repository Folder Mapping', '']
    for display_name, folder in mappings:
        mapping_md.append(f'- **{display_name}** -> `skills/{folder}`')
    (root / 'inventory' / 'SKILL_FOLDER_MAPPING.md').write_text('\n'.join(mapping_md) + '\n', encoding='utf-8')

    for _, folder in mappings:
        src = SKILLS_DIR / folder
        dst = root / 'skills' / folder
        copytree_filtered(src, dst)

    if bundle['zip'].exists():
        bundle['zip'].unlink()
    with zipfile.ZipFile(bundle['zip'], 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
        for p in sorted(root.rglob('*')):
            zf.write(p, p.relative_to(TMP_DIR))
    return len(mappings), mappings


results = []
for bundle in BUNDLES:
    count, mappings = build_bundle(bundle)
    results.append((bundle, count, mappings))

index = []
index.append('# 分类 ZIP 包下载索引')
index.append('')
index.append('这些 ZIP 包适合直接分享给别人下载。下载后解压，把里面的 `skills/` 子目录复制到自己的 OpenClaw workspace `skills/` 目录即可。')
index.append('')
for bundle, count, mappings in results:
    index.append(f"## {bundle['title']}")
    index.append('')
    index.append(f"- ZIP 下载：<{REPO}/blob/{BRANCH}/dist/{bundle['zip'].name}>")
    index.append(f"- 对应清单：<{REPO}/blob/{BRANCH}/inventory/{bundle['doc'].name}>")
    index.append(f"- 包含 skills 数量：**{count}**")
    index.append('')
index.append('## 现有其他包')
index.append('')
index.append(f'- dist 目录：<{REPO}/tree/{BRANCH}/dist>')
(INV_DIR / 'CATEGORY_ZIP_DOWNLOADS.md').write_text('\n'.join(index) + '\n', encoding='utf-8')

print('Generated category bundles:')
for bundle, count, _ in results:
    print(bundle['zip'].name, count)
print('Wrote', INV_DIR / 'CATEGORY_ZIP_DOWNLOADS.md')
