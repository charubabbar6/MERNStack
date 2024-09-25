const asyncHandler = require("express-async-handler");
const Post = require("../model/Post");
const File = require("../model/File");
const Comment = require("../model/Comment");
const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinary");
//Rendering post form
exports.getPostForm = asyncHandler(async (req, res) => {
  res.render("addPost", {
    title: "Create Post",
    user: req.user,
    error: "",
    success: "",
  });
});
//Adding post (creating new Post)
exports.createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  // Validation: Ensure title and content are present
  // if (!title || !content || !req.files || req.files.length === 0) {
  //   return res.render("addPost", {
  //     title: "Create Post",
  //     user: req.user,
  //     error: "Title, content and atleast one image is required.",
  //     success: "",
  //   });
  // }

  const images = await Promise.all(
    req.files.map(async (file) => {
      //save the images into our database
      const newFile = new File({
        url: file.path,
        public_id: file.filename,
        uploaded_by: req.user._id,
      });
      await newFile.save();
      return {
        url: newFile.url,
        public_id: newFile.public_id,
      };
    })
  );

  // try {
  //create post
  const newPost = await Post.create({
    title,
    content,
    author: req.user._id,
    images,
  });
  await newPost.save();

  res.render("addPost", {
    title: "Create Post",
    user: req.user,
    success: "Post created successfully",
    error: "",
  });
  // } catch (error) {
  //   console.error("Post creation error:", error);
  //   res.status(500).render("addPost", {
  //     title: "Create Post",
  //     user: req.user,
  //     //error: "There was an error creating the post: " + error.message,
  //     success: "",
  //   });
  // }
});
//Get all posts
exports.getPosts = asyncHandler(async (req, res) => {
  const perPage = 9; // Number of posts per page
  const page = parseInt(req.query.page) || 1; // Get current page from query or default to 1
  // Fetch total number of posts
  const totalPosts = await Post.countDocuments();
  const posts = await Post.find()
    .populate("author", "username")
    .sort({ createdAt: -1 }) // Optional: sort by creation date
    .skip((page - 1) * perPage)
    .limit(perPage);

  res.render("posts", {
    title: "Posts",
    posts,
    currentPage: page,
    totalPages: Math.ceil(totalPosts / perPage),
    user: req.user,
    success: "",
    error: "",
  });
});
//get post by id

exports.getPostById = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const limit = parseInt(req.query.limit) || 5; // Default to 5 comments
  const skip = parseInt(req.query.skip) || 0; // Skip number of comments for pagination
  // Check if postId is a valid ObjectId
  if (!mongoose.isValidObjectId(postId)) {
    return res.status(400).send("Invalid Post ID");
  }

  try {
    const post = await Post.findById(postId)
      .populate("author", "username")
      .populate({
        path: "comments",
        options: {
          limit: limit, // Limit the number of comments
          skip: skip, // Skip the first 'skip' comments
        },
        populate: {
          path: "author",
          model: "User",
          select: "username",
        },
      });
    if (!post) {
      return res.status(404).send("Post not found");
    }
    // Count total comments for the post
    const totalComments = await Comment.countDocuments({ post: postId });
    // Render post details here
    res.render("postDetails", {
      title: "Post",
      post,
      user: req.user,
      success: "",
      error: "",
      totalComments,
      limit,
      skip,
    });
  } catch (error) {
    console.error("Error retrieving post:", error);
    res.status(500).send("An error occurred while retrieving the post.");
  }
});
//get edit post form
exports.getEditPostForm = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.render("postDetails", {
      title: "Post",
      post,
      user: req.user,
      error: "Post not found",
      success: "",
    });
  }
  res.render("editPost", {
    title: "Edit Post",
    post,
    user: req.user,
    error: "",
    success: "",
  });
});
// Update post
exports.updatePost = asyncHandler(async (req, res) => {
  try {
    const { title, content, replaceImages } = req.body;

    // Find the post
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.render("postDetails", {
        title: "Post",
        post,
        user: req.user,
        error: "Post not found",
        success: "",
      });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.render("postDetails", {
        title: "Post",
        post,
        user: req.user,
        error: "You are not authorized to edit this post",
        success: "",
      });
    }

    // Update title and content
    post.title = title || post.title;
    post.content = content || post.content;

    // Check if new files are being uploaded
    if (req.files && req.files.length > 0) {
      // Convert the replaceImages string to a boolean
      const isReplacingImages = replaceImages === "true";

      if (isReplacingImages) {
        // If replacing images, delete existing images first
        await Promise.all(
          post.images.map(async (image) => {
            await cloudinary.uploader.destroy(image.public_id);
          })
        );
        // Clear existing images
        post.images = [];
      }

      // Add new images
      const newImages = await Promise.all(
        req.files.map(async (file) => {
          const newFile = new File({
            url: file.path,
            public_id: file.filename,
            uploaded_by: req.user._id,
          });
          await newFile.save();
          return {
            url: newFile.url,
            public_id: newFile.public_id,
          };
        })
      );

      // Append new images to existing images if not replacing
      post.images.push(...newImages); // Only append new images if not replacing
    }

    console.log("Updated Post:", post);
    await post.save();
    res.redirect(`/posts/${post._id}`);
  } catch (error) {
    console.error("Update post error:", error);
    res.status(500).render("postDetails", {
      title: "Post",
      post: null,
      user: req.user,
      error: "Failed to update the post.",
      success: "",
    });
  }
});

//delete post
exports.deletePost = asyncHandler(async (req, res) => {
  //find the post
  const post = await Post.findById(req.params.id);
  if (!post) {
    req.flash("error", "Post not found");
    return res.redirect("/posts"); // Redirect to the posts page
    // return res.render("postDetails", {
    //   title: "Post",
    //   post,
    //   user: req.user,
    //   error: "Post not found",
    //   success: "",
    // });
  }
  if (post.author.toString() !== req.user._id.toString()) {
    req.flash("error", "You are not authorized to delete this post");
    return res.redirect(`/posts/${post._id}`); // Redirect to the post details
    // return res.render("postDetails", {
    //   title: "Post",
    //   post,
    //   user: req.user,
    //   error: "You are not authorized to delete this post",
    //   success: "",
    // });
  }
  await Promise.all(
    post.images.map(async (image) => {
      await cloudinary.uploader.destroy(image.public_id);
    })
  );
  let posts = await Post.findByIdAndDelete(req.params.id);
  // Set success message and redirect
  //console.log(req.session);
  req.flash("success", "Post deleted successfully");
  //console.log("Session after setting flash:", req.session); // Log session
  //console.log(req.flash("success"));
  const perPage = 9; // Number of posts per page
  const page = parseInt(req.query.page) || 1; // Get current page from query or default to 1
  // Fetch total number of posts
  const totalPosts = await Post.countDocuments();
  const totalPages = Math.ceil(totalPosts / perPage);
  posts = await Post.find()
    .skip((page - 1) * perPage) // Skip the posts for the current page
    .limit(perPage); // Limit the number of posts return
  res.render("posts", {
    title: "Posts",
    posts,
    currentPage: page,
    totalPages: Math.ceil(totalPosts / perPage),
    user: req.user,
    success: req.flash("success"),
    error: "",
  });
});
