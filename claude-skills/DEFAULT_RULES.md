# Claude Code QA 默认规则

## BUG 标题

提 BUG（禅道 / GitHub Issue / 飞书 BUG 节，任何渠道）时，标题默认使用：

```text
【Claude Code】现象 + 触发条件
```

规则：

- `【】` 内默认固定写 `Claude Code`。
- 标题 ≤ 25 字。
- 不用“且”连接两件事；同根因多表现合并一条，非同根因拆单。
- 示例：`【Claude Code】提BUG全流程打通测试`

## BUG 字段

每个 BUG 默认包含：严重度、优先级、建议负责人、描述、复现步骤、预期结果、实际结果、环境、附件。

禅道 `steps` 字段固定三段：`[步骤]` / `[结果]` / `[期望]`，不写 `[环境]` 段。

## 禅道附件截图：默认内嵌显示，不留纯附件

- 证据截图不能只留在附件区让人点开，默认直接嵌入 `steps` 的 `[结果]` 段落里显示。
- 上传附件禁止直接对 `input[name="files[]"]` 用 `setInputFiles(..., { force: true })`——这版禅道的 ZUI3 文件选择组件下会静默失败（文件不会真正进入组件状态，保存后 `files` 数组仍为空）。必须用真实 `filechooser` 事件：

```js
const fileChooserPromise = page.waitForEvent('filechooser');
await frame.locator('label:has-text("可点击添加或拖拽上传")').click({ force: true });
const chooser = await fileChooserPromise;
await chooser.setFiles('/path/to/screenshot.png');
await page.waitForTimeout(3000); // 等缩略图渲染出来再保存
```

- 上传成功后 GET 一次拿到 `files` 里的 `fileID`，把内嵌图片标签写进 `steps` 的 `[结果]` 段并 PUT 回写：

```html
<img src="http://13.158.151.116:8088/index.php?m=file&f=read&fileID=<id>" />
```

  注意不要加 `t=` 参数（如 `&t=png`），会导致请求挂起超时；不带该参数返回 `200 image/*` 且能被 `<img>` 正常渲染。

- 提单后必须打开 BUG 详情页用浏览器实际验证图片渲染（`naturalWidth`/`naturalHeight` 非零），不能只看 API 返回的 `files` 非空就算完成。
