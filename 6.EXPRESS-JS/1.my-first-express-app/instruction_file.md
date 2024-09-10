in terminal,

1. --->npm init,create the packag.json file
   PS C:\web-dev\6.EXPRESS-JS\1.my-first-express-app> npm init  
   This utility will walk you through creating a package.json file.
   It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (1.my-first-express-app)
version: (1.0.0)
version: (1.0.0)
description: My first express application
entry point: (server.js)
test command:
git repository:
keywords: expressjs,nodejs web
author: charu babbar
license: (ISC)
About to write to C:\web-dev\6.EXPRESS-JS\1.my-first-express-app\package.json:

{
"name": "1.my-first-express-app",
"version": "1.0.0",
"description": "My first express application",
"main": "server.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
description: My first express application
entry point: (server.js)
test command:
git repository:
keywords: expressjs,nodejs web
author: charu babbar
license: (ISC)
About to write to C:\web-dev\6.EXPRESS-JS\1.my-first-express-app\package.json:

{
"name": "1.my-first-express-app",
"version": "1.0.0",
"description": "My first express application",
"main": "server.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "node server.js"
},
entry point: (server.js)
test command:
git repository:
keywords: expressjs,nodejs web
author: charu babbar
license: (ISC)
About to write to C:\web-dev\6.EXPRESS-JS\1.my-first-express-app\package.json:

{
"name": "1.my-first-express-app",
"version": "1.0.0",
"description": "My first express application",
"main": "server.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "node server.js"
},
git repository:
keywords: expressjs,nodejs web
author: charu babbar
license: (ISC)
About to write to C:\web-dev\6.EXPRESS-JS\1.my-first-express-app\package.json:

{
"name": "1.my-first-express-app",
"version": "1.0.0",
"description": "My first express application",
"main": "server.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "node server.js"
},
license: (ISC)
About to write to C:\web-dev\6.EXPRESS-JS\1.my-first-express-app\package.json:

{
"name": "1.my-first-express-app",
"version": "1.0.0",
"description": "My first express application",
"main": "server.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "node server.js"
},
"name": "1.my-first-express-app",
"version": "1.0.0",
"description": "My first express application",
"main": "server.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "node server.js"
},
"main": "server.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "node server.js"
},
"keywords": [
"expressjs",
"nodejs",
"start": "node server.js"
},
"keywords": [
"expressjs",
"nodejs",
"web"
"keywords": [
"expressjs",
"nodejs",
"web"
"nodejs",
"web"
],
"web"
],
],
"author": "charu babbar",
"license": "ISC"
}

Is this OK? (yes)

2.  --->npm i express,create the packag-lock.json file and node_modules folder

C:\web-dev\6.EXPRESS-JS\1.my-first-express-app> npm i express

added 64 packages, and audited 65 packages in 2s

12 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
...................................
In packge.json file:add this to scrips section
"scripts": {
"start": "node server.js"
}
to start server use this command in terminal :"npm run start"
Install nodemon npm by using (https://www.npmjs.com/package/nodemon)

"npm i nodemon -D" in terminal for (development dependancy)as we don't need nodemon in production.
and change in package.json:
"scripts": {
"start": "node server.js",
"server": "nodemon server.js"
},

and now we use command npm run server
..........................
For EJS template, In terminal run this command:
"npm i ejs"
..................
Tags(common EJS syntax)

1. <% 'Scriptlet' tag, for control-flow, no output

2. `<%_` ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it

3. <%= Outputs the value into the template (HTML escaped)

4. <%- Outputs the unescaped value into the template

5. <%# Comment tag, no execution, no output

6. <%% Outputs a literal '<%'

7. %> Plain ending tag

8. -%> Trim-mode ('newline slurp') tag, trims following newline

9. `_%>` ‘Whitespace Slurping’ ending tag, removes all whitespace after it
   ....................
   EJS Template Tags:
10. `<%= variable %>`:Output value,HTML-escaped
11. `<%- variable %>`:Output unescaped value.
12. `<% code %>`:execute javascript ,no output
13. `<%_ code _%>`:same as `<% code %>` strip whitespace
14. `<%# comment %>`:Add non-visible HTML comment.
15. `<%%>`:Output literal `<%`
16. `<% include('file') %>`:include another EJS File (partials)
    .........................
    express ejs layout:
    "npm i express-ejs-layouts" in terminal
