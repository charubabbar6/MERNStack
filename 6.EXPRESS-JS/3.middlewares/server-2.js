const express = require("express");
const path = require("path");
const app = express();
const PORT = 8082;

//?----BUILT-IN-MIDDLEWARES----
// middleware used to parse incoming requests with URL-encoded payloads (typically from HTML forms) and makes that data available in req.body
//when forms are submitted via POST or PUT requests using the default encoding
// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve the static HTML file from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Handle form submission
app.post("/submit", (req, res) => {
  const { name, email } = req.body; // Access form data

  // Respond with the received data
  res.send(`Received submission: Name - ${name}, Email - ${email}`);
});

//start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));

//In browser:http://localhost:8082
//in postman: Post : http://localhost:8082/submit
//input:choose "Form encode" in body and add name:charu email:charu@gmail.com
//output:Received submission: Name - charu, Email - chaaru@gmail.com
