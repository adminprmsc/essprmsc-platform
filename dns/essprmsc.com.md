# DNS records — essprmsc.com

Configure in your domain panel: **My Services → Domains List → essprmsc.com → Manage DNS**

## Required A records (subdomain model)

| Type | Host / Name | Value (IP) | TTL |
|------|-------------|------------|-----|
| A | `mrv-system` | `101.50.87.168` | 300 |
| A | `esms` | `115.186.164.190` | 300 |
| A | `wqms` | `101.50.84.115` | 300 |

## Optional

| Type | Host / Name | Value | Purpose |
|------|-------------|-------|---------|
| A | `@` | TBD | Root domain landing page (add later) |
| A | `www` | TBD | Redirect to portal or main app |

## Verify (run from your Mac after saving)

```bash
dig +short mrv-system.essprmsc.com   # → 101.50.87.168
dig +short esms.essprmsc.com         # → 115.186.164.190
dig +short wqms.essprmsc.com         # → 101.50.84.115
```

## Notes

- Do **not** point `@` at all three IPs — DNS allows one IP per name.
- Subdomains can each point to a different VM (correct model for separate repos).
- Propagation usually takes 5–30 minutes.
