const express = require("express");

//instance
const app = express();
//console.log(app);

//Create the PORT
const PORT = 8082;
//Define the router handler
app.get("/", (req, res) => {
  res.send("Hello World");
});
// start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
