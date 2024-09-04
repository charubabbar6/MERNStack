//http://latentflip.com/loupe

// console.log("Hi!");

// setTimeout(function timeout() {
//   console.log("Click the button!");
// }, 5000);

// console.log("Welcome to loupe.");

// button("button", "click", function onClick() {
//   setTimeout(function timer() {
//     console.log("You clicked the button!");
//   }, 2000);
// });
console.log("Start");
setTimeout(function () {
  console.log("Timeout 1");
}, 5000);
setTimeout(function () {
  console.log("Timeout 2");
}, 0);
console.log("End");
