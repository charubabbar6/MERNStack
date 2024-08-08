// // Currency Converter
// // Objective: Enhance your JavaScript ES6 skills by implementing a functional currency converter. Focus on utilizing arrow functions, let and const for variable declarations, template literals for string manipulation, and object manipulation methods.

// // Task:

// // Create a Converter Function: Write a function named createConverter that takes an object of initial currency rates (compared to a base currency, e.g., USD) as an argument. This function should return an object with two methods: convert and updateRates.

// // Implement Conversion Logic: Inside the returned object, implement the convert method. It should accept three parameters: amount, fromCurrency, and toCurrency. This method will compute and return the amount converted from one currency to another.

// // Rate Update Feature: Implement the updateRates method to update the conversion rates. This method should take an object with currency rates and update the existing rates.

// // Guidelines:

// // Use ES6 features such as arrow functions, let/const for variable declarations, and template literals.

// // Initially, use static data for currency rates. Consider how your implementation could be adapted for dynamic rates from an API in the future.

// // Aim for clean, readable code, and ensure your functions are doing one thing and doing it well.

// //----------------------
// // createConverter function: Initializes the currency converter
// // - initialRates: Object containing initial currency rates relative to a base currency (e.g., USD)

// // TODO: Declare a variable 'rates' to store current currency rates
// function createConverter(initialRates) {
//   // Define the rates variable that will hold the currency rates
//   let rates = { ...initialRates }; //creates a new object rates that contains all properties from the initialRates object.

//   // The function should return an object with two methods: 'convert' and 'updateRates'
//   // Method to convert an amount from one currency to another

//   function convert(amount, fromCurrency, toCurrency) {
//     if (!rates[fromCurrency] || !rates[toCurrency]) {
//       throw new Error("Currency not supported.");
//     }
//     // Convert amount to base currency (assumed as USD here) and then to target currency
//     const amountInBaseCurrency = amount / rates[fromCurrency];
//     return amountInBaseCurrency * rates[toCurrency];
//   }

//   // Method to update the currency rates
//   function updateRates(newRates) {
//     rates = { ...rates, ...newRates };
//   }
//   // 'convert' method: Converts a given amount from one currency to another
//   // - amount: The amount to be converted
//   // - fromCurrency: The currency code of the original amount
//   // - toCurrency: The currency code to which the amount is to be converted
//   // TODO: Write the logic for converting the currency
//   return {
//     convert,
//     updateRates,
//   };
// }
// // Note: Ensure that the conversion handles the scenario where fromCurrency and toCurrency are the same

// //To create a function named createConverter that handles currency conversion and updating rates, you can follow these steps:

// //Define the createConverter Function: This function will accept an object of initial currency rates.
// //Return an Object with convert and updateRates Methods:
// //convert(amount, fromCurrency, toCurrency): Converts an amount from one currency to another using the current rates.
// //updateRates(newRates): Updates the currency rates with new values.
// //Here’s a detailed implementation:

// //javascript
// //Copy code
// function createConverter(initialRates) {
//   // Define the rates variable that will hold the currency rates
//   let rates = { ...initialRates };

//   // Method to convert an amount from one currency to another
//   function convert(amount, fromCurrency, toCurrency) {
//     if (!rates[fromCurrency] || !rates[toCurrency]) {
//       throw new Error("Currency not supported.");
//     }
//     // Convert amount to base currency (assumed as USD here) and then to target currency
//     const amountInBaseCurrency = amount / rates[fromCurrency];
//     return amountInBaseCurrency * rates[toCurrency];
//   }

//   // Method to update the currency rates
//   function updateRates(newRates) {
//     rates = { ...rates, ...newRates };
//   }

//   // Return an object with the convert and updateRates methods
//   return {
//     convert,
//     updateRates,
//   };
// }

// // Example usage:

// // Initial currency rates compared to USD
// const initialRates = {
//   USD: 1,
//   EUR: 0.85,
//   JPY: 110,
// };

// // Create a converter instance with initial rates
// const converter = createConverter(initialRates);
// // Convert 100 USD to EUR
// console.log(converter.convert(100, "USD", "EUR"));

// // 'updateRates' method: Updates the currency conversion rates
// // - newRates: Object containing one or more currency rates to be updated
// // TODO: Write the logic to update the rates with newRates
// // Initial currency rates compared to USD

// // Update rates
// const newRates = {
//   EUR: 0.9, // New rate for EUR
// };
// converter.updateRates(newRates);

// // Convert 100 USD to EUR with updated rates
// console.log(converter.convert(100, "USD", "EUR"));

function createConverter(initialRates) {
  let rates = Object.assign({}, initialRates);

  return {
    convert(amount, fromCurrency, toCurrency) {
      if (fromCurrency === toCurrency) {
        return amount;
      }
      const baseAmount =
        fromCurrency === "USD" ? amount : amount / rates[fromCurrency];
      const convertedAmount =
        toCurrency === "USD" ? baseAmount : baseAmount * rates[toCurrency];
      return convertedAmount;
    },
    updateRates(newRates) {
      rates = Object.assign(rates, newRates);
    },
  };
}
// Define initial currency rates relative to USD
const initialRates = {
  USD: 1,
  EUR: 0.85,
  JPY: 110,
};

// Create a converter instance with initial rates
const converter = createConverter(initialRates);

// Convert 100 USD to EUR
console.log(`100 USD to EUR: ${converter.convert(100, "USD", "EUR")}`);

// Update rates with new values
const newRates = {
  EUR: 0.9, // Updated rate for EUR
};
converter.updateRates(newRates);

// Convert 100 USD to EUR with updated rates
console.log(
  `100 USD to EUR with updated rates: ${converter.convert(100, "USD", "EUR")}`
);
