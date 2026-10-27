# essprmsc-platform

Central infrastructure repo for **essprmsc.com** — DNS, subdomains, TLS, and rollout runbooks.

Application code lives in **separate GitHub repos**. This repo is the single source of truth for how those apps are exposed on the public domain.

## Production URLs

| App                  | URL                      | VM IP             | Application repo            |
| -------------------- | ------------------------ | ----------------- | --------------------------- |
| **Portal (landing)** | http://essprmsc.com      | TBD               | this repo → `landing/`      |
| MRV System           | http://mrv.essprmsc.com  | `101.50.87.168`   | `prmsc-mrv` (separate repo) |
| ESMS                 | http://esms.essprmsc.com | `115.186.164.190` | `wfm-esms` (separate repo)  |
| WQMS                 | http://wqms.essprmsc.com | `101.50.84.115`   | `wqms` (separate repo)      |
| VLD                  | http://vld.essprmsc.com:8085 | `72.61.141.192` | separate repo (TBD)         |

> Update repo names in `domains/registry.yaml` to match your GitHub org.

## Start here

**Follow the master checklist and mark each item done as you complete it:**

→ **[runbooks/MASTER-CHECKLIST.md](runbooks/MASTER-CHECKLIST.md)**

## Repo layout

```
essprmsc-platform/
├── landing/                    # PRMSC portal SPA (module links + branding)
├── domains/registry.yaml       # subdomain → IP → repo mapping
├── dns/essprmsc.com.md         # DNS records for the registrar panel
├── templates/                  # copy-paste configs for new apps
└── runbooks/                   # step-by-step guides with checklists
```

## Architecture

Each subdomain points directly to its own VM. No shared gateway required (scales to ~10 apps). See `runbooks/add-new-application.md` when adding app #4.

## Related docs in app repos

Each application repo should contain `deploy/DOMAIN.md` linking back here. Do not duplicate full domain SOPs inside app repos.
