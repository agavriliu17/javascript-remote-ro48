// Polymorphism in JavaScript
// ========================

// What is Polymorphism?
// --------------------
// Polymorphism is the ability of different objects to respond to the same message
// (method call) in different ways. In JavaScript, this is achieved through:
// 1. Method overriding
// 2. Interface-like behavior

// 1. Method Overriding
class Animal {
  constructor(name) {
    this.name = name;
  }

  makeSound() {
    return `${this.name} makes sounds`;
  }

  move() {
    return `${this.name} moves`;
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  makeSound() {
    return `${this.name} said woof`;
  }
}

// 2. Interface-like Behavior
class Shape {
  constructor(color) {
    this.color = color;
  }

  getPerimeter() {
    throw new Error("Method getPerimeter must be implemented first");
  }

  getArea() {
    throw new Error("Method getArea must be implemented first");
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  getPerimeter() {
    return 2 * Math.PI * this.radius;
  }

  getArea() {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(color, width, height) {
    super(color);
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.height * this.width;
  }
}

const rectangle = new Rectangle("blue", 10, 10);
const circle = new Circle("red", 10);
console.log(circle.getPerimeter());
// console.log(rectangle.getPerimeter()); // will fail
console.log(rectangle.getArea());

// Task 1:
// Create a ElectronicDevice class and Phone and Computer classes that extend it
// ElectronicDevice should have:
// - brand (string)
// - model (string)
// - power (number)
// - isOn (boolean)
// - turnOn(): turns the device on
// - turnOff(): turns the device off
// - getInfo(): returns device information

// Phone should have:
// - screenSize (number)
// - batteryLife (number)
// - makeCall(number): simulates making a call
// - sendMessage(number, text): simulates sending a message

// Computer should have:
// - processor (string)
// - ram (number)
// - storage (number)
// - runProgram(programName): simulates running a program
// - connectToInternet(): simulates connecting to internet

// Both Phone and Computer should override:
// - turnOn(): add specific behavior for each device
// - turnOff(): add specific behavior for each device
// - getInfo(): return specific information for each device

// Create 2 more classes that extend ElectronicDevice (CoffeeMachine,TV, etc)
