import { Stock } from '../domain/Stock.js';



/**
 * Gets all stocks from local storage
 * @param {number} key - The key of the stock to get if not provided all stocks will be returned
 * @param {number} 
 * @returns {Array of Stocks} stocks
 *
 * @author Robert Boudewijn
 * @date 2022/11/26
 * @export
 */
export function getStocks(symbol = null) {
    let stocks = localStorage.getItem("stocks");
    if (stocks) {
        stocks = JSON.parse(stocks);
        if (symbol) {
            stocks = stocks.filter(stock => stock.symbol === symbol);
            // turn found stock into a stock object
            if (stocks.length > 0) {
                stocks = new Stock(stocks[0].symbol, stocks[0].name, stocks[0].riskFactor, stocks[0].price, stocks[0].history);
            }
            return stocks;
        }
        // turn stocks into array of Stock objects
        stocks = stocks.map(stock => new Stock(stock.symbol, stock.name, stock.riskFactor, stock.price, stock.history));
        return stocks;
    }
    return [];
}

/**
 * Saves all stocks to local storage
 * @param {Array of Stocks} stocks - The stocks to save
 * @returns {Array of Stocks} Stocks
 * @author Robert Boudewijn
 * @date 2022/11/26
 * @export
 * @throws {Error} if stocks is not an array
 * @throws {Error} if stocks is empty
 * @throws {Error} if stocks contains an object that is not a stock
 * @throws {Error} if stock contains an object that is not a History object
 */
export function setStocks(stocks) {
    if (!Array.isArray(stocks)) {
        throw new Error("stocks is not an array");
    }
    if (stocks.length === 0) {
        throw new Error("stocks is empty");
    }
    stocks.forEach(stock => {
        if (!(stock instanceof Stock)) {
            throw new Error("stocks contains an object that is not a stock");
        }
    });

    localStorage.setItem("stocks", JSON.stringify(stocks));
    return stocks;
}

/**
 * Updates a stock in the stock array
 * @param {Stock} stock - The stock to update
 * @returns {Stock} stock
 * @author Robert Boudewijn
 * @date 2022/11/26
 * @export
 * @throws {Error} if stock is not a stock
 */
export function updateSingleStock(newStock) {
    if (!(newStock instanceof Stock)) {
        throw new Error("stock is not a stock");
    }
    // get symbol of new stock
    let symbol = newStock.symbol;
    // get all stocks
    let stocks = getStocks();
    // find stock with symbol
    let stock = stocks.filter(stock => stock.symbol === symbol);
    // if stock is found
    if (stock.length > 0) {
        // get index of stock
        let index = stocks.indexOf(stock[0]);
        // update stock
        stocks[index] = newStock;
        // save stocks
        setStocks(stocks);
    }
    return newStock;
}
