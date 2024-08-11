//Make sure the  elements are loaded

document.addEventListener("DOMContentLoaded", () => {
  //console.log("Loaded");
  //select element
  const counterValue = document.getElementById("counter-value");
  //console.log(counterValue);
  const increaseBtn = document.getElementById("increase-btn");
  //console.log(increaseBtn);
  const decreaseBtn = document.getElementById("decrease-btn");
  //console.log(decreaseBtn);
  const resetBtn = document.getElementById("reset-btn");
  //console.log(resetBtn);

  //Global Value

  let count = 0;

  //add events listener to the button
  increaseBtn.addEventListener("click", () => {
    count++;
    //console.log(count);
    //update the counter value
    //counterValue.textContent = count;
    updatecounter();
  });

  decreaseBtn.addEventListener("click", () => {
    count--;
    //console.log(count);
    //update the counter value
    //counterValue.textContent = count;
    updatecounter();
  });

  resetBtn.addEventListener("click", () => {
    count = 0;
    //console.log(count);
    //counterValue.textContent = count;
    updatecounter();
  });
  //update counter function
  function updatecounter() {
    counterValue.textContent = count;
  }
});
