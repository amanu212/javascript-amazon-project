export let cart = JSON.parse(localStorage.getItem('cart')) || [

];

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


export const deleteList = (deleteId) => {
    let deleteOrder = 0;
        cart.forEach((item, index) => {
          if(item.productId === deleteId) {
            deleteOrder = index;
          }
        })
        cart.splice(deleteOrder, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(cart)
  }

export const deleteList2 = (deleteId) => {
    const newCart = []

    cart.forEach((item) => {

      if(item.productId !== deleteId) {
        newCart.push(item);
      }
    })
  
  cart = newCart;
  localStorage.setItem('cart', JSON.stringify(cart));
}