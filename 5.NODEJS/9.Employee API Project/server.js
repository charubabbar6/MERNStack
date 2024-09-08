const http = require("http");
const url = require("url");
// In-memory database for demonstration purposes
let employees = [];
const requestHandler = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;
  const queryParameters = parsedUrl.query;
  const pathComponents = pathname.split("/").filter(Boolean);
  // Handle different routes and methods
  if (pathname.startsWith("/employees")) {
    const id = parseInt(pathComponents[1], 10);
    switch (method) {
      case "POST":
        if (pathname === "/employees") {
          // Create a new employee
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString(); // Convert Buffer to string
          });
          req.on("end", () => {
            try {
              const employee = JSON.parse(body);
              if (!employee.id || !employee.name || !employee.position) {
                res.writeHead(400, { "Content-Type": "text/plain" });
                res.end("Missing required fields");
                return;
              }
              employees.push(employee);
              res.writeHead(201, { "Content-Type": "application/json" });
              res.end(JSON.stringify(employee));
            } catch (err) {
              res.writeHead(400, { "Content-Type": "text/plain" });
              res.end("Invalid JSON");
            }
          });
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Not Found");
        }
        break;
      case "GET":
        if (pathname === "/employees") {
          // Get all employees
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(employees));
        } else if (pathComponents.length === 2 && !isNaN(id)) {
          // Get a specific employee by ID
          const employee = employees.find((emp) => emp.id === id);
          if (employee) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(employee));
          } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Employee not found");
          }
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Not Found");
        }
        break;
      case "PUT":
        if (pathComponents.length === 2 && !isNaN(id)) {
          // Update an employee
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString(); // Convert Buffer to string
          });
          req.on("end", () => {
            try {
              const updatedData = JSON.parse(body);
              const index = employees.findIndex((emp) => emp.id === id);
              if (index !== -1) {
                employees[index] = { ...employees[index], ...updatedData };
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(employees[index]));
              } else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Employee not found");
              }
            } catch (err) {
              res.writeHead(400, { "Content-Type": "text/plain" });
              res.end("Invalid JSON");
            }
          });
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Not Found");
        }
        break;
      case "DELETE":
        if (pathComponents.length === 2 && !isNaN(id)) {
          // Delete an employee
          const index = employees.findIndex((emp) => emp.id === id);
          if (index !== -1) {
            employees.splice(index, 1);
            res.writeHead(204); // No Content
            res.end();
          } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Employee not found");
          }
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Not Found");
        }
        break;
      default:
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Method Not Allowed");
        break;
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
};
// Create the server
const server = http.createServer(requestHandler);

// Start our server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
// POST /employees: Adds a new employee. Expects JSON data in the request body.
//http://localhost:3000/employees {"id":1,"name":"John Doe","position":"Developer"}
// GET /employees: Returns all employees.
//http://localhost:3000/employees
// GET /employees/:id: Returns a specific employee by ID.
//http://localhost:3000/employees/1
// PUT /employees/:id: Updates an employee by ID. Expects JSON data in the request body.
//http://localhost:3000/employees/1 {"position":"Senior Developer"}
// DELETE /employees/:id: Deletes an employee by ID.
//http://localhost:3000/employees/3
