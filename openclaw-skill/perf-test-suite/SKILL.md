# Performance Test Suite

A comprehensive performance testing skill package for OpenClaw that provides tools for HTTP load testing, database benchmarking, API monitoring, system resource tracking, and performance report generation.

## Overview

This skill enables automated performance testing across multiple dimensions:
- **HTTP Load Testing**: Simulate concurrent users and measure response times
- **Database Performance**: Benchmark SQL queries and database operations  
- **API Monitoring**: Track response times and availability of REST APIs
- **System Resource Monitoring**: Monitor CPU, memory, network, and disk usage during tests
- **Report Generation**: Create detailed performance reports with charts and metrics

## Prerequisites

The following tools should be available on the system:

- `ab` (Apache Bench) - for basic HTTP load testing
- `wrk` or `k6` - for advanced HTTP benchmarking (optional but recommended)
- `mysql`/`psql`/`sqlcmd` - database clients for respective databases
- `htop`/`top`/`vmstat`/`iostat` - system monitoring utilities
- `gnuplot` or `matplotlib` - for chart generation (optional)

## Skill Configuration

Create a configuration file at `~/.openclaw/workspace/skills/perf-test-suite/config.json`:

```json
{
  "default_duration": "30s",
  "default_concurrency": 10,
  "default_requests": 1000,
  "monitoring_interval": 1,
  "report_format": "html",
  "output_directory": "~/.openclaw/workspace/perf-reports"
}
```

## Available Actions

### 1. HTTP Load Testing

**Action**: `http_load_test`

**Parameters**:
- `url` (required): Target URL to test
- `concurrency` (optional): Number of concurrent connections (default: 10)
- `requests` (optional): Total number of requests (default: 1000)
- `duration` (optional): Test duration (e.g., "30s", "5m")
- `method` (optional): HTTP method (GET, POST, etc.)
- `headers` (optional): Custom headers as JSON object
- `body` (optional): Request body for POST/PUT methods
- `tool` (optional): Testing tool to use ("ab", "wrk", "k6")

**Example Usage**:
```yaml
action: http_load_test
url: "https://api.example.com/users"
concurrency: 50
requests: 5000
duration: "60s"
headers:
  Authorization: "Bearer token123"
  Content-Type: "application/json"
```

### 2. Database Performance Testing

**Action**: `db_benchmark`

**Parameters**:
- `connection_string` (required): Database connection string
- `queries` (required): Array of SQL queries to benchmark
- `iterations` (optional): Number of times to run each query (default: 100)
- `warmup_runs` (optional): Warmup iterations before timing (default: 10)
- `db_type` (required): Database type ("mysql", "postgresql", "sqlserver", "sqlite")

**Example Usage**:
```yaml
action: db_benchmark
connection_string: "host=localhost;port=5432;dbname=testdb;user=postgres"
db_type: "postgresql"
queries:
  - "SELECT * FROM users WHERE created_at > '2023-01-01'"
  - "UPDATE products SET price = price * 1.1 WHERE category = 'electronics'"
iterations: 500
warmup_runs: 20
```

### 3. API Response Time Monitoring

**Action**: `api_monitor`

**Parameters**:
- `endpoints` (required): Array of API endpoints to monitor
- `interval` (optional): Monitoring interval in seconds (default: 30)
- `duration` (optional): Total monitoring duration (default: "1h")
- `threshold` (optional): Response time threshold in ms (alerts if exceeded)
- `expected_status` (optional): Expected HTTP status code (default: 200)

**Example Usage**:
```yaml
action: api_monitor
endpoints:
  - url: "https://api.example.com/health"
    method: "GET"
  - url: "https://api.example.com/users/123"
    method: "GET"
    headers:
      Authorization: "Bearer token123"
interval: 60
duration: "2h"
threshold: 500
expected_status: 200
```

### 4. Resource Usage Monitoring

**Action**: `resource_monitor`

**Parameters**:
- `target_process` (optional): Specific process name to monitor
- `duration` (optional): Monitoring duration (default: "5m")
- `interval` (optional): Sampling interval in seconds (default: 1)
- `metrics` (optional): Array of metrics to collect ["cpu", "memory", "network", "disk"] (default: all)
- `output_format` (optional): "json", "csv", "prometheus"

**Example Usage**:
```yaml
action: resource_monitor
target_process: "node"
duration: "10m"
interval: 2
metrics: ["cpu", "memory"]
output_format: "json"
```

### 5. Performance Report Generation

**Action**: `generate_report`

**Parameters**:
- `test_results` (required): Array of test result files or data
- `format` (optional): Output format ("html", "pdf", "json") (default: "html")
- `include_charts` (optional): Whether to include visual charts (default: true)
- `title` (optional): Report title
- `output_path` (optional): Custom output path for the report

**Example Usage**:
```yaml
action: generate_report
test_results:
  - "/path/to/http_test_results.json"
  - "/path/to/db_benchmark_results.json"
  - "/path/to/resource_monitor_data.json"
format: "html"
include_charts: true
title: "Performance Test Report - March 2026"
output_path: "~/reports/perf-march-2026.html"
```

## Tool Implementation Details

### HTTP Load Testing Tools

The skill will automatically select the best available tool:

1. **Apache Bench (ab)** - Basic but reliable
   ```bash
   ab -n {requests} -c {concurrency} -H "{headers}" {url}
   ```

2. **wrk** - High-performance HTTP benchmarking
   ```bash
   wrk -t{threads} -c{concurrency} -d{duration} --latency {url}
   ```

3. **k6** - Scriptable load testing with advanced features
   ```javascript
   // Generated k6 script for complex scenarios
   import http from 'k6/http';
   import { check, sleep } from 'k6';
   ```

### Database Benchmarking

For each database type, appropriate CLI tools are used:

- **MySQL**: `mysqlslap` or direct `mysql` client with timing
- **PostgreSQL**: `pgbench` or `psql` with `\timing`
- **SQL Server**: `sqlcmd` with custom timing logic
- **SQLite**: Direct SQLite CLI with timing

### Resource Monitoring

System metrics are collected using:

- **CPU/Memory**: `top`, `htop`, or `/proc/stat` parsing
- **Network**: `netstat`, `ss`, or `/proc/net/dev` parsing  
- **Disk I/O**: `iostat` or `/proc/diskstats` parsing
- **Process-specific**: `ps` command with specific process filtering

### Report Generation

Reports include:

- **Summary Dashboard**: Key metrics overview
- **Detailed Metrics**: Response time distributions, percentiles (p50, p90, p95, p99)
- **Charts**: 
  - Response time over time
  - Requests per second
  - Error rates
  - Resource utilization graphs
- **Recommendations**: Based on observed bottlenecks

## Security Considerations

- All external URLs are validated before testing
- Database credentials should be provided via secure environment variables
- Rate limiting is applied to prevent accidental DoS
- Network monitoring requires appropriate system permissions
- Test results are stored locally by default

## Example Complete Workflow

```yaml
# Full performance test workflow
steps:
  - action: resource_monitor
    duration: "30s"
    interval: 1
    output_path: "/tmp/baseline_resources.json"
  
  - action: http_load_test
    url: "https://api.example.com/products"
    concurrency: 100
    requests: 10000
    duration: "2m"
    output_path: "/tmp/http_results.json"
  
  - action: db_benchmark
    connection_string: "${DB_CONNECTION}"
    db_type: "postgresql"
    queries:
      - "SELECT * FROM products ORDER BY created_at DESC LIMIT 100"
      - "INSERT INTO logs (message, timestamp) VALUES ('test', NOW())"
    iterations: 1000
    output_path: "/tmp/db_results.json"
  
  - action: resource_monitor
    duration: "2m"
    interval: 2
    output_path: "/tmp/load_resources.json"
  
  - action: generate_report
    test_results:
      - "/tmp/baseline_resources.json"
      - "/tmp/http_results.json" 
      - "/tmp/db_results.json"
      - "/tmp/load_resources.json"
    title: "Full System Performance Test"
    output_path: "~/reports/full-perf-test-$(date +%Y%m%d).html"
```

## Error Handling

- Missing dependencies are detected and alternative tools are suggested
- Invalid URLs or endpoints return clear error messages
- Database connection failures include troubleshooting suggestions
- Resource monitoring handles permission errors gracefully
- Report generation continues even if some data sources fail

## Output Format Examples

### HTTP Load Test Results (JSON)
```json
{
  "test_info": {
    "url": "https://api.example.com/test",
    "concurrency": 50,
    "total_requests": 5000,
    "duration": "60s"
  },
  "results": {
    "requests_per_second": 83.2,
    "time_per_request_ms": 601.5,
    "transfer_rate_kbps": 1250.8,
    "percentiles": {
      "p50": 450,
      "p90": 890,
      "p95": 1200,
      "p99": 2100
    },
    "errors": 0,
    "status_codes": {
      "200": 5000
    }
  }
}
```

### Database Benchmark Results (JSON)
```json
{
  "database_info": {
    "type": "postgresql",
    "version": "14.5"
  },
  "queries": [
    {
      "query": "SELECT * FROM users...",
      "iterations": 500,
      "avg_time_ms": 12.5,
      "min_time_ms": 8.2,
      "max_time_ms": 45.7,
      "p95_time_ms": 22.1
    }
  ]
}
```

### Resource Monitoring Results (JSON)
```json
{
  "monitoring_info": {
    "duration": "300s",
    "interval": "1s",
    "target": "all_processes"
  },
  "samples": [
    {
      "timestamp": "2026-03-23T16:30:00Z",
      "cpu_percent": 45.2,
      "memory_mb": 2048,
      "network_rx_kbps": 1250,
      "network_tx_kbps": 890,
      "disk_read_kbps": 250,
      "disk_write_kbps": 180
    }
  ],
  "summary": {
    "cpu_avg": 42.1,
    "cpu_max": 89.5,
    "memory_avg_mb": 2156,
    "memory_max_mb": 3048
  }
}
```

## Installation

To install this skill:

1. Place this `SKILL.md` file in `~/.openclaw/workspace/skills/perf-test-suite/`
2. Ensure required system tools are installed:
   ```bash
   # macOS with Homebrew
   brew install apache-bench wrk gnuplot
   
   # Ubuntu/Debian
   sudo apt-get install apache2-utils wrk gnuplot
   
   # For database tools, install appropriate clients
   ```
3. Create the configuration file as described above
4. The skill will be automatically loaded by OpenClaw

## Maintenance Notes

- Regularly update tool versions for security and performance improvements
- Add new database types as needed
- Extend monitoring capabilities for containerized environments (Docker, Kubernetes)
- Consider adding distributed testing capabilities for large-scale scenarios