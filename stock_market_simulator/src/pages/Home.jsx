import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStocks } from '../DataAccessLayer/stockDAO';


// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';


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
  const [globalHistory, setGlobalHistory] = useState([]);
  const [globalChange, setGlobalChange] = useState([]);
  const [gobalAverageChange, setGlobalAverageChange] = useState(0);

  useEffect(() => {
    function fetchData() {
      let data = getStocks();
      setStocks(data);
      return data;
    }
    let stocksData = fetchData();

    function updateGlobalChart(stocks) {
      let tempHistory = stocks?.map((stock) => stock.history.reverse().slice(-20));
      console.log(tempHistory);

      // create a global change array
      let tempGlobalChange = [];
      for (let i = 0; i < tempHistory[0]?.length; i++) {
        let sum = 0;
        for (let j = 0; j < tempHistory.length; j++) {
          // use the changePercent instead of the change
          sum += Number(tempHistory[j][i].changePercent);
        }
        sum = sum / tempHistory.length;
        // round to 2 decimals
        sum = Math.round(sum * 100) / 100;

        tempGlobalChange.push(sum);
      }

      // calculate the average change
      let sum = 0;
      for (let i = 0; i < tempGlobalChange.length; i++) {
        sum += tempGlobalChange[i];
      }
      sum = sum / tempGlobalChange.length;
      sum = Math.round(sum * 100) / 100;

      setGlobalChange(tempGlobalChange);
      setGlobalHistory(tempHistory);
      setGlobalAverageChange(sum);
    }

    updateGlobalChart(stocksData);

  }, [props.refresh]);



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
              </tr>;
            })}
          </tbody>
        </table>
      </div>

      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2>The market is {gobalAverageChange > 0 ? "growing": "decreasing" } globally with an average of <span>{gobalAverageChange} %</span></h2>
            <h3>
            {gobalAverageChange > 0 ? 
            'Op dit moment lijkt de aandelenmarkt te groeien, wat betekent dat de waarde van aandelen stijgt. Dit kan een teken zijn van een gezonde economie en kan leiden tot toegenomen beleggersvertrouwen.'
            :
            'De aandelenmarkt ondervindt momenteel een daling, met een dalende waarde van aandelen. Dit kan een teken zijn van onderliggende economische problemen en kan leiden tot onzekerheid en angst bij beleggers.'
          }
            </h3>
          </div>
          <div className="card-body flex flex--align-center">
            <div className="col-5 chart">
              <Line
                data={{
                  labels: globalHistory[0]?.map((item) =>
                    // turn date into readable daytime format
                    new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  ),
                  datasets: [
                    {
                      label: 'Price change in %',
                      data: globalChange.map(element => element),
                      backgroundColor: '#0097e6',
                      pointRadius: 0,
                      lineTension: 0.4,
                      borderColor: '#0097e6',
                      borderWidth: 4,
                    }
                  ],
                }}
              />
            </div>

            {/* If market is globally growing display <p>a</p> else <p>b</p> */}
            <div className="changeInfo">
            {gobalAverageChange > 0 ?
              <>
                {/* At this time, the stock market seems to be growing, which means that the value of stocks is increasing. This can be a sign of a healthy economy and can lead to increased investor confidence. A growing stock market presents opportunities for profitable investments, but it is important to keep in mind that the market can also experience downturns and that investing carries risks. To make informed investment decisions in this situation, it is advisable to:

                    Conduct thorough research and seek advice from a financial advisor.
                    Diversify your investments to reduce risk.
                    Regularly review your investment portfolio and make adjustments as needed.
                    Consider your financial goals and risk tolerance when making investment decisions. */}
                <p>
                  <span>Een groeiende aandelenmarkt biedt mogelijkheden voor winstgevende investeringen,</span> maar het is 
                  belangrijk om in gedachten te houden dat de markt ook dalen kan ervaren en dat beleggen risico's
                  met zich meebrengt. Om goed geïnformeerde beleggingsbeslissingen te nemen in deze situatie, is 
                  het raadzaam om:
                </p>
                <ul>
                  <li>Grondig onderzoek te doen en advies te vragen aan een financiële adviseur.</li>
                  <li>Diversifieer uw beleggingen om het risico te verminderen.</li>
                  <li>Beleg alleen in aandelen die u kunt veroorloven om te verliezen.</li>
                  <li>Beoordeel regelmatig uw beleggingsportefeuille en pas deze indien nodig aan.</li>
                  <li>Overweeg uw financiële doelen en risicobereidheid bij het nemen van beleggingsbeslissingen.</li>
                </ul>
              </>
              :
              <>
              {/* The stock market is currently experiencing a decline, with the value of stocks on the decrease. This can be a sign of underlying economic troubles and can lead to investor uncertainty and fear. A decreasing stock market can present challenges for investors and may lead to losses if stocks are not properly managed. However, it is important to remember that the stock market is known for its volatility and can experience ups and downs over time. To make informed investment decisions in this situation, it is advisable to:

                - Conduct thorough research and seek advice from a financial advisor.
                - Carefully monitor your investments and be prepared to make adjustments as needed.
                - Consider reducing your risk by diversifying your portfolio and not putting all of your money into a single stock or investment vehicle.
                - Regularly review your investment portfolio and make changes as needed to align with your financial goals and risk tolerance. */}
                <p>
                  <span>Een dalende aandelenmarkt kan uitdagingen bieden voor beleggers en kan leiden tot verliezen als aandelen 
                  niet goed beheerd worden. </span>Het is echter belangrijk om in gedachten te houden dat de aandelenmarkt bekend 
                  staat om zijn volatiliteit en dat deze periodiek stijgt en daalt. Om goed geïnformeerde 
                  beleggingsbeslissingen te nemen in deze situatie, is het raadzaam om:</p>
                <ul>
                  <li>Grondig onderzoek te doen en advies te vragen aan een financiële adviseur.</li>
                  <li>Uw beleggingen nauwlettend in de gaten houden en voorbereid zijn om indien nodig aanpassingen te doen.</li>
                  <li>Overweeg het risico te verminderen door uw portefeuille te diversifiëren en niet al uw geld in één aandeel of beleggingsvoertuig te stoppen.</li>
                  <li>Beoordeel regelmatig uw beleggingsportefeuille en pas deze indien nodig aan om overeen te komen met uw financiële doelen en risicobereidheid.</li>
                </ul>
              </>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;

// scss for adding a chart

