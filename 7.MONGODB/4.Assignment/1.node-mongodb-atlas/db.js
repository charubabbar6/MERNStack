const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient("mongourl", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

let db;

// Function to connect to the MongoDB database
async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    db = client.db("studentDB"); // Use your actual database name
    return db;
  } catch (err) {
    console.error("Failed to connect to MongoDB Atlas:", err);
    process.exit(1); // Exit the process if the connection fails
  }
}

// Function to get the connected database
function getDB() {
  if (!db) {
    throw new Error("No database connection");
  }
  return db;
}

module.exports = { connectToDB, getDB };
