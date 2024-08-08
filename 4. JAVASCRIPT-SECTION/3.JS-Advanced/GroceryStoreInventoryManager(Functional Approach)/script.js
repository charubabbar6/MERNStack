// Inventory Item Structure: { name: String, category: String, price: Number, quantity: Number }
let inventory = [];

function addItem(name, category, price, quantity) {
  inventory.push({ name, category, price, quantity });
}

function updateItem(name, newDetails) {
  const itemIndex = inventory.findIndex((item) => item.name === name);
  if (itemIndex !== -1) {
    inventory[itemIndex] = Object.assign({}, inventory[itemIndex], newDetails);
  }
}

function deleteItem(name) {
  inventory = inventory.filter((item) => item.name !== name);
}

function searchItem(name) {
  return inventory.find((item) => item.name === name);
}

function listInventory() {
  return inventory;
}
