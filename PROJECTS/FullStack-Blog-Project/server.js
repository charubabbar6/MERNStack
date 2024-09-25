//npm i express mongoose dotenv ejs
// npm i bcryptjs
// npm install passport-local
//npm i express-session
//npm i connect-mongo
//npm i passport
//npm i multer
// npm i multer-storage-cloudinary
//npm i express-async-handler
//npm i method-override
//npm i connect-flash
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ejs = require("ejs");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const authRoutes = require("./route/authRoutes");
const postRoutes = require("./route/postRoutes");
const userRoutes = require("./route/userRoutes");
const commentRoutes = require("./route/commentRoutes");
const errorHandler = require("./middleware/errorHandler");
const passportConfig = require("./config/passport");
const PORT = process.env.PORT || 3000;
const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); //for static files
app.use(express.urlencoded({ extended: true })); //for parsing form data

//session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);

// Flash middleware
app.use(flash());

// Middleware to expose flash messages to views

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Method override middleware
app.use(methodOverride("_method"));

//passport
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

//Home route
app.get("/", (req, res) => {
  res.render("home", {
    user: req.user,
    error: "",
    title: "Home",
  });
});

//routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/", commentRoutes);
app.use("/user", userRoutes);

//error handler
app.use(errorHandler);
//connect to mongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongodb has been connected successfully");
    app.listen(PORT, console.log(`Server is running on port ${PORT}`));
  })
  .catch((e) => {
    console.log(`Error connecting to mongodb ${e}`);
  });
