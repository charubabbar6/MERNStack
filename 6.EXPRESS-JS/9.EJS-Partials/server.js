const express = require("express");
const path = require("path");
const app = express();
const PORT = 8082;
//Serve the static files/folder
app.use(express.static(path.join(__dirname, "public")));
//Set the view engine as  ejs
app.set("view engine", "ejs");

//Render Home page/route
app.get("/", (req, res) => {
  //res.render("home.ejs");
  res.render("home");
});
//Render Gallery page/route
app.get("/gallery", (req, res) => {
  res.render("gallery");
});
//Render About page/route
app.get("/about", (req, res) => {
  res.render("about");
});
//Render Contact page/route
app.get("/contact", (req, res) => {
  res.render("contact");
});
//!Start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
