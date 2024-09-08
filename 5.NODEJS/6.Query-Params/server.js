//http://localhost:3000?name=John&age=30
//1.Import required modules
const http = require("http");
const url = require("url");
//2. Define the handler
const requestHandler = (req, res) => {
  //pass the url
  const passedUrl = url.parse(req.url, true);
  //Extract query
  const queryParameters = passedUrl.query;
  console.log(queryParameters);
  res.writeHead(200, { "Content-Type": "text/plain" });

  res.end(`Welcome Query Parameters: ${JSON.stringify(queryParameters)}`);
};
//3. Create the server
const server = http.createServer(requestHandler);

//4. Start our server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
