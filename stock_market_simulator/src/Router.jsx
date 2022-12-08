import {useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";
import './Router.scss';
import Home from './pages/Home';
import Stocks from './pages/Stocks';  

import Header from "./components/Header";
import Footer from "./components/Footer";

import {setStocks, getStocks} from './DataAccessLayer/stockDAO';
import {Stock} from './domain/Stock';
import {History} from './domain/History';
import {updateStocks} from './core/updateStocks';


function Router() {
  const [refresh, setRefresh] = useState(1);

  // set on the first render the stock object with fake data
  useEffect(() => {
    if (getStocks().length === 0) {
      let stocks = [
        // ASML old price: 5612.00, new price: 5708.00, change: 96.00, change percentage: 1.71
        new Stock("ASML", "ASML Holding", "high", 5708.00, [new History(5708.00, 96.00, 1.71), new History(5612.00, 0, 0) ]),
        // TSLA old price: 1720.00, new price: 1732.50.00, change: 12.50, change percentage: 0.73
        new Stock("TSLA", "Tesla", "high", 1732.50, [new History(1732.50, 12.50, 0.73), new History(1720.00, 0, 0) ]),
        // VOW3 old price: 1361.00, new price: 1366.00, change: 5.00, change percentage: 0.37
        new Stock("VOW3", "Volkswagen", "low", 1366.00, [new History(1366.00, 5.00, 0.37), new History(1361.00, 0, 0) ]),
        // META old price: 1164.70, new price: 1157.5, change: -7.20, change percentage: -0.62
        new Stock("META", "Facebook", "low", 1157.50, [new History(1157.50, -7.20, -0.62), new History(1164.70, 0, 0) ]),
        // AAPL old price: 1424.60, new price: 1424.10, change: -0.50, change percentage: -0.04
        new Stock("AAPL", "Apple", "high", 1424.10, [new History(1424.10, -0.50, -0.04), new History(1424.60, 0, 0) ]),
        // APHA old price: 786.20, new price: 793.70, change: 7.50, change percentage: 0.95
        new Stock("APHA", "Aphria", "medium", 793.70, [new History(793.70, 7.50, 0.95), new History(786.20, 0, 0) ]),
        // GME old price: 219.80, new price: 247.90, change: 28.10, change percentage: 12.80
        new Stock("GME", "GameStop", "low", 247.90, [new History(247.90, 28.10, 12.80), new History(219.80, 0, 0) ]),
        // LNVGY old price: 154.10, new price: 156.80, change: 2.70, change percentage: 1.75
        new Stock("LNVGY", "Lenovo", "medium", 156.80, [new History(156.80, 2.70, 1.75), new History(154.10, 0, 0) ]),

  
      ];
      setStocks(stocks);
      setRefresh(refresh => refresh + 1); // force a re-render
    }
  }, []); // empty array means only run once

  // refresh the stocks every x seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(updateStocks(getStocks()));
      if (refresh > 100) {
        setRefresh(refresh => 1);
      } else {
        setRefresh(refresh => refresh + 1);
      }

    }, 30 * 1000); // 30 seconds
    return () => clearInterval(interval); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty array means only run once 


  return (
    <>
      <Header refresh={refresh} setRefresh={setRefresh} ></Header>
      <Routes>
        <Route path="/" element={<Home refresh={refresh} setRefresh={setRefresh}/>} />
        <Route path="/stocks/:symbol" element={<Stocks refresh={refresh} setRefresh={setRefresh}/>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default Router;