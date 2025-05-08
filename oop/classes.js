// ES6 Classes in JavaScript
// =======================

// What are Classes?
// ----------------
// Classes in JavaScript are syntactic sugar over the prototype-based inheritance.
// They provide a cleaner and more familiar syntax for creating objects and handling inheritance.

// Basic Class
class Person {
  // Constructor
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  // Instance method
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

// Instantiating a class
const person1 = new Person("John", "John", 20);
const person2 = new Person("Peter", "Peter", 40);
console.log(person1.age);
console.log(person2 instanceof Person);

// Setters and Getters
// ------------------
// Getters and setters are special methods that allow you to define how properties are accessed and modified.
// Getters are used to get the value of a property, while setters are used to set the value of a property.
class Temperature {
  // Constructor
  constructor(celsius) {
    this.celsius = celsius;
  }
  // Getter
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }

  getFahrenheit() {
    return this.celsius * 1.8 + 32;
  }

  // Setter
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }
}

const temperatureRomania = new Temperature(25);
console.log(temperatureRomania.fahrenheit);
temperatureRomania.fahrenheit = 80;
console.log(temperatureRomania.celsius);

// Private properties
// Properties / methods that are not accessible from outside the class.
// They are denoted by a # symbol in front of the property name.
class UserAccount {
  constructor(username) {
    this.username = username;
  }
  // Private property (with #)
  #password = Math.random().toString(36).slice(10);

  // Private method
  #checkPassword(password) {
    return password === this.#password;
  }

  // Public method
  login(username, password) {
    if (username === this.username && this.#checkPassword(password)) {
      return "Login successfull";
    } else {
      return "Invalid username or password";
    }
  }
}

const user = new UserAccount("john");
const user2 = new UserAccount("peter");

console.log(user.login("john", "12345"));

// Task 1
// Create a class called Product
// It should have public properties name, price, and quantity
// It should have private properties number of sales, initial price
// It should have a method called getTotalPrice
// It should have a method to sell the product
// It should have a method to calculate profit

class Product {
  //this -> public | # -> private
  constructor(name, price, quantity) {
    if (price < this.#initialPrice) {
      throw new Error("Price too low!");
    }
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  #numberOfSales = 100;
  #initialPrice = 35;

  getTotalPrice() {
    return this.quantity * this.price;
  }

  productSale() {
    if (this.quantity > 1) {
      this.#numberOfSales++;
      this.quantity--;
    } else {
      throw new Error("Not enough stock");
    }
  }

  getFinalProfit() {
    const profit = this.#numberOfSales * (this.price - this.#initialPrice);
    return profit;
  }
}

const product1 = new Product("adidas", 40, 5);
console.log(product1.getFinalProfit());
product1.productSale();
product1.productSale();
product1.productSale();
product1.productSale();
console.log(product1.getFinalProfit());

// Static methods
// Static methods are methods that are called on the class itself, not on an instance of the class.
// They are denoted by the "static" keyword.
class MathUtils {
  // Static properties
  static PI = 3.15;

  // Static methods
  static add(a, b) {
    return a + b;
  }

  static calculateCircleArea(radius) {
    return MathUtils.PI * radius * radius;
  }
}

console.log(MathUtils.PI);
const area = MathUtils.calculateCircleArea(10);
console.log(area);

// Task 2
// Create a class called Cart
// It should have static properties:
// - taxRate: 0.19 (19% VAT)
// - shippingCost: 5.99 (standard shipping fee)

// It should have static methods:
// - calculateTax(amount): returns the tax amount for a given price
// - calculateShipping(weight): returns shipping cost based on product weight
// - formatPrice(amount): returns price formatted with currency symbol

// It should have instance methods:
// - addProduct(product, quantity): adds a product to the cart
// - removeProduct(productId): removes a product from the cart
// - getTotal(): calculates total cost including tax and shipping
// - clearCart(): removes all products from the cart

class Item {
  constructor(name, price, weight, initialPrice) {
    this.name = name;
    this.price = price;
    this.weight = weight;
    this.initialPrice = initialPrice;
  }
}

class Cart {
  static taxRate = 1.19;
  static shippingCost = 5.99;
  static calculateTax(amount) {
    return amount * Cart.taxRate;
  }
  static calculateShipping(weight) {
    if (weight > 6) {
      return Cart.shippingCost;
    } else {
      return 0;
    }
  }
  static formatPrice(amount) {
    return `${amount.toFixed(2)} €`;
  }
  constructor() {
    this.items = [];
  }
  addProduct(item, quantity) {
    // Class handling the instance
    //  const item = new Item(name, weight, price)
    //   this.items.push({item, quantity: quantity});
    this.items.push({ item, quantity: quantity });
  }
  removeProduct(itemName) {
    const result = this.items((name) => name !== itemName);
    this.items = result;
  }
  clearCart() {
    this.items = [];
  }
  getTotal() {
    let total = 0;
    for (const item of this.items) {
      const totalAmount = Cart.calculateTax(item.price) + Cart.calculateShipping(item.weight);
      total += totalAmount;
    }
    return Cart.formatPrice(total);
  }
}
const emagCart = new Cart();
const tastatura = new Item("tastatura", 100, 10);
const mouse = new Item("tastatura", 100, 10);
const desktop = new Item("tastatura", 100, 10);

emagCart.addProduct(tastatura, 5);

console.log(emagCart.getTotal());

// Task 3
// Create a class called Student
// It should have the following properties:
// - name (string)
// - age (number)
// - grades (array of numbers)
// - isActive (boolean)

// It should have the following methods:
// - addGrade(grade): adds a new grade to the grades array
// - calculateAverage(): returns the average of all grades
// - getStatus(): returns "Active" if isActive is true, "Inactive" otherwise
// - canPass(): returns true if the average grade is greater than 5, false otherwise

class Student {
  constructor(name, age, grades, isActive) {
    this.name = name;
    this.age = age;
    this.grades = grades;
    this.attendance = 0;
    this.isActive = isActive;
  }

  addAttendance() {
    this.attendance++;
  }

  addGrade(grade) {
    this.grades.push(grade);
    this.addAttendance();
  }

  calculateAverage() {
    if (this.grades.length === 0) return 0;
    const sum = this.grades.reduce((total, note) => total + note, 0);
    return Math.round(sum / this.grades.length);
  }

  getStatus() {
    return this.isActive ? "Active" : "Inactive";
  }

  canPass() {
    console.log(this.attendance);
    if (this.attendance > 4) {
      console.log(this.attendance);
      return this.calculateAverage() > 5;
    }
    return false;
  }
}

const student1 = new Student("George", 20, [2, 10, 7, 8], true);
const student2 = new Student("Maria", 22, [5, 6, 7, 8], false);
const student3 = new Student("Ion", 19, [10, 9, 8, 7], true);
const student4 = new Student("Ana", 21, [4, 5, 6, 7], false);
const student5 = new Student("Elena", 23, [10, 10, 10, 10], true);
const student6 = new Student("Mimi", 24, [3, 4, 5, 6], false);
const student7 = new Student("Andrei", 25, [8, 9, 10, 10], true);

const studentList = [student1, student2, student3, student4, student5, student6];

class Catalog {
  constructor() {
    this.students = [];
  }

  addStudent(student) {
    this.students.push(student);
  }

  addAttendanceForAll() {
    for (const student of this.students) {
      student.addAttendance();
    }
  }
}

const biologyCatalog = new Catalog();

for (const student of studentList) {
  biologyCatalog.addStudent(student);
}

// console.log(biologyCatalog);
biologyCatalog.addAttendanceForAll();
biologyCatalog.addAttendanceForAll();
biologyCatalog.addAttendanceForAll();
biologyCatalog.addAttendanceForAll();
biologyCatalog.addAttendanceForAll();
biologyCatalog.addAttendanceForAll();
biologyCatalog.addAttendanceForAll();

console.log(`${student1.name} pass: ${student1.canPass()}`);
console.log(`${student7.name} pass: ${student7.canPass()}`);

class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueDate);
    this.completed = false;
    this.priority = priority;
  }

  static Priority = {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
  };
}

class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    if (task instanceof Task) {
      this.tasks.push(task);
    }
  }

  removeTask(title) {
    this.tasks = this.tasks.filter((task) => task.title !== title);
  }

  findTask(taskTitle) {
    const task = this.tasks.find((task) => task.title === taskTitle);
    if (task) {
      return task;
    } else {
      throw new Error("Task not found.");
    }
  }

  markTaskAsCompleted(title) {
    const found = this.findTask(title);
    found.completed = true;
  }

  setTaskPriority(priority, title) {
    const task = this.findTask(title);
    task.priority = priority;
  }

  getTasksByPriority(priority) {
    return this.tasks.filter((task) => task.priority === priority);
  }

  getTasksSortedDueDate() {
    return this.tasks.sort((a, b) => a.dueDate - b.dueDate);
  }
}

const taskManager = new TaskManager();
const task1 = new Task("task1", "desc1", "2026-01-10", Task.Priority.LOW);
const task2 = new Task("task2", "desc2", "2026-01-02", Task.Priority.HIGH);
const task3 = new Task("task3", "desc3", "2026-03-24", Task.Priority.LOW);
const task4 = new Task("task4", "desc4", "2026-01-24", Task.Priority.MEDIUM);

taskManager.addTask(task1);
taskManager.addTask(task2);
taskManager.addTask(task3);
taskManager.addTask(task4);

taskManager.markTaskAsCompleted("task1");

taskManager.setTaskPriority(Task.Priority.HIGH, "task3");
taskManager.removeTask("task3");

console.log(taskManager.getTasksByPriority(Task.Priority.HIGH));
console.log(taskManager.getTasksSortedDueDate());
