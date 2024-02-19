export let cart = JSON.parse(localStorage.getItem("RAOCart")) || [];

function saveToLocalStorage() {
  localStorage.setItem("RAOCart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((itemCart) => {
    if (productId === itemCart.productId) {
      matchingItem = itemCart;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionsId: "1",
    });
  }
  saveToLocalStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((itemCart) => {
    if (itemCart.productId !== productId) {
      newCart.push(itemCart);
    }
  });

  cart = newCart;
  saveToLocalStorage();
}

export function updateCartQuantityonPage(classToBeUpdated, items) {
  let numberOfItems = 0;
  cart.forEach((itemCart) => {
    numberOfItems += itemCart.quantity;
  });

  document.querySelector(
    classToBeUpdated
  ).innerHTML = `${numberOfItems}  ${items}`;
  //document.querySelector('.summary-items').innerHTML= `Items (${numberOfItems})`;

  return numberOfItems;
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((valueFromCart) => {
    if (productId === valueFromCart.productId) {
      valueFromCart.quantity = newQuantity;
    }
  });

  //console.log(cart)
  saveToLocalStorage();
}

export function updateDeliveryOption(productId, deliveryOptionsId) {
  let matchingItem;

  cart.forEach((itemCart) => {
    if (productId === itemCart.productId) {
      matchingItem = itemCart;
    }
  });

  matchingItem.deliveryOptionsId = deliveryOptionsId;

  saveToLocalStorage();
}
