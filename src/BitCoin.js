import React from "react";

const BitCoin = (props) => {
  return (
    <>
      <div className="row">
        <p className="coin-id">{props.id}</p>
        <div className="coin-main">
          <img srcSet={props.image} alt="coin-img" />
          <p className="coin-name">{props.name}</p>
        </div>
        <p className="coin-symbol">{props.symbol.toUpperCase()}</p>
        <p className="coin-price">${props.price.toFixed(2)}</p>

        {props.perc24h < 0 ?
           (<p className='coin-24h red'>{props.perc24h.toFixed(2)}%</p>) : 
           (<p className='coin-24h green'>{props.perc24h.toFixed(2)}%</p>)
        }

        <p className="coin-marketcap">${props.marketCap.toLocaleString()}</p>
        <p className="coin-volume">${props.volume.toLocaleString()}</p>
        <p className="coin-circulation">
          {props.circSupply.toLocaleString()} {props.symbol.toUpperCase()}
        </p>
      </div>
    </>
  );
};

export default BitCoin;
