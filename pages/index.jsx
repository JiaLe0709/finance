import app from '@/app.config';
import Reload from "@/components/Home/reload"
import DataTable from '../components/Home/dataTable';
import Layout from '@/layouts/layout';
import React, { useEffect, useState } from 'react';

const StockPrice = () => {

  const [stock, setstock] = useState([]);

  useEffect(() => {
    try {
      const tickets = app.ticket;
      const apiEndpoint = app.url;
  
      const fetchStockData = async (symbol) => {
        const res = await fetch(`${apiEndpoint}/api/stockprice?ticket=${symbol}`);
        if (!res.ok) {
          console.log('error');
          return null;
        }
        return res.json();
      };
  
      const fetchAllStockData = async () => {
        try {
          const data = await Promise.all(tickets.map(fetchStockData));
          setstock(data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchAllStockData();
    } catch (err) {
      console.log(err);
    }
  }, []);

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

  const data = stock.map((stock, index) => ({
    id: index.toString(),
    stockName: stock.name,
    stockPrice: stock.price,
    stockDate: stock.date,
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

export default StockPrice;
