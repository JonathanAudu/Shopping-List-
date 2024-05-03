const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.querySelector(".item-list");

// Add Item
function addItem(e) {
  e.preventDefault();
  if (itemInput.value === "") {
    alert("Please add an item");
    return;
  } else {
    // Create new item
    const newItem = document.createElement("li");
    newItem.textContent = itemInput.value;
    const button = document.createElement("button");
    button.className = "remove-item btn-link text-red";
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-xmark";
    button.appendChild(icon);
    newItem.appendChild(button);
    itemList.appendChild(newItem);
    itemInput.value = "";
  }

}

// Event Listeners
itemForm.addEventListener("submit", addItem);
