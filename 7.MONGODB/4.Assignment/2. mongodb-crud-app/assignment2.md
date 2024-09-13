Assignment: Dynamic Web Application Development: Rendering Assets with EJS in Express
Create a Node.js application that connects to a MongoDB Atlas database. Implement CRUD operations and ensure data is retrieved and stored efficiently. Use MongoDB drivers for database interactions

Question 1: Initializing a Node.js Project with Express.js and EJS
Research Topics: Node.js project initialization, npm usage, Express.js and EJS installation, setting up a server.

Practical Application: Create a small project following these steps. Document the process, highlighting any issues encountered and how you resolved them.
……………………………………………………………………………
To start, let’s set up a basic Node.js application with express and ejs.

1. Initialize Node.js Project: Open a terminal, create a new directory for your project, and run the following commands:
   “mkdir dynamic-web-app
   cd dynamic-web-app
   npm init -y”
   This initializes a new Node.js project with a package.json file.
2. Install Required Packages: Install Express.js for handling routes and requests, and EJS for templating.
   “npm i express ejs”
3. Set Up Basic Server: In the project root, create a file server.js with the following code to set up the Express.js server:
   “const express = require('express');
   const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Basic route
app.get('/', (req, res) => {
res.render(server, { title: 'Home Page' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});” 4. Create EJS Template: Inside the project, create a views folder and add an index.ejs file:
“mkdir views”
In views/server.ejs:
“<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
</head>
<body>
    <h1>Welcome to <%= title %></h1>
</body>
</html>”
5.	Run the Application: In the terminal, run:
“node server”
Visit http://localhost:3000/ to see the EJS-rendered page.
Issues Encountered:
•	Initially, I forgot to set the view engine to EJS in the Express configuration. This caused an error when rendering the template. Setting the view engine resolved it.

…………………………………………………………………………………

Question 2: Serving Static Assets in Express.js
Research Topics: Static asset management in Express.js, middleware functionality.

Practical Application: Set up a sample Express.js application and create a 'public' directory. Add some CSS and JavaScript files and demonstrate how they can be accessed from the browser.
……………………………………………………………………………………

1. Create Public Directory: Inside the project, create a public directory:
   “mkdir public”
2. Add CSS and JavaScript Files: Inside the public directory, create style.css and script.js:
   /_ public/style.css _/
   body {
   background-color: #f4f4f4;
   font-family: Arial, sans-serif;
   }
   h1 {
   color: #333;
   }
   // public/script.js
   console.log('JavaScript is loaded!');
3. Serve Static Files: Modify server.js to serve static assets:
   app.use(express.static('public'));
4. Link Static Assets in EJS: In views/index.ejs, link the CSS and JS files:
<head>
    <link rel="stylesheet" href="/style.css">
</head>
<body>
    <script src="/script.js"></script>
<body>
5. Test: Reload the browser at http://localhost:3000/. The CSS will style the page, and the console will show the message from script.js.

………………………………………………………………………………………..
Question 3: Passing Data to EJS Templates
Research Topics: Server-to-template data transfer, EJS syntax and usage.

Practical Application: Develop a simple Express route that passes different types of data (strings, numbers, objects) to an EJS template. Show how this data is accessed and displayed in the EJS file.
…………………………………………………………………………………………………………………………………….

1. Modify Route to Pass Data: In server.js, update the route to pass different data types:
   app.get('/', (req, res) => {
   const data = {
   title: 'Home Page',
   message: 'This is a my assignment.',
   number: 42,
   user: { name: 'Charu Babbar, age: 28 },
   };
   res.render(“server”, data);
   });
2. Update EJS Template to Display Data: In views/index.ejs, update it to display different types of data:
<body>
    <h1><%= message %></h1>
    <p>The number is: <%= number %></p>
    <p>User: <%= user.name %> (Age: <%= user.age %>)</p>
</body>
3. Test: Reload the browser to see the data displayed. The string, number, and object properties should be rendered.
   …………………………………………………………………………………………………………………………………….

Question 4: Routing and Rendering EJS Templates
Research Topics: Express.js routing, EJS rendering.

Practical Application: Create several routes in an Express application that render different EJS templates. Describe how you would organize your routes and templates for a scalable application.
…………………………………………………………………………………………………………………………………….

1. Create New EJS Templates: Inside views, create about.ejs and contact.ejs:
   <!-- views/about.ejs -->
   <h1>About Us</h1>
   <p>I’m a Full stack Java developer !</p>
   <!-- views/contact.ejs --> <h1>Contact Us</h1> <p>Email: charubabbar6@gmail.com</p>
2. Define New Routes in Express: Update server.js to include new routes for /about and /contact:
   app.get('/about', (req, res) => {
   res.render('about');
   });

app.get('/contact', (req, res) => {
res.render('contact');
}); 3. Test: Navigate to http://localhost:3000/about and http://localhost:3000/contact to see the respective pages rendered.

Scalability Consideration:
• Use a dedicated routes directory and create route modules for larger applications.
• routes/
home.js
about.js

…………………………………………………………………………………………………………………………………….

Question 5: Significance of the 'Views' Folder in Express.js
Research Topics: Express.js application structure, EJS file organization.

Practical Application: Explain the standard structure of an Express.js application using EJS. Optionally, demonstrate changing the default 'views' directory and discuss how and why you might do this.
…………………………………………………………………………………………………………………………………….
By default, Express.js looks for templates in the views folder. However, you can change this if necessary.

1. Change Default Views Directory: In server.js, change the default directory for views:
   app.set('views', './templates');
2. Create the templates Folder: Rename the views folder to templates:
   mv views templates
3. Test: Run the application again to ensure it still works. Express will now look for EJS templates inside the templates directory.
   Custom project structures may require organizing templates differently. Changing the default directory allows more flexibility.
   …………………………………………………………………………………………………………………………………….

General Tips:
Documentation: Keep a record of all the steps you follow, including any commands used.

Testing: After implementing each feature, test it thoroughly to ensure it works as expected.

Reflection: After completing the tasks, reflect on what you learned and how you might apply these skills in a real-world project.
…………………………………………………………………………………………………………………………………….
Throughout this assignment, I gained a deep understanding of how Express.js handles server requests, EJS for templating, and MongoDB for managing data. Integrating MongoDB Atlas was straightforward once security settings were properly configured. The use of EJS provided flexibility in rendering dynamic content. This setup would be highly useful in developing real-world web applications requiring a combination of server-side rendering and dynamic content delivery.

…………………………………………………………………………………………………………………………………….

Questions for this assignment

1. Assignment Instructions:

Set up MongoDB Atlas:

Create a free MongoDB Atlas account.

Set up a new cluster and configure it for your application.

Ensure proper security settings and IP whitelisting.

Develop a Node.js Application:

Initialize a new Node.js project.

Install necessary npm packages, including MongoDB drivers.

Database Operations:

Implement CRUD (Create, Read, Update, Delete) operations in your application.

Connect your application to the MongoDB Atlas cluster using the MongoDB drivers.
