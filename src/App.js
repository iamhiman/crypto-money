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
        <div className="box">
          <div className="row">
            <p className="coin-id">#</p>
            <div className="coin-main head">Name</div>
            <p className="coin-symbol head">Symbol</p>
            <p className="coin-price head">Price</p>
            <p className="coin-24h head">Change in 24H</p>
            <p className="coin-marketcap head">Market Cap</p>
            <p className="coin-volume head">Volume</p>
            <p className="coin-circulation head">Circulation</p>
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
