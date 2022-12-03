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
        new Stock("TSLA", "Tesla", "low", 1000, [new History(1000, 20, 0.2), new History(980, 0, 0) ]),
        new Stock("APHA", "Aphria", "high", 1000, [new History(1000, -12.1457, -1.2), new History(1012.1457, 0, 0) ]),
        new Stock("GME", "GameStop", "medium", 1000, [new History(1000, 15.1234, 1.5), new History(985.8766, 0, 0) ]),
        new Stock("ASML", "ASML Holding", "high", 1000, [new History(1000, 0, 0), new History(1000, 0, 0) ]),
        new Stock("AMZN", "Amazon", "low", 1000, [new History(1000, 0, 0), new History(1000, 0, 0) ]),
        new Stock("MSFT", "Microsoft", "medium", 1000, [new History(1000, 0, 0), new History(1000, 0, 0) ]),
        new Stock("GOOG", "Google", "high", 1000, [new History(1000, 0, 0), new History(1000, 0, 0) ]),
        new Stock("FB", "Facebook", "low", 1000, [new History(1000, 0, 0), new History(1000, 0, 0) ]),
        new Stock("TSLA", "Tesla", "medium", 1000, [new History(1000, 0, 0), new History(1000, 0, 0) ]),
        new Stock("AAPL", "Apple", "high", 1000, [new History(1000, 0, 0), new History(1000, 0, 0) ]),
        new Stock("NFLX", "Netflix", "low", 1000, [new History(1000, 0, 0), new History(1000, 0, 0) ]),
        new Stock("NVDA", "NVIDIA", "medium", 1000, [new History(1000, 0, 0), new History(1000, 0, 0) ]),
        new Stock("PYPL", "PayPal", "high", 1000, [new History(1000, 0, 0), new History(1000, 0, 0) ]),
        // 

        // new Stock("AMC", "AMC Entertainment", "high", 1000, [new History(1000, -22.1234, -2.2), new History(1022.1234, 0, 0) ]),
        // new Stock("NIO", "NIO", "low", 1000, [new History(1000, 20.1234, 0.2), new History(978.8766, 0, 0) ]),
  
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