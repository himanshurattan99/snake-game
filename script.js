import { addElements, move, checkCollision, setFoodIndex } from './utils.js';

// Game Board DOM elements
const gameBoard = document.getElementById('game-board');
const cells = document.getElementsByClassName('cell');
const gameInfo = document.getElementById('game-info');
const scoreElement = document.getElementById('score-value');
const highScoreElement = document.getElementById('high-score-value');
const levelElement = document.getElementById('level');
const gameStartOverlay = document.getElementById('game-start-overlay');
const gameOverOverlay = document.getElementById('game-over-overlay');
const finalScoreElement = document.getElementById('final-score');

// Game State object to track game properties
let gameState = {};

// Game Sounds
const gameSounds = {
    background: new Audio('./assets/background.mp3'),
    eat: new Audio('./assets/eat.mp3'),
    turn: new Audio('./assets/turn.mp3'),
    gameOver: new Audio('./assets/gameOver.mp3')
};

// Function to set up Game Board and set sound volumes
const initializeGame = () => {
    const gridSize = 25;
    addElements(gameBoard, 'div', gridSize ** 2, 'cell');

    Object.values(gameSounds).forEach(sound => sound.volume = 0.5);
}

// Function to Start or Restart Game
const startGame = () => {
    // Set Game Board
    Array.from(cells).forEach(cell => {
        cell.style.background = '#292929';
    });

    // Set initial Snake Head position
    cells[312].style.background = '#00CE76';

    // Remove border from previous Snake Head position on game restart
    if (gameState.snakeHeadIndex || gameState.snakeHeadIndex === 0) {
        cells[gameState.snakeHeadIndex].style.border = 'none';
    }

    // Set Game State
    gameState = {
        snakeHeadIndex: 312,
        snakeBody: [312],
        foodIndex: null,
        direction: 'top',
        score: 0,
        highScore: localStorage.getItem('snakeHighScore') || 0,
        isGameActive: true,
        intervalTime: 250,
        intervalID: null
    };

    // Set Food Index
    setFoodIndex(cells, gameState);

    // Set Score, High Score display, and Game Info background
    scoreElement.innerText = 0;
    highScoreElement.innerText = gameState.highScore;
    gameInfo.style.background = '#0076CE';

    // Hide game start and game over overlay
    gameStartOverlay.style.opacity = 0;
    gameOverOverlay.style.opacity = 0;

    // Start game loop
    gameState.intervalID = setInterval(gameLoop, gameState.intervalTime);
};

// Function to End Game
const endGame = () => {
    gameSounds.gameOver.play();

    // Restore Snake Head color and highlight it with red border
    cells[gameState.snakeHeadIndex].style.background = '#00CE76';
    cells[gameState.snakeHeadIndex].style.border = 'solid 0.125rem #E62121';

    // Change Game Info background to red
    gameInfo.style.background = '#E62121';

    // Update High Score if current Score is higher
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        localStorage.setItem('snakeHighScore', gameState.highScore);
        highScoreElement.innerText = gameState.highScore;
    }

    // Display game over overlay and update final score on it
    gameOverOverlay.style.opacity = 1;
    finalScoreElement.innerText = gameState.score;

    // Change game active status
    gameState.isGameActive = false;

    clearInterval(gameState.intervalID);
}

// Function to increase Game speed based on Score
const adjustGameSpeed = () => {
    let prevIntervalTime = gameState.intervalTime;

    if (gameState.score >= 10 && gameState.score < 15) {
        gameState.intervalTime = 200;
        levelElement.innerText = 2;
    } else if (gameState.score >= 15 && gameState.score < 20) {
        gameState.intervalTime = 150;
        levelElement.innerText = 3;
    }
    else if (gameState.score >= 20 && gameState.score < 25) {
        gameState.intervalTime = 100;
        levelElement.innerText = 4;
    }
    else if (gameState.score >= 25) {
        gameState.intervalTime = 50;
        levelElement.innerText = 5;
    }

    // Reset game loop with new speed if interval time changed
    if (gameState.intervalTime !== prevIntervalTime) {
        clearInterval(gameState.intervalID);
        gameState.intervalID = setInterval(gameLoop, gameState.intervalTime);
    }
};

// Handle keyboard input for game control
document.addEventListener("keydown", (event) => {
    // Start or restart game if not currently running
    if (!gameState.isGameActive) {
        gameSounds.background.play();
        startGame();
        return;
    }

    const directions = { "ArrowUp": 'top', "ArrowRight": 'right', "ArrowDown": 'bottom', "ArrowLeft": 'left' };
    const oppositeDirections = { "top": 'bottom', "bottom": 'top', "left": 'right', "right": 'left' };

    // Change direction if new direction is not opposite of current direction
    if (directions[event.key] && directions[event.key] !== oppositeDirections[gameState.direction]) {
        gameSounds.turn.play();
        gameState.direction = directions[event.key];
    }
});

// Main game loop
const gameLoop = () => {
    // Check if Snake Head hits boundary
    if (checkCollision(gameState)) {
        endGame();
    } else {
        // Move Snake in current direction and update new Snake Head position
        move(cells, gameState);
        gameState.snakeHeadIndex = gameState.snakeBody[0];

        // Check if Snake Head position matches Food position
        if (gameState.snakeHeadIndex === gameState.foodIndex) {
            gameSounds.eat.play();

            // Increase Score
            gameState.score += 1;
            scoreElement.innerText = gameState.score;

            adjustGameSpeed();

            // Grow Snake by duplicating last Body segment
            gameState.snakeBody.push(gameState.snakeBody[gameState.snakeBody.length - 1]);

            // Update Food position
            setFoodIndex(cells, gameState);
        }
    }
}

// Initialize the game on page load
initializeGame();