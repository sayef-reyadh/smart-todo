// ============================================
// ASYNC JAVASCRIPT
// ============================================

// 1. Synchronous vs Asynchronous
console.log("--- Synchronous vs Asynchronous ---");

console.log("Start");
console.log("Middle"); // This waits for Start to complete
console.log("End");   // This waits for Middle to complete

console.log("\n--- Asynchronous with setTimeout ---");
console.log("Start");

setTimeout(() => {
    console.log("This runs after 1000ms (async)");
}, 1000);

console.log("End"); // This runs immediately, doesn't wait for setTimeout

// 2. Callbacks
console.log("\n--- Callbacks ---");

function fetchUserData(userId, callback) {
    console.log("Fetching user data for ID:", userId);
    
    setTimeout(() => {
        const user = { id: userId, name: "John Doe", email: "john@example.com" };
        callback(user);
    }, 500);
}

fetchUserData(1, (user) => {
    console.log("User data received:", user);
});

// 3. Callback Hell / Pyramid of Doom
console.log("\n--- Callback Hell Example ---");

function getUser(id, callback) {
    setTimeout(() => {
        callback({ id: id, name: "User " + id });
    }, 300);
}

function getPosts(userId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, title: "Post 1", userId: userId },
            { id: 2, title: "Post 2", userId: userId }
        ]);
    }, 300);
}

function getComments(postId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, text: "Comment 1", postId: postId },
            { id: 2, text: "Comment 2", postId: postId }
        ]);
    }, 300);
}

// Nested callbacks (Pyramid of Doom)
getUser(1, (user) => {
    console.log("Got user:", user.name);
    getPosts(user.id, (posts) => {
        console.log("Got posts:", posts.length);
        getComments(posts[0].id, (comments) => {
            console.log("Got comments:", comments.length);
        });
    });
});

// 4. setTimeout and setInterval
console.log("\n--- setTimeout and setInterval ---");

// setTimeout - runs once after delay
const timeoutId = setTimeout(() => {
    console.log("This runs after 2 seconds (setTimeout)");
}, 2000);

// Clear timeout before it executes
// clearTimeout(timeoutId);

// setInterval - runs repeatedly
console.log("Starting interval:");
const intervalId = setInterval(() => {
    console.log("This repeats every 1 second");
}, 1000);

// Clear interval after 3.5 seconds
setTimeout(() => {
    clearInterval(intervalId);
    console.log("Interval cleared");
}, 3500);

// 5. Event Loop Demonstration
console.log("\n--- Event Loop Demonstration ---");

console.log("1. Start");

setTimeout(() => {
    console.log("2. setTimeout callback (macrotask)");
}, 0);

Promise.resolve()
    .then(() => {
        console.log("3. Promise callback (microtask)");
    });

console.log("4. End");

// Output order:
// 1. Start
// 4. End
// 3. Promise callback (microtask)
// 2. setTimeout callback (macrotask)

// 6. Multiple Asynchronous Operations
console.log("\n--- Multiple Async Operations ---");

function operation1() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Operation 1 complete");
        }, 500);
    });
}

function operation2() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Operation 2 complete");
        }, 300);
    });
}

function operation3() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Operation 3 complete");
        }, 400);
    });
}

// Sequential approach (slower)
console.log("Sequential execution:");
operation1().then(res1 => {
    console.log(res1);
    return operation2();
}).then(res2 => {
    console.log(res2);
    return operation3();
}).then(res3 => {
    console.log(res3);
});

// 7. Microtasks vs Macrotasks
console.log("\n--- Microtasks vs Macrotasks ---");

console.log("Main script start");

setTimeout(() => {
    console.log("setTimeout (macrotask)");
}, 0);

Promise.resolve()
    .then(() => {
        console.log("Promise.then (microtask)");
    })
    .then(() => {
        console.log("Promise.then 2 (microtask)");
    });

console.log("Main script end");

// 8. Error Handling in Callbacks
console.log("\n--- Error Handling ---");

function fetchData(shouldFail, callback) {
    setTimeout(() => {
        if (shouldFail) {
            callback(new Error("Data fetch failed"));
        } else {
            callback(null, { data: "Success" });
        }
    }, 300);
}

fetchData(false, (err, result) => {
    if (err) {
        console.error("Error:", err.message);
    } else {
        console.log("Result:", result);
    }
});

fetchData(true, (err, result) => {
    if (err) {
        console.error("Error:", err.message);
    } else {
        console.log("Result:", result);
    }
});

// 9. Common Async Patterns
console.log("\n--- Common Patterns ---");

// Debounce
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

const debouncedLog = debounce((message) => {
    console.log("Debounced:", message);
}, 500);

debouncedLog("First");
debouncedLog("Second");
debouncedLog("Third"); // Only this one will execute

// Throttle
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

const throttledLog = throttle((message) => {
    console.log("Throttled:", message);
}, 1000);

throttledLog("A");
throttledLog("B");
throttledLog("C");

console.log("\n✓ Async JavaScript concepts explained!");
console.log("Note: Some timers will continue running. This demonstrates async concepts.");
