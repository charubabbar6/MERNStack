const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = 5000;
//username:charubabbar6
//password:Fb7VgV3qxap1qdGz
//mongodb url:
//connect to MongoDB

//1. Create the client
const client = new MongoClient("mongourl", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//function to connect
const connectDB = async () => {
  try {
    await client.connect();
    console.log("MongoDB connected successfully");
    //1. Database name(school)
    const database = client.db("studentDB");
    //2. Collections(students)
    const studentsCollection = database.collection("students");
    //3. documents()
    const result = await studentsCollection.insertOne({
      name: "Charu Babbar",
      age: 28,
      subjects: ["Math", "English"],
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
//calling the function
connectDB();
//start the server
app.listen(port, () => console.log(`Server is started at port: ${port}`));
