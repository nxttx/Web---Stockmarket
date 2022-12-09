import { Stock } from '../domain/Stock.js';
import { History } from '../domain/History.js';
import { updateSingleStock, getStocks } from '../DataAccessLayer/stockDAO.js';

/**
 * Updates a stock's price and history in a random way looking at the risk factor
 * @param {Stock} stock - The stock to update
 * @returns {Stock} stock
 * @author Robert Boudewijn
 * @date 2022/11/26
 * @export
 */
export function updateStock(stock) {
    let change = 0;
    let changePercent = 0;
    let price = stock.price;
    let riskFactor = stock.riskFactor;
    let history = stock.history;
    let symbol = stock.symbol;
    let name = stock.name;

    // update price
    switch (riskFactor) {
        case "low":
            change = Math.random() * 1;
            break;
        case "medium":
            change = Math.random() * 10;
            break;
        case "high":
            change = Math.random() * 50;
            break;
        default:
            // medium
            change = Math.random() * 5;
            break;
    }
    // round to 2 decimals
    change = Math.round(change * 100) / 100;

    // if price is 1 then only positive changes are allowed else make it random
    if (price <= 1) {
        change = Math.abs(change);
    } else {
      // set change positive or negative
        if (Math.random() < 0.5) {
            change = -change;
        }
    }
  
    // calculate change percent
    changePercent = Math.round((change / price) * 10000) / 100;

    // update price using castings to avoid floating point errors
    price = Number(price) + Number(change);
    // price += change;

    // update history with new price set to 2 decimals and change and changePercent set to 1 decimal 
    // set as first element in array
    history.unshift(new History(price.toFixed(2), change.toFixed(2), changePercent.toFixed(2)));
    
    // update stock
    stock = new Stock(symbol, name, riskFactor, price.toFixed(2), history);
    return stock;
}

/**
 * Updates all stocks in the stock array
 * @param {Array of Stocks} stocks - The stocks to update
 * @returns {Array of Stocks} stocks
 * @author Robert Boudewijn
 * @date 2022/11/26
 * @export
 */
export function updateStocks(stocks) {
    stocks = stocks.map(stock => updateStock(stock));
    return stocks;
}

/**
 * calculate change of stockprice when buying or selling a stock
 * 
 * @param {Stock} symbol - Symbol of the stock to calculate delta price
 * @param {number} amount - The amount of stocks bought/sold
 * @returns {number} change of stockprice when buying or selling a stock
 * @author Robert Boudewijn, code moved by Swishfox
 * @date 2022/11/29
 * @export
 * @throws {Error} if amount is not a number
 */
export function priceChangeWhenStockTraded(symbol, amount) {
    if (typeof amount !== "number") {
        throw new Error("amount is not a number");
    }
    // get stock
    let stock = getStocks(symbol);
    let price = stock.price;
    let riskFactor = stock.riskFactor;
    let deltaPrice = 0;
    
    // increase or decrease price change based on risk factor
    switch (riskFactor) {
        case "low":
            deltaPrice = Number(price * 0.005) * amount;
            break;
        case "medium":
            deltaPrice = Number(price * 0.007) * amount;
      	    break;
        case "high":
            deltaPrice = Number(price * 0.01) * amount;
            break;
        default:
            // medium
            deltaPrice = Number(price * 0.007) * amount;
            break;
    }

    // check if price is negative
    if( price < 1) {
        price = 1;
    }

    // round to 2 decimals
    deltaPrice = Math.round(Number(deltaPrice) * 100) / 100;
    return deltaPrice
}

// buy x amount of stocks and increase or decrease the price of the stock
/**
 * Buys or sells  x amount of stocks and increases or decreases the price of the stock
 * @param {Stock} symbol - Symbol of the stock to buy
 * @param {number} amount - The amount of stocks to buy
 * @returns {Stock} stock
 * @author Robert Boudewijn, edited by Swishfox
 * @date 2022/11/26
 * @export
 * @throws {Error} if amount is not a number
 */
export function buyOrSellStock(symbol, amount) {
    if (typeof amount !== "number") {
        throw new Error("amount is not a number");
    }
    // get stock
    let stock = getStocks(symbol);

    let price = Number(stock.price);
    let riskFactor = stock.riskFactor;
    let history = stock.history;
    let stockSymbol = stock.symbol;
    let name = stock.name;

    // increase or decrease price (based on risk factor)
    price += Number(priceChangeWhenStockTraded(symbol, amount))

    console.log(typeof price);

    // get price, change and changePercent for history
    let change = Number(price) - Number(stock.price);
    let changePercent = Math.round((change / stock.price) * 10000) / 100;

    // update history with new price set to 2 decimals and change and changePercent set to 1 decimal
    // set as first element in array
    history.unshift(new History(price.toFixed(2), change.toFixed(1), changePercent.toFixed(1)));
    
    // update stock
    stock = new Stock(stockSymbol, name, riskFactor, price.toFixed(2), history);
    
    // update stock with DAO
    updateSingleStock(stock);

    return stock;
}
