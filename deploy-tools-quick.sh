#!/bin/bash

# ════════════════════════════════════════════════════════════
#  BKX Labs Tools — Fast Deploy with Timeout Handling
#  Fixes hanging npm install with better error handling
# ════════════════════════════════════════════════════════════

set -e

echo "🚀 Starting Quick Tools Deployment..."
echo "════════════════════════════════════════════════════════"

# ── Configure npm for faster/safer installs ──────────────
export npm_config_registry=https://registry.npmjs.org/
export npm_config_fetch_timeout=60000
export npm_config_fetch_retry_mintimeout=20000
export npm_config_fetch_retry_maxtimeout=120000
export npm_config_fetch_retries=5

# ── Step 1: Stop PM2 ─────────────────────────────────────
echo "⏹️  Stopping PM2..."
pm2 stop all 2>/dev/null || true
pm2 delete tools-web 2>/dev/null || true
sleep 1

# ── Step 2: Go to directory ──────────────────────────────
echo "📂 Navigating to tools..."
cd /var/www/BKX-Labs/tools-web
echo "✓ $(pwd)"

# ── Step 3: Quick Git sync ───────────────────────────────
echo "📥 Syncing code..."
git fetch origin
git reset --hard origin/main
echo "✓ Synced"

# ── Step 4: Complete cleanup (keeps package-lock.json) ────
echo "🧹 Cleaning..."
rm -rf .next dist build .swc node_modules
echo "✓ Cleaned"

# ── Step 5: npm install with timeouts ────────────────────
echo "📦 Installing npm packages..."
echo "⏳ This can take 2-5 minutes, please wait..."

# Use npm install (works with or without package-lock.json)
timeout 600 npm install \
  --legacy-peer-deps \
  --prefer-offline \
  --no-audit \
  --no-fund \
  || {
    echo "⚠️  npm install timeout or error, trying full recovery..."
    rm -rf node_modules
    npm cache clean --force
    timeout 600 npm install --legacy-peer-deps || {
      echo "❌ npm install failed multiple times"
      echo "Try manual fix:"
      echo "  cd /var/www/BKX-Labs/tools-web"
      echo "  rm -rf node_modules"
      echo "  npm cache clean --force"
      echo "  npm install --legacy-peer-deps"
      exit 1
    }
  }

echo "✓ Dependencies installed"

# ── Step 6: Build ─────────────────────────────────────────
echo "🔨 Building Next.js..."
timeout 900 npm run build || {
  echo "❌ Build failed"
  exit 1
}
echo "✓ Build complete"

# ── Step 7: Update Nginx ──────────────────────────────────
echo "🔄 Updating Nginx..."
sudo cp /var/www/BKX-Labs/nginx-bkxlabs-updated.conf /etc/nginx/sites-available/bkxlabs.com
sudo nginx -t || {
  echo "❌ Nginx config error"
  exit 1
}
sudo systemctl reload nginx
echo "✓ Nginx reloaded"

# ── Step 8: Start PM2 ─────────────────────────────────────
echo "▶️  Starting app..."
pm2 start "npm start" \
  --name "tools-web" \
  --cwd /var/www/BKX-Labs/tools-web \
  --max-memory-restart 500M \
  || {
    echo "❌ PM2 start failed"
    exit 1
  }

sleep 4

# ── Step 9: Verify ───────────────────────────────────────
echo "✅ Checking status..."
pm2 status

# ── Final Message ────────────────────────────────────────
echo ""
echo "════════════════════════════════════════════════════════"
echo "✅ DEPLOYMENT COMPLETE!"
echo "════════════════════════════════════════════════════════"
echo ""
echo "📍 Access: https://bkxlabs.com/tools"
echo ""
echo "📊 Logs: pm2 logs tools-web"
echo ""
echo "If you still see 502:"
echo "  1. Wait 10 seconds"
echo "  2. Hard refresh: Ctrl+Shift+Delete"
echo "  3. Check logs: pm2 logs tools-web"
echo "════════════════════════════════════════════════════════"
