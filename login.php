<?php
session_start();
include "config.php";

$error_message = null;

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = $_POST["username"];
    $password = $_POST["password"];

    // Check if username exists
    $query = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $query->execute([$username]);

    if ($query->rowCount() == 0) {
        $error_message = "Username does not exist!";
    } else {
        $user = $query->fetch();

        if (password_verify($password, $user["password"])) {
            $_SESSION["user_id"] = $user["id"];
            header("Location: game.php");
            exit;
        } else {
            $error_message = "Incorrect password!";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Banana Game</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="login-container">
        <h1>The Banana Game</h1>

        <!-- ERROR MESSAGE BOX -->
        <?php if ($error_message): ?>
        <div class="alert-box">
            <?php echo $error_message; ?>
        </div>
        <?php endif; ?>

        <form action="login.php" method="post">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required>

            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>

            <button type="submit">Login</button>
        </form>

        <div class="register-container">
            <p>Don't have an account?</p>
            <a href="register.html" class="register-button">Register</a>
        </div>
    </div>
</body>
</html>
