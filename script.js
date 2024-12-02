import { addElements, move, checkCollision, setFoodIndex } from './utils.js';

// Get the Game Board element from the DOM and create 25x25 Game Board Grid (625 cells)
const gameBoard = document.getElementById('game-board');
addElements(gameBoard, 'div', 625, 'cell');

// Select Game Board elements
const cells = document.getElementsByClassName('cell');
const gameInfo = document.getElementById('game-info');
const scoreElement = document.getElementById('score-value');
const highScoreElement = document.getElementById('high-score-value');
const gameStartOverlay = document.getElementById('game-start-overlay');
const gameOverOverlay = document.getElementById('game-over-overlay');
const finalScoreElement = document.getElementById('final-score');

// Initialize Game Variables and Constants
let snakeHeadIndex = 312;
let snakeBody = [snakeHeadIndex];
let foodIndex = setFoodIndex(cells, snakeBody);
let direction = 'top';
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let isGameActive = false;
let intervalID;
const backgroundMusic = new Audio('./assets/background.mp3');
const eatSound = new Audio('./assets/eat.mp3');
const turnSound = new Audio('./assets/turn.mp3');;
const gameOverSound = new Audio('./assets/gameOver.mp3');

// Initialize High Score display
highScoreElement.innerText = highScore;

// Configure sound volumes
backgroundMusic.volume = 0.5;
eatSound.volume = 0.5;

// Reset game state
const resetGame = () => {
    // Reset Snake Head color and border, Game Info background and score display
    cells[snakeHeadIndex].style.background = '#00CE76';
    cells[snakeHeadIndex].style.border = 'none';
    gameInfo.style.background = '#0076CE';
    scoreElement.innerText = 0;

    // Reset Game Board
    Array.from(cells).forEach(cell => {
        cell.style.background = '#292929';
    });

    // Reset Game Variables
    snakeHeadIndex = 312;
    snakeBody = [snakeHeadIndex];
    foodIndex = setFoodIndex(cells, snakeBody);
    direction = 'top';
    score = 0;
    isGameActive = true;

    // Hide game start and game over overlay
    gameStartOverlay.style.opacity = 0;
    gameOverOverlay.style.opacity = 0;

    // Restart game loop
    intervalID = setInterval(gameLoop, 250);
};

// Listen for arrow key presses to restart the game (if over) and change Snake direction during gameplay
document.addEventListener("keydown", (event) => {
    // If game is over, restart on any key press
    if (!isGameActive) {
        // Play background music during the game
        backgroundMusic.play();

        resetGame();
        return;
    }

    const directions = { "ArrowUp": 'top', "ArrowRight": 'right', "ArrowDown": 'bottom', "ArrowLeft": 'left' };

    const oppositeDirections = { "top": 'bottom', "bottom": 'top', "left": 'right', "right": 'left' };

    // Check if new direction is not opposite of current direction
    if (directions[event.key] && directions[event.key] !== oppositeDirections[direction]) {
        // Sound effect played when snake changes direction
        turnSound.play();

        direction = directions[event.key];
    }
});

// Main game loop: Handles Snake movement, collision detection, Food consumption, Snake growth, and game over conditions
const gameLoop = () => {
    // Check if Snake Head hits boundary
    if (!checkCollision(snakeBody, direction)) {
        // Move Snake in current direction and get new Snake Head position
        snakeHeadIndex = move(cells, snakeBody, direction);

        // Check if Snake Head position matches Food position
        if (snakeHeadIndex === foodIndex) {
            // Sound effect played when snake eats food
            eatSound.play();

            // Increase Score
            score++;
            scoreElement.innerText = score;

            // Grow Snake by duplicating last Body segment when Food is eaten
            snakeBody.push(snakeBody[snakeBody.length - 1]);

            // Update Food position
            foodIndex = setFoodIndex(cells, snakeBody);
        }
    }
    // Game over when Snake hits boundary or crosses itself
    else {
        // Sound effect played when the game ends
        gameOverSound.play();

        // Restore Snake Head color and highlight it with red border
        cells[snakeHeadIndex].style.background = '#00CE76';
        cells[snakeHeadIndex].style.border = 'solid 0.125rem #E62121';

        // Change Game Info background to red
        gameInfo.style.background = '#E62121';

        // Update High Score if current Score is higher
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('snakeHighScore', highScore);
            highScoreElement.innerText = highScore;
        }

        // Display game over overlay and update final score on it
        gameOverOverlay.style.opacity = 1;
        finalScoreElement.innerText = score;

        // Change game active status
        isGameActive = false;

        clearInterval(intervalID);
    }
}