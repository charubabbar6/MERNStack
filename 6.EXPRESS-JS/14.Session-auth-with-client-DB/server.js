//"npm i express-session"
//npm i connect-mongo
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();

//Connect to mongoose
const PORT = 8082;
const mongodbURL = "mongodb+srv:";
const connectToDB = async () => {
  try {
    await mongoose.connect(mongodbURL);
    console.log("Mongodb has been connected successfully");
  } catch (error) {
    console.log(`Error connecting to mongodb ${error}`);
  }
};
connectToDB();

//Create the userSchema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
});

//Compile the schema to form model
const User = mongoose.model("User", userSchema);

//!Middlewares
app.use(express.urlencoded({ extended: true }));
//!Set the view engine
app.set("view engine", "ejs");

//-----CUSTOM MIDDLEWARES-----
//!--isAuthenticated (Authentication)
const isAuthenticated = (req, res, next) => {
  //check user in the session
  const username = req.session.userData ? req.session.userData.username : null;
  if (username) {
    return next();
  } else {
    res.redirect("/login");
  }
};
//!-isAdmin (Authorization)
const isAdmin = (req, res, next) => {
  //check user in the session
  const admin = req?.session?.userData?.role === "admin";
  if (admin) {
    return next();
  } else {
    res.send("Fobidden, access denied");
  }
};
//!--configure Express Session---
app.use(
  session({
    secret: "nujra2021",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 100, //Expires in 1hr
    },
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://charubabbar6:xN4DPRrO7AxRY0kA@firstmongodb-cluster.q4dlq.mongodb.net/myDB",
    }),
  })
);
//Home Route
app.get("/", (req, res) => {
  console.log(req.session);

  res.render("home");
});
//Login Route (login form)
app.get("/login", (req, res) => {
  res.render("login");
});
//Admin Route (Admin page)
app.get("/admin-only", (req, res) => {
  res.render("admin");
});
//Register Route (register form)
app.get("/register", (req, res) => {
  res.render("register");
});
//?Post routes
//Register Logic (register form)
app.post("/register", async (req, res) => {
  //!Destructure the req.body
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userRole = role && role.trim() !== "" ? role.trim() : "user";
  await User.create({
    username,
    password: hashedPassword,
    role: userRole,
  });
  //Redirect to login
  res.redirect("/login");
});

//Login Route logic
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //!. Find the user in the db
  const userFound = await User.findOne({
    username,
  });
  console.log("userFound", userFound);
  if (userFound && (await bcrypt.compare(password, userFound.password))) {
    //! Create session(save the user into session)
    console.log(userFound);
    req.session.userData = {
      username: userFound.username,
      role: userFound.role,
    };
    //! Add the login user to session

    res.redirect("/dashboard");
  } else {
    res.send("Invalid login credentials");
  }
});
//Dashboard Route
app.get("/dashboard", isAuthenticated, isAdmin, (req, res) => {
  console.log(req.session);
  //Take the login user from session
  const username = req.session.userData ? req.session.userData.username : null;
  res.render("dashboard", { username });
});
//Logout Route
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

//start the server
app.listen(3000, console.log("The server is running"));
