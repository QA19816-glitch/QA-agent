# 神策事件模型建议

## 推荐事件层次
- 页面曝光：PageView / PageExpose
- 元素点击：Click / Tap
- 表单行为：Input / Submit
- 结果事件：Success / Fail
- 业务里程碑：Create / Approve / Pay / Cancel / Complete

## 事件命名建议
- 英文蛇形或小驼峰统一，不混用
- 事件名表达动作，不表达页面文案
- 例子：
  - page_home_view
  - click_login_button
  - submit_order
  - order_pay_success
  - order_pay_fail

## 属性命名建议
- 用稳定业务字段，不用临时前端变量名
- 为属性定义类型：string / number / boolean / enum / timestamp
- 常见属性：
  - page_name
  - page_id
  - button_name
  - module_name
  - business_id
  - order_id
  - result
  - fail_reason
  - channel
  - source
  - login_status

## identity 要点
- 匿名态与登录态如何打通
- 登录、退出、切账号是否切 distinct_id
- 同设备多账号是否隔离
