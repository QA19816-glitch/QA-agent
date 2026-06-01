---
name: security-testing
description: 安全测试技能，用于验证系统安全性、漏洞扫描、渗透测试、安全审计等。当用户需要进行安全测试、漏洞检测、安全检查时使用。
metadata: { "openclaw": { "emoji": "🔒" } }
---

# 安全测试技能

专业的安全测试工具，用于验证系统安全性和发现潜在漏洞。

## 功能

- 漏洞扫描
- 渗透测试
- 安全审计
- 代码安全分析
- 依赖安全检查
- 认证授权测试
- 数据加密验证
- 安全合规检查

## 测试项目

### 1. 注入攻击测试
- SQL注入
- NoSQL注入
- 命令注入
- LDAP注入
- XML注入

### 2. 认证测试
- 暴力破解
- 会话管理
- Cookie安全
- Token安全
- 密码策略

### 3. 授权测试
- 水平越权
- 垂直越权
- 未授权访问
- 权限绕过
- IDOR漏洞

### 4. XSS测试
- 反射型XSS
- 存储型XSS
- DOM型XSS
- CSP绕过

### 5. CSRF测试
- CSRF漏洞
- CSRF Token
- SameSite Cookie
- Referer验证

### 6. 安全配置测试
- HTTP Headers
- SSL/TLS配置
- 敏感信息泄露
- 目录遍历
- 文件上传漏洞

### 7. 敏感数据测试
- 明文传输
- 弱加密算法
- 密钥管理
- 数据脱敏

## 输出格式

```markdown
### 安全测试结果

| 漏洞类型 | 严重程度 | 数量 | 状态 |
|----------|----------|------|------|
| SQL注入 | 高危 | 0 | ✅ 通过 |
| XSS | 高危 | 0 | ✅ 通过 |
| CSRF | 中危 | 0 | ✅ 通过 |
| 弱密码 | 中危 | 0 | ✅ 通过 |
| 信息泄露 | 低危 | 0 | ✅ 通过 |

### 安全建议
1. xxx
2. xxx
```

## 常用工具

```bash
# OWASP ZAP
zap-cli start
zap-cli open-url http://target.com
zap-cli active-scan http://target.com

# Nmap扫描
nmap -sV -sC -p- target.com

# SQLMap
sqlmap -u "http://target.com/page?id=1" --batch

# Nikto
nikto -h http://target.com
```
