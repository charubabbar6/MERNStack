const express = require("express");
const app = express();
const path = require("path");
const PORT = 8082;

app.use(express.urlencoded({ extended: true }));
// Serve the static HTML file from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

//?----APP-LEVEL-MIDDLEWARES----
// Example 1: Simple Logging Middleware (applies to all routes)
//Logging details of every request
const logRequest = (req, res, next) => {
  console.log(
    `Request received at: ${new Date().toISOString()} for ${req.method} to ${
      req.path
    }`
  );
  //call next
  next(); // Pass control to the next middleware or route handler
};
app.use(logRequest);
// Example 2: Authentication Middleware for specific routes
app.use("/dashboard", (req, res, next) => {
  const isAuthenticated = true; // This would be dynamically determined (e.g., by checking a token)

  if (isAuthenticated) {
    console.log("User authenticated");
    next(); // Proceed to the next middleware/route handler
  } else {
    res.status(403).send("Access Denied: You are not authenticated");
  }
});
// Example 3: JSON Body Parsing Middleware (applies to POST requests)
app.use(express.json());
// Routes

// Public route (no auth required)
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});
// Home Route
app.get("/", (req, res) => {
  console.log(req.body);
  res.json({
    message: "Welcome to this app",
  });
});
// Protected route (uses the auth middleware)
app.get("/dashboard", (req, res) => {
  res.send("Welcome to your Dashboard!");
});
// Handling form submissions (requires JSON middleware)
app.post("/submit", (req, res) => {
  const { name, email } = req.body;
  res.send(`Form submitted: Name - ${name}, Email - ${email}`);
});
// Example 4: Error-handling middleware (always placed last)
app.use((err, req, res, next) => {
  console.error("Error occurred:", err.message);
  res.status(500).send("Something went wrong!");
});

//start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));

// Test the routes:

// Visit http://localhost:8082/ to see the home page.
// Visit http://localhost:8082/dashboard to see the dashboard (authenticated).
// Submit a POST request to http://localhost:8082/submit with JSON data (e.g., using Postman).
