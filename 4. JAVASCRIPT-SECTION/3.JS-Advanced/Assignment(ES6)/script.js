// Ensuring Correct Property Names with Arrow Functions
// Your task is to create a function extractAuthors for a library management system. This function should take an array of book objects, each with a title and an author property. The function must return an array containing the authors' names. Additionally, your function should validate that each book object has the correct properties. If a book object does not have an author property, your function should throw an error. Use ES6 arrow functions to implement this functionality, ensuring that the function works correctly only when the correct property names are used.

// Step 1: Define the extractAuthors function with arrow syntax
const extractAuthors = (books) => {
  // Step 2: Check if any book object is missing the 'author' property
  // Use the 'some' method to perform this check
  // If a book is missing the 'author' property, throw an error
  // if (books.some(book => /*! Check if 'author' property exists in book */)) {
  if (books.some((book) => !book.hasOwnProperty("author"))) {
    throw new Error("Invalid book object - 'author' property missing");
  }

  // Step 3: Use the 'map' method to transform the array of book objects
  // Extract only the 'author' property from each book
  // return books.map(book => /* Extract 'author' from book */);
  return books.map((book) => book.author);
};

// Example usage:
const libraryBooks = [
  { title: "Brave New World", author: "Aldous Huxley" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger" },
];

// Step 4: Test the function with the example array
console.log(extractAuthors(libraryBooks)); // Expected output: ['Aldous Huxley', 'J.D. Salinger']
