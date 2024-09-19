//npm i axios
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

//Route to fetch posts
app.get("/posts", async (req, res, next) => {
  try {
    const response = await axios.get(
      " https://jsonplacehollder.typicode.com/posts"
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});
//Regular route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to built in error handler" });
});
//Custom Error Handling Middleware
app.use((err, req, res, next) => {
  //check if it's an axios error
  if (err.response) {
    res.status(err.response.status).json(err.response.data);
  } else if (err.request) {
    res.status(503).json({ message: "service unavailbale" });
  } else {
    res.status(500).json({ message: "something broke." });
  }
});
//start server
app.listen(3000, console.log("The server is running"));
