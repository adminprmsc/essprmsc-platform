# Master checklist — essprmsc.com subdomain rollout

Mark each box `[x]` when done. Work **top to bottom** — later phases depend on earlier ones.

**Target URLs when complete:**
- https://mrv-system.essprmsc.com
- https://esms.essprmsc.com
- https://wqms.essprmsc.com

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

- [ ] **1.1** Log in to domain panel → **Manage DNS** for `essprmsc.com`
- [ ] **1.2** Add A record: `mrv-system` → `101.50.87.168`
- [ ] **1.3** Add A record: `esms` → `115.186.164.190`
- [ ] **1.4** Add A record: `wqms` → `101.50.84.115`
- [ ] **1.5** Save changes and wait 5–30 min for propagation
- [ ] **1.6** Verify: `dig +short mrv-system.essprmsc.com` returns `101.50.87.168`
- [ ] **1.7** Verify: `dig +short esms.essprmsc.com` returns `115.186.164.190`
- [ ] **1.8** Verify: `dig +short wqms.essprmsc.com` returns `101.50.84.115`

---

## Phase 2 — VM firewall (all 3 VMs)

Run on **each** VM (MRV, ESMS, WQMS):

- [ ] **2.1** MRV VM — `sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw status`
- [ ] **2.2** ESMS VM — same UFW commands
- [ ] **2.3** WQMS VM — same UFW commands
- [ ] **2.4** Confirm each app stack is running (`docker compose ps` on each VM)

---

## Phase 3 — HTTP verification (before HTTPS)

Detailed steps: [03-http-verification.md](03-http-verification.md)

- [ ] **3.1** `curl -I http://mrv-system.essprmsc.com` — not timeout (200/301/302 OK)
- [ ] **3.2** `curl -I http://esms.essprmsc.com` — not timeout
- [ ] **3.3** `curl -I http://wqms.essprmsc.com` — not timeout

If any fail, see [troubleshooting.md](troubleshooting.md) before continuing.

---

## Phase 4 — HTTPS per application

Do these **in order** (MRV → ESMS → WQMS). Each has its own runbook.

### 4a — MRV System (`101.50.87.168`)

Detailed steps: [04-https-mrv.md](04-https-mrv.md)

- [ ] **4a.1** SSH into MRV VM
- [ ] **4a.2** Stop nginx container, run certbot standalone for `mrv-system.essprmsc.com`
- [ ] **4a.3** Copy certs to `deploy/certs/`
- [ ] **4a.4** Uncomment HTTPS block in `deploy/nginx/default.conf`
- [ ] **4a.5** Expose port `443` in `docker-compose.yml`
- [ ] **4a.6** Set `PUBLIC_ORIGIN=https://mrv-system.essprmsc.com` in `.env.docker`
- [ ] **4a.7** Set `PASSWORD_RESET_FRONTEND_URL=https://mrv-system.essprmsc.com`
- [ ] **4a.8** Redeploy: `docker compose --env-file .env.docker up -d --build`
- [ ] **4a.9** Verify: `curl -I https://mrv-system.essprmsc.com`
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

## Phase 6 — Go live

Detailed steps: [05-go-live.md](05-go-live.md)

- [ ] **6.1** All three HTTPS URLs open in browser (incognito test)
- [ ] **6.2** Notify team with new URLs (email / Slack)
- [ ] **6.3** Update internal docs / bookmarks (replace raw IPs)
- [ ] **6.4** Update mobile app API URLs if they use raw IPs
- [ ] **6.5** Optional: add `@` root domain landing page later
- [ ] **6.6** Mark this master checklist complete — rollout done

---

## Progress summary

| Phase | Status | Notes |
|-------|--------|-------|
| 0 Platform repo | ⬜ | |
| 1 DNS | ⬜ | |
| 2 Firewall | ⬜ | |
| 3 HTTP verify | ⬜ | |
| 4a MRV HTTPS | ⬜ | |
| 4b ESMS HTTPS | ⬜ | |
| 4c WQMS HTTPS | ⬜ | |
| 5 Renewal | ⬜ | |
| 6 Go live | ⬜ | |

_Update the Progress summary table manually (⬜ → ✅) as you finish each phase._

---

## Adding app #4 later

See [add-new-application.md](add-new-application.md) — no changes needed to existing apps.
