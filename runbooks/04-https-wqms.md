# Phase 4c — HTTPS for WQMS

Part of [MASTER-CHECKLIST.md](MASTER-CHECKLIST.md) · Phase 4c

| | |
|---|---|
| **URL** | https://wqms.essprmsc.com |
| **VM IP** | `101.50.84.115` |
| **Repo** | `wqms` (separate GitHub repo) |
| **TLS strategy** | Host Nginx + Certbot → Docker on `127.0.0.1:8080` |

---

## Step 4c.1 — SSH into WQMS VM

```bash
ssh -i ~/.ssh/your_key adminprms98@101.50.84.115
cd ~/wqms   # adjust if your path differs
```

- [ ] Connected to WQMS VM

---

## Step 4c.2 — Bind Docker to localhost

Edit `.env`:

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

## Step 4c.3 — Install host Nginx + Certbot

```bash
sudo apt-get update
sudo apt-get install -y nginx certbot python3-certbot-nginx
```

- [ ] Nginx and Certbot installed

---

## Step 4c.4 — Install site config

```bash
sudo cp deploy/host-nginx/wqms.essprmsc.com.conf \
  /etc/nginx/sites-available/wqms.essprmsc.com

sudo ln -sf /etc/nginx/sites-available/wqms.essprmsc.com \
  /etc/nginx/sites-enabled/

sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

- [ ] Nginx config installed and valid

---

## Step 4c.5 — Obtain SSL certificate

```bash
sudo certbot --nginx -d wqms.essprmsc.com \
  --agree-tos \
  -m admin@essprmsc.com
```

- [ ] Certificate installed

---

## Step 4c.6 — Verify HTTPS

```bash
curl -I https://wqms.essprmsc.com/healthz
curl -I https://wqms.essprmsc.com
```

- [ ] `/healthz` returns 200
- [ ] Homepage returns 200

---

## Step 4c.7 — Browser test

1. Open https://wqms.essprmsc.com in incognito
2. Log in and navigate a few pages

- [ ] App works over HTTPS

---

## Next

→ [05-go-live.md](05-go-live.md) — Phase 6
