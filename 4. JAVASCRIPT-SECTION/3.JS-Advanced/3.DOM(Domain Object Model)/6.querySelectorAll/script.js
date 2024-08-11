//Get the all product card
const firstProductCardEl = document.querySelectorAll(".product-card");
//console.log(firstProductCardEl);
// Extract and log names of all products
const productNameEls = document.querySelectorAll(".product-name");
//console.log(productNameEls);

productNameEls.forEach((el) => {
  //console.log(el.innerHTML);
});

// Select and log all prices of laptop category products
const laptopPricesEl = document.querySelectorAll(
  '[data-category="laptop"] .product-price'
);
console.log(laptopPricesEl);

laptopPricesEl.forEach((el) => {
  console.log(el.textContent);
});
// Select all products with a rating above 4.6

const highestRatingsEl = document.querySelectorAll(
  '[data-rating="4.7"], [data-rating="4.8"]'
);

highestRatingsEl.forEach((el) => console.log(el.innerHTML));
