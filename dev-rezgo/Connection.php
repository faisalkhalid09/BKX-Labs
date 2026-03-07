<?php
// Live VPS Database Credentials
$db_host = 'localhost';
$db_user = 'root';
$db_pass = 'Faisalkhalid1#';
$db_name = 'devrezgo';

$db = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

if (!$db) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
