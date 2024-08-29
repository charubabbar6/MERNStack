//Get the first product card
const firstProductCardEl = document.querySelector(".product-card");
//console.log(firstProductCardEl);
//Get the last product card
const lastProductCardEl = document.querySelector(".product-card:last-of-type"); //first-of-type//nth-of-type(2)//last-of-type
console.log(lastProductCardEl);
//Get the highest-rated product
const highestRatingEl = document.querySelector("[data-rating='4.8']");
//console.log(highestRatingEl);
// Select all product cards
const productCards = document.querySelectorAll(".product-card");
// Convert the NodeList to an array and find the highest-rated product
const highestRatedProduct = Array.from(productCards).reduce(
  (highest, card) => {
    const rating = parseFloat(
      card.querySelector(".product-rating").dataset.rating
    );
    return rating > highest.rating ? { card, rating } : highest;
  },
  { card: null, rating: 0 }
).card;
// Log the highest-rated product's name
if (highestRatedProduct) {
  const productName =
    highestRatedProduct.querySelector(".product-name").textContent;
  console.log(`Highest Rated Product: ${productName}`);
}

// Get the first laptop category product
const laptopEl = document.querySelector("[data-category='laptop']");
//console.log(laptopEl);
//selecting an id
const dashboardEl = document.querySelector("#dashboard");
console.log(dashboardEl);
