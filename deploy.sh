#!/bin/bash
# ================================================================
# BKX Labs — Production Deploy Script
# Run this on the server after every git push from your machine.
# Usage: bash /var/www/BKX-Labs/deploy.sh
# ================================================================

set -e  # Exit immediately on any error

SITE_DIR="/var/www/BKX-Labs"
FRONTEND_DIR="$SITE_DIR/frontend"
BACKEND_DIR="$SITE_DIR/backend"
DIST_DIR="$FRONTEND_DIR/dist"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  BKX Labs Deploy — $(date)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ── 1. Pull latest code ───────────────────────────────────────────
echo "[1/6] Pulling latest code..."
cd "$SITE_DIR"
git pull origin main

# ── 2. Build Frontend ─────────────────────────────────────────────
echo "[2/6] Building frontend..."
cd "$FRONTEND_DIR"
npm ci --prefer-offline   # Faster than npm install, uses lockfile
npm run build

echo "      ✓ Frontend built → $DIST_DIR"

# ── 3. Backend Dependencies ───────────────────────────────────────
echo "[3/6] Installing backend dependencies..."
cd "$BACKEND_DIR"
composer install --optimize-autoloader --no-dev --no-interaction

# ── 4. Laravel Cache ──────────────────────────────────────────────
echo "[4/6] Caching Laravel config/routes/views..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# ── 5. Fix Permissions ────────────────────────────────────────────
echo "[5/6] Fixing permissions..."
chown -R www-data:www-data "$SITE_DIR"
chmod -R 755 "$SITE_DIR"
chmod -R 775 "$BACKEND_DIR/storage" "$BACKEND_DIR/bootstrap/cache"

# ── 6. Reload Services ───────────────────────────────────────────
echo "[6/6] Reloading Nginx + PHP-FPM..."
nginx -t && systemctl reload nginx
systemctl reload php8.3-fpm

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ Deploy complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
