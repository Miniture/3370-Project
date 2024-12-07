<?php
require 'config.php'; // Database connection

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['password'])) {
        $password = $_GET['password'];

        $sql = "SELECT userName, userLastName, userEmail, userPhone, userPrimaryLanguage, userHours, userMastery, adminPriveledge 
                FROM users 
                WHERE userPassword = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $password);
        $stmt->execute();
        $result = $stmt->get_result();

        $response = '';

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $response = $row["adminPriveledge"];
        } else {
            $response = "No user found.";
        }

        $stmt->close();
    } else {
        $response = "Password is required.";
    }

    $conn->close();
    echo $response;
}
?>
