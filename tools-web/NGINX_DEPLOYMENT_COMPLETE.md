# NGINX Deployment Guide - Complete Setup

## STEP 1: Copy This Nginx Configuration

```nginx
# ════════════════════════════════════════════════════════
#  BKX Labs — COMPLETE Nginx Config v2 (Updated for Next.js)
#  File: /etc/nginx/sites-available/bkxlabs.com
#  STATUS: Production Ready
# ════════════════════════════════════════════════════════

# ── HTTP → HTTPS (clean redirect) ──────────
server {
    listen 80;
    server_name bkxlabs.com www.bkxlabs.com;
    return 301 https://bkxlabs.com$request_uri;
}

# ── WWW → non-WWW ────────────────────────────────────────
server {
    listen 443 ssl http2;
    server_name www.bkxlabs.com;
    server_tokens off;

    ssl_certificate /etc/letsencrypt/live/bkxlabs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bkxlabs.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    return 301 https://bkxlabs.com$request_uri;
}

# ── Main HTTPS Server ─────────────────────────────────────
server {
    listen 443 ssl http2;
    server_name bkxlabs.com;
    root /var/www/BKX-Labs/frontend/dist;
    index index.html;
    server_tokens off;

    # ── SSL ───────────────────────────────────────────────
    ssl_certificate /etc/letsencrypt/live/bkxlabs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bkxlabs.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    ssl_session_cache shared:SSL:10m;

    # ── Gzip Compression ──────────────────────────────────
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 256;
    gzip_types
        application/javascript
        application/json
        application/manifest+json
        font/woff2
        image/svg+xml
        text/css
        text/html
        text/javascript
        text/plain;

    # ── Security Headers ──────────────────────────────────
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # ════════════════════════════════════════════════════════
    # SECTION A: BACKEND STATIC ASSETS (PRIORITY)
    # ════════════════════════════════════════════════════════

    location ^~ /storage/ {
        root /var/www/BKX-Labs/backend/public;
        try_files $uri =404;
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location ^~ /build/ {
        root /var/www/BKX-Labs/backend/public;
        try_files $uri =404;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location ^~ /css/ {
        root /var/www/BKX-Labs/backend/public;
        try_files $uri =404;
        expires 30d;
        add_header Cache-Control "public";
        access_log off;
    }

    location ^~ /js/ {
        root /var/www/BKX-Labs/backend/public;
        try_files $uri =404;
        expires 30d;
        add_header Cache-Control "public";
        access_log off;
    }

    # ════════════════════════════════════════════════════════
    # SECTION B: FRONTEND STATIC ASSETS
    # ════════════════════════════════════════════════════════

    # Vite Hashed Assets (1-year immutable cache)
    location ^~ /assets/ {
        root /var/www/BKX-Labs/frontend/dist;
        try_files $uri =404;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary "Accept-Encoding";
        access_log off;
    }

    # ════════════════════════════════════════════════════════
    # SECTION C: NEXT.JS TOOLS APP (https://bkxlabs.com/tools)
    # ════════════════════════════════════════════════════════

    # Next.js App Proxy
    location /tools {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        
        # Essential headers for Next.js
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $server_name;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Cache bypass for dynamic content
        proxy_cache_bypass $http_upgrade;
        proxy_no_cache $http_pragma $http_authorization;
        
        # Buffering
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
        proxy_busy_buffers_size 8k;
    }

    # Next.js Static Assets (immutable, hashed filenames)
    location ^~ /.next/static/ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary "Accept-Encoding";
        access_log off;
    }

    # Next.js Public Folder
    location ^~ /public/ {
        proxy_pass http://localhost:3000;
        expires 7d;
        add_header Cache-Control "public";
        access_log off;
    }

    # ════════════════════════════════════════════════════════
    # SECTION D: GENERIC STATIC FILES
    # ════════════════════════════════════════════════════════

    location ~* \.(ico|png|jpg|jpeg|webp|svg|gif|woff2?|ttf)$ {
        try_files $uri =404;
        expires 7d;
        add_header Cache-Control "public";
        access_log off;
    }

    # ════════════════════════════════════════════════════════
    # SECTION E: BACKEND DYNAMIC ROUTES (PHP/Laravel)
    # ════════════════════════════════════════════════════════

    location ~ ^/(admin|api|store|login|register|logout|verify-otp|checkout|downloads|livewire|profile|webhook) {
        root /var/www/BKX-Labs/backend/public;
        try_files $uri $uri/ @backend;
    }

    # ── FastCGI Hand-off ───────────────────────────────────
    location @backend {
        root /var/www/BKX-Labs/backend/public;
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root/index.php;
        fastcgi_param REQUEST_URI $request_uri;

        fastcgi_buffer_size 128k;
        fastcgi_buffers 4 256k;
        fastcgi_busy_buffers_size 256k;
        fastcgi_read_timeout 300;
    }

    # ════════════════════════════════════════════════════════
    # SECTION F: REACT SPA (Frontend)
    # ════════════════════════════════════════════════════════

    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # ════════════════════════════════════════════════════════
    # Error Handling
    # ════════════════════════════════════════════════════════

    error_page 404 /index.html;
    error_page 502 503 504 /50x.html;

    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

---

## STEP 2: Run These Commands on Your VPS

### Copy the configuration to your VPS:
```bash
sudo nano /etc/nginx/sites-available/bkxlabs.com
```
**Then paste the nginx config above into this file and save (Ctrl+X, Y, Enter)**

---

### Enable the site (if not already done):
```bash
sudo ln -s /etc/nginx/sites-available/bkxlabs.com /etc/nginx/sites-enabled/
```

---

### Disable the default site (if it exists):
```bash
sudo rm /etc/nginx/sites-enabled/default
```

---

### Test nginx syntax:
```bash
sudo nginx -t
```
**Expected output:** `nginx: configuration file test is successful`

---

### Reload nginx:
```bash
sudo systemctl reload nginx
```

---

### Check nginx status:
```bash
sudo systemctl status nginx
```

---

### Start your Next.js app (from the tools-web directory):
```bash
cd /var/www/BKX-Labs/tools-web
npm start
```

**OR** run it in the background with pm2:
```bash
npm install -g pm2
pm2 start npm --name "tools-web" -- start
pm2 save
pm2 startup
```

---

### Verify everything is running:
```bash
# Check if Node is running
ps aux | grep "node"

# Check if nginx is running
sudo systemctl status nginx

# Test the endpoint
curl https://bkxlabs.com/tools
```

---

## STEP 3: Troubleshooting

### If you get a 502 error:
1. Check if Node is running: `ps aux | grep "node"`
2. Check nginx error log: `sudo tail -f /var/log/nginx/error.log`
3. Check if port 3000 is listening: `sudo netstat -tlnp | grep 3000`

### If nginx won't reload:
```bash
sudo nginx -s reload
```

### View nginx logs:
```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

---

## STEP 4: Access Your Apps

- **Frontend:** https://bkxlabs.com
- **Tools:** https://bkxlabs.com/tools
- **API/Admin:** https://bkxlabs.com/api, https://bkxlabs.com/admin

---

## IMPORTANT NOTES

✅ The nginx config handles:
- HTTP → HTTPS redirect
- WWW → non-WWW redirect
- Next.js proxy on port 3000
- Backend PHP/Laravel routes
- Static asset caching
- Security headers
- Gzip compression

✅ Next.js app should be running on localhost:3000
✅ PHP-FPM should be running on /run/php/php8.3-fpm.sock
✅ All SSL certificates are already configured at /etc/letsencrypt/live/bkxlabs.com/
