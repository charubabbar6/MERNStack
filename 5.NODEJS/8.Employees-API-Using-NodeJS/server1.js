// GET /employees: Reads from the file and sends the list of employees.
//http://localhost:3000/employees
// GET /employees/:id: Searches for a specific employee by ID.
//http://localhost:3000/employees/1.
// POST /employees: Adds a new employee to the array and writes the updated array to the file.
//http://localhost:3000/employees
//{
//     "id": 5,
//     "name": "Sushant"
//   }
const http = require("http");
const fs = require("fs");
const path = require("path");

// File path for storing employee data
const filePath = path.join(__dirname, "employees.json");

// Function to initialize the file with an empty array if it does not exist
const initializeFile = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
};

// Function to read employees from file
const readEmployeesFromFile = () => {
  initializeFile(); // Ensure file exists
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Function to write employees to file
const writeEmployeesToFile = (employees) => {
  fs.writeFileSync(filePath, JSON.stringify(employees, null, 2));
};

// Define the handler
const requestHandler = (req, res) => {
  const { method, url } = req;
  const parts = url.split("/");
  const id = parts[2];

  // Read employees from file
  let employees = readEmployeesFromFile();

  // Handle GET request for all employees
  if (method === "GET" && url === "/employees") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(employees));
  }
  // Handle GET request for a single employee
  else if (method === "GET" && parts[1] === "employees" && id) {
    const employee = employees.find((emp) => emp.id === parseInt(id));
    if (employee) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(employee));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Employee not found" }));
    }
  }
  // Handle POST request to create a new employee
  else if (method === "POST" && url === "/employees") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const newEmployee = JSON.parse(body);
      employees.push(newEmployee);
      writeEmployeesToFile(employees); // Write updated employees to file
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ newEmployee, employees }));
    });
  }
  // Handle unknown routes
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};

// Create the server
const server = http.createServer(requestHandler);

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
