//node --watch server
const express = require("express");
const mongoose = require("mongoose");

const PORT = 3000 || process.env.PORT;

const app = express();

const URL = "MONGOurl";

const connectToDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Mongodb connected successfully.");
  } catch (error) {
    console.log(`Error connecting to mongodb ${error}`);
  }
};
connectToDB();
//!Design Schema
const userProfileSchema = new mongoose.Schema({
  username: String, //String
  age: Number, //number
  birthday: Date, //date
  isActive: Boolean, //boolean
  hobbies: [String], //Arrays of string
  objectId: mongoose.Schema.Types.ObjectId, //Object id
  address: { street: String, city: String, pincode: Number }, //Embedded
  customData: mongoose.Schema.Types.Mixed,
});
//!Compile the Schema to form the model
const User = mongoose.model("User", userProfileSchema);

app.listen(PORT, console.log(`serevr is running on port: ${PORT}`));
