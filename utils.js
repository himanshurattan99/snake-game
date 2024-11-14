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

// Function to move snake in specified direction
export const move = (cells, index, direction) => {
    // Clear current position
    cells[index].style.background = `#292929`;

    // Update snake head position based on direction
    if (direction === 'top') {
        index = index - 16;
    }
    else if (direction === 'right') {
        index = index + 1;
    }
    else if (direction === 'bottom') {
        index = index + 16;
    }
    else if (direction === 'left') {
        index = index - 1;
    }

    // Color new position
    cells[index].style.background = '#00CE76';

    // Return the new snake head index
    return index;
}

// Function to check if snake head hits game boundaries
export const hasHitBoundary = (index, direction) => {
    // Check top boundary
    if (direction === 'top') {
        if (0 <= index && index <= 15) {
            return true;
        }
    }
    // Check right boundary
    else if (direction === 'right') {
        if ((index + 1) % 16 === 0) {
            return true;
        }
    }
    // Check bottom boundary
    else if (direction === 'bottom') {
        if (240 <= index && index <= 255) {
            return true;
        }
    }
    // Check left boundary
    else if (direction === 'left') {
        if (index % 16 === 0) {
            return true;
        }
    }
}