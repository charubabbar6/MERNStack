// Get elements
const addItemForm = document.getElementById("add-item-form");
const updateItemForm = document.getElementById("update-item-form");
const retrieveitem = document.getElementById("retrieve-item-form");
const getItemsButton = document.getElementById("get-items");
const itemsList = document.getElementById("items-list");
const messageDiv = document.getElementById("message");
const deleteItemForm = document.getElementById("delete-item-form");

// Function to display messages
function showMessage(msg, isError = true) {
  messageDiv.textContent = msg;
  messageDiv.style.color = isError ? "red" : "green";
  // Automatically hide the message after 3 seconds (3000 milliseconds)
  setTimeout(() => {
    messageDiv.textContent = "";
  }, 3000);
}

// Add item
addItemForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearItemsList();
  const name = document.getElementById("item-name").value;
  const price = document.getElementById("item-price").value;

  try {
    const res = await fetch("/add-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price }),
    });

    const data = await res.json();
    if (res.status === 201) {
      showMessage("Item added successfully!", false);
      addItemForm.reset();
    } else {
      showMessage(data.message);
    }
  } catch (err) {
    showMessage("Error adding item");
  }
});

// Get all items
getItemsButton.addEventListener("click", async () => {
  itemsList.innerHTML = "";
  try {
    const res = await fetch("/items");
    const data = await res.json();
    if (res.status === 200) {
      data.forEach((item) => {
        itemsList.innerHTML += `<div><strong>${item.name}</strong>: $${item.price}</div>`;
      });
    } else {
      showMessage("No items found");
    }
    // Set a timer to clear the items list after 3 seconds
    setTimeout(() => {
      itemsList.innerHTML = ""; // Clear the list after 3 seconds
    }, 3000); // 3 seconds
  } catch (err) {
    showMessage("Error retrieving items");
  }
});
// Retrieve Item
retrieveitem.addEventListener("submit", async (e) => {
  e.preventDefault();
  const itemId = document.getElementById("retrieve-id").value;

  try {
    const response = await fetch(`/get-item/${itemId}`);
    const item = await response.json();
    displayItem(item);
    // Set a timer to clear the items list after 3 seconds
    setTimeout(() => {
      document.getElementById("result").innerHTML = ""; // Clear the result div after 3 seconds
    }, 3000); // 3 seconds
  } catch (error) {
    document.getElementById("result").innerText = `Error: ${error.message}`;
    setTimeout(() => {
      document.getElementById("result").innerText = ""; // Clear the error message after 3 seconds
    }, 3000); // 3 seconds
  }
});

//! Update item

updateItemForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearItemsList(); // Clear items when updating an item
  // Ensure elements exist
  const itemNameField = document.getElementById("update-name");
  const itemPriceField = document.getElementById("update-price");

  if (!itemNameField || !itemPriceField) {
    console.error("Input elements not found!");
    return;
  }

  const itemName = itemNameField.value;
  const price = itemPriceField.value;

  try {
    const response = await fetch(
      `/update-item/${encodeURIComponent(itemName)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price }), // Send only the fields to be updated
      }
    );

    const result = await response.json();
    // Display only the message
    if (response.ok) {
      document.getElementById("update-message").innerText = result.message; // Show only the message
      updateItemForm.reset();
    } else {
      document.getElementById("update-message").innerText = result.message; // Show the error message if any
    }
    // Set a timer to clear the message after 3 seconds
    setTimeout(() => {
      messageElement.innerText = "";
    }, 3000); // 3 seconds
  } catch (error) {
    document.getElementById("message").innerText = `Error: ${error.message}`;
  }
});
//! Delete Item
deleteItemForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearItemsList(); // Clear items when deleting an item
  const itemName = document.getElementById("delete-name").value;

  try {
    // Send DELETE request to server
    const response = await fetch(`/delete-item/${itemName}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    // Display the result message
    document.getElementById("delete-message").innerText = result.message;

    // Clear input fields
    document.getElementById("delete-name").value = "";
    // Set a timer to clear the message after 3 seconds
    setTimeout(() => {
      messageElement.innerText = "";
    }, 3000); // 3 seconds
  } catch (error) {
    document.getElementById(
      "delete-message"
    ).innerText = `Error: ${error.message}`;
  }
});
function displayItem(item) {
  if (!item) {
    document.getElementById("result").innerHTML = "<p>No item found</p>";
    return;
  }

  // Create table headers and rows
  let html = "<table>";
  html += "<thead><tr>";
  for (const key in item) {
    html += `<th>${key.charAt(0).toUpperCase() + key.slice(1)}</th>`;
  }
  html += "</tr></thead><tbody><tr>";
  for (const key in item) {
    html += `<td>${item[key]}</td>`;
  }
  html += "</tr></tbody></table>";

  // Set the HTML of the result div
  document.getElementById("result").innerHTML = html;
}
// Clear the items list when performing another operation (Add, Update, Delete)
function clearItemsList() {
  itemsList.innerHTML = ""; // Clear the items list
}
