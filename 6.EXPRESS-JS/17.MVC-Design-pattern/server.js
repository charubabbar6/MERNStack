const express = require("express");
//To support HTTP methods like DELETE in your HTML forms, you need to use the method-override package in Express
const methodOverride = require("method-override");
const blogRouter = require("./router/blogRoutes");
const connectToDB = require("./utils/dbconnect");
const app = express();
const PORT = 3000;

//!Configure ejs
app.set("view engine", "ejs");
//!Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // Add this to override methods
//-----Connect DB------
connectToDB(); // Call the function to establish the MongoDB connection
//!. Show Homepage
app.get("/", (req, res) => {
  res.render("index");
});
//!---Router----
app.use("/", blogRouter);

app.listen(PORT, console.log("The server is running"));
