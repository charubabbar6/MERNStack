const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./mydatabase.db");

// Query data from users table
db.serialize(() => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error("Error fetching data:", err);
      return;
    }
    console.log("Users:", rows);
  });
});

// Query data from tasks table
db.all("SELECT * FROM tasks", (err, rows) => {
  if (err) {
    console.error("Error fetching data:", err);
    return;
  }
  console.log("Tasks:", rows);
});

// Close the database
db.close();
