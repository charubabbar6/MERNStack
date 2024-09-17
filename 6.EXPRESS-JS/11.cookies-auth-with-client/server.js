//npm i cookie-parser
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
//!Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//!Set the view engine
app.set("view engine", "ejs");

//Simulated database of users
const users = [
  { username: "charu", password: "1984", role: "admin" },
  { username: "arjun", password: "2021", role: "user" },
];

//Home Route
app.get("/", (req, res) => {
  res.render("home");
});

//Login Route (login form)
app.get("/login", (req, res) => {
  res.render("login");
});

//Login Route logic
app.post("/login", (req, res) => {
  //!. Find the user login details
  const userFound = users.find((user) => {
    const { username, password } = req.body;
    return user.username === username && user.password === password;
  });
  //console.log("userFound", userFound);
  //! Create some cookies (cookie);
  //* Prepare the login user data
  //? Setting the cookie with the userdata
  res.cookie("userData", JSON.stringify(userFound), {
    maxAge: 3 * 24 * 60 * 1000, //3days expiration
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  if (userFound) {
    res.redirect("/dashboard");
  } else {
    res.redirect("/login");
  }
});
//Dashboard Route
app.get("/dashboard", (req, res) => {
  //! Grab the user from the cookie
  const userData = req.cookies.userData
    ? JSON.parse(req.cookies.userData)
    : null;
  //console.log("Inside dshboard", userData);
  const username = userData ? userData.username : null;
  //! Render the template
  if (username) {
    res.render("dashboard", { username });
  } else {
    //!Redirect to login if no user found
    res.redirect("/login");
  }
});
//Logout Route
app.get("/logout", (req, res) => {
  try {
    //!Logout
    res.clearCookie("userData");

    console.log("Cookie cleared, redirecting to /login");

    // Redirect
    return res.redirect("/login"); // Make sure we return to prevent further code execution
  } catch (error) {
    console.error("Error in logout route:", error);
    res.status(500).send("Internal Server Error");
  }
});

//start the server
app.listen(3000, console.log("The server is running"));
