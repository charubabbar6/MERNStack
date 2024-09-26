// Import necessary React hooks and components
import React, { createContext, useContext, useState } from "react";
import "./App.css"; // Importing external CSS for styling

// Create a context to hold the count state and updater functions
// CountContext will be used to share the state between components
const CountContext = createContext();

// Define the CountProvider component that will wrap parts of the app where
// the count state is needed
function CountProvider({ children }) {
  // Create a piece of state called 'count' and a function 'setCount' to update it
  const [count, setCount] = useState(0);

  // Function to increment the count by 1
  const increment = () => setCount(count + 1);

  // Function to decrement the count by 1
  const decrement = () => setCount(count - 1);

  // Provide the count state, increment, and decrement functions to child components
  return (
    <CountContext.Provider value={{ count, increment, decrement }}>
      {children}{" "}
      {/* Render any child components that are wrapped within this provider */}
    </CountContext.Provider>
  );
}

// Custom hook to use the CountContext and access count, increment, and decrement
function useCount() {
  // Extract the context value which contains count, increment, and decrement
  const context = useContext(CountContext);
  return context; // Return the context to be used by components
}

// Define the Counter component
// This component displays the current count and buttons to increment/decrement
const Counter = () => {
  // Destructure the count, increment, and decrement values from the useCount hook
  const { count, increment, decrement } = useCount();

  return (
    <div className="counter-container">
      {/* Display the current count */}
      <h1> {count}</h1>
      {/* Button to increment the count */}
      <button className="button" onClick={increment}>
        +
      </button>
      {/* Button to decrement the count */}
      <button className="button" onClick={decrement}>
        -
      </button>
    </div>
  );
};

// Main App component that wraps everything together
const App = () => {
  return (
    <div className="app-container">
      {/* Main title of the application */}
      <h1 className="title">React Counter</h1>
      {/* Description of the app */}
      <p className="sub-description">
        A simple counter application using Context API
      </p>
      {/* Wrap the Counter component with the CountProvider 
          to provide the count state and functions */}
      <CountProvider>
        <Counter />
      </CountProvider>
    </div>
  );
};

export default App;
