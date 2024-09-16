const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator"); //package only works on string not number
const app = express();
const PORT = 8082;
const mongodbURL = "mongodb+srv:";
const connectToDB = async () => {
  try {
    await mongoose.connect(mongodbURL);
    console.log("Mongodb has been connected successfully");
  } catch (error) {
    console.log(`Error connecting to mongodb ${error}`);
  }
};
connectToDB();
const num = 12345;
console.log(validator.isNumeric(num)); // false
// Checking if the number is a string representation of a numeric value
console.log(validator.isNumeric(num.toString())); // true

// Checking if the number is a string representation of an integer
console.log(validator.isInt(num.toString())); // true
//!. Design Our Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      required: true,
      type: String,
      set: (value) => {
        return validator.escape(value); // Sanitize the value
      },
    },
    email: {
      required: true,
      type: String,
      validate: {
        validator: (value) => {
          return validator.isEmail(value);
        },
      },
    },
    age: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => {
          //return validator.isInt(value, { min: 0, max: 120 });//works on type number
          return validator.isInt(String(value), { min: 0, max: 120 }); // Ensure age is an integer within range
        },
        message: "Invalid Age",
      },
    },
  },
  {
    timestamps: true,
  }
);

//! Compile the schema to create the model
const User = mongoose.model("User", userSchema);

//!Create user
const createUser = async () => {
  try {
    const user = await User.create({
      email: "charu@gmail.com",
      username: "<script>alert('XSS')</script>", //"&lt;script&gt;alert(&#x27;XSS&#x27;)&lt;&#x2F;script&gt;" in db
      age: 100,
    });
    console.log("User created successfully:", user);
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.name === "ValidationError") {
      console.error("Validation error details:", error.errors);
    }
  }
};
//createUser();
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
