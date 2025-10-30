<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    // Redirect to login if not logged in
    header("Location: index.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Banana Game</title>
    <link rel="stylesheet" href="styles.css">
    <script defer src="game.js"></script>
</head>
<body>
    <div class="game-container">
        <header>
            <h1>The Banana Game</h1>
            <div class="game-info">
                <p>Level: <span id="level">1</span></p>
                <p>Score: <span id="score">0</span></p>
                <p>Time: <span id="timer">60</span>s</p>
            </div>
        </header>
        <main>
            <div class="question-area">
                <img id="banana-image" src="" alt="Banana Challenge">
                <p id="challenge">Loading challenge...</p>
            </div>
            <div class="answer-area">
                <input type="text" id="answer" placeholder="Type your answer here">
                <button id="submit-answer">Submit</button>
            </div>
        </main>
        <footer>
            <button id="restart">Restart Game</button>
        </footer>
    </div>
<audio id="correct-sound" src="test/correct.mp3"></audio>
<audio id="incorrect-sound" src="test/incorrect.mp3"></audio>
<audio id="gameover-sound" src="test/gameover.mp3"></audio>

</body>
</html>