# DNS records — essprmsc.com

Configure in your domain panel: **My Services → Domains List → essprmsc.com → Manage DNS**

## Required A records (subdomain model)

| Type | Host / Name | Value (IP) | TTL |
|------|-------------|------------|-----|
| A | `mrv` | `101.50.87.168` | 300 |
| A | `esms` | `115.186.164.190` | 300 |
| A | `wqms` | `101.50.84.115` | 300 |

## Optional

| Type | Host / Name | Value | Purpose |
|------|-------------|-------|---------|
| A | `@` | TBD | Root domain landing page (add later) |
| A | `www` | TBD | Redirect to portal or main app |

## Verify (run from your Mac after saving)

```bash
dig +short mrv.essprmsc.com   # → 101.50.87.168
dig +short esms.essprmsc.com         # → 115.186.164.190
dig +short wqms.essprmsc.com         # → 101.50.84.115
```

## Notes

- Do **not** point `@` at all three IPs — DNS allows one IP per name.
- Subdomains can each point to a different VM (correct model for separate repos).
- Propagation usually takes 5–30 minutes.

## CAA record (required for Let's Encrypt on Nayatel DNS)

Nayatel nameservers (`ns*.dsl.net.pk`) may return **SERVFAIL** when Let's Encrypt checks for CAA records on a domain with none. Add this record **once** on the root domain:

| Type | Host / Name | Value / Content |
|------|-------------|-----------------|
| CAA | `@` | `0 issue "letsencrypt.org"` |

Some panels split CAA into fields:

| Field | Value |
|-------|-------|
| Flags | `0` |
| Tag | `issue` |
| Value | `letsencrypt.org` |

If your panel has no CAA type, contact Nayatel support or move DNS to Cloudflare (see platform runbook troubleshooting).

Verify after adding:

```bash
dig @8.8.8.8 essprmsc.com CAA +short
# Expected: 0 issue "letsencrypt.org"
```
