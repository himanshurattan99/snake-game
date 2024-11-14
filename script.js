import { addElements, move } from './utils.js';

// Get the Game Board element from the DOM
const gameBoard = document.getElementById('game-board');

// Create 16x16 Game Board Grid by adding 256 'div' elements with the class 'cell'
addElements(gameBoard, 'div', 256, 'cell');

// Get all cell elements
const cells = document.getElementsByClassName('cell');

// Set initial position of Snake head
let snakeHeadIndex = 119;
// Set Snake Head color
cells[snakeHeadIndex].style.background = '#00CE76';

// Set initial direction of Snake movement
let direction = 'top';

// Listen for arrow key presses to change Snake direction
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            direction = 'top';
            break;
        case "ArrowRight":
            direction = 'right';
            break;
        case "ArrowDown":
            direction = 'bottom';
            break;
        case "ArrowLeft":
            direction = 'left';
            break;
    }
});

// Start game loop - moves Snake every 0.25s
setInterval(() => {
    // Update Snake Head position
    snakeHeadIndex = move(cells, snakeHeadIndex, direction);
}, 250);