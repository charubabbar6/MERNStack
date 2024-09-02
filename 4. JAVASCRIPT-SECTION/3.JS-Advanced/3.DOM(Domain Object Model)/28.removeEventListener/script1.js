// Select the buttons
const clickButton = document.getElementById("clickButton");
const removeListenerButton = document.getElementById("removeListener");

// Define the function that will handle the click event
function handleClick() {
  alert("Button clicked!");
}
// Add the click event listener to the button
clickButton.addEventListener("click", handleClick);

// Add an event listener to the "Remove Click Event" button
removeListenerButton.addEventListener("click", () => {
  // Remove the click event listener from the clickButton
  clickButton.removeEventListener("click", handleClick);
  alert("Click event listener removed.");
});

//-------------
// The object that will be the context (`this`) inside the event handler
//myObject: This object contains a method handleClick, which is the event handler.
const myObject = {
  name: "My Object",
  handleClick: function (event) {
    console.log(`Button clicked! This is: ${this.name}`);
  },
};

// Get the button element
const button = document.getElementById("myButton");

// Bind the context of `myObject` to the handleClick function
//Binding Context: We use bind to bind the myObject context to the handleClick function. This ensures that this inside handleClick refers to myObject.
const boundClickHandler = myObject.handleClick.bind(myObject);

// Add the event listener
//Adding the Event Listener: We add the event listener using button.addEventListener('click', boundClickHandler);, where boundClickHandler is the result of myObject.handleClick.bind(myObject).
button.addEventListener("click", boundClickHandler);
// Function to remove the event listener
//Removing the Event Listener: To remove the event listener, we use button.removeEventListener('click', boundClickHandler);. It's crucial that boundClickHandler is the exact same function reference used in addEventListener, which is why we store it in a variable.
function removeClickListener() {
  // Use the exact same reference when removing the event listener
  button.removeEventListener("click", boundClickHandler);
  console.log("Event listener removed.");
}

// Remove the event listener after 5 seconds
//After 5 seconds, the removeClickListener function is called, which removes the event listener from the button, preventing the handler from being executed on future clicks.
setTimeout(removeClickListener, 5000);
