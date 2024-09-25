const express = require("express");
const { ensureAuthenticated } = require("../middleware/auth");
const postRoutes = express.Router();

const {
  getPostForm,
  createPost,
  getPosts,
  getPostById,
  getEditPostForm,
  updatePost,
  deletePost,
} = require("../controller/postController");

const upload = require("../config/multer");
//Add Post
postRoutes.get("/add", getPostForm);
//post logic
postRoutes.post(
  "/add",
  ensureAuthenticated,
  upload.array("images", 7),
  createPost
);
//get all posts
postRoutes.get("/", getPosts);
//get post by id
postRoutes.get("/:id", getPostById);
//edit post
postRoutes.get("/:id/edit", getEditPostForm);
//Edit put logic(update Post)
postRoutes.put(
  "/:id",
  ensureAuthenticated,
  upload.array("images", 5),
  updatePost
);
//delete post
postRoutes.delete("/:id", ensureAuthenticated, deletePost);
module.exports = postRoutes;
