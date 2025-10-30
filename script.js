let timer;
let timeLeft = 60; // Initial time
let score = 0;
let level = 1;
let currentSolution = null; // Store the solution

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

// Fetch challenge from API
async function fetchChallenge() {
    try {
        const response = await fetch("http://marcconrad.com/uob/banana/api.php?out=json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.question && data.solution !== undefined) {
            bananaImage.src = data.question; // Set the question image
            currentSolution = parseInt(data.solution); // Store the correct solution
            challengeDisplay.textContent = "Solve the challenge!";
        } else {
            throw new Error("Invalid API response");
        }
    } catch (error) {
        console.error("Error fetching challenge:", error);
        challengeDisplay.textContent = "Failed to load challenge.";
        currentSolution = null; // Reset solution in case of error
        bananaImage.src = ""; // Clear image
    }
}

// Start a new game
async function startGame() {
    resetGame();
    await fetchChallenge();

    // Start timer
    if (timer) clearInterval(timer); // Clear any previous timer
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
        correctSound?.play(); // Play correct sound 
        score += 10;
        level++;
        timeLeft += 20; // Add bonus time
        scoreDisplay.textContent = score;
        levelDisplay.textContent = level;
        challengeDisplay.textContent = "Correct! Next challenge...";
        answerInput.value = ""; // Clear input field

        await fetchChallenge(); // Load the next challenge
    } else {
        incorrectSound?.play(); // Play incorrect sound 
        challengeDisplay.textContent = "Incorrect! Try again.";
        answerInput.value = ""; // Clear input field
    }
};

// End the game
function endGame() {
    clearInterval(timer); // Stop the timer
    gameOverSound?.play(); // Play game-over sound 
    challengeDisplay.textContent = `Game Over! Final Score: ${score}`;
    submitAnswerBtn.disabled = true;
    answerInput.disabled = true;
}

// Reset game state
function resetGame() {
    if (timer) clearInterval(timer); // Clear any existing timer
    timeLeft = 60;
    score = 0;
    level = 1;
    timerDisplay.textContent = timeLeft;
    scoreDisplay.textContent = score;
    levelDisplay.textContent = level;
    answerInput.disabled = false;
    submitAnswerBtn.disabled = false;
    answerInput.value = ""; // Clear the input field
    challengeDisplay.textContent = "Get ready!";
}

// Restart the game
restartBtn.onclick = startGame;

// Start the game on page load
window.onload = startGame;