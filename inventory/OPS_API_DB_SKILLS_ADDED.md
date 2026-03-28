# 监控 / 日志 / 数据库 / API / 抓包 Skills

这份是从测试负责人 / IT 负责人的日常排障、巡检、联调、接口治理视角整理的扩展技能。

## 覆盖方向
- 监控与资源巡检
- Grafana / Prometheus / Kibana
- SQL / MySQL / PostgreSQL / Redis
- OpenAPI / API 文档 / Mock / Postman
- tcpdump / Wireshark / mitmproxy 抓包链路

- **logging-observability** [ready]
  - 功能：Structured logging, distributed tracing, and metrics collection patterns for building observable systems. Use when implementing logging infrastructure, setting up distributed tracing with OpenTelemetry, designing metrics collection (RED/USE methods), configuring alerting and dashboards, or reviewing observability practices. Covers structured JSON logging, context propagation, trace sampling, Prometheus/Grafana stack, alert design, and PII/secret scrubbing.
  - 说明：OK
- **system-resource-monitor** [installed-dir-unlisted]
  - 说明：目录已安装，但当前 openclaw skills list 未暴露。
- **monitoring** [installed-dir-unlisted]
  - 说明：目录已安装，但当前 openclaw skills list 未暴露。
- **grafana-lens** [needs-setup]
  - 功能：Grafana tools for data visualization, monitoring, alerting, security, and SRE investigation. Use grafana_query, grafana_query_logs, grafana_query_traces, grafana_create_dashboard, grafana_update_dashboard, grafana_create_alert, grafana_share_dashboard, grafana_annotate, grafana_explore_datasources, grafana_list_metrics, grafana_search, grafana_get_dashboard, grafana_check_alerts, grafana_push_metrics, grafana_explain_metric, grafana_security_check, and grafana_investigate. Trigger when asked about metrics, dashboards, monitoring, alerts, costs, token usage, data visualization, PromQL, Prometheus, LogQL, Loki, log queries, error logs, log search, TraceQL, Tempo, traces, distributed tracing, span search, find slow traces, debug session traces, annotations, deployments, sharing charts, investigating alert notifications, pushing custom data (calendar, git, fitness, finance) to Grafana for visualization, pushing historical data, backfilling metrics, recording past data with timestamps, modifying dashboards, adding panels, removing panels, changing dashboard settings, updating dashboard time range, explain metric, metric trend, what is this metric, how has this changed, is this metric normal, why did my bill spike, cost visibility, security monitoring, security check, security audit, am I being attacked, is my agent compromised, suspicious activity, threat detection, prompt injection detection, set up security alerts, investigate, debug, triage, root cause, what's wrong, why is X broken, anomaly detection, RED method, USE method, alert fatigue, postmortem, incident summary.
  - 说明：config: grafana.url, grafana.apiKey 需要 grafana.url / grafana.apiKey 配置后 fully ready。
- **grafana-api** [installed-dir-unlisted]
  - 说明：目录已安装，但当前 openclaw skills list 未暴露。
- **prometheus** [ready]
  - 功能：Query Prometheus monitoring data to check server metrics, resource usage, and system health. Use when the user asks about server status, disk space, CPU/memory usage, network stats, or any metrics collected by Prometheus. Supports multiple Prometheus instances with aggregated queries, config file or environment variables, and HTTP Basic Auth.
  - 说明：OK
- **promql-cli** [needs-setup]
  - 功能：CLI for querying Prometheus and PromQL-compatible engines (Thanos, Cortex, VictoriaMetrics, Grafana Mimir, Grafana Tempo...) — instant queries, range queries, metric discovery (metrics/labels/meta subcommands), output formats (table/csv/json/graph). Apply when executing PromQL queries, troubleshooting performance issues on a software having observability, investigating latency/error rates/saturation, or analyzing time series data.
  - 说明：bins: promql promql 二进制当前仍缺。
- **kibana** [ready]
  - 功能：Kibana API integration with managed authentication. Manage saved objects, dashboards, data views, spaces, alerts, and fleet.Use this skill when users want to interact with Kibana for observability, security, and search analytics.For other third party apps, use the api-gateway skill (https://clawhub.ai/byungkyu/api-gateway).
  - 说明：OK
- **openclaw-log-analyzer** [installed-dir-unlisted]
  - 说明：目录已安装，但当前 openclaw skills list 未暴露。
- **sql-toolkit** [ready]
  - 功能：Query, design, migrate, and optimize SQL databases. Use when working with SQLite, PostgreSQL, or MySQL — schema design, writing queries, creating migrations, indexing, backup/restore, and debugging slow queries. No ORMs required.
  - 说明：OK
- **db-readonly** [ready]
  - 功能：Run safe read-only queries against MySQL or PostgreSQL for data inspection, reporting, and troubleshooting. Use when the user asks to read tables, inspect schema, count rows, sample data, or export query results without modifying data.
  - 说明：OK
- **mysqladm** [installed-dir-unlisted]
  - 说明：目录已安装，但当前 openclaw skills list 未暴露。 mysql/mysqladmin 已通过 mysql-client 链接到 PATH。
- **postgres-mcp-skill** [installed-dir-unlisted]
  - 说明：目录已安装，但当前 openclaw skills list 未暴露。 psql 已安装。
- **redis-skill** [missing]
  - 说明：未安装。 redis-cli 已安装；skill 目录可能已存在但当前未在 skills list 暴露。
- **openapi-spec** [ready]
  - 功能：Deep OpenAPI workflow—design-first vs code-first, reusable schemas, security schemes, errors, examples, linting, compatibility, and codegen. Use when documenting REST APIs or driving clients and gateways from a spec.
  - 说明：OK
- **api-doc-generator** [installed-dir-unlisted]
  - 说明：目录已安装，但当前 openclaw skills list 未暴露。
- **sovereign-api-mock-generator** [installed-dir-unlisted]
  - 说明：目录已安装，但当前 openclaw skills list 未暴露。
- **postman** [installed-dir-unlisted]
  - 说明：目录已安装，但当前 openclaw skills list 未暴露。 newman 已安装，可用于 Postman collection CLI 执行。
- **tcpdump** [ready]
  - 功能：Tcpdump reference tool. Use when working with tcpdump in devtools contexts.
  - 说明：OK tcpdump 已存在于系统。
- **wireshark-analysis** [installed-dir-unlisted]
  - 说明：目录已安装，但当前 openclaw skills list 未暴露。 tshark 已安装。
