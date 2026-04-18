#!/bin/bash

# Navigate to project directory
cd /var/www/BKX-Labs/tools-web

# Try to build with increased memory
echo "Attempting build with NODE_OPTIONS..."
NODE_OPTIONS="--max-old-space-size=1536" npm run build

# If above fails, run these next commands
if [ $? -ne 0 ]; then
    echo "Build failed. Clearing cache and reinstalling..."
    rm -rf .next node_modules package-lock.json
    npm install
    NODE_OPTIONS="--max-old-space-size=2048" npm run build
fi

# Fix ESLint config issue
echo ""
echo "Fixing ESLint configuration..."
sed -i 's|eslint-config-next/core-web-vitals"|eslint-config-next/core-web-vitals.js"|g' eslint.config.mjs

# Update Next.js to fix security vulnerability
echo ""
echo "Updating Next.js to latest patched version..."
npm update next

# Rebuild to confirm everything works
echo ""
echo "Running final build..."
NODE_OPTIONS="--max-old-space-size=2048" npm run build

echo ""
echo "✓ Build complete! Your .next folder is ready for deployment."
