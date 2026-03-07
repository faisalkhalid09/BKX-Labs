# Rezgo Contest Demo - Manual Deployment Guide

Since we don't have direct SSH access, here is exactly how you can deploy the `dev-rezgo` folder to your BKX Labs live server for the client review.

All the required files have been gathered in the `C:\Users\faisa\OneDrive\Desktop\MY projects\VSH\dev-rezgo` directory on your computer.

## Step 1: Upload the Files
1. Use your FTP client (like FileZilla) or cPanel File Manager to connect to `bkxlabs.com`.
2. Navigate to your web root folder (usually `/public_html` or `/var/www/html` or similar).
3. Upload the entire local `dev-rezgo` folder into that web root. 
   *(This ensures they live in their own space and don't overwrite any BKX Labs code)*.

## Step 2: Configure the Database Connection
1. Once uploaded, open `dev-rezgo/Connection.php` on the server using your cPanel File Editor.
2. Replace the placeholder values with your actual live database credentials for the VPS:
   ```php
   $db_user = 'ENTER_LIVE_DB_USER_HERE';
   $db_pass = 'ENTER_LIVE_DB_PASS_HERE';
   $db_name = 'ENTER_LIVE_DB_NAME_HERE';
   ```
3. Save the file.
*(Note: I've already configured `dev-rezgo/KGS-Config.php` with the exact Sandbox API credentials you provided).*

## Step 3: Setup the Database Structure
You need to import the new schema and update the tables on the live database using phpMyAdmin or the MySQL command line:
1. First, import the schema file: `dev-rezgo/dzm_coataa.sql`.
2. Then, run the update script: `dev-rezgo/database_updates.sql`. *(This adds the exact new columns like KGS_Adult, KGS_Child, and the unique index).*

## Step 4: Run the Sync Script (Live Test Run)
To populate the live database with real Sandbox prices, access the server terminal (SSH via cPanel terminal or Putty).
1. Navigate to the new folder:
   ```bash
   cd /path/to/your/webroot/dev-rezgo
   ```
2. Run the sync command:
   ```bash
   php syncRezgo.php
   ```
3. You should see a success message indicating how many prices were updated.

## Step 5: Verify the UI
Finally, visit this URL in your browser to confirm everything is working and the new condensed table is showing the calculated prices:
**https://bkxlabs.com/dev-rezgo/TicketPrices.php**

If it looks good, you can send that exact link to your client for their "online version" review!
