# Path A — Go live on HTTP (SSL later)

Use this when subdomains work over HTTP and HTTPS is deferred.

**Production URLs (HTTP):**
- http://mrv.essprmsc.com
- http://esms.essprmsc.com
- http://wqms.essprmsc.com

SSL (Phase 4) can be done later via Cloudflare or after Nayatel fixes CAA.

---

## Nayatel — keep as-is

- [ ] **Do NOT** change nameservers to Cloudflare (stay on `ns*.dsl.net.pk`)
- [ ] Keep the 3 A records in **Manage DNS**:

| Host | IP |
|------|-----|
| `mrv` | `101.50.87.168` |
| `esms` | `115.186.164.190` |
| `wqms` | `101.50.84.115` |

- [ ] Ignore / delete any half-finished Cloudflare setup (no nameserver change = Nayatel still active)

---

## MRV only — update PUBLIC_ORIGIN (important)

MRV uses CORS tied to `PUBLIC_ORIGIN`. On the MRV VM, edit `.env.docker`:

```env
PUBLIC_ORIGIN=http://mrv.essprmsc.com
PASSWORD_RESET_FRONTEND_URL=http://mrv.essprmsc.com
```

Redeploy:

```bash
cd ~/PRMSC-ENS-MRV
docker compose --env-file .env.docker up -d --build
```

- [ ] MRV `PUBLIC_ORIGIN` updated to `http://` subdomain (not raw IP)
- [ ] MRV nginx container running (`docker compose ps`)

ESMS and WQMS use same-origin `/api` — **no env changes** needed for HTTP.

---

## Restart MRV nginx (if you stopped it for certbot)

```bash
docker compose --env-file .env.docker up -d nginx
```

- [ ] MRV nginx running

---

## Browser smoke test

Open in incognito:

| URL | Login works |
|-----|-------------|
| http://mrv.essprmsc.com | ⬜ |
| http://esms.essprmsc.com | ⬜ |
| http://wqms.essprmsc.com | ⬜ |

Browsers may show **"Not secure"** — expected until SSL is added later.

- [ ] All three apps load and login works

---

## Notify team

Share these URLs (HTTP):

```
MRV System:  http://mrv.essprmsc.com
ESMS:        http://esms.essprmsc.com
WQMS:        http://wqms.essprmsc.com
```

Note: HTTPS will be added in a later phase.

- [ ] Team notified
- [ ] Bookmarks/docs updated (replace raw IPs)

---

## SSL later (when ready)

Pick one:

1. **Cloudflare DNS** — change nameservers, add CAA, run certbot (see Phase 4 runbooks)
2. **Cloudflare proxy (orange cloud)** — HTTPS at edge without certbot on VM
3. **Nayatel support** — ask them to add CAA or fix SERVFAIL

See [../runbooks/MASTER-CHECKLIST.md](../runbooks/MASTER-CHECKLIST.md) Phase 4 when ready.

---

## Path A complete when

- [x] DNS on Nayatel (Phase 1)
- [x] HTTP works (Phase 3)
- [ ] MRV `PUBLIC_ORIGIN` = `http://mrv.essprmsc.com`
- [ ] Team using subdomain URLs
- [ ] SSL deferred — tracked for later
