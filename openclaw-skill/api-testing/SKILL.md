---
name: api-testing
description: API接口测试技能，用于验证RESTful API、GraphQL接口的功能性、性能和安全性。当用户需要进行接口测试、验证API响应、检查接口文档时使用。
metadata: { "openclaw": { "emoji": "🔌" } }
---

# API接口测试技能

专业的API测试工具，用于验证接口的功能性、性能和安全性。

## 功能

- RESTful API功能测试
- GraphQL接口测试
- 接口性能测试（响应时间、并发）
- 接口安全性测试（认证、授权）
- 接口文档验证
- 参数边界值测试
- 响应数据校验
- 接口自动化测试

## 测试项目

### 1. HTTP方法测试
- GET：查询资源
- POST：创建资源
- PUT：更新资源
- DELETE：删除资源
- PATCH：部分更新

### 2. 请求参数测试
- 必填参数校验
- 参数类型校验
- 参数边界值
- 特殊字符处理
- 参数组合测试

### 3. 响应测试
- 状态码验证
- 响应时间测试
- 响应数据结构
- 错误处理机制
- 分页测试

### 4. 安全性测试
- 认证机制测试
- Token有效性
- 权限控制
- SQL注入防护
- XSS防护

### 5. 性能测试
- 单接口响应时间
- 并发请求测试
- 压力测试
- 稳定性测试

## 输出格式

```markdown
### API测试结果

| 接口 | 方法 | 状态 | 响应时间 | 结果 |
|------|------|------|----------|------|
| /api/users | GET | 200 | 45ms | ✅ 通过 |
| /api/users | POST | 201 | 120ms | ✅ 通过 |
| /api/users/{id} | GET | 200 | 32ms | ✅ 通过 |

### 问题汇总
- 问题1：xxx
- 建议：xxx
```

## 常用命令

```bash
# curl测试GET请求
curl -X GET "https://api.example.com/users" \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json"

# curl测试POST请求
curl -X POST "https://api.example.com/users" \
  -H "Content-Type: application/json" \
  -d '{"name":"test","email":"test@example.com"}'

# 性能测试（ab）
ab -n 1000 -c 10 https://api.example.com/users
```
