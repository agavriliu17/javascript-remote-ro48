// The 'this' Keyword in JavaScript
// ==============================

// What is 'this'?
// --------------
// The 'this' keyword refers to the object that is executing the current function.
// Its value depends on how a function is called, not where it is defined.

// 1. Global Context
// In the global scope, 'this' refers to the global object (window in browsers, nodejs globalThis)
console.log(this === globalThis);

// 2. Function Context
// In a regular function, 'this' refers to the global object
function myFunction() {
  // console.log(this);
}
myFunction();

// 3. Method Context
// In an object method, 'this' refers to the object that owns the method
const person = {
  name: "John",
  greet: function () {
    console.log(`my name is ${this.name}`);
  },
};
person.greet();

// 4. Constructor Context
// In a constructor function, 'this' refers to the newly created object
function Car(make, model) {
  this.make = make;
  this.model = model;
}
const volvo = new Car("volo", "xc90");

// 5. Arrow Functions
// Arrow functions don't have their own 'this'. They inherit 'this' from the outer scope
const arrowExample = {
  name: "arrow",
  regularFunction: function () {
    console.log(this.name);
  },
  arrowFunction: () => {
    console.log(this);
  },
};
arrowExample.regularFunction();
arrowExample.arrowFunction();

// 6. Class Context
// In class methods, 'this' refers to the instance of the class
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
const book = new Book("The Great Gatsby", "F. Scott Fitzgerald");

// Exercise
// Create a computer comparer that can compare the computers and find the best one
// The comparer should have a method to add computers and a method to find the best one
class Computer {
  constructor(brand, cpu, ram, hdd, gpu) {
    this.brand = brand;
    this.cpu = cpu;
    this.ram = ram;
    this.hdd = hdd;
    this.gpu = gpu;
    this.score = 0;
  }
  resetScore() {
    this.score = 0;
  }
}
class Laptop extends Computer {
  constructor(brand, cpu, ram, hdd, gpu, batteryCapacity, screenSize) {
    super(brand, cpu, ram, hdd, gpu);
    this.batteryCapacity = batteryCapacity;
    this.screenSize = screenSize;
  }
}
class Comparer {
  constructor() {
    this.computers = [];
  }

  addComputer(computer) {
    this.computers.push(computer);
  }

  findBestGamingComputer() {
    this.findBestRam();
    this.findBestGpu();

    this.computers.sort((a, b) => b.score - a.score);
    console.log(`Best Gaming Computer:${this.computers[0].brand}`);

    this.computers.forEach((computer) => {
      computer.resetScore();
    });
  }

  findBestRam() {
    this.computers.sort((a, b) => b.ram - a.ram);
    this.computers[0].score++;
  }

  findBestGpu() {
    this.computers.sort((a, b) => b.gpu - a.gpu);
    this.computers[0].score++;
  }
}
const lenovo = new Computer("Lenovo", "I5", 32, 256, 4);
const asus = new Laptop("Asus", "I7", 64, 512, 8);
const dell = new Laptop("Dell", "I9", 128, 1024, 16);

const comparer = new Comparer();
comparer.addComputer(lenovo);
comparer.addComputer(asus);
comparer.addComputer(dell);
comparer.findBestGamingComputer();
