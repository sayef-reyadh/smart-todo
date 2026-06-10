// ============================================
// JSON (JavaScript Object Notation)
// ============================================

// 1. What is JSON?
console.log("--- What is JSON? ---");
console.log("JSON is a lightweight data format for data exchange");
console.log("It's language-independent and easy to read/write");
console.log("Supported by all modern programming languages\n");

// 2. JSON Structure
console.log("--- JSON Structure ---");
console.log(`
JSON consists of:
1. Objects: { key: value }
2. Arrays: [ value1, value2 ]
3. Primitive values: string, number, boolean, null
4. No functions, undefined, or comments
`);

// 3. Valid JSON values
console.log("\n--- Valid JSON Values ---");

const jsonExample = `{
  "string": "hello",
  "number": 42,
  "float": 3.14,
  "boolean": true,
  "null": null,
  "array": [1, 2, 3],
  "object": { "nested": "value" }
}`;

console.log("Valid JSON example:");
console.log(jsonExample);

// 4. JSON.stringify()
console.log("\n--- JSON.stringify() ---");

const user = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    age: 30,
    isActive: true
};

// Basic stringify
const jsonString = JSON.stringify(user);
console.log("Stringified:", jsonString);

// With formatting (pretty print)
const prettyJson = JSON.stringify(user, null, 2);
console.log("\nPretty printed:");
console.log(prettyJson);

// 5. JSON.parse()
console.log("\n--- JSON.parse() ---");

const jsonData = '{"name":"Bob","age":25,"city":"New York"}';
const parsed = JSON.parse(jsonData);

console.log("Parsed object:", parsed);
console.log("Name:", parsed.name);
console.log("Age:", parsed.age);

// 6. Stringify with replacer
console.log("\n--- Stringify with Replacer ---");

const product = {
    id: 1,
    name: "Laptop",
    price: 999.99,
    inStock: true,
    password: "secret123"
};

// Only include specific keys
const filtered = JSON.stringify(product, ['id', 'name', 'price']);
console.log("Filtered stringify:", filtered);

// Using replacer function
const customJson = JSON.stringify(product, (key, value) => {
    // Hide password
    if (key === 'password') {
        return undefined;
    }
    // Convert price to string with currency
    if (key === 'price') {
        return '$' + value;
    }
    return value;
});
console.log("Custom stringify:", customJson);

// 7. Parse with reviver
console.log("\n--- Parse with Reviver ---");

const dateJson = '{"name":"Event","date":"2024-01-15T10:30:00.000Z"}';

const revivedData = JSON.parse(dateJson, (key, value) => {
    // Convert string dates to Date objects
    if (key === 'date') {
        return new Date(value);
    }
    return value;
});

console.log("Revived data:", revivedData);
console.log("Date type:", revivedData.date instanceof Date);

// 8. Handling special values
console.log("\n--- Special Values ---");

const complex = {
    string: "text",
    number: 42,
    boolean: true,
    nullValue: null,
    array: [1, 2, 3],
    nested: {
        a: 1,
        b: 2
    }
};

console.log("Before stringify:");
console.log(complex);

const stringified = JSON.stringify(complex);
const reparsed = JSON.parse(stringified);

console.log("\nAfter stringify and parse:");
console.log(reparsed);

// 9. Arrays in JSON
console.log("\n--- Arrays in JSON ---");

const users = [
    { id: 1, name: "Alice", role: "admin" },
    { id: 2, name: "Bob", role: "user" },
    { id: 3, name: "Charlie", role: "user" }
];

const usersJson = JSON.stringify(users, null, 2);
console.log("Users JSON:");
console.log(usersJson);

const parsedUsers = JSON.parse(usersJson);
console.log("\nParsed users:");
parsedUsers.forEach((user, index) => {
    console.log(`${index + 1}. ${user.name} (${user.role})`);
});

// 10. Error handling
console.log("\n--- Error Handling ---");

const invalidJson = '{"name": "Alice", "age": undefined}';

try {
    JSON.parse(invalidJson);
} catch (error) {
    console.error("Parse error:", error.message);
}

// Safe parse
function safeJsonParse(jsonString, defaultValue = null) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.warn("Failed to parse JSON:", error.message);
        return defaultValue;
    }
}

const result = safeJsonParse('invalid json', {});
console.log("Safe parse result:", result);

// 11. JSON with localStorage
console.log("\n--- JSON with localStorage (browser) ---");

console.log(`
// Store object as JSON
const user = { name: 'Alice', age: 30 };
localStorage.setItem('user', JSON.stringify(user));

// Retrieve and parse JSON
const retrieved = localStorage.getItem('user');
const parsedUser = JSON.parse(retrieved);
console.log(parsedUser);

// Clear
localStorage.removeItem('user');
`);

// 12. JSON with API
console.log("\n--- JSON with APIs ---");

console.log(`
// Sending JSON
async function sendData(data) {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)  // Convert to JSON
    });
    const result = await response.json();  // Parse JSON response
    return result;
}

// Receiving JSON
async function getData() {
    const response = await fetch('/api/users');
    const data = await response.json();  // Parse response
    return data;
}
`);

// 13. Common JSON patterns
console.log("\n--- Common Patterns ---");

// API Response
const apiResponse = {
    success: true,
    data: {
        users: [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
        ]
    },
    message: "Data retrieved successfully"
};

console.log("API Response JSON:");
console.log(JSON.stringify(apiResponse, null, 2));

// Configuration file pattern
const config = {
    app: {
        name: "MyApp",
        version: "1.0.0",
        debug: false
    },
    database: {
        host: "localhost",
        port: 5432,
        name: "mydb"
    },
    logging: {
        level: "info",
        format: "json"
    }
};

console.log("\nConfig JSON:");
console.log(JSON.stringify(config, null, 2));

// 14. JSON vs JavaScript Object
console.log("\n--- JSON vs JavaScript Object ---");

// JavaScript object (with functions, undefined)
const jsObject = {
    name: "Alice",
    greet() {
        return "Hi " + this.name;
    },
    isActive: undefined  // undefined
};

console.log("JavaScript object:", jsObject);

// JSON version (no functions, no undefined)
const jsonObject = {
    name: "Alice",
    age: 30,
    isActive: true
};

const jsonString2 = JSON.stringify(jsonObject);
console.log("JSON string:", jsonString2);

// 15. Deep copy with JSON
console.log("\n--- Deep Copy with JSON ---");

const original = {
    name: "Alice",
    address: {
        city: "New York",
        zip: 10001
    }
};

// Deep copy using JSON
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.address.city = "Boston";

console.log("Original city:", original.address.city);
console.log("Copy city:", deepCopy.address.city);

// 16. Practical example: Transform data
console.log("\n--- Data Transformation ---");

const rawData = `
[
  {"id": 1, "firstName": "John", "lastName": "Doe"},
  {"id": 2, "firstName": "Jane", "lastName": "Smith"}
]
`;

const people = JSON.parse(rawData);
const transformed = people.map(person => ({
    id: person.id,
    fullName: person.firstName + " " + person.lastName
}));

console.log("Transformed:", JSON.stringify(transformed, null, 2));

// 17. Validation
console.log("\n--- JSON Validation ---");

function isValidJson(string) {
    try {
        JSON.parse(string);
        return true;
    } catch (error) {
        return false;
    }
}

console.log("Valid JSON:", isValidJson('{"name":"Alice"}'));
console.log("Invalid JSON:", isValidJson('{name: Alice}'));
console.log("Valid number:", isValidJson('42'));
console.log("Invalid:", isValidJson('undefined'));

console.log("\n✓ JSON completed!");
