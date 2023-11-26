import app from '@/app.config';
import Layout from '@/layouts/layout';
import React from 'react';

const StockPrice = ({ stockData }) => {
  return (
    <Layout>
      <div>
        {stockData.map((stock, index) => (
          <div key={index}>
            <h1>{stock.stockName}</h1>
            <h2>Stock Price:</h2>
            <p>{stock.stockPrice}</p>
          </div>
        ))}
      </div>
    </Layout>

  );
};

export async function getServerSideProps() {
  try {
    const tickets = ['GENTING:KLSE', 'AAPL:NASDAQ', 'GOOGL:NASDAQ'];
    const apiEndpoint = app.url;

    const stockData = await Promise.all(
      tickets.map(async (symbol) => {
        const res = await fetch(`${apiEndpoint}/api/stockprice?ticket=${symbol}`);
        const data = await res.json();
        return {
          stockName: data.stockName,
          stockPrice: data.stockPrice,
        };
      })
    );

    return {
      props: {
        stockData,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        stockData: [],
      },
    };
  }
}

export default StockPrice;
