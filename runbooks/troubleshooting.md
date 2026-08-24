# Troubleshooting — essprmsc.com subdomains

## DNS

| Symptom | Fix |
|---------|-----|
| `dig` returns nothing | Wait for propagation; check Host field is `mrv-system` not `mrv-system.essprmsc.com` |
| Wrong IP returned | Edit A record in domain panel |

## Connection

| Symptom | Fix |
|---------|-----|
| Connection timeout | `sudo ufw status` — allow 80/443; check VM is running |
| `502 Bad Gateway` (ESMS/WQMS) | Docker not on `127.0.0.1:8080` — check `WEB_HTTP_PORT` and `docker compose ps` |
| Works on IP, not subdomain | DNS not propagated yet — wait and re-test `dig` |

## HTTPS / Certbot

| Symptom | Fix |
|---------|-----|
| Certbot connection refused | Port 80 must be reachable from internet; stop conflicting services during standalone mode |
| Certbot nginx plugin fails | Run `sudo nginx -t`; remove default site; ensure `server_name` matches domain |
| MRV HTTPS works but CORS error | `PUBLIC_ORIGIN` must be exactly `https://mrv-system.essprmsc.com` (no trailing slash) |

## Application

| Symptom | Fix |
|---------|-----|
| MRV 401 after domain change | Users re-login; check `JWT_SECRET_KEY` unchanged |
| API 502 on MRV | `docker compose logs backend` — wait for migrations |
| ESMS/WQMS blank page | Check browser console; verify `curl https://.../healthz` |

## Commands quick reference

```bash
# DNS
dig +short mrv-system.essprmsc.com

# On VM — stack status
docker compose ps
docker compose logs -f web    # ESMS/WQMS
docker compose logs -f nginx  # MRV

# Nginx
sudo nginx -t
sudo systemctl status nginx

# Certbot
sudo certbot certificates
systemctl status certbot.timer
```
