import React, { useState, useEffect } from "react";
import axios from "axios";
import BitCoin from "./BitCoin";

function App() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Hello</h1>

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

        {coins.map((item, index) => {
          //console.log(item);
          return (
            <BitCoin
              key={index + 1}
              id={index + 1}
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
        })}
      </div>
      <h1>Hello</h1>
    </>
  );
}

export default App;
