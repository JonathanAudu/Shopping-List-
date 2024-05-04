const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.querySelector(".item-list");
const clearBtn = document.getElementById("clear");

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

// Remove Item
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure you want to remove this item?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// Remove All Items
function removeAllItem(e) {
  if (confirm("Are you sure you want to remove all items?")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }
}

// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", removeAllItem);
