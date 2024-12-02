<?php
include('config.php');

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (isset($_GET['difficulty'])) {
    $difficulty = $_GET['difficulty'];

    // Debug: Check if parameter is received
    error_log("Difficulty received: " . $difficulty);

    $query = "SELECT questionID, question_text, option_a, option_b, option_c, option_d, correct_Option, difficulty 
              FROM questions WHERE difficulty = ?";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        die("Statement preparation failed: " . $conn->error);
    }

    $stmt->bind_param("s", $difficulty);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $questions = $result->fetch_all(MYSQLI_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($questions);
    } else {
        echo json_encode([]);
    }

    $stmt->close(); // Close the statement
} else {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(['error' => 'Difficulty parameter is required.']);
}

$conn->close(); // Close the connection
?>
