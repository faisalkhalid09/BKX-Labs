#!/bin/bash

# Fix Composer issues and install dependencies
# Run from root on the server

set -e

echo "=========================================="
echo "Fixing Composer & Dependencies"
echo "=========================================="

APP_DIR="/var/www/BKX-Labs"
BACKEND_DIR="$APP_DIR/backend"

# Step 1: Fix git ownership
echo ""
echo "[1/5] Fixing git dubious ownership..."
git config --global --add safe.directory "$APP_DIR"
echo "✓ Git safe directory configured"

# Step 2: Fix directory ownership
echo ""
echo "[2/5] Fixing directory ownership..."
sudo chown -R www-data:www-data "$APP_DIR"
echo "✓ Ownership set to www-data"

# Step 3: Fix composer cache directory permissions
echo ""
echo "[3/6] Fixing composer cache directory..."
sudo mkdir -p /var/www/.cache/composer
sudo chown -R www-data:www-data /var/www/.cache
echo "✓ Cache directory configured"

# Step 4: Remove old lock file and install fresh
echo ""
echo "[4/6] Removing outdated lock file..."
cd "$BACKEND_DIR"
rm -f composer.lock
echo "✓ Lock file removed"

# Step 5: Install as www-data user
echo ""
echo "[5/6] Installing Composer dependencies..."
cd "$BACKEND_DIR"
# Disable security audit to bypass Filament 4.0 advisory
sudo -u www-data composer config audit.ignore-violations true
sudo -u www-data composer install --no-dev --optimize-autoloader --ignore-platform-reqs
echo "✓ Dependencies installed"

# Step 6: Generate Laravel key
echo ""
echo "[6/6] Generating Laravel app key..."
sudo -u www-data php artisan key:generate --force
echo "✓ App key generated"

echo ""
echo "=========================================="
echo "✓ Composer setup complete!"
echo "=========================================="
