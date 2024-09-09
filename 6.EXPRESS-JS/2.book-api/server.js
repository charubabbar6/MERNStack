const express = require("express");
const app = express();
const PORT = 8082;

//Receiving incoming from the client configuration
app.use(express.json());
const books = [
  { id: "1", title: "The great Gatsby", author: "F.Scott" },
  { id: "2", title: "The Moby Dic", author: "Herman" },
  { id: "3", title: "The MERN Stack", author: "Charu Babbar" },
];
//Home Route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to my first book api using express",
    data: "Charu Babbar",
  });
});
// Fetching all books
app.get("/books", (req, res) => {
  res.json({
    status: "success",
    message: "Books fetched successfully",
    data: books,
  });
});
// Search for a book (req.query)
app.get("/books/search", (req, res) => {
  //console.log(req.query);
  const { id, title, author } = req.query;
  // Filter books based on query parameters
  let filteredBooks = books;

  if (id) {
    filteredBooks = filteredBooks.filter((book) => book.id === id);
  }
  if (title) {
    filteredBooks = filteredBooks.filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
  }
  if (author) {
    filteredBooks = filteredBooks.filter((book) =>
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }
  res.json({
    status: "success",
    message: "Book found successfully",
    data: filteredBooks,
  });
});
// Fetch a book
app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const bookFound = books.find((book) => book.id === id);
  if (!bookFound) {
    return res.json({
      status: "failed",
      message: `Book with id ${id} not found`,
    });
  }
  res.json({
    status: "success",
    message: "Books fetched successfully",
    data: bookFound,
  });
});
// Create a book
app.post("/books", (req, res) => {
  const newPost = req.body;
  books.push(newPost);
  res.json({
    status: "success",
    message: "Books created successfully",
    data: books,
  });
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
