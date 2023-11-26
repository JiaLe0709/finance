import app from '@/app.config'
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
    const apiEndpoint = app.url; // Update with your API endpoint
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
