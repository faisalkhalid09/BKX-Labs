<?php
// Live VPS Database Credentials
$db_host = 'localhost';
$db_user = 'ENTER_LIVE_DB_USER_HERE';
$db_pass = 'ENTER_LIVE_DB_PASS_HERE';
$db_name = 'ENTER_LIVE_DB_NAME_HERE';

$db = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

if (!$db) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
