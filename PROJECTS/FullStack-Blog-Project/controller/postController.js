const Post = require("../model/Post");
const mongoose = require("mongoose");
//Rendering post form
exports.getPostForm = async (req, res) => {
  res.render("addPost", {
    title: "Create Post",
    user: req.user,
    error: "",
    success: "",
  });
};
//Adding post
exports.createPost = async (req, res) => {
  console.log("Request Body:", req.body); // Log the full request body
  const { title, content } = req.body;
  // Validation: Ensure title and content are present
  if (!title || !content) {
    return res.render("addPost", {
      title: "Create Post",
      user: req.user,
      error: "Title and content are required.",
      success: "",
    });
  }

  try {
    //create post
    const newPost = await Post.create({ title, content, author: req.user._id });
    await newPost.save();

    res.render("addPost", {
      title: "Create Post",
      user: req.user,
      success: "Post created successfully",
      error: "",
    });
  } catch (error) {
    console.error("Post creation error:", error);
    res.status(500).render("addPost", {
      title: "Create Post",
      user: req.user,
      error: "There was an error creating the post: " + error.message,
      success: "",
    });
  }
};
//Get all posts
exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "username");

  res.render("posts", {
    title: "Posts",
    posts,
    user: req.user,
    success: "",
    error: "",
  });
};
//get post by id

exports.getPostById = async (req, res) => {
  const postId = req.params.id;

  // Check if postId is a valid ObjectId
  if (!mongoose.isValidObjectId(postId)) {
    return res.status(400).send("Invalid Post ID");
  }

  try {
    const post = await Post.findById(postId).populate("author", "username");
    if (!post) {
      return res.status(404).send("Post not found");
    }
    // Render post details here
    res.render("postDetails", {
      title: "Post",
      post,
      user: req.user,
      success: "",
      error: "",
    });
  } catch (error) {
    console.error("Error retrieving post:", error);
    res.status(500).send("An error occurred while retrieving the post.");
  }
};
