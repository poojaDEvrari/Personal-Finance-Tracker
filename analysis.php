<?php
session_start();

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "finance_tracker";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Assuming you have a user ID stored in the session
$user_id = $_SESSION['user_id'];

// Query to fetch income and expense data with descriptions for the logged-in user
$sql = "SELECT type, description, SUM(amount) as total_amount FROM transactions WHERE user_id = ? GROUP BY type, description";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$data = array();
if ($result->num_rows > 0) {
    // Fetch data
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Close connection
$stmt->close();
$conn->close();

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($data);
?>