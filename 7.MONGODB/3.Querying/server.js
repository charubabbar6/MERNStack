const express = require("express");
const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
  Decimal128,
} = require("mongodb");
const app = express();
const PORT = 8082;
//Connect to mongodb
//const mongodbURL = "mongodb://localhost:27017";//use if we install mongodb locally

//use this if we use mongo atlas
const client = new MongoClient("mongourl", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("MongoDB Connected successfully");
    const database = client.db("studentDB");

    //2.Collections
    const employees = database.collection("employees");
    const books = database.collection("books");
    const students = database.collection("students");
    const employeesDocs = [
      { name: "Alice", age: 25, department: "HR" },
      { name: "Bob", age: 30, department: "Finance" },
      { name: "Charlie", age: 35, department: "IT" },
      { name: "David", age: 40, department: "Operations" },
      { name: "Eva", age: 45, department: "IT" },
    ];
    //const result = await employees.insertMany(employeesDocs);
    //console.log(result);
    const booksDocs = [
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960,
        genre: "Dram",
      },
      {
        title: "The 1984",
        author: "Geaorge Orwell",
        year: 1949,
        genre: "Dystopian",
      },

      {
        title: "The Catcher in the Rye",
        author: "JD",
        year: 1951,
        genre: "Drama",
      },
      {
        title: "The Brave World",
        author: "Huxley",
        year: 1932,
        genre: "Dysptopian",
      },
      {
        title: "The Hobbit",
        author: "J.R.R",
        year: 1937,
        genre: "Fantasy",
      },
    ];
    //const result = await books.insertMany(booksDocs);
    //console.log(result);
    //!----$gt-----
    //const employeesCursor = employees.find({ age: { $gt: 30 } });
    //const result = await employeesCursor.forEach((doc) => console.log(doc));

    //!----$gte-----
    //const employeesCursor = employees.find({ age: { $gte: 30 } });
    //const result = await employeesCursor.forEach((doc) => console.log(doc));

    //!----$ne-----
    // const employeesCursor = employees.find({ name: { $ne: "Eva" } });
    // const result = await employeesCursor.forEach((doc) => console.log(doc));
    //!----$lt-----
    //const employeesCursor = employees.find({ age: { $lt: 35 } });
    //const result = await employeesCursor.forEach((doc) => console.log(doc));
    //!----$lte-----
    //const employeesCursor = employees.find({ age: { $lte: 35 } });
    //const result = await employeesCursor.forEach((doc) => console.log(doc));
    //!----$nin-----
    //const employeesCursor = employees.find({ age: { $nin: [25, 45, 30] } });
    //const result = await employeesCursor.forEach((doc) => console.log(doc));//it will append undefined in the result as forEach  does not return a value.
    //const result = await employeesCursor.toArray();
    //!----$multiple conditions-----
    const employeesCursor = employees.find({ age: { $gt: 30, $lte: 45 } });
    //const result = await employeesCursor.toArray();
    //!----$or-----
    //const booksCursor = books.find({
    //$or: [{ genre: "Drama" }, { year: { $lt: 1950 } }],
    //});
    //const result = await booksCursor.toArray();
    //!----$and-----
    // const booksCursor = books.find({
    //   $and: [{ genre: "Dystopian" }, { year: { $gt: 1930 } }],
    // });
    // const result = await booksCursor.toArray();
    //!----$nor-----
    // const booksCursor = books.find({
    //   $nor: [{ genre: "Drama" }, { year: 1932 }],
    // });
    // const result = await booksCursor.toArray();
    //!----$not-----
    //const booksCursor = books.find({ year: { $not: { $lt: 1950 } } });
    // const result = await booksCursor.toArray();

    //!----ARRAY QUERIES-----
    const studentsDocs = [
      {
        name: "Alice",
        age: 25,
        grades: [90, 85, 88],
        sports: ["soccer", "basketbal"],
      },
      {
        name: "Bob",
        age: 30,
        grades: [70, 75, 80],
        sports: ["basketbal"],
      },
      {
        name: "David",
        age: 28,
        grades: [80, 90, 92],
        sports: ["basketbal", "soccer", "tennis"],
      },
      {
        name: "Prince",
        age: 25,
        grades: [85],
        sports: [],
      },
      {
        name: "Emily",
        age: 27,
        grades: [90, 95],
        sports: ["soccer", "tennis"],
      },
    ];
    //const result = await students.insertMany(studentsDocs);

    //!----$in-----
    // const studentsCursor = students.find({
    //   sports: { $in: ["soccer", "tennis"] },
    // });
    //const result = await studentsCursor.toArray();
    //!----$all-----
    // const studentsCursor = students.find({
    //   sports: { $all: ["soccer", "tennis"] },
    // });
    // const result = await studentsCursor.toArray();
    //!----$size-----
    // const studentsCursor = students.find({ grades: { $size: 1 } });
    // const result = await studentsCursor.toArray();
    //!----$elementMatch----
    // The query will return documents where the grades array contains at least one element that is greater than 90 and less than 95.
    // const studentsCursor = students.find({
    //   grades: { $elemMatch: { $gt: 90, $lt: 95 } },
    // });
    // const result = await studentsCursor.toArray();
    //!====SEARCHING====

    //!----$regex----
    // const booksCursor = books.find({
    //   title: { $regex: /THE/, $options: "i" },
    // });
    const booksCursor = books.find({
      title: { $regex: /n/, $options: "i" },
    });
    //const result = await booksCursor.toArray();
    //!----$text----
    //! Creating of the index
    const idxCreated = await books.createIndex({ title: "text" });
    console.log(idxCreated);
    const studentsCursor = books.find({ $text: { $search: "kill" } });
    const result = await studentsCursor.toArray();

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
//Run the function
connectDB();
//!Start the server
app.listen(PORT, console.log(`The server is up and running on port ${PORT}`));
