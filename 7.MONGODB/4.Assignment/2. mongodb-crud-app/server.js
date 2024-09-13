const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "views"); // Directory for EJS views

// Serve static files
app.use(express.static("public"));

let db;
//!mongodb connection
MongoClient.connect("mongourl")
  .then((client) => {
    console.log("Connected to MongoDB");
    db = client.db("studentDB");
  })
  .catch((err) => console.error(err));

// CRUD Routes

// Render the home page with items
app.get("/", async (req, res) => {
  try {
    const items = await db.collection("items").find().toArray();
    res.render("index", { items }); // Render EJS template with items data
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new item
app.post("/items", async (req, res) => {
  try {
    const item = req.body;
    await db.collection("items").insertOne(item);
    res.redirect("/"); // Redirect to home page after adding an item
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit an item
app.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await db
      .collection("items")
      .findOne({ _id: new ObjectId(id) });
    if (item) {
      res.render("edit", { item }); // Render EJS template with item data
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an item
app.post("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedItem = req.body;
    await db
      .collection("items")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedItem });
    res.redirect("/"); // Redirect to home page after updating an item
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an item
app.post("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection("items").deleteOne({ _id: new ObjectId(id) });
    res.redirect("/"); // Redirect to home page after deleting an item
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//! Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
