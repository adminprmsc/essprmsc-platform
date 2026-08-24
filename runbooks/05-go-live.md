# Phase 6 — Go live

Part of [MASTER-CHECKLIST.md](MASTER-CHECKLIST.md) · Phase 6

## Goal

Confirm everything works, notify the team, retire raw IP bookmarks.

---

## Step 6.1 — Final smoke test (incognito browser)

| URL | Login | API / data loads |
|-----|-------|------------------|
| https://mrv-system.essprmsc.com | ⬜ | ⬜ |
| https://esms.essprmsc.com | ⬜ | ⬜ |
| https://wqms.essprmsc.com | ⬜ | ⬜ |

- [ ] All three pass smoke test

---

## Step 6.2 — Notify team

Send message template:

```
PRMSC applications are now available on essprmsc.com:

• MRV System:  https://mrv-system.essprmsc.com
• ESMS:        https://esms.essprmsc.com
• WQMS:        https://wqms.essprmsc.com

Please update bookmarks. Raw IP URLs may still work but use the links above.

Platform ops / DNS docs: <link to essprmsc-platform repo>
```

- [ ] Team notified

---

## Step 6.3 — Update internal docs

- [ ] Wiki / Notion / SharePoint updated
- [ ] Old IP links replaced

---

## Step 6.4 — Mobile apps (if applicable)

Check mobile operator apps in MRV / ESMS / WQMS repos for hardcoded API URLs.

- [ ] Mobile API base URLs reviewed
- [ ] Updated if they pointed at raw IPs (or N/A)

---

## Step 6.5 — Root domain (optional, later)

`essprmsc.com` (`@`) can point to a simple portal listing all three apps.

- [ ] Deferred (optional)
- [ ] Or completed

---

## Step 6.6 — Mark rollout complete

Return to [MASTER-CHECKLIST.md](MASTER-CHECKLIST.md) and mark **Phase 6** complete.

Update the Progress summary table to all ✅.

- [ ] **Rollout complete**

---

## Ongoing

- Adding app #4: [add-new-application.md](add-new-application.md)
- Issues: [troubleshooting.md](troubleshooting.md)
