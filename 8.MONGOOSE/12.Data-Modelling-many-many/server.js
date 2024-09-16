const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8082;
const mongodbURL =
  "mongodb+srv://charubabbar6:xN4DPRrO7AxRY0kA@firstmongodb-cluster.q4dlq.mongodb.net/myDB";
const connectToDB = async () => {
  try {
    await mongoose.connect(mongodbURL);
    console.log("Mongodb has been connected successfully");
  } catch (error) {
    console.log(`Error connecting to mongodb ${error}`);
  }
};
connectToDB();
// ! ----many-many relationship-----
//courseSchema
const courseSchema = new mongoose.Schema(
  {
    name: String,
    enrolledStudents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    ],
  },
  {
    timestamps: true,
  }
);
const Course = mongoose.model("Course", courseSchema);
//studentSchema
const studentSchema = new mongoose.Schema(
  {
    name: String,
    enrolledCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    timestamps: true,
  }
);

//!Models
const Student = mongoose.model("Student", studentSchema);
//!Create the courses
const createCourses = async () => {
  try {
    //create courses
    const courses = await Course.create([
      {
        name: "DataStructuere",
      },
      {
        name: "Networking",
      },
    ]);
    console.log(courses);
  } catch (error) {
    console.log(error);
  }
};
//createCourses();
//!Register Student

const createStudents = async () => {
  try {
    //Create student
    const students = await Student.create([
      { name: "Arjun" },
      { name: "Charu" },
    ]);

    console.log(students);
  } catch (error) {
    console.log(error);
  }
};

//createStudents();
//!Student Applying to courses
const applyToCourse = async () => {
  try {
    //1.Find the student
    const foundStudent = await Student.findById("66e833e9857def8fa8cf2da2");
    //2. Find the course
    const courseFound = await Course.findById("66e833b12a2c1a6878646b55");

    //3. Apply to the course (1.update the student enrolledCourses 2.update the enrolledStudents on course)
    //4.Push the course found into the student's enrolledCourse field
    foundStudent.enrolledCourse.push(courseFound._id);
    //4. Push the student found into the courses's enrolledStudents field
    courseFound.enrolledStudents.push(foundStudent._id);
    //5. Resave the student and course docs
    await foundStudent.save();
    await courseFound.save();
    console.log(foundStudent);
    console.log(courseFound);
  } catch (error) {
    console.log(error);
  }
};
applyToCourse();
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
