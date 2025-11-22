import {formatCurrency} from '../scripts/utils/money.js';

describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2500)).toEqual('25.00');
  });

  it('rounds point numbers to the nearest integer', () => {
    expect(formatCurrency(3323.6)).toEqual('33.24');
  })
});
