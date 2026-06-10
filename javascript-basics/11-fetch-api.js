// ============================================
// FETCH API
// ============================================

// NOTE: Fetch API is a browser API and requires network access
// These examples demonstrate the concepts; run them in a browser or Node.js environment

console.log("--- Fetch API Overview ---");
console.log("Fetch API provides an interface for retrieving resources asynchronously");
console.log("It's the modern replacement for XMLHttpRequest\n");

// 1. Basic fetch request
console.log("--- Basic GET Request ---");
console.log(`
fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
`);

// 2. Fetch with response handling
console.log("\n--- Response Handling ---");
console.log(`
fetch('https://api.example.com/users')
    .then(response => {
        // Check if response is ok (status 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status);
        }
        console.log('Status:', response.status);
        console.log('Content-Type:', response.headers.get('content-type'));
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
`);

// 3. Response types
console.log("\n--- Response Types ---");
console.log(`
// JSON response
response.json()  // Parse as JSON

// Text response
response.text()  // Parse as text

// Blob response
response.blob()  // Parse as binary data

// ArrayBuffer response
response.arrayBuffer()  // Parse as array buffer

// Clone response
const cloned = response.clone()  // Create a copy
`);

// 4. POST request with data
console.log("\n--- POST Request ---");
console.log(`
const data = { name: 'John', email: 'john@example.com' };

fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log('Created:', data))
.catch(error => console.error('Error:', error));
`);

// 5. Request options
console.log("\n--- Request Options ---");
console.log(`
const options = {
    method: 'GET',          // HTTP method (GET, POST, PUT, DELETE, etc.)
    headers: {              // Request headers
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
    },
    body: JSON.stringify(data),  // Request body (for POST, PUT)
    mode: 'cors',           // CORS mode: 'cors', 'no-cors', 'same-origin'
    credentials: 'include', // Include cookies: 'omit', 'same-origin', 'include'
    cache: 'default',       // Cache strategy: 'default', 'no-store', 'reload'
    redirect: 'follow',     // Follow redirects: 'follow', 'error', 'manual'
    signal: abortController.signal  // Abort signal for cancellation
};

fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data));
`);

// 6. HTTP Methods
console.log("\n--- HTTP Methods ---");
console.log(`
// GET - Retrieve data
fetch(url, { method: 'GET' })

// POST - Create new data
fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
})

// PUT - Replace entire resource
fetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
})

// PATCH - Partially update resource
fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
})

// DELETE - Remove resource
fetch(url, { method: 'DELETE' })
`);

// 7. Headers object
console.log("\n--- Headers ---");
console.log(`
// Create headers
const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
});

// Or inline
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

// Common headers
'Content-Type': 'application/json'
'Accept': 'application/json'
'Authorization': 'Bearer token'
'X-Custom-Header': 'value'
`);

// 8. Error handling
console.log("\n--- Error Handling ---");
console.log(`
fetch(url)
    .then(response => {
        // Fetch doesn't reject on HTTP error status
        if (!response.ok) {
            throw new Error('HTTP Error: ' + response.status);
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => {
        // This catches network errors AND thrown errors
        console.error('Error:', error.message);
    });
`);

// 9. Timeout handling
console.log("\n--- Timeout Handling ---");
console.log(`
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

fetch(url, { signal: controller.signal })
    .then(response => response.json())
    .then(data => {
        clearTimeout(timeoutId);
        console.log(data);
    })
    .catch(error => {
        if (error.name === 'AbortError') {
            console.error('Request timed out');
        } else {
            console.error('Error:', error);
        }
    });
`);

// 10. Aborting requests
console.log("\n--- Aborting Requests ---");
console.log(`
const controller = new AbortController();

fetch(url, { signal: controller.signal })
    .then(response => response.json())
    .catch(error => {
        if (error.name === 'AbortError') {
            console.log('Request was aborted');
        }
    });

// Abort the request
controller.abort();
`);

// 11. Upload files
console.log("\n--- File Upload ---");
console.log(`
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('name', 'filename');

fetch('/api/upload', {
    method: 'POST',
    body: formData  // Don't set Content-Type header; browser will set it
})
.then(response => response.json())
.then(data => console.log('Uploaded:', data));
`);

// 12. Request and Response objects
console.log("\n--- Request and Response Objects ---");
console.log(`
// Create Request object
const request = new Request(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
});

fetch(request)
    .then(response => {
        console.log('Status:', response.status);
        console.log('Headers:', response.headers);
        return response.json();
    });
`);

// 13. Async/await with fetch
console.log("\n--- async/await with Fetch ---");
console.log(`
async function fetchUsers() {
    try {
        const response = await fetch('https://api.example.com/users');
        
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        
        const users = await response.json();
        console.log('Users:', users);
        return users;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

fetchUsers();
`);

// 14. Fetch with authentication
console.log("\n--- Authentication ---");
console.log(`
// Bearer token
fetch(url, {
    headers: {
        'Authorization': 'Bearer ' + token
    }
})

// Basic auth
fetch(url, {
    headers: {
        'Authorization': 'Basic ' + btoa(username + ':' + password)
    }
})

// Custom headers
fetch(url, {
    headers: {
        'X-API-Key': 'your-api-key'
    }
})
`);

// 15. CORS (Cross-Origin Resource Sharing)
console.log("\n--- CORS ---");
console.log(`
// Same-origin requests don't require special handling

// Cross-origin requests need appropriate headers
fetch('https://api.different-domain.com/data', {
    method: 'GET',
    mode: 'cors',  // Enable CORS
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.catch(error => {
    // CORS errors don't include details for security
    console.error('CORS error or network error:', error);
});
`);

// 16. Caching
console.log("\n--- Caching ---");
console.log(`
// Cache control
fetch(url, {
    cache: 'default'    // Use browser cache
})

fetch(url, {
    cache: 'no-store'   // Don't use cache
})

fetch(url, {
    cache: 'reload'     // Bypass cache
})
`);

// 17. Example: Complete API call with async/await
console.log("\n--- Complete Example ---");
console.log(`
async function getUser(userId) {
    const url = 'https://jsonplaceholder.typicode.com/users/' + userId;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('HTTP Error: ' + response.status);
        }
        
        const user = await response.json();
        console.log('User:', user);
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error.message);
        return null;
    }
}

getUser(1);
`);

// 18. Real example with JSONPlaceholder
console.log("\n--- Real API Example ---");

async function demonstrateFetch() {
    try {
        console.log("Fetching user data from JSONPlaceholder...");
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        
        if (!response.ok) {
            throw new Error('Failed to fetch: ' + response.status);
        }
        
        const user = await response.json();
        console.log("User fetched:", {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone
        });
        
        return user;
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
}

demonstrateFetch();

console.log("\n✓ Fetch API concepts explained!");
console.log("Note: Fetch requires network access. Run this in a browser or Node.js environment");
