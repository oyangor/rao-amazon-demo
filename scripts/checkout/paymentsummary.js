import { cart, updateCartQuantityonPage } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let numberOfItems = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryoption = getDeliveryOption(cartItem.deliveryOptionsId);
    shippingPriceCents += deliveryoption.priceCents;

    numberOfItems += cartItem.quantity;
  });
  //console.log(formatCurrency(productPriceCents))
  //console.log(formatCurrency(shippingPriceCents))

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;

  const estimatedTaxCents = totalBeforeTaxCents * 0.1;

  const totalCents = totalBeforeTaxCents + estimatedTaxCents;

  const paymentsummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div class="summary-items">
        Items (${numberOfItems}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}
        </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}
        </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}
        </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(estimatedTaxCents)}
    </div>
    
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>`;

  document.querySelector(".js-payment-summary").innerHTML = paymentsummaryHTML;
}
