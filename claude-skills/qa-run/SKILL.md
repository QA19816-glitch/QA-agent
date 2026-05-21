---
name: qa-run
description: End-to-end QA pipeline orchestration. Activate when 大王 says `/qa-run`, "跑一遍 QA", "给我跑测试", "把 XX 跑一轮", or provides a PRD/需求/feature to test. Runs: 需求分析 → 测试点抽取 → 用例生成 → 执行（API / Web E2E / Mobile 按需）→ 飞书云文档报告（默认授大王管理权）→ 未通过项自动转 BUG。
---

# /qa-run — QA 一体化主命令

大王只要抛一条需求/PRD/commit/URL，走完以下五步，最终返回一条飞书文档链接 + BUG 清单。

## 输入（任取其一或组合）

- PRD/需求描述（文字或飞书文档链接）
- 一段代码 / commit / diff
- 要测试的 URL / API endpoint / Mobile 构建
- 手上的测试点清单（跳过第 1-2 步，直接进入生成/执行）

## 阶段 1 — 需求分析 & 测试点抽取

1. 如果输入是飞书文档链接，用 `feishu-doc` SKILL 先把内容读下来。
2. 调用 `qa-prd-analyzer` 识别功能点、风险点、非功能需求。
3. 调用 `qa-test-point-extractor` 把需求拆成测试点（功能/边界/异常/性能/安全/兼容）。
4. 用 `qa-traceability-mapper` 建立"需求 ↔ 测试点"追溯表。

## 阶段 2 — 用例生成

- 默认 `qa-testcase-writer`：输出结构化用例（ID / 标题 / 前置 / 步骤 / 预期 / 优先级 / 分类）。
- 数据驱动场景加 `qa-test-data-factory` 生成边界/异常/大小数据样本。
- 回归/冒烟：用 `qa-regression-planner` 标记必跑子集。
- **通过率门槛**：未设定则默认 95%（可被阶段 5 的 release gate 覆盖）。

## 阶段 3 — 执行（按测试类型自动分发）

| 测试类型 | 使用的 skill |
|---|---|
| 接口 | `qa-api-runner` / `api-testing` |
| Web E2E | `qa-web-e2e-runner` / `e2e-test-orchestrator` |
| Mobile | `mobile-appium-test` / `mobile-testing` |
| 性能 | `api-performance-testing` / `frontend-performance-audit` |
| 安全 | `security-testing` |
| 兼容 | `cross-browser-testing` / `geo-testing` |
| 可访问性 | `accessibility-testing` |
| 视觉回归 | `visual-regression-testing` |

执行过程中产出：`results.jsonl`（每条用例一行：id/status=pass|fail|skip|blocked/evidence_paths/timings）、失败截图/日志目录。

## 阶段 4 — 报告（默认飞书云文档 + 管理权给大王）

调用 `qa-test-report-generator` 生成 markdown，然后：

```bash
python3 ~/.claude/skills/_lib/feishu.py create \
  --title "【QA 报告】<模块/特性> <YYYY-MM-DD>" \
  --content "<markdown>"
```

返回的 `doc_token` / `url` 存住，后面的 BUG 链回到这篇报告。权限已默认授大王 `full_access`（管理权）。

报告正文结构（固定顺序，便于扫读）：

1. **摘要**：通过率、用例总数、失败数、阻塞数、执行时长、结论 go/no-go。
2. **关键风险 TOP 5**（按优先级排序）。
3. **详细用例结果**（按功能模块分组；每条用例：结果 + 失败原因 + 证据链接）。
4. **性能 / 兼容 / 其他非功能结果**。
5. **BUG 清单**（阶段 5 回填的链接 + 严重度 + 责任人建议）。
6. **追溯表**（需求 ↔ 用例 ↔ 结果 ↔ BUG）。

## 阶段 5 — BUG 自动转单

对每条失败用例（status in [fail, blocked]）：

1. `qa-bug-triage`：合并证据 → 生成 BUG 标题 / 复现步骤 / 严重度（P0-P3）/ 优先级 / 建议负责人。
2. 按就绪的渠道提单（优先级：**禅道**`zentao-qa-fullflow` > `gh-issues` > 飞书 BUG 文档）。禅道配置读 `~/.claude/config/integrations.json#zentao`（默认产品 `S基座` id=3）。
3. 在报告末尾登记 BUG 编号/链接并回写到追溯表。

### BUG 单硬规范（必须遵守，违反即回炉）

**字段全部必填，清楚但不啰嗦：**

| 字段 | 写什么 | 长度上限 |
|---|---|---|
| 标题 | `【Claude Code】现象 + 触发条件`，专业精准，禁止口语化 | ≤ 25 字 |
| 描述 | 影响面/业务后果，不复述标题 | ≤ 80 字 |
| 严重度 | P0 / P1 / P2 / P3 | 必填 |
| 优先级 | 高 / 中 / 低 | 必填 |
| 建议负责人 | 至少精确到组（`@前端组` / `@后台组`） | 必填 |
| 复现步骤 | 三段式：`[步骤]` / `[结果]` / `[期望]`，每条 ≤ 30 字，HTML `<p>` 标签 | 不写 `[环境]` 段 |

**标题专业性自检**（写完必过）：
- 用规范术语：「未汉化」不写「英文多」，「无法暂停/恢复播放」不写「不暂停」，「底部导航」不写「底栏」
- 触发条件具体：「单击视频区域」不写「点击视频」
- 换一个不了解背景的开发，能否从标题直接定位问题？不能则重写

**禅道提单额外要求：**
- 创建时 payload 必须显式传 `project: 5`（基建S），不能只传 `product: 3`
- 提单后用 API 复查：`project == 5`、`steps` 包含 `[步骤]/[结果]/[期望]` 且每段有内容、`files` 非空
- 补附件走编辑页（`index.php?m=bug&f=edit&bugID=<id>`，`iframe[name="app-qa"]` 内 `input[name='files[]']`），保存后立刻 API 回查 steps 是否被覆盖
- 查看/编辑用 `index.php?m=bug&f=view|edit&bugID=<id>`，不用 `/zentao/bug-view-<id>.html`（会重定向）

**附图必须自动上传并嵌入**，不是贴本地路径：

- 禅道：编辑页 `input[name='files[]']` set_input_files 后保存；REST `/api.php/v1/files` 不可靠，不用
- GitHub Issue：上传到 assets.github.com，正文用 `![](url)`
- 飞书 BUG 节：`drive/v1/medias/upload_all` → 拿 `file_token` → 插入 image block (block_type=27)

每条 BUG 附图数量：主图 1 张 + 附证据 ≤ 3 张。附图失败时先建单、再用评论补图，并在汇报里告诉大王哪张没传。

## 完成后交付

返回给大王**一条消息**，包含：
- 飞书报告 URL
- 通过率 / 用例总数 / BUG 数
- TOP 3 风险点（一行一个）
- go/no-go 结论

不要输出冗长总结，上述信息就够。

## 失败处理

- 阶段 1-3 任意步骤失败：保留已完成产物，创建飞书报告说明"执行中断"，BUG 阶段跳过，返回中断原因 + 恢复指引。
- 飞书文档创建失败：fallback 为本地 `~/.claude/cache/qa-reports/<ts>.md` 并把错误贴出来，让大王决定重试或手工传。
