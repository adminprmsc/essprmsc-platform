# Phase 0 — Platform repo setup

Part of [MASTER-CHECKLIST.md](MASTER-CHECKLIST.md) · Phase 0

## Goal

Create the central `essprmsc-platform` GitHub repo so DNS, subdomains, and runbooks live in one place — not duplicated across app repos.

---

## Step 0.1 — Create GitHub repo

1. Go to GitHub → **New repository**
2. Name: `essprmsc-platform`
3. Visibility: **Private** (recommended)
4. Do **not** initialize with README (you already have files locally)

- [ ] Repo created on GitHub

---

## Step 0.2 — Push local platform folder

From your Mac, in the `essprmsc-platform` directory:

```bash
cd "/Users/aubairakif/Codebases/ESS PRMSC-HO/essprmsc-platform"

git init
git add .
git commit -m "Initial essprmsc-platform: registry, DNS, runbooks"
git branch -M main
git remote add origin git@github.com:YOUR_ORG/essprmsc-platform.git
git push -u origin main
```

Replace `YOUR_ORG` with your GitHub organization or username.

- [ ] Pushed to GitHub
- [ ] Team can access the repo

---

## Step 0.3 — Update registry

Edit `domains/registry.yaml`:

```yaml
github_repo: YOUR_ORG/prmsc-mrv   # → real repo, e.g. acme/prmsc-mrv
github_repo: YOUR_ORG/wfm-esms
github_repo: YOUR_ORG/wqms
```

Also confirm `vm_app_path` matches where each app is cloned on its VM.

- [ ] Registry updated with real repo names
- [ ] Committed and pushed

---

## Step 0.4 — Link app repos

In **each** application GitHub repo, add or update `deploy/DOMAIN.md` (files exist in this workspace):

| App | File to add/commit |
|-----|-------------------|
| MRV | `deploy/DOMAIN.md` |
| ESMS | `deploy/DOMAIN.md` |
| WQMS | `deploy/DOMAIN.md` |

Each file should link to:

```
https://github.com/YOUR_ORG/essprmsc-platform/blob/main/runbooks/MASTER-CHECKLIST.md
```

- [ ] MRV repo has `deploy/DOMAIN.md`
- [ ] ESMS repo has `deploy/DOMAIN.md`
- [ ] WQMS repo has `deploy/DOMAIN.md`

---

## Step 0.5 — Share with team

Send the team:

- Platform repo URL
- Production URLs (once DNS is done)
- Link to **MASTER-CHECKLIST.md**

- [ ] Team notified about platform repo

---

## Next

→ [02-dns-records.md](02-dns-records.md) — Phase 1
