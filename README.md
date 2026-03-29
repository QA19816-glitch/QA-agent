# QA-agent / OpenClaw Skills Hub

这是大王当前维护的一份 **OpenClaw Skills 仓库**：既包含软件测试专项 skills，也包含研发、Agent、浏览器自动化、GitHub、文档、搜索、基础设施等非测试专项能力。

## 本次新增（按你的图片 + DeerFlow 2.0 要求补装）

- **开发 / Agent 工具**
  - `find-skills`：智能搜索和发现可安装 skill。
  - `skill-creator`：创建/改造自定义 skills。
  - `Capability Evolver`：根据日志和历史表现生成能力优化建议。
  - `self-improving-agent-skill`：让 Agent 从经验中持续学习。
  - `github`：管理仓库、PR、Issue、Actions。
  - `deerflow-super-agent-harness`：对接 DeerFlow 2.0，多代理/记忆/沙箱任务编排。
- **安全 / 治理**
  - `skill-vetter`：安装前安全审查与风险扫描。
- **网页自动化 / 内容处理 / 搜索**
  - `agent-browser`：网页自动化、抓取、截图、表单操作。
  - `summarize`：长文、URL、PDF、音频、视频总结。
  - `baidu-web-search`：百度实时中文检索（当前需补 `BAIDU_API_KEY` 才算 fully ready）。

## 当前仓库规模

- 总技能数：**172**
- Ready：**131**
- Needs setup：**41**
- 测试专项：**52**
- 非测试专项：**120**

## 直接入口

- **GitHub 仓库主页**：<https://github.com/QA19816-glitch/QA-agent>
- **全局技能总清单**：<https://github.com/QA19816-glitch/QA-agent/blob/main/inventory/ALL_SKILLS.md>
- **测试专项清单**：<https://github.com/QA19816-glitch/QA-agent/blob/main/inventory/SOFTWARE_TESTING_SPECIALTIES.md>
- **非测试专项清单**：<https://github.com/QA19816-glitch/QA-agent/blob/main/inventory/NON_TESTING_SPECIALTIES.md>

## 使用方式

1. 克隆仓库
   ```bash
   git clone https://github.com/QA19816-glitch/QA-agent.git
   ```
2. 把需要的 skill 目录复制到你的 OpenClaw workspace `skills/` 下
3. 新开会话，或重启 gateway，让技能生效

## 说明

- `ready` = 当前环境下已经能直接用。
- `needs setup` = skill 已装入仓库，但还缺 CLI / 环境变量 / 配置。
- 本仓库适合做“技能超市 + 测试工具箱 + 非测试能力中心”。
