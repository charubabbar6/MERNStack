const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8082;
const mongodbURL = "";
const connectToDB = async () => {
  try {
    await mongoose.connect(mongodbURL);
    console.log("Mongodb has been connected successfully");
  } catch (error) {
    console.log(`Error connecting to mongodb ${error}`);
  }
};
connectToDB();
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
