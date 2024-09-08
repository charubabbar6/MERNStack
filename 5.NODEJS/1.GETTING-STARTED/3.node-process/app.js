//analyzing process
//console.log(process);
//analyzing process

//Loading the os module:
const os = require("os");
// os module can be used to get system-related information
console.log(`Platform: ${os.platform()}`);
console.log(`Architecture: ${os.arch()}`);
console.log(`Total Memory: ${os.totalmem()}`);

//Environment variables
//console.log(process.env);

//Accessing env varibales
const appEnv = process.env.APP_ENV || "development";

//Display the env
//console.log(`Our Node App is running in  ${appEnv}`);

//setting the env
// add this command in terminal tochange enviornment to production:
//$env:APP_ENV="production"; node app.js

//! process.exit()
// Check the current environment using the 'NODE_ENV' environment variable
//console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== "production") {
  //Display some error
  //console.log("This script should only run in production");
  //Exit the process
  //process.exit();
}

//?`process.cwd()` and `process.chdir(directory)

//Log the current working directory of the process
console.log(`Current working directory ${process.cwd()}`);

try {
  //change the current working directory
  process.chdir(
    "C:\\web-dev\\5.NODEJS\\1.GETTING-STARTED\\3.node-process\\tmp"
  );
  // Log the new current working directory after the change
  console.log(`The new working directory is ${process.cwd()}`);
} catch (error) {
  //Log any error that might occur during the directory change
  console.log(`Something happpened: ${error}`);
}
const sandwich = "Ham and Cheese";
const drink = "Lemonade";

// Named exports using the exports shortcut
exports.sandwich = sandwich;
