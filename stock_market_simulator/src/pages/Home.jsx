import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getStocks} from '../DataAccessLayer/stockDAO';

import "./Home.scss";

/**
 * Shows all stocks and their current price
 *
 * @author Robert Boudewijn
 * @date 2022/11/26
 * @param {*} props
 * @return {*}
 */
function Home(props) {

  const [stocks, setStocks] = useState([]);

  useEffect(() =>{ 
    function fetchData(){
      let data = getStocks();
      setStocks(data);
    }
    fetchData();

  }, [props.refresh])

  return (
    <main className={props.refresh}>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Company</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {stocks && stocks.map((stock, index) => {
              return <tr key={index}>
                <td><Link to={`/stocks/${stock.symbol}`}>{stock.symbol}</Link></td>
                <td><Link to={`/stocks/${stock.symbol}`}>{stock.name}</Link></td>
                <td>{stock.price}</td>
                <td className={stock.history[0].change > 0 ? 'increase' : 'decrease'}>{stock.history[0].changePercent} %</td>
              </tr>
            })}
          </tbody>
        </table>


      </div>
    </main>
  );
}

export default Home;