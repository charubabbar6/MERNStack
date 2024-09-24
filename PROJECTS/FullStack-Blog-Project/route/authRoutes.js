const express = require("express");
const authRoutes = express.Router();
const {
  getLogin,
  login,
  getRegister,
  register,
  logout,
} = require("../controller/authController");

//Login Route
authRoutes.get("/login", getLogin);
//Main Logic for user login
authRoutes.post("/login", login);
//Register Route
authRoutes.get("/register", getRegister);
//Main Logic for user registration
authRoutes.post("/register", register);
//logout Route
authRoutes.get("/logout", logout);
module.exports = authRoutes;
