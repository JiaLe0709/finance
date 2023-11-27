import app from '@/app.config';
import Reload from "@/components/Home/reload"
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
            <p>{stock.stockPrice} - {stock.stockDate}</p>
          </div>
        ))}
      </div>
      <Reload />
    </Layout>

  );
};

export async function getServerSideProps() {
  try {
    const tickets = app.ticket;
    const apiEndpoint = app.url;

    const stockData = await Promise.all(
      tickets.map(async (symbol) => {
        const res = await fetch(`${apiEndpoint}/api/stockprice?ticket=${symbol}`);
        const data = await res.json();
        return {
          stockName: data.name,
          stockPrice: data.price,
          stockDate: data.date,
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
