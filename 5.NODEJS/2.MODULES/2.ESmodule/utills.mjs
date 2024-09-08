//Default Export
//Name Export
//Mixed Export(Default + Named)
//Export everything

//!Default Export
export default function (name) {
  return `Hello ${name}`;
}

//!Name Export

export function add(a, b) {
  return a + b;
}
export function subtract(a, b) {
  return a - b;
}

//!Mixed Export(Default + Named)

export function subtraction(a, b) {
  return a - b;
}

export function addition(a, b) {
  return a + b;
}
