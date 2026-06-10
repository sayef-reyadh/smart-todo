// ============================================
// JAVASCRIPT FUNDAMENTALS
// ============================================

// 1. Basic Output
console.log("Hello, World!");

// 2. Comments
// This is a single-line comment
/* This is a 
   multi-line comment */

// 3. Basic Syntax Rules
// - JavaScript is case-sensitive
let name = "John"; // lowercase 'let' keyword
let Name = "Jane"; // different variable

console.log("Case sensitivity example:");
console.log(name); // John
console.log(Name); // Jane

// 4. Semicolons and Statement Terminators
let x = 5;
let y = 10;
console.log("x + y =", x + y);

// 5. Statements and Expressions
// Statement: performs an action
let age = 25;

// Expression: evaluates to a value
let result = age + 5;
console.log("Age result:", result);

// 6. Arithmetic Operations
console.log("\n--- Arithmetic Operations ---");
console.log("10 + 5 =", 10 + 5);
console.log("10 - 5 =", 10 - 5);
console.log("10 * 5 =", 10 * 5);
console.log("10 / 5 =", 10 / 5);
console.log("10 % 3 =", 10 % 3); // Modulo (remainder)
console.log("2 ** 3 =", 2 ** 3); // Exponentiation

// 7. Operator Precedence
let calculation = 2 + 3 * 4; // Multiplication first
console.log("\n2 + 3 * 4 =", calculation); // 14

// 8. Assignment Operators
let num = 10;
num += 5; // num = num + 5
console.log("\nAfter += 5:", num);

// 9. Comparison Operators
console.log("\n--- Comparison Operators ---");
console.log("5 == '5':", 5 == '5'); // true (loose equality)
console.log("5 === '5':", 5 === '5'); // false (strict equality)
console.log("5 != '5':", 5 != '5'); // false
console.log("5 !== '5':", 5 !== '5'); // true
console.log("10 > 5:", 10 > 5);
console.log("10 < 5:", 10 < 5);

// 10. Logical Operators
console.log("\n--- Logical Operators ---");
console.log("true && false:", true && false); // AND
console.log("true || false:", true || false); // OR
console.log("!true:", !true); // NOT

// 11. String Operations
console.log("\n--- String Operations ---");
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName;
console.log("Full Name:", fullName);

// String concatenation with template literals
console.log(`Hello, ${firstName} ${lastName}!`);

// 12. Type of Operator
console.log("\n--- Type Checking ---");
console.log("typeof 42:", typeof 42);
console.log("typeof 'hello':", typeof 'hello');
console.log("typeof true:", typeof true);
console.log("typeof undefined:", typeof undefined);
console.log("typeof null:", typeof null); // Returns "object" (quirk in JS)

// 13. Truthy and Falsy Values
console.log("\n--- Truthy and Falsy ---");
if (1) console.log("1 is truthy");
if ("hello") console.log("'hello' is truthy");
if (0) console.log("0 is truthy"); // This won't execute
if ("") console.log("empty string is truthy"); // This won't execute
if (undefined) console.log("undefined is truthy"); // This won't execute

console.log("\n✓ JavaScript Fundamentals completed!");
