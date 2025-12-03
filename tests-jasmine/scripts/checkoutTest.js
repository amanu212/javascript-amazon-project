import {attachDeleteEventListener} from '../../scripts/checkout.js';
import { deleteList2 } from '../../data/cart.js';


  describe('test the attachDeleteEventListener', () => {
    beforeEach(() => {
      //Create Fake delete buttons
      const fakeDeleteButtons = [
        {
          dataset: {deleteId: 'id-1'},
          addEventListener: jasmine.createSpy('addEventListener')
        }, 
        {
          dataset: {deleteId: 'id-2'},
          addEventListener: jasmine.createSpy('addEventListener')
        }]
      //mock querySelectorAll to return our fake buttons
        spyOn(document, 'querySelectorAll').and.callFake((selector) => {
          if(selector === '.js-delete-quantity') {
            return fakeDeleteButtons;
          }
          return [];
        })
      //mock the functions that get called when clicking the delete buttons
        spyOn(window, 'deleteList2');
        spyOn(window, 'renderCheckOut');
    })
  })

it('attaches click listeners to all delete buttons', () => {
    attachDeleteEventListener();

    // FIX 2: Check each button individually
    fakeDeleteButtons.forEach((button) => {
      expect(button.addEventListener)
        .toHaveBeenCalledWith('click', jasmine.any(Function));  // FIX 3: Function not "Fumction"
    });
  })
