const path = require("path");

//! path.basename()
// returns the last portion of a path
const filename = path.basename("\\user\\test\\file.txt");
console.log(filename);

//!path.dirname()
//returns the directory name of a path
const dirname = path.dirname("\\user\\test\\file.txt");
console.log(dirname);

//!path.extname()
//returns the extension of the path
const extname = path.extname("\\user\\test\\file.pdf");
console.log(extname);

//!path.join()
//joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.
const joinedPath = path.join("\\user", "test", "file.txt");
console.log(joinedPath);

//!path.resolve()
//resolves a sequence of paths or path segments into an absolute path.
const absolutePath = path.resolve("text", "file.txt");
console.log(absolutePath);

//!path.isAbsolute()
//determines if path is an absolute path.

const isAbs = path.isAbsolute("//server"); // true
// const isAbs = path.isAbsolute("\\\\server"); // true
// const isAbs = path.isAbsolute("C:/foo/.."); // true
// const isAbs = path.isAbsolute("C:\\foo\\.."); // true
// const isAbs = path.isAbsolute("bar\\baz"); // false
// const isAbs = path.isAbsolute("bar/baz"); // false
// const isAbs = path.isAbsolute("."); // false
console.log(isAbs);

// //!path.parse()
//returns an object whose properties represent significant elements of the path

const parsedPath = path.parse("/users/text/file.txt");
console.log(parsedPath.dir);
console.log(parsedPath.name);
console.log(parsedPath.ext);
