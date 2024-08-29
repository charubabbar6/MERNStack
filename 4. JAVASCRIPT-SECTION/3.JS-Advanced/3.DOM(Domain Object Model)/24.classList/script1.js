// Select the button element
const toggleButtonn = document.getElementById("toggleDarkMode");
// Add an event listener to the button
toggleButtonn.addEventListener("click", () => {
  // Toggle the 'dark-mode' class on the body element
  document.body.classList.toggle("dark-mode");
});

// Select the input element
const nameInput = document.getElementById("nameInput");

// Add an event listener to add the 'highlight' class when the input is focused
nameInput.addEventListener("focus", () => {
  nameInput.classList.add("highlight");
});

// Add an event listener to remove the 'highlight' class when the input loses focus
nameInput.addEventListener("blur", () => {
  nameInput.classList.remove("highlight");
});

// Select the button and the content div
const toggleButton = document.getElementById("toggleVisibility");
const contentDiv = document.getElementById("content");

// Add an event listener to the button
toggleButton.addEventListener("click", () => {
  // Check if the content div has the 'visible' class
  if (contentDiv.classList.contains("visible")) {
    // If it does, remove the 'visible' class and add the 'hidden' class
    contentDiv.classList.remove("visible");
    contentDiv.classList.add("hidden");
    toggleButton.textContent = "Show Content";
  } else {
    // If it doesn't, add the 'visible' class and remove the 'hidden' class
    contentDiv.classList.add("visible");
    contentDiv.classList.remove("hidden");
    toggleButton.textContent = "Hide Content";
  }
});

// Select the button and the box div
const styleButton = document.getElementById("styleButton");
const box = document.getElementById("box");

// Add an event listener to the button
styleButton.addEventListener("click", () => {
  // Toggle multiple classes
  box.classList.toggle("large");
  box.classList.toggle("red");
});
