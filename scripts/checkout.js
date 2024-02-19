import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentsummary.js';

renderOrderSummary()//This is Model-View-controller 3part(model-saves and manages data-cart)(view-takes data and generate html)(controller-runs some code when we interact with the page-eventlisteners )
renderPaymentSummary()