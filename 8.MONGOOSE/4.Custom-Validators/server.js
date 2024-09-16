const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8082;
const mongodbURL = "mongodb+srv://";
const connectToDB = async () => {
  try {
    await mongoose.connect(mongodbURL);
    console.log("Mongodb has been connected successfully");
  } catch (error) {
    console.log(`Error connecting to mongodb ${error}`);
  }
};
connectToDB();
//!. Design Our Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please username is required"],
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9]+$/.test(value); //only alphameric
        },
        message: "Username can only contain alphanumeric character",
      },
    },
    email: {
      type: String,
      required: [true, "Please email is required"],
      validate: {
        validator: function (value) {
          return value.endsWith("@gmail.com"); //email must end with @gmail.com
        },
        message: "Email must be from the domain @gmail.com",
      },
    },
  },
  {
    timestamps: true,
  }
);
//! Compile the schema to create the model
const User = mongoose.model("User", userSchema);
const createUser = async () => {
  try {
    await User.create({
      email: "test@outlook.com",
      username: "#charu",
    });
  } catch (error) {
    console.log(error);
  }
};
createUser();
//!Create user
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
