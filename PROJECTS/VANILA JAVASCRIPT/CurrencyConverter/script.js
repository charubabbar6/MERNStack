//step1. Initialize feather icons for any elements that need icons
// Initialize Feather icons
// use feather.replace() to Replace placeholder with actual icons
feather.replace();

//step2. Initialize the application by selecting necessary DOM elements
//-select elements for amount input,currency dropdowns,convert button,result display,base currency,get rates button,exchange rates display,mode toggles,and mode sections
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const baseCurrency = document.getElementById("base-currency");
const getRateBtn = document.getElementById("get-rates-btn");
const exchangeRates = document.getElementById("exchange-rates");
const convertMode = document.getElementById("convert-mode");
const exchangeMode = document.getElementById("exchange-mode");
const toggleBtns = document.querySelectorAll(".toggle-btn");
//step3:Define the API key for accessing the ExchangeRate-API
//-Set the apiKey variable to your ExchangeRate-API key
const apiKey = "df1751098f367bef06c463f8";
//step 4: set up event listeners for toggling between conversion and exchange modes
toggleBtns.forEach((button) => {
  //console.log(button);
  // -step 4a: Add click event Listeners to toggle buttons to switch between modes
  button.addEventListener("click", () => {
    toggleBtns.forEach((button) => button.classList.remove("active"));
    button.classList.add("active");
    const mode = button.getAttribute("data-mode");
    //console.log(mode);
    //step 4b:update the UI to reflect the selected mode(conversion or exchange)
    if (mode == "convert") {
      convertMode.classList.add("active");
      exchangeMode.classList.remove("active");
    } else {
      exchangeMode.classList.add("active");
      convertMode.classList.remove("active");
    }
  });
});
// document.querySelectorAll(".toggle-btn").forEach((button) => {
//   button.addEventListener("click", function () {
//     document
//       .querySelectorAll(".toggle-btn")
//       .forEach((btn) => btn.classList.remove("active"));
//     this.classList.add("active");

//     const mode = this.getAttribute("data-mode");
//     document.querySelectorAll(".content").forEach((content) => {
//       content.classList.remove("active");
//     });
//     document.getElementById(mode).classList.add("active");
//   });
// });

//step 5: Implement the currency conversion functionality
//-step 5a: Add a click event listener to the convert button
convertBtn.addEventListener("click", () => {
  //alert("clicked");

  //-step 5b:Get the Amount ,from currency,and tocurrency values from user
  const amount = amountInput.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;
  //console.log(amount);

  //-step 5c:Fetch the conversion rate from the API using the selected currencies
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`)
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .then((data) => {
      //console.log(data);
      //-step 5d:calculate the converted amount and update the result display with the converted value and currency symbol.
      const rate = data.conversion_rate;
      const convertedAmount = (amount * rate).toFixed(2);
      const symbol = getCurrencySymbol(to); // Get the symbol for the target currency
      //console.log(convertedAmount);
      result.innerHTML = `<span class="currency-icon"></span>${symbol}${convertedAmount} ${to}`;
    })
    .catch((error) => {
      //-step 5e:Handle any errors that occur during the API request and provide feedback to the user
      console.log(error);
    });
});
//step 6: Implement the exchnage rates retrieval functionality
// -step 6a: Add a click event listener to the get rates button
// getRateBtn.addEventListener("click", () => {
// -step 6b: Get the base currency from the user
//   const base = baseCurrency.value;
// -step 6c: Fetch the exchange rates from the API based on the selected base currency
//   fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//console.log(data);
// -step 6d: Display the fetched exchange rates in a list format within the exchange rates section
//       let ratesHtml = "<h3>Exchange Rates</h3><ul>";
//       for (const [currency, rate] of Object.entries(data.conversion_rates)) {
// console.log(currency, rate);
//         if (currency != base) {
//           ratesHtml += `<li><span class="currency-icon"></span>${currency}:${rate.toFixed(
//             4
//           )}</li>`;
//         }
//       }
//       ratesHtml += "</ul>";
//       exchangeRates.innerHTML = ratesHtml;
//     })
//     .catch((error) => {
// -step 6e: Handle any errors that occur during the API request and provide feedback to use
//       exchangeRates.textContent = "An error occured .Please try Again.";
//       console.log(error);
//     });

// });

//step 6: Implement the exchange rates retrieval functionality
// -step 6a: Add a click event listener to the get rates button
getRateBtn.addEventListener("click", async () => {
  // Show a loading message or spinner
  exchangeRates.innerHTML = "<p>Loading exchange rates...</p>";

  try {
    // -step 6b: Get the base currency from the user
    const base = baseCurrency.value;

    // -step 6c: Fetch the exchange rates from the API based on the selected base currency
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`
    );
    const data = await response.json();

    // Clear the loading message
    exchangeRates.innerHTML = "";

    // -step 6d: Display the fetched exchange rates in a list format within the exchange rates section
    let ratesHtml = "<h3>Exchange Rates</h3><ul>";
    const rates = Object.entries(data.conversion_rates); // Convert object to array

    // Limit the number of rates shown (e.g., to 10)
    const limit = 10;
    rates.slice(0, limit).forEach(([currency, rate]) => {
      if (currency !== base) {
        ratesHtml += `<li><span class="currency-icon"></span> ${currency}: ${rate.toFixed(
          4
        )}</li>`;
      }
    });

    ratesHtml += "</ul>";

    // If more rates exist, show a "Show More" button
    if (rates.length > limit) {
      ratesHtml += `<button id="show-more">Show More</button>`;
    }

    exchangeRates.innerHTML = ratesHtml;

    // Handle the "Show More" button functionality
    document.getElementById("show-more")?.addEventListener("click", () => {
      let fullRatesHtml = "<h3>Exchange Rates</h3><ul>";
      rates.forEach(([currency, rate]) => {
        if (currency !== base) {
          fullRatesHtml += `<li><span class="currency-icon"></span>${currency}: ${rate.toFixed(
            4
          )}</li>`;
        }
      });
      fullRatesHtml += "</ul>";
      exchangeRates.innerHTML = fullRatesHtml; // Replace with full list
    });
  } catch (error) {
    // Handle any errors that occur during the API request and provide feedback to the user
    exchangeRates.textContent = "An error occurred. Please try again.";
    console.log(error);
  }
});
//step7. craete a helper function to return the appropriTE CURRENCY SYMBOL based on the currency code
//-define a getcurrencySymbol function that maps currency codes to their symbols

// Helper function to return the appropriate currency symbol based on the currency code
function getCurrencySymbol(currencyCode) {
  const currencySymbols = {
    USD: "$", // US Dollar
    EUR: "€", // Euro
    GBP: "£", // British Pound
    INR: "₹", // Indian Rupee
    JPY: "¥", // Japanese Yen
    AUD: "A$", // Australian Dollar
    CAD: "C$", // Canadian Dollar
    CHF: "CHF", // Swiss Franc
    CNY: "¥", // Chinese Yuan
    SEK: "kr", // Swedish Krona
    NZD: "NZ$", // New Zealand Dollar
    // Add more currencies as needed
  };

  // Return the corresponding symbol or fallback to the currency code if not found
  return currencySymbols[currencyCode] || currencyCode;
}
