// stock history class

/**
 * @class History
 * @classdesc History class
 * @param {number} price - the price of the stock
 * @param {number} change - the change of the stock
 * @param {number} changePercent - the change percent of the stock
 *
 * @author Robert Boudewijn
 * @date 2022/11/26
 * @class History
 */
class History {
    constructor(price, change, changePercent) {
        this.price = price;
        this.date = new Date();
        this.change = change;
        this.changePercent = changePercent;
    }
}

// export
export { History };
