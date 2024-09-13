//node --watch server
const express = require("express");
const mongoose = require("mongoose");

const PORT = 3000 || process.env.PORT;

const app = express();

const URL = "mongourl";

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

//!. Design Our Schema
const studentsSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    score: Number,
    premiumStudent: Boolean,
    subjects: [String],
  },
  {
    timestamps: true,
  }
);

//!3. Create the model
// Model Name: Student
// Collection Name: students (automatically pluralized by Mongoose)
//? Compiling the schema
//const Student = mongoose.model("Student", studentsSchema);
const Student = mongoose.model("Student", studentsSchema, "Student"); //customCollectionName(if we not mention 3rd argument then it will automatically pluraised by mongoose and use students as tabke name .)
//!========CRUD operations============
//!=========CREATE OPERATION==========
//!save()
const newUser = new User({
  username: "Charu Babbar",
  age: 28,
  birthday: new Date("2021-04-09"),
  isActive: true,
  hobbies: ["painting", "coding", "reading"],
  address: { street: "Handewadi road", city: "Pune", pincode: 140209 },
  customData: { contry: "India" },
});
// newUser
//   .save()
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));
//!create()
// User.create({
//   username: "Arjun Chanana",
//   age: 28,
//   birthday: new Date("2021-04-09"),
//   isActive: true,
//   hobbies: ["painting", "claying", "reading"],
//   address: { street: "Handewadi road", city: "Pune", pincode: 140209 },
//   customData: { contry: "India" },
// })
// .then((data) => console.log(data))
// .catch((error) => console.log(error));
//!insertMany()
// User.insertMany([
//   {
//     username: "Dolly Babbar",
//     age: 28,
//     birthday: new Date("2021-04-09"),
//     isActive: true,
//     hobbies: ["painting", "claying", "reading"],
//     address: { street: "Handewadi road", city: "Banglore", pincode: 140209 },
//     customData: { contry: "India" },
//   },
//   {
//     username: "sushant chanana",
//     age: 28,
//     birthday: new Date("2021-11-09"),
//     isActive: true,
//     hobbies: ["painting", "claying", "blogging"],
//     address: { street: "Handewadi road", city: "Ireland", pincode: 140209 },
//     customData: { contry: "India" },
//   },
// ])
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));
//!======Read operations============
//! ----.find()--------
// User.find()
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
//! ----.findOne()--------
// User.findOne({
//   username: "Charu Babbar",
// })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
// //! ----.findById()--------
// User.findById("66e309fcca3e9634fcea6179")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

//! ----.where()--------
// User.find()
//   .where("age")
//   .gte(27)
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// const findUsers = async () => {
//   try {
//     const users = await User.find().where("age").gte(27);
//     console.log(users);
//   } catch (error) {
//     console.log(error);
//   }
// };
// findUsers();
//! ----.sort()--------
//age: 1 Ascending order (smallest to largest)
//age:-1 Descending order (largest to smallest)
// User.find()
//   .sort({ age: -1 })
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

// const findUsers = async () => {
//   try {
//     const users = await User.find().sort({ username: -1 });
//     console.log(users);
//   } catch (error) {
//     console.log(error);
//   }
// };
// findUsers();
//! ----.limit()--------
// User.find()
//   .limit(3)
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

// const findUsers = async () => {
//   try {
//     const users = await User.find().limit(2);
//     console.log(users);
//   } catch (error) {
//     console.log(error);
//   }
// };
// findUsers();

//! ----.chaining()--------
// User.find()
//   .where("age")
//   .gt(12)
//   .sort({ username: 1 })
//   .limit(2)
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));
// const findUsers = async () => {
//   try {
//     const users = await User.find()
//       .where("age")
//       .gte(27)
//       .sort({ username: 1 })
//       .limit(3);
//     console.log(users);
//   } catch (error) {
//     console.log(error);
//   }
// };
// findUsers();
// !----CREATE NEW USERS----

const createStudent = async () => {
  try {
    const newStudents = await Student.create([
      {
        name: "Charu",
        age: 25,
        score: 80,
        subjects: ["Math", "Physics"],
      },
      {
        name: "Arjun",
        age: 22,
        score: 80,
        subjects: ["History", "English"],
      },
      {
        name: "Sushant",
        age: 29,
        score: 80,
        subjects: ["Computer Science", "Math"],
      },
    ]);
    console.log(newStudents);
  } catch (error) {
    console.log(error);
  }
};
//createStudent();
// !------FETCH STUDENTS-----
const findUsers1 = async () => {
  try {
    // !---$gt----
    // const students = await Student.find({
    //   age: { $gt: 25 },
    // });
    //console.log(students);
    // !---where()----
    //const students = await Student.find().where("age").equals(22);
    //const students = await Student.find({ age: 22 });
    //console.log(students);
    // !---in()----
    const students = await Student.find({ age: { $in: [22, 25] } }); //age field matches any value in the array [22, 25
    console.log(students);
  } catch (error) {
    console.log(error);
  }
};
//findUsers1();
// !------FETCH STUDENTS-----
const findUsers = async () => {
  try {
    //! Exclude email, age, premiumStudent _id
    //const students = await Student.find({}, "-age -email -premiumStudent -_id");
    // !----using the select()----
    //Field Inclusion Only:
    //const students = await Student.find().select("name");
    const students = await Student.find().select("name age score -_id");
    //Field Inclusion with Exclusion:
    //const students = await Student.find().select("name -_id");
    console.log(students);
  } catch (error) {
    console.log(error);
  }
};
//findUsers();
// !======UPDATING DOCUMENTS -----
//!-----updateOne()--------
// const updateOneFn = async () => {
//   try {
//     const result = await Student.updateOne(
//       { name: "Prince" },
//       { $set: { email: "prince2@gmail.com", age: 40 } }
//     );
//     console.log(result); // This will show the result of the update operation
//   } catch (error) {
//     console.log(error);
//   }
// };
const updateOneFn = async () => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { name: "Prince" },
      { $set: { email: "prince2@gmail.com", age: 10 } },
      //{ new: true } // Return the updated document
      { new: true, runValidators: true } // Return the updated document and apply schema validation
    );
    console.log(updatedStudent); // This will show the updated document
  } catch (error) {
    console.log(error);
  }
};

//updateOneFn();
//!-----findByIdAndUpdate()--------
// const updateDoc = async () => {
//   try {
//     const updatedStudent = await Student.findByIdAndUpdate(
//       "66e1980ba670bcedb7fe4923",
//       { age: 21, name: "Sushant Chanana" },
//       { new: true }
//     );
//     console.log(updatedStudent);
//   } catch (error) {
//     console.log(error);
//   }
// };
//!-----updateMany()--------

// const updateDoc = async () => {
//   try {
//     const updatedStudent = await Student.updateMany(
//       { age: { $gt: 20 } },
//       { premiumStudent: false },
//       { new: true }
//     );
//     console.log(updatedStudent);
//   } catch (error) {
//     console.log(error);
//   }
// };
//!-----findBOneAndUpdate()--------

// const updateDoc = async () => {
//   try {
//     const updatedStudent = await Student.findOneAndUpdate(
//       { _id: "66e1deb59f3d4131aec742ef" },
//       { premiumStudent: true, name: "Princi" },
//       { new: true }
//     );
//     console.log(updatedStudent);
//   } catch (error) {
//     console.log(error);
//   }
// };
//updateDoc();
// !======UPDATING DOCUMENTS -----
//!-----update operators()--------
const updateDoc = async () => {
  try {
    //Create the student
    await Student.create({
      name: "Tom",
      age: 20,
      subjects: ["Math"],
      score: 85,
    });
    //! $set $unset
    //$unset: { score: "" }
    // const student = await Student.findOneAndUpdate(
    //   { name: "Tom" },
    //   {
    //     $set: { age: 23 },
    //     $unset: { score: 1 },
    //   },
    //   { new: true }
    // );
    // console.log(student);
    //! $addToset $Push
    // const student = await Student.findOneAndUpdate(
    //   { name: "Tom" },
    //   {
    //     //$addToSet: { subjects: "Physics" },// Adds a value to an array only if that value does not already exist in the array
    //     $push: { subjects: "Chemistry" }, //Does not check for duplicates. If you add a value that is already in the array, it will be added again.
    //   },
    //   { new: true }
    // );
    // console.log(student);
  } catch (error) {
    console.log(error);
  }
};
//updateDoc();
const updateSubjects = async () => {
  try {
    // Add "Physics" to subjects if it doesn’t already exist
    await Student.findOneAndUpdate(
      { name: "Tom" },
      { $addToSet: { subjects: "Physics" } },
      { new: true }
    );

    // Then push "Chemistry" to subjects
    const student = await Student.findOneAndUpdate(
      { name: "Tom" },
      { $push: { subjects: "Chemistry" } },
      { new: true }
    );

    console.log(student);
  } catch (error) {
    console.log(error);
  }
};
//updateSubjects();

const updatedocu = async () => {
  try {
    //!----$inc $mul-----
    // const student = await Student.findOneAndUpdate(
    //   { name: "Tom" },
    //   {
    //     $inc: { age: -10 },
    //     $mul: { score: -2 },
    //   },
    //   { new: true }
    // );
    // console.log(student);
    //!----$pop $pull-----
    // const student = await Student.findOneAndUpdate(
    //   { name: "Tom" },
    //   {
    //     //$pop: { subjects: -1 }, //Removes elements from the beginning or end of an array,The number of elements to remove. Positive values remove elements from the end, and negative values remove from the beginning.
    //     $pull: { subjects: "Math" }, //Removes all instances of a value from an array.
    //   },
    //   { new: true }
    // );
    // console.log(student);
    //!----$min $max-----
    // const student = await Student.findOneAndUpdate(
    //   { name: "Tom" },
    //   {
    //     // $min: { age: 18 }, // Sets age to 18 if current age is greater than 18
    //     $max: { age: 22 }, // Sets age to 22 if current age is less than 22
    //   },
    //   { new: true }
    // );
    // console.log(student);
    //!----$currentDate----
    const student = await Student.findOneAndUpdate(
      { name: "Tom" },
      {
        //$currentDate: { lastModified: new Date() }, // Sets lastModified to the current date and time, $currentDate does not take a Date object as a value. Instead, it takes an optional $type argument that specifies the type of date to be used, like "date" or "timestamp".
        $currentDate: { lastModified: { $type: "date" } },
      },
      { new: true } //When you use { new: true } in an update operation, it tells MongoDB to return the updated version of the document after the update has been applied.
    );
    console.log(student);
  } catch (error) {
    console.log(error);
  }
};
//updatedocu();

// !======DELETING DOCUMENTS -----
const deleteDoc = async () => {
  try {
    //!-----findByIdAndDelete()--------
    //const result = await Student.findByIdAndDelete("66e43f3f09b3a59d879e9638");
    //!-----findOneAndDelete()--------
    //const result = await Student.findOneAndDelete({ name: "Sushant" });
    //!-----deleteMany()--------
    const result = await Student.deleteMany({ age: { $gt: 20 } });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
deleteDoc();
app.listen(PORT, console.log(`server is running on port: ${PORT}`));
