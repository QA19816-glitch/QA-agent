---
name: qa-test-suite
description: 完整的 QA 测试技能包，包含 API 测试、UI 自动化、测试数据生成和缺陷跟踪功能
metadata:
  emoji: 🧪
  requires:
    commands: ["curl", "jq", "agent-browser"]
  homepage: "https://github.com/openclaw/qa-test-suite"
---

# QA 测试技能包

一体化的 QA 测试解决方案，支持 API 测试、UI 自动化、测试数据生成和缺陷跟踪。

## 核心功能

### 1. API 测试（REST/GraphQL）

支持完整的 API 测试流程，包括请求发送、断言验证和报告生成。

#### 基本用法

```bash
# REST API 测试
qa-test api --method GET \
           --url "https://api.example.com/users" \
           --header "Authorization: Bearer token123" \
           --assert-status 200 \
           --assert-json ".data | length > 0" \
           --report html

# GraphQL API 测试
qa-test api --method POST \
           --url "https://api.example.com/graphql" \
           --graphql "{ users { id name email } }" \
           --assert-status 200 \
           --assert-json ".data.users | length > 0"

# 带请求体的测试
qa-test api --method POST \
           --url "https://api.example.com/users" \
           --json '{"name":"Test User","email":"test@example.com"}' \
           --assert-status 201 \
           --assert-json ".data.id != null"
```

#### 断言类型

- `--assert-status <code>`: 验证 HTTP 状态码
- `--assert-json <jq-expression>`: 使用 jq 表达式验证 JSON 响应
- `--assert-header <name>:<value>`: 验证响应头
- `--assert-timeout <ms>`: 验证响应时间
- `--assert-contains <text>`: 验证响应包含特定文本

#### 报告格式

- `--report json`: JSON 格式报告
- `--report html`: HTML 格式报告
- `--report junit`: JUnit XML 格式（CI/CD 兼容）

### 2. UI 自动化测试

基于 agent-browser 构建的高级 UI 测试框架，支持复杂的用户交互场景。

#### 基本工作流

```bash
# 初始化测试会话
qa-test ui --session login-test open https://app.example.com/login

# 执行登录流程
qa-test ui --session login-test fill @username "testuser"
qa-test ui --session login-test fill @password "password123"
qa-test ui --session login-test click @submit
qa-test ui --session login-test wait --load networkidle

# 验证登录成功
qa-test ui --session login-test assert visible @dashboard-title
qa-test ui --session login-test assert text @welcome-message "Welcome, Test User"

# 保存认证状态
qa-test ui --session login-test state save auth.json
```

#### 断言方法

- `assert visible <ref>`: 验证元素可见
- `assert hidden <ref>`: 验证元素隐藏
- `assert text <ref> "<expected>"`: 验证元素文本
- `assert value <ref> "<expected>"`: 验证输入框值
- `assert enabled <ref>`: 验证元素启用
- `assert disabled <ref>`: 验证元素禁用
- `assert url "<pattern>"`: 验证当前 URL
- `assert title "<expected>"`: 验证页面标题

#### 高级功能

- **多会话并行**: 同时运行多个浏览器会话进行交叉测试
- **状态持久化**: 保存/加载认证状态，跳过重复登录
- **网络模拟**: 模拟慢速网络、错误响应等异常场景
- **截图对比**: 自动截图并进行视觉回归测试

### 3. 测试数据生成

生成各种类型的测试数据，包括随机数据、边界值和特定格式数据。

#### 数据类型

```bash
# 基础数据生成
qa-test data --type string --length 10 --count 5
qa-test data --type number --min 1 --max 100 --count 10
qa-test data --type email --count 3
qa-test data --type phone --format "+86##########" --count 2

# 边界值测试数据
qa-test data --type boundary --field username --rules "min:3,max:20"
qa-test data --type boundary --field age --rules "min:0,max:120"

# 结构化数据 (JSON)
qa-test data --schema '{
  "name": {"type": "string", "faker": "name"},
  "email": {"type": "string", "faker": "email"},
  "age": {"type": "number", "min": 18, "max": 65}
}' --count 10
```

#### 支持的数据类型

- **基础类型**: string, number, boolean, date
- **格式化类型**: email, phone, url, ipv4, ipv6, mac, uuid
- **Faker 集成**: 支持 faker.js 的所有数据生成器
- **边界值**: 自动生成最小值、最大值、边界外值等
- **自定义模式**: 通过 JSON Schema 定义复杂数据结构

### 4. 缺陷跟踪集成

无缝集成飞书 Bitable 和 Jira，自动创建和更新缺陷记录。

#### 飞书 Bitable 集成

```bash
# 创建缺陷记录
qa-test bug --platform feishu \
           --bitable-url "https://example.feishu.cn/base/APP_TOKEN?table=TBL_ID" \
           --title "Login page crashes on mobile" \
           --description "Steps to reproduce: 1. Open login page 2. Enter credentials 3. Click submit" \
           --priority "High" \
           --severity "Critical" \
           --assignee "user123" \
           --screenshot screenshot.png

# 更新现有缺陷
qa-test bug --platform feishu \
           --record-id "rec123456" \
           --status "In Progress" \
           --comment "Investigating root cause"
```

#### Jira 集成

```bash
# 创建 Jira issue
qa-test bug --platform jira \
           --project "QA" \
           --issue-type "Bug" \
           --title "API returns 500 error" \
           --description "The /users endpoint returns 500 when..." \
           --priority "High" \
           --assignee "developer1" \
           --labels "api,test-failure"

# 添加评论到现有 issue
qa-test bug --platform jira \
           --issue-key "QA-123" \
           --comment "This issue is reproducible in staging environment"
```

## 安装和配置

### 依赖安装

```bash
# 安装核心依赖
npm install -g agent-browser
agent-browser install

# 安装 QA 测试工具
curl -L https://github.com/openclaw/qa-test-suite/releases/latest/download/qa-test -o /usr/local/bin/qa-test
chmod +x /usr/local/bin/qa-test

# 或者从源码构建
git clone https://github.com/openclaw/qa-test-suite.git
cd qa-test-suite
npm install
npm link
```

### 配置文件

创建 `~/.qa-test/config.yaml` 进行全局配置：

```yaml
# API 测试配置
api:
  timeout: 30000
  retries: 3
  default_headers:
    User-Agent: QA-Test-Suite/1.0

# UI 测试配置
ui:
  headless: true
  slow_mo: 0
  viewport:
    width: 1920
    height: 1080
  default_wait_timeout: 10000

# 缺陷跟踪配置
bug_tracking:
  feishu:
    app_id: "cli_xxx"
    app_secret: "xxx"
  jira:
    base_url: "https://yourcompany.atlassian.net"
    username: "qa-bot"
    api_token: "xxx"

# 测试数据配置
data:
  locale: "zh_CN"
  seed: 12345
```

## 最佳实践

### 1. 测试组织结构

```
tests/
├── api/
│   ├── auth.test.yaml
│   ├── users.test.yaml
│   └── products.test.yaml
├── ui/
│   ├── login.test.yaml
│   ├── dashboard.test.yaml
│   └── checkout.test.yaml
├── data/
│   └── test-data.yaml
└── config/
    └── environments.yaml
```

### 2. 环境管理

```yaml
# environments.yaml
environments:
  local:
    base_url: "http://localhost:3000"
    api_url: "http://localhost:8080"
  staging:
    base_url: "https://staging.example.com"
    api_url: "https://api-staging.example.com"
  production:
    base_url: "https://example.com"
    api_url: "https://api.example.com"
```

### 3. 并行执行

```bash
# 并行执行所有 API 测试
qa-test run --parallel --type api --env staging

# 并行执行 UI 测试（多浏览器）
qa-test run --parallel --type ui --browsers chrome,firefox --env staging

# 混合测试执行
qa-test run --suite full-regression --env production
```

### 4. CI/CD 集成

```yaml
# GitHub Actions 示例
name: QA Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install QA Test Suite
        run: |
          npm install -g agent-browser
          agent-browser install
          curl -L https://github.com/openclaw/qa-test-suite/releases/latest/download/qa-test -o /usr/local/bin/qa-test
          chmod +x /usr/local/bin/qa-test
      - name: Run Tests
        run: qa-test run --report junit --output test-results.xml
      - name: Upload Test Results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: test-results.xml
```

## 高级功能

### 1. 数据驱动测试

```yaml
# users.test.yaml
name: User Registration Test
type: api
endpoint: /users
method: POST
data_driven:
  - name: "Valid user registration"
    input:
      name: "John Doe"
      email: "john@example.com"
      password: "SecurePass123!"
    expected_status: 201
  - name: "Invalid email format"
    input:
      name: "Jane Smith"
      email: "invalid-email"
      password: "SecurePass123!"
    expected_status: 400
  - name: "Password too short"
    input:
      name: "Bob Wilson"
      email: "bob@example.com"
      password: "123"
    expected_status: 400
```

### 2. 测试钩子

```yaml
# hooks.test.yaml
name: Authenticated API Test
before_all:
  - type: ui
    steps:
      - open: https://app.example.com/login
      - fill: { ref: @username, value: "testuser" }
      - fill: { ref: @password, value: "password123" }
      - click: @submit
      - wait: { load: networkidle }
      - state_save: auth.json
after_all:
  - type: cleanup
    steps:
      - delete_test_users: true
      - clear_cookies: true
```

### 3. 性能监控

```bash
# API 性能测试
qa-test perf --url "https://api.example.com/users" \
            --concurrent 10 \
            --duration 60s \
            --threshold p95<500ms \
            --report html

# UI 性能测试
qa-test ui-perf --session perf-test \
                --scenario login-flow \
                --metrics fcp,lcp,fid \
                --threshold lcp<2000ms
```

## 故障排除

### 常见问题

1. **UI 元素找不到**: 确保使用 `--headed` 模式调试，检查元素是否在 iframe 中
2. **API 认证失败**: 检查 token 是否过期，使用 `--verbose` 查看详细请求
3. **测试数据不一致**: 设置固定的随机种子 (`--seed`) 确保可重现性
4. **缺陷跟踪连接失败**: 验证 API 凭据和权限配置

### 调试命令

```bash
# 详细日志输出
qa-test --verbose --debug

# 单步执行 UI 测试
qa-test ui --headed --slow-mo 1000

# 导出测试配置
qa-test config export

# 验证配置文件
qa-test config validate
```

## 贡献指南

欢迎贡献新功能、修复 bug 或改进文档。请遵循以下步骤：

1. Fork 仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

确保包含相应的测试用例和文档更新。

## 许可证

MIT License - 详情请参阅 LICENSE 文件。