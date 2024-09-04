//Example 1 with callback
//creation of callback function
function simplecallback1(sucess, callback) {
  console.log("Callback function called");
  if (sucess) {
    callback(null, "The Operation was successful.");
  } else {
    callback("The Operation failed", null);
  }
}
//usage of callback function
// simplecallback1(true, (error, result) => {
//   if (error) {
//     console.log("error", error.message);
//   } else {
//     console.log("Result", result);
//   }
//   console.log("This always log regardless of every function");
// });

// simplecallback1(false, (error, result) => {
//   if (error) {
//     console.log("error", error);
//   } else {
//     console.log("Result", result);
//   }
//   console.log("This always log regardless of every function");
// });

//Example 1 convert to use promise

//creation of promise

const simplePromise = new Promise((resolve, reject) => {
  //const success = true;
  const success = false;
  if (success) {
    //resolve the promise
    resolve("The promise operation was successful");
  } else {
    //reject the promise
    reject("The promise operation failed");
  }
});

//usage of promise
// simplePromise
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {
//     console.log("This always log regardless of the operation");
//   });

//Example 2 convert to use promise

function isEvenNumber(number, callback) {
  if (number % 2 === 0) {
    callback(null, `The number ${number} is even`);
  } else {
    callback(new Error(`The number ${number} is not even`));
  }
}

//usage
// isEvenNumber(5, (error, result) => {
//   if (error) {
//     console.log(error.message);
//   } else {
//     console.log(result);
//   }
// });
//creation of promise
function isEvenNumberPromise(number) {
  return new Promise((resolve, reject) => {
    if (number % 2 === 0) {
      //resolve the promise
      resolve(`The number ${number} is even`);
    } else {
      //reject the promise
      reject(`The number ${number} is not even`);
    }
  });
}
//usage of promise
//call the fn/resolve
isEvenNumberPromise(11)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
