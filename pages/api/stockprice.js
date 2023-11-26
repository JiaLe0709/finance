import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const { ticket } = req.query;
    const url = `https://www.google.com/finance/quote/${ticket}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      
      const stockPrice = $('.YMlKec.fxKbKc').text();
      const stockName = $('.zzDege').text();
      
      res.status(200).json({ stockName, stockPrice });
    } else {
      console.error('Error:', response.status);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
