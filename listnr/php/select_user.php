<?php
require 'config.php'; // Database connection

// Get the JSON data from the request body
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
	
    $sql = "SELECT userName, userLastName, userEmail, userPhone, userPrimaryLanguage, userHours, userMastery FROM users WHERE userPassword = 'listnrAdmin172'";
	$result = $conn->query($sql);
	
	$response = array();
	
	if ($result->num_rows > 0) {
		$row = $result->fetch_assoc();
		$response = $row["userName"] . " " . $row["userLastName"] . "," . $row["userEmail"] . "," . $row["userPhone"] . "," . $row["userPrimaryLanguage"] . "," . $row["userHours"] . "," . $row["userMastery"];
	} else {
		$response = "No user found.";
	}
	
	$conn->close();
	
	/*$myJSON = json_encode($response);*/
	
	echo $response;
}
?>
