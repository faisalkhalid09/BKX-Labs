#!/bin/bash

# ════════════════════════════════════════════════════════════
#  BKX Labs Tools Deployment — Fresh Install
#  File: deploy-tools-complete.sh
#  Run: bash deploy-tools-complete.sh
# ════════════════════════════════════════════════════════════

set -e  # Exit on error

echo "🚀 Starting BKX Labs Tools Fresh Deployment..."

# ── Step 1: Navigate to workspace ─────────────────────────
cd /var/www/BKX-Labs
echo "✓ Working directory: $(pwd)"

# ── Step 2: Pull latest code ──────────────────────────────
echo "📥 Pulling latest code..."
git pull origin main || true

# ── Step 3: Enter tools-web directory ─────────────────────
cd /var/www/BKX-Labs/tools-web
echo "✓ Tools directory: $(pwd)"

# ── Step 4: Clean node_modules (fresh install) ────────────
echo "🧹 Cleaning old dependencies..."
rm -rf node_modules package-lock.json .next
echo "✓ Clean complete"

# ── Step 5: Install dependencies ──────────────────────────
echo "📦 Installing npm dependencies..."
npm install --legacy-peer-deps
echo "✓ Dependencies installed"

# ── Step 6: Build Next.js app ─────────────────────────────
echo "🔨 Building Next.js application..."
npm run build
echo "✓ Build complete"

# ── Step 7: Stop existing PM2 process (if running) ────────
echo "⏹️  Stopping existing PM2 process..."
pm2 stop tools-web 2>/dev/null || true
pm2 delete tools-web 2>/dev/null || true
sleep 1

# ── Step 8: Start with PM2 ───────────────────────────────
echo "▶️  Starting with PM2..."
pm2 start "npm start" --name "tools-web" --cwd /var/www/BKX-Labs/tools-web
pm2 save
pm2 startup
pm2 restart tools-web
sleep 2

# ── Step 9: Verify PM2 process ────────────────────────────
echo "🔍 Checking PM2 status..."
pm2 status

# ── Step 10: Reload Nginx ─────────────────────────────────
echo "🔄 Reloading Nginx configuration..."
sudo nginx -t && sudo systemctl reload nginx
echo "✓ Nginx reloaded"

# ── Final Status ──────────────────────────────────────────
echo ""
echo "════════════════════════════════════════════════════════"
echo "✅ Tools Deployment Complete!"
echo "════════════════════════════════════════════════════════"
echo ""
echo "📍 Tools running on: http://localhost:3000"
echo "🌐 Access via:      https://bkxlabs.com/tools"
echo "📊 PM2 dashboard:   pm2 list"
echo "📋 PM2 logs:        pm2 logs tools-web"
echo ""
echo "Test:"
echo "  curl https://bkxlabs.com/tools"
echo "════════════════════════════════════════════════════════"
