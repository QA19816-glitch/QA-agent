# Feishu Config

The clean Codex-native config lives at:

`$CODEX_HOME/feishu.json`

Shape:

```json
{
  "domain": "feishu",
  "appId": "cli_xxx",
  "appSecret": "secret",
  "defaultPermission": "full_access",
  "defaultGrant": {
    "member_type": "email",
    "member_id": "user@example.com",
    "perm": "full_access"
  }
}
```

`defaultGrant` is optional but needed for automatic user permission. Without it, create the doc but report that permission was not granted.
