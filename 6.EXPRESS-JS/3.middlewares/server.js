const express = require("express");
const app = express();
const path = require("path");
const PORT = 8082;

// Middleware to parse URL-encoded form data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// Profile route
app.get("/profile", (req, res) => {
  res.json({
    message: "This is a profile route",
  });
});

// Settings route
app.get("/settings", (req, res) => {
  res.json({
    message: "This is a settings route",
  });
});

// Get all users route
app.get("/users", (req, res) => {
  res.json({
    message: "Get all users route",
  });
});

// Register users route (this triggers the "/users" middleware)
app.post("/users/register", (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    // Trigger an error if required fields are not provided
    return next(new Error("Name and email are required"));
  }
  console.log(`User Registered - Name: ${name}, Email: ${email}`);
  res.json({
    message: `User registered successfully: Name - ${name}, Email - ${email}`,
  });
});

// Login users route (this triggers the "/users" middleware)
app.post("/users/login", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    // Trigger an error if required fields are not provided
    return next(new Error("Email and password are required"));
  }
  console.log(`User Login - Email: ${email}, Password: ${password}`);
  res.json({
    message: `Login successful for email: ${email}`,
  });
});

// Serve static files from the 'public' directory (this serves index.html automatically)
app.use(express.static(path.join(__dirname, "public")));

// !----ROUTER LEVEL MIDDLEWARE---
app.use("/users", (req, res, next) => {
  console.log("Middleware specific to paths with /users executed");
  next(); // Pass control to the next middleware or route handler
});

// !----ERROR-HANDLING MIDDLEWARE---
// Route to intentionally cause an error
app.get("/cause-error", (req, res, next) => {
  const error = new Error("This is a test error");
  next(error); // Pass the error to the error-handling middleware
});

// Error-handling middleware
app.use((error, req, res, next) => {
  console.error("Error occurred:", error.message); // Log the error to the console
  res.status(500).json({
    status: "error",
    message: error.message, // Send the error message in the response
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
