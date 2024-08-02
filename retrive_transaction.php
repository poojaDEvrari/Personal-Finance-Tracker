<?php
session_start();

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

$user_id = $_SESSION['user_id'];  // Assuming you have user session data

// Calculate the date 30 days ago
$date_30_days_ago = date('Y-m-d H:i:s', strtotime('-30 days'));

// Fetch transactions from the last 30 days
$sql = "SELECT * FROM transactions WHERE user_id = '$user_id' AND date > '$date_30_days_ago'";
$result = $conn->query($sql);

$transactions = [];
$total_income = 0;
$total_expense = 0;

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $transactions[] = $row;
        if ($row['type'] == 'income') {
            $total_income += $row['amount'];
        } else {
            $total_expense += $row['amount'];
        }
    }
}

$balance = $total_income - $total_expense;

echo "<p>Current Balance: $" . number_format($balance, 2) . "</p>";
echo "<table id='transaction-table'>
        <thead>
            <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>";

foreach ($transactions as $transaction) {
    echo "<tr>
            <td>" . date('Y-m-d', strtotime($transaction['date'])) . "</td>
            <td>" . htmlspecialchars($transaction['description']) . "</td>
            <td>" . htmlspecialchars($transaction['type']) . "</td>
            <td>" . number_format($transaction['amount'], 2) . "</td>
          </tr>";
}

echo "</tbody>
      </table>";

$conn->close();
?>
