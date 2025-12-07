export function Cart(localStorageKey) {
  const cart = {
  cartItems: JSON.parse(localStorage.getItem(localStorageKey)),

  cartLoader() {
    if(!this.cartItems) {
      this.cartItems = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      },
        
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }]
    }
  },

  cartAdd(productId) {
  const quantitySelector = document.querySelector(`.js-item-quantity-selector-${productId}`);
  const selectedQuantity= Number(quantitySelector.value);
  let matchingItem;

    this.cartItems.forEach((item) => {
      if(productId === item.productId) {
        matchingItem = item;
      }
    })
    
    if(matchingItem) {
      matchingItem.quantity += selectedQuantity;
    }
    else { 
      this.cartItems.push({
      productId: productId,
      quantity: selectedQuantity,
      deliveryOptionId: '1'
    })
    }

    localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
  },

  deleteList(idDelete) {
    let deleteOrder = 0;
        this.cartItems.forEach((item, index) => {
          if(item.productId === idDelete) {
            deleteOrder = index;
          }
        })
        this.cartItems.splice(deleteOrder, 1);
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        console.log(this.cartItems)
  },

  deleteList2(idDelete) {
    const newCart = []

    this.cartItems.forEach((item) => {

      if(item.productId !== idDelete) {
        newCart.push(item);
      }
    })
  
  this.cartItems = newCart;
  localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
  }

}
  cart.cartLoader();
  return cart;
}


export const cart = Cart('oop')
const businessCart = Cart('cart-business')
/*
export const cart = {
  cartItems: JSON.parse(localStorage.getItem('cart-oop')),

  cartLoader() {
    if(!this.cartItems) {
      this.cartItems = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      },
        
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }]
    }
  },

  cartAdd(productId) {
  const quantitySelector = document.querySelector(`.js-item-quantity-selector-${productId}`);
  const selectedQuantity= Number(quantitySelector.value);
  let matchingItem;

    this.cartItems.forEach((item) => {
      if(productId === item.productId) {
        matchingItem = item;
      }
    })
    
    if(matchingItem) {
      matchingItem.quantity += selectedQuantity;
    }
    else { 
      this.cartItems.push({
      productId: productId,
      quantity: selectedQuantity,
      deliveryOptionId: '1'
    })
    }

    localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
  },

  deleteList(idDelete) {
    let deleteOrder = 0;
        cartItems.forEach((item, index) => {
          if(item.productId === idDelete) {
            deleteOrder = index;
          }
        })
        cartItems.splice(deleteOrder, 1);
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
        console.log(this.cartItems)
  },

  deleteList2(idDelete) {
    const newCart = []

    this.cartItems.forEach((item) => {

      if(item.productId !== idDelete) {
        newCart.push(item);
      }
    })
  
  this.cartItems = newCart;
  localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
  }

}

cart.cartLoader();
*/

/*
export const businessCart = {
  cartItems: JSON.parse(localStorage.getItem('cart-business')),

  cartLoader() {
    if(!this.cartItems) {
      this.cartItems = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      },
        
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }]
    }
  },

  cartAdd(productId) {
  const quantitySelector = document.querySelector(`.js-item-quantity-selector-${productId}`);
  const selectedQuantity= Number(quantitySelector.value);
  let matchingItem;

    this.cartItems.forEach((item) => {
      if(productId === item.productId) {
        matchingItem = item;
      }
    })
    
    if(matchingItem) {
      matchingItem.quantity += selectedQuantity;
    }
    else { 
      this.cartItems.push({
      productId: productId,
      quantity: selectedQuantity,
      deliveryOptionId: '1'
    })
    }

    localStorage.setItem('cart-business', JSON.stringify(this.cartItems));
  },

  deleteList(idDelete) {
    let deleteOrder = 0;
        cartItems.forEach((item, index) => {
          if(item.productId === idDelete) {
            deleteOrder = index;
          }
        })
        cartItems.splice(deleteOrder, 1);
        localStorage.setItem('cart-business', JSON.stringify(this.cartItems));
        console.log(this.cartItems)
  },

  deleteList2(idDelete) {
    const newCart = []

    this.cartItems.forEach((item) => {

      if(item.productId !== idDelete) {
        newCart.push(item);
      }
    })
  
  this.cartItems = newCart;
  localStorage.setItem('cart-business', JSON.stringify(this.cartItems));
  }

}

businessCart.cartLoader();
*/

