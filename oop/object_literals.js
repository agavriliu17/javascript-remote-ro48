// Object Literals in JavaScript
// ============================

// What are Object Literals?
// ------------------------
// Object literals are the simplest way to create objects in JavaScript.
// They are collections of key-value pairs wrapped in curly braces {}.

// Basic Object Literal
const firstPerson = {
  // Properties
  firstName: "John",
  lastName: "Doe",
  age: 30,

  // Methods
  getFullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },

  // Shorthand method syntax (ES6)
  greet() {
    return `Hello, my name is ${this.getFullName()}`;
  },
};

// Accessing Properties
console.log("Accessing Properties:");
console.log(firstPerson.firstName); // Dot notation
console.log(firstPerson["lastName"]); // Bracket notation
console.log(firstPerson.getFullName()); // Calling a method

// Modifying Properties
console.log("\nModifying Properties:");
firstPerson.age = 31; // Update existing property
firstPerson.email = "john@example.com"; // Add new property
console.log(firstPerson);

// Nested Objects
const secondPerson = {
  // Properties
  firstName: "John",
  lastName: "Doe",
  age: 30,

  // Nested family object
  family: {
    children: [
      {
        name: "Sarah",
        age: 8,
        pet: {
          name: "Fluffy",
          type: "cat",
        },
      },
      {
        name: "John Jr",
        age: 10,
        pet: {
          name: "Rex",
          type: "dog",
        },
      },
    ],
  },

  // Methods
  getFullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },

  // Shorthand method syntax (ES6)
  greet() {
    return `Hello, my name is ${this.getFullName()}`;
  },
};

// Accessing Nested Objects
console.log("\nAccessing Nested Objects:");
console.log(secondPerson.family.children[0].pet.name); // Accessing the name of the pet
console.log(secondPerson.family.children[1].age); // Accessing the age of the second child

// Computed Property Names (ES6)
const objectProperty = "firstName";
console.log(secondPerson[objectProperty]); // person.firstName

// Immutability in JavaScript
// Immutable (can't change): numbers, booleans, strings
// Mutable (can change): objects, arrays
// When you modify a mutable value, all references to it see the change

console.log(firstPerson.age);
// shallow copy (reference)
const firstPersonCopy = firstPerson;
firstPersonCopy.age = 60;
console.log(firstPersonCopy.age);
console.log(firstPerson.age);

// deep copy (value)
const firstPersonDeepCopy = { ...firstPerson };
firstPersonDeepCopy.age = 60;
console.log(firstPersonDeepCopy.age);
console.log(firstPerson.age);

// Destructuring in js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring
console.log("Destructuring in js");
const { age, lastName, firstName, ...family } = secondPerson;
console.log(secondPerson.age, age);
console.log(family);
