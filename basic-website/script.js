// ============================================
// JOHN DOE RESUME WEBSITE - INTERACTIVE SCRIPT
// ============================================

// Select DOM elements for later use
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');
const body = document.body;

// ============================================
// SECTION NAVIGATION - Switch between sections
// ============================================

// Hide all sections and deactivate all buttons
function switchSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    
    // Hide all sections and remove active class
    sections.forEach(section => {
        section.classList.remove('active');
        section.classList.add('hidden');
    });
    
    // Remove active class from all buttons
    navButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show target section and activate button
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.classList.remove('hidden');
    }
    
    // Highlight the clicked navigation button
    const activeButton = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}


// Add click listeners to navigation buttons
navButtons.forEach(button => {
    button.addEventListener('click', function() {
        const sectionId = this.getAttribute('data-section');
        switchSection(sectionId);
    });
});

// ============================================
// DARK MODE - Toggle and persist with localStorage
// ============================================

let isDarkMode = localStorage.getItem('darkMode') === 'true';

function applyDarkMode() {
    if (isDarkMode) {
        body.classList.add('dark-mode');
        document.getElementById('toggleTheme').textContent = '☀️ Light Mode';
    }
}

applyDarkMode();

// Dark mode toggle button
document.getElementById('toggleTheme').addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    body.classList.toggle('dark-mode');
    this.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('darkMode', isDarkMode);
});

// ============================================
// USER INTERACTIONS - Alert, Bio Toggle
// ============================================

// Show profile alert with object data
document.getElementById('showAlert').addEventListener('click', function() {
    const message = {
        greeting: "Welcome to John Doe's Resume!",
        role: "Full Stack Developer",
        yearsExp: 5
    };
    alert(`${message.greeting}\nRole: ${message.role}\nExperience: ${message.yearsExp}+ years`);
});

// Toggle extended bio visibility
document.getElementById('toggleBio').addEventListener('click', function() {
    const extendedBio = document.getElementById('extendedBio');
    extendedBio.classList.toggle('hidden');
    this.textContent = extendedBio.classList.contains('hidden') ? 'Toggle Bio' : 'Hide Bio';
});

// ============================================
// SKILLS - Filter, Count, Shuffle
// ============================================

// Filter to frontend skills only (array.filter)
document.getElementById('filterSkills').addEventListener('click', function() {
    const allSkills = Array.from(document.querySelectorAll('.skill-tag'));
    const frontendSkills = allSkills.filter(skill => {
        const text = skill.textContent;
        return ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js', 'Bootstrap'].includes(text);
    });
    frontendSkills.forEach(skill => {
        skill.style.backgroundColor = '#3b82f6';
        skill.style.color = 'white';
    });
    alert(`Filtered to ${frontendSkills.length} frontend skills`);
});

// Count total skills (array.reduce)
document.getElementById('countSkills').addEventListener('click', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    const totalSkills = Array.from(skillTags).reduce((count) => count + 1, 0);
    const skillStats = {
        total: totalSkills,
        frontend: Array.from(skillTags).filter(s => ['React', 'Vue.js', 'HTML5'].includes(s.textContent)).length,
        backend: Array.from(skillTags).filter(s => ['Node.js', 'Express.js', 'MongoDB'].includes(s.textContent)).length
    };
    alert(`Total Skills: ${skillStats.total}\nFrontend: ${skillStats.frontend}\nBackend: ${skillStats.backend}`);
});

// Shuffle skills using Fisher-Yates algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

document.getElementById('shuffleSkills').addEventListener('click', function() {
    const skillContainer = document.querySelector('.skill-tags');
    const skills = Array.from(skillContainer.querySelectorAll('.skill-tag'));
    const shuffledSkills = shuffleArray(skills);
    skillContainer.innerHTML = '';
    shuffledSkills.forEach(skill => skillContainer.appendChild(skill));
});

// ============================================
// RESUME & EXPERIENCE
// ============================================

// Download resume (convert object to JSON)
document.getElementById('downloadResume').addEventListener('click', function() {
    const resumeData = {
        name: 'John Doe',
        title: 'Full Stack Developer',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        downloadDate: new Date().toLocaleDateString()
    };
    console.log('Resume Data:', JSON.stringify(resumeData, null, 2));
    alert(`Resume preparation initiated.\n\nName: ${resumeData.name}\nTitle: ${resumeData.title}\nDate: ${resumeData.downloadDate}`);
});

// Expand all experience items
document.getElementById('expandExperience').addEventListener('click', function() {
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        item.style.maxHeight = 'none';
        item.style.transition = 'all 0.3s ease';
    });
    this.textContent = this.textContent === 'Expand All' ? 'Collapse All' : 'Expand All';
});

// ============================================
// GITHUB & PROJECTS
// ============================================

// Visit GitHub (object with method)
document.getElementById('visitGithub').addEventListener('click', function() {
    const githubProfile = {
        baseUrl: 'https://github.com',
        username: 'johndoe',
        getFullUrl: function() { return `${this.baseUrl}/${this.username}`; }
    };
    alert(`Opening GitHub profile: ${githubProfile.getFullUrl()}`);
});

// Project details object
const projectDetails = {
    social: {
        title: 'Social Media App',
        description: 'Full-featured social media platform with real-time messaging.',
        details: `<h3>Key Features:</h3><ul style="margin-left:20px;"><li>User authentication</li><li>Real-time notifications</li><li>Direct messaging</li><li>Post feed</li></ul>`
    },
    ecommerce: {
        title: 'E-Commerce Store',
        description: 'Online shopping platform with payment integration.',
        details: `<h3>Key Features:</h3><ul style="margin-left:20px;"><li>Product catalog</li><li>Shopping cart</li><li>Stripe payment</li><li>Order tracking</li></ul>`
    },
    analytics: {
        title: 'Analytics Dashboard',
        description: 'Real-time data visualization and analytics.',
        details: `<h3>Key Features:</h3><ul style="margin-left:20px;"><li>Real-time updates</li><li>Interactive charts</li><li>Report generation</li></ul>`
    }
};

// Show project modal
function showProjectDetail(projectKey) {
    const project = projectDetails[projectKey];
    if (project) {
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;
        document.getElementById('modalDetails').innerHTML = project.details;
        document.getElementById('projectModal').classList.add('show');
    }
}

// Close modal
function closeModal() {
    document.getElementById('projectModal').classList.remove('show');
}

// Close on outside click
window.addEventListener('click', function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) closeModal();
});

// Filter projects
document.getElementById('filterProjects').addEventListener('click', function() {
    const isFiltered = this.textContent.includes('All');
    this.textContent = isFiltered ? 'Filter: Frontend Only' : 'Filter: All Projects';
});

// ============================================
// CONTACT FORM - Validation
// ============================================

// Form submission with validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (validateForm(name, email, message)) {
        const formData = {
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toISOString()
        };
        console.log('Form Data:', JSON.stringify(formData, null, 2));
        alert(`Thank you, ${name}! Your message has been received.`);
        this.reset();
    }
});

// Form validation function
function validateForm(name, email, message) {
    if (!name || !email || !message) {
        alert('Please fill all required fields.');
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter valid email.');
        return false;
    }
    if (message.length < 10) {
        alert('Message must be at least 10 characters.');
        return false;
    }
    return true;
}

// ============================================
// KEYBOARD SHORTCUTS - Ctrl+Key navigation
// ============================================

document.addEventListener('keydown', function(event) {
    const shortcuts = { 'a': 'about', 'e': 'experience', 's': 'skills', 'p': 'projects', 'c': 'contact' };
    const section = shortcuts[event.key];
    if (section && event.ctrlKey) {
        switchSection(section);
        console.log(`Navigated to ${section} using Ctrl+${event.key}`);
    }
});

// ============================================
// INITIALIZATION
// ============================================

function initializeApp() {
    console.log('='.repeat(50));
    console.log('John Doe Resume Website Initialized');
    console.log('='.repeat(50));
    console.log('JavaScript Concepts Used:');
    console.log('✓ Variables (let, const)');
    console.log('✓ Functions and arrow functions');
    console.log('✓ Objects and object methods');
    console.log('✓ Arrays and array methods (filter, reduce, forEach)');
    console.log('✓ DOM manipulation (querySelector, classList, textContent)');
    console.log('✓ Event handling (addEventListener, click, submit, keydown)');
    console.log('✓ localStorage for persistence');
    console.log('✓ JSON stringification');
    console.log('='.repeat(50));
}

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    console.log('\nKeyboard Shortcuts:\nCtrl+A=About, Ctrl+E=Experience, Ctrl+S=Skills, Ctrl+P=Projects, Ctrl+C=Contact');
});

// Async/await example (commented)
async function simulateApiCall(delay = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ status: 'success', message: 'Data loaded' }), delay);
    });
}

console.log('✓ Website loaded and interactive!');
