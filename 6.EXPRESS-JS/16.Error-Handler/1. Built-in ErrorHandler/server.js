const express = require("express");
const app = express();
const PORT = 3000;
//simulate an error in middleware
app.use((req, res, next) => {
  //!Simulate an error condition
  const isError = true;
  //console.log("I will always be called");
  if (isError) {
    //create error object
    const err = new Error("An error occured");
    next(err);
  } else {
    next();
  }
});
//Regular route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to built in error handler" });
});

//start server
app.listen(3000, console.log("The server is running"));
