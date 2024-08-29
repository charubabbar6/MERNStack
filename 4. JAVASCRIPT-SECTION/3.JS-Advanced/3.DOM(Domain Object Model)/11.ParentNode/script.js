//Step 1: Select a list item using data attribute
const selectedItemEl = document.querySelector('[data-item="fruit"]');
console.log(selectedItemEl);
// Step 2: Navigate to the parent <ul> element
const parentListEl = selectedItemEl.parentNode;
console.log(parentListEl);
// Step 3: Navigate to grandparent
const grandparentParentEl = parentListEl.parentNode;
console.log(grandparentParentEl);

// Step 4: Navigate to great- grandparent
const greatGrandParentEl = grandparentParentEl.parentNode;
console.log(greatGrandParentEl);
