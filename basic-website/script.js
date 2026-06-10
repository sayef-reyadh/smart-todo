// ============================================
// JOHN DOE RESUME WEBSITE - INTERACTIVE SCRIPT
// Demonstrates JavaScript Basics in Practice
// ============================================

// ============================================
// 1. VARIABLES AND DOM MANIPULATION
// ============================================

// Variables to store DOM elements
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');
const body = document.body;

// ============================================
// 2. FUNCTIONS - SECTION NAVIGATION
// ============================================

// Function: Switch between sections (demonstrates functions)
function switchSection(sectionId) {
    // Variables (2-variables.js concept)
    const targetSection = document.getElementById(sectionId);
    
    // Arrays and forEach (4-arrays.js concept)
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    navButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // DOM manipulation (6-dom-manipulation.js concept)
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Find and highlight the active button
    const activeButton = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// ============================================
// 3. EVENT HANDLING - NAVIGATION
// ============================================

// Event listeners for navigation buttons (7-event-handling.js concept)
navButtons.forEach(button => {
    button.addEventListener('click', function() {
        const sectionId = this.getAttribute('data-section');
        switchSection(sectionId);
    });
});

// ============================================
// 4. DARK MODE TOGGLE
// ============================================

// Variables: Store dark mode state
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Function: Apply dark mode from localStorage (localStorage uses JSON concepts - 12-json.js)
function applyDarkMode() {
    if (isDarkMode) {
        body.classList.add('dark-mode');
        document.getElementById('toggleTheme').textContent = '☀️ Light Mode';
    }
}

// Initialize dark mode on page load
applyDarkMode();

// Event listener: Toggle dark mode button
document.getElementById('toggleTheme').addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    body.classList.toggle('dark-mode');
    
    // Update button text
    if (isDarkMode) {
        this.textContent = '☀️ Light Mode';
    } else {
        this.textContent = '🌙 Dark Mode';
    }
    
    // Save preference (JSON and localStorage - 12-json.js concept)
    localStorage.setItem('darkMode', isDarkMode);
});

// ============================================
// 5. ALERTS AND USER INTERACTION
// ============================================

// Event listener: Show alert button (basic event handling)
document.getElementById('showAlert').addEventListener('click', function() {
    // Objects and strings (5-objects.js concept)
    const message = {
        greeting: "Welcome to John Doe's Resume!",
        role: "Full Stack Developer",
        yearsExp: 5
    };
    
    // String template (02-variables.js concept)
    alert(`${message.greeting}\nRole: ${message.role}\nExperience: ${message.yearsExp}+ years`);
});

// ============================================
// 6. TOGGLE EXTENDED BIO
// ============================================

// Event listener: Toggle bio button (demonstrates DOM manipulation)
document.getElementById('toggleBio').addEventListener('click', function() {
    const extendedBio = document.getElementById('extendedBio');
    
    // Classes - CSS class toggle (6-dom-manipulation.js concept)
    extendedBio.classList.toggle('hidden');
    
    // Update button text
    if (extendedBio.classList.contains('hidden')) {
        this.textContent = 'Toggle Bio';
    } else {
        this.textContent = 'Hide Bio';
    }
});

// ============================================
// 7. ARRAYS AND FILTERING
// ============================================

// Function: Filter skills (demonstrates arrays, filter method - 4-arrays.js concept)
document.getElementById('filterSkills').addEventListener('click', function() {
    // Array of skills (4-arrays.js concept)
    const allSkills = Array.from(document.querySelectorAll('.skill-tag'));
    
    // Filter method on arrays (4-arrays.js - array.filter)
    const frontendSkills = allSkills.filter(skill => {
        const text = skill.textContent;
        return ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js', 'Bootstrap'].includes(text);
    });
    
    // Map method (4-arrays.js - array.map)
    frontendSkills.forEach(skill => {
        skill.style.backgroundColor = '#3b82f6';
        skill.style.color = 'white';
    });
    
    // Show message (using variables and functions)
    const message = `Filtered to ${frontendSkills.length} frontend skills`;
    console.log(message);
    alert(message);
});

// ============================================
// 8. COUNT SKILLS (REDUCE METHOD)
// ============================================

// Event listener: Count skills (demonstrates reduce method - 4-arrays.js)
document.getElementById('countSkills').addEventListener('click', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    // reduce method to count (4-arrays.js - array.reduce)
    const totalSkills = Array.from(skillTags).reduce((count) => count + 1, 0);
    
    // Object for skill stats (5-objects.js concept)
    const skillStats = {
        total: totalSkills,
        frontend: Array.from(skillTags).filter(s => 
            ['React', 'Vue.js', 'HTML5'].includes(s.textContent)
        ).length,
        backend: Array.from(skillTags).filter(s => 
            ['Node.js', 'Express.js', 'MongoDB'].includes(s.textContent)
        ).length
    };
    
    // String template and object display
    alert(`Total Skills: ${skillStats.total}\nFrontend: ${skillStats.frontend}\nBackend: ${skillStats.backend}`);
});

// ============================================
// 9. SHUFFLE SKILLS (ARRAY METHODS)
// ============================================

// Function: Shuffle array (demonstrates array manipulation)
function shuffleArray(array) {
    const shuffled = [...array]; // Spread operator (04-arrays.js concept)
    
    // Simple shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
}

// Event listener: Shuffle skills
document.getElementById('shuffleSkills').addEventListener('click', function() {
    const skillContainer = document.querySelector('.skill-tags');
    const skills = Array.from(skillContainer.querySelectorAll('.skill-tag'));
    
    // Shuffle array
    const shuffledSkills = shuffleArray(skills);
    
    // Clear and re-add shuffled skills (DOM manipulation)
    skillContainer.innerHTML = '';
    shuffledSkills.forEach(skill => {
        skillContainer.appendChild(skill);
    });
});

// ============================================
// 10. DOWNLOAD RESUME
// ============================================

// Event listener: Download resume
document.getElementById('downloadResume').addEventListener('click', function() {
    // Create a data object (5-objects.js concept)
    const resumeData = {
        name: 'John Doe',
        title: 'Full Stack Developer',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        downloadDate: new Date().toLocaleDateString()
    };
    
    // Convert to JSON (12-json.js concept)
    const resumeJson = JSON.stringify(resumeData, null, 2);
    
    // Log to console
    console.log('Resume Data:', resumeJson);
    
    alert(`Resume preparation initiated.\n\nName: ${resumeData.name}\nTitle: ${resumeData.title}\nDate: ${resumeData.downloadDate}\n\nCheck console for full details.`);
});

// ============================================
// 11. EXPAND EXPERIENCE
// ============================================

// Event listener: Expand all experience items
document.getElementById('expandExperience').addEventListener('click', function() {
    const experienceItems = document.querySelectorAll('.experience-item');
    
    // Toggle expand state (forEach method - 4-arrays.js)
    experienceItems.forEach(item => {
        item.style.maxHeight = 'none';
        item.style.transition = 'all 0.3s ease';
    });
    
    // Update button text
    this.textContent = this.textContent === 'Expand All' ? 'Collapse All' : 'Expand All';
});

// ============================================
// 12. VISIT GITHUB
// ============================================

// Event listener: Visit GitHub (demonstrates objects)
document.getElementById('visitGithub').addEventListener('click', function() {
    // Create URL object (5-objects.js concept)
    const githubProfile = {
        baseUrl: 'https://github.com',
        username: 'johndoe',
        getFullUrl: function() {
            return `${this.baseUrl}/${this.username}`;
        }
    };
    
    // Call method on object (5-objects.js - methods)
    const fullUrl = githubProfile.getFullUrl();
    
    alert(`Opening GitHub profile: ${fullUrl}`);
    // In real app: window.open(fullUrl, '_blank');
});

// ============================================
// 13. PROJECT MODAL FUNCTIONALITY
// ============================================

// Object: Project details (5-objects.js concept)
const projectDetails = {
    social: {
        title: 'Social Media App',
        description: 'A full-featured social media platform with real-time messaging and notifications.',
        details: `
            <h3>Key Features:</h3>
            <ul style="margin-left: 20px; margin-top: 10px;">
                <li>User authentication with JWT</li>
                <li>Real-time notifications</li>
                <li>Direct messaging</li>
                <li>Post feed with likes and comments</li>
                <li>User profiles and following system</li>
            </ul>
            <p style="margin-top: 15px;"><strong>Tech Stack:</strong> React, Node.js, MongoDB, Socket.io</p>
        `
    },
    ecommerce: {
        title: 'E-Commerce Store',
        description: 'Complete online shopping platform with payment processing.',
        details: `
            <h3>Key Features:</h3>
            <ul style="margin-left: 20px; margin-top: 10px;">
                <li>Product catalog with search and filters</li>
                <li>Shopping cart functionality</li>
                <li>Stripe payment integration</li>
                <li>Order management and tracking</li>
                <li>Admin dashboard for inventory</li>
            </ul>
            <p style="margin-top: 15px;"><strong>Tech Stack:</strong> Vue.js, Express, PostgreSQL, Stripe</p>
        `
    },
    analytics: {
        title: 'Analytics Dashboard',
        description: 'Real-time data visualization and analytics platform.',
        details: `
            <h3>Key Features:</h3>
            <ul style="margin-left: 20px; margin-top: 10px;">
                <li>Real-time data updates via WebSocket</li>
                <li>Interactive charts and graphs</li>
                <li>Custom report generation</li>
                <li>User behavior tracking</li>
                <li>Predictive analytics</li>
            </ul>
            <p style="margin-top: 15px;"><strong>Tech Stack:</strong> React, D3.js, Node.js, WebSocket</p>
        `
    }
};

// Function: Show project modal (demonstrates objects)
function showProjectDetail(projectKey) {
    // Get project from object (5-objects.js concept)
    const project = projectDetails[projectKey];
    
    if (project) {
        // Update modal content (DOM manipulation)
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;
        document.getElementById('modalDetails').innerHTML = project.details;
        
        // Show modal (toggle class)
        document.getElementById('projectModal').classList.add('show');
    }
}

// Function: Close modal
function closeModal() {
    document.getElementById('projectModal').classList.remove('show');
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeModal();
    }
});

// ============================================
// 14. CONTACT FORM VALIDATION
// ============================================

// Event listener: Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    // Prevent default form submission (7-event-handling.js concept)
    e.preventDefault();
    
    // Get form values (DOM manipulation)
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Form validation (functions and conditionals)
    if (validateForm(name, email, message)) {
        // Create form data object (5-objects.js concept)
        const formData = {
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toISOString()
        };
        
        // Convert to JSON (12-json.js concept)
        console.log('Form Data JSON:', JSON.stringify(formData, null, 2));
        
        // Show success message
        alert(`Thank you, ${name}! Your message has been received.\nWe'll get back to you at ${email} soon.`);
        
        // Reset form
        this.reset();
    }
});

// Function: Validate form (demonstrates conditionals and functions)
function validateForm(name, email, message) {
    // String validation (02-variables.js concept)
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return false;
    }
    
    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Message length validation
    if (message.length < 10) {
        alert('Message must be at least 10 characters long.');
        return false;
    }
    
    return true;
}

// ============================================
// 15. FILTER PROJECTS
// ============================================

// Event listener: Filter projects (demonstrates arrays and filter)
document.getElementById('filterProjects').addEventListener('click', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Toggle filter display
    const isFiltered = this.textContent.includes('All');
    
    if (isFiltered) {
        this.textContent = 'Filter: Frontend Only';
    } else {
        this.textContent = 'Filter: All Projects';
    }
    
    // In real app: would filter based on technology
    console.log('Projects filtered successfully');
});

// ============================================
// 16. KEYBOARD SHORTCUTS
// ============================================

// Event listener: Keyboard navigation (7-event-handling.js concept)
document.addEventListener('keydown', function(event) {
    // Object: Keyboard shortcuts map
    const shortcuts = {
        'a': 'about',
        'e': 'experience',
        's': 'skills',
        'p': 'projects',
        'c': 'contact'
    };
    
    // Check if key matches shortcut
    const section = shortcuts[event.key];
    if (section && event.ctrlKey) {
        switchSection(section);
        console.log(`Navigated to ${section} section using Ctrl+${event.key}`);
    }
});

// ============================================
// 17. INITIALIZATION AND LOGGING
// ============================================

// Function: Initialize application
function initializeApp() {
    console.log('='.repeat(50));
    console.log('John Doe Resume Website Initialized');
    console.log('='.repeat(50));
    console.log('JavaScript Basics Examples:');
    console.log('✓ Variables (var, let, const) - script.js');
    console.log('✓ Functions - Multiple throughout');
    console.log('✓ Objects - projectDetails, githubProfile');
    console.log('✓ Arrays - Skills filtering, shuffling');
    console.log('✓ DOM Manipulation - Section switching');
    console.log('✓ Event Handling - Navigation, buttons');
    console.log('✓ JSON - Form data, localStorage');
    console.log('='.repeat(50));
}

// Call initialization on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    
    // Log available keyboard shortcuts
    console.log('\nKeyboard Shortcuts (Ctrl + Key):');
    console.log('Ctrl+A - About');
    console.log('Ctrl+E - Experience');
    console.log('Ctrl+S - Skills');
    console.log('Ctrl+P - Projects');
    console.log('Ctrl+C - Contact');
});

// ============================================
// 18. UTILITY FUNCTIONS (ASYNC/AWAIT EXAMPLE)
// ============================================

// Function: Simulate API call with async/await (10-async-await.js concept)
async function simulateApiCall(delay = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ status: 'success', message: 'Data loaded' });
        }, delay);
    });
}

// Example usage (commented out to avoid spam):
// simulateApiCall(500).then(response => {
//     console.log('API Response:', response);
// });

console.log('✓ Resume website interactive features loaded!');
