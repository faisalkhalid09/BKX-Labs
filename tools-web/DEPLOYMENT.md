# 🚀 BKX Labs Tools Deployment Guide

## Server Setup & Nginx Integration

### ⚠️ SAFE CHANGES — No Existing Routes Affected
- The `/tools` location is **NEW** and doesn't conflict with existing routes
- All backend PHP routes remain untouched  
- All frontend React routes remain untouched
- Gzip, SSL, and security headers are unchanged

---

## Step 1: Clone & Prepare
```bash
cd /var/www/BKX-Labs
git pull origin main  # Get latest tools-web code
cd tools-web
```

## Step 2: Install & Build
```bash
npm install --legacy-peer-deps
npm run build
```

## Step 3: Start the Tools App (on port 3000)
```bash
# Option A: Direct start (foreground)
npm start

# Option B: PM2 (recommended for persistent process)
npm install -g pm2
pm2 start "npm start" --name "tools-web" --cwd /var/www/BKX-Labs/tools-web
pm2 save
pm2 startup
pm2 restart tools-web
```

## Step 4: Update Nginx Config

### **Option A: Quick Add (Recommended)**
Add these lines to `/etc/nginx/sites-available/bkxlabs.com` in the main HTTPS server block, **after** the `/assets/` location block and **before** the `/(admin|api|store|...)` block:

```nginx
# ── G. Tools Web App (Next.js on localhost:3000) ──────────
location /tools {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
}

# ── H. Tools .next Static Assets ──
location ^~ /.next/ {
    proxy_pass http://localhost:3000;
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Vary "Accept-Encoding";
    access_log off;
}
```

### **Option B: Replace Entire Config**
If you prefer a fresh config, copy the complete config from `NGINX_COMPLETE_CONFIG.conf`:
```bash
sudo cp /var/www/BKX-Labs/tools-web/NGINX_COMPLETE_CONFIG.conf /etc/nginx/sites-available/bkxlabs.com
```

## Step 5: Validate & Reload Nginx
```bash
# Test syntax
sudo nginx -t

# If OK, reload
sudo systemctl reload nginx

# Check status
sudo systemctl status nginx
```

## Step 6: Verify Access
Visit these URLs and verify they work:

✅ **Tools Dashboard:** `https://bkxlabs.com/tools`  
✅ **Tool #1:** `https://bkxlabs.com/tools/eu-ai-act-risk-level-classifier`  
✅ **Tool #10:** `https://bkxlabs.com/tools/agentic-workflow-debugger`  
✅ **Tool #15:** `https://bkxlabs.com/tools/crypto-agility-maturity-model`  

Verify existing routes still work:
✅ **Backend:** `https://bkxlabs.com/admin`, `/api`, `/store`  
✅ **Frontend:** `https://bkxlabs.com/` (main site)

---

## 📊 Port Usage
| Service | Port | Process |
|---------|------|---------|
| Nginx (reverse proxy) | 80, 443 | System |
| PHP-FPM (backend) | unix socket | `/run/php/php8.3-fpm.sock` |
| Next.js (tools) | 3000 | Node.js (npm start or PM2) |

---

## 🔄 Monitoring & Debugging

### Check if tools app is running:
```bash
curl http://localhost:3000
curl http://localhost:3000/tools
```

### Check PM2 status:
```bash
pm2 status
pm2 logs tools-web --lines 50
```

### Check Nginx access/error logs:
```bash
tail -f /var/log/nginx/access.log | grep "tools"
tail -f /var/log/nginx/error.log
```

### Restart tools app if needed:
```bash
pm2 restart tools-web
```

---

## 🔙 Rollback (if needed)
If anything breaks, revert to original nginx config:
```bash
git checkout HEAD -- /etc/nginx/sites-available/bkxlabs.com
sudo nginx -t && sudo systemctl reload nginx
```

---

## ✅ All 15 Tools Live At:

| # | Tool | URL |
|---|------|-----|
| 1 | EU AI Act | `bkxlabs.com/tools/eu-ai-act-risk-level-classifier` |
| 2 | PQ CBOM | `bkxlabs.com/tools/post-quantum-cbom-generator` |
| 3 | SOC2 | `bkxlabs.com/tools/saas-soc2-readiness-calculator` |
| 4 | Cloud GPU | `bkxlabs.com/tools/cloud-gpu-cost-comparison` |
| 5 | Blackwell | `bkxlabs.com/tools/nvidia-blackwell-pue-estimator` |
| 6 | Privacy | `bkxlabs.com/tools/ai-prompt-privacy-auditor` |
| 7 | ADMT | `bkxlabs.com/tools/admt-proportionality-scorer` |
| 8 | FIPS-203 | `bkxlabs.com/tools/nist-fips-203-migration-timeline-planner` |
| 9 | Cooling ROI | `bkxlabs.com/tools/direct-to-chip-liquid-cooling-roi` |
| 10 | Workflow | `bkxlabs.com/tools/agentic-workflow-debugger` |
| 11 | Gas | `bkxlabs.com/tools/smart-contract-gas-optimizer` |
| 12 | Carbon | `bkxlabs.com/tools/esg-carbon-footprint-tracker` |
| 13 | ZK | `bkxlabs.com/tools/zk-circuit-validator` |
| 14 | Deepfake | `bkxlabs.com/tools/deepfake-detector-probability` |
| 15 | Crypto | `bkxlabs.com/tools/crypto-agility-maturity-model` |

---

**Dashboard:** `https://bkxlabs.com/tools` — Lists all 15 tools with descriptions

---

## Questions?
Check the reference configs in this directory:
- `NGINX_CONFIG.conf` — Just the location blocks to add
- `NGINX_COMPLETE_CONFIG.conf` — Full config ready to use
