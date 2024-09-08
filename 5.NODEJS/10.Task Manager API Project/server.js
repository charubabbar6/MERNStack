//http://localhost:3000/public/index.html
const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("./db");

const SECRET_KEY = "MySuperSecretKey123!@#456ABCdef";

// Helper function to parse JSON request body
const parseJsonBody = (req, callback) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    try {
      const parsedBody = JSON.parse(body);
      callback(null, parsedBody);
    } catch (err) {
      callback(new Error("Invalid JSON"), null);
    }
  });
};

// Middleware to authenticate JWT tokens
const authenticateJWT = (req, res, callback) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token

  if (!token) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Unauthorized: Token missing" }));
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error("Token verification failed:", err);
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Forbidden: Invalid token" }));
      return;
    }
    callback(user); // Pass user object to callback
  });
};

// Function to generate JWT with expiration
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: "1h" } // Token expires in 1 hour
  );
};

// HTTP Request Handler
const requestHandler = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // User Registration Endpoint
  if (pathname === "/register" && method === "POST") {
    parseJsonBody(req, (err, data) => {
      if (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
        return;
      }

      const { username, password } = data;
      if (!username || !password) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing fields" }));
        return;
      }

      const hashedPassword = bcrypt.hashSync(password, 8);
      db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        function (err) {
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Error registering user" }));
            return;
          }
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ id: this.lastID }));
        }
      );
    });
    return;
  }

  // User Login Endpoint
  if (pathname === "/login" && method === "POST") {
    parseJsonBody(req, (err, data) => {
      if (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
        return;
      }

      const { username, password } = data;
      if (!username || !password) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing fields" }));
        return;
      }

      db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, user) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Error logging in" }));
            return;
          }
          if (!user || !bcrypt.compareSync(password, user.password)) {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid credentials" }));
            return;
          }

          const token = generateToken(user);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ token }));
        }
      );
    });
    return;
  }

  // Task Creation Endpoint
  if (pathname === "/tasks" && method === "POST") {
    authenticateJWT(req, res, (user) => {
      parseJsonBody(req, (err, data) => {
        if (err) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON" }));
          return;
        }

        const { title, description, status } = data;
        if (!title || !description || !status) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Missing fields" }));
          return;
        }

        db.run(
          "INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)",
          [user.id, title, description, status],
          function (err) {
            if (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Error creating task" }));
              return;
            }
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ id: this.lastID }));
          }
        );
      });
    });
    return;
  }

  // Get All Tasks Endpoint
  if (pathname === "/tasks" && method === "GET") {
    authenticateJWT(req, res, (user) => {
      db.all(
        "SELECT * FROM tasks WHERE user_id = ?",
        [user.id],
        (err, rows) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Error fetching tasks" }));
            return;
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(rows));
        }
      );
    });
    return;
  }

  // Update Task Endpoint
  if (pathname.startsWith("/tasks/") && method === "PUT") {
    const taskId = parseInt(pathname.split("/")[2], 10);
    authenticateJWT(req, res, (user) => {
      parseJsonBody(req, (err, data) => {
        if (err) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON" }));
          return;
        }

        const { title, description, status } = data;
        db.run(
          "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?",
          [title, description, status, taskId, user.id],
          function (err) {
            if (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Error updating task" }));
              return;
            }
            if (this.changes === 0) {
              res.writeHead(404, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({ error: "Task not found or not authorized" })
              );
              return;
            }
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Task updated");
          }
        );
      });
    });
    return;
  }

  // Delete Task Endpoint
  if (pathname.startsWith("/tasks/") && method === "DELETE") {
    const taskId = parseInt(pathname.split("/")[2], 10);
    authenticateJWT(req, res, (user) => {
      db.run(
        "DELETE FROM tasks WHERE id = ? AND user_id = ?",
        [taskId, user.id],
        function (err) {
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Error deleting task" }));
            return;
          }
          if (this.changes === 0) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ error: "Task not found or not authorized" })
            );
            return;
          }
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Task deleted");
        }
      );
    });
    return;
  }

  // Serve Static Files from /public
  if (pathname.startsWith("/public/")) {
    const filePath = path.join(__dirname, pathname);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
        return;
      }

      const ext = path.extname(filePath);
      const contentType =
        {
          ".html": "text/html",
          ".css": "text/css",
          ".js": "application/javascript",
        }[ext] || "text/plain";

      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
};

// Create HTTP server
const server = http.createServer(requestHandler);

// Start the server
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
