# PRMSC Portal — landing SPA

Central landing page listing all PRMSC safeguard modules:

| Module | Link |
|--------|------|
| MRV System | http://mrv.essprmsc.com/hq |
| ESMS | http://esms.essprmsc.com/dashboard/senior-manager |
| WQMS | http://wqms.essprmsc.com/ |
| VLD | http://vld.essprmsc.com:8085/ |

## Development

```bash
cd landing
npm install
npm run dev
```

Open http://localhost:5173

## Production build

```bash
npm run build
npm run preview   # optional local check
```

Output: `landing/dist/`

## Docker

```bash
docker build -t essprmsc-portal .
docker run -p 8080:80 essprmsc-portal
```

Open http://localhost:8080

## Deploy to essprmsc.com (root domain)

1. Provision a small VM or reuse an existing one
2. Point DNS A record `@` → that VM IP (Nayatel Manage DNS)
3. Run the Docker container on port 80, or copy `dist/` behind Nginx

Example Nginx on host:

```nginx
server {
    listen 80;
    server_name essprmsc.com www.essprmsc.com;
    root /var/www/essprmsc-portal;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Logos

Stored in `public/logos/`:
- `punjab-gov.png` — Government of Punjab
- `prmsc.png` — PRMSC
- `world-bank.png` — World Bank funded project
