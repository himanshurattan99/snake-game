import { addElements } from './utils.js';

// Get the Game Board element from the DOM
const gameBoard = document.getElementById('game-board');

// Create 16x16 Game Board Grid by adding 256 'div' elements with the class 'cell'
addElements(gameBoard, 'div', 256, 'cell');