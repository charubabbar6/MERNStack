// Import necessary modules
const express = require("express");
const { connectToDB, getDB } = require("./db");
const path = require("path");
const { ObjectId } = require("mongodb"); // Import ObjectId for validating IDs

// Initialize the Express app
const app = express();
const PORT = 8082;

//npm i cors if frontend and backend are served from the different domain
// const cors = require('cors');
// app.use(cors());

// Middleware to parse JSON
app.use(express.json());
app.use(express.static("public"));
let collection; // Declare collection globally
let db;
async function startServer() {
  try {
    // Connect to MongoDB Atlas before starting the server
    await connectToDB(); // Wait for the connection to complete
    db = getDB(); // Now getDB() should work
    //console.log("Database connected:", db);
    console.log("Database connected:");
    collection = db.collection("items");
    //!Start the server
    app.listen(
      PORT,
      console.log(`The server is up and running on port ${PORT}`)
    );
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}
//! Route to add data to MongoDB
app.post("/add-item", async (req, res) => {
  try {
    if (!collection) {
      throw new Error("Collection is not initialized");
    }
    const newItem = req.body; // Get the item data from the request body
    console.log(newItem);

    const result = await collection.insertOne(newItem); // Insert data into collection
    console.log(result);

    res.status(201).json({ message: "Item added successfully", result });
  } catch (error) {
    //console.error("Error adding item:", error); // Log detailed error
    res.status(500).json({ message: "Error adding item", error });
  }
});
//! Route to retrieve all data to MongoDB
app.get("/items", async (req, res) => {
  try {
    const items = await collection.find({}).toArray(); // Retrieve all documents
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving items", error });
  }
});
//! Route to retrieve specific  data to MongoDB
// Route to get an item by its unique ID
app.get("/get-item/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const item = await collection.findOne({ name: `${id}` });
    console.log("Item", item);

    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving item", error });
  }
});
//! Route to update an item in MongoDB
app.put("/update-item/:name", async (req, res) => {
  try {
    // Ensure that the database connection is established and `db` is properly initialized.
    if (!db) {
      return res
        .status(500)
        .json({ message: "Database connection not established" });
    }
    collection = db.collection("items");
    const itemName = req.params.name;
    console.log(`Updating item with name: ${itemName}`);

    const updatedData = req.body;
    console.log("Update data:", updatedData);
    // Check if update data is provided
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: "No update data provided" });
    }
    // Update the item by name
    const result = await collection.updateOne(
      { name: itemName }, // Use name to find the item
      { $set: updatedData }
    );
    // Check if any documents were matched and updated
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    // Log the error details for debugging purposes
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Error updating item", error });
  }
});
//! Route to delete an item in MongoDB
app.delete("/delete-item/:name", async (req, res) => {
  try {
    collection = db.collection("items");
    const itemName = req.params.name;

    // Attempt to delete item
    const result = await collection.deleteOne({ name: itemName });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Error deleting item", error });
  }
});
startServer();
