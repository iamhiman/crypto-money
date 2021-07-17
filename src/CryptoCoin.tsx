import React from "react";

interface ICryptoCoinType {
  id: number;
  name: string;
  image: string;
  symbol: string;
  price: number;
  perc24h: number;
  marketCap: number;
  volume: number;
  circSupply: number;
}


export const CryptoCoin: React.FunctionComponent<ICryptoCoinType> = (props) => {

  const { id, name, image, symbol, price, perc24h, marketCap, volume, circSupply } = props;

  return (
    <>
      <tr className="row">
        <td className="coin-id">{id}</td>
        <td className="coin-name">{name}</td>
        <td className="coin-img"><img srcSet={image} alt="coin-img" /></td>
        <td className="coin-symbol">{symbol.toUpperCase()}</td>
        <td className="coin-price">${price.toFixed(2)}</td>

        {
          perc24h < 0 ?
            (<td className='coin-24h red'>{perc24h.toFixed(2)}%</td>) :
            (<td className='coin-24h green'>+{perc24h.toFixed(2)}%</td>)
        }

        <td className="coin-marketcap">${marketCap.toLocaleString()}</td>
        <td className="coin-volume">${volume.toLocaleString()}</td>
        <td className="coin-circulation"> {circSupply.toLocaleString()} {symbol.toUpperCase()}</td>
      </tr>
    </>
  );
};
