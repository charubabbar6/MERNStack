// Select the parent unordered list (ul) element
const list = document.getElementById("fruitsList");

// Select the list item you want to remove
const itemToRemove = list.children[1]; // This refers to the second item, "Banana"

// Remove the selected list item
list.removeChild(itemToRemove);

// Select the parent div element
const contentDiv = document.getElementById("content");

// Select the paragraph you want to remove
const paragraphToRemove = contentDiv.children[1]; // This refers to the "Second paragraph"

// Remove the selected paragraph
contentDiv.removeChild(paragraphToRemove);

// Select the gallery div
const gallery = document.getElementById("gallery");

// Select the image you want to remove
const imageToRemove = gallery.children[1]; // This refers to the second image (image2.jpg)

// Remove the selected image
gallery.removeChild(imageToRemove);

// Select the parent div element
const container = document.getElementById("container");

// Remove the last child element
container.removeChild(container.lastElementChild);
