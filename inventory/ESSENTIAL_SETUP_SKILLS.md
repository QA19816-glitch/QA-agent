# 装机必备 Skills 清单

这份清单适合刚装 OpenClaw、准备搭一套高频通用工作流的人使用。
目标不是“全装”，而是优先装那些**装上马上能提升效率**、而且覆盖面最广的 skills。

## 一、最推荐先装的 10 个

### 1) find-skills
- 功能：搜索和发现可安装 skills。
- 为什么必备：装机后第一件事通常不是“马上全会用”，而是“先找到能用的 skill”。它相当于你的 skill 搜索入口。

### 2) skill-vetter
- 功能：安装前做安全审查，检查风险、权限范围、可疑行为。
- 为什么必备：从社区装 skill 时，先过一遍安全检查更稳，适合团队环境。

### 3) skill-creator
- 功能：创建、改造、优化自定义 skill。
- 为什么必备：公司里很多流程都是定制化的，迟早会需要把团队经验固化成 skill。

### 4) github
- 功能：管理 GitHub 仓库、PR、Issue、Actions。
- 为什么必备：开发协作、代码评审、CI 跟踪基本都会用到。

### 5) coding-agent
- 功能：通用编码代理，适合构建功能、重构、修 Bug、代码审查、迭代式编码。
- 为什么必备：它补的是“真正干活”的那层，不只是查资料，而是能把开发执行落下去。

### 6) agent-browser
- 功能：网页自动化、抓取、截图、表单操作、页面巡检。
- 为什么必备：很多实际任务最后都会落到浏览器上，它是高频执行器。

### 7) summarize
- 功能：总结网页、URL、PDF、图片、音频、视频、YouTube 等长内容。
- 为什么必备：信息太长时，先总结再处理，能显著减少沟通和阅读成本。

### 8) deerflow-super-agent-harness
- 功能：对接 DeerFlow 2.0，多代理、记忆、沙箱和复杂任务编排。
- 为什么必备：适合进阶用户，把单点能力升级成复杂任务工作流。

### 9) session-logs
- 功能：查看和分析会话日志。
- 为什么必备：排查问题、回溯行为、优化流程时非常有用。

### 10) healthcheck
- 功能：做环境健康检查、安全巡检和基础排障。
- 为什么必备：新环境最怕“装了很多，但不知道哪里坏了”，这个能帮你快速发现问题。

---

## 二、按场景补装建议

### A. 开发/工程协作优先
- `github`
- `coding-agent`
- `skill-creator`
- `session-logs`

适合：研发、测试开发、平台工程师。

### B. 网页执行/信息处理优先
- `agent-browser`
- `summarize`
- `find-skills`

适合：运营、研究、测试、产品、自动化场景。

### C. 安全/治理优先
- `skill-vetter`
- `healthcheck`
- `session-logs`

适合：团队环境、公司内分享、生产环境使用前。

### D. 复杂自动化/多代理优先
- `deerflow-super-agent-harness`
- `coding-agent`
- `github`

适合：复杂任务拆解、深度研究、长链路自动化。

---

## 三、我个人建议的安装顺序

1. `find-skills`
2. `skill-vetter`
3. `github`
4. `coding-agent`
5. `agent-browser`
6. `summarize`
7. `skill-creator`
8. `session-logs`
9. `healthcheck`
10. `deerflow-super-agent-harness`

---

## 四、一句话总结

如果你只想先装最值的：

- **基础三件套**：`find-skills` + `skill-vetter` + `github`
- **执行三件套**：`coding-agent` + `agent-browser` + `summarize`
- **进阶两件套**：`skill-creator` + `deerflow-super-agent-harness`
- **排障两件套**：`session-logs` + `healthcheck`
