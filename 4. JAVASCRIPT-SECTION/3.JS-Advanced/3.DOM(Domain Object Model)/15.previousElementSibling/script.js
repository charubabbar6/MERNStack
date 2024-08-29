// Select the list element with id "cherry"
const cherryEl = document.getElementById("cherry");
console.log(cherryEl);

// Select the previous sibling element of "cherry" (should be "banana")
const previousFruitEl = cherryEl.previousElementSibling;
console.log(previousFruitEl);

// Select the next sibling element of "cherry" (should be "date")
const nextFruit = cherryEl.nextElementSibling;

console.log(nextFruit);
