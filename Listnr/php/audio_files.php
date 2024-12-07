<?php
require 'config.php'; // Database connection

// Allow CORS for all origins
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Get the JSON data from the request body
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM audio";
    $result = $conn->query($sql);
    
    $response = array();
    
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_object()) {
            $response[] = $row;
        }
    } else {
        $response = "No audio found.";
    }

    $conn->close();

    echo json_encode($response);
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    if (isset($data['audioID'])) {
        $audioID = $data['audioID'];

        $sql = "DELETE FROM audio WHERE audioID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $audioID);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Audio deleted successfully']);
        } else {
            error_log('Failed to execute delete statement: ' . $stmt->error);
            echo json_encode(['status' => 'error', 'message' => 'Failed to delete audio']);
        }

        $stmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'audioID is required']);
    }

    $conn->close();
}
?>
