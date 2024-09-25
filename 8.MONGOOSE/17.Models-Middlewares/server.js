const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8082;

const mongodbURL = "";

//! 1. Connect to mongodb using mongoose
const connectToDB = async () => {
  try {
    await mongoose.connect(mongodbURL);
    console.log("Mongodb has been connected successfully");
  } catch (error) {
    console.log(`Error connecting to mongodb ${error}`);
  }
};
connectToDB();
// ! ----aggregate-middlewares-----
//productSchema
const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    publishYear: Date,
    isAvailable: Boolean,
  },
  {
    timestamps: true,
  }
);
//!--pre middleware
bookSchema.pre("save", function (next) {
  this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
  next();
});
//!--post middleware
bookSchema.post("save", function (doc) {
  if (doc.isAvailable) {
    console.log(`The book ${doc.title} is available`);
  } else {
    console.log(`The book ${doc.title} is not available`);
  }
});

const Book = mongoose.model("Book", bookSchema);

//!create user
const createUser = async () => {
  try {
    await Book.create({
      title: "Java",
      author: "Charu",
      publishYear: "2017",
      isAvailable: true,
    });
  } catch (error) {
    console.log(error);
  }
};
createUser();

//Start the server
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
