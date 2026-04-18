#!/bin/bash

# ════════════════════════════════════════════════════════
# BKX Labs — Next.js + Nginx Deployment Fix
# Run this on your VPS to fix the CSS/JS loading issues
# ════════════════════════════════════════════════════════

echo "🚀 Starting deployment fix..."

# ── Step 1: Build Next.js ──────────────────────────────
echo ""
echo "📦 Building Next.js application..."
cd /var/www/BKX-Labs/tools-web
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Check errors above."
    exit 1
fi

echo "✅ Build successful!"

# ── Step 2: Restart PM2 ────────────────────────────────
echo ""
echo "🔄 Restarting PM2 process..."
pm2 restart tools-web
pm2 logs tools-web

echo ""
echo "✅ PM2 restarted!"

# ── Step 3: Check if Node is running on port 3000 ─────
echo ""
echo "🔍 Checking if Next.js is running on port 3000..."
sleep 2
ps aux | grep node | grep -v grep

# ── Step 4: Test nginx config ──────────────────────────
echo ""
echo "🔧 Testing nginx configuration..."
sudo nginx -t

# ── Step 5: Reload nginx ───────────────────────────────
echo ""
echo "🔄 Reloading nginx..."
sudo systemctl reload nginx

# ── Step 6: Verify nginx is running ────────────────────
echo ""
echo "✅ Checking nginx status..."
sudo systemctl status nginx | head -10

# ── Step 7: Final test ─────────────────────────────────
echo ""
echo "🧪 Testing endpoint..."
curl -sI https://bkxlabs.com/tools | head -1

echo ""
echo "════════════════════════════════════════════════════════"
echo "✅ Deployment fix complete!"
echo "════════════════════════════════════════════════════════"
echo ""
echo "If you still see errors:"
echo "  1. Check PM2 logs: pm2 logs tools-web"
echo "  2. Check nginx errors: sudo tail -f /var/log/nginx/error.log"
echo "  3. Check if port 3000 is open: sudo netstat -tlnp | grep 3000"
echo ""
