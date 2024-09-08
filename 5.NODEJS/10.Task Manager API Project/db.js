const sqlite3 = require("sqlite3").verbose();
//const db = new sqlite3.Database(":memory:");
// Create or open a database file (persistent)
const db = new sqlite3.Database("./mydatabase.db", (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to the SQLite database.");
  }
});
// Create tables
// Initialize users and tasks tables
db.serialize(() => {
  // Create users table if it doesn't exist
  db.run(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating users table:", err);
      }
    }
  );

  // Create tasks table if it doesn't exist
  db.run(
    `
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT,
      description TEXT,
      status TEXT,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating tasks table:", err);
      }
    }
  );
});

module.exports = db;
