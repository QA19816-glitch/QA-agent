# 软件测试专项 Skills 总清单

这份清单专门从“软件测试负责人”的视角整理，而不是按 OpenClaw 系统分类。

仓库地址：<https://github.com/QA19816-glitch/QA-agent>

最新总包：<https://github.com/QA19816-glitch/QA-agent/blob/main/dist/qa-it-lead-skills-v9.zip>

完整总表：<https://github.com/QA19816-glitch/QA-agent/blob/main/inventory/ALL_SKILLS.md>

---

## 1. 测试设计 / 需求分析 / 用例 / 追踪 / 报告

- **qa-prd-analyzer**
  - 作用：分析 PRD、需求文档、Wiki、变更说明，输出功能拆解、业务流、歧义点和测试风险。
- **qa-test-point-extractor**
  - 作用：从需求、流程、接口文档中提取测试点，覆盖正常、异常、边界、权限、状态流转。
- **qa-testcase-writer**
  - 作用：把测试点转成标准测试用例，带前置条件、步骤、预期结果、优先级。
- **qa-traceability-mapper**
  - 作用：建立需求→测试点→用例→执行→缺陷的追踪矩阵。
- **qa-test-data-factory**
  - 作用：设计和生成测试数据，包括边界值、权限数据、状态流转数据。
- **qa-test-report-generator**
  - 作用：生成测试报告，汇总范围、通过率、缺陷、风险、发布建议。
- **qa-regression-planner**
  - 作用：根据需求变更和影响范围，规划回归范围，决定该回归哪些模块。
- **qa-release-gate-checker**
  - 作用：判断版本是否可发布，给出 go / no-go 结论。

---

## 2. 功能测试 / 冒烟 / 回归 / 站点巡检

- **qa**
  - 作用：系统化 QA 测试 Web 应用并自动修 bug。
- **qa-browser-tester**
  - 作用：真实浏览器 headless 全面点击、表单、菜单、流程测试。
- **qa-patrol**
  - 作用：本地浏览器自动化 QA，不走云，适合烟雾测试和基础回归。
- **test-generator**
  - 作用：自动生成单测 / 集成 / E2E 测试用例。
- **test-master**
  - 作用：测试策略、自动化框架、性能/安全测试设计。
- **test-patterns**
  - 作用：多语言测试模式，支持单测 / 集成 / E2E / 覆盖率。
- **test-sentinel**
  - 作用：写测试、跑测试、lint、自动修失败。
- **ux-qa-gate**
  - 作用：UI/UX 交付前自检，检查功能、可用性、边界状态、交互细节。

---

## 3. 接口测试（功能 / 协议 / 合同 / Mock）

- **qa-api-runner**
  - 作用：生成并执行 API 冒烟、回归、异常测试，校验接口行为、状态码、鉴权和断言。
- **APITester Agent-Driven API Testing**
  - 作用：用自然语言定义接口测试，跑接口并输出结果。
- **API Mock Server Generator**
  - 作用：从 OpenAPI 或示例生成 Mock API 服务器。
- **openapi-spec**
  - 作用：OpenAPI 规范设计、schema 复用、安全方案、codegen。
- **openclaw-api-tester / analytics-tracking 系列**
  - 作用：补充 API 文档、接口追踪和事件模型验证。

## 4. 接口自动化

- **Postman**
  - 作用：管理 Postman collection / environment / Newman 自动化。
- **qa-api-runner**
  - 作用：把接口测试场景自动化执行成冒烟、回归、异常测试。
- **APITester Agent-Driven API Testing**
  - 作用：用自然语言描述接口测试并自动执行。
- **API Mock Server Generator**
  - 作用：快速生成 Mock API 服务，方便接口联调和自动化测试。

## 5. 接口性能测试 / 压测 / 稳定性

- **api-performance-testing**
  - 作用：接口性能测试专用，规划压测场景、并发、TPS/QPS、P95/P99、错误率，并输出性能结论与风险。
- **performance-tuning**
  - 作用：系统级性能调优思路，适合分析接口慢、吞吐低、资源饱和、瓶颈定位。
- **frontend-performance-audit**
  - 作用：虽然偏前端，但适合联动看接口导致的页面性能问题。
- **Postman / Newman**
  - 作用：适合做轻量接口压测、回归验证和接口稳定性检查。

---

## 6. Web UI / E2E / 浏览器自动化

- **qa-web-e2e-runner**
  - 作用：执行 Web UI 端到端测试，记录步骤、断言、截图和结论。
- **e2e-test-orchestrator**
  - 作用：编排 Playwright / Cypress E2E 测试、修复脚本、生成报告。
- **e2e-testing**
  - 作用：E2E 测试规范和模式。
- **e2e-testing-patterns**
  - 作用：Playwright / Cypress 最佳实践、反 flaky、CI 集成。
- **playwright-browser-automation**
  - 作用：直接 Playwright API 浏览器自动化。
- **playwright-cli**
  - 作用：Playwright CLI 网页自动化。
- **playwright-mcp**
  - 作用：通过 Playwright MCP 做浏览器自动化。
- **playwright-npx**
  - 作用：Node + Playwright 脚本跑浏览器任务。
- **playwright-pro**
  - 作用：生产级 Playwright 测试、迁移、反 flaky、报告。
- **playwright-skill**
  - 作用：完整 Playwright 浏览器测试/自动化。
- **web-screenshot**
  - 作用：网页全页截图、PDF 导出，适合 UI 对比和存档。

---

## 7. APP / 移动端测试（Android / iOS）

- **mobile-appium-test**
  - 作用：Appium + 真机 Android UI 自动化测试。
- **android-automation**
  - 作用：ADB + uiautomator 做 Android 自动化。
- **android-device-automation**
  - 作用：基于截图的 Android 视觉自动化（Midscene）。
- **mobile-responsive**
  - 作用：移动端响应式设计 / UX 审查。
- **fastlane**
  - 作用：iOS/macOS 构建、签名、TestFlight、发布。
- **TestFlight**
  - 作用：TestFlight beta 分发和测试管理。
- **ios-simulator / kubectl 等延伸专项**
  - 作用：辅助 iOS 模拟器和移动发布链路调试。

---

## 8. 性能测试 / 前端性能 / 页面体验

- **frontend-performance-audit**
  - 作用：前端性能诊断，输出结构化优化报告。
- **webperf-core-web-vitals**
  - 作用：分析 LCP / CLS / INP 等 Core Web Vitals。
- **Chrome DevTools Auto Analyzer / web-auto-analyzer**
  - 作用：基于 Lighthouse / DevTools 自动分析网站性能和问题点。
- **performance-tuning**
  - 作用：系统级性能调优思路，适合服务端、数据库、缓存、资源饱和问题。
- **lighthouse CLI**
  - 作用：Lighthouse 分数、SEO / 性能 / 可访问性检测。

---

## 9. SEO 测试 / 网站健康 / 技术 SEO

- **seo-analyzer**
  - 作用：分析网页 SEO 问题并给建议。
- **seo-optimizer**
  - 作用：SEO 审计、meta/schema/sitemap、优化方案。
- **website-seo**
  - 作用：On-page SEO、Schema、内部链接、技术 SEO。
- **pls-seo-audit**
  - 作用：专项 SEO 审计。
- **shelly-seo-analyzer**
  - 作用：URL 级 SEO 分析。
- **pls-audit-website**
  - 作用：网站综合健康审计，兼顾 SEO、性能、链接、可用性。

---

## 10. 安全测试 / 漏洞扫描 / 风险审计

- **security-audit**
  - 作用：代码和基础设施安全审计。
- **security-auditor**
  - 作用：安全漏洞、认证、OWASP Top 10 审查。
- **security-scanner**
  - 作用：自动化漏洞扫描和安全审计。
- **healthcheck**
  - 作用：主机安全巡检、硬化、风险评估。

---

## 11. BUG 缺陷管理 / 缺陷定位 / 事故复盘

- **qa-bug-triage**
  - 作用：把失败结果、截图、日志整理成缺陷单，给出严重级别和优先级建议。
- **bug-investigation**
  - 作用：复现、定位、分析前端 bug。
- **jira**
  - 作用：Jira issue / sprint / backlog 管理。
- **linear**
  - 作用：Linear issue / project 管理。
- **mantis-manager**
  - 作用：Mantis 缺陷系统管理。
- **incident-fupan**
  - 作用：事故复盘 / RCA / postmortem。
- **crash-fixer**
  - 作用：分析 crash 报告，自动修复并提 PR。

---

## 12. 埋点测试 / 数据分析 / 神策埋点

- **check-analytics**
  - 作用：审计现有埋点/GA 实现是否缺漏。
- **add-analytics**
  - 作用：新增 GA4 tracking。
- **analytics-tracking-2**
  - 作用：事件模型、转化追踪、tracking 方案设计。
- **cs-analytics-tracking**
  - 作用：埋点审计、GTM、事件模型、数据质量排查。
- **sw-analytics-tracking**
  - 作用：tracking 方案、漏埋 / 错埋 / 转化追踪规划。
- **sensors-analytics-tracking**
  - 作用：神策埋点专用，做事件设计、属性命名、H5/Web/App 埋点验收和回归。

---

## 13. 测试环境 / 数据库 / 日志 / 可观测性（测试支撑类）

- **db-readonly**
  - 作用：只读查询 MySQL/PostgreSQL，适合数据校验。
- **sql-toolkit**
  - 作用：写 SQL、设计 schema、优化查询、迁移。
- **postgres**
  - 作用：PostgreSQL 管理、优化、健康检查。
- **grafana / grafana-lens**
  - 作用：监控面板、日志、traces、alerts 排障。
- **kibana**
  - 作用：日志检索和观测分析。
- **prometheus / promql-cli**
  - 作用：指标查询、告警分析。
- **log-analyzer / logging-observability**
  - 作用：日志聚合、错误模式识别、可观测性体系建设。
- **system_resource_monitor**
  - 作用：CPU / RAM / Disk 资源监控。
- **tcpdump / Wireshark Network Traffic Analysis**
  - 作用：抓包、网络故障和协议分析。

---

## 14. 测试平台 / CI / 发布 / 环境自动化（测试支撑类）

- **docker / Docker Compose / Docker Pro Diagnostic**
  - 作用：容器环境、依赖服务、日志排查。
- **kubectl-skill / kubernetes-devops / helm**
  - 作用：K8s 环境部署、调试、配置管理。
- **kafka / mqtt-client / rabbitmq-client-guide**
  - 作用：消息队列链路测试与排查。
- **Nginx / Traefik / initial-traefik**
  - 作用：网关、反向代理、服务路由测试环境搭建。
- **aws-infra / cloudflare / cloudflare-tunnel / terraform-iac**
  - 作用：云资源、域名、Tunnel、IaC 环境支撑。
- **GitHub Actions / GitLab / Jenkins / cicd-pipeline**
  - 作用：自动化测试、持续集成、持续交付流水线。

---

## 推荐分享给朋友的入口

- 仓库首页：<https://github.com/QA19816-glitch/QA-agent>
- 最新总包：<https://github.com/QA19816-glitch/QA-agent/blob/main/dist/qa-it-lead-skills-v9.zip>
- 完整总表：<https://github.com/QA19816-glitch/QA-agent/blob/main/inventory/ALL_SKILLS.md>
- 软件测试专项总清单：<https://github.com/QA19816-glitch/QA-agent/blob/main/inventory/SOFTWARE_TESTING_SPECIALTIES.md>
- 神策埋点 skill：<https://github.com/QA19816-glitch/QA-agent/blob/main/dist/sensors-analytics-tracking.skill>
