//! Callback API

const fs = require("fs");
//console.log(fs);

//! Read a file
//Synchronous
// console.log("Read a file using Synchronous");

// const dataBuffer = fs.readFileSync("./sample.txt");
// const content = dataBuffer.toString();
// console.log(content);

//Asynchronous
// console.log("Read a file using Asynchronous");
// fs.readFile("./sample.txt", "utf-8", (err, content) => {
//   if (err) {
//     console.log(err);
//     throw err;
//   } else {
//     console.log(content);
//   }
// });

//Write to a file
//overrite every time file.
//create a file also if not exist
// fs.writeFile("./test.txt", "some new content", (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   } else {
//     console.log("Write a file using Asynchronous");
//     console.log("File has been written");
//   }
// });

// Appending to a File
//if we want to append again and again the we have to remove write function because it's overriding whole file.
// fs.appendFile("./test.txt", " Appended content", (error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("File contented appended");
//   }
// });
//Checking if a File Exists
// fs.access("./new2.txt", fs.constants.F_OK, (error) => {
//   if (error) {
//     console.log("File does not exists");
//   } else {
//     console.log("File Exists");
//   }
//});
//Delete a file
// fs.unlink("./test.txt", (error) => {
//   if (error) {
//     console.log(error);
//     return;
//   } else {
//     console.log("File has been deleted");
//   }
// });

//! Using promise
const fs2 = require("fs/promises");

// try {
//   const content = fs2.readFile("./sample.txt", "utf-8");
//   console.log(content);
// } catch (error) {
//   console.log(error);
// }

const readFileContent = async () => {
  try {
    const content = await fs2.readFile("./sample.txt", "utf-8");
    console.log(content);
  } catch (error) {
    console.log(error);
  }
};

readFileContent();
