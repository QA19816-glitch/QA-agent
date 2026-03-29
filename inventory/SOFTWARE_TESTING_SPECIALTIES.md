🧪 二、软件测试专项 Skills 清单
聚焦软件测试全流程，覆盖需求分析、功能测试、接口测试、自动化测试等核心场景，助力测试团队提升效率、保障产品质量。
1. 需求分析 / 测试设计 / 用例 / 追踪 / 报告
- qa-prd-analyzer：深度分析 PRD、需求文档及产品变更说明，自动拆解业务流程、识别核心功能点、排查需求歧义及潜在测试风险，推动测试工作前置，提升需求评审效率。
- qa-test-point-extractor：从需求文档、业务流程、接口文档中精准提取可执行测试点，全面覆盖正常流程、异常场景、边界值、权限控制及状态流转，确保测试覆盖无遗漏。
- qa-testcase-writer：将提取的测试点规范化整理为标准测试用例，明确前置条件、执行步骤、预期结果及优先级，可直接用于测试执行及文档输出，规范测试流程。
- qa-traceability-mapper：建立需求、测试点、测试用例、执行结果、缺陷之间的全链路追踪关系，实现需求覆盖率统计及测试闭环管理，便于项目复盘及质量追溯。
- qa-test-data-factory：按需设计并生成多元化测试数据，涵盖边界数据、脏数据、权限数据、状态流转数据及接口入参数据等，满足各类测试场景的数据需求。
- qa-test-report-generator：自动汇总测试范围、用例通过率、失败项、缺陷统计、风险评估及发布建议，生成标准化测试报告，减少人工整理成本，提升汇报效率。
- qa-regression-planner：根据需求变更、受影响模块及依赖关系，智能规划回归测试范围，精准规避回归测试冗余或漏测问题，提升回归测试效率。
- qa-release-gate-checker：版本上线前开展质量门禁检查，从缺陷状态、用例通过率、风险级别、未关闭问题等多维度评估，判断版本是否具备上线条件，保障上线质量。
2. 功能测试 / 冒烟测试 / 回归测试 / 巡检
- qa：系统化开展 Web 应用 QA 测试，全面检查页面功能、核心业务路径及基础交互场景，适用于线上产品质量常态化检查。
- qa-browser-tester：在真实浏览器环境中自动化执行点击、输入、菜单切换、表单提交等操作，模拟用户真实使用场景，提升功能测试真实性及效率。
- qa-patrol：本地浏览器自动化测试工具，无需依赖外部云端执行环境，适用于冒烟测试、日常巡检及基础回归测试，便捷高效。
- Test Generator：自动生成单元测试、集成测试、E2E 测试脚本，助力研发及测试开发人员快速补齐测试覆盖，提升代码质量。
- test-master：聚焦测试架构与策略设计，可协助制定测试方案、自动化测试策略、性能测试策略及安全测试策略，规范测试体系。
- test-patterns：沉淀行业通用测试设计模式，统一团队测试用例写法、组织方式及最佳实践，提升测试团队协作效率。
- test-sentinel：全流程自动化测试工具，可自动编写测试用例、执行测试、运行 lint 检查、识别测试失败原因，并尝试自动修复常见问题，降低测试成本。
- ux-qa-gate：从 UI/UX 质量视角开展交付前检查，验证页面布局、边界状态、按钮文案、交互一致性及用户体验细节，保障产品体验质量。
3. 接口测试 / API 测试 / 合同测试 / Mock
- qa-api-runner：高效执行 API 冒烟测试、回归测试及异常测试，精准检查接口状态码、响应结构、鉴权逻辑、错误处理及断言结果，保障接口稳定性。
- APITester Agent-Driven API Testing：支持通过自然语言描述接口测试场景，自动生成并执行 API 测试用例，适用于快速验证接口功能，降低测试门槛。
- API Mock Server Generator：根据 OpenAPI 规范或接口示例，快速生成 Mock API 服务，助力前后端联调、产品演示及测试工作提前开展，提升协作效率。
- openapi-spec：规范化设计与维护 OpenAPI 规范，统一接口文档、schema 定义、鉴权方案、错误码及代码生成流程，实现接口标准化管理。
- Postman：集中管理 Postman 集合、环境变量及 Newman 自动化执行脚本，支持团队协作开展接口测试，提升接口测试协同效率。
4. Web UI / E2E / 浏览器自动化测试
- qa-web-e2e-runner：执行 Web 端到端测试，自动记录操作步骤、断言测试结果、截取测试截图并生成测试结论，适用于核心业务链路验证。
- e2e-test-orchestrator：统一编排 Playwright / Cypress 的 E2E 测试执行流程，支持测试脚本修复、失败排查及测试报告生成，规范 E2E 测试体系。
- e2e-testing：提供 E2E 测试规范、目录结构及实践模式，协助团队建立标准化 E2E 测试体系，提升测试规范性。
- e2e-testing-patterns：沉淀 Playwright / Cypress 测试最佳实践，重点解决测试不稳定、等待策略优化及 CI 集成等核心问题，提升 E2E 测试可靠性。
- playwright-browser-automation：通过 Playwright API 实现浏览器自动化，可广泛应用于测试执行、网页抓取、表单操作、截图留存及流程验证等场景。
- playwright-cli：基于官方 Playwright CLI 执行网页自动化任务，适用于命令行驱动的自动化场景，便捷高效。
- playwright-mcp：通过 Playwright MCP 实现浏览器自动化，适用于需要与 MCP 工具链衔接的自动化测试场景，提升工具兼容性。
- playwright-npx：通过 Node + Playwright 脚本执行浏览器操作，适用于临时自动化任务及脚本化测试场景，灵活便捷。
- playwright-pro：提供全方位 Playwright 迁移、调优、测试报告及反不稳定能力，适用于生产级自动化测试场景，保障测试稳定性。
- playwright-skill：完整封装 Playwright 浏览器测试工作流，可快速启动网页自动化测试，降低自动化测试门槛。
- web-screenshot：支持网页整页截图、PDF 导出、页面证据留存，适用于 UI 对比、测试留证及页面归档等场景，提升工作规范性。
5. APP / 移动端 / 终端测试
- mobile-appium-test：基于 Appium 实现 Android 真机 UI 自动化测试，精准执行 App 端功能验证，保障移动端产品质量。
- android-automation：通过 ADB + uiautomator 控制 Android 设备，实现自动点击、截图、界面分析及调试，提升移动端测试效率。
- android-device-automation：基于截图识别和视觉理解实现 Android 设备自动化，无需依赖 DOM 和无障碍标签，适配更多测试场景。
- mobile-responsive：检查移动端响应式设计、布局适配、触控体验及不同屏幕尺寸下的可用性，保障移动端用户体验。
- fastlane：自动化处理 iOS / macOS 应用构建、签名、TestFlight 分发及 App Store 发布等流程，提升移动端研发交付效率。
- TestFlight：用于 TestFlight 测试包分发、测试人员协作及 beta 测试管理，助力移动端产品灰度测试及问题收集。
6. 性能 / SEO / 安全 / 埋点测试
- api-performance-testing：设计并执行接口压测、并发测试、吞吐测试、响应时间分析及性能瓶颈定位，保障接口性能稳定。
- frontend-performance-audit：分析网页首屏加载性能、资源加载效率、渲染阻塞问题及交互卡顿现象，输出针对性优化建议，提升前端体验。
- webperf-core-web-vitals：重点分析 LCP、CLS、INP 等 Core Web Vitals 核心指标，全面评估网页体验质量，助力前端优化。
- Chrome DevTools Auto Analyzer：利用 Lighthouse / DevTools 自动分析网站性能、可访问性、SEO 及最佳实践问题，提升网站整体质量。
- performance-tuning：聚焦系统级性能调优，协助分析系统延迟、吞吐能力、资源饱和、慢查询及系统瓶颈，提升系统整体性能。
- seo-optimizer：开展 SEO 全面审计并输出优化方案，涵盖页面结构、关键词布局、技术 SEO 等核心维度，提升网站搜索排名。
- seo-analyzer：精准分析网页 SEO 问题，包括标题、描述、标签、索引性、结构化数据等，助力优化网页搜索表现。
- website-seo：提供站点级全面 SEO 工具，覆盖技术 SEO、内链结构、Schema 配置及页面质量评估，全方位提升网站 SEO 能力。
- security-audit：从代码及基础设施视角开展安全审计，识别潜在安全风险及不安全配置，保障系统安全。
- security-auditor：检查系统认证机制、权限控制、输入校验、常见漏洞及安全规范符合性，筑牢系统安全防线。
- security-scanner：自动化执行漏洞扫描及风险排查，适用于版本上线前安全检查，降低安全风险。
- add-analytics：为系统补充 Google Analytics / GA4 埋点能力，实现用户行为数据采集及分析。
- analytics-tracking：设计埋点方案、事件模型、转化路径及数据采集规则，规范数据采集流程，提升数据准确性。
- check-analytics：审计现有埋点实现情况，排查漏埋、错埋、事件缺失及配置异常等问题，保障埋点数据质量。
- sensors-analytics-tracking：面向神策埋点开展设计、字段命名、事件规范及验收回归测试，确保神策埋点合规有效。
7. 缺陷管理 / 复盘 / 协同
- qa-bug-triage：将测试失败结果、截图、日志及问题现象整理为结构化缺陷单，明确缺陷优先级及严重级建议，提升缺陷管理效率。
- bug-investigation：针对前端缺陷开展复现、定位、调试、假设验证及根因分析，助力快速解决缺陷。
- jira：高效管理 Jira 工单、迭代计划、缺陷跟踪、backlog 及项目流转，提升团队协作效率。
- linear：管理 Linear 工单、团队任务及研发协同流程，适配敏捷研发模式，提升协作效率。
- incident-fupan：用于事故复盘、时间线梳理、根因分析、改进项沉淀及复发预防，提升团队问题解决能力及流程优化水平。
8. 测试支撑环境 / 数据库 / 日志 / 可观测
- db-readonly：提供 MySQL / PostgreSQL 只读查询能力，适用于数据校验、问题排查及测试验证，保障数据安全。
- sql-toolkit：用于 SQL 编写、schema 设计、迁移脚本开发、慢查询优化及数据结构设计，提升数据库操作效率。
- postgres：面向 PostgreSQL 开展管理、优化、查询计划分析及健康检查，保障数据库稳定运行。
- grafana：管理 Grafana 面板、数据源、文件夹、注释及告警配置，实现系统监控可视化。
- grafana-lens：深度分析监控数据、日志、trace、安全事件，助力问题快速排查及根因分析。
- kibana：开展日志检索、监控视图搭建、异常分析及观测数据查询，提升系统可观测性。
- prometheus：查询指标数据，检查服务器及服务健康状态，实现系统实时监控。
- promql-cli：直接执行 PromQL 查询，分析时序指标及趋势变化，助力监控数据分析。
- log-analyzer：自动分析日志模式、异常事件及定时任务运行问题，输出分析报告，提升日志排查效率。
- logging-observability：搭建日志、指标、trace、告警一体化可观测体系，提升系统运维效率。
- system_resource_monitor：实时监控 CPU、内存、Swap、磁盘占用等系统资源，及时发现资源异常。
- tcpdump：开展网络抓包及网络层问题排查，助力解决网络连接异常问题。
- Wireshark Network Traffic Analysis：使用 Wireshark / tshark 开展 PCAP 分析、连接排查及流量取证，解决复杂网络问题。
9. 测试平台 / CI / 环境自动化
- docker：构建和运行测试所需容器环境，实现环境标准化，提升测试环境一致性。
- Docker Compose：管理多容器测试环境及依赖服务编排，简化环境部署流程。
- Docker Pro Diagnostic：分析 Docker 容器日志及运行异常，助力容器问题快速排查。
- kubectl-skill：通过 kubectl 管理 Kubernetes 集群资源并排障，保障集群稳定运行。
- Kubernetes：协助规避 Kubernetes 常见配置错误，提升集群配置规范性。
- kubernetes-devops：生成 Deployment、Service、Ingress、ConfigMap、Secret 等 K8s 配置，提升配置效率。
- helm：创建、检查、模板化和发布 Helm Chart，简化 Kubernetes 应用部署流程。
- kafka：处理 Kafka 消息生产、消费、lag 检查及消息流问题，保障消息队列稳定运行。
- mqtt-client：连接并调试 MQTT 服务和消息链路，保障物联网消息传输稳定。
- rabbitmq-client-guide：指导 RabbitMQ 客户端开发、连接复用、ack 配置、prefetch 优化及性能调优，提升消息队列使用效率。
- Nginx：配置反向代理、负载均衡、静态资源服务及 SSL 证书，保障 Web 服务稳定运行。
- Traefik：配置 Traefik 路由、TLS 及中间件规则，实现服务动态路由管理。
- initial-traefik：快速初始化 Traefik + Docker 的代理环境，简化环境部署流程。
- aws-infra：管理 AWS 资源、查询基础设施状态及监控信息，保障云资源稳定运行。
- cloudflare：管理域名、DNS、SSL、WAF 及 Cloudflare 配置，提升网站安全性及访问速度。
- cloudflare-tunnel：通过 Cloudflare Tunnel 安全暴露本地服务，无需直接开放端口，提升服务安全性。
- terraform-iac：编写和管理 Terraform / IaC 模块、状态及变更，实现基础设施即代码，提升基础设施部署效率。
- GitHub Actions：设计和调试 GitHub Actions 工作流，实现 CI/CD 自动化，提升研发交付效率。
- GitLab：处理 GitLab CI/CD 配置和流水线问题，适配 GitLab 生态下的研发协同。
- Jenkins：管理 Jenkins 构建、日志及任务执行，实现自动化构建、测试及部署。
- CI-CD：统一自动化构建、测试和发布流程，提升研发交付效率及规范性。
- cicd-pipeline：设计、搭建和调试 CI/CD 流水线，适配不同研发场景，提升流水线稳定性。
- Monitoring：建设系统监控、日志、trace 和告警机制，提升系统可观测性及运维效率。
