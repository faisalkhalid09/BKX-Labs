#!/usr/bin/env bash
# ══════════════════════════════════════════════════════════════════════════════
#  BKX Labs — Frontend SSG Rebuild Script
#  Path on server: /var/www/BKX-Labs/rebuild.sh
#
#  Triggered automatically by: Laravel PostObserver → RebuildController
#  Can also be run manually: bash /var/www/BKX-Labs/rebuild.sh
#
#  What this does:
#  1. Pulls latest code from git
#  2. Installs/updates npm dependencies
#  3. Runs the full SSG build (client bundle + SSR bundle + static HTML generation)
#  4. Reloads Nginx to serve the fresh dist/ files
#  5. Logs everything to /var/log/bkx-rebuild.log
# ══════════════════════════════════════════════════════════════════════════════

set -euo pipefail

PROJECT_DIR="/var/www/BKX-Labs"
FRONTEND_DIR="${PROJECT_DIR}/frontend"
LOG_FILE="/var/log/bkx-rebuild.log"
LOCK_FILE="/tmp/bkx-rebuild.lock"
NODE_BIN=$(which node 2>/dev/null || echo "/usr/bin/node")
NPM_BIN=$(which npm 2>/dev/null || echo "/usr/bin/npm")

# ── Prevent overlapping builds ────────────────────────────────────────────────
if [ -f "$LOCK_FILE" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Another rebuild is already running. Skipping." | tee -a "$LOG_FILE"
    exit 0
fi

# Create lock file; remove it when script exits (success or failure)
touch "$LOCK_FILE"
trap "rm -f $LOCK_FILE; echo '[$(date)] Lock released.' >> $LOG_FILE" EXIT

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" | tee -a "$LOG_FILE"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting BKX Labs frontend rebuild..." | tee -a "$LOG_FILE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" | tee -a "$LOG_FILE"

# ── Step 1: Pull latest code ───────────────────────────────────────────────────
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Step 1: git pull..." | tee -a "$LOG_FILE"
cd "$PROJECT_DIR"
git pull origin main 2>&1 | tee -a "$LOG_FILE"

# ── Step 2: Install/update npm packages ────────────────────────────────────────
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Step 2: npm ci..." | tee -a "$LOG_FILE"
cd "$FRONTEND_DIR"
$NPM_BIN ci --prefer-offline 2>&1 | tee -a "$LOG_FILE"

# ── Step 3: Run the full SSG build ────────────────────────────────────────────
# build:ssg = vite build (client) + vite build --mode ssr + node ssg-render.mjs
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Step 3: npm run build:ssg..." | tee -a "$LOG_FILE"
$NPM_BIN run build:ssg 2>&1 | tee -a "$LOG_FILE"

# ── Step 4: Reload Nginx ───────────────────────────────────────────────────────
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Step 4: nginx -s reload..." | tee -a "$LOG_FILE"
sudo nginx -s reload 2>&1 | tee -a "$LOG_FILE"

# ── Step 5: Cleanup SSR bundle (optional — saves disk space) ───────────────────
# The dist/server/ directory contains the SSR bundle only needed during the build.
# It does not need to be served publicly.
# Uncomment the line below to remove it after the build:
# rm -rf "${FRONTEND_DIR}/dist/server"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✓ Rebuild complete." | tee -a "$LOG_FILE"
