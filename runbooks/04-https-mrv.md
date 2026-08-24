# Phase 4a — HTTPS for MRV System

Part of [MASTER-CHECKLIST.md](MASTER-CHECKLIST.md) · Phase 4a

| | |
|---|---|
| **URL** | https://mrv.essprmsc.com |
| **VM IP** | `101.50.87.168` |
| **Repo** | `prmsc-mrv` (separate GitHub repo) |
| **TLS strategy** | Certs inside Docker nginx (`deploy/certs/`) |

---

## Step 4a.1 — SSH into MRV VM

```bash
ssh -i ~/.ssh/your_key adminprms98@101.50.87.168
cd ~/PRMSC-ENS-MRV   # adjust if your path differs
```

- [ ] Connected to MRV VM

---

## Step 4a.2 — Obtain Let's Encrypt certificate

Certbot needs port 80 free briefly:

```bash
docker compose --env-file .env.docker stop nginx

sudo apt-get update
sudo apt-get install -y certbot

sudo certbot certonly --standalone \
  -d mrv.essprmsc.com \
  --agree-tos \
  -m admin@essprmsc.com
```

- [ ] Certificate issued successfully

---

## Step 4a.3 — Copy certs into project

```bash
sudo cp /etc/letsencrypt/live/mrv.essprmsc.com/fullchain.pem deploy/certs/
sudo cp /etc/letsencrypt/live/mrv.essprmsc.com/privkey.pem deploy/certs/
sudo chown $(whoami):$(whoami) deploy/certs/*.pem
```

- [ ] Certs in `deploy/certs/`

---

## Step 4a.4 — Enable HTTPS in nginx config

Edit `deploy/nginx/default.conf`:

1. **Uncomment** the entire `server { listen 443 ssl ... }` block (lines 42–71)
2. Confirm `server_name mrv.essprmsc.com;`

- [ ] HTTPS block uncommented

---

## Step 4a.5 — Expose port 443 in Docker

Edit `docker-compose.yml` — under the `nginx` service `ports:` section, add:

```yaml
    ports:
      - '${NGINX_HTTP_PORT:-80}:80'
      - '${NGINX_HTTPS_PORT:-443}:443'
```

- [ ] Port 443 mapped

---

## Step 4a.6–4a.7 — Update environment

Edit `.env.docker`:

```env
PUBLIC_ORIGIN=https://mrv.essprmsc.com
PASSWORD_RESET_FRONTEND_URL=https://mrv.essprmsc.com
```

No trailing slash. Must be `https` after cert is live.

- [ ] `PUBLIC_ORIGIN` updated
- [ ] `PASSWORD_RESET_FRONTEND_URL` updated

---

## Step 4a.8 — Redeploy

```bash
docker compose --env-file .env.docker up -d --build
docker compose --env-file .env.docker ps
```

- [ ] All containers running

---

## Step 4a.9 — Verify HTTPS

```bash
curl -I https://mrv.essprmsc.com
curl -I https://mrv.essprmsc.com/api/health
```

- [ ] HTTPS returns 200/301/302
- [ ] API health responds

---

## Step 4a.10 — Browser test

1. Open https://mrv.essprmsc.com in incognito
2. Log in
3. Open DevTools → Console — **no CORS errors**

- [ ] Login works
- [ ] No CORS errors

> Users may need to log in again after `PUBLIC_ORIGIN` changed.

---

## Certificate renewal hook (Phase 5)

Create `/etc/letsencrypt/renewal-hooks/deploy/mrv-copy-certs.sh`:

```bash
#!/bin/bash
set -euo pipefail
APP=~/PRMSC-ENS-MRV
cp /etc/letsencrypt/live/mrv.essprmsc.com/fullchain.pem "$APP/deploy/certs/"
cp /etc/letsencrypt/live/mrv.essprmsc.com/privkey.pem "$APP/deploy/certs/"
docker compose -f "$APP/docker-compose.yml" --env-file "$APP/.env.docker" exec nginx nginx -s reload
```

```bash
sudo chmod +x /etc/letsencrypt/renewal-hooks/deploy/mrv-copy-certs.sh
```

- [ ] Renewal hook installed (can do in Phase 5)

---

## Next

→ [04-https-esms.md](04-https-esms.md) — Phase 4b
