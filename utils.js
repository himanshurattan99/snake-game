// Function to create multiple elements with a specified class and append to a parent element
export const addElements = (parentElement, elementName, count, className) => {
    // Create specified number of elements with given class
    for (let i = 0; i < count; i++) {
        const childElement = document.createElement(elementName);
        childElement.classList.add(className);

        // Add each element to parent element
        parentElement.appendChild(childElement);
    }
}

// Function to move Snake in specified direction
export const move = (cells, snakeBody, direction) => {
    // Clear Tail from previous index
    cells[snakeBody[snakeBody.length - 1]].style.background = '#292929';

    // Update each Snake segment to follow the one in front of it, starting from the Tail
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    // Set movement values for each direction
    const movements = {
        top: -16,
        right: 1,
        bottom: 16,
        left: -1
    };

    // Update Snake Head Index
    snakeBody[0] = snakeBody[0] + movements[direction];

    // Update Snake Head and Body colors
    snakeBody.forEach((index, i) => {
        cells[index].style.background = (i === 0) ? '#00CE76' : '#00CE9E';
    });

    // Return new Snake Head Index
    return snakeBody[0];
}

// Function to check if snake head hits game boundaries
export const checkCollision = (snakeBody, direction) => {
    // Check top boundary
    if (direction === 'top') {
        if (0 <= snakeBody[0] && snakeBody[0] <= 15) {
            return true;
        }
    }
    // Check right boundary
    else if (direction === 'right') {
        if ((snakeBody[0] + 1) % 16 === 0) {
            return true;
        }
    }
    // Check bottom boundary
    else if (direction === 'bottom') {
        if (240 <= snakeBody[0] && snakeBody[0] <= 255) {
            return true;
        }
    }
    // Check left boundary
    else if (direction === 'left') {
        if (snakeBody[0] % 16 === 0) {
            return true;
        }
    }

    // Check if Snake has crossed itself (only when Snake length is more than 2)
    if (snakeBody.length > 2) {
        for (let i = 1; i < snakeBody.length; i++) {
            // Check if Snake Head crosses any Body segment
            if (snakeBody[0] === snakeBody[i]) {
                return true;
            }
        }
    }

    return false;
}

// Function to place food at random position
export const setFoodIndex = (cells, snakeBody) => {
    let foodIndex;

    // Ensure Food does not spawn on Snake's Body
    do {
        // Generate random index between 0 and 255 (inclusive)
        foodIndex = Math.floor(Math.random() * 256);
    } while (snakeBody.includes(foodIndex));

    // Color new position
    cells[foodIndex].style.background = '#E62121';

    // Return the new food index
    return foodIndex;
}