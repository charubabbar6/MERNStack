//---ways of exporting modules in csjs---
//!Single Function Export
//! Object export
//! Named function export
//! using export shorthand

//?Single Function Export
const firstname = "Charu";
const greet = (name) => {
  return `Hello ${name}`;
};
//Expose this file
//module.exports = firstname;
//module.exports = greet;

//?---Object export---

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}

// module.exports = {
//   subtract,
//   add,
// };

//! Named function export
module.exports.sayHi = (name) => {
  return `Hi ${name}`;
};

module.exports.sayBye = function (name) {
  return `Goodbye ${name}`;
};

//! using export shorthand
exports.sayHello = (name) => {
  return `Hi ${name}`;
};

exports.sayGoodBye = function (name) {
  return `Goodbye ${name}`;
};
