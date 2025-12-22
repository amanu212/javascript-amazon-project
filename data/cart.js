export let cart = JSON.parse(localStorage.getItem('cart'));


export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
    
    });
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send()
}


if(!cart) {
  cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
    deliveryOptionId: '1',
  },
    
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }]
}

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
      quantity: selectedQuantity,
      deliveryOptionId: '1'
    })
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }

export const deleteList = (idDelete) => {
    let deleteOrder = 0;
        cart.forEach((item, index) => {
          if(item.productId === idDelete) {
            deleteOrder = index;
          }
        })
        cart.splice(deleteOrder, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(cart)
  }

export const deleteList2 = (idDelete) => {
    const newCart = []

    cart.forEach((item) => {

      if(item.productId !== idDelete) {
        newCart.push(item);
      }
    })
  
  cart = newCart;
  localStorage.setItem('cart', JSON.stringify(cart));
  }

  console.log(cart);