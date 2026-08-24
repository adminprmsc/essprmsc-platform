# Phase 4b — HTTPS for ESMS

Part of [MASTER-CHECKLIST.md](MASTER-CHECKLIST.md) · Phase 4b

| | |
|---|---|
| **URL** | https://esms.essprmsc.com |
| **VM IP** | `115.186.164.190` |
| **Repo** | `wfm-esms` (separate GitHub repo) |
| **TLS strategy** | Host Nginx + Certbot → Docker on `127.0.0.1:8080` |

---

## Step 4b.1 — SSH into ESMS VM

```bash
ssh -i ~/.ssh/your_key adminprms98@115.186.164.190
cd ~/wfm   # adjust if your path differs
```

- [ ] Connected to ESMS VM

---

## Step 4b.2 — Bind Docker to localhost

Edit `.env` (create from `.env.prod.example` if needed):

```env
WEB_HTTP_PORT=127.0.0.1:8080
```

Restart stack:

```bash
docker compose -f docker-compose.prod.yml --env-file .env up -d
curl -I http://127.0.0.1:8080/healthz
```

- [ ] Docker listening on `127.0.0.1:8080`
- [ ] Local health check OK

---

## Step 4b.3 — Install host Nginx + Certbot

```bash
sudo apt-get update
sudo apt-get install -y nginx certbot python3-certbot-nginx
```

- [ ] Nginx and Certbot installed

---

## Step 4b.4 — Install site config

From the app repo (after `git pull`):

```bash
sudo cp deploy/host-nginx/esms.essprmsc.com.conf \
  /etc/nginx/sites-available/esms.essprmsc.com

sudo ln -sf /etc/nginx/sites-available/esms.essprmsc.com \
  /etc/nginx/sites-enabled/

sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

- [ ] Nginx config installed and valid

---

## Step 4b.5 — Obtain SSL certificate

```bash
sudo certbot --nginx -d esms.essprmsc.com \
  --agree-tos \
  -m admin@essprmsc.com
```

Follow prompts. Certbot will add the `listen 443 ssl` block automatically.

- [ ] Certificate installed

---

## Step 4b.6 — Verify HTTPS

```bash
curl -I https://esms.essprmsc.com/healthz
curl -I https://esms.essprmsc.com
```

- [ ] `/healthz` returns 200
- [ ] Homepage returns 200

---

## Step 4b.7 — Browser test

1. Open https://esms.essprmsc.com in incognito
2. Log in and navigate a few pages

- [ ] App works over HTTPS

> ESMS uses same-origin `/api` — no `CORS_ORIGINS` change needed.

---

## Next

→ [04-https-wqms.md](04-https-wqms.md) — Phase 4c
