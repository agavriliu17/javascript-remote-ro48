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
