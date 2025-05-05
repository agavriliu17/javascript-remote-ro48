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
  static PI = 3.14;

  // Static methods
  static add(a, b) {
    return a + b;
  }

  static calculateCircleArea(radius) {
    return MathUtils.PI * radius * radius;
  }
}

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
    const newItem = {
      name: item.name,
      quantity: quantity,
      weight: item.weight,
      price: item.price,
    };
    this.items.push(newItem);
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

emagCart.addProduct(
  {
    name: "tastatura",
    weight: 10,
    price: 100,
  },
  5
);

console.log(emagCart.getTotal());
