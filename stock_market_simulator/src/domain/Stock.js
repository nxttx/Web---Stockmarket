// import {History} from './History.js';


/**
 * @class Stock
 * @classdesc Stock class
 * @param {string} symbol - the symbol of the stock
 * @param {string} name - the name of the stock
 * @param {number} price - the price of the stock
 * @param {string} riskFactor - the risk factor of the stock (low, medium, high)
 * @param {array of History} history - the history of the stock
 *
 * @author Robert Boudewijn
 * @date 2022/11/26
 * @class Stock
 */
class Stock {
  constructor(symbol, name, riskFactor, price, history) {
    this.symbol = symbol;
    this.name = name;
    this.riskFactor = riskFactor;
    this.price = price;
    this.history = history;
  }

}

// export
export { Stock };