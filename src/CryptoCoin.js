import React from "react";

const CryptoCoin = (props) => {
  return (
    <>
      <tr className="row">
        <td className="coin-id">{props.id}</td>
        <td className="coin-name">{props.name}</td>
        <td className="coin-img"><img srcSet={props.image} alt="coin-img" /></td>
        <td className="coin-symbol">{props.symbol.toUpperCase()}</td>
        <td className="coin-price">${props.price.toFixed(2)}</td>

        { props.perc24h < 0 ?
           (<td className='coin-24h red'>{props.perc24h.toFixed(2)}%</td>) : 
           (<td className='coin-24h green'>{props.perc24h.toFixed(2)}%</td>)
        }

        <td className="coin-marketcap">${props.marketCap.toLocaleString()}</td>
        <td className="coin-volume">${props.volume.toLocaleString()}</td>
        <td className="coin-circulation"> {props.circSupply.toLocaleString()} {props.symbol.toUpperCase()}</td>
      </tr>
    </>
  );
};

export default CryptoCoin;