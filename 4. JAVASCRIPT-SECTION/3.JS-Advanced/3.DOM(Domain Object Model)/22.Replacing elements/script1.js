// Select the parent unordered list (ul) element
const list = document.getElementById("fruitsList");
console.log(list);
// Create a new list item element
const newItem = document.createElement("li");
newItem.textContent = "Orange";

// Select the item that you want to replace
const oldItem = list.children[1]; // This refers to the second item, "Banana"
// Replace the old item with the new one
list.replaceChild(newItem, oldItem);

// Select the parent div element
const contentDiv = document.getElementById("content");

// Create a new paragraph element
const newParagraph = document.createElement("p");
newParagraph.textContent = "This is the new second paragraph.";

// Select the paragraph that you want to replace
const oldParagraph = contentDiv.children[1]; // This refers to the "Second paragraph"

// Replace the old paragraph with the new one
contentDiv.replaceChild(newParagraph, oldParagraph);
