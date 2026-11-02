---
name: data-quality-test
description: >
  数据质量测试：验证前端展示数据与后端/数据库是否一致，检查统计数据准确性、字段完整性、
  空值/异常值、数据流端到端一致性（埋点数据→数仓→报表）。
  触发：用户说"数据测试"、"数据验证"、"数据一致性"、"报表数据"、"数据准确性"、"字段校验"。
---

# Data Quality Test

验证产品各层数据的准确性和一致性，覆盖前端展示、接口返回、数据库存储、报表统计四个层次。

## 测试范围

```
用户操作 → 前端展示 → 接口响应 → 数据库写入 → 数仓/报表
   ↑___________数据一致性验证覆盖范围___________↑
```

---

## Phase 0 — 确认测试目标

向用户确认：
1. **数据场景**（订单数据 / 用户数据 / 统计报表 / 埋点数据流）
2. **数据源访问**（DB 连接串 / API 地址 / 报表 URL）
3. **校验维度**（完整性 / 准确性 / 一致性 / 时效性）
4. **测试数据范围**（特定用户/时间段/业务场景）

---

## Phase 1 — 前端与接口数据一致性

```python
# 通过 API 获取数据，与前端截图/页面对比
import requests, json

def check_api_data(base_url, endpoint, headers={}):
    """获取接口数据"""
    resp = requests.get(f"{base_url}{endpoint}", headers=headers)
    data = resp.json()
    return data

# 示例：验证用户详情页数据
api_data = check_api_data("https://api.example.com", "/user/123")

checks = {
    "接口状态码": resp.status_code == 200,
    "用户名非空": bool(api_data.get("name")),
    "手机号格式": bool(re.match(r"^1[3-9]\d{9}$", str(api_data.get("phone", "")))),
    "余额非负": api_data.get("balance", -1) >= 0,
}
for k, v in checks.items():
    print(f"{'✅' if v else '❌'} {k}")
```

---

## Phase 2 — 接口与数据库一致性

```python
# 直连 DB 对比接口返回值
import pymysql  # 或 psycopg2 / pymongo

# MySQL 示例
conn = pymysql.connect(host='HOST', user='USER', password='PASS', db='DB')
cursor = conn.cursor()

def db_vs_api(sql, api_field, api_value, desc):
    cursor.execute(sql)
    db_val = cursor.fetchone()
    db_value = db_val[0] if db_val else None
    match = str(db_value) == str(api_value)
    print(f"{'✅' if match else '❌'} {desc}: DB={db_value}, API={api_value}")
    return match

# 示例：验证订单金额
db_vs_api(
    "SELECT total_amount FROM orders WHERE id=12345",
    "total_amount", api_data["total_amount"],
    "订单金额一致性"
)
conn.close()
```

---

## Phase 3 — 数据完整性检查

```python
# 批量检查字段空值/异常值
def check_field_integrity(data_list, field_rules):
    """
    field_rules = {
        "field_name": {"required": True, "type": str, "max_len": 100}
    }
    """
    results = []
    for i, row in enumerate(data_list):
        for field, rules in field_rules.items():
            val = row.get(field)
            # 必填检查
            if rules.get("required") and not val:
                results.append(f"❌ 第{i+1}条 [{field}] 为空")
            # 类型检查
            if val and rules.get("type") and not isinstance(val, rules["type"]):
                results.append(f"⚠️ 第{i+1}条 [{field}] 类型异常: {type(val).__name__}")
            # 长度检查
            if val and rules.get("max_len") and len(str(val)) > rules["max_len"]:
                results.append(f"⚠️ 第{i+1}条 [{field}] 超长: {len(str(val))}")
    return results

# 使用示例
rules = {
    "id": {"required": True, "type": int},
    "title": {"required": True, "type": str, "max_len": 200},
    "price": {"required": True},
    "status": {"required": True},
}
errors = check_field_integrity(api_list_data, rules)
for e in errors[:20]:
    print(e)
print(f"共 {len(errors)} 个字段问题")
```

---

## Phase 4 — 统计/报表数据验证

```python
# 验证统计数据：API汇总值 vs DB直接聚合
def validate_stats(api_stat, sql_stat, field, desc):
    """对比报表接口数据与数据库聚合结果"""
    match = abs(float(api_stat) - float(sql_stat)) < 0.01  # 允许浮点误差
    status = "✅" if match else "❌"
    print(f"{status} {desc}: 接口={api_stat}, DB直接查={sql_stat}")

# 示例：今日订单数
cursor.execute("SELECT COUNT(*) FROM orders WHERE DATE(created_at) = CURDATE()")
db_count = cursor.fetchone()[0]

api_stats = requests.get("https://api.example.com/stats/today").json()
validate_stats(api_stats["order_count"], db_count, "order_count", "今日订单数")
```

---

## Phase 5 — 数据时效性验证

```python
import datetime

def check_data_freshness(api_url, time_field, max_delay_minutes=5):
    """检查数据是否及时更新"""
    data = requests.get(api_url).json()
    last_update = data.get(time_field)
    if not last_update:
        print(f"❌ 无 {time_field} 字段")
        return
    
    # 解析时间
    update_time = datetime.datetime.fromisoformat(last_update.replace("Z", "+00:00"))
    delay = (datetime.datetime.now(datetime.timezone.utc) - update_time).seconds / 60
    
    if delay > max_delay_minutes:
        print(f"⚠️ 数据滞后 {delay:.1f} 分钟（阈值 {max_delay_minutes} 分钟）")
    else:
        print(f"✅ 数据时效正常，{delay:.1f} 分钟前更新")
```

---

## Phase 6 — 输出报告

```
## 数据质量测试报告
- 时间：YYYY-MM-DD
- 测试范围：xxx模块数据

### 一致性校验
✅ 订单金额：前端 = 接口 = DB（抽查 50 条，全部一致）
❌ 会员积分：接口返回 1200，DB 查询 1000（差 200）

### 完整性检查
- 检查字段：12 个
- 问题字段：2 个
  ❌ description: 3 条为空
  ⚠️ image_url: 1 条超长

### 统计准确性
✅ 今日订单数：接口 = DB（均为 482）
❌ GMV 统计：接口 98560，DB 96430（差 2130，约 2.2%）

### 结论
发现 X 个数据问题，建议优先修复一致性问题（可能影响用户展示）
```

---

## 常见问题

| 问题 | 可能原因 | 建议 |
|------|----------|------|
| 接口≠DB | 缓存未刷新 | 检查 Redis/CDN 缓存策略 |
| 统计偏差 | 时区不一致 | 确认服务端时区配置 |
| 字段为空 | 上游数据缺失 | 追查写入逻辑 |
| 数据滞后 | 定时任务延迟 | 检查 cron / ETL 任务状态 |
