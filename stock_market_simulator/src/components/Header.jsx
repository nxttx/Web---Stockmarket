import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import {getStocks} from '../DataAccessLayer/stockDAO';


import "./Header.scss";

function Header(props) {
  const [stocks, setStocks] = useState([]);

  useEffect(() =>{ 
    function fetchData(){
      let data = getStocks();
      setStocks(data);
    }
    fetchData();

  }, [props.refresh])

 

  return (<>
    <header className={props.refresh}>
      <div className="container">
        <Link to="/" className="logo">
          <h1>BAWSAQ</h1><span>Stock Market Simulator</span>
        </Link>

        <div className="statistics">
          <div className="marquee">
            {stocks && stocks.map((stock, index) => {
              return <div className="statistic" key={index}>
                
              <div className={stock.history[0].change > 0 ? 'arrow increase' : 'arrow decrease'}><FontAwesomeIcon icon={faAngleDown} /></div>
              <div className="value">{stock.history[0].changePercent}%</div>
              <div className="label">{stock.symbol}</div>
            </div>
            })}
          </div>
          {/* marquee twice so the statistics are never empty */}
          <div className="marquee">
            {stocks && stocks.map((stock, index) => {
              return <div className="statistic" key={index}>
              <div className={stock.history[0].change > 0 ? 'arrow increase' : 'arrow decrease'}><FontAwesomeIcon icon={faAngleDown} /></div>
              <div className="value">{stock.history[0].changePercent}%</div>
              <div className="label">{stock.symbol}</div>
            </div>
            })}
          </div>
        </div>
      </div>
    </header>
    <div className="clearfix"/>
    </>
  );
}

export default Header;