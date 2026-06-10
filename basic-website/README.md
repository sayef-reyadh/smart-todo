# John Doe Resume Website

A fully functional, interactive resume website demonstrating JavaScript fundamentals and best practices.

## 📋 Overview

This is a modern, responsive resume website for "John Doe" that showcases:
- Professional design with dark mode support
- Interactive navigation and content switching
- Form validation and handling
- Dynamic content manipulation
- Responsive design for all devices

## 📁 Files

- **index.html** - Main HTML structure with semantic markup
- **styles.css** - Comprehensive styling with CSS variables and animations
- **script.js** - Interactive JavaScript demonstrating all JavaScript basics

## ✨ Features

### 1. Section Navigation
- Smooth transitions between About, Experience, Skills, Projects, and Contact sections
- Navigation bar with active state indicator
- Keyboard shortcuts: Ctrl+A, Ctrl+E, Ctrl+S, Ctrl+P, Ctrl+C

### 2. Dark Mode Toggle
- Toggle between light and dark themes
- Preference saved to localStorage (demonstrates JSON/localStorage)
- Smooth color transitions

### 3. About Section Interactive Elements
- **Show Alert Button** - Displays welcome message with object data
- **Toggle Bio Button** - Shows/hides extended biography
- Demonstrates: Functions, Objects, DOM manipulation, Event handling

### 4. Experience Section
- Expandable experience items
- Download Resume button - Shows JSON serialization example
- Demonstrates: Arrays, Objects, JSON.stringify()

### 5. Skills Section
Three interactive buttons:
- **Filter Skills** - Filters skills by category (Frontend/Backend)
- **Count Skills** - Uses reduce() to count and categorize skills
- **Shuffle Skills** - Randomly reorganizes skill display

Demonstrates: Arrays, Array methods (filter, reduce, forEach), Array destructuring

### 6. Projects Section
- Project cards with hover effects
- Modal popup with detailed project information
- Project details stored as objects
- Demonstrates: Objects, DOM manipulation, Modal functionality

### 7. Contact Section
- Contact information cards
- Contact form with validation
- Validates: Required fields, Email format, Message length
- Demonstrates: Form handling, Validation, Event handling

### 8. Responsive Design
- Mobile-friendly layout
- Breakpoints at 768px and 480px
- Flexible grid layouts
- Touch-friendly buttons and inputs

## 🚀 How to Use

### Opening in Browser

1. **Locate the file:**
   ```bash
   Navigate to: basic-website/index.html
   ```

2. **Open in browser:**
   - Double-click `index.html`
   - Or right-click → Open with → Choose browser
   - Or drag and drop into browser window

3. **Access via local server (recommended):**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (with http-server)
   npx http-server
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   ```
   Then open: `http://localhost:8000`

## 📚 JavaScript Concepts Demonstrated

### Variables (02-variables.js)
```javascript
let isDarkMode = localStorage.getItem('darkMode') === 'true';
const projectDetails = { /* ... */ };
var skills = [/* ... */];
```

### Functions (03-functions.js)
```javascript
function switchSection(sectionId) { /* ... */ }
async function simulateApiCall(delay) { /* ... */ }
const closeModal = () => { /* ... */ }
```

### Objects (05-objects.js)
```javascript
const projectDetails = {
    social: { title: '...', description: '...' },
    getFullUrl: function() { /* ... */ }
};
```

### Arrays (04-arrays.js)
```javascript
// Filter
const frontendSkills = allSkills.filter(skill => {/* ... */});

// Map
skills.forEach(skill => { /* ... */ });

// Reduce
const totalSkills = skills.reduce((count) => count + 1, 0);

// Destructuring
const [name, email, message] = formValues;
```

### DOM Manipulation (06-dom-manipulation.js)
```javascript
document.getElementById('toggleBio').addEventListener('click', () => {
    extendedBio.classList.toggle('hidden');
    element.textContent = 'New content';
});
```

### Event Handling (07-event-handling.js)
```javascript
navButtons.forEach(button => {
    button.addEventListener('click', function() { /* ... */ });
});

document.addEventListener('keydown', function(event) { /* ... */ });
```

### JSON (12-json.js)
```javascript
const resumeJson = JSON.stringify(resumeData, null, 2);
const parsed = JSON.parse(jsonString);
localStorage.setItem('darkMode', isDarkMode);
```

### Async/Await (10-async-await.js)
```javascript
async function simulateApiCall(delay) {
    return new Promise(resolve => {
        setTimeout(() => resolve({ status: 'success' }), delay);
    });
}
```

## 🎯 Interactive Buttons and Their Functions

| Section | Button | Function | JS Concept |
|---------|--------|----------|-----------|
| About | 🌙 Dark Mode | Toggle theme | localStorage, Variables |
| About | Show Alert | Display greeting | Objects, String templates |
| About | Toggle Bio | Show/hide content | DOM, classList |
| Experience | 📥 Download Resume | Show JSON data | JSON.stringify() |
| Experience | Expand All | Toggle experience items | Array.forEach() |
| Skills | Filter Skills | Filter by category | Array.filter() |
| Skills | Count Skills | Count and categorize | Array.reduce() |
| Skills | Shuffle Skills | Randomize order | Array spread, destructuring |
| Projects | View Details | Show modal | Objects, DOM |
| Projects | 🔗 Visit GitHub | Display URL | Objects, methods |
| Projects | Filter: All | Toggle filter state | Conditionals |
| Contact | Send Message | Validate & submit | Form validation, JSON |

## 💾 Data Storage

The website uses localStorage to persist user preferences:

```javascript
// Dark mode preference
localStorage.setItem('darkMode', isDarkMode);
localStorage.getItem('darkMode');
```

This demonstrates JSON serialization concepts from tutorial 12-json.js

## 📱 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎨 Color Scheme

### Light Mode
- Primary: #2563eb (Blue)
- Background: #ffffff (White)
- Text: #1f2937 (Dark gray)

### Dark Mode
- Primary: #3b82f6 (Light blue)
- Background: #1f2937 (Dark gray)
- Text: #f3f4f6 (Light gray)

## 🔧 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl + A | Navigate to About |
| Ctrl + E | Navigate to Experience |
| Ctrl + S | Navigate to Skills |
| Ctrl + P | Navigate to Projects |
| Ctrl + C | Navigate to Contact |

## 📊 Responsive Breakpoints

- **Desktop:** 1000px+
- **Tablet:** 768px - 1000px
- **Mobile:** < 768px
- **Small Mobile:** < 480px

## 🐛 Browser Console Features

The script logs helpful information to browser console:
- Initialization message
- Available keyboard shortcuts
- Form validation messages
- Debug information

**To open console:**
- Windows/Linux: `F12` or `Ctrl+Shift+I`
- Mac: `Cmd+Option+I`

## 📝 Code Organization

- **HTML (index.html):**
  - Semantic structure with proper heading hierarchy
  - Form elements with labels and validation
  - ARIA attributes for accessibility

- **CSS (styles.css):**
  - CSS custom properties (variables) for theming
  - Flexbox and Grid layouts
  - Mobile-first responsive design
  - Animations and transitions

- **JavaScript (script.js):**
  - Clear function organization with comments
  - Event listener declarations grouped by feature
  - Utility functions for reusable logic
  - Console logging for debugging

## 🎓 Learning Path

1. **Start with HTML** - Understand the structure
2. **Review CSS** - Learn styling and layout
3. **Study JavaScript** - Follow the numbered comments referring to tutorial files
4. **Test Interactivity** - Click buttons and try features
5. **Open Console** - See what's happening behind the scenes
6. **Modify Code** - Try changing values and see results

## 🚀 Enhancement Ideas

- Add real backend API integration
- Implement actual file download for resume
- Add more projects with real portfolio items
- Implement email notification for contact form
- Add animations library (e.g., AOS)
- Create blog section
- Add testimonials section
- Implement search functionality

## 📖 Reference Guide

For detailed information about each JavaScript concept, refer to:
- `/javascript-basics/01-fundamentals.js` - Fundamentals
- `/javascript-basics/02-variables.js` - Variables
- `/javascript-basics/03-functions.js` - Functions
- `/javascript-basics/04-arrays.js` - Arrays and Methods
- `/javascript-basics/05-objects.js` - Objects
- `/javascript-basics/06-dom-manipulation.js` - DOM APIs
- `/javascript-basics/07-event-handling.js` - Events
- `/javascript-basics/08-async-javascript.js` - Async Basics
- `/javascript-basics/10-async-await.js` - async/await
- `/javascript-basics/12-json.js` - JSON and localStorage

## 🤝 Contributing

This is an educational project. Feel free to:
- Modify the code to practice
- Add new sections
- Create variations with different designs
- Build upon it for portfolio purposes

## 📄 License

This project is open source and available for educational purposes.

---

**Happy Learning! 🚀**

For any questions, refer to the JavaScript tutorials in the `javascript-basics` folder or check the inline code comments.
