const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8082;
const mongodbURL = "mongodb+srv:";
const connectToDB = async () => {
  try {
    await mongoose.connect(mongodbURL);
    console.log("Mongodb has been connected successfully");
  } catch (error) {
    console.log(`Error connecting to mongodb ${error}`);
  }
};
connectToDB();
// ! ----one-many relationship-----
//commentSchema
const commentSchema = new mongoose.Schema(
  {
    text: String,
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model("Comment", commentSchema);
//blogPostSchema
const blogPostSchema = new mongoose.Schema(
  {
    title: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

//!Models
const Post = mongoose.model("Post", blogPostSchema);
//!-----Create Post---
const createPost = async () => {
  try {
    const newPost = await Post.create({ title: "Awesome Fullstack course" });
    console.log(newPost);
  } catch (error) {
    console.log(error);
  }
};
//createPost();
//!-----Create comment---
const createComment = async () => {
  try {
    //!Find the post
    const postFound = await Post.findById("66e82ebd752d0d2f45c85cb7");
    //Create the comment
    const newComment = await Comment.create({ text: "Awesome post1" });
    //Pust the comment into the post
    postFound.comments.push(newComment);
    //! Resave the post
    await postFound.save();
  } catch (error) {
    console.log(error);
  }
};
//createComment();
//!-----Fetch comment---
const fetchPosts = async () => {
  try {
    //!Find the post
    const posts = await Post.find().populate("comments");
    console.log(posts);

    console.log(posts[0].comments);
  } catch (error) {
    console.log(error);
  }
};
fetchPosts();
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
