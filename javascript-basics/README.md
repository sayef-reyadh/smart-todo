# JavaScript Basics Tutorial Guide

This folder contains comprehensive JavaScript tutorials covering fundamental to advanced concepts.

## Files Overview

1. **01-fundamentals.js** - JavaScript Fundamentals
   - Basic output and syntax
   - Arithmetic operations
   - Comparison and logical operators
   - Type checking

2. **02-variables.js** - Variables and Scope
   - Variable declaration (var, let, const)
   - Scope (global, block, function)
   - Hoisting
   - Data types and type conversion

3. **03-functions.js** - Functions
   - Function declaration and expressions
   - Arrow functions
   - Parameters and arguments
   - Closures and callbacks

4. **04-arrays.js** - Arrays
   - Array creation and methods
   - Array manipulation (push, pop, splice)
   - Array iteration (forEach, map, filter)
   - Array destructuring

5. **05-objects.js** - Objects
   - Object creation and properties
   - Methods and this keyword
   - Nested objects
   - Object destructuring and spread operator

6. **06-dom-manipulation.js** - DOM Manipulation
   - Selecting and modifying elements
   - Creating and removing elements
   - Styling and classes
   - DOM tree navigation

7. **07-event-handling.js** - Event Handling
   - Event listeners and events
   - Event object and methods
   - Event delegation
   - Form and keyboard events

8. **08-async-javascript.js** - Asynchronous JavaScript
   - Synchronous vs asynchronous
   - Callbacks
   - setTimeout and setInterval
   - Event loop

9. **09-promises.js** - Promises
   - Promise creation
   - Promise states (pending, fulfilled, rejected)
   - Promise chaining with .then() and .catch()
   - Promise.all(), Promise.race()

10. **10-async-await.js** - async/await
    - async functions
    - await keyword
    - Sequential vs parallel execution
    - Error handling with try/catch

11. **11-fetch-api.js** - Fetch API
    - Making HTTP requests
    - Request and response handling
    - HTTP methods (GET, POST, PUT, DELETE)
    - Error handling and timeouts

12. **12-json.js** - JSON
    - JSON structure and syntax
    - JSON.stringify() and JSON.parse()
    - Working with APIs
    - Error handling

13. **13-rest-api-basics.js** - REST API Basics
    - REST principles
    - HTTP methods and status codes
    - RESTful URL design
    - Practical API examples

## How to Run JavaScript Files in Terminal

### On Windows (Node.js)

```bash
# Navigate to the javascript-basics folder
cd javascript-basics

# Run a specific file
node 01-fundamentals.js
node 02-variables.js
node 03-functions.js

# Run all files
node 01-fundamentals.js && node 02-variables.js && node 03-functions.js
```

### On macOS/Linux (Node.js)

```bash
# Navigate to the javascript-basics folder
cd javascript-basics

# Run a specific file
node 01-fundamentals.js
node 02-variables.js

# Run all files
for file in *.js; do node "$file"; echo "---"; done
```

### Quick reference

```bash
# List all JS files
ls *.js              # macOS/Linux
dir *.js             # Windows

# Run multiple files with output separator
node 01-fundamentals.js && echo "---" && node 02-variables.js
```

## Installation and Prerequisites

### Node.js Installation

**Windows:**
- Download from https://nodejs.org/
- Run the installer and follow prompts
- Verify: `node --version` and `npm --version`

**macOS (using Homebrew):**
```bash
brew install node
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
```

## Running in Browser (For DOM/Event Handling/Fetch)

For files that use browser APIs (DOM manipulation, events, fetch), create an HTML file:

```html
<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Tutorial</title>
</head>
<body>
    <h1>JavaScript Console Output</h1>
    <p>Open the browser console (F12 or Ctrl+Shift+I) to see output</p>
    
    <!-- Run specific file -->
    <script src="01-fundamentals.js"></script>
    
    <!-- Or create your own script -->
    <script>
        // Your code here
        console.log("Hello from browser!");
    </script>
</body>
</html>
```

Then open the HTML file in a browser and open the developer console.

## Learning Path

### Beginner
1. 01-fundamentals.js
2. 02-variables.js
3. 03-functions.js
4. 04-arrays.js
5. 05-objects.js

### Intermediate
6. 06-dom-manipulation.js
7. 07-event-handling.js
8. 08-async-javascript.js

### Advanced
9. 09-promises.js
10. 10-async-await.js
11. 11-fetch-api.js
12. 12-json.js
13. 13-rest-api-basics.js

## Tips for Learning

1. **Read the code comments** - Each file has detailed explanations
2. **Run the files** - Execute them and observe the output in console
3. **Modify the code** - Change values and see how output changes
4. **Practice** - Try writing similar examples from scratch
5. **Use browser console** - Experiment with code in real-time
6. **Check documentation** - Reference MDN Web Docs for more details

## Common Issues and Solutions

### "node: command not found"
- Node.js is not installed
- Solution: Install Node.js from nodejs.org

### "Cannot find module"
- Running file from wrong directory
- Solution: Make sure you're in the javascript-basics folder

### "ReferenceError: document is not defined"
- Trying to run DOM code in Node.js
- Solution: Run in browser or use Node.js DOM library (jsdom)

## Browser Console Tips

Open browser console: F12 (Windows) or Cmd+Option+I (macOS)

```javascript
// Clear console
clear()

// Run other files in console
// Copy and paste code directly

// Access DOM
document.querySelector('h1')

// Set breakpoints
debugger;

// Profile performance
console.time('name')
console.timeEnd('name')
```

## Additional Resources

- **MDN Web Docs**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/
- **JavaScript.info**: https://javascript.info/
- **W3Schools**: https://www.w3schools.com/js/
- **Official JavaScript Docs**: https://tc39.es/

## Output Examples

When you run each file, you'll see console output similar to:

```
--- Variable Declaration Methods ---
var example: I'm a var
let example: I'm a let
...
```

Each file has its own section markers for easy navigation through the output.

---

**Happy Learning! 🚀**

For any questions or clarifications, refer to the code comments in each file.
