const Post = require("../model/blog");
//createPost
const showcreatePost = async (req, res) => {
  res.render("createPost");
};
//showpost
const showPost = async (req, res) => {
  const posts = await Post.find();
  res.render("list", { posts });
};
//create Post Logic
const createPostLogic = async (req, res) => {
  const { title, content, author } = req.body;
  await Post.create({
    title,
    content,
    author,
  });
  //redirect to the post list
  res.redirect("/list");
};

//delete Post
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(`Attempting to delete post with ID: ${postId}`);

    const result = await Post.findByIdAndDelete(postId);
    console.log(`Delete result: ${result}`);
    if (!result) {
      return res.status(404).send("Post not found");
    }

    res.redirect("/list"); // Redirect to list of posts after successful deletion
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send("Error deleting post");
  }
};
module.exports = { showcreatePost, showPost, createPostLogic, deletePost };
