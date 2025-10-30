<?php
// Include the database configuration file
include 'config.php';

// Start a session to store user data
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get user input
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check if the username exists in the database
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        // Fetch the user record
        $user = $result->fetch_assoc();

        // Verify the password
        if (password_verify($password, $user['password'])) {
            // Store user data in session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            // Redirect to the game page
            header("Location: game.html");
            exit();
        } else {
            echo "Incorrect password!";
        }
    } else {
        echo "Username does not exist!";
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request method.";
}
?>