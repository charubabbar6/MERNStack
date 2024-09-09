const express = require("express");

const postRouter = express.Router();

//Using the route()
//Getting all posts
postRouter.get("/", (req, res) => {
  res.json({
    message: "All Posts",
  });
});

//Handle a specific post ID
postRouter
  .route("/:id")
  .get((req, res) => {
    res.json({
      message: "post  fetched",
    });
  })
  .put((req, res) => {
    res.json({
      message: "post  updated",
    });
  })
  .delete((req, res) => {
    res.json({
      message: "post  deleted",
    });
  });
module.exports = postRouter;
