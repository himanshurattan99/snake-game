// Function to create multiple elements with a specified class and append to a parent element
export const addElements = (parentElement, elementName, count, className) => {
    // Create specified number of elements with given class
    for (let i = 0; i < count; i++) {
        const childElement = document.createElement(elementName);
        childElement.classList.add(className);

        // Add each element to a parent element
        parentElement.appendChild(childElement);
    }
}