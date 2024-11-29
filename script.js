import { addElements, move, checkCollision, setFoodIndex } from './utils.js';

// Get the Game Board element from the DOM and create 16x16 Game Board Grid (256 cells)
const gameBoard = document.getElementById('game-board');
addElements(gameBoard, 'div', 256, 'cell');

// Select Game Board elements
const cells = document.getElementsByClassName('cell');
const gameInfo = document.getElementById('game-info');
const scoreElement = document.getElementById('score-value');
const highScoreElement = document.getElementById('high-score-value');

// Initialize Game Variables
let snakeHeadIndex = 119;
let snakeBody = [snakeHeadIndex];
let foodIndex = setFoodIndex(cells, snakeBody);
let direction = 'top';
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;

// Initialize High Score display
highScoreElement.innerText = highScore;

// Listen for arrow key presses to change Snake direction
document.addEventListener("keydown", (event) => {
    const directions = { "ArrowUp": 'top', "ArrowRight": 'right', "ArrowDown": 'bottom', "ArrowLeft": 'left' };

    const oppositeDirections = { "top": 'bottom', "bottom": 'top', "left": 'right', "right": 'left' };

    // Check if new direction is not opposite of current direction
    if (directions[event.key] && directions[event.key] !== oppositeDirections[direction]) {
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

        clearInterval(intervalID);
    }
}

// Start game loop - moves Snake every 0.25s
const intervalID = setInterval(gameLoop, 250);