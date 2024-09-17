const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.set("view engine", "ejs");

//!Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Simulated database of users
//Simulated database of users
const users = [
  { username: "charu", password: "1984", role: "admin" },
  { username: "arjun", password: "2021", role: "user" },
];

//Home Route
app.get("/", (req, res) => {
  //res.json({ message: "Welcome to the API" });
  res.render("home", { message: "Welcome to the API" });
});
app.get("/login", (req, res) => {
  res.render("login", { message: null });
});
//Login Route logic
// /login and json body:{"username":"charu","password":"123"}
app.post("/login", (req, res) => {
  //!. Find the user login details
  const userFound = users.find((user) => {
    const { username, password } = req.body;
    return user.username === username && user.password === password;
  });
  console.log(req.body);

  //!Render the user dashboard
  if (userFound) {
    //! Create some cookies (cookie);
    //* Prepare the login user data
    //? Setting the cookie with the userdata
    res.cookie("userData", JSON.stringify(userFound), {
      maxAge: 3 * 24 * 60 * 1000, //3days expiration
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    // res.json({
    //   message: "Login Success",
    // });
    res.redirect("/dashboard");
  } else {
    // res.json({
    //   message: "Login Failed",
    // });
    res.render("login", { message: "Login Failed. Please try again." });
  }
});
//Dashboard Route
///dashboard
app.get("/dashboard", (req, res) => {
  //! Grab the user from the cookie
  const userData = req.cookies.userData
    ? JSON.parse(req.cookies.userData)
    : null;
  const username = userData ? userData.username : null;
  //! Render the template
  if (username) {
    // res.json({
    //   message: `Welcome ${username}, role: ${userData.role}`,
    // });
    res.render("dashboard", {
      user: userData,
      message: `Welcome ${username}, role: ${userData.role}`,
    });
  } else {
    //!Redirect to login
    // res.json({
    //   message: "Unauthorized please login first",
    // });
    res.render("login", {
      user: userData,
      message: "Unauthorized please login first",
    });
  }
});
//Logout Route
app.get("/logout", (req, res) => {
  //!Logout
  res.clearCookie("userData");
  //redirect
  //   res.json({
  //     message: "Logged out succefully",
  //   });
  res.render("login", { message: "Logged out successfully" });
});
//start the server
app.listen(3001, console.log("The server is running"));
