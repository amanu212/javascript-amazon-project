import { cart } from '../../../data/cart-class.js';
import { products } from '../../../data/products.js';
import { formatCurrency } from '../../utils/money.js';


export function orderSummaryRender() {

const orderSummaryHTML = document.querySelector('.js-payment-summary');
  
  // 1. Initialize everything in CENTS (integers)
  let itemsPriceCents = 0;
  let shippingPriceCents = 0;
  let cartQuantity = 0;

  cart.cartItems.forEach((item) => {
    cartQuantity += item.quantity;
    // Keep item price in CENTS
    
    const product = products.find((p) => p.id === item.productId);
    itemsPriceCents += product.priceCents * item.quantity;

    // Look up the delivery cost and add it to the total shipping CENTS
    if (item.deliveryOptionId === '1') {
      shippingPriceCents += 0;
    } else if (item.deliveryOptionId === '2') {
      shippingPriceCents += 499;
    } else if (item.deliveryOptionId === '3') {
      shippingPriceCents += 999;
    }
  });

  // 2. Calculate Final Totals in CENTS
  const totalBeforeTaxCents = itemsPriceCents + shippingPriceCents;
  // Tax calculation in CENTS (rounding to fix float issues)
  const taxCents = Math.round(totalBeforeTaxCents * 0.1); 
  const totalCents = totalBeforeTaxCents + taxCents;

  // 3. Inject DYNAMIC VALUES using formatCurrency()
  orderSummaryHTML.innerHTML = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(itemsPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

}