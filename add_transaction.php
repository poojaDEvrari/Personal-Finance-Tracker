<?php
session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo "Error: User not logged in.";
    exit;
}

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

// Get POST data
$type = $_POST['type'];
$description = $_POST['description'];
$amount = $_POST['amount'];
$date = date('Y-m-d H:i:s');
$user_id = $_SESSION['user_id'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO transactions (user_id, type, description, amount, date) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("issss", $user_id, $type, $description, $amount, $date);

if ($stmt->execute() === TRUE) {
    echo "Transaction added successfully";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
