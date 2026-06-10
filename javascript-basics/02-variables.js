// ============================================
// VARIABLES
// ============================================

// 1. Variable Declaration Methods
console.log("--- Variable Declaration Methods ---");

// var (old way, function-scoped)
var oldWay = "I'm a var";
console.log("var example:", oldWay);

// let (modern way, block-scoped)
let modern = "I'm a let";
console.log("let example:", modern);

// const (constant, cannot be reassigned, block-scoped)
const constant = "I'm a const";
console.log("const example:", constant);

// 2. Variable Naming Conventions
console.log("\n--- Naming Conventions ---");
let myVariable = "camelCase - recommended for variables";
let MyVariable = "PascalCase - used for classes";
let my_variable = "snake_case - less common in JS";
let MY_CONSTANT = "UPPER_SNAKE_CASE - for constants";

console.log(myVariable);

// 3. Scope - Global
console.log("\n--- Scope Examples ---");
let globalVar = "I'm global";

function testScope() {
    // globalVar is accessible here
    console.log("Inside function:", globalVar);
    
    let localVar = "I'm local";
    console.log("Local variable:", localVar);
}

testScope();
// console.log(localVar); // Error: localVar is not defined

// 4. Scope - Block Scope (let and const)
if (true) {
    let blockScoped = "Only inside this block";
    const alsoBlockScoped = "Also only inside block";
    console.log("Inside block:", blockScoped);
}
// console.log(blockScoped); // Error: blockScoped is not defined

// 5. Scope - Function Scope (var)
if (true) {
    var functionScoped = "Accessible outside block!";
}
console.log("Var outside block:", functionScoped);

// 6. Hoisting - var
console.log("\n--- Hoisting ---");
console.log("Before declaration (var):", hoistedVar); // undefined (hoisted but not initialized)
var hoistedVar = "Now I have a value";
console.log("After declaration (var):", hoistedVar);

// 7. Hoisting - let and const
// console.log(temporalDeadZone); // ReferenceError
let temporalDeadZone = "This creates a temporal dead zone";

// 8. Re-declaration
console.log("\n--- Re-declaration ---");

// var allows re-declaration
var canRedeclare = "first";
var canRedeclare = "second";
console.log("var re-declared:", canRedeclare);

// let does NOT allow re-declaration
let noRedeclare = "first";
// let noRedeclare = "second"; // SyntaxError

// 9. Reassignment
console.log("\n--- Reassignment ---");

let canReassign = "original";
canReassign = "modified";
console.log("let after reassignment:", canReassign);

// const CANNOT be reassigned
const frozen = "I stay the same";
// frozen = "different"; // TypeError
console.log("const value:", frozen);

// 10. const with Objects and Arrays
console.log("\n--- const with Objects/Arrays ---");

const user = {
    name: "Alice",
    age: 30
};
// user = {}; // Error - cannot reassign
user.age = 31; // But properties can be modified
console.log("Modified object:", user);

const numbers = [1, 2, 3];
// numbers = []; // Error - cannot reassign
numbers.push(4); // But array can be modified
console.log("Modified array:", numbers);

// 11. Data Types
console.log("\n--- Data Types ---");

// Primitive Types
let stringType = "Hello";
let numberType = 42;
let booleanType = true;
let undefinedType = undefined;
let nullType = null;
let symbolType = Symbol("unique");
let bigintType = 9007199254740991n;

console.log("String:", stringType, typeof stringType);
console.log("Number:", numberType, typeof numberType);
console.log("Boolean:", booleanType, typeof booleanType);
console.log("Undefined:", undefinedType, typeof undefinedType);
console.log("Null:", nullType, typeof nullType);
console.log("Symbol:", symbolType, typeof symbolType);
console.log("BigInt:", bigintType, typeof bigintType);

// 12. Type Conversion
console.log("\n--- Type Conversion ---");

// String to Number
let str = "123";
let num = Number(str);
console.log("String '123' to Number:", num, typeof num);

// Number to String
let number = 456;
let string = String(number);
console.log("Number 456 to String:", string, typeof string);

// String to Boolean
let emptyStr = "";
let filledStr = "hello";
console.log("Empty string to Boolean:", Boolean(emptyStr));
console.log("Filled string to Boolean:", Boolean(filledStr));

// 13. Best Practices Summary
console.log("\n--- Best Practices ---");
console.log("✓ Use 'const' by default");
console.log("✓ Use 'let' when you need to reassign");
console.log("✓ Avoid 'var'");
console.log("✓ Use meaningful variable names");
console.log("✓ Initialize variables when declaring");

console.log("\n✓ Variables completed!");
