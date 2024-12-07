<?php
$host = '127.0.0.1'; // or your database server
$dbname = 'listnr';
$username = 'root';
$password = '';

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
