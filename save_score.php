<?php
// Include the database configuration file
include 'config.php';

session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decode JSON data
    $input = json_decode(file_get_contents('php://input'), true);
    $score = $input['score'] ?? 0;
    $userId = $_SESSION['user_id'] ?? null;

    if ($userId && is_numeric($score)) {
        try {
            // Database connection
            $pdo = new PDO('mysql:host=localhost;dbname=math_game', 'root', '');
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Insert score into the database
            $stmt = $pdo->prepare("INSERT INTO scores (user_id, score) VALUES (:user_id, :score)");
            $stmt->execute(['user_id' => $userId, 'score' => $score]);

            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid user or score']);
    }
    exit;
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}
