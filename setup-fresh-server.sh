#!/bin/bash

# Fresh Server Setup - BKX-Labs
# Clone repo, install dependencies, configure nginx & PHP-FPM

set -e

echo "=========================================="
echo "BKX-Labs Fresh Server Setup"
echo "=========================================="

# Configuration
REPO_URL="https://github.com/faisalkhalid09/BKX-Labs"
APP_DIR="/var/www/BKX-Labs"
BACKEND_DIR="$APP_DIR/backend"
FRONTEND_DIR="$APP_DIR/frontend"
PHP_VERSION="8.3"
USER="www-data"

# Step 1: Update system and install dependencies
echo ""
echo "[1/10] Updating system and installing dependencies..."
sudo apt-get update
sudo apt-get install -y software-properties-common
sudo add-apt-repository -y ppa:ondrej/php
sudo apt-get update
sudo apt-get install -y \
    php${PHP_VERSION} \
    php${PHP_VERSION}-fpm \
    php${PHP_VERSION}-mysql \
    php${PHP_VERSION}-mbstring \
    php${PHP_VERSION}-xml \
    php${PHP_VERSION}-bcmath \
    php${PHP_VERSION}-curl \
    php${PHP_VERSION}-zip \
    mysql-client \
    git \
    curl \
    nginx \
    nodejs \
    npm

echo "✓ Dependencies installed"

# Step 2: Remove old directory and clone repository
echo ""
echo "[2/10] Preparing directories..."
if [ -d "$APP_DIR" ]; then
    echo "Removing old app directory..."
    sudo rm -rf "$APP_DIR"
fi

echo "[3/10] Cloning repository from GitHub..."
sudo mkdir -p /var/www
cd /var/www
sudo git clone "$REPO_URL"
sudo chown -R $USER:$USER "$APP_DIR"
echo "✓ Repository cloned"

# Step 3: Setup Backend (Laravel)
echo ""
echo "[4/10] Setting up Laravel backend..."
cd "$BACKEND_DIR"

# Install Composer globally
echo "Installing Composer..."
sudo curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

echo "Running composer install..."
composer install --no-dev --optimize-autoloader
echo "✓ Composer dependencies installed"

# Step 4: Configure Laravel environment
echo ""
echo "[5/10] Configuring Laravel .env..."
if [ -f "$BACKEND_DIR/.env.example" ]; then
    cp "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env"
    echo "⚠ Edit .env with your database credentials"
else
    echo "⚠ No .env.example found"
fi

# Generate app key
php artisan key:generate --force 2>/dev/null || echo "⚠ Could not generate key (may already have one)"

# Set permissions
sudo chown -R $USER:$USER "$BACKEND_DIR"
sudo chmod -R 775 "$BACKEND_DIR/storage" "$BACKEND_DIR/bootstrap/cache"
echo "✓ Laravel configured"

# Step 5: Run migrations (optional - uncomment if DB is ready)
echo ""
echo "[6/10] Database migrations..."
echo "⚠ Skipping migrations - ensure DB is running and .env is updated"
# php artisan migrate --force
echo "To run migrations later: cd $BACKEND_DIR && php artisan migrate --force"

# Step 6: Setup Frontend (React/Vite)
echo ""
echo "[7/10] Setting up React frontend..."
cd "$FRONTEND_DIR"

if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    sudo apt-get update
    sudo apt-get install -y nodejs npm
fi

echo "Running npm install..."
npm install
echo "✓ Node dependencies installed"

# Build frontend
echo "Building frontend..."
npm run build
echo "✓ Frontend built to dist/"

# Step 7: Start PHP-FPM
echo ""
echo "[8/10] Starting PHP-FPM ${PHP_VERSION}..."
sudo systemctl enable php-fpm${PHP_VERSION}
sudo systemctl restart php-fpm${PHP_VERSION}
echo "✓ PHP-FPM running"

# Step 8: Configure nginx
echo ""
echo "[9/10] Configuring nginx..."

# Copy nginx config from repo if it exists
if [ -f "$FRONTEND_DIR/deployment/nginx.conf" ]; then
    echo "Using nginx config from repository..."
    sudo cp "$FRONTEND_DIR/deployment/nginx.conf" /etc/nginx/sites-available/bkx-labs
else
    echo "Creating default nginx config..."
    sudo tee /etc/nginx/sites-available/bkx-labs > /dev/null <<'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    
    server_name _;
    root /var/www/BKX-Labs/frontend/dist;
    
    # Frontend (React/Vite)
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API
    location /api {
        root /var/www/BKX-Labs;
        try_files $uri $uri/ /backend/public/index.php?$query_string;
    }
    
    # Laravel public files
    location /backend/public {
        alias /var/www/BKX-Labs/backend/public;
    }
    
    # PHP-FPM for Laravel
    location ~ \.php$ {
        root /var/www/BKX-Labs/backend/public;
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
    
    # Deny access to sensitive files
    location ~ /\. {
        deny all;
    }
    location ~ ~$ {
        deny all;
    }
}
EOF
fi

# Enable the site
sudo ln -sf /etc/nginx/sites-available/bkx-labs /etc/nginx/sites-enabled/bkx-labs
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx config
sudo nginx -t
echo "✓ Nginx configured"

# Step 9: Start nginx
echo ""
echo "[10/10] Starting nginx..."
sudo systemctl enable nginx
sudo systemctl restart nginx
echo "✓ Nginx running"

# Step 10: Verify
echo ""
echo "[11/11] Verifying installation..."
echo ""
echo "=========================================="
echo "Service Status"
echo "=========================================="
sudo systemctl status nginx --no-pager | grep -E "active|running" || true
sudo systemctl status php-fpm${PHP_VERSION} --no-pager | grep -E "active|running" || true

echo ""
echo "=========================================="
echo "Memory Usage"
echo "=========================================="
free -h

echo ""
echo "=========================================="
echo "✓ Fresh Server Setup Complete!"
echo "=========================================="
echo ""
echo "NEXT STEPS:"
echo "1. Edit .env file with database credentials:"
echo "   nano $BACKEND_DIR/.env"
echo ""
echo "2. Run Laravel migrations (when DB is ready):"
echo "   cd $BACKEND_DIR && php artisan migrate --force"
echo ""
echo "3. Test your application:"
echo "   - Frontend: http://93.127.134.203"
echo "   - API: http://93.127.134.203/api/..."
echo ""
echo "4. Check logs if needed:"
echo "   - Laravel: tail -f $BACKEND_DIR/storage/logs/laravel.log"
echo "   - Nginx: tail -f /var/log/nginx/error.log"
echo "=========================================="
