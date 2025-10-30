<?php
// Include the database configuration file
include 'config.php';


// Fetch top scores
$stmt = $pdo->query("SELECT users.username, scores.score FROM scores 
                     JOIN users ON scores.user_id = users.id 
                     ORDER BY scores.score DESC LIMIT 7");
$scores = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Add ranks
$rankedScores = [];
foreach ($scores as $index => $score) {
    $rankedScores[] = [
        'rank' => $index + 1,
        'name' => $score['username'],
        'score' => $score['score']
    ];
}

echo json_encode(['success' => true, 'scores' => $rankedScores]);
exit;
?>
