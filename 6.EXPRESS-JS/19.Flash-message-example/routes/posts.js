// routes/posts.js
const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.render("posts", { posts });
});

// Delete a post
router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  req.flash("success", "Post deleted successfully");
  res.redirect("/posts");
});

module.exports = router;
