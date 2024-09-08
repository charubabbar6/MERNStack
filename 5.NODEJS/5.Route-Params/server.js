//access application using following url:http://localhost:3000/products/:123/:phone and start server using "node server" in terminal and stop server by"Ctrl+c"
//1.Import required modules
const http = require("http");
const url = require("url");
//2. Define the handler
const requestHandler = (req, res) => {
  //pass the url
  const passedUrl = url.parse(req.url, true);
  const pathname = passedUrl.pathname;
  console.log(pathname);
  //split the pathname
  const pathComponent = pathname.split("/").filter(Boolean); //If pathname is /products/123/phone, then pathname.split("/") will produce the array ['', 'products', '123', 'phone'].filter(Boolean) filters out any falsy values from the array. In this context, Boolean is used as a callback function to remove any empty strings from the array.
  console.log(pathComponent);

  if (pathComponent[0] === "products" && pathComponent[1] && pathComponent[2]) {
    //Take the product and send to the user
    //perform db query
    const productId = pathComponent[1];
    const productName = pathComponent[2];
    //send to the user
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Product ID ${productId} Product Name ${productName}`);
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Not Found`);
  }
};
//3. Create the server
const server = http.createServer(requestHandler);

//4. Start our server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
