<?php
require 'config.php'; // Database connection

// Get the JSON data from the request body
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $newLanguage = $_POST['userPrimaryLanguage'];


    $sql = "UPDATE users SET userPrimaryLanguage='$newLanguage' WHERE userPassword = 'listnrAdmin172'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    // Return a JSON response
    echo json_encode(['message' => 'User Language Updated']);
}
?>
