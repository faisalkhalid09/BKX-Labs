<?php
/**
 * syncRezgo.php
 * CLI-compatible script for a Cron Job to sync Rezgo ticket pricing.
 * Run daily e.g., via: php /path/to/Ticket/syncRezgo.php
 */

// Basic logging setup
$logFile = __DIR__ . '/syncRezgo.log';
function logMessage($message) {
    global $logFile;
    $date = date('Y-m-d H:i:s');
    $formattedMessage = "[$date] $message\n";
    file_put_contents($logFile, $formattedMessage, FILE_APPEND);
    // Print to CLI if running from command line
    if (php_sapi_name() === 'cli') {
        echo $formattedMessage;
    }
}

logMessage("Starting Rezgo API Sync.");

// External Config
$configFile = __DIR__ . '/KGS-Config.php';

if (file_exists($configFile)) {
    require_once $configFile;
} else {
    logMessage("ERROR: KGS-Config.php not found.");
    exit(1);
}

// Ensure database connection
$dbConfigFile = __DIR__ . '/Connection.php';
if (file_exists($dbConfigFile)) {
    require_once $dbConfigFile;
} else {
    logMessage("ERROR: Connection.php not found.");
    exit(1);
}

if (!isset($db) || !$db) {
    logMessage("ERROR: Database connection not established.");
    exit(1);
}

// Fallbacks if constants are not defined in KGS-Config.php
$rezgoApiUrl = defined('REZGO_API_URL') ? REZGO_API_URL : '';
$rezgoApiKey = defined('REZGO_API_KEY') ? REZGO_API_KEY : '';

if (empty($rezgoApiUrl)) {
    logMessage("ERROR: REZGO_API_URL is not defined in KGS-Config.php.");
    exit(1);
}

// Set up cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $rezgoApiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
// If keys are needed in headers
// Legacy XML endpoint usually takes keys in the URL, headers might cause 403.
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
if(curl_errno($ch)){
    $error_msg = curl_error($ch);
    logMessage("cURL ERROR: " . $error_msg);
    curl_close($ch);
    exit(1);
}
curl_close($ch);

if (empty($response)) {
    logMessage("ERROR: Rezgo API returned an empty response. Check if your URL and API Key are valid.");
    exit(1);
}

$response = trim($response);
$apiData = json_decode($response, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    logMessage("JSON Decode Error: " . json_last_error_msg());
    logMessage("RAW API RESPONSE (First 500 chars): \n" . substr($response, 0, 500));
    exit(1);
}

// Assuming the API returns an array, or an object with an 'items' or 'data' array.
// Adjust the key according to the actual Rezgo API response structure.
$items = [];
if (isset($apiData['items'])) {
    $items = $apiData['items'];
} elseif (isset($apiData['item'])) {
    // If it's a single item wrap it in array, or multiple items
    $items = isset($apiData['item'][0]) ? $apiData['item'] : [$apiData['item']];
} elseif (isset($apiData['data'])) {
    $items = $apiData['data'];
} elseif (is_array($apiData)) {
    $items = $apiData;
} else {
    logMessage("ERROR: Unexpected API format.");
    exit(1);
}

logMessage("Successfully fetched data from Rezgo API. Items count: " . count($items));

// Fetch all ticket types from the DB to map markups
$ticketTypes = [];
$query = "SELECT id, product_id, adult_markup, child_markup FROM tickettypes";
$result = mysqli_query($db, $query);
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $key = $row['product_id'];
        if ($key) {
            $ticketTypes[$key] = [
                'id' => $row['id'],
                'adult_markup' => (float)$row['adult_markup'],
                'child_markup' => (float)$row['child_markup']
            ];
        }
    }
    logMessage("DB TICKET UIDs LOADED: " . implode(", ", array_keys($ticketTypes)));
} else {
    logMessage("ERROR fetching tickettypes: " . mysqli_error($db));
    exit(1);
}

// Prepare the Upsert Statement
// The UNIQUE index on (ticket_id, date) makes the ON DUPLICATE KEY UPDATE trigger
$stmt = $db->prepare("
    INSERT INTO ticket_prices (ticket_id, date, KGS_Adult, KGS_Child, price_adult, price_child, price) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
        KGS_Adult = VALUES(KGS_Adult), 
        KGS_Child = VALUES(KGS_Child), 
        price_adult = VALUES(price_adult), 
        price_child = VALUES(price_child),
        price = VALUES(price)
");

if (!$stmt) {
    logMessage("Prepare failed: " . $db->error);
    exit(1);
}

// Execute logic per item
$successCount = 0;
$skipCount = 0;

$syncDate = date('Y-m-d'); // Update prices for today or the relevant validity date from API

foreach ($items as $item) {
    // Try to extract name, prices from API response
    // Replace these keys with actual Rezgo API keys if they differ
    // Rezgo API keys: 'item' for name, 'starting' for price, 'uid' for unique ID
    $itemName = isset($item['item']) ? $item['item'] : (isset($item['name']) ? $item['name'] : (isset($item['item_name']) ? $item['item_name'] : 'Unknown'));
    $optionName = isset($item['option']) ? $item['option'] : '';
    $productUid = isset($item['uid']) ? $item['uid'] : null;
    
    // Log all items to help with mapping
    logMessage("API ITEM FOUND: '$itemName' | Option: '$optionName' | UID: '$productUid'");

    // In search API, the price is often in 'starting' or 'rate'
    $apiAdultPrice = isset($item['starting']) ? (float)$item['starting'] : 
                    (isset($item['adult_price']) ? (float)$item['adult_price'] : 
                    (isset($item['rate']) ? (float)$item['rate'] : 0.00));
    $apiChildPrice = isset($item['child_price']) ? (float)$item['child_price'] : 0.00;
    
    // Check if we have this product UID in our DB
    if ($productUid && isset($ticketTypes[$productUid])) {
        $dbData = $ticketTypes[$productUid];
        $ticketId = $dbData['id'];
        logMessage("MATCH FOUND: UID '$productUid' matches ID $ticketId");
        
        $KGS_Adult = $apiAdultPrice;
        $KGS_Child = $apiChildPrice;
        
        // Pricing Engine
        $price_adult = $KGS_Adult + $dbData['adult_markup'];
        $price_child = $KGS_Child + $dbData['child_markup'];
        
        // The default "price" column points to price_adult
        $price = $price_adult; 

        $stmt->bind_param("isddddd", $ticketId, $syncDate, $KGS_Adult, $KGS_Child, $price_adult, $price_child, $price);
        
        if ($stmt->execute()) {
            $successCount++;
        } else {
            logMessage("Error updating ticket ID $ticketId: " . $stmt->error);
        }
        
    } else {
        $skipCount++;
    }
}

$stmt->close();
$timestamp = date('Y-m-d H:i:s');
logMessage("Sync Complete: [$timestamp] - [$successCount] prices updated. Skipped: [$skipCount].");
echo "Sync Complete: [$timestamp] - [$successCount] prices updated.\n";

?>
