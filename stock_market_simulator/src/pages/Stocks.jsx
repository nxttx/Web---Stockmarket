import React, {useState} from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import {getStocks} from '../DataAccessLayer/stockDAO';
import {buyOrSellStock} from '../core/updateStocks';


import "./Stocks.scss";

/**
 * Display stock information with chartjs 
 *
 * @author Robert Boudewijn
 * @date 2022/11/27
 * @param {*} props
 * @return {*} 
 */
function Stocks(props) {
  const [amount, setAmount] = useState(1);

  // get stock information
  let { symbol } = useParams();
  let stock = getStocks(symbol);
  if(stock.length === 0) return <div>Stock not found</div>

  // form
  const buy = () => {
    buyOrSellStock(symbol, Number(amount));
    props.setRefresh(props.refresh+ 1);

  }
  const sell = () => {
    buyOrSellStock(symbol, -Number(amount));
    props.setRefresh(props.refresh+ 1);

  }

  // invert the history so the chart starts at the oldest data without changing the data
  let history = stock.history.slice();
  history.reverse();
  return (
    <>
    <main className={props.refresh}>
      <div className="container">
        <div className="stock">
          <div className="stock-header">
            <div className="stock-header-left">
              <h1>{stock.symbol}</h1>
              <h2>{stock.name}</h2>
            </div>
            <div className="stock-header-right">
              <h1>&euro; {stock.price}</h1>
              <h2 className={stock.history[0].change > 0 ? 'increase' : 'decrease'}>{stock.history[0].changePercent} %</h2>
            </div>
          </div>
          <div className="stock-chart">
            <Line
              data={{
                labels: history.map((item) => 
                  // turn date into readable daytime format
                  new Date(item.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                  ),
                datasets: [
                  {
                    label: 'Price',
                    data: history.map((item) => item.price),
                    backgroundColor: '#007bff',
                    pointRadius: 0,
                    stepped: true,
                    borderColor: stock.history[0].change > 0 ? '#28a745' : '#dc3545',
                  }
                ],
              }}
            />
          </div>
          <div className="stock-buy">
            <div className="stock-buy-left">
              <h1>Buy {stock.symbol}</h1>
              <h2>Current price: &euro; {stock.price}</h2>
              <h2>Total: &euro; {stock.price * amount }</h2>
            </div>
            <div className="stock-buy-right">
              {/* amount */}
              <div className="stock-buy-amount">
                <label htmlFor="amount">Amount</label>
                <input type="number" name="amount" id="amount" min="1" max="100" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
              <div className="stock-buy_sell-button">
                <button className="btn btn-primary" onClick={buy}>Buy</button>
                <button className="btn btn-danger" onClick={sell}>Sell</button>
              </div>


            </div>
          </div>

          <div className="stock-social">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
        </div>
      </div>
    </main>

  
   </>);
}

export default Stocks;  


//  scss


