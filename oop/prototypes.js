// Prototypes in JavaScript
// ======================

// What are Prototypes?
// -------------------
// Prototypes are the mechanism by which JavaScript objects inherit features from one another.
// Every object in JavaScript has a built-in property called "prototype".

const test = "hello world".concat("!");
const test2 = new Array(1, 2, 3, 4);
const test3 = [1, 2, 3, 4];
// console.log(test2, test3);

// Class Inheritance Example
// ------------------------
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getAge() {
    return this.age;
  }

  makeSound() {}

  eat() {}
}

class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age);
    this.breed = breed;
  }

  makeSound() {
    console.log(`${this.name} said wof`);
  }
}

// Prototype Methods
// ----------------
// Adding custom methods to built-in objects using prototypes
String.prototype.countVowels = function () {
  return this.match(/[aeiou]/gi).length;
};

// Regular function equivalent
const countVowels = function (myString) {
  return myString.match(/[aeiou]/gi).length;
};

// Creating and using instances
// --------------------------
const myDog = new Dog("rex", 2, "terier");
const greet = "Hello, my name is X";

// console.log(greet.countVowels());
// const myString = "aa";
// console.log(countVowels(myString));
console.log(myDog);

const secondPerson = {
  // Properties
  firstName: "John",
  lastName: "Doe 1111",
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
};

// Object Values and Iteration
// -------------------------
const myArray = Object.values(secondPerson);

// Recursive function example
for (const key of myArray) {
  console.log(key);
}
