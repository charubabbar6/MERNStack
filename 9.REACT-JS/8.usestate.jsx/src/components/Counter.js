import React, { useState } from "react";
const Counter = () => {
  //Initialize the counter with default value of 0
  const [counter, setCounter] = useState(0);
  //Increment the counter
  const incrementCounter = () => {
    setCounter(counter + 1);
  };
  //Decrement the counter
  const decrementCounter = () => {
    setCounter(counter - 1);
  };
  const resetCounter = () => {
    setCounter(0);
  };
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Counter: {counter}</h1>
      <button onClick={incrementCounter} style={{ margin: " 0 5px" }}>
        Increment
      </button>
      <button onClick={decrementCounter} style={{ margin: " 0 5px" }}>
        Decrement
      </button>
      <button onClick={resetCounter} style={{ margin: " 0 5px" }}>
        Reset
      </button>
    </div>
  );
};
export default Counter;
