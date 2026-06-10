// ============================================
// EVENT HANDLING
// ============================================
// NOTE: This file demonstrates Event Handling concepts for browser environment
// Most examples require HTML and will not work in Node.js terminal
// This is for reference and learning purposes

console.log("--- Event Handling Concepts ---");
console.log("This demonstrates Event concepts that work in browsers\n");

// 1. Basic Event Listeners (Browser Only)
console.log("--- Basic Event Listeners ---");
console.log(`
// addEventListener - register event handler
const button = document.getElementById('myButton');
button.addEventListener('click', function(event) {
    console.log('Button clicked!');
    console.log(event);
});

// Multiple events
button.addEventListener('mouseenter', () => {
    console.log('Mouse entered');
});

button.addEventListener('mouseleave', () => {
    console.log('Mouse left');
});

// Remove event listener
function handleClick(event) {
    console.log('Clicked');
}
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);
`);

// 2. Common Browser Events (Browser Only)
console.log("\n--- Common Browser Events ---");
console.log(`
// Mouse Events
- click: element clicked
- dblclick: element double-clicked
- mouseenter: mouse enters element
- mouseleave: mouse leaves element
- mousemove: mouse moves
- mousedown: mouse button pressed
- mouseup: mouse button released

// Keyboard Events
- keydown: key pressed (fires repeatedly)
- keyup: key released
- keypress: character entered (deprecated)

// Form Events
- submit: form submitted
- change: input value changed
- input: input value changing (real-time)
- focus: input focused
- blur: input loses focus

// Window Events
- load: page loaded
- unload: page unloading
- resize: window resized
- scroll: page scrolled
`);

// 3. Event Object (Browser Only)
console.log("\n--- Event Object ---");
console.log(`
// Event object contains information about the event
element.addEventListener('click', (event) => {
    console.log(event.type);           // 'click'
    console.log(event.target);         // clicked element
    console.log(event.currentTarget);  // element listener attached to
    console.log(event.timeStamp);      // when event occurred
    console.log(event.clientX);        // mouse X position
    console.log(event.clientY);        // mouse Y position
    console.log(event.key);            // keyboard key pressed
    console.log(event.keyCode);        // keyboard key code
});
`);

// 4. Event.preventDefault and Event.stopPropagation (Browser Only)
console.log("\n--- Event Methods ---");
console.log(`
// preventDefault - stop default behavior
form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent form submission
    console.log('Form submit prevented');
});

link.addEventListener('click', (event) => {
    event.preventDefault(); // prevent link navigation
});

// stopPropagation - stop event from bubbling
inner.addEventListener('click', (event) => {
    event.stopPropagation(); // prevents parent click handlers
});

// stopImmediatePropagation - stop all handlers
element.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    console.log('First handler');
});

element.addEventListener('click', () => {
    console.log('This won\'t execute'); // won't run
});
`);

// 5. Event Delegation (Browser Only)
console.log("\n--- Event Delegation ---");
console.log(`
// Single listener for multiple elements
const list = document.getElementById('myList');

list.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        console.log('List item clicked:', event.target.textContent);
        event.target.classList.add('selected');
    }
});

// Alternative: using matches()
list.addEventListener('click', (event) => {
    if (event.target.matches('li.item')) {
        console.log('Item clicked');
    }
});
`);

// 6. Form Event Handling (Browser Only)
console.log("\n--- Form Events ---");
console.log(`
// Form submission
const form = document.getElementById('myForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);
    
    // Send data to server
    fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
});

// Input change
const input = document.getElementById('myInput');
input.addEventListener('change', (event) => {
    console.log('Final value:', event.target.value);
});

input.addEventListener('input', (event) => {
    console.log('Typing:', event.target.value);
});

// Input focus and blur
input.addEventListener('focus', () => {
    console.log('Input focused');
});

input.addEventListener('blur', () => {
    console.log('Input lost focus');
});
`);

// 7. Keyboard Events (Browser Only)
console.log("\n--- Keyboard Events ---");
console.log(`
// Key handling
document.addEventListener('keydown', (event) => {
    console.log('Key pressed:', event.key);
    console.log('Key code:', event.keyCode);
    
    // Check for specific keys
    if (event.key === 'Enter') {
        console.log('Enter pressed');
    }
    
    // Check for modifiers
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        console.log('Ctrl+S pressed');
    }
    
    // Keyboard shortcuts
    if (event.altKey && event.key === 'q') {
        console.log('Alt+Q pressed');
    }
});

// Common modifier keys
// event.ctrlKey (or metaKey on Mac)
// event.altKey
// event.shiftKey
`);

// 8. Mouse Events (Browser Only)
console.log("\n--- Mouse Events ---");
console.log(`
// Mouse position
document.addEventListener('mousemove', (event) => {
    console.log('X:', event.clientX, 'Y:', event.clientY);
    console.log('PageX:', event.pageX, 'PageY:', event.pageY);
});

// Mouse buttons
element.addEventListener('mousedown', (event) => {
    if (event.button === 0) console.log('Left click');
    if (event.button === 1) console.log('Middle click');
    if (event.button === 2) console.log('Right click');
});

// Mouse wheel
element.addEventListener('wheel', (event) => {
    event.preventDefault();
    console.log('Scroll direction:', event.deltaY > 0 ? 'down' : 'up');
});
`);

// 9. Touch Events (Browser Only - for mobile)
console.log("\n--- Touch Events ---");
console.log(`
// Touch handling
element.addEventListener('touchstart', (event) => {
    console.log('Touches:', event.touches.length);
    const touch = event.touches[0];
    console.log('Touch X:', touch.clientX, 'Y:', touch.clientY);
});

element.addEventListener('touchmove', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    console.log('Dragging:', touch.clientX);
});

element.addEventListener('touchend', (event) => {
    console.log('Touch ended');
});
`);

// 10. Window and Document Events (Browser Only)
console.log("\n--- Window/Document Events ---");
console.log(`
// Page lifecycle
window.addEventListener('load', () => {
    console.log('Page fully loaded');
});

window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    return 'Are you sure you want to leave?';
});

window.addEventListener('unload', () => {
    console.log('Page unloading');
});

// Window resize
window.addEventListener('resize', () => {
    console.log('Window size:', window.innerWidth, window.innerHeight);
});

// Page scroll
window.addEventListener('scroll', () => {
    console.log('Scroll position:', window.scrollY);
});

// Document ready (modern approach)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded');
    });
} else {
    console.log('DOM already loaded');
}
`);

// 11. Event Bubbling and Capturing (Browser Only)
console.log("\n--- Event Bubbling and Capturing ---");
console.log(`
// Bubbling (default) - event bubbles up from child to parent
outer.addEventListener('click', () => console.log('Outer - bubbling'));
inner.addEventListener('click', () => console.log('Inner - bubbling'));
// Output: Inner - bubbling, Outer - bubbling

// Capturing - event travels down from parent to child
outer.addEventListener('click', () => console.log('Outer - capturing'), true);
inner.addEventListener('click', () => console.log('Inner - capturing'), true);
// Output: Outer - capturing, Inner - capturing
`);

// 12. Custom Events (Browser Only)
console.log("\n--- Custom Events ---");
console.log(`
// Create and dispatch custom event
const customEvent = new CustomEvent('myEvent', {
    detail: { message: 'Event data' }
});

element.addEventListener('myEvent', (event) => {
    console.log('Custom event fired:', event.detail.message);
});

element.dispatchEvent(customEvent);

// Simpler approach
element.addEventListener('myEvent', (event) => {
    console.log('Data:', event.detail);
});

element.dispatchEvent(new CustomEvent('myEvent', {
    detail: { id: 1, name: 'Item' }
}));
`);

// 13. Practical Event Handling Examples (Browser Only)
console.log("\n--- Practical Examples ---");
console.log(`
// Toggle visibility on button click
button.addEventListener('click', () => {
    element.style.display = element.style.display === 'none' ? 'block' : 'none';
});

// Form validation
form.addEventListener('submit', (event) => {
    if (!input.value.trim()) {
        event.preventDefault();
        input.style.borderColor = 'red';
    }
});

// Search with debounce
let debounceTimer;
searchInput.addEventListener('input', (event) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        console.log('Searching for:', event.target.value);
    }, 500);
});

// Click outside to close
document.addEventListener('click', (event) => {
    if (!menu.contains(event.target)) {
        menu.classList.remove('open');
    }
});
`);

console.log("\n✓ Event Handling concepts explained!");
console.log("Note: Create an HTML file with this script to test events.");
