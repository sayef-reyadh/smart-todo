// ============================================
// ASYNC/AWAIT
// ============================================

// 1. What is async/await?
console.log("--- What is async/await? ---");
console.log("async/await is syntactic sugar for working with Promises");
console.log("It makes asynchronous code look and behave like synchronous code\n");

// 2. Basic async function
console.log("--- Basic async function ---");

async function fetchData() {
    return "Data loaded";
}

console.log("fetchData returns:", fetchData());

// Using the promise
fetchData().then((result) => {
    console.log("Result:", result);
});

// 3. await keyword
console.log("\n--- await keyword ---");

async function demonstrateAwait() {
    console.log("Start");
    
    // await pauses execution until promise resolves
    const result = await new Promise((resolve) => {
        setTimeout(() => {
            resolve("Promise resolved!");
        }, 500);
    });
    
    console.log("After await:", result);
}

demonstrateAwait();

// 4. async with Promises
console.log("\n--- async with Promises ---");

function delay(ms, value) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(value), ms);
    });
}

async function fetchUser(userId) {
    console.log("Fetching user:", userId);
    const user = await delay(300, { id: userId, name: "John Doe" });
    return user;
}

fetchUser(1).then((user) => {
    console.log("User fetched:", user);
});

// 5. Multiple awaits (sequential)
console.log("\n--- Sequential awaits ---");

async function fetchUserDataSequential() {
    console.log("Step 1: Fetching user");
    const user = await delay(300, { id: 1, name: "Alice" });
    console.log("User:", user.name);
    
    console.log("Step 2: Fetching posts");
    const posts = await delay(300, [
        { id: 1, title: "Post 1" },
        { id: 2, title: "Post 2" }
    ]);
    console.log("Posts:", posts.length);
    
    console.log("Step 3: Fetching comments");
    const comments = await delay(300, [
        { id: 1, text: "Comment 1" },
        { id: 2, text: "Comment 2" }
    ]);
    console.log("Comments:", comments.length);
    
    return { user, posts, comments };
}

fetchUserDataSequential().then((data) => {
    console.log("All data fetched");
});

// 6. Parallel awaits (concurrent)
console.log("\n--- Parallel awaits (faster) ---");

async function fetchUserDataParallel() {
    console.log("Fetching all data in parallel");
    
    // Start all promises at once, wait for all to complete
    const [user, posts, comments] = await Promise.all([
        delay(300, { id: 1, name: "Bob" }),
        delay(300, [{ id: 1, title: "Post 1" }]),
        delay(300, [{ id: 1, text: "Comment 1" }])
    ]);
    
    console.log("User:", user.name);
    console.log("Posts:", posts.length);
    console.log("Comments:", comments.length);
    
    return { user, posts, comments };
}

fetchUserDataParallel().then(() => {
    console.log("Parallel fetch complete");
});

// 7. Error handling with try/catch
console.log("\n--- Error handling ---");

async function fetchWithError(shouldFail) {
    try {
        console.log("Attempting to fetch");
        
        const result = await new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldFail) {
                    reject(new Error("Network error"));
                } else {
                    resolve("Success");
                }
            }, 300);
        });
        
        console.log("Result:", result);
        return result;
    } catch (error) {
        console.error("Caught error:", error.message);
        return null;
    }
}

fetchWithError(false);
fetchWithError(true);

// 8. Finally with async/await
console.log("\n--- try/catch/finally ---");

async function fetchWithFinally() {
    try {
        console.log("Starting fetch");
        const result = await delay(300, "Data");
        console.log("Got result:", result);
        return result;
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        console.log("Cleanup - finally block");
    }
}

fetchWithFinally();

// 9. Looping with async/await
console.log("\n--- Looping with async ---");

async function fetchMultipleUsers() {
    const userIds = [1, 2, 3];
    const users = [];
    
    // Sequential fetching
    for (const id of userIds) {
        console.log(`Fetching user ${id}`);
        const user = await delay(200, { id, name: `User ${id}` });
        users.push(user);
    }
    
    return users;
}

fetchMultipleUsers().then((users) => {
    console.log("All users:", users.length);
});

// 10. Async with Promise.all
console.log("\n--- Combining async and Promise.all ---");

async function fetchMultipleUsersParallel() {
    const userIds = [1, 2, 3];
    
    // Parallel fetching
    const promises = userIds.map(id => 
        delay(200, { id, name: `User ${id}` })
    );
    
    const users = await Promise.all(promises);
    return users;
}

fetchMultipleUsersParallel().then((users) => {
    console.log("All users fetched in parallel:", users.length);
});

// 11. Async function properties
console.log("\n--- Async function properties ---");

async function getInfo() {
    await delay(100, null);
    return { info: "some data" };
}

console.log("getInfo() returns a Promise:", getInfo() instanceof Promise);

// 12. Error handling patterns
console.log("\n--- Error handling patterns ---");

async function handleErrors() {
    // Pattern 1: try/catch
    try {
        const result = await delay(100, "success");
        console.log(result);
    } catch (error) {
        console.error("Error:", error);
    }
    
    // Pattern 2: catch on promise
    delay(100, "success")
        .catch((error) => {
            console.error("Caught:", error);
        });
    
    // Pattern 3: multiple catches
    try {
        await delay(100, "success");
    } catch (error) {
        console.error("First catch");
    } catch (error) {
        console.error("Second catch");
    }
}

handleErrors();

// 13. Async arrow functions
console.log("\n--- Async arrow functions ---");

const fetchAsync = async () => {
    const data = await delay(200, "Arrow function data");
    return data;
};

fetchAsync().then((data) => {
    console.log("Arrow function result:", data);
});

// 14. Async IIFE
console.log("\n--- Async IIFE ---");

(async () => {
    const result = await delay(200, "IIFE result");
    console.log("Async IIFE:", result);
})();

// 15. Comparison: Callbacks vs Promises vs async/await
console.log("\n--- Code Comparison ---");

// Callbacks
function withCallbacks(callback) {
    setTimeout(() => {
        callback(null, "callback result");
    }, 100);
}

// Promises
function withPromises() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("promise result");
        }, 100);
    });
}

// async/await
async function withAsyncAwait() {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve("async/await result");
        }, 100);
    });
}

console.log("Using callback:");
withCallbacks((err, result) => console.log(result));

console.log("Using promise:");
withPromises().then((result) => console.log(result));

console.log("Using async/await:");
withAsyncAwait().then((result) => console.log(result));

// 16. Common async patterns
console.log("\n--- Common Patterns ---");

// Retry with exponential backoff
async function retryWithBackoff(fn, maxRetries = 3, delay = 100) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
        }
    }
}

// Timeout wrapper
async function withTimeout(promise, timeoutMs) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), timeoutMs)
        )
    ]);
}

// Debounce with async
function debounceAsync(fn, delay) {
    let timeout;
    return async function(...args) {
        clearTimeout(timeout);
        return new Promise((resolve) => {
            timeout = setTimeout(() => resolve(fn(...args)), delay);
        });
    };
}

console.log("\n✓ async/await completed!");
console.log("Note: Some promises are still pending in the background");
