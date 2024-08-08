// Inventory structure: Each item is an object with name, category, price, and quantity.
let inventory = [];

// Adds a new item to the inventory.
// Parameters: name (string), category (string), price (number), quantity (number)
function addItem(name, category, price, quantity) {
  // TODO: Implement this function to add a new item to the inventory array.
  // Validate input
  if (
    !name ||
    !category ||
    typeof price !== "number" ||
    price <= 0 ||
    typeof quantity !== "number" ||
    quantity <= 0
  ) {
    throw new Error(
      "Invalid input. Please provide valid name, category, price (positive number), and quantity (positive number)."
    );
  }
  // Check if the item already exists
  const existingItemIndex = inventory.findIndex((item) => item.name === name);
  if (existingItemIndex !== -1) {
    throw new Error(
      "Item already exists. Use updateItem to modify an existing item."
    );
  }
  // Create a new item object
  const newItem = {
    name,
    category,
    price,
    quantity,
  };
  // Add the new item to the inventory
  inventory.push(newItem);
}
addItem("Laptop", "Electronics", 999.99, 10);
addItem("Desk Chair", "Furniture", 129.99, 15);
//console.log(inventory);

// Updates an existing item in the inventory.
// Parameters: name (string), newDetails (object with updated properties)
function updateItem(name, newDetails) {
  // TODO: Implement this function to update an item's details in the inventory array.
  // Find the index of the item to update
  const itemIndex = inventory.findIndex((item) => item.name === name);
  // Validate if item exists
  if (itemIndex === -1) {
    throw new Error("Item not found.");
  }
  // Update the item with new details using Object.assign
  Object.assign(inventory[itemIndex], newDetails);
}
updateItem("Laptop", { price: 899.99, quantity: 8 });
//console.log(inventory);
// Deletes an item from the inventory.
// Parameter: name (string)
function deleteItem(name) {
  // TODO: Implement this function to remove an item from the inventory array.
  // Find the index of the item to delete
  const itemIndex = inventory.findIndex((item) => item.name === name);
  // Validate if item exists
  if (itemIndex === -1) {
    throw new Error("Item not found.");
  }
  // Remove the item from the inventory
  inventory.splice(itemIndex, 1);
}

deleteItem("Desk Chair");
//console.log(inventory);
// Searches for an item by name and returns it.
// Parameter: name (string)
function searchItem(name) {
  // TODO: Implement this function to find and return an item by its name.
  // Find the item by name
  const item = inventory.find((item) => item.name === name);

  // Return the item or null if not found
  if (item) {
    // console.log("Item found:", item);
    return item;
  } else {
    //console.log("Item not found");
    return null;
  }
}
searchItem("Desk Chair");
//console.log(inventory);
// Lists all items in the inventory.
function listInventory() {
  // TODO: Implement this function to return the entire inventory array.
  if (inventory.length === 0) {
    console.log("Inventory is empty.");
  } else {
    console.log("inventory List:");
    inventory.forEach((item) => {
      console.log(
        `Name: ${item.name}, Category: ${
          item.category
        }, Price: $${item.price.toFixed(2)}, Quantity: ${item.quantity}`
      );
    });
  }
}
listInventory();
