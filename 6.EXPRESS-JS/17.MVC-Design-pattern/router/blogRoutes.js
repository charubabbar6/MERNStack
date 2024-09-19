const express = require("express");

const {
  showcreatePost,
  showPost,
  createPostLogic,
  deletePost,
} = require("../controller/blogController");

//Router
const blogrouter = express.Router();
//! Show the create form
blogrouter.get("/create", showcreatePost);
//! To get all posts
blogrouter.get("/list", showPost);
//! Create the post (The main logic)
blogrouter.post("/create", createPostLogic);
//!delete the post
blogrouter.delete("/post/:id", deletePost);
module.exports = blogrouter;
