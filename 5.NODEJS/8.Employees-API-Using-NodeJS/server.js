//http://localhost:3000/employees
//1.Import required modules
const http = require("http");
//mimic (database)
const employees = [
  { id: 1, name: "Charu" },
  { id: 2, name: "Arjun" },
];
//2. Define the handler
const requestHandler = (req, res) => {
  // Destructure method and url from the request object
  const { method, url } = req;
  const parts = url.split("/");
  //console.log(parts);//[ '', 'employees', '101' ]
  const id = parts[2];
  //!Get all employees
  if (method === "GET" && url === "/employees") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(employees));
  }
  //!Get single employee
  //http://localhost:3000/employees/1

  //     employees.find(): Searches through the employees array for the first element that meets the condition provided by the arrow function.
  // Arrow Function: (emp) => emp.id === parseInt(id) is used to compare each employee’s id with the ID you’re looking for.
  // parseInt(id): Converts the id from a string to an integer for comparison.
  //Searches for the first element in the array
  else if (method === "GET" && parts[1] === "employees" && id) {
    const employee = employees.find((emp) => emp.id === parseInt(id));
    if (employee) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(employee));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Employee not found" }));
    }
  }
  //! Create new employee
  else if (method === "POST" && url === "/employees") {
    let body = "";
    //Listen to the event of making post reques
    req.on("data", (chunk) => {
      body += chunk;
    });
    //Send the response
    req.on("end", () => {
      const newEmployee = JSON.parse(body);
      employees.push(newEmployee);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ newEmployee, employees }));
    });
  }
};
//3. Create the server
const server = http.createServer(requestHandler);

//4. Start our server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
