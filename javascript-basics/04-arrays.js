// ============================================
// ARRAYS
// ============================================

// 1. Array Creation
console.log("--- Array Creation ---");

// Literal notation
const fruits = ["apple", "banana", "orange"];
console.log("Fruits array:", fruits);

// Array constructor
const numbers = new Array(1, 2, 3, 4, 5);
console.log("Numbers array:", numbers);

// Empty array
const empty = [];
console.log("Empty array:", empty);

// 2. Accessing Array Elements
console.log("\n--- Accessing Elements ---");

console.log("First fruit:", fruits[0]);
console.log("Second fruit:", fruits[1]);
console.log("Array length:", fruits.length);
console.log("Last fruit:", fruits[fruits.length - 1]);

// 3. Modifying Arrays
console.log("\n--- Modifying Arrays ---");

fruits[0] = "apricot";
console.log("After modification:", fruits);

fruits[3] = "grape";
console.log("After adding new element:", fruits);

// 4. Array Methods - Adding Elements
console.log("\n--- Adding Elements ---");

const colors = ["red", "green"];

// push - adds to end
colors.push("blue");
console.log("After push:", colors);

// unshift - adds to beginning
colors.unshift("yellow");
console.log("After unshift:", colors);

// 5. Array Methods - Removing Elements
console.log("\n--- Removing Elements ---");

const cities = ["New York", "London", "Paris", "Tokyo"];

// pop - removes last element
const lastCity = cities.pop();
console.log("Popped:", lastCity);
console.log("After pop:", cities);

// shift - removes first element
const firstCity = cities.shift();
console.log("Shifted:", firstCity);
console.log("After shift:", cities);

// splice - removes/adds at any position
const months = ["Jan", "Feb", "Mar", "Apr", "May"];
const removed = months.splice(2, 2, "March", "April");
console.log("Removed:", removed);
console.log("After splice:", months);

// 6. Array Methods - Finding Elements
console.log("\n--- Finding Elements ---");

const items = [10, 20, 30, 40, 50];

// indexOf
console.log("Index of 30:", items.indexOf(30));
console.log("Index of 999:", items.indexOf(999));

// includes
console.log("Includes 40:", items.includes(40));
console.log("Includes 999:", items.includes(999));

// find - returns first element matching condition
const found = items.find(item => item > 25);
console.log("First item > 25:", found);

// findIndex
const foundIndex = items.findIndex(item => item > 35);
console.log("Index of first item > 35:", foundIndex);

// 7. Array Methods - Iteration
console.log("\n--- Array Iteration ---");

const nums = [1, 2, 3, 4, 5];

// forEach - executes function for each element
console.log("forEach output:");
nums.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});

// 8. Array Methods - Transformation
console.log("\n--- Transformation ---");

// map - creates new array by transforming each element
const doubled = nums.map(num => num * 2);
console.log("Original:", nums);
console.log("Doubled:", doubled);

// filter - creates new array with elements matching condition
const evenNumbers = nums.filter(num => num % 2 === 0);
console.log("Even numbers:", evenNumbers);

// reduce - accumulates array values into single value
const sum = nums.reduce((total, num) => total + num, 0);
console.log("Sum:", sum);

const product = nums.reduce((acc, num) => acc * num, 1);
console.log("Product:", product);

// 9. Array Methods - Sorting and Reversing
console.log("\n--- Sorting and Reversing ---");

const unsorted = [5, 2, 8, 1, 9];
console.log("Original:", unsorted);

const sorted = [...unsorted].sort((a, b) => a - b);
console.log("Sorted ascending:", sorted);

const reversed = [...unsorted].reverse();
console.log("Reversed:", reversed);

// 10. Array Methods - Combining Arrays
console.log("\n--- Combining Arrays ---");

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// concat
const combined = arr1.concat(arr2);
console.log("Concatenated:", combined);

// spread operator
const spread = [...arr1, ...arr2];
console.log("Using spread:", spread);

// 11. Array Methods - Other Useful Methods
console.log("\n--- Other Methods ---");

// join - converts array to string
const joined = ["apple", "banana", "cherry"].join(", ");
console.log("Joined:", joined);

// slice - returns portion of array
const sliced = [1, 2, 3, 4, 5].slice(1, 4);
console.log("Sliced [1:4]:", sliced);

// every - checks if all elements match condition
const allPositive = [1, 2, 3, 4].every(num => num > 0);
console.log("All positive:", allPositive);

// some - checks if any element matches condition
const hasNegative = [1, -2, 3].some(num => num < 0);
console.log("Has negative:", hasNegative);

// 12. Multi-dimensional Arrays
console.log("\n--- Multi-dimensional Arrays ---");

const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log("Matrix:", matrix);
console.log("Element at [1][2]:", matrix[1][2]);

// 13. Array Destructuring
console.log("\n--- Array Destructuring ---");

const [first, second, third] = ["a", "b", "c"];
console.log("First:", first, "Second:", second);

const [a, , c] = [1, 2, 3]; // skip middle element
console.log("a:", a, "c:", c);

// 14. Checking if Array
console.log("\n--- Array Type Checking ---");

console.log("Is array:", Array.isArray([1, 2, 3]));
console.log("Is array:", Array.isArray("not array"));

console.log("\n✓ Arrays completed!");
