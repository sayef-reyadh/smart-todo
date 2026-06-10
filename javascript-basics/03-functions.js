// ============================================
// FUNCTIONS
// ============================================

// 1. Function Declaration
console.log("--- Function Declaration ---");

function greet(name) {
    return "Hello, " + name;
}

console.log(greet("Alice"));

// 2. Function Expression
console.log("\n--- Function Expression ---");

const add = function(a, b) {
    return a + b;
};

console.log("5 + 3 =", add(5, 3));

// 3. Arrow Functions
console.log("\n--- Arrow Functions ---");

const multiply = (a, b) => a * b;
console.log("5 * 3 =", multiply(5, 3));

// Arrow function with multiple lines
const calculateArea = (radius) => {
    const pi = 3.14159;
    return pi * radius * radius;
};
console.log("Area of circle (r=5):", calculateArea(5).toFixed(2));

// 4. Function Parameters and Arguments
console.log("\n--- Parameters and Arguments ---");

function printInfo(firstName, lastName = "Doe") {
    console.log(`Name: ${firstName} ${lastName}`);
}

printInfo("John");
printInfo("Jane", "Smith");

// 5. Rest Parameters
console.log("\n--- Rest Parameters ---");

function sum(...numbers) {
    let total = 0;
    for (let num of numbers) {
        total += num;
    }
    return total;
}

console.log("Sum of 1, 2, 3, 4, 5:", sum(1, 2, 3, 4, 5));

// 6. Return Values
console.log("\n--- Return Values ---");

function checkAge(age) {
    if (age >= 18) {
        return "Adult";
    } else {
        return "Minor";
    }
}

console.log("Age 25:", checkAge(25));
console.log("Age 15:", checkAge(15));

// Function without explicit return (returns undefined)
function noReturn() {
    console.log("This function doesn't return anything");
}
console.log("Result:", noReturn());

// 7. Function Hoisting
console.log("\n--- Function Hoisting ---");

console.log("Hoisted function called before declaration:", hoistedFunc());

function hoistedFunc() {
    return "I'm hoisted!";
}

// 8. Scope and Closures
console.log("\n--- Closures ---");

function makeCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

const counter = makeCounter();
console.log("Counter 1:", counter());
console.log("Counter 2:", counter());
console.log("Counter 3:", counter());

// 9. Callback Functions
console.log("\n--- Callback Functions ---");

function processUserInput(callback) {
    const userInput = "John";
    callback(userInput);
}

processUserInput(function(name) {
    console.log("User entered:", name);
});

// 10. Higher-Order Functions
console.log("\n--- Higher-Order Functions ---");

function repeat(n, callback) {
    for (let i = 0; i < n; i++) {
        callback(i);
    }
}

repeat(3, (i) => {
    console.log("Iteration", i + 1);
});

// 11. Function Methods - call, apply, bind
console.log("\n--- Function Methods ---");

const person = {
    name: "Alice",
    greet: function() {
        console.log("Hello, I'm " + this.name);
    }
};

person.greet();

// call method
function introduce(city, country) {
    console.log(`I'm ${this.name} from ${city}, ${country}`);
}
introduce.call(person, "New York", "USA");

// apply method (similar to call, but takes array)
introduce.apply(person, ["London", "UK"]);

// bind method (creates new function with bound context)
const boundIntroduce = introduce.bind(person);
boundIntroduce("Paris", "France");

// 12. Recursive Functions
console.log("\n--- Recursive Functions ---");

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

console.log("Factorial of 5:", factorial(5));

// 13. IIFE (Immediately Invoked Function Expression)
console.log("\n--- IIFE ---");

(function() {
    console.log("This function runs immediately!");
})();

// 14. Function Best Practices
console.log("\n--- Best Practices ---");

// Pure function - same input, same output, no side effects
const purePure = (x) => x * 2;
console.log("Pure function:", purePure(5));

// Descriptive naming
function calculateUserTaxAmount(income, taxRate) {
    return income * taxRate;
}
console.log("Tax:", calculateUserTaxAmount(100000, 0.25));

console.log("\n✓ Functions completed!");
