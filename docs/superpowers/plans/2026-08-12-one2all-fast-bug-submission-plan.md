# One2All 快速提 BUG 实施计划

## 目标

将已确认的快速提单设计固化到长期记忆、One2All Skill 和专属浏览器脚本，并验证登录复用与直达新建页。

## 实施步骤

1. 在工作区与 QA-agent 的 `AGENTS.md` 中增加 One2All 写入链路特例、快速模式和平台自测需求映射。
2. 更新 `codex-skills/skills/one2all/SKILL.md`：
   - 专属持久会话优先于右侧 micro-app 写入；
   - 默认直达 `/bugs/new`；
   - 区分快速模式和完整模式；
   - 明确真实换行和一次提交、一次回读规则。
3. 优化 `scripts/one2all-browser`：
   - 默认打开新建 BUG 地址；
   - 始终绑定命名状态 `one2all`，自动保存和恢复登录；
   - 已存在 `one2all` 会话时不重复传仅首次启动需要的参数；
   - 白名单仅开放 One2All 内网主机和飞书 OAuth 必需的 `open.feishu.cn`、`accounts.feishu.cn`；
   - 首次启动时使用私有 Profile、可见模式和域名白名单。
4. 更新 `agents/openai.yaml`，保持技能展示描述与新流程一致。
5. 运行 Shell 语法检查、Skill 结构校验和专属会话冒烟验证。
6. 检查 Git 状态，确认没有 Profile、认证数据或缓存进入仓库，然后提交实现。

## 验收标准

- 已授权会话执行命令时不再出现 `--profile, --headed ignored` 警告。
- 默认入口为新建 BUG 页面。
- Skill 明确快速模式只做必要操作，但仍校验分级、需求和保存详情。
- 两份长期记忆包含相同的关键规则。
- 登录 Profile 和认证数据不在 Git 变更中。
