//https://nodejs.org/docs/latest-v20.x/api/os.html#os
const os = require("os");

//Returns the operating system CPU architecture
os.arch();
//console.log("CPU Architecture", os.arch());

//Returns an array of objects containing information about each logical CPU core.
os.cpus();
//console.log("CPU info", os.cpus());

//Returns a string identifying the endianness of the CPU for which the Node.js binary was compiled.
os.endianness();
//console.log(os.endianness());

//Returns the amount of free system memory in bytes as an integer.
os.freemem();
//console.log(os.freemem());

//Returns the string path of the current user's home directory.
os.homedir();
//console.log(os.homedir());

//Returns the host name of the operating system as a string.
os.hostname();
//console.log(os.hostname());

//Returns an array containing the 1, 5, and 15 minute load averages.
os.loadavg();
//console.log(os.loadavg());

//Returns an object containing network interfaces that have been assigned a network address.
os.networkInterfaces();
//console.log(os.networkInterfaces());

//Returns a string identifying the operating system platform for which the Node.js binary was compiled.
os.platform();
//console.log(os.platform());

//On Windows, GetVersionExW() is used.
os.release();
//console.log(os.release());

//Returns the total amount of system memory in bytes as an integer.
os.totalmem();

console.log(os.totalmem());
