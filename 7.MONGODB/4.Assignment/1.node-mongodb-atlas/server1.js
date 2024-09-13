// Import necessary modules
const express = require("express");
const { connectToDB, getDB } = require("./db");
const path = require("path");

//npm i cors if frontend and backend are served from the different domain
// const cors = require('cors');
// app.use(cors());

// Initialize the Express app
const app = express();
const PORT = 8082;

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB Atlas before starting the server
connectToDB();

// Route to add data to MongoDB
app.post("/add-item", async (req, res) => {
  try {
    const newItem = req.body; // Get the item data from the request body
    const result = await collection.insertOne(newItem); // Insert data into collection
    res.status(201).json({ message: "Item added successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Error adding item", error });
  }
});

// Route to retrieve all items from MongoDB
app.get("/items", async (req, res) => {
  try {
    const items = await collection.find({}).toArray(); // Retrieve all documents
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving items", error });
  }
});
// Route to update an item in MongoDB
app.put("/update-item/:id", async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("items");
    const { id } = req.params;
    const updatedData = req.body;

    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: "No update data provided" });
    }

    const result = await collection.updateOne(
      { _id: new MongoClient.ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
