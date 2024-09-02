//Event flow has following phases: 1. capturing(root to target) 2. Target(target :like some click on button,etc.)3. Bubbling(target to root)
// Add event listener to the div

document.getElementById("parentDiv").addEventListener(
  "click",
  function (event) {
    alert("div clicked Event Phase" + event.eventPhase);
  },
  true
); //Capturing //true is capturing pahse by default it's false.

//Add event listener to the ul
document.getElementById("list").addEventListener(
  "click",
  function (event) {
    alert("list clicked Event Phase" + event.eventPhase);
  },
  true
); //Capturing

//Add event listener to the li
document.getElementById("item1").addEventListener(
  "click",
  function (event) {
    alert("Item 1 clicked! Event Phase" + event.eventPhase);
  },
  false
); //Bubbling phase
document.getElementById("item2").addEventListener(
  "click",
  function (event) {
    alert("Item 2 clicked! Event Phase" + event.eventPhase);
  },
  false
); //Bubbling phase
