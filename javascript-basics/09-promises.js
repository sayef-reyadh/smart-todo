// ============================================
// PROMISES
// ============================================

// 1. What is a Promise?
console.log("--- What is a Promise? ---");
console.log("A Promise is an object that represents the eventual completion");
console.log("(or failure) of an asynchronous operation and its resulting value\n");

// 2. Promise States
console.log("--- Promise States ---");
console.log("1. Pending: Initial state, operation hasn't completed");
console.log("2. Fulfilled: Operation completed successfully");
console.log("3. Rejected: Operation failed\n");

// 3. Creating a Promise
console.log("--- Creating Promises ---");

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Success!");
    }, 1000);
});

console.log("Promise created:", myPromise);

// 4. Promise Constructor with resolve
console.log("\n--- Promise with resolve ---");

const resolvedPromise = new Promise((resolve, reject) => {
    const data = { name: "Alice", age: 30 };
    resolve(data);
});

resolvedPromise.then((result) => {
    console.log("Resolved:", result);
});

// 5. Promise Constructor with reject
console.log("\n--- Promise with reject ---");

const rejectedPromise = new Promise((resolve, reject) => {
    reject(new Error("Something went wrong"));
});

rejectedPromise.catch((error) => {
    console.error("Rejected:", error.message);
});

// 6. .then() method
console.log("\n--- .then() method ---");

new Promise((resolve) => {
    setTimeout(() => {
        resolve(10);
    }, 500);
})
.then((result) => {
    console.log("First then - received:", result);
    return result * 2;
})
.then((result) => {
    console.log("Second then - received:", result);
    return result * 2;
})
.then((result) => {
    console.log("Third then - received:", result);
});

// 7. .catch() method
console.log("\n--- .catch() method ---");

new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error("Network error"));
    }, 500);
})
.catch((error) => {
    console.error("Caught error:", error.message);
});

// 8. .finally() method
console.log("\n--- .finally() method ---");

new Promise((resolve) => {
    setTimeout(() => {
        resolve("Operation complete");
    }, 500);
})
.then((result) => {
    console.log("Result:", result);
})
.finally(() => {
    console.log("Finally - cleanup code runs regardless");
});

// 9. Promise Chaining
console.log("\n--- Promise Chaining ---");

function fetchUser(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userId, name: "John", postIds: [1, 2, 3] });
        }, 300);
    });
}

function fetchPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1", userId },
                { id: 2, title: "Post 2", userId }
            ]);
        }, 300);
    });
}

function fetchComments(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Comment 1", postId },
                { id: 2, text: "Comment 2", postId }
            ]);
        }, 300);
    });
}

// Chain multiple promises
fetchUser(1)
    .then((user) => {
        console.log("User:", user.name);
        return fetchPosts(user.id);
    })
    .then((posts) => {
        console.log("Posts received:", posts.length);
        return fetchComments(posts[0].id);
    })
    .then((comments) => {
        console.log("Comments received:", comments.length);
    });

// 10. Error Handling in Promise Chain
console.log("\n--- Error Handling in Chains ---");

function errorDemo(shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error("Operation failed"));
            } else {
                resolve("Success");
            }
        }, 300);
    });
}

errorDemo(true)
    .then((result) => {
        console.log("Success:", result);
    })
    .catch((error) => {
        console.error("Caught error:", error.message);
    })
    .finally(() => {
        console.log("Cleanup");
    });

// 11. Promise.all()
console.log("\n--- Promise.all() ---");

const p1 = Promise.resolve(3);
const p2 = new Promise((resolve) => {
    setTimeout(() => resolve("foo"), 100);
});
const p3 = fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(res => res.json())
    .catch(() => ({ name: "Demo User" }));

Promise.all([p1, p2, p3])
    .then((values) => {
        console.log("All promises resolved:", values);
    })
    .catch((error) => {
        console.error("One promise rejected:", error);
    });

// 12. Promise.allSettled()
console.log("\n--- Promise.allSettled() ---");

const promise1 = Promise.resolve("Success 1");
const promise2 = Promise.reject(new Error("Failed"));
const promise3 = Promise.resolve("Success 3");

Promise.allSettled([promise1, promise2, promise3])
    .then((results) => {
        console.log("All settled:");
        results.forEach((result, index) => {
            console.log(`Result ${index}:`, result);
        });
    });

// 13. Promise.race()
console.log("\n--- Promise.race() ---");

const fast = new Promise((resolve) => {
    setTimeout(() => resolve("Fast"), 100);
});

const slow = new Promise((resolve) => {
    setTimeout(() => resolve("Slow"), 1000);
});

Promise.race([fast, slow])
    .then((result) => {
        console.log("Race winner:", result);
    });

// 14. Promise.any()
console.log("\n--- Promise.any() ---");

const rejected1 = Promise.reject("Error 1");
const rejected2 = Promise.reject("Error 2");
const resolved = Promise.resolve("Success");

Promise.any([rejected1, rejected2, resolved])
    .then((result) => {
        console.log("First fulfilled promise:", result);
    })
    .catch((error) => {
        console.error("All rejected:", error);
    });

// 15. Creating Promise-returning functions
console.log("\n--- Promise-returning Functions ---");

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

async function example() {
    console.log("Starting...");
    await delay(500);
    console.log("After 500ms");
}

// 16. Promise vs Callback Comparison
console.log("\n--- Promise vs Callback ---");

// Callback approach
function fetchWithCallback(callback) {
    setTimeout(() => {
        callback(null, { data: "result" });
    }, 500);
}

// Promise approach
function fetchWithPromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: "result" });
        }, 500);
    });
}

// Using callback
fetchWithCallback((err, data) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Callback result:", data);
    }
});

// Using promise
fetchWithPromise()
    .then((data) => {
        console.log("Promise result:", data);
    });

// 17. Converting Callbacks to Promises
console.log("\n--- Converting Callback to Promise ---");

// Original callback-based function
function readFile(filename, callback) {
    setTimeout(() => {
        callback(null, "file contents");
    }, 300);
}

// Convert to promise-based
function readFilePromise(filename) {
    return new Promise((resolve, reject) => {
        readFile(filename, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

readFilePromise("myfile.txt")
    .then((data) => {
        console.log("File content:", data);
    });

// 18. Common Promise Patterns
console.log("\n--- Common Patterns ---");

// Retry pattern
function retryPromise(promiseFn, times = 3) {
    return promiseFn().catch((error) => {
        if (times <= 1) throw error;
        console.log(`Retrying... (${times - 1} attempts left)`);
        return retryPromise(promiseFn, times - 1);
    });
}

// Timeout pattern
function promiseWithTimeout(promise, ms) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), ms)
        )
    ]);
}

console.log("\n✓ Promises completed!");
console.log("Note: Some promises are still pending in the background");
