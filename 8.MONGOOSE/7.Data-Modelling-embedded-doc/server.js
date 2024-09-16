const express = require("express");
const mongoose = require("mongoose");
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
//addressSchema
const addressSchema = new mongoose.Schema(
  {
    street: String,
    city: String,
    state: String,
    zip: Number,
  },
  {
    timestamps: true,
  }
);
//UserSchema
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    address: addressSchema, //embedded approach
  },
  {
    timestamps: true,
  }
);

//!Models
const User = mongoose.model("User", userSchema);

const createUser = async () => {
  try {
    //create the user
    const newUser = await User.create({
      name: "Charu",
      email: "charu@gmail.com",
      address: {
        street: "Lawrence Road",
        city: "Chandigarh",
        state: "Punjab",
        zip: 128765,
      },
    });
    console.log(newUser);
  } catch (error) {
    console.log(error);
  }
};

createUser();
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
