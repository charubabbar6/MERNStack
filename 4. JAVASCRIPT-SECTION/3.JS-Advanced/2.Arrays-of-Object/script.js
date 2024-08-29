//----
//The Concept of Objects Being Passed by Reference
//----

//Modifying Object Through a Different Reference

const person1 = { name: "charu", age: 30 };
//console.log(person1);
const person2 = person1;
//modify age
person2.age = 40;
person1.name = "Arjun";
//console.log(person2);
//console.log(person1); //modify the person1 as well if we change in person2

//Passing Object to a Function

const incrementAge = (personObj) => {
  personObj.age += 1;
};

//personObj
const firstperson = { name: "charu", age: 40 };
//console.log("before ", firstperson);

incrementAge(firstperson);

//console.log("after ", firstperson);

//---
// Objects in arrays
//---

//Scenario: Managing a List of Students

//In this example, we'll create a simple list of students where each student is an object with properties like `id`, `name`, and `grade`.

const ListofStudent = [
  { id: 1, name: "charu", grade: "A" },
  { id: 2, name: "arjun", grade: "A" },
  { id: 3, name: "sushant", grade: "A+" },
];

//Access student

//console.log(ListofStudent);
//const student1 = ListofStudent[0];
const student1 = ListofStudent[0].name;
//console.log(student1);

//Add new student

const addstudent = (id, name, grade) => {
  const newStudent = { id, name, grade };
  //push the new student into the ListofStudent array
  ListofStudent.push(newStudent);
};

addstudent(4, "dolly", "B");
//console.log(ListofStudent);

//Upgrade a  student

const updateStudentGrade = (id, newGrade) => {
  //find the student by id
  const studentFound = ListofStudent.find((ListofStudent) => {
    return ListofStudent.id === id;
  });
  //console.log(studentFound);

  if (studentFound) {
    studentFound.grade = newGrade;
  } else {
    console.log("student not found");
  }
};
updateStudentGrade(2, "D");
//console.log(ListofStudent);

//--
// Arrays in objects
//--

//Scenario: Managing a Simple To-Do List

//Here, we'll create a simple `ToDoList` object that has a `tasks` array property. Each object inside the `tasks` array will have properties like `id`, `description`, and `completed`.

const todoLists = {
  title: "Todo List Application",
  tasks: [
    { id: 1, description: "Buy Groceries", completed: false },
    { id: 2, description: "Go to Gym", completed: true },
    { id: 3, description: "Drop to School", completed: false },
  ],
};

//Accessing properties

todoTitle = todoLists.title;
//console.log(todoTitle);
const allTasks = todoLists.tasks;
//console.log(allTasks);
//console.log(todoLists);

//Function to add a task

const addTask = (description) => {
  //get new id
  const newId = todoLists.tasks.length + 1;
  const newtask = {
    id: newId,
    completed: false,
    description: description,
  };
  //push the new task into the original task
  todoLists.tasks.push(newtask);
};
//call fn
addTask("Going to walk");
//console.log(allTasks);

//Function to mark a task as completed
const markAsCompleted = (id) => {
  //find the task
  const foundTask = todoLists.tasks.find((task) => task.id === id);
  if (foundTask) {
    foundTask.completed = true;
  } else {
    console.log("Task not found");
  }
};
markAsCompleted(4);
//console.log(todoLists);

//--
//iterate through arrays using `forEach()`
//--

//Basic example
const fruits = [
  { name: "Apple", color: "red" },
  { name: "Banana", color: "yellow" },
  { name: "cherry", color: "red" },
];

//fruits.forEach((currentVal, index, array) => {
//console.log(currentVal, index, array);
//});

//Case Study: Online Shopping Cart Calculation

//Suppose you are working on an e-commerce website, and you need to calculate the total price of items in a user's shopping cart. Each item in the cart is represented as an object in an array with properties such as `name`, `price`, and `quantity`. Your task is to calculate the total cost of items in the cart and also list the names of all items in the cart for the user's review.

//Initial Data
const cart = [
  { name: "Laptop", price: 1000, qty: 1 },
  { name: "Phone", price: 500, qty: 2 },
  { name: "TV", price: 1500, qty: 1 },
  { name: "Headphones", price: 100, qty: 3 },
];
//Calculate the total cost of the items in the cart.
let totalCost = 0;
cart.forEach((item) => {
  //sum all the product prices
  totalCost += item.price * item.qty;
});
//console.log(totalCost);

//List all the names of the products

let productNames = [];

cart.forEach((item) => {
  productNames.push(item.name);
});
//console.log(productNames);

//Calculate the Total Number of Items

let totalItems = 0;
cart.forEach((item) => {
  totalItems += item.qty;
});
//console.log(totalItems);

//----
//iterate through arrays using `map()`
//----

//Suppose we have an array of products in a shopping cart. Each object represents a product with a name and a price. We want to apply a 10% discount to all products.

//Initial Data
const shoppingCart = [
  { name: "Laptop", price: 1000, qty: 1 },
  { name: "Phone", price: 500, qty: 2 },
  { name: "TV", price: 1500, qty: 1 },
  { name: "Headphones", price: 100, qty: 3 },
];
//console.log(shoppingCart);

//Add 10% discount

const discountedCart = shoppingCart.map((product) => {
  return {
    name: product.name,
    price: product.price * 0.9,
  };
});
//console.log(discountedCart);

//get all the product names only
const productNamesOnly = shoppingCart.map((product) => {
  return {
    name: product.name,
  };
});
//console.log(productNamesOnly);

//----
//iterate through arrays using `filter()`
//---

//Filtering Active Users

const users = [
  {
    id: 1,
    isActive: false,
    name: "Charu",
  },
  {
    id: 2,
    isActive: true,
    name: "Arjun",
  },
  {
    id: 3,
    isActive: true,
    name: "Sushant",
  },
];

//console.log(users);

//filter out active users
const activeUsers = users.filter((user) => {
  return user.isActive === true;
});
//console.log(activeUsers);

//Transactions Above a Certain Amount

const transactions = [
  { id: 1, amount: 50 },
  { id: 2, amount: 150 },
  { id: 3, amount: 200 },
];
//console.log(transactions);

//filter out all amount above 100

const largeTransactions = transactions.filter(
  (transaction) => transaction.amount > 100
);
//console.log(largeTransactions);

//---
//Transformation and Manipulation using `splice()`
//---

//Remove inactive users

const usersArr = [
  {
    id: 1,
    isActive: false,
    name: "charu",
  },
  {
    id: 2,
    isActive: true,
    name: "arjun",
  },
  {
    id: 3,
    isActive: true,
    name: "sushant",
  },
];
//console.log(usersArr);

//Remove inactive user
//find the the index of the user to be removed

const indexToRemove = usersArr.findIndex(
  (user) => user.id === 1 && !user.isActive
);

//use splice
if (indexToRemove !== -1) {
  usersArr.splice(indexToRemove, 1);
}
//console.log(usersArr);

//Managing playlist

//case study: You're developing a playlist feature for a music streaming app. Users can add and remove songs to their playlists. Each playlist is an array of song objects. You have to implement features that allow the user to delete a song, move a song up or down the playlist, and insert a song at a particular index.

//solution
const playlist = [
  { id: "s1", title: "Song 1", artist: "Artist A" },
  { id: "s2", title: "Song 2", artist: "Artist B" },
  { id: "s3", title: "Song 3", artist: "Artist C" },
  { id: "s4", title: "Song 4", artist: "Artist D" },
];

//Remove song of id of s1

const songIndexToRemove = playlist.findIndex((song) => song.id === "s1");

// const songIndexToRemove = playlist.findIndex(function (song) {
//   return song.id === "s1";
// });

//use splice
// if (songIndexToRemove !== -1) {
//   playlist.splice(songIndexToRemove, 1);
// }
//console.log(playlist);

//Move a song of id of s1 to third position
const indexToMove = playlist.findIndex((song) => song.id === "s1");
if (indexToMove != -1) {
  const [songToMove] = playlist.splice(indexToMove, 1); //removing from index and putting that in variable songToMove
  //console.log(songToMove);

  playlist.splice(2, 0, songToMove); //0 represent no.of element to remove
}
//console.log(playlist);

//insert new song
const newSong = { id: "s5", title: "Song 5", artist: "Artist E" };
playlist.splice(0, 0, newSong);
//console.log(playlist);

//--
//Transformation and Manipulation using `concat()`
//--

//Concatenating Customer Records from Different Branches

const branch1Customers = [
  { id: 1, name: "Charu", branch: "North" },
  { id: 2, name: "Bhanu", branch: "North" },
];

const branch2Customers = [
  { id: 3, name: "Sushant", branch: "West" },
  { id: 4, name: "Arjun", branch: "West" },
];

const allCustomers = branch1Customers.concat(branch2Customers);

//console.log(allCustomers);

//In this example, we'll be working with an e-commerce scenario where we have an array of items in a shopping cart and an array of new items that a user wants to add. We'll also have an array of promotional items that get added if certain conditions are met.

//Dummy data to work with
const currentCartItems = [
  {
    id: 1,
    name: "Laptop",
    price: 1000,
  },
  {
    id: 2,
    name: "Phone",
    price: 600,
  },
];

//console.log(currentCartItems);

//New items to add to the cart

const newCartItems = [
  {
    id: 3,
    name: "Headphones",
    price: 150,
  },
  {
    id: 4,
    name: "Mouse",
    price: 20,
  },
];

//Promotional items

const promotionalItems = [
  {
    id: 5,
    name: "Stickers",
    price: 0,
  },
  {
    id: 6,
    name: "Keychain",
    price: 0,
  },
];

//First, add the new items to the current cart

const updatedCart = currentCartItems.concat(newCartItems);

//console.log(updatedCart);

//function to check if the cart total is above certain amount

const isCartTotalAbove = (cartItems, threshold) => {
  //calculate the total of the cartitems
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);
  return total > threshold;
};

//Check if the cart total is above $1000 to add a promotional item
if (isCartTotalAbove(updatedCart, 1500)) {
  //concate a promotional item to the updated cart
  const finalCart = updatedCart.concat(promotionalItems[0]);
  //console.log("Final cart", finalCart);
} else {
  // console.log("updated cart", updatedCart);
}
//---
//Object.assign()
//--
const target = { a: 1, b: 2 };
const source1 = { b: 4, c: 5 };
const source2 = { d: 6 };

const merged = Object.assign(target, source1, source2);

console.log(merged);

const original = { a: 1, b: 2 };
const clone = Object.assign({}, original);
console.log(clone);
clone.a = 10;
console.log(original.a);

const obj = { a: 1 };

Object.assign(obj, { b: 2, c: 3 });

console.log(obj);

const obj1 = { a: 1, nested: { b: 2 } };
const obj2 = Object.assign({}, obj1);

obj2.nested.b = 3;

console.log(obj1.nested.b); // Output: 3

const defaultConfig = { theme: "light", showSidebar: true };
const userConfig = { theme: "dark" };

const finalConfig = Object.assign({}, defaultConfig, userConfig);

console.log(finalConfig);
// Output: { theme: "dark", showSidebar: true }

const state = { counter: 10, user: { name: "Alice" } };
const newState = Object.assign({}, state, { counter: state.counter + 1 });

console.log(newState);
// Output: { counter: 11, user: { name: "Alice" } }
const defaults = { logLevel: "warn", outputPath: "/logs" };
const options = { logLevel: "info", debug: true };
const config = { env: "production" };

const finalSettings = Object.assign({}, defaults, options, config);

console.log(finalSettings);
// Output: { logLevel: "info", outputPath: "/logs", debug: true, env: "production" }

//updating properties of students in a class
const studentsArr = [
  { id: 1, name: "Charu", grade: "A" },
  { id: 2, name: "Arjun", grade: "B" },
];

//Grade updates
const gradeUpdates = [
  { grade: "A+" }, // Update for student at index 0
  { grade: "A-" }, // Update for student at index 1
];
// Create a new array of updated student objects
//Update the students
const updatedStudents = studentsArr.map((student, index) => {
  // Merge the current student object with the corresponding grade update
  return Object.assign(
    {}, // Create a new empty object as the target
    student, // Copy properties from the current student object
    gradeUpdates[index]
  ); // Copy properties from the corresponding grade update object
});
//console.log(updatedStudents);

//--
//Search and Filter using `find()`
//--

//Finding the First Patient with a Specific Ailment in a Hospital Database

const patients = [
  { id: 101, name: "Sarah", disease: "Cold" },
  { id: 102, name: "Mike", disease: "Fever" },
  { id: 103, name: "Lucy", disease: "Cold" },
];

//Patient with cold

const patientWithCold = patients.find((patient) => patient.disease === "Cold");

//console.log(patientWithCold);

//--
//Search and Filter using `some()`
//--

const patients2 = [
  { id: 101, name: "Sarah", disease: "Cold" },
  { id: 102, name: "Mike", disease: "Fever" },
  { id: 103, name: "Lucy", disease: "Cold" },
];
//Patient with cold
const patienyWithCold2 = patients2.some(
  (patient) => patient.disease === "Cold"
);

// console.log(patienyWithCold2);
// console.log(patientWithCold);

//----
//Search and Filter using `every()`
//---

//Confirming All Students Passed Their Exam

const techStudents = [
  { id: 1, name: "Charu", grade: "A" },
  { id: 2, name: "Arjun", grade: "F" },
  { id: 3, name: "Dolly", grade: "A" },
];
const allPassed = techStudents.every((student) => student.grade !== "F");

console.log(allPassed);
