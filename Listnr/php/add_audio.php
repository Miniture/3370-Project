<?php
require 'config.php'; // Database connection

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $audioName = $_POST['audioName'];
    $audioFile = $_FILES['audioFile'];

    if ($audioName && $audioFile) {
		
        $projectRoot = dirname(__DIR__);
        $targetDir = $projectRoot . '/audio/';

        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $fileName = basename($audioFile['name']);
        $targetFilePath = $targetDir . $fileName;

        if (move_uploaded_file($audioFile['tmp_name'], $targetFilePath)) {
			
            $relativeFilePath = 'audio/' . $fileName;

            $sql = "INSERT INTO audio (audioName, audioFile) VALUES (?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('ss', $audioName, $relativeFilePath);

            if ($stmt->execute()) {
                $audioID = $stmt->insert_id;
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Audio added successfully',
                    'audio' => [
                        'audioID' => $audioID,
                        'audioName' => $audioName,
                        'audioFile' => $relativeFilePath
                    ]
                ]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to add audio']);
            }

            $stmt->close();
        } else {
            error_log('Failed to move uploaded file.');
            echo json_encode(['status' => 'error', 'message' => 'Failed to upload file']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'audioName and audioFile are required']);
    }

    $conn->close();
}
?>
