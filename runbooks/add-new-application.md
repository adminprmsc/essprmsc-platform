# Add a new application (app #4, #5, …)

Use this when PRMSC launches another system on `essprmsc.com`. **Existing apps do not need changes.**

---

## Checklist

- [ ] **1.** Choose slug: e.g. `inventory` → `inventory.essprmsc.com`
- [ ] **2.** Provision VM (Ubuntu 22.04), open SSH + `:80` + `:443`
- [ ] **3.** Create GitHub repo from ESMS/WQMS template (docker-compose, deploy/, Makefile)
- [ ] **4.** Deploy app on VM (`make deploy` or project equivalent)
- [ ] **5.** Add entry to `domains/registry.yaml` in **essprmsc-platform**
- [ ] **6.** Add DNS A record: `inventory` → `<new-vm-ip>` (see [../dns/essprmsc.com.md](../dns/essprmsc.com.md))
- [ ] **7.** Verify HTTP: `curl -I http://inventory.essprmsc.com`
- [ ] **8.** Copy [../templates/host-nginx.conf.tpl](../templates/host-nginx.conf.tpl) → `deploy/host-nginx/inventory.essprmsc.com.conf`
- [ ] **9.** Set `WEB_HTTP_PORT=127.0.0.1:8080`, install host Nginx + Certbot
- [ ] **10.** Verify HTTPS: `curl -I https://inventory.essprmsc.com/healthz`
- [ ] **11.** Add `deploy/DOMAIN.md` to new app repo
- [ ] **12.** Announce URL to team

---

## Registry entry template

Add to `domains/registry.yaml`:

```yaml
  - slug: inventory
    name: Inventory System
    fqdn: inventory.essprmsc.com
    vm_ip: NEW.VM.IP.HERE
    github_repo: YOUR_ORG/inventory
    vm_app_path: ~/inventory
    tls_strategy: host-nginx-certbot
    env_public_origin: null
    health_check: curl -I https://inventory.essprmsc.com/healthz
```

---

## When to add a gateway VM

If you have **many apps** and managing per-VM Certbot becomes tedious, see platform README — optional central gateway + wildcard `*.essprmsc.com` cert.

Not needed for 3–5 apps.
