#!/bin/bash

# Upgrade Node.js to a newer version (needed for TypeScript syntax)
set -e

echo "=========================================="
echo "Upgrading Node.js"
echo "=========================================="

# Step 1: Check current version
echo ""
echo "[1/4] Current versions:"
node --version
npm --version

# Step 2: Remove old Node.js
echo ""
echo "[2/4] Removing old Node.js..."
sudo apt-get remove -y nodejs npm
sudo apt-get autoremove -y

# Step 3: Install Node.js from NodeSource (version 18+)
echo ""
echo "[3/4] Installing Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
echo "✓ Node.js installed"

# Step 4: Verify versions
echo ""
echo "[4/4] Updated versions:"
node --version
npm --version

echo ""
echo "=========================================="
echo "✓ Node.js upgraded!"
echo "=========================================="
echo ""
echo "Now rebuild frontend:"
echo "  cd /var/www/BKX-Labs/frontend"
echo "  rm -rf node_modules package-lock.json"
echo "  npm install"
echo "  npm run build"
echo "========================================"
