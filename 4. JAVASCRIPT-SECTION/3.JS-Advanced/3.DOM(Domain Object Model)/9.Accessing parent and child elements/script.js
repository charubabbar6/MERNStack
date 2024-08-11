//Accessing Parent Elements

const parentEl = document.getElementById("parent");
//console.log(parentEl);

//Accessing the grandparent element
const grandparentEl = parentEl.parentElement;
//console.log(grandparentEl);

//Accessing Child Elements
const firstChildEl = parentEl.firstChild;
console.log(firstChildEl);

const lastChildEl = parentEl.lastChild;
console.log(lastChildEl);

// Accessing Element Children Only
const firstElmentChild = parentEl.firstElementChild;
console.log(firstElmentChild);
const lastElementChild = parentEl.lastElementChild;
console.log(lastElementChild);
