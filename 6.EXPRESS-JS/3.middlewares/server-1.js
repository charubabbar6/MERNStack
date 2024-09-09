const express = require("express");
const app = express();
const PORT = 8082;

//?----BUILT-IN-MIDDLEWARES----
//serve static files
//app.use(express.static()); //error, as it expects a directory to serve files
app.use(express.static("public"));
//!pass incoming data
// Use express.json() to parse JSON bodies
app.use(express.json({ limit: "1mb" }));
app.use(express.json()); // when handling API requests where the client sends data in JSON format
// Define a POST route
app.post("/data", (req, res) => {
  // Access the parsed JSON data from the request body
  const requestData = req.body;
  // Send a response back with the received data
  res.send(`You sent: ${JSON.stringify(requestData)}`);
});
//start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
//input:http://localhost:8082/data
//body:{"name": "Charu","age": 25}
//output:You sent: {"name":"Charu","age":25}
