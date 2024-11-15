import { addElements, move, hasHitBoundary, setFoodIndex } from './utils.js';

// Get the Game Board element from the DOM and create 16x16 Game Board Grid (256 cells)
const gameBoard = document.getElementById('game-board');
addElements(gameBoard, 'div', 256, 'cell');
const cells = document.getElementsByClassName('cell');

// Initialize snake head position, food position, and movement direction
let snakeHeadIndex = 119;
let foodIndex = setFoodIndex(cells);
let direction = 'top';

// Listen for arrow key presses to change Snake direction
document.addEventListener("keydown", (event) => {
    const directions = { "ArrowUp": 'top', "ArrowRight": 'right', "ArrowDown": 'bottom', "ArrowLeft": 'left' };

    if (directions[event.key]) {
        direction = directions[event.key];
    }
});

// Main game loop: Moves the snake, checks for boundary collisions, and handles food consumption
const gameLoop = () => {
    // Check if Snake Head hits boundary
    if (!hasHitBoundary(snakeHeadIndex, direction)) {
        // Update Snake Head position
        snakeHeadIndex = move(cells, snakeHeadIndex, direction);

        // Check if Snake Head position matches Food position
        if (snakeHeadIndex === foodIndex) {
            // Update Food position
            foodIndex = setFoodIndex(cells);
        }
    }
    // Game over when Snake hits boundary
    else {
        clearInterval(intervalID);
    }
}

// Start game loop - moves Snake every 0.25s
const intervalID = setInterval(gameLoop, 250);