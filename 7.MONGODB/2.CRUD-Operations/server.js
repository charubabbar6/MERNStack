const express = require("express");
const app = express();
const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
  Decimal128,
} = require("mongodb");

const port = 5000;
//mongodb://localhost:27017
//1. Create the client
const client = new MongoClient("mongourl", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//function to connect
const connectDB = async () => {
  try {
    await client.connect();
    console.log("MongoDB connected successfully");
    //1. Database name(school)
    const database = client.db("studentDB");
    //2. Collections(students)
    const studentsCollection = database.collection("students");
    const books = database.collection("books");
    //!----CREATE----
    //! Create document (any student) - insertOne
    // const result = await studentsCollection.insertOne({
    //   name: "Charu Babbar",
    //   age: 28,
    //   subjects: ["Math", "English"],
    // });
    //! Using insertMany
    //3. documents() using insertmany
    // const result = await studentsCollection.insertMany([
    //   {
    //     name: "Dolly Babbar",
    //     age: 27,
    //     grade: "B",
    //     pass: false,
    //     subjects: ["Math", "Biotech"],
    //   },
    //   {
    //     name: "Arjun",
    //     grade: "B",
    //     pass: false,
    //     age: 3,
    //     subjects: ["Chemistry", "Biology"],
    //   },
    //   {
    //     name: "Sushant",
    //     grade: "C",
    //     pass: true,
    //     age: 30,
    //     subjects: ["Chemistry", "Biology"],
    //   },
    // ]);
    //!----READ OPERATIONS----
    //! Find()
    //const resultcursor = studentsCollection.find();
    //console.log(resultcursor);
    //const result = await resultcursor.toArray();
    //! Findone()

    // const result = await studentsCollection.findOne({ age: 3 });
    //!----UPDATE OPERATIONS----
    //! updateOne()
    // const result = await studentsCollection.updateOne(
    //   {
    //     age: 27,
    //   },
    //   { $set: { age: 20 } }
    // );
    //! updateMany()
    // const result = await studentsCollection.updateMany(
    //   {
    //     grade: "B",
    //   },
    //   { $set: { pass: true } }
    // );
    //! findOneAndUpdate()
    // const result = await studentsCollection.findOneAndUpdate(
    //   {
    //     name: "Sushant",
    //   },
    //   { $set: { name: "sushant chanana" } }
    // );
    //!----DELETE OPERATIONS----
    //! deleteOne()
    //const result = await studentsCollection.deleteOne({ name: "Dolly Babbar" });

    //! deleteMany()
    // const result = await studentsCollection.deleteMany({
    //   grade: "C",
    // });
    //! findOneAndDelete()
    // const result = await studentsCollection.findOneAndDelete({
    //   grade: "C",
    // });
    //!----BULK WRITE OPERATIONS----
    //! insert
    //! Update
    //! Delete
    const bulkWriteOperations = [
      // Creation stage
      {
        insertOne: {
          document: {
            name: "John",
            age: 20,
            grade: "A",
          },
        },
      },
      // update stage
      {
        updateOne: {
          filter: { name: "John" }, //filtering
          update: { $set: { grade: "B" } },
        },
      },
      // delete stage
      {
        deleteOne: {
          filter: { name: "John" },
        },
      },
    ];
    //const result = await studentsCollection.bulkWrite(bulkWriteOperations);
    //!----DATA TYPES OPERATIONS----
    const result = await books.insertOne({
      _id: new ObjectId(), //object
      title: "To Kill a Mockingbird", //string
      author: {
        firstname: "Harper", //Embeded //string'
        lastname: "Lee",
      },
      isAvailable: true, //Boolean
      price: Decimal128.fromString("10.99"), //Decimal 128
      tags: ["Classic", "Literature"], //Array
      ratings: [4.5, 4.0, 5.0], //Array of doubles
      publisher: {
        name: "JB Lippicott",
        founded: "1982",
        isActive: true, // Boolean
      },
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
//calling the function
connectDB();
//start the server
app.listen(port, () => console.log(`Server is started at port: ${port}`));
