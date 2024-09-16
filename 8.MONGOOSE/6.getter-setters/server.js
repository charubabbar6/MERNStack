//npm i express mongoose validator
//set option:transforms the data before saving to db.//standarize data formatting (e.g. trim,lowercase)//sanitize or format data before saving to db
//get option:transforms the data after retrival but before use.//modify values(append domain to username)//format combine fields for app use without altering db.
const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
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

//!. Design Our Schema
//set function is a common practice for sanitizing string inputs by removing any leading or trailing whitespace.
//
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      set: (value) => value.trim(), // Trim leading and trailing whitespace from the username
    },
    author: {
      type: String,
      required: true,
      set: (value) => value.trim(), //Trimming
    },
    price: {
      type: String,
      required: true,
      set: (value) => Math.round(value * 100) / 100, //Rouding to 2 decimal places
    },
    tags: {
      type: [String],
      required: true,
      set: (value) => value.map((tag) => tag.toLowerCase()), //Convert to lowercase
    },
    url: {
      type: String,
      get: (value) => `https://mongoosejs.com/docs/${value}`, // Format url // Prepend base URL when retrievingwith URL when retrieving
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
  //   {
  //     timestamps: true,
  //     toJSON: { getters: true }, // Ensure getters are applied when converting to JSON
  //     toObject: { getters: true }, // Ensure getters are applied when converting to object
  //   }
);
//! Compile the schema to create the model
const Book = mongoose.model("Book", bookSchema);
//!Create book
const createBook = async () => {
  try {
    const newBook = await Book.create({
      title: "Mongoose for everyone",
      author: "Charu Babbar",
      price: 100.99987,
      tags: ["MONGODB", "NODEJS", "Mongoose"],
      url: "typescript.html",
    });
    console.log(newBook);
    // Accessing the URL field should include the base URL
    console.log("Formatted URL:", newBook.url); // Should output "https://mongoosejs.com/docs/typescript.html"
  } catch (error) {
    console.log(error);
  }
};
//createBook();
const fetchBooks = async () => {
  try {
    const books = await Book.find();
    console.log(books);
  } catch (error) {
    console.log(error);
  }
};
fetchBooks();

app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
