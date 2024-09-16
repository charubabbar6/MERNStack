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
//studentSchema
const studentSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    grade: String,
  },
  {
    timestamps: true,
  }
);
//clssroomSchema
const classroomSchema = new mongoose.Schema(
  {
    className: String,
    students: [studentSchema],
  },
  {
    timestamps: true,
  }
);
//!Models
const Student = mongoose.model("Student", studentSchema);
const Classroom = mongoose.model("Classroom", classroomSchema);
const createClassroom = async () => {
  try {
    //create the classroom
    const newClassroom = await Classroom.create({
      className: "Math 101",
      students: [
        { name: "Arjun", age: 20, grade: "A" },
        { name: "Charu", age: 22, grade: "B" },
      ],
    });
    console.log(newClassroom);
  } catch (error) {
    console.log(error);
  }
};

//createClassroom();
// !addStudentToClassroom
const addStudentToClassroom = async () => {
  try {
    // First, find the classroom by ID
    const classroom = await Classroom.findById("66e80f8ab3c2029d746529af");
    if (!classroom) {
      console.log("Classroom not found!");
      return;
    }
    // Check if a student with the same name already exists
    const studentExists = classroom.students.some(
      (student) => student.name === "Dolly"
    );

    if (studentExists) {
      console.log("Student with the same name already exists!");
    } else {
      // If student doesn't exist, add them using $push

      const classroomUpdated = await Classroom.findByIdAndUpdate(
        "66e80f8ab3c2029d746529af",
        {
          //$push: { students: { name: "Sushant", age: 28, grade: "A" } },
          $addToSet: { students: { name: "Dolly", age: 22, grade: "B" } },
        },
        { new: true }
      );
      console.log(classroomUpdated);
    }
  } catch (error) {
    console.log(error);
  }
};
addStudentToClassroom();
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
