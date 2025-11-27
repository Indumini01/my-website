let timer;
let timeLeft = 60; // Initial timer duration
let score = 0;
let level = 1;
let currentSolution = null; // Store the solution for validation

// Elements
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const challengeDisplay = document.getElementById("challenge");
const bananaImage = document.getElementById("banana-image");
const answerInput = document.getElementById("answer");
const submitAnswerBtn = document.getElementById("submit-answer");
const restartBtn = document.getElementById("restart");

const correctSound = document.getElementById("correct-sound");
const incorrectSound = document.getElementById("incorrect-sound");
const gameOverSound = document.getElementById("gameover-sound");

// Fetch random math challenge from API
async function fetchChallenge() {
    try {
        const response = await fetch("https://www.sanfoh.com/uob/banana/api.php");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.question && data.solution !== undefined) {
            bananaImage.src = data.question; // Set the challenge image
            currentSolution = parseInt(data.solution); // Store the solution
            challengeDisplay.textContent = "Solve the challenge!";
        } else {
            throw new Error("Invalid API response structure");
        }
    } catch (error) {
        console.error("Error fetching API:", error);
        bananaImage.src = ""; // Clear the image
        challengeDisplay.textContent = "Failed to load challenge.";
        currentSolution = null; // Reset solution
    }
}

// Start a new game
async function startGame() {
    resetGame();
    await fetchChallenge();

    // Timer countdown
    if (timer) clearInterval(timer); // Clear any existing timer before starting a new one
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

// Handle answer submission
submitAnswerBtn.onclick = async () => {
    const userAnswer = parseInt(answerInput.value.trim());
    
    if (isNaN(userAnswer)) {
        challengeDisplay.textContent = "Please enter a valid number!";
        return;
    }

    if (userAnswer === currentSolution) {
        // Correct answer logic
        correctSound?.play();
        score += 10;
        level++;
        scoreDisplay.textContent = score;
        levelDisplay.textContent = level;
        timeLeft += 20; // Reward extra time for correct answer
        challengeDisplay.textContent = "Correct! Next challenge...";
        answerInput.value = ""; // Clear input field

        // Fetch the next challenge
        await fetchChallenge();
    } else {
        // Incorrect answer logic
        incorrectSound?.play(); 
        challengeDisplay.textContent = "Incorrect! Try again.";
        answerInput.value = ""; // Clear input field
    }
};

// End the game and save the score
function endGame() {
    clearInterval(timer); // Stop the timer
    gameOverSound?.play(); 
    challengeDisplay.textContent = `Game Over! Final Score: ${score}`;
    submitAnswerBtn.disabled = true;
    answerInput.disabled = true;

    // Send the score to the server
    fetch("save_score.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ score }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                console.log("Score saved successfully!");
                window.location.href = "game_over.html"; // Redirect to Game Over page
            } else {
                console.error("Failed to save score:", data.message);
                alert("Failed to save score. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error saving score:", error);
            alert("An error occurred while saving the score.");
        });
}

// Reset game state
function resetGame() {
    timeLeft = 60;
    score = 0;
    level = 1;
    timerDisplay.textContent = timeLeft;
    scoreDisplay.textContent = score;
    levelDisplay.textContent = level;
    submitAnswerBtn.disabled = false;
    answerInput.disabled = false;
    challengeDisplay.textContent = "Loading challenge...";
    answerInput.value = ""; // Clear the input field
}

// Restart game
restartBtn.onclick = startGame;

// Start the game on page load
window.onload = startGame;


// Background slideshow
const backgrounds = [
    'bbanana1.jpg', // replace with your actual image paths
    'bbanana2.jpg',
];

let currentBg = 0;

function changeBackground() {
    document.body.style.backgroundImage = `url('${backgrounds[currentBg]}')`;
    currentBg = (currentBg + 1) % backgrounds.length;
}

// Initial background
changeBackground();

// Change background every 5 seconds
setInterval(changeBackground, 5000);

