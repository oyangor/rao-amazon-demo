import {
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js"; //named export
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { updateCartQuantityonPage } from "../../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; //default export when we want to export only one thing//export default (name)
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentsummary.js";

//console.log(cart)
//console.log(deliveryOptions)

const numberOfItems = updateCartQuantityonPage(".js-return-home-link", "items");

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    //console.log(matchingProduct);

    const deliveryOptionId = cartItem.deliveryOptionsId;

    //console.log(deliveryOptionsId)

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    ///console.log(cartItem.deliveryOptionsId)
    const deliveryDate = calculateDeliveryDate(deliveryOption);

    const html = ` <div class="cart-item-containerS
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${deliveryDate}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity js-product-quantity-${
            matchingProduct.id
          }">
            <span >
              Quantity: <span class="quantity-label js-quantity-label-${
                matchingProduct.id
              }">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link js-update-quantity-link-${
              matchingProduct.id
            }"
              data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input .js-quantity-input-${
              matchingProduct.id
            }"
            data-product-id="${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-quantity-link .js-save-quantity-link-${
              matchingProduct.id
            }"data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link 
            " data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
          </div>
        </div>`;

    cartSummaryHTML += html;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDate = calculateDeliveryDate(deliveryOption);

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE "
          : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked =
        deliveryOption.id === cartItem.deliveryOptionsId ? "checked" : "";

      html += `<div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" 
            ${isChecked}
            class="delivery-option-input"
            name = "delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${deliveryDate}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>`;
    });

    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
  //console.log(cartSummaryHTML)
  //console.log(matchingProduct)

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      //console.log(link)
      //console.log(productId)
      removeFromCart(productId);

      //console.log(cart);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      //console.log(container)
      container.remove();

      updateCartQuantityonPage(".js-return-home-link", "items");
      renderPaymentSummary();
    });
  });

  document
    .querySelectorAll(".js-update-quantity-link")
    .forEach((updateLink) => {
      updateLink.addEventListener("click", () => {
        const productId = updateLink.dataset.productId;
        //console.log(productId)

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );

        //console.log(container)

        container.classList.add("is-editing-quantity");
      });

      //document.querySelector('.quantity-input').value = '';
    });

  //console.log(cart)

  document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      saveButton(link);
    });
  });

  function saveButton(link) {
    const productId = link.dataset.productId;

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove("is-editing-quantity");

    //console.log(link)
    //console.log(document.querySelector(`.js-quantity-input-${productId}`).value);
    //const newQuantity = parseInt(containerInput);
    const containerClosest = link.closest(`.js-product-quantity-${productId}`);
    const newQuantity = parseInt(
      containerClosest.querySelector(".js-quantity-input").value
    );

    if (newQuantity < 0 || newQuantity >= 1000) {
      alert("Quantity must be at least 0 and less than 1000");
      document.querySelector(".quantity-input").value = "";
      return;
    }

    updateQuantity(productId, newQuantity);

    const quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );
    quantityLabel.innerHTML = newQuantity;

    updateCartQuantityonPage(".js-return-home-link", "items");
    renderPaymentSummary();
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".js-quantity-input").forEach((input) => {
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const productId = input.dataset.productId;
          //console.log('Product ID:', productId); // Log the productId
          const linkSelector = `.js-save-quantity-link[data-product-id="${productId}"]`;
          //console.log('Save Link Selector:', linkSelector); // Log the selector
          const link = document.querySelector(linkSelector);
          //console.log(link)
          if (link) {
            saveButton(link);
          } else {
            console.error("Save link not found for product ID:", productId);
          }
        }
      });
    });
  });

  //document.querySelector('.summary-items').innerHTML= `Items (${numberOfItems})`;

  document.querySelectorAll(`.js-delivery-option`).forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary(); //a function can call/rerun itself-recursion
      renderPaymentSummary();
    });
  });
}
