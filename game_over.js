// Fetch top players and display on the Game Over page
fetch("get_scores.php")
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const topPlayers = data.scores;
            const scoreboardBody = document.getElementById("scoreboard-body");

            // Ensure the scoreboard body exists
            if (scoreboardBody) {
                // Clear any existing rows
                scoreboardBody.innerHTML = "";

                // Populate the table with top player scores
                topPlayers.forEach(player => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${player.rank}</td>
                        <td>${player.name}</td>
                        <td>${player.score}</td>
                    `;
                    scoreboardBody.appendChild(row);
                });
            }
        } else {
            console.error("Failed to load scores:", data.message);
            alert("Error loading scores. Please try again later.");
        }
    })
    .catch(error => {
        console.error("Error fetching scores:", error);
        alert("Error fetching scores. Please try again later.");
    });

// Display the player's final score
const playerScoreElement = document.getElementById("player-score");
if (playerScoreElement) {
    const finalScore = localStorage.getItem("finalScore") || 0; // Replace 0 with a default score if needed
    playerScoreElement.textContent = finalScore;
}

// Restart game logic
function restartGame() {
    // Redirect to the game's main page
    window.location.href = "game.php";
}
