const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.querySelector(".item-list");
const clearBtn = document.getElementById("clear");
const itemFIlter = document.getElementById("filter");

function displayItems() {
  const storageItems = getFromLocalStorage();
  storageItems.forEach((item) => {
    addItemToDOM(item);
    checkUI();
  });
}
// Add Item
function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("Please add an item");
    return;
  } else {
    addToLocalStorage(newItem);
    addItemToDOM(newItem);
    checkUI();
  }
}

function addItemToDOM(item) {
  // Create new item
  const newItem = document.createElement("li");
  newItem.textContent = item.toLowerCase();

  // Create remove button with icon
  const button = document.createElement("button");
  button.className = "remove-item btn-link text-red";
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-xmark";
  button.appendChild(icon);
  newItem.appendChild(button);

  // Append item to list
  itemList.appendChild(newItem);

  // Clear input field
  itemInput.value = "";
}

function addToLocalStorage(item) {
  const storageItem = getFromLocalStorage();
  storageItem.push(item);
  localStorage.setItem("items", JSON.stringify(storageItem));
}

function getFromLocalStorage() {
  let getstorageItem;
  if (localStorage.getItem("items") === null) {
    getstorageItem = [];
  } else {
    getstorageItem = JSON.parse(localStorage.getItem("items"));
  }
  return getstorageItem;
}

function onRemoveItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
    removeFromLocalStorage(e.target.parentElement.parentElement.textContent);
  }
}

// Remove Item
function removeItem(item) {
  if (confirm("Are you sure you want to remove this item?")) {
    item.remove();
  }
  checkUI();
}

// Remove Item from Local Storage
function removeFromLocalStorage(item) {
  let storageItems = getFromLocalStorage();
  storageItems = storageItems.filter((i) => i !== item);
  localStorage.setItem("items", JSON.stringify(storageItems));
  checkUI();
}

// Remove All Items
function removeAllItem(e) {
  if (confirm("Are you sure you want to remove all items?")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem("items");
    checkUI();
  }
}

// Filter Item
function filterItem(e) {
  const list = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();
  list.forEach(function (item) {
    const itemName = item.textContent.toLowerCase();
    if (itemName.indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUI() {
  const list = itemList.querySelectorAll("li");
  if (list.length === 0) {
    clearBtn.style.display = "none";
    itemFIlter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFIlter.style.display = "block";
  }
}

// Event Listeners
itemForm.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", onRemoveItem);
clearBtn.addEventListener("click", removeAllItem);
itemFIlter.addEventListener("input", filterItem);
document.addEventListener("DOMContentLoaded", displayItems);

checkUI();
