export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export const cartAdd = (productId) => {
  const quantitySelector = document.querySelector(`.js-item-quantity-selector-${productId}`);
  const selectedQuantity= Number(quantitySelector.value);
  let matchingItem;

    cart.forEach((item) => {
      if(productId === item.productId) {
        matchingItem = item;
      }
    })
    
    if(matchingItem) {
      matchingItem.quantity += selectedQuantity;
    }
    else { 
      cart.push({
      productId: productId,
      quantity: selectedQuantity
    })
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }