// ============================================
// REST API BASICS
// ============================================

// 1. What is REST?
console.log("--- What is REST? ---");
console.log("REST (Representational State Transfer) is an architectural style");
console.log("for designing networked applications using HTTP protocol");
console.log("It uses standard HTTP methods and status codes\n");

// 2. REST Principles
console.log("--- REST Principles ---");
console.log(`
1. Client-Server: Separate client and server
2. Statelessness: Each request contains all needed information
3. Cacheable: Responses should define themselves as cacheable
4. Uniform Interface: Consistent API design
5. Layered System: Client can't tell if connected directly to end server
6. Code on Demand: Server can extend client functionality (optional)
`);

// 3. HTTP Methods (CRUD Operations)
console.log("\n--- HTTP Methods (CRUD) ---");
console.log(`
GET - Retrieve resource (READ)
POST - Create new resource (CREATE)
PUT - Replace entire resource (UPDATE)
PATCH - Partially update resource (UPDATE)
DELETE - Remove resource (DELETE)
HEAD - Like GET but without response body
OPTIONS - Describe communication options
`);

// 4. HTTP Status Codes
console.log("\n--- HTTP Status Codes ---");
console.log(`
2xx Success:
  200 OK - Request succeeded
  201 Created - Resource created
  204 No Content - Success with no response body

3xx Redirection:
  301 Moved Permanently - Resource moved
  302 Found - Temporary redirect
  304 Not Modified - Use cached version

4xx Client Error:
  400 Bad Request - Invalid request
  401 Unauthorized - Authentication required
  403 Forbidden - Access denied
  404 Not Found - Resource doesn't exist
  409 Conflict - Request conflicts with current state

5xx Server Error:
  500 Internal Server Error - Server error
  502 Bad Gateway - Invalid response from server
  503 Service Unavailable - Server temporarily unavailable
`);

// 5. RESTful URL Design
console.log("\n--- RESTful URL Design ---");
console.log(`
Base URL: https://api.example.com/v1

Resources:
GET /users              - List all users
GET /users/1            - Get user with ID 1
POST /users             - Create new user
PUT /users/1            - Update user 1
PATCH /users/1          - Partially update user 1
DELETE /users/1         - Delete user 1

Nested resources:
GET /users/1/posts      - Get all posts by user 1
GET /users/1/posts/5    - Get post 5 by user 1
POST /users/1/posts     - Create post for user 1
DELETE /users/1/posts/5 - Delete post 5 by user 1

Query parameters:
GET /users?page=1&limit=10              - Pagination
GET /users?sort=name&order=asc          - Sorting
GET /users?filter=active&status=true    - Filtering
GET /users?search=john                  - Search
`);

// 6. Request Headers
console.log("\n--- Request Headers ---");
console.log(`
Common headers:
Content-Type: application/json              - Request body format
Accept: application/json                    - Expected response format
Authorization: Bearer token123              - Authentication token
User-Agent: MyApp/1.0                       - Client identifier
X-Custom-Header: value                      - Custom header
Cache-Control: no-cache                     - Cache directives
If-Modified-Since: Wed, 21 Oct 2024 07:28:00 GMT - Conditional request
`);

// 7. Response Headers
console.log("\n--- Response Headers ---");
console.log(`
Common headers:
Content-Type: application/json                    - Response format
Content-Length: 256                               - Response body size
Cache-Control: max-age=3600                       - Cache duration
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4" - Resource version
Location: https://api.example.com/users/2        - New resource URL
X-Rate-Limit-Limit: 100                          - Rate limit
X-Rate-Limit-Remaining: 95                       - Remaining requests
`);

// 8. Example: GET Request
console.log("\n--- GET Request Example ---");
console.log(`
// Retrieve all users
async function getUsers() {
    const response = await fetch('https://api.example.com/users');
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
}

// Retrieve specific user
async function getUser(id) {
    const response = await fetch('https://api.example.com/users/' + id);
    if (!response.ok) throw new Error('User not found');
    return await response.json();
}

// Get with query parameters
async function getUsersWithFilter(page, limit) {
    const url = 'https://api.example.com/users?page=' + page + '&limit=' + limit;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
}
`);

// 9. Example: POST Request
console.log("\n--- POST Request Example ---");
console.log(`
// Create new user
async function createUser(userData) {
    const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    
    if (!response.ok) throw new Error('Failed to create user');
    return await response.json();
}

// Usage
createUser({ name: 'Alice', email: 'alice@example.com' });
`);

// 10. Example: PUT Request
console.log("\n--- PUT Request Example ---");
console.log(`
// Update entire user (replace)
async function updateUser(id, userData) {
    const response = await fetch('https://api.example.com/users/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    
    if (!response.ok) throw new Error('Failed to update user');
    return await response.json();
}

// Usage - sends complete user object
updateUser(1, { name: 'John', email: 'john@example.com', age: 30 });
`);

// 11. Example: PATCH Request
console.log("\n--- PATCH Request Example ---");
console.log(`
// Update partial user (partial update)
async function patchUser(id, partialData) {
    const response = await fetch('https://api.example.com/users/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(partialData)
    });
    
    if (!response.ok) throw new Error('Failed to update user');
    return await response.json();
}

// Usage - only send fields to update
patchUser(1, { email: 'newemail@example.com' });
`);

// 12. Example: DELETE Request
console.log("\n--- DELETE Request Example ---");
console.log(`
// Delete user
async function deleteUser(id) {
    const response = await fetch('https://api.example.com/users/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) throw new Error('Failed to delete user');
    
    if (response.status === 204) {
        return { message: 'User deleted' };
    }
    return await response.json();
}

// Usage
deleteUser(1);
`);

// 13. Error handling and status codes
console.log("\n--- Error Handling ---");
console.log(`
async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, options);
        
        if (response.status === 401) {
            throw new Error('Unauthorized - please login');
        }
        if (response.status === 403) {
            throw new Error('Forbidden - access denied');
        }
        if (response.status === 404) {
            throw new Error('Resource not found');
        }
        if (!response.ok) {
            throw new Error('HTTP Error: ' + response.status);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
}
`);

// 14. Authentication
console.log("\n--- Authentication ---");
console.log(`
// Bearer token authentication
async function authenticatedRequest(url, options = {}) {
    const token = localStorage.getItem('authToken');
    
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    });
}

// Usage
authenticatedRequest('https://api.example.com/users', { method: 'GET' });
`);

// 15. Pagination
console.log("\n--- Pagination ---");
console.log(`
async function getPaginatedUsers(page = 1, limit = 10) {
    const url = 'https://api.example.com/users?page=' + page + '&limit=' + limit;
    const response = await fetch(url);
    const data = await response.json();
    
    return {
        users: data.items,
        currentPage: data.page,
        totalPages: data.totalPages,
        totalItems: data.total,
        hasNextPage: data.page < data.totalPages
    };
}
`);

// 16. Practical example with real API
console.log("\n--- Real API Example (JSONPlaceholder) ---");

async function demonstrateRestAPI() {
    try {
        console.log("1. GET - Retrieve user:");
        const getResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const user = await getResponse.json();
        console.log({
            id: user.id,
            name: user.name,
            email: user.email
        });
        
        console.log("\n2. GET - Retrieve user's posts:");
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/users/1/posts?_limit=2');
        const posts = await postsResponse.json();
        console.log("Posts count:", posts.length);
        posts.forEach((post, i) => {
            console.log(`  ${i + 1}. ${post.title}`);
        });
        
        console.log("\n3. POST - Create new post (simulated):");
        const postData = {
            userId: 1,
            title: "My New Post",
            body: "This is a test post"
        };
        const createResponse = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });
        const createdPost = await createResponse.json();
        console.log("Created post ID:", createdPost.id);
        
    } catch (error) {
        console.error("Error:", error.message);
    }
}

demonstrateRestAPI();

// 17. Common API patterns and best practices
console.log("\n--- Best Practices ---");
console.log(`
1. Use nouns for resources: /users, /posts (not /getUsers)
2. Use HTTP methods for operations: GET, POST, PUT, DELETE
3. Use status codes correctly: 200, 201, 400, 404, 500
4. Provide meaningful error messages
5. Include pagination for large datasets
6. Version your API: /v1/users, /v2/users
7. Use consistent naming: camelCase or snake_case
8. Document your API thoroughly
9. Use HTTPS for secure communication
10. Implement rate limiting
`);

console.log("\n✓ REST API Basics completed!");
