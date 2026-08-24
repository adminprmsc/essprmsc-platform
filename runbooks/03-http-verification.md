# Phase 3 — HTTP verification

Part of [MASTER-CHECKLIST.md](MASTER-CHECKLIST.md) · Phase 3

## Goal

Confirm each subdomain reaches the correct app **over HTTP** before enabling HTTPS.

---

## Prerequisites

- [ ] Phase 1 DNS verified (`dig +short` returns correct IPs)
- [ ] Phase 2 firewall open on all VMs (`80/tcp`, `443/tcp`)
- [ ] Docker stacks running on each VM

---

## Test from your Mac

```bash
curl -I http://mrv-system.essprmsc.com
curl -I http://esms.essprmsc.com
curl -I http://wqms.essprmsc.com
```

**Good:** `HTTP/1.1 200`, `301`, or `302`  
**Bad:** `Connection timed out`, `Could not resolve host`

---

## Optional — test on each VM locally

**MRV VM:**
```bash
curl -I http://localhost
docker compose --env-file .env.docker ps
```

**ESMS / WQMS VM:**
```bash
curl -I http://localhost
docker compose -f docker-compose.prod.yml ps
```

- [ ] MRV HTTP OK
- [ ] ESMS HTTP OK
- [ ] WQMS HTTP OK

---

## If something fails

See [troubleshooting.md](troubleshooting.md). Do **not** proceed to HTTPS until HTTP works.

---

## Next

→ [04-https-mrv.md](04-https-mrv.md) — Phase 4a
