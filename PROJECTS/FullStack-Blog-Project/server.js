//npm i express mongoose dotenv ejs
// npm i bcryptjs
// npm install passport-local
//npm i express-session
//npm i connect-mongo
//npm i passport
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ejs = require("ejs");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const authRoutes = require("./route/authRoutes");
const postRoutes = require("./route/postRoutes");
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
