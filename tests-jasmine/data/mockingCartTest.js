// tests/data/cartTest.js

import { cart, cartAdd, deleteList2 } from '../../data/cart.js';

describe('test suite: cart.js functions', () => {
beforeAll(() => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([])
    }) 
    spyOn(localStorage, 'setItem')
  })
  

  describe('test the "cartAdd" function', () => {
    beforeEach(() => {

      cart.length = 0;

      cart.push({ productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 2, deliveryOptionId: '1' },
                { productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 1, deliveryOptionId: '2' });

    

    spyOn(document, 'querySelector').and.callFake(() => { 
      return {value: '1'} });

    });


    it('adds a new product to the cart', () => {
      // Make querySelector return value: '1' just for this test
      document.querySelector.and.returnValue({ value: '3' });

      cartAdd('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')      
      
      expect(cart[0].quantity).toEqual(5)
    });
    
    })


/*
  describe('test the deleteList2 function', () => {
    beforeEach(() => {
      cart.length = 0;
      cart.push({
        productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
        quantity: 2,
        deliveryOptionId: 1
      },
      {
        productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
        quantity: 3,
        deliveryOptionId: 2
      },
      {
        productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
        quantity: 4,
        deliveryOptionId: 3
      }
      )
    })

    it('check if the deleteList2 successfully deletes product from the cart item', () => {
      deleteList2('3ebe75dc-64d2-4137-8860-1f5a963e534b')

      expect(cart[1].productId).toEqual("8c9c52b5-5a19-4bcb-a5d1-158a74287c53")
    })

    it('check if the deleteList2 successfully deletes product from the cart item and quantity is correct', () => {
      deleteList2('3ebe75dc-64d2-4137-8860-1f5a963e534b')

      expect(cart[1].quantity).toEqual(4)
    })
  })
*/
});