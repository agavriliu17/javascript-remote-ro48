// Inheritance in JavaScript
// =======================

// What is Inheritance?
// -------------------
// Inheritance is a mechanism that allows one class to inherit properties and methods
// from another class. It promotes code reusability and establishes a relationship
// between classes.

// Class-based Inheritance using ES6 Classes
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

// Duplicate code - not desired
// class Dog {
//   constructor(name, age, breed) {
//     this.name = name;
//     this.age = age;
//     this.breed = breed;
//   }

//   getAge() {
//     return this.age;
//   }

//   bark(){
//     console.log(`${this.name} said wof`)
//   }
// }

class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age);
    this.breed = breed;
  }
  makeSound() {
    console.log(`${this.name} said wof`);
  }
}

class Fish extends Animal {
  constructor(name, age, breed) {
    super(name, age);
    this.breed = breed;
  }

  swim() {
    console.log(`${this.name} can swim`);
  }
}

class Bird extends Animal {
  constructor(name, age, breed) {
    super(name, age);
    this.breed = breed;
  }

  makeSound() {
    console.log(`${this.name} said chirip`);
  }
}

// Create a class called Person
// It should have the following properties:
// - name (string)
// - age (number)
// - gender (string)

// Create a class called Employee that extends Person
// It should have the following properties:
// - salary (number)
// - position (string)
// - department (string)

// Create a class called Manager that extends Employee
// It should have the following properties:
// - team (array of Employee objects)
class Person {
  static GENDER = {
    MALE: "male",
    FEMALE: "female",
    OTHER: "combinatie",
  };

  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  getOlder() {
    this.age++;
  }

  getSchedule() {}
}

class Employee extends Person {
  constructor(name, age, gender, salary, position, department) {
    super(name, age, gender);
    this.salary = salary;
    this.position = position;
    this.department = department;
  }

  getSchedule() {
    console.log(`${this.name} works between 9-17`);
  }
}

class Student extends Person {
  constructor(name, age, gender, grades) {
    super(name, age, gender);
    this.grades = grades;
  }

  getSchedule() {
    console.log(`${this.name} learns between 12-20`);
  }
}

class Manager extends Employee {
  constructor(name, age, gender, salary, position, department, team = []) {
    super(name, age, gender, salary, position, department);
    this.team = team;
  }

  addTeamMember(coworker) {
    this.team.push(coworker);
  }
}

const student = new Student("Alin", 20, [10, 10, 3], true);
const angajat1 = new Employee("Fabi", 21, Person.GENDER.MALE, 4000, "summerpractice", "Dev");
const angajat2 = new Employee(
  "Maria",
  2333,
  Person.GENDER.FEMALE,
  2355,
  "summerpractice",
  "Embedded"
);
const sefu = new Manager("Sefu", 40, Person.GENDER.MALE, 12000, "sefechipa", "it");
sefu.addTeamMember(angajat1);
sefu.addTeamMember(angajat2);
sefu.getOlder();
// console.log(student);
student.getSchedule();
sefu.getSchedule();

// Polymorphism
const parrot = new Bird("kiki", 2, "parrot");
const rex = new Dog("rex", 3, "bichon");
const goldie = new Fish("goldie", 1, "golden fish");
rex.makeSound();
parrot.makeSound();
goldie.makeSound();

// Task 2:
// Create a class called Vehicle
// It should have the following properties:
// - brand (string)
// - model (string)
// - year (number)
// - running (boolean)
// - getInfo(): returns vehicle details

// Create a class called Car that extends Vehicle
// It should have the following properties:
// - engineStatus (boolean)
// - start(): starts the engine
// - stop(): stops the engine
// - getInfo(): returns vehicle details

// Create classes that extend Car (ElectricCar, SuperCar)
// Optional: Create a class called Motorcycle that extends Vehicle

class Vehicle {
  constructor(brand, model, year, mileage) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.mileage = mileage;
    this.running = false;
  }
  getInfo() {
    return `${this.brand} ${this.model} ${this.year} has ${this.mileage} km`;
  }
}
class Car extends Vehicle {
  constructor(brand, model, year, mileage, numberOfDoors, type, engine, fuelType) {
    super(brand, model, year, mileage);
    this.numberOfDoors = numberOfDoors;
    this.type = type;
    this.engine = engine;
    this.fuelType = fuelType;
  }
  start() {
    this.running = true;
    console.log(this.model + " started running!");
  }
  stop() {
    this.running = false;
    console.log(this.model + " stoped running!");
  }
}
class ElectricCar extends Car {
  constructor(brand, model, year, mileage, numberOfDoors, type, engine, battery) {
    super(brand, model, year, mileage, numberOfDoors, type, engine);
    this.fuelType = "electric";
    this.battery = battery;
  }
  start() {
    if (this.battery > 1) {
      console.log(this.model + " ready to run!");
    } else {
      console.log("Please put to charge");
    }
  }
  putToCharge() {
    this.battery = 100;
  }
}
const car = new Car("Volvo", "XC90", 2022, 86000, "SUV", 5, 2500, "Diesel");
car.start();
const eCar = new ElectricCar("Tesla", "Model3", 2024, 45000, 3, "Sedan", "Electric", 0);
eCar.start();
eCar.putToCharge();
eCar.start();

// Task 3: Inheritance + Encapsulation
// Create a user management system that demonstrates both inheritance and encapsulation.
// The system should protect sensitive data (like passwords) and implement proper access control.

// Create a class called User
// It should have the following properties:
// - username (string)
// - #password (string, private) - should not be directly accessible
// - email (string)
// - Methods:
//   - getInfo(): returns user details (username and email only, not password)
//   - verifyPassword(password): returns true if password matches, false otherwise
//   - updateEmail(newEmail): updates the user's email

// Create a class called Admin that extends User
// It should have the following properties:
// - isAdmin (boolean, should be true)
// - Additional methods:
//   - getInfo(): override to include admin status
//   - viewUserPassword(user): can view other users' passwords (admin privilege)
//   - resetUserPassword(user, newPassword): can reset other users' passwords

// Create a class called Database that has the following properties:
// - _users (private array of User objects)
// - Methods:
//   - addUser(user, admin): adds a user to the database (only admins can add users)
//   - removeUser(username, admin): removes a user (only admins can remove users)
//   - getUser(username, admin): if regular user, returns user without password
//                              if admin, returns complete user info including password
//   - getAllUsers(admin): if admin, returns all users with full details
//                        if not admin, returns limited information
