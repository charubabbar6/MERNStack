//1. process.exit

console.log("Starting process...");

if (true) {
  //console.log("Exiting with code 0");
  //process.exit(0); // Success
}

// This line won't be executed since the process exited above
//console.log("This will never be logged");

//2.process.cwd()

//console.log("Current working directory:", process.cwd());

//3. process.env
//console.log("NODE_ENV:", process.env.NODE_ENV); // Commonly used environment variable
//console.log("All environment variables:", process.env);

//4. process.argv
//console.log("Command-line arguments:", process.argv); //node app.js arg1 arg2
//5. process.on(event, listener)
// process.on("exit", (code) => {
//   console.log(`About to exit with code: ${code}`);
// });

// console.log("This is the last line before exit");
//6. process.stdin / process.stdout / process.stderr
// console.log("Enter your name:");

// process.stdin.on("data", (data) => {
//   console.log(`Hello, ${data.toString().trim()}!`);
//   process.exit(); // Exit after input
// });
//7. process.uptime()
// setTimeout(() => {
//   console.log("Process uptime:", process.uptime(), "seconds");
// }, 2000);
//8. process.memoryUsage()
//console.log("Memory usage:", process.memoryUsage());
//9. process.nextTick(callback)
// console.log("Before nextTick");

// process.nextTick(() => {
//   console.log("Inside nextTick callback");
// });

// console.log("After nextTick");
//10.process.kill(pid,[signal])
//the default signal is SIGTERM, which requests the process to terminate gracefully.
//SIGTERM: Terminate (default if no signal is specified).
// SIGKILL: Forcefully terminate the process (cannot be caught or ignored).
// SIGINT: Interrupt (similar to pressing Ctrl+C).
// SIGHUP: Hangup (used to reload configuration)
// const pid = 1234; // Replace with the actual PID you want to signal

// process.kill(pid, "SIGTERM");
// console.log(`Sent SIGTERM to process ${pid}`);

// const pid = 1234; // Replace with the actual PID you want to signal

// process.kill(pid, 'SIGKILL');
// console.log(`Sent SIGKILL to process ${pid}`);

// process.on('SIGTERM', () => {
//     console.log('SIGTERM signal received.');
//     process.exit(); // Perform cleanup and exit
// });

// process.on('SIGINT', () => {
//     console.log('SIGINT signal received.');
//     process.exit(); // Perform cleanup and exit
// });

// console.log('Process is running. PID:', process.pid);

//11.process.hrtime
//1. Measuring Time Intervals
// const start = process.hrtime();

// // Simulate some work
// setTimeout(() => {
//   const [seconds, nanoseconds] = process.hrtime(start);
//   const elapsedMilliseconds = seconds * 1000 + nanoseconds / 1e6;
//   console.log(`Elapsed time: ${elapsedMilliseconds.toFixed(3)} ms`);
// }, 1000); // Simulate 1 second of work

//2. Getting Current High-Resolution Time
// const [seconds, nanoseconds] = process.hrtime();
// console.log(`Current time: ${seconds}s ${nanoseconds}ns`);
// //3.Measuring Time Difference
// const start = process.hrtime();

// // Simulate some work
// setTimeout(() => {
//   const end = process.hrtime(start);
//   console.log(`Time taken: ${end[0]} seconds and ${end[1]} nanoseconds`);
// }, 500); // Simulate 0.5 seconds of work

//12.process.chdir
//1. Changing the Working Directory
// const fs = require("fs");
// const path = require("path");

// const newDir = path.resolve(
//   "C:\\web-dev\\5.NODEJS\\1.GETTING-STARTED\\3.node-process\\some-existing-directory"
// );

// if (fs.existsSync(newDir)) {
//   process.chdir(newDir);
//   console.log("Changed directory to:", process.cwd());
// } else {
//   console.error("Directory does not exist:", newDir);
// }
//2. Using Relative Paths
const fs = require("fs");
const path = require("path");

// Print the current working directory
console.log("Current directory:", process.cwd());

const subdirectory = "subdirectory"; // Name of the directory to change to
const newDir = path.join(process.cwd(), subdirectory); // Create the full path

// Check if the directory exists before attempting to change
if (fs.existsSync(newDir)) {
  try {
    process.chdir(newDir);
    console.log("Directory changed to:", process.cwd());
  } catch (err) {
    console.error("Error changing directory:", err);
  }
} else {
  console.error("Directory does not exist:", newDir);
}
