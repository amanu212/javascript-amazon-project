import '../../../data/cart-class.js';
import {cart} from '../../../data/cart-class.js';
import { products } from '../../../data/products.js';
import { deliveryOptions } from '../../../data/deliveryOptions.js';
import { formatCurrency } from '../../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

//import the order summary code from the left so that renderCheckOut recognizes it upon when executed
import { orderSummaryRender } from './right-side-checkout-class.js';

const today = dayjs();

export function attachDeleteEventListener() {
const deleteSelector = document.querySelectorAll('.js-delete-quantity')
deleteSelector.forEach((span) => {
  span.addEventListener('click', () => {
    const idDelete = span.dataset.deleteId;

    cart.deleteList2(idDelete);
    renderCheckOut();
  })
})
}

const attachSaveEventListener = (idUpdate) => {
  const saveButton = document.querySelector(`.js-save-quantity-link-${idUpdate}`);
      saveButton.addEventListener('click', () => {
      const quantityInput = document.querySelector(`.js-quantity-input-${idUpdate}`);
      let updatedQuantity = Number(quantityInput.value);

      cart.cartItems.forEach((item) => {

        if(item.productId === idUpdate) {
          item.quantity = updatedQuantity;
        }
      

      })
      localStorage.setItem('cart-class', JSON.stringify(cart.cartItems));

      renderCheckOut(); 
})

}

function attachUpdateEventListener() {
  const updateSelector = document.querySelectorAll('.js-update-quantity-link');
  updateSelector.forEach((span) => {
    span.addEventListener('click', () => {
      const idUpdate = span.dataset.updateId;
      const inputField = document.querySelector(`.js-quantity-input-${idUpdate}`);
      const saveField = document.querySelector(`.js-save-quantity-link-${idUpdate}`);
      span.style.display = 'none';
      inputField.style.display = 'inline-block';
      saveField.style.display = 'inline-block';

      attachSaveEventListener(idUpdate); 
    })

  })
}

const deliveryDateSelector = () => {
  const deliveryDays = document.querySelectorAll('.js-delivery-option-input');

  deliveryDays.forEach((input) => {
    input.addEventListener('click', () => {
      const inputId = input.dataset.productId;
      const deliveryId = input.dataset.deliveryId;
      
      console.log(inputId);
      console.log(deliveryId);
      
      cart.cartItems.forEach((item) => {
        
        if(item.productId === inputId) {
          item.deliveryOptionId = deliveryId;
        }
      })


      localStorage.setItem('cart-class', JSON.stringify(cart.cartItems));
      renderCheckOut();
    })
  })

}

function renderCheckOut() {

let checkoutHTML = '';
  cart.cartItems.forEach((cartItem) => {

  const productId = cartItem.productId;

  let matchingProduct;

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  //Find the full option object to get the days

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  const dateString = today.add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D');

  products.forEach((product) => {

    if(productId === product.id) {
      matchingProduct = product;
    }
  })

  checkoutHTML += `
    <div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: <span class="js-selected-delivery-date-${matchingProduct.id}">${dateString}</span>
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${matchingProduct.getFormatCurrency()}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-update-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input type = "number" class="quantity-input js-quantity-input-${matchingProduct.id}" value="${cartItem.quantity}">
                  <span class="save-quantity-link link-primary js-save-quantity-link-${matchingProduct.id}">Save</span>

                  <span class="delete-quantity-link link-primary js-delete-quantity"
                  data-delete-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" 
                    ${deliveryOptionId === '1' ? 'checked' : ''}
                    class="delivery-option-input js-delivery-option-input"
                    name="delivery-option-${matchingProduct.id}" data-product-id = "${matchingProduct.id}" data-delivery-id = "1">
                  <div>
                    <div class="delivery-option-date js-delivery-option-date-${matchingProduct.id}">
                      ${today.add(7, 'days').format('dddd, MMMM D')};
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    ${deliveryOptionId === '2' ? 'checked' : ''}
                    class="delivery-option-input js-delivery-option-input"
                    name="delivery-option-${matchingProduct.id}" data-product-id = "${matchingProduct.id}" data-delivery-id = "2">
                  <div>
                    <div class="delivery-option-date">
                      ${today.add(3, 'days').format('dddd, MMMM D')};
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    ${deliveryOptionId === '3' ? 'checked' : ''}
                    class="delivery-option-input js-delivery-option-input"
                    name="delivery-option-${matchingProduct.id}" data-product-id = "${matchingProduct.id}" data-delivery-id = "3">
                  <div>
                    <div class="delivery-option-date">
                      ${today.add(1, 'days').format('dddd, MMMM D')};
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `

})

const selectedProducts = document.querySelector('.js-order-summary');
selectedProducts.innerHTML = checkoutHTML;

//Attach Listeners to the New elements
attachDeleteEventListener();

//Update top middle quantity shower
const checkOutAmount = document.querySelector('.js-return-to-home-quantity');
let checkOutQuantity = 0;

cart.cartItems.forEach((item) => {
  checkOutQuantity += item.quantity;
})

localStorage.setItem('checkoutQuantity', JSON.stringify(checkOutQuantity));

checkOutAmount.innerHTML = checkOutQuantity + ' items';

attachUpdateEventListener();
deliveryDateSelector();
orderSummaryRender();
}

renderCheckOut();