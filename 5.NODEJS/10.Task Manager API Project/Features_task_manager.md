Task Manager API Project
Features:

1.  User Authentication:

        Users can register and log in.
        Use JSON Web Tokens (JWT) for secure authentication.

2.  Task Management:

        Users can create, read, update, and delete their own tasks.
        Each task includes a title, description, and status (e.g., "pending" or "completed").

3.  Data Persistence:

            Use SQLite for data storage

    ...........................................................
    a simple Task Manager, implementing user authentication using JWT (JSON Web Token) and managing tasks in a SQLite database. Here's how it works:

Features:
User Registration (/register): Users can sign up with a username and password.
User Login (/login): Users can log in and receive a JWT token.
Task Management:
Create Tasks (POST /tasks): Create new tasks (requires authentication).
Get All Tasks (GET /tasks): Retrieve all tasks for the authenticated user.
Update Task (PUT /tasks/:id): Update a specific task (requires authentication).
Delete Task (DELETE /tasks/:id): Delete a specific task (requires authentication).
Serve Static Files: Serve HTML/CSS/JS files from a /public/ directory.
..............................................................

Step-by-Step Implementation:

1. Initialize the Project:
   C:\web-dev\5.NODEJS\10.Task Manager API Project> npm init -y

2.Install Dependencies:
npm install sqlite3 jsonwebtoken bcryptjs body-parser
npm install http url fs path jsonwebtoken bcryptjs sqlite3

sqlite3: SQLite database.
jsonwebtoken: JWT for authentication.
bcryptjs: Password hashing.
body-parser: Middleware to parse request bodies.

3. Create the Database Schema
   Create a file named db.js to handle SQLite database connections and schema setup.

4. Understanding the Code Structure
   Authentication:

JWT tokens are generated during login and required for accessing task routes.
The authenticateJWT function checks if the token is valid before proceeding.
Task Management:

Tasks are associated with the logged-in user (using the user_id).
CRUD operations for tasks include creating, reading, updating, and deleting tasks.
Static Files:

Serve static files (e.g., HTML, CSS, JS) from the /public/ directory.

5. Test API Using Postman
   -Register User (POST /register):

json:
{
"username": "testuser",
"password": "password123"
}

-Login User (POST /login):

json:
{
"username": "testuser",
"password": "password123"
}
You will receive a JWT token which you should use in the Authorization header for future requests:
json:
{
"token": "your-jwt-token"
}
Create a Task (POST /tasks): Include the JWT token in the Authorization header.

json:
{
"title": "New Task",
"description": "Complete assignment",
"status": "pending"
}
et Tasks (GET /tasks): Fetch all tasks for the authenticated user.

Update Task (PUT /tasks/:id): Update a specific task by ID.

Delete Task (DELETE /tasks/:id): Delete a specific task by ID.

6. Build the Server
   Create a file named server.js for the main server logic.

7. Improvements
   Add input validation (e.g., for task creation).
   Store tokens securely (e.g., in cookies or local storage).
   Handle file uploads (e.g., task attachments).

8. Run the Project
   -Install dependencies: npm install
   -Start the server:npm start
   .....................................................
9. Manually choose a random string:
   You can manually choose a long, complex string (32 characters or more), including numbers, uppercase and lowercase letters, and special characters.

javascript
Copy code
const SECRET_KEY = "MySuperSecretKey123!@#456ABCdef"; 2. Use a random key generator:
You can use tools like Node.js crypto module to generate a secret key.

To generate a random key:

bash
Copy code
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
This will generate a secure 64-byte hexadecimal string, which you can use as the secret key.

Example output:

bash
Copy code
"5f08c589bada0fe78d5d5ef7b9dc8812327c6f8cbf5a5f8d834d8273e3a7f715"
Then update your code:

javascript
Copy code
const SECRET_KEY = "5f08c589bada0fe78d5d5ef7b9dc8812327c6f8cbf5a5f8d834d8273e3a7f715"; 3. Environment Variables (Recommended for Production):
For security reasons, especially in production, you should not hard-code the secret key in your source code. Instead, use environment variables.

First, create a .env file in your project root directory:

bash
Copy code
SECRET_KEY=MySuperSecretKey123!@#456ABCdef
Then, install the dotenv package to load the .env file:

bash
Copy code
npm install dotenv
In your server.js file, load the environment variables like this:

javascript
Copy code
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
This way, your secret key stays outside your codebase and is loaded securely from the environment.

Summary
For local development: You can hard-code a strong secret key.
For production: Use environment variables to securely store the secret key.
......................................................
node server.js:

1. Register a user:
   In postman :Post
   http://localhost:3000/register
   body(json):{
   "username": "testuser",
   "password": "password123"
   }
2. Login a user:POST http://localhost:3000/login
   body(json):{
   "username": "testuser",
   "password": "password123"
   }
   Response will give you a JWT token:
   json
   Copy code
   {
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImlhdCI6MTcyNTcyMTA2MX0.QVOzAnrYjBN3RUdhjNKLF31TmsdzfOo65w9tQ8X12dM"
   }
3. Create a Task:
   POST http://localhost:3000/tasks
   {
   "title": "New Task",
   "description": "Complete assignment",
   "status": "pending"
   }

4. Get All Tasks:
   Endpoint: GET http://localhost:3000/tasks
   Authorization: Add the JWT token in the Authorization Header as Bearer <token>
