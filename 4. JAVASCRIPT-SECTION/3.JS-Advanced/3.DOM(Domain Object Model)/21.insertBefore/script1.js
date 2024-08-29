// Select the ordered list
const list = document.getElementById("fruitsList");
// Create a new list item element
const newItem = document.createElement("li");
newItem.textContent = "Blueberry";
//list.append(newItem);
// Select the item before which you want to insert the new item
const referenceItem = list.children[1]; // This refers to the second item, "Banana"
// Insert the new item before the reference item
list.insertBefore(newItem, referenceItem);
console.log(list);

// Select the parent div
const contentDiv = document.getElementById("content");

// Create a new paragraph element
const newParagraph = document.createElement("p");
newParagraph.textContent = "Inserted paragraph";

// Select the reference paragraph before which the new paragraph will be inserted
const secondParagraph = contentDiv.children[1]; // This refers to "Second paragraph"

// Insert the new paragraph before the second paragraph
contentDiv.insertBefore(newParagraph, secondParagraph);
