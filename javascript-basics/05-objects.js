// ============================================
// OBJECTS
// ============================================

// 1. Object Creation
console.log("--- Object Creation ---");

// Object literal
const person = {
    name: "Alice",
    age: 30,
    city: "New York"
};
console.log("Person object:", person);

// Using constructor
const car = new Object();
car.brand = "Toyota";
car.model = "Camry";
car.year = 2023;
console.log("Car object:", car);

// 2. Accessing Properties
console.log("\n--- Accessing Properties ---");

console.log("Name:", person.name);
console.log("Age:", person["age"]);
console.log("City:", person["city"]);

// 3. Adding and Modifying Properties
console.log("\n--- Adding/Modifying Properties ---");

person.email = "alice@example.com"; // add new property
person.age = 31; // modify existing property
console.log("Updated person:", person);

// 4. Deleting Properties
console.log("\n--- Deleting Properties ---");

const user = {
    username: "john",
    password: "secret",
    email: "john@example.com"
};

delete user.password;
console.log("After deletion:", user);

// 5. Methods (Functions in Objects)
console.log("\n--- Object Methods ---");

const calculator = {
    value: 0,
    add: function(num) {
        this.value += num;
        return this;
    },
    subtract: function(num) {
        this.value -= num;
        return this;
    },
    getResult: function() {
        return this.value;
    }
};

console.log("Calculator chaining:");
calculator.add(10).subtract(3).add(5);
console.log("Result:", calculator.getResult());

// 6. Method Shorthand Syntax
console.log("\n--- Method Shorthand ---");

const dog = {
    name: "Rex",
    breed: "Labrador",
    bark() {
        console.log(`${this.name} says: Woof!`);
    }
};

dog.bark();

// 7. Computed Property Names
console.log("\n--- Computed Property Names ---");

const propName = "city";
const location = {
    [propName]: "Tokyo",
    country: "Japan"
};
console.log("Location:", location);

// 8. Property Descriptors and this
console.log("\n--- The 'this' Keyword ---");

const student = {
    name: "Bob",
    gpa: 3.8,
    getInfo() {
        return `${this.name} has GPA ${this.gpa}`;
    }
};

console.log(student.getInfo());

// 9. Nested Objects
console.log("\n--- Nested Objects ---");

const employee = {
    name: "Charlie",
    position: "Developer",
    contact: {
        email: "charlie@example.com",
        phone: "555-1234",
        address: {
            street: "123 Main St",
            city: "Boston"
        }
    }
};

console.log("Employee:", employee);
console.log("Email:", employee.contact.email);
console.log("City:", employee.contact.address.city);

// 10. Object Methods for Keys and Values
console.log("\n--- Keys and Values ---");

const product = {
    id: 1,
    name: "Laptop",
    price: 999.99,
    stock: 50
};

console.log("Keys:", Object.keys(product));
console.log("Values:", Object.values(product));
console.log("Entries:", Object.entries(product));

// 11. Iterating Over Objects
console.log("\n--- Iterating Over Objects ---");

// for...in loop
console.log("for...in loop:");
for (let key in product) {
    console.log(`${key}: ${product[key]}`);
}

// forEach with entries
console.log("\nforEach with entries:");
Object.entries(product).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});

// 12. Object Destructuring
console.log("\n--- Object Destructuring ---");

const { name, age, city } = person;
console.log(`${name} is ${age} years old from ${city}`);

// Destructuring with renaming
const { name: personName, age: personAge } = person;
console.log(`Person: ${personName}, Age: ${personAge}`);

// Destructuring with defaults
const { name: n, country = "USA" } = person;
console.log(`${n} from ${country}`);

// 13. Spread Operator with Objects
console.log("\n--- Spread Operator ---");

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

const merged = { ...obj1, ...obj2 };
console.log("Merged:", merged);

const override = { ...obj1, b: 99 };
console.log("Override:", override);

// 14. Object.assign
console.log("\n--- Object.assign ---");

const defaultSettings = {
    theme: "light",
    notifications: true
};

const userSettings = {
    theme: "dark"
};

const finalSettings = Object.assign({}, defaultSettings, userSettings);
console.log("Final settings:", finalSettings);

// 15. Object Constructors and Prototypes
console.log("\n--- Object Constructors ---");

function Person(name, age) {
    this.name = name;
    this.age = age;
    this.greet = function() {
        console.log(`Hi, I'm ${this.name}`);
    };
}

const person1 = new Person("Diana", 28);
console.log(person1);
person1.greet();

// 16. Classes (Modern Syntax)
console.log("\n--- Classes ---");

class Animal {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
    
    describe() {
        return `${this.name} is a ${this.type}`;
    }
}

const animal1 = new Animal("Leo", "Lion");
console.log(animal1.describe());

// 17. Object Freeze and Seal
console.log("\n--- Freeze and Seal ---");

const immutable = Object.freeze({ x: 1, y: 2 });
// immutable.x = 99; // Error in strict mode, silent fail otherwise

const sealed = Object.seal({ a: 1 });
sealed.a = 2; // OK - modify existing
// sealed.b = 3; // Error - cannot add new property

console.log("Frozen:", immutable);
console.log("Sealed:", sealed);

// 18. Checking Properties
console.log("\n--- Checking Properties ---");

const obj = { prop: "value" };

console.log("'prop' in obj:", 'prop' in obj);
console.log("'missing' in obj:", 'missing' in obj);
console.log("obj.hasOwnProperty('prop'):", obj.hasOwnProperty('prop'));

console.log("\n✓ Objects completed!");
