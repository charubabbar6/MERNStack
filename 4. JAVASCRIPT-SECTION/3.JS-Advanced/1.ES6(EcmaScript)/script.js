//----
//ARROW FUNCTION
//---

//--Basic Syntax

// function multiply(a, b) {
//   return a * b;
// }

const multiply = (a, b) => a * b;
const result = multiply(2, 3);
//console.log(result);

//--Block Body Syntax

// const greet = (name) => {
//   return `Hello, ${name}`;
// };
//console.log(greet("Charu"));

const greet = (name) => `Hello, ${name}`;
const greetFn = greet("Charu");
//console.log(greetFn);

//-- Single Parameter, No Parentheses
const square = (x) => x * x;

const squareFn = square(5);
//console.log(squareFn);

//No Parameters

const random = () => Math.random();
//console.log(random());

//Object Literal Return

// const getUser = () => {
//   return {
//     name: "Masynctech",
//     age: 10,
//   };
// };
//console.log(getUser());

const getUser = () => ({ name: "Masynctech", age: 10 });
const getUserFn = getUser();
//console.log(getUserFn);

//---
//"let" and "const" in JavaScript
//--

//Hoisting
//using var

// function hoistingIssue() {
//   console.log(a);
//   var a = 10;
//   // console.log(a);
// }

// hoistingIssue();
//using let

function hoistingIssue() {
  console.log(a);
  let a = 10;
  // console.log(a);
}

//hoistingIssue();

//Block Scope

//using var

// for (var i = 0; i < 3; i++) {
//   //console.log(i);
// }
// console.log(i);

//using let

// for (let i = 0; i < 3; i++) {
//   console.log(i);
// }
// console.log(i);

//Immutability

//using var and let

// var x = 10;
// x = 20;
// let x = 10;
// x = 30;
// const x = 10;

// x = 20;

// console.log(x);

//---
//Destructuring in JavaScript ES6
//--

//basic

const numbers = [1, 2, 3, 4];

const [first, second, third, fourth] = numbers;

// console.log(second);
// console.log(numbers[1]);

//swap variiables

let a = 1;
let b = 2;

[a, b] = [b, a];

// console.log(a, b);

//Object Destructuring

//Extract user data

// const { name, age, email } = {
//   name: "Charu",
//   age: 10,
//   email: "charubabbar6@gmail.com",
// };

// console.log(name);
// console.log(age);
// console.log(email);

//Destructuring in Function Parameters

// function greet2({ name, age }) {
//   console.log(`Hello, ${name}, your age is ${age}`);
// }

// const myUser = {
//   name: "John",
//   age: 30,
// };
// greet2(myUser);

//Nested Destructuring
const userData = {
  id: 101,
  info: {
    name: "Charu",
    age: 30,
  },
};

// console.log(userData);

const {
  id,
  info: { name, age },
} = {
  id: 1,
  info: {
    name: "Charu",
    age: 10,
  },
};
// console.log(id);
// console.log(name);
// console.log(age);

//---
//Spread and Rest Operator
//---

//Spread operator
//array concatenation
const fruits = ["apple", "banana"];
const veggies = ["carrot", "potato"];
const food = [...fruits, ...veggies];
//console.log(food);

// Cloning an Object
const person = { name: "Maysnctech", email: "support@masynctech.com" };
const clonedObj = { ...person, location: "Ghana" };

// console.log(person);
// console.log(clonedObj);

//Collect Function Arguments

//using rest operator

const displayUserInfo = (name, email, ...args) => {
  console.log(args);
  console.log(
    `Welcome ${name}, your email is  ${email}, the location is ${args[0]}`
  );
};

//displayUserInfo("Charu", "charubabbar6@gmial.com", "Ireland");

const sumAll = (...args) => {
  //console.log(args);
  return args.reduce((sum, current) => {
    return sum + current;
  }, 0);
};

const results = sumAll(1, 2, 3, 4, 5, 6, 7, 8);
//console.log(results);

//Object Destructuring with Rest

const { userId, ...otherProps } = { userId: 1, name: "Alice", age: 20 };

// console.log(otherProps);
// console.log(userId);

//---
//Enhanced Object Literals
//--

//Property shorthand
const username = "charu";
const email = "charubabbar6@gmail.com";

const userProfile = { username, email };

// console.log(userProfile);

//Method Shorthand

const timer = {
  startTime: 10,
  start() {
    console.log(this.startTime);
  },
};

timer.start();

//Computed Property Names

const settingName = "isWhiteMode";
const settingValue = true;

const appSettings = {
  ["default" + settingName]: false,
  [settingName]: settingValue,
};

console.log(appSettings);
