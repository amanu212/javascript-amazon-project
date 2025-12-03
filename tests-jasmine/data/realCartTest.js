// cartTest.js
import { productsHTML } from '../../amazon.js';  // ← just import the HTML!
import { cartAdd, cart } from '../../data/cart.js';


  // Inject it manually in tests
  document.body.innerHTML = `
    <div class="js-products-grid">${productsHTML}</div>
  `;

describe('cartAdd - Real DOM (perfect version)', () => {
  beforeEach(() => {
    cart.length = 0;
    cart.push(
      { productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 2, deliveryOptionId: '1' },
      { productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 1, deliveryOptionId: '2' }
    );
  });

  it('adds new product', () => {
    cartAdd('new-id-123');
    expect(cart.length).toBe(3);
    expect(cart[2].quantity).toBe(1);
  });

  it('respects dropdown', () => {
    const select = document.querySelector('.js-item-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    select.value = '10';
    cartAdd('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toBe(12);
  });
});