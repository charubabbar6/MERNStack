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
    userName: {
      type: String,
      required: [true, "Please username is required."],
      unique: true,
      minlength: 3,
      mxlength: 10,
    },
    email: {
      type: String,
      required: [true, "Please email is required."],
      match: /@/,
    },
    age: {
      type: Number,
      min: 18,
      max: 55,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
  },
  {
    timestamps: true,
  }
);
//studentSchema
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is required
      minlength: 3, // Minimum length of 3 characters
      maxlength: 50, // Maximum length of 50 characters
    },
    age: {
      type: Number,
      required: true, // Age is required
      min: 18, // Minimum age is 18
      max: 100, // Maximum age is 100
    },
    email: {
      type: String,
      match: /.+\@.+\..+/, // Validates email format
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"], // Must be one of the specified values
      default: "inactive", // Default value if none is provided
    },
    subjects: {
      type: [String], // Array of strings
      validate: {
        validator: function (v) {
          return v && v.length > 0; // Ensures at least one subject is present
        },
        message: "A student must have at least one subject.",
      },
    },
    score: {
      type: Number,
      min: 0, // Minimum score is 0
      max: 100, // Maximum score is 100
    },
  },
  {
    timestamps: true,
  }
);
//! Compile the schema to create the model
const User = mongoose.model("User", userSchema);
const Student = mongoose.model("Student", studentSchema);
//!Create user
const createUser = async () => {
  try {
    const newuser = await User.create({
      userName: "Charu",
      age: 20,
      email: "charubabbar@gmail.com",
      gender: "Female",
    });
    console.log(newuser);
  } catch (error) {
    console.log(error);
  }
};
//createUser();
//!Create Student
const student = new Student({
  name: "Charu",
  age: 25,
  email: "charu@gmail.com",
  status: "active",
  subjects: ["Math", "Physics"],
  score: 85,
});
// student
//   .save()
//   .then((doc) => {
//     console.log("Student saved successfully:", doc);
//   })
//   .catch((error) => {
//     console.log("Error saving student:", error.message);
//   });
const invalidStudent = new Student({
  name: "J",
  age: 10, // Invalid age (less than the minimum)
  email: "not-an-email",
  status: "unknown", // Invalid status (not in enum)
  subjects: [], // No subjects
  score: 120, // Invalid score (greater than 100)
});
invalidStudent
  .save()
  .then((doc) => {
    console.log("Student saved successfully:", doc);
  })
  .catch((error) => {
    console.log("Error saving student:", error.message);
  });
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
