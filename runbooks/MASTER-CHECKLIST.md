# Master checklist — essprmsc.com subdomain rollout

Mark each box `[x]` when done. Work **top to bottom** — later phases depend on earlier ones.

**Target URLs (Path A — HTTP now, SSL later):**
- http://mrv.essprmsc.com
- http://esms.essprmsc.com
- http://wqms.essprmsc.com

→ **HTTP go-live:** [06-go-live-http-only.md](06-go-live-http-only.md)  
→ **HTTPS (deferred):** Phase 4 below — do when ready

---

## Phase 0 — Platform repo (one-time)

Detailed steps: [01-platform-setup.md](01-platform-setup.md)

- [ ] **0.1** Create GitHub repo `essprmsc-platform` (private recommended)
- [ ] **0.2** Push this folder to GitHub (`git init`, add remote, push)
- [ ] **0.3** Edit `domains/registry.yaml` — replace `YOUR_ORG/...` with real repo names
- [ ] **0.4** Add `deploy/DOMAIN.md` to each app repo (or merge from this workspace)
- [ ] **0.5** Share platform repo link with the team

---

## Phase 1 — DNS records

Detailed steps: [02-dns-records.md](02-dns-records.md) · Reference: [../dns/essprmsc.com.md](../dns/essprmsc.com.md)

- [x] **1.1** Log in to domain panel → **Manage DNS** for `essprmsc.com`
- [x] **1.2** Add A record: `mrv` → `101.50.87.168`
- [x] **1.3** Add A record: `esms` → `115.186.164.190`
- [x] **1.4** Add A record: `wqms` → `101.50.84.115`
- [x] **1.5** Save changes and wait 5–30 min for propagation
- [x] **1.6** Verify: `dig +short mrv.essprmsc.com` returns `101.50.87.168`
- [x] **1.7** Verify: `dig +short esms.essprmsc.com` returns `115.186.164.190`
- [x] **1.8** Verify: `dig +short wqms.essprmsc.com` returns `101.50.84.115`

---

## Phase 2 — VM firewall (all 3 VMs)

Run on **each** VM (MRV, ESMS, WQMS):

- [x] **2.1** MRV VM — `sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw status`
- [x] **2.2** ESMS VM — same UFW commands
- [x] **2.3** WQMS VM — same UFW commands
- [x] **2.4** Confirm each app stack is running (`docker compose ps` on each VM)

---

## Phase 3 — HTTP verification (before HTTPS)

Detailed steps: [03-http-verification.md](03-http-verification.md)

- [x] **3.1** `curl -I http://mrv.essprmsc.com` — not timeout (200/301/302 OK)
- [x] **3.2** `curl -I http://esms.essprmsc.com` — not timeout
- [x] **3.3** `curl -I http://wqms.essprmsc.com` — not timeout

If any fail, see [troubleshooting.md](troubleshooting.md) before continuing.

---

## Phase 4 — HTTPS per application *(deferred — Path A)*

> **Skipped for now.** Domains ship on HTTP. Resume Phase 4 when ready for SSL (Cloudflare or Nayatel CAA fix).

Do these **in order** (MRV → ESMS → WQMS). Each has its own runbook.

### 4a — MRV System (`101.50.87.168`)

Detailed steps: [04-https-mrv.md](04-https-mrv.md)

- [ ] **4a.1** SSH into MRV VM
- [ ] **4a.2** Stop nginx container, run certbot standalone for `mrv.essprmsc.com`
- [ ] **4a.3** Copy certs to `deploy/certs/`
- [ ] **4a.4** Uncomment HTTPS block in `deploy/nginx/default.conf`
- [ ] **4a.5** Expose port `443` in `docker-compose.yml`
- [ ] **4a.6** Set `PUBLIC_ORIGIN=https://mrv.essprmsc.com` in `.env.docker`
- [ ] **4a.7** Set `PASSWORD_RESET_FRONTEND_URL=https://mrv.essprmsc.com`
- [ ] **4a.8** Redeploy: `docker compose --env-file .env.docker up -d --build`
- [ ] **4a.9** Verify: `curl -I https://mrv.essprmsc.com`
- [ ] **4a.10** Log in via browser — no CORS errors

### 4b — ESMS (`115.186.164.190`)

Detailed steps: [04-https-esms.md](04-https-esms.md)

- [ ] **4b.1** SSH into ESMS VM
- [ ] **4b.2** Set `WEB_HTTP_PORT=127.0.0.1:8080` in `.env`, restart stack
- [ ] **4b.3** Install host Nginx + Certbot
- [ ] **4b.4** Install `deploy/host-nginx/esms.essprmsc.com.conf`
- [ ] **4b.5** Run `certbot --nginx -d esms.essprmsc.com`
- [ ] **4b.6** Verify: `curl -I https://esms.essprmsc.com/healthz`
- [ ] **4b.7** Log in via browser

### 4c — WQMS (`101.50.84.115`)

Detailed steps: [04-https-wqms.md](04-https-wqms.md)

- [ ] **4c.1** SSH into WQMS VM
- [ ] **4c.2** Set `WEB_HTTP_PORT=127.0.0.1:8080` in `.env`, restart stack
- [ ] **4c.3** Install host Nginx + Certbot
- [ ] **4c.4** Install `deploy/host-nginx/wqms.essprmsc.com.conf`
- [ ] **4c.5** Run `certbot --nginx -d wqms.essprmsc.com`
- [ ] **4c.6** Verify: `curl -I https://wqms.essprmsc.com/healthz`
- [ ] **4c.7** Log in via browser

---

## Phase 5 — Certificate renewal (one-time setup)

- [ ] **5.1** ESMS/WQMS — confirm certbot timer: `systemctl status certbot.timer`
- [ ] **5.2** MRV — add certbot deploy hook to copy certs + reload nginx (see [04-https-mrv.md](04-https-mrv.md))

---

## Phase 6 — Go live (HTTP — Path A)

Detailed steps: [06-go-live-http-only.md](06-go-live-http-only.md)

- [x] **6.1** MRV: set `PUBLIC_ORIGIN=http://mrv.essprmsc.com` and redeploy
- [x] **6.2** MRV: ensure nginx running (`docker compose up -d nginx`)
- [x] **6.3** All three HTTP URLs open in browser (incognito)
- [ ] **6.4** Notify team with HTTP URLs
- [ ] **6.5** Update internal docs / bookmarks (replace raw IPs)
- [ ] **6.6** Mark Path A complete — schedule SSL (Phase 4) for later

*(For HTTPS go-live, use [05-go-live.md](05-go-live.md) after Phase 4.)*

---

## Progress summary

| Phase | Status | Notes |
|-------|--------|-------|
| 0 Platform repo | ⬜ | |
| 1 DNS | ✅ | Verified 24 Aug 2026 |
| 2 Firewall | ✅ | Ports open — HTTP 200 from all 3 |
| 3 HTTP verify | ✅ | All subdomains reachable |
| 4a MRV HTTPS | ⏸ deferred | Path A — HTTP first |
| 4b ESMS HTTPS | ⏸ deferred | |
| 4c WQMS HTTPS | ⏸ deferred | |
| 5 Renewal | ⏸ deferred | |
| 6 Go live (HTTP) | ✅ | Verified 24 Aug 2026 — all 200 OK |

_Update the Progress summary table manually (⬜ → ✅) as you finish each phase._

---

## Adding app #4 later

See [add-new-application.md](add-new-application.md) — no changes needed to existing apps.
