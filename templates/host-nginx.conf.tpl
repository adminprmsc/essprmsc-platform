# Host-level TLS terminator — copy for new applications.
# Replace {{SLUG}}, {{FQDN}}, {{UPSTREAM_NAME}} before installing.
#
# Prerequisites on VM:
#   WEB_HTTP_PORT=127.0.0.1:8080  (in app .env)
#   docker compose up -d
#
# Install:
#   sudo cp {{SLUG}}.essprmsc.com.conf /etc/nginx/sites-available/
#   sudo ln -sf /etc/nginx/sites-available/{{SLUG}}.essprmsc.com.conf /etc/nginx/sites-enabled/
#   sudo nginx -t && sudo systemctl reload nginx
#   sudo certbot --nginx -d {{FQDN}} --agree-tos -m admin@essprmsc.com

upstream {{UPSTREAM_NAME}} {
    server 127.0.0.1:8080;
    keepalive 32;
}

server {
    listen 80;
    listen [::]:80;
    server_name {{FQDN}};

    location / {
        proxy_pass http://{{UPSTREAM_NAME}};
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Connection        "";
    }
}

# Certbot adds listen 443 ssl after --nginx
