---
name: database-testing
description: 数据库测试技能，用于验证数据库功能、性能、数据一致性和迁移测试。当用户需要进行SQL测试、数据验证、性能优化时使用。
metadata: { "openclaw": { "emoji": "🗄️" } }
---

# 数据库测试技能

专业的数据库测试工具，用于验证数据库功能、性能和数据完整性。

## 功能

- SQL功能测试
- 数据库性能测试
- 数据一致性验证
- 数据迁移测试
- 备份恢复测试
- 索引优化测试
- 事务测试
- 并发测试

## 测试项目

### 1. SQL功能测试
- SELECT查询
- INSERT插入
- UPDATE更新
- DELETE删除
- JOIN连接
- 聚合函数
- 子查询
- 存储过程

### 2. 数据完整性测试
- 主键约束
- 外键约束
- 唯一约束
- 非空约束
- 默认值
- 检查约束
- 触发器

### 3. 事务测试
- ACID特性
- 事务隔离级别
- 并发控制
- 死锁检测
- 回滚机制
- 提交确认

### 4. 性能测试
- 查询优化
- 索引效率
- 连接性能
- 批量操作
- 大数据量
- 并发查询

### 5. 数据迁移测试
- 表结构迁移
- 数据导入导出
- 版本升级
- 数据同步
- 数据清洗
- 数据校验

### 6. 备份恢复测试
- 全量备份
- 增量备份
- 差异备份
- 数据恢复
- 时间点恢复
- 灾难恢复

## 输出格式

```markdown
### 数据库测试结果

| 测试项 | 状态 | 耗时 | 结果 |
|--------|------|------|------|
| SELECT查询 | ✅ | 12ms | 正常 |
| 事务并发 | ✅ | 45ms | 正常 |
| 索引扫描 | ✅ | 8ms | 正常 |
| 数据迁移 | ✅ | 120s | 正常 |

### 性能分析
- 慢查询：xxx
- 优化建议：xxx
```

## 常用工具

```bash
# MySQL
mysql -u root -p -e "SELECT * FROM users"
mysqldump -u root -p database > backup.sql

# PostgreSQL
psql -U postgres -d database -c "SELECT * FROM users"
pg_dump -U postgres database > backup.sql

# Redis
redis-cli ping
redis-cli info

# MongoDB
mongo --eval "db.users.find()"
mongodump --db database
```
