---
name: security-scan-agent
description: 自动扫描授权测试环境 API 的 OWASP Top 10 常见安全风险，包括 SQL 注入、XSS、认证失效、水平/垂直越权、敏感数据泄露和安全 Header。Use when the user asks for 安全扫描、安全测试、OWASP Top 10、SQL 注入、XSS、越权测试、上线前安全检查、security scan, API security audit.
---

# Security Scan Agent

用于测试人在功能测试完成后或上线前，对**授权测试环境**做 OWASP Top 10 风险检查，输出漏洞清单、风险等级和修复建议。

## 安全边界

- 只测试用户明确授权的系统、域名、接口和测试环境。
- 不做破坏性测试、DoS/压力攻击、批量爆破、绕过检测、真实凭据窃取或未授权目标扫描。
- 注入 payload 只能用于测试环境；避免造成数据污染，优先使用只读接口或可回滚测试数据。
- 越权测试需至少两组测试账号，并明确账号角色和数据归属。
- 发现高危问题后停止扩大攻击面，记录证据并建议修复。

## 触发场景

- 功能测试完成后做安全检查。
- 上线前扫描 OWASP Top 10。
- 检查 SQL 注入、XSS、越权、认证失效、敏感数据泄露。
- 对 API 清单进行安全冒烟。

## 输入信息

尽量向用户收集：

- 测试环境 base URL。
- API 清单、OpenAPI/Swagger、Postman Collection 或 HAR。
- 测试账号：普通用户 A、普通用户 B、管理员/高权限账号。
- 认证方式：Cookie、Bearer token、API key 等。
- 允许测试范围和禁止测试范围。
- 是否允许写接口使用测试数据。

## 扫描维度

### 1. 注入风险

- SQL 注入：`' OR 1=1 --`、`' UNION SELECT NULL --`、布尔盲注轻量 payload。
- 命令/模板注入：仅做无害探测，不执行系统命令。
- 判断依据：异常 500、SQL 错误、响应差异、权限绕过、非预期数据返回。

### 2. XSS

- 反射 XSS：`<script>alert(1)</script>`、`"><img src=x onerror=alert(1)>`。
- 存储 XSS：仅在可清理测试数据中执行。
- 判断依据：响应原样返回 payload、前端渲染未转义、事件属性可执行。

### 3. 认证与会话

- 未登录访问受保护接口。
- token 过期/伪造/缺失时是否返回 401/403。
- 敏感操作是否需要重新鉴权或权限校验。

### 4. 水平越权

- A 用户 token 访问 B 用户资源，例如：`GET /users/{userB}/profile`。
- A 用户修改 B 用户数据。
- 判断依据：应返回 403/404，不能返回或修改 B 的数据。

### 5. 垂直越权

- 普通用户 token 调用管理员接口。
- 普通用户提交高权限字段，例如 `role=admin`、`status=approved`。
- 判断依据：应返回 403，不能执行成功。

### 6. 敏感数据泄露

- 响应中是否包含密码、token、身份证、手机号、邮箱、内部 ID、调试堆栈。
- 密码哈希、密钥、签名参数是否泄露。
- 日志/错误信息是否暴露内部实现。

### 7. 安全 Header 与传输

- HTTPS、HSTS、CSP、X-Frame-Options、X-Content-Type-Options、Referrer-Policy。
- Cookie 是否设置 `HttpOnly`、`Secure`、`SameSite`。

## 执行流程

1. 确认授权范围和测试环境标识。
2. 解析 API 清单，按模块和风险分组。
3. 生成最小化无害 payload。
4. 先跑只读接口，再跑明确允许的写接口。
5. 对疑似漏洞复测一次，避免误报。
6. 输出报告；高危问题可按大王的 BUG 规范提单。
7. 修复后做同类接口全量回归。

## 报告模板

```markdown
# 安全扫描报告

## 范围
- 环境：
- 接口数：
- 账号角色：

## 汇总
- Critical：0
- High：0
- Medium：0
- Low：0

## 漏洞清单

### 1. [风险等级] 漏洞标题
- 接口：
- 类型：SQL 注入 / XSS / 水平越权 / 垂直越权 / 数据泄露 / Header 缺失
- 复现步骤：
- 实际结果：
- 预期结果：
- 影响范围：
- 证据：状态码、关键响应片段、截图或日志
- 修复建议：

## 回归验证
- [ ] 漏洞 1 已修复
- [ ] 同类接口已覆盖
```

## BUG 标题规范

如果需要提 BUG，标题默认使用：

```text
【Claude Code】现象 + 触发条件
```

示例：

- `【Claude Code】普通用户可访问他人资料`
- `【Claude Code】搜索参数存在SQL注入风险`
- `【Claude Code】评论内容未转义触发XSS`
