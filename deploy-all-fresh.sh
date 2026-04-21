#!/bin/bash

# ════════════════════════════════════════════════════════════
#  BKX Labs Tools Deployment + Nginx Integration
#  Complete deployment with fresh files
# ════════════════════════════════════════════════════════════

echo "🚀 Complete Tools + Nginx Deployment"
echo "════════════════════════════════════════════════════════"
echo ""

# ── Step 1: Backup current nginx config ──────────────────
echo "📋 Backing up current nginx config..."
sudo cp /etc/nginx/sites-available/bkxlabs.com /etc/nginx/sites-available/bkxlabs.com.backup.$(date +%s)
echo "✓ Backup created"

# ── Step 2: Update nginx config ──────────────────────────
echo "🔄 Updating nginx configuration..."
sudo cp /var/www/BKX-Labs/nginx-bkxlabs-updated.conf /etc/nginx/sites-available/bkxlabs.com
echo "✓ Nginx config updated"

# ── Step 3: Validate nginx syntax ────────────────────────
echo "✅ Validating nginx syntax..."
sudo nginx -t
if [ $? -ne 0 ]; then
    echo "❌ Nginx config error! Restoring backup..."
    sudo cp /etc/nginx/sites-available/bkxlabs.com.backup.$(date +%s) /etc/nginx/sites-available/bkxlabs.com
    exit 1
fi
echo "✓ Nginx syntax valid"

# ── Step 4: Deploy Tools Application ─────────────────────
echo ""
echo "🛠️  Deploying Tools Application..."
cd /var/www/BKX-Labs

# Pull latest
echo "📥 Pulling latest code..."
git pull origin main || true

# Enter tools directory
cd /var/www/BKX-Labs/tools-web

# Clean install
echo "🧹 Cleaning old dependencies..."
rm -rf node_modules package-lock.json .next

echo "📦 Installing npm dependencies..."
npm install --legacy-peer-deps

echo "🔨 Building Next.js application..."
npm run build
echo "✓ Build complete"

# ── Step 5: Manage PM2 Process ───────────────────────────
echo "⏹️  Managing PM2 process..."
pm2 stop tools-web 2>/dev/null || true
pm2 delete tools-web 2>/dev/null || true
sleep 1

echo "▶️  Starting tools-web with PM2..."
pm2 start "npm start" --name "tools-web" --cwd /var/www/BKX-Labs/tools-web
pm2 save
pm2 startup
pm2 restart tools-web
sleep 2

echo "✓ PM2 process running"

# ── Step 6: Reload Nginx ─────────────────────────────────
echo ""
echo "🔄 Reloading nginx..."
sudo systemctl reload nginx
echo "✓ Nginx reloaded"

# ── Step 7: Final Status ─────────────────────────────────
echo ""
echo "════════════════════════════════════════════════════════"
echo "✅ DEPLOYMENT COMPLETE!"
echo "════════════════════════════════════════════════════════"
echo ""
echo "📍 Services Status:"
pm2 status
echo ""
echo "🌐 Access points:"
echo "   ✓ Tools Dashboard:  https://bkxlabs.com/tools"
echo "   ✓ Backend:          https://bkxlabs.com/admin"
echo "   ✓ Store:            https://bkxlabs.com/store"
echo "   ✓ Frontend:         https://bkxlabs.com/"
echo ""
echo "📊 Monitoring:"
echo "   View logs:    pm2 logs tools-web"
echo "   Restart:      pm2 restart tools-web"
echo "   Stop:         pm2 stop tools-web"
echo ""
echo "🧪 Quick Test:"
echo "   curl https://bkxlabs.com/tools"
echo "════════════════════════════════════════════════════════"
