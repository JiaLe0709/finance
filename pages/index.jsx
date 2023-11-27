import app from '@/app.config';
import Reload from "@/components/Home/reload"
import DataTable from '../components/Home/dataTable';
import Layout from '@/layouts/layout';
import React from 'react';

const StockPrice = ({ stockData }) => {
  const columns = [
    {
      accessorKey: 'stockName',
      header: 'Stock Name',
    },
    {
      accessorKey: 'stockPrice',
      header: 'Stock Price',
    },
    {
      accessorKey: 'stockDate',
      header: 'Stock Date',
    },
  ];

  const data = stockData.map((stock, index) => ({
    id: index.toString(),
    stockName: stock.stockName,
    stockPrice: stock.stockPrice,
    stockDate: stock.stockDate,
  }));

  return (
    <Layout>
      <main className='mx-auto max-w-2xl space-y-8 my-10'>
        <DataTable columns={columns} data={data} />
        <Reload />
      </main>
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
