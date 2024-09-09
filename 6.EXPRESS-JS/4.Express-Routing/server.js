const express = require("express");
const userRouter = require("./routes/usersRouter");
const postRouter = require("./routes/postsRouter");

const app = express();
const PORT = 8082;

//Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the main app",
  });
});

//----USERS ROUTE----
app.use("/users", userRouter);

//----POSTS ROUTE----
app.use("/posts", postRouter);
// //!.Getting all posts
// app.get("/posts", (req, res) => {
//   res.json({
//     message: "All Posts fetched.",
//   });
// });
// //!.Getting a post
// app.get("/posts/:id", (req, res) => {
//   res.json({
//     message: "Post fetched.",
//   });
// });
// //!.Update a post
// app.put("/posts/:id", (req, res) => {
//   res.json({
//     message: "Post updated.",
//   });
// });
// //!.delete a post
// app.delete("/posts/:id", (req, res) => {
//   res.json({
//     message: "Post deleted.",
//   });
// });

//start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
