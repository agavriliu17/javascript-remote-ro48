// Constructor Functions in JavaScript
// =================================

// What are Constructor Functions?
// -----------------------------
// Constructor functions are used to create multiple objects with the same properties and methods.
// They are called with the 'new' keyword and use 'this' to set properties.

// Basic Constructor Function
function Person(firstName, lastName, age) {
  // Properties
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;

  // Methods
  this.getFullName = function () {
    return `${this.firstName} ${this.lastName}`;
  };
}

// Creating instances
const person1 = new Person("John", "John", 20);
const person2 = new Person("Peter", "Peter", 40);
console.log(person1);
console.log(person2 instanceof Person);

// Constructor with Default Values
// Validation handled in the constructor
function Car(brand = "vw", model, year, buildCountry) {
  this.brand = brand;
  if (buildCountry === "us" && model === "golf") {
    this.model = "rabbit";
  } else {
    this.model = model;
  }

  if (year < 2000) {
    throw new Error("Car is too old!");
  } else {
    this.year = year;
  }
}

const vwCar = new Car("vw", "golf", 2010);
console.log(vwCar);

// Constructor with Private Variables
function BankAccount(accountNumber, userPin, initialBalance = 0) {
  // Private variable (using closure)
  let balance = initialBalance;
  const pin = userPin;

  // Public properties
  this.accountNumber = accountNumber;

  // Public methods
  this.deposit = function (amount, pinToCheck) {
    if (amount > 5 && pinToCheck === pin) {
      balance += amount;
      return `Deposited ${amount}, new balance: ${balance}`;
    }
    return "Invalid amount";
  };

  this.withdraw = function (amount, pinToCheck) {
    if (balance > amount && pinToCheck === pin) {
      balance -= amount;
      return `Withdrawn ${amount}, new balance: ${balance}`;
    }
    return "Invalid amount";
  };
}

const account1 = new BankAccount("123456789", "1234", 1000);
console.log(account1.withdraw(100, "1234"));
console.log(account1.withdraw(100, "1245"));
console.log(account1.withdraw(100, 1234));

const account2 = new BankAccount("123456789", "1235", 100);
// account2.deposit

// console.log(account1.balance);

// Practice Exercise
// Task 1
// Create a Book constructor function that:
// - Takes title, author, and year as parameters
// - Has a method to display book information

// Task 2
// - Create a Book constructor function
// - Create a Bookstore constructor function that contains an array of books
// - Add methods to add a book, remove a book, and display all books
// - Create a method to find a book by title

function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;

  this.getSummary = function () {
    return `${this.title} was written by ${this.author} in ${this.year}`;
  };
}

const book1 = new Book("Book One", "John Doe", "2013");
const book2 = new Book("Book Two", "Jane Doe", "2016");

function BookStore(books) {
  this.books = [];
  for (const book of books) {
    if (book instanceof Book) {
      this.books.push(book);
    } else {
      // throw new Error("Book is not an instance of Book");
    }
  }

  this.addBook = function (book) {
    this.books.push(book);
  };

  this.removeBook = function (book) {
    // simpler
    const index = this.books.indexOf(book);
    if (index !== -1) {
      this.books.splice(index, 1);
    } else {
      // throw new Error("Book not found");
    }
  };

  this.findBook = function (title) {
    return this.books.find((book) => book.title === title);
  };
}

const bookStore = new BookStore([book1, book2, "not a book"]);
console.log(bookStore);

console.log(bookStore.findBook("Book One"));
console.log(bookStore.removeBook(book1));
console.log(bookStore);
