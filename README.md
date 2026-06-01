# QA-agent 技能商店

> 一个以 **测试 / QA 技能** 为核心，同时兼顾非测试通用能力的技能仓库。
> 支持 Claude Code CLI（主力）、Codex、OpenClaw 三个运行时。
> 如果你要分享给别人，就只发这个仓库首页，对方能一眼找到主入口。

## 目录归类

| 目录 | 用途 | 状态 |
| --- | --- | --- |
| [`claude-skills/`](./claude-skills) | Claude Code CLI 技能包，当前主力入口 | 推荐使用 |
| [`openclaw-skill/`](./openclaw-skill) | OpenClaw 技能源码集合，原 `skills/` 目录 | 已归名 |
| [`codex-skills/`](./codex-skills) | Codex 技能备份与迁移记录 | 历史备份 |
| [`INSTALL_GUIDE/`](./INSTALL_GUIDE) | 人类可读安装与分类文档 | 推荐分享 |
| [`inventory/`](./inventory) | 机器清单与分类 manifest | 维护用 |
| [`dist/`](./dist) | 已打包 zip / `.skill` 分发物 | 下载用 |
| [`tools/`](./tools) | 仓库维护与 QA 自动化脚本 | 维护用 |

## 主入口

### ✨ Claude Code QA Skills（推荐，当前主力）
- 文档：[`claude-skills/README.md`](./claude-skills/README.md)
- 安装：`bash claude-skills/scripts/install.sh all`
- 技能数：45个（13个原生 + 32个迁移）

## 历史运行时入口

### 🤖 Codex QA Skills（已弃用，仅备份）
- 文档：[`codex-skills/README.md`](./codex-skills/README.md)
- 清单：[`codex-skills/MANIFEST.md`](./codex-skills/MANIFEST.md)
- 安装：`bash codex-skills/scripts/install.sh`

### 📦 总包
- 文档：[`INSTALL_GUIDE/ALL_SKILLS.md`](./INSTALL_GUIDE/ALL_SKILLS.md)
- 下载：<https://raw.githubusercontent.com/QA19816-glitch/QA-agent/main/dist/all-skills-bundle-v1.zip>

### 🧪 测试包（QA）
- 文档：[`INSTALL_GUIDE/TESTING_SPECIALTIES.md`](./INSTALL_GUIDE/TESTING_SPECIALTIES.md)
- 下载：<https://raw.githubusercontent.com/QA19816-glitch/QA-agent/main/dist/testing-specialties-skills-bundle-v1.zip>

### 🌐 非测试包
- 文档：[`INSTALL_GUIDE/NON_TESTING_SPECIALTIES.md`](./INSTALL_GUIDE/NON_TESTING_SPECIALTIES.md)
- 下载：<https://raw.githubusercontent.com/QA19816-glitch/QA-agent/main/dist/non-testing-specialties-skills-bundle-v1.zip>

### ✅ 建议安装包
- 文档：[`INSTALL_GUIDE/RECOMMENDED_INSTALL_PACKS.md`](./INSTALL_GUIDE/RECOMMENDED_INSTALL_PACKS.md)
- 下载：<https://raw.githubusercontent.com/QA19816-glitch/QA-agent/main/dist/essential-setup-skills-bundle-v1.zip>

## 直接导航

- **技能商店首页**：[`INSTALL_GUIDE/README.md`](./INSTALL_GUIDE/README.md)
- **压缩包下载中心**：[`dist/README.md`](./dist/README.md)
- **OpenClaw 源码目录**：[`openclaw-skill/`](./openclaw-skill)

## 仓库统计

- 测试技能类：**114** 个
- 非测试技能类：**87** 个
- 全部技能总数：**199** 个
