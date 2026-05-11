# Fetch Recipes

## WeChat Article

Use a command like this, replacing the URL and output path:

```bash
curl -L -A "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.49 NetType/WIFI Language/zh_CN" -o /private/tmp/wechat-article.html "https://mp.weixin.qq.com/s/..."
node "$CODEX_HOME/skills/web-article-extractor/scripts/extract_wechat_html.mjs" /private/tmp/wechat-article.html
```

If this still returns a verification page, stop. Do not attempt CAPTCHA solving.

## Generic Article

Try normal web fetch first. If it is blocked, try:

```bash
curl -L -A "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1" -o /private/tmp/article.html "https://example.com/article"
```

Then extract with a parser, Readability-like library if available, or conservative tag stripping.
