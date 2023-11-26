// pages/index.js
import React from 'react';

const StockPrice = ({ stockName, stockPrice }) => {
  return (
    <div>
      <h1>{stockName}</h1>
      <h2>Stock Price:</h2>
      <p>{stockPrice}</p>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const symbol = 'GOOG:NASDAQ'; // Replace with the desired stock symbol
    const apiEndpoint = 'https://3000-jiale0709-finance-lephkxjhm8l.ws-us106.gitpod.io'; // Update with your API endpoint
    const res = await fetch(`${apiEndpoint}/api/stockprice?ticket=${symbol}`);
    const data = await res.json();

    return {
      props: {
        stockName: data.stockName,
        stockPrice: data.stockPrice,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        stockName: null,
        stockPrice: null,
      },
    };
  }
}

export default StockPrice;
