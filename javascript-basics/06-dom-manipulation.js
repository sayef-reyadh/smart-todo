// ============================================
// DOM MANIPULATION
// ============================================
// NOTE: This file demonstrates DOM concepts for browser environment
// Some methods require HTML document and will not work in Node.js terminal
// This is for reference and learning purposes

console.log("--- DOM Manipulation Concepts ---");
console.log("This demonstrates DOM concepts that work in browsers");
console.log("Run this in a browser console or with HTML file for full functionality\n");

// 1. Selecting Elements (Browser Only)
console.log("--- Selecting Elements ---");
console.log(`
// getElementById - select by ID
const element = document.getElementById('myId');

// querySelector - select first matching element
const elem = document.querySelector('.myClass');

// querySelectorAll - select all matching elements
const elements = document.querySelectorAll('p');

// getElementsByClassName
const items = document.getElementsByClassName('item');

// getElementsByTagName
const paragraphs = document.getElementsByTagName('p');
`);

// 2. Creating Elements (Browser Only)
console.log("\n--- Creating Elements ---");
console.log(`
// createElement - create new element
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World';

// appendChild - add as last child
document.body.appendChild(newDiv);

// insertBefore - insert before specific element
const parent = document.getElementById('container');
parent.insertBefore(newDiv, parent.firstChild);

// insertAdjacentHTML - insert HTML string
element.insertAdjacentHTML('beforeend', '<p>New paragraph</p>');
`);

// 3. Modifying Content (Browser Only)
console.log("\n--- Modifying Content ---");
console.log(`
// textContent - set/get text only
element.textContent = 'New text';

// innerHTML - set/get HTML content
element.innerHTML = '<strong>Bold text</strong>';

// innerText - set/get rendered text
element.innerText = 'Visible text';

// value - for form inputs
input.value = 'new value';
`);

// 4. Modifying Attributes (Browser Only)
console.log("\n--- Modifying Attributes ---");
console.log(`
// setAttribute - set attribute
element.setAttribute('data-id', '123');

// getAttribute - get attribute
const id = element.getAttribute('data-id');

// removeAttribute - remove attribute
element.removeAttribute('disabled');

// Direct property assignment
element.id = 'newId';
element.className = 'active';
element.title = 'Tooltip text';
`);

// 5. Modifying Styles (Browser Only)
console.log("\n--- Modifying Styles ---");
console.log(`
// Inline styles
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.fontSize = '18px';

// classList - manage CSS classes
element.classList.add('active');
element.classList.remove('disabled');
element.classList.toggle('highlight');
element.classList.contains('active'); // true/false

// Set multiple styles
Object.assign(element.style, {
    color: 'white',
    backgroundColor: 'black',
    padding: '10px'
});
`);

// 6. Navigating DOM Tree (Browser Only)
console.log("\n--- DOM Tree Navigation ---");
console.log(`
// Parent and children
const parent = element.parentElement;
const children = element.children;
const firstChild = element.firstElementChild;
const lastChild = element.lastElementChild;

// Siblings
const next = element.nextElementSibling;
const prev = element.previousElementSibling;

// Get all descendants
const all = element.querySelectorAll('*');
`);

// 7. Removing Elements (Browser Only)
console.log("\n--- Removing Elements ---");
console.log(`
// remove - remove element from DOM
element.remove();

// removeChild - remove specific child
parent.removeChild(element);

// replaceChild - replace element
parent.replaceChild(newElement, oldElement);
`);

// 8. Cloning Elements (Browser Only)
console.log("\n--- Cloning Elements ---");
console.log(`
// cloneNode - clone element
const clone = element.cloneNode(false); // shallow clone
const deepClone = element.cloneNode(true); // deep clone
`);

// 9. Document Object Methods (Browser Only)
console.log("\n--- Document Methods ---");
console.log(`
// Query the document
const element = document.getElementById('main');

// Access document properties
console.log(document.title);
console.log(document.URL);
console.log(document.domain);

// Access body and head
const body = document.body;
const head = document.head;

// Create document fragment
const fragment = document.createDocumentFragment();
fragment.appendChild(element1);
fragment.appendChild(element2);
document.body.appendChild(fragment);
`);

// 10. Common DOM Patterns (Browser Only)
console.log("\n--- Common Patterns ---");
console.log(`
// Update element content
function updateContent(elementId, newContent) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = newContent;
    }
}

// Toggle class
function toggleClass(elementId, className) {
    const element = document.getElementById(elementId);
    element.classList.toggle(className);
}

// Create and add element
function createAndAddElement(parentId, tagName, content) {
    const parent = document.getElementById(parentId);
    const newElement = document.createElement(tagName);
    newElement.textContent = content;
    parent.appendChild(newElement);
    return newElement;
}

// Clear all children
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
`);

// 11. Performance Tips (Browser Only)
console.log("\n--- Performance Tips ---");
console.log(`
// Batch DOM updates
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const item = document.createElement('div');
    item.textContent = i;
    fragment.appendChild(item);
}
document.body.appendChild(fragment);

// Cache element references
const cached = document.getElementById('main');
cached.style.color = 'red';
cached.style.fontSize = '16px';

// Use event delegation instead of multiple listeners
parent.addEventListener('click', (e) => {
    if (e.target.matches('.item')) {
        console.log('Item clicked');
    }
});
`);

console.log("\n✓ DOM Manipulation concepts explained!");
console.log("Note: For practical DOM examples, create an HTML file with this script tag:");
console.log("<script src='06-dom-manipulation.js'></script>");
