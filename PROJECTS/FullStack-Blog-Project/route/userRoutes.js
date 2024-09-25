const express = require("express");
const User = require("../model/User");

const {
  getUserProfile,
  getEditProfileForm,
  updateUserProfile,
  deleteUserAccount,
} = require("../controller/userController");
const { ensureAuthenticated } = require("../middleware/auth");
const upload = require("../config/multer");

const userRoutes = express.Router();

//Render login page
userRoutes.get("/profile", ensureAuthenticated, getUserProfile);

//Render edit profile page
userRoutes.get("/edit", ensureAuthenticated, getEditProfileForm);
userRoutes.post("/delete", ensureAuthenticated, deleteUserAccount);
userRoutes.post(
  "/edit",
  ensureAuthenticated,
  upload.single("profilePicture"),
  updateUserProfile
);

module.exports = userRoutes;
