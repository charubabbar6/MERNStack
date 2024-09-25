//npm init -y
//npm install express mongoose connect-flash express-session ejs
//npm i method-override
// server.js
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const postsRouter = require("./routes/posts");

const app = express();
const PORT = 3000;

// Connect to MongoDB (replace '<your_mongo_uri>' with your actual MongoDB URI)
mongoose
  .connect("url", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error(err));

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // Allows us to use PUT and DELETE in forms
app.use(
  session({
    secret: "your_secret_key", // Change to your actual secret
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Middleware to expose flash messages to views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/posts", postsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
