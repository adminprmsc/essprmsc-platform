# Path A — VM commands (HTTP subdomains, Nayatel DNS)

Run these on each production VM. **No nginx file changes are required on the VM for HTTP** — only MRV needs an env update.

| App | URL | VM IP | SSH user | App path |
|-----|-----|-------|----------|----------|
| MRV | http://mrv.essprmsc.com | `101.50.87.168` | `adminprms98` or `prmsc101` | `~/PRMSC-ENS-MRV` |
| ESMS | http://esms.essprmsc.com | `115.186.164.190` | `adminprms98` | `~/wfm` |
| WQMS | http://wqms.essprmsc.com | `101.50.84.115` | `adminprms98` | `~/wqms` |

---

## Before you start (on your Mac)

### 1. Commit domain docs to each GitHub repo (optional but recommended)

**MRV repo** — commit:
- `deploy/DOMAIN.md`
- `deploy/nginx/default.conf` (comment-only; HTTPS block still **commented**)
- `.env.docker.example`

**ESMS repo** — commit:
- `deploy/DOMAIN.md`
- `deploy/host-nginx/esms.essprmsc.com.conf` (for SSL later — not used on VM yet)
- `.env.prod.example`

**WQMS repo** — commit:
- `deploy/DOMAIN.md`
- `deploy/host-nginx/wqms.essprmsc.com.conf` (for SSL later)
- `.env.prod.example`

**Do NOT commit:** `.env`, `.env.docker`, `.DS_Store`, `backend/dist/*`

### 2. Push each repo

```bash
# MRV
cd "/path/to/prmsc-mrv"
git add deploy/DOMAIN.md deploy/nginx/default.conf .env.docker.example
git commit -m "docs: essprmsc subdomain and deferred HTTPS nginx notes"
git push origin main

# ESMS
cd "/path/to/wfm"
git add deploy/DOMAIN.md deploy/host-nginx/ .env.prod.example
git commit -m "docs: essprmsc subdomain and host-nginx template for SSL later"
git push origin main

# WQMS
cd "/path/to/wqms"
git add deploy/DOMAIN.md deploy/host-nginx/ .env.prod.example
git commit -m "docs: essprmsc subdomain and host-nginx template for SSL later"
git push origin main
```

---

## MRV VM (`101.50.87.168`)

### Connect

```bash
ssh adminprms98@101.50.87.168
# or: ssh prmsc101@101.50.87.168
cd ~/PRMSC-ENS-MRV
```

### Fix env for subdomain (required — stops CORS errors)

```bash
cd ~/PRMSC-ENS-MRV

# Show current origin
grep PUBLIC_ORIGIN .env.docker

# Set subdomain (HTTP — no trailing slash)
sed -i.bak 's|^PUBLIC_ORIGIN=.*|PUBLIC_ORIGIN=http://mrv.essprmsc.com|' .env.docker
grep -q '^PASSWORD_RESET_FRONTEND_URL=' .env.docker \
  && sed -i.bak 's|^PASSWORD_RESET_FRONTEND_URL=.*|PASSWORD_RESET_FRONTEND_URL=http://mrv.essprmsc.com|' .env.docker \
  || echo 'PASSWORD_RESET_FRONTEND_URL=http://mrv.essprmsc.com' >> .env.docker

grep -E '^(PUBLIC_ORIGIN|PASSWORD_RESET_FRONTEND_URL)=' .env.docker
```

### Ensure nginx is running (if stopped for certbot)

```bash
docker compose --env-file .env.docker up -d
docker compose --env-file .env.docker ps
```

All services should be **Up**, especially `prmsc-nginx`.

### Pull latest code (after you pushed from Mac)

```bash
git pull origin main
docker compose --env-file .env.docker up -d --build
```

Or:

```bash
make deploy
```

### Verify on VM

```bash
curl -s http://localhost/api/health
curl -sI http://localhost/ | head -3
curl -sI http://mrv.essprmsc.com/ | head -3
```

### Verify from Mac

```bash
curl -I http://mrv.essprmsc.com
```

Open in browser: **http://mrv.essprmsc.com** — log in (hard refresh if needed: Cmd+Shift+R).

### MRV nginx — do NOT change for Path A

- Keep HTTPS block **commented** in `deploy/nginx/default.conf`
- `server_name _` on port 80 is correct for HTTP subdomains
- No `443` port in `docker-compose.yml` yet

---

## ESMS VM (`115.186.164.190`)

### Connect

```bash
ssh -i ~/.ssh/wfm_instance adminprms98@115.186.164.190
cd ~/wfm
```

### Ensure Docker binds to port 80 (not localhost)

If you tried SSL setup earlier, fix `.env`:

```bash
grep WEB_HTTP_PORT .env
# Must be:
# WEB_HTTP_PORT=80

# If it shows 127.0.0.1:8080, revert:
sed -i.bak 's|^WEB_HTTP_PORT=.*|WEB_HTTP_PORT=80|' .env
grep WEB_HTTP_PORT .env
```

No `PUBLIC_ORIGIN` or CORS changes needed.

### Restart stack

```bash
docker compose -f docker-compose.prod.yml --env-file .env up -d
docker compose -f docker-compose.prod.yml ps
```

Or:

```bash
make up
```

### Pull latest (optional)

```bash
git pull origin main
make deploy
```

### Verify

```bash
curl -s http://localhost/healthz
curl -sI http://esms.essprmsc.com/healthz | head -3
```

Browser: **http://esms.essprmsc.com**

### ESMS nginx — do NOT install host-nginx yet

- `deploy/host-nginx/esms.essprmsc.com.conf` is **for SSL later only**
- Do not install certbot or host nginx on the VM for Path A

---

## WQMS VM (`101.50.84.115`)

### Connect

```bash
ssh adminprms98@101.50.84.115
cd ~/wqms
```

### Ensure port 80

```bash
grep WEB_HTTP_PORT .env
sed -i.bak 's|^WEB_HTTP_PORT=.*|WEB_HTTP_PORT=80|' .env
grep WEB_HTTP_PORT .env
```

### Restart stack

```bash
make up
# or
docker compose -f docker-compose.prod.yml --env-file .env up -d
docker compose -f docker-compose.prod.yml ps
```

### Pull latest (optional)

```bash
git pull origin main
make deploy
```

### Verify

```bash
curl -s http://localhost/healthz
curl -sI http://wqms.essprmsc.com/healthz | head -3
```

Browser: **http://wqms.essprmsc.com**

---

## Quick health check (run from Mac)

```bash
curl -I http://mrv.essprmsc.com
curl -I http://esms.essprmsc.com/healthz
curl -I http://wqms.essprmsc.com/healthz
```

All should return `HTTP/1.1 200 OK`.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| MRV CORS error in browser | `PUBLIC_ORIGIN=http://mrv.essprmsc.com` in `.env.docker`, rebuild backend: `docker compose --env-file .env.docker up -d --build backend` |
| MRV connection refused | `docker compose --env-file .env.docker up -d nginx` |
| ESMS/WQMS connection refused | Set `WEB_HTTP_PORT=80`, not `127.0.0.1:8080` |
| Still opens old IP | Use subdomain URL; hard refresh browser |
| 502 on ESMS/WQMS | `docker compose -f docker-compose.prod.yml ps` — wait for `api` healthy |

---

## Path A checklist

- [ ] MRV: `PUBLIC_ORIGIN=http://mrv.essprmsc.com`
- [ ] MRV: nginx container running
- [ ] ESMS: `WEB_HTTP_PORT=80`
- [ ] WQMS: `WEB_HTTP_PORT=80`
- [ ] All three URLs open in browser
- [ ] Committed `deploy/DOMAIN.md` (+ nginx docs) to each repo

SSL (Phase 4) — defer until Cloudflare or Nayatel CAA is ready.
