// Function to create multiple elements with a specified class and append to a parent element
export const addElements = (parentElement, elementName, count, className) => {
    for (let i = 0; i < count; i++) {
        const childElement = document.createElement(elementName);
        childElement.classList.add(className);
        parentElement.appendChild(childElement);
    }
}

// Function to move Snake in specified direction
export const move = (cells, gameState) => {
    // Clear Tail from previous index
    cells[gameState.snakeBody[gameState.snakeBody.length - 1]].style.background = '#292929';

    // Update each Snake segment to follow the one in front of it, starting from the Tail
    for (let i = gameState.snakeBody.length - 1; i > 0; i--) {
        gameState.snakeBody[i] = gameState.snakeBody[i - 1];
    }

    // Set movement values for each direction
    const movements = {
        top: -25,
        right: 1,
        bottom: 25,
        left: -1
    };

    // Update Snake Head Index
    gameState.snakeBody[0] = gameState.snakeBody[0] + movements[gameState.direction];

    // Update Snake Head and Body colors
    gameState.snakeBody.forEach((index, i) => {
        cells[index].style.background = (i === 0) ? '#00CE76' : '#00CE9E';
    });
}

// Function to check if snake head hits game boundaries
export const checkCollision = (gameState) => {
    const { snakeHeadIndex, snakeBody, direction } = gameState;
    const gridSize = 25;

    // Boundary collision checks
    const boundaryChecks = {
        top: snakeHeadIndex >= 0 && snakeHeadIndex < gridSize,
        right: (snakeHeadIndex + 1) % gridSize === 0,
        bottom: snakeHeadIndex >= 600 && snakeHeadIndex <= 624,
        left: snakeHeadIndex % gridSize === 0
    };

    // Check boundary collision
    if (boundaryChecks[direction]) {
        return true;
    }

    // Check if Snake has crossed itself (only when Snake length is more than 2)
    if (snakeBody.length > 2) {
        for (let i = 1; i < snakeBody.length; i++) {
            // Check if Snake Head crosses any Body segment
            if (snakeHeadIndex === snakeBody[i]) {
                return true;
            }
        }
    }

    return false;
}

// Function to place food at random position
export const setFoodIndex = (cells, gameState) => {
    let foodIndex;

    // Ensure Food does not spawn on Snake's Body
    do {
        // Generate random index between 0 and 624 (inclusive)
        foodIndex = Math.floor(Math.random() * 625);
    } while (gameState.snakeBody.includes(foodIndex));

    // Color new position
    cells[foodIndex].style.background = '#E62121';

    // Update Food Index
    gameState.foodIndex = foodIndex;
}