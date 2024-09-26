//Tradintionally===html page but in react===Component
const App = () => {
  //Basic Syntax
  const element = "Hello World";
  //Embedding Expressions
  const name = "ReactJS Developer";
  const element1 = (
    <h1>
      Hello {name} {2 + 2}
    </h1>
  );
  //JSX as an expression
  const element2 = (
    <div>
      <h1>Hello, world</h1>
      <h2>It is {new Date().toLocaleTimeString()}</h2>
    </div>
  );
  //return element2;
  return (
    <div>
      <h1>Hello, world</h1>
      <h2>It is {new Date().toLocaleTimeString()}</h2>
    </div>
  );
};

export default App;
