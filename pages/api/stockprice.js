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

      const stockPriceContainer = $('.YMlKec.fxKbKc').first();
      const stockPrice = stockPriceContainer.text();
      const stockName = $('.zzDege').text();
      const rawDate = $('.ygUjEc[jsname="Vebqub"]').text();

      const formattedDate = formatGoogleFinanceDate(rawDate);

      res.status(200).json(
        {
          name: stockName,
          price: stockPrice,
          date: formattedDate
        });
    } else {
      console.error('Error:', response.status);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Thanks gpt
function formatGoogleFinanceDate(rawDate) {
  const dateArray = rawDate.split(' · ');
  const dateString = dateArray[0].trim();
  const timeString = dateArray[1].trim();

  const formattedDateString = dateString.replace(/([a-zA-Z]+)\.?\s(\d+)/, (_, month, day) => {
    return `${month} ${day}, ${new Date().getFullYear()}`;
  });

  return `${formattedDateString} ${timeString} UTC+8`;
}
