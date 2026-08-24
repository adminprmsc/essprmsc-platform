# Phase 1 — DNS records

Part of [MASTER-CHECKLIST.md](MASTER-CHECKLIST.md) · Phase 1

Reference: [../dns/essprmsc.com.md](../dns/essprmsc.com.md)

## Goal

Point each subdomain at the correct VM IP. No gateway server needed.

---

## Step 1.1 — Open DNS panel

1. Log in to your domain provider (Nayatel)
2. **My Services** → **Domains List** → `essprmsc.com`
3. Click **Manage DNS**

- [ ] DNS management page open

---

## Step 1.2–1.4 — Add A records

Add **three** A records:

| Host / Name | Type | Value |
|-------------|------|-------|
| `mrv` | A | `101.50.87.168` |
| `esms` | A | `115.186.164.190` |
| `wqms` | A | `101.50.84.115` |

TTL: `300` or default.

- [ ] `mrv` record added
- [ ] `esms` record added
- [ ] `wqms` record added
- [ ] Saved / applied

---

## Step 1.5 — Wait for propagation

Usually **5–30 minutes**. Can take up to 24 hours in rare cases.

- [ ] Waited at least 5 minutes

---

## Step 1.6–1.8 — Verify from your Mac

```bash
dig +short mrv.essprmsc.com
dig +short esms.essprmsc.com
dig +short wqms.essprmsc.com
```

Expected output:

```
101.50.87.168
115.186.164.190
101.50.84.115
```

- [ ] MRV DNS correct
- [ ] ESMS DNS correct
- [ ] WQMS DNS correct

If wrong or empty, wait longer or double-check record names (no `essprmsc.com` suffix in Host field — usually just `mrv`).

---

## Next

→ [03-http-verification.md](03-http-verification.md) — Phase 3 (after firewall Phase 2 on VMs)
