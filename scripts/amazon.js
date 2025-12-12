
import { cart } from '../data/cart-class.js';
import { products } from '../data/products.js';

import { formatCurrency } from './utils/money.js';
let productsHTML = '';

  const cartQuantityTeller = () => {
    const retrievedQuantity = JSON.parse(localStorage.getItem('cartQuantity')) || 0;
    document.querySelector('.js-cart-quantity').innerHTML = retrievedQuantity;
  }

  cartQuantityTeller();

products.forEach((product) => {
        productsHTML += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl() }">
              <div class="product-rating-count link-primary">
                ${ product.getCount() }
              </div>
            </div>

            <div class="product-price">
              $${product.getFormatCurrency() }
            </div>

            <div class="product-quantity-container">
              <select class="js-item-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart-button"
            data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>`
})


export { productsHTML };

const productGrid = document.querySelector('.js-products-grid');
productGrid.innerHTML = productsHTML;

const addToCart = document.querySelectorAll('.js-add-to-cart-button');




export const cartShow = () => {

    let totalQuantity = 0;
    cart.cartItems.forEach((item) => {
    totalQuantity += item.quantity;
    })
    
    localStorage.setItem('cartQuantity', JSON.stringify(totalQuantity)); 
    const cartQuantityIdentifier = document.querySelector('.js-cart-quantity')
    cartQuantityIdentifier.innerHTML = totalQuantity;
    }
    


addToCart.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;

    cart.cartAdd(productId);
    cartShow();
    
    const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`)
    addedToCart.style.opacity = '1';

    setTimeout(() => {
      addedToCart.style.opacity = '0';
    }, 1000);

    console.log(cart);
  })
  
});

cartShow();