import axios from 'axios';
import * as cheerio from 'cheerio';

function formatGoogleFinanceDate(rawDate) {
  const dateArray = rawDate.split(' · ');
  const dateString = dateArray[0].trim();
  const timeString = dateArray[1].trim();

  const formattedDateString = dateString.replace(
    /([a-zA-Z]+)\.?\s(\d+)/,
    (_, month, day) => {
      return `${month} ${day}, ${new Date().getFullYear()}`;
    }
  );

  return `${formattedDateString} ${timeString} UTC+8`;
}

export default async function handler(req, res) {
  const { ticket } = req.query;

  if (!ticket) {
    return res.status(400).json({
      error: 'Missing ticket parameter'
    });
  }

  try {
    const url = `https://www.google.com/finance/quote/${encodeURIComponent(ticket)}`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
        'Accept':
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      timeout: 10000
    });

    const html = response.data;

    // Google returned the unsupported page
    if (html.includes('/finance/beta/unsupported')) {
      return res.status(502).json({
        error: 'Google Finance returned the unsupported page',
        ticket
      });
    }

    const $ = cheerio.load(html);

    // Stock name
    const stockName = $('.gO24Ff')
      .first()
      .text()
      .trim();

    // Price: e.g. "MYR 1.90"
    const priceText = $('.N6SYTe')
      .first()
      .find('[jsname="Pdsbrc"]')
      .text()
      .trim();

    const stockPrice = parseFloat(
      priceText.replace(/[^\d.-]/g, '')
    );

    // Date: e.g. "17 Sept, 17:00:00 GMT+8 · MYR"
    const rawDate = $('.jZZ2de')
      .first()
      .text()
      .trim();

    const formattedDate = formatGoogleFinanceDate(rawDate);

    if (!stockName || !priceText || Number.isNaN(stockPrice) || !rawDate) {
      return res.status(404).json({
        error: 'Unable to find complete stock information',
        ticket,
        stockName,
        priceText,
        rawDate
      });
    }

    return res.status(200).json({
      name: stockName,
      price: stockPrice,
      date: formattedDate
    });

  } catch (error) {
    console.error('Error fetching data:', error);

    return res.status(500).json({
      error: 'Failed to fetch stock data',
      message: error.message
    });
  }
}