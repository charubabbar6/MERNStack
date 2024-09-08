//!Default Export
import greet from "./utills.mjs";
console.log("Default Export");

console.log(greet("Charu"));

//!Name Export
import { add, subtract } from "./utills.mjs";
console.log("Name Export");
console.log(add(10, 5));
console.log(subtract(10, 5));

//!//!Mixed Export(Default + Named)
import greeting, { subtraction, addition } from "./utills.mjs";
console.log("Mixed Export");
console.log(greeting("Arjun"));
console.log(subtraction(100, 60));
console.log(addition(100, 60));

//!Import everything----

import * as utill from "./utills.mjs";
console.log("import everything");
console.log(utill.default("Arjun"));

console.log(utill.add(10, 50));
console.log(utill.subtract(10, 50));

console.log(utill.subtraction(100, 60));
console.log(utill.addition(100, 60));
