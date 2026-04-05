---
name: mobile-testing
description: 移动端测试技能，用于验证iOS和Android应用的功能、性能、兼容性和用户体验。当用户需要进行APP测试、移动端功能验证时使用。
metadata: { "openclaw": { "emoji": "📱" } }
---

# 移动端测试技能

专业的移动应用测试工具，用于验证iOS和Android应用的功能和性能。

## 功能

- APP功能测试
- 兼容性测试
- 性能测试
- 耗电量测试
- 内存泄漏检测
- 网络测试
- 安装/卸载测试
- 升级测试

## 测试项目

### 1. 功能测试
- 启动/关闭
- 页面跳转
- 数据输入
- 手势操作
- 通知推送
- 分享功能

### 2. 兼容性测试
- 不同系统版本
- 不同屏幕尺寸
- 不同分辨率
- 横竖屏切换
- 深色/浅色模式

### 3. 性能测试
- 启动时间
- 页面加载
- 内存占用
- CPU使用率
- 耗电量
- 流量消耗

### 4. 稳定性测试
- 长时间运行
- 后台切换
- 低电量模式
- 断网恢复
- 异常处理

### 5. 网络测试
- WiFi/4G/5G切换
- 弱网测试
- 断网测试
- 网络延迟
- 数据同步

### 6. 安全性测试
- 数据传输加密
- 本地数据存储
- 权限管理
- 签名验证
- 防逆向

## 测试类型

```
- 单元测试
- 集成测试
- UI自动化测试
- 兼容性测试
- 性能测试
- 安全测试
- 回归测试
- 探索性测试
```

## 输出格式

```markdown
### 移动端测试结果

| 测试项 | iOS | Android | 状态 |
|--------|-----|---------|------|
| 启动时间 | 1.2s | 1.5s | ✅ 通过 |
| 内存占用 | 120MB | 150MB | ✅ 通过 |
| 页面加载 | 0.8s | 1.0s | ✅ 通过 |
| 兼容性 | 13-16 | 8-13 | ✅ 通过 |

### 问题汇总
- 问题1：xxx
- 建议：xxx
```

## 常用工具

```bash
# Appium测试
appium &
pytest test_mobile.py

# iOS Simulator
xcrun simctl boot "iPhone 14"

# Android Emulator
emulator -avd Pixel_6_API_33

# ADB命令
adb install app.apk
adb logcat
adb shell am start -n com.example.app/.MainActivity
```
