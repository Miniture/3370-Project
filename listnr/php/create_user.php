<?php
require 'config.php'; // Database connection

// Get the JSON data from the request body
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $userName = $data['userName'];
    $userLastName = $data['userLastName'];
    $userPassword = $data['userPassword'];
    $userPhone = $data['userPhone'];
    $userEmail = $data['userEmail'];
    $userMastery = $data['userMastery'];
    $userHours = $data['userHours'];
    $userLearnedWords = $data['userLearnedWords'];
    $userPrimaryLanguage = $data['userPrimaryLanguage'];


    $sql = "INSERT INTO users (userName, userLastName, userPassword, userPhone, userEmail, userMastery, userHours, userLearnedWords, userPrimaryLanguage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$userName, $userLastName, $userPassword, $userPhone, $userEmail, $userMastery, $userHours, $userLearnedWords, $userPrimaryLanguage]);

    // Return a JSON response
    echo json_encode(['message' => 'User created successfully']);
}
?>
