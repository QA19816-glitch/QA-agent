# 软件测试专项 Skills 总清单

这份清单专门从“软件测试负责人 / QA 负责人”的视角整理，而不是按 OpenClaw 系统分类。

- 仓库主页：<https://github.com/QA19816-glitch/QA-agent>
- 全局技能总表：<https://github.com/QA19816-glitch/QA-agent/blob/main/inventory/ALL_SKILLS.md>
- 非测试专项清单：<https://github.com/QA19816-glitch/QA-agent/blob/main/inventory/NON_TESTING_SPECIALTIES.md>

---

## 1. 测试设计 / 需求分析 / 用例 / 追踪 / 报告

- **qa-prd-analyzer**：分析 PRD / 需求文档 / 变更说明，输出功能拆解、流程、歧义点和测试风险。
- **qa-test-point-extractor**：从需求、流程、接口文档中提取覆盖正常、异常、边界、权限和状态流转的测试点。
- **qa-testcase-writer**：把测试点转成标准测试用例，包含前置条件、步骤、预期结果和优先级。
- **qa-traceability-mapper**：建立需求 → 测试点 → 用例 → 执行 → 缺陷的追踪矩阵。
- **qa-test-data-factory**：设计和生成边界值、权限、状态流转等测试数据。
- **qa-test-report-generator**：生成测试报告，汇总范围、结果、风险和发布建议。
- **qa-regression-planner**：按变更影响范围规划回归。
- **qa-release-gate-checker**：做发布闸门判断，给出 go / no-go 结论。

## 2. 功能测试 / 冒烟 / 回归 / 巡检

- **qa**：系统化 QA 测试 Web 应用并自动修 bug。
- **qa-browser-tester**：真实浏览器 headless 进行点击、表单、菜单和主流程测试。
- **qa-patrol**：本地浏览器自动化 QA，适合烟雾测试和基础回归。
- **Test Generator**：自动生成单测 / 集成 / E2E 测试用例。
- **test-master**：测试策略、自动化框架、性能/安全测试设计。
- **test-patterns**：多语言测试模式，支持单测 / 集成 / E2E / 覆盖率。
- **test-sentinel**：写测试、跑测试、lint、自动修失败。
- **ux-qa-gate**：UI/UX 交付前自检，检查功能、可用性、边界状态和交互细节。

## 3. 接口测试 / 合同测试 / Mock / 自动化

- **qa-api-runner**：执行 API 冒烟、回归、异常测试，校验状态码、鉴权、断言。
- **APITester Agent-Driven API Testing**：用自然语言定义接口测试并执行。
- **API Mock Server Generator**：从 OpenAPI 或示例生成 Mock API 服务器。
- **openapi-spec**：OpenAPI 规范设计、schema 复用、安全方案和 codegen。
- **Postman**：管理 collection / environment / Newman 自动化。

## 4. Web UI / E2E / 浏览器自动化测试

- **qa-web-e2e-runner**：执行 Web UI 端到端测试，记录步骤、断言、截图和结论。
- **e2e-test-orchestrator**：编排 Playwright / Cypress E2E 测试、修复脚本、生成报告。
- **e2e-testing**：E2E 测试规范和模式。
- **e2e-testing-patterns**：Playwright / Cypress 最佳实践、反 flaky、CI 集成。
- **playwright-browser-automation**：直接用 Playwright 做网页自动化。
- **playwright-cli** / **playwright-mcp** / **playwright-npx**：不同执行方式的 Playwright 自动化。
- **playwright-pro** / **playwright-skill**：更完整的 Playwright 测试/迁移/反 flaky 能力。
- **web-screenshot**：网页截图 / PDF 导出，适合 UI 对比和存档。

## 5. APP / 移动端 / 终端专项

- **mobile-appium-test**：Appium + Android UI 自动化测试。
- **android-automation**：ADB + uiautomator Android 自动化。
- **android-device-automation**：基于截图的 Android 视觉自动化。
- **mobile-responsive**：移动端响应式设计 / UX 审查。
- **fastlane**：iOS/macOS 构建、签名、TestFlight、发布。
- **TestFlight**：TestFlight beta 分发和测试管理。

## 6. 性能 / SEO / 安全 / 埋点测试

- **api-performance-testing**：接口性能测试与压测设计。
- **frontend-performance-audit**：前端性能诊断，输出优化报告。
- **webperf-core-web-vitals**：分析 LCP / CLS / INP 等指标。
- **Chrome DevTools Auto Analyzer**：基于 Lighthouse / DevTools 自动分析网站性能问题。
- **performance-tuning**：系统级性能调优和瓶颈定位。
- **seo-optimizer** / **seo-analyzer** / **website-seo**：SEO 审计与优化。
- **security-audit** / **security-auditor** / **security-scanner**：安全测试、风险审计、漏洞扫描。
- **add-analytics** / **analytics-tracking** / **check-analytics** / **sensors-analytics-tracking**：埋点设计、埋点审计、神策专项验收。

## 7. 缺陷管理 / 复盘 / 协同

- **qa-bug-triage**：把失败结果、截图、日志整理成缺陷单并建议优先级。
- **bug-investigation**：复现、定位和分析前端 bug。
- **jira** / **linear**：问题单、迭代、项目协作。
- **incident-fupan**：事故复盘 / RCA / postmortem。

## 推荐入口

- 仓库主页：<https://github.com/QA19816-glitch/QA-agent>
- 全局技能总表：<https://github.com/QA19816-glitch/QA-agent/blob/main/inventory/ALL_SKILLS.md>
- 非测试专项清单：<https://github.com/QA19816-glitch/QA-agent/blob/main/inventory/NON_TESTING_SPECIALTIES.md>
