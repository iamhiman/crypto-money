import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoCoin from "./CryptoCoin";
import Pagination from './Pagination';

function App() {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [pageNumLimit] = useState(5);
  const [maxPageNumLimit, setmaxPageNumLimit] = useState(5);
  const [minPageNumLimit, setminPageNumLimit] = useState(0);

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => alert(error + " " + "Please try refreshing the page...!!!"))
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = coins.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const nextBtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumLimit) {
      setmaxPageNumLimit(maxPageNumLimit + pageNumLimit);
      setminPageNumLimit(minPageNumLimit + pageNumLimit);
    }
  }

  const prevBtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumLimit == 0) {
      setmaxPageNumLimit(maxPageNumLimit - pageNumLimit);
      setminPageNumLimit(minPageNumLimit - pageNumLimit);
    }
  }

  return (
    <>
      <section>
        <h1 className="title-heading"> Know all about Top 100 Crypto Currencies in world according to their current Market Capital.</h1>
        
        <div className="box">
          <div className="row">
            <p className="coin-id">#</p>
            <div className="coin-main head">Name</div>
            <p className="coin-symbol head">Symbol</p>
            <p className="coin-price head">Price</p>
            <p className="coin-24h head">Change in 24H</p>
            
            <div className="coin-marketcap-head">
              <p>Market Cap </p>
              <p className="marketcap-tooltip"> &#9432;
            	  <span className="marketcap-tooltiptext">The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market. <br /><br />
                Market Cap = Current Price x Circulating Supply.</span>
              </p>
            </div>

            <div className="coin-volume-head">
              <p>Volume </p>
              <p className="volume-tooltip"> &#9432;
            	  <span className="volume-tooltiptext">A measure of how much of a cryptocurrency was traded in the last 24 hours.</span>
              </p>
            </div>

            <div className="coin-circulation-head">
              <p>Circulating Supply </p>
              <p className="circulation-tooltip"> &#9432;
            	  <span className="circulation-tooltiptext">The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market.</span>
              </p>
            </div>
          </div>

          {currentRows.map((item, index) => {

            return (
              <CryptoCoin
                key={((currentPage * 10) - 10) + index + 1}
                id={((currentPage * 10) - 10) + index + 1}
                image={item.image}
                name={item.name}
                symbol={item.symbol}
                price={item.current_price}
                perc24h={item.price_change_percentage_24h}
                marketCap={item.market_cap}
                volume={item.total_volume}
                circSupply={item.circulating_supply}
              />
            );
          })
          }
        </div>

        <Pagination
          rowsPerPage={rowsPerPage}
          totalRows={coins.length}
          paginate={paginate}
          currentPage={currentPage}
          nextBtn={nextBtn}
          prevBtn={prevBtn}
          minPageNumLimit={minPageNumLimit}
          maxPageNumLimit={maxPageNumLimit}
        />

      </section>
    </>
  );
}

export default App;
