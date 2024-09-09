const express = require("express");

//Create instnce of express router
const postRouter = express.Router();
//!.Getting all posts
postRouter.get("/", (req, res) => {
  res.json({
    message: "All posts  fetched",
  });
});
//!.Getting a post
postRouter.get("/:id", (req, res) => {
  res.json({
    message: "post  fetched",
  });
});

//! Update post
postRouter.put("/:id", (req, res) => {
  res.json({
    message: "post  updated",
  });
});

//! Delete
postRouter.delete("/:id", (req, res) => {
  res.json({
    message: "post  deleted",
  });
});
module.exports = postRouter;
