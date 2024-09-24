const express = require("express");
const postRoutes = express.Router();

const {
  getPostForm,
  createPost,
  getPosts,
  getPostById,
} = require("../controller/postController");

//Add Post
postRoutes.get("/add", getPostForm);
//post logic
postRoutes.post("/add", createPost);
//get all posts
postRoutes.get("/", getPosts);
//get post by id
postRoutes.get("/:id", getPostById);
module.exports = postRoutes;
