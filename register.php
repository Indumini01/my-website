<?php
ob_start(); // prevents header errors

include 'config.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (!isset($_POST['username'], $_POST['password'])) {
        die("Invalid form submission.");
    }

    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    if ($username === "" || $password === "") {
        die("Username and password are required!");
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $hashedPassword);

    if ($stmt->execute()) {
        header("Location: index.html");
        exit();
    } else {
        die("SQL Error: " . $stmt->error);
    }
}
?>
