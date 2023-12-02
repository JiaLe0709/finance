# Stock Tracker

This basic stock tracker app was inspired by my experience helping my grandfather check the latest share prices. Utilizing Progressive Web App (PWA) technology allows the app to be easily installed on his phone. The advantages include the ability to zoom in for better visibility, easy to refresh for the latest prices, and a reduced risk of misclicks. The project is developed using Next.js and using edge functions to fetch data from Google Finance.

## Logic

For instance, the Google Finance URL takes the following format:
```bash
https://www.google.com/finance/quote/AMZN:NASDAQ
```

The application extracts the stock ticket name from this URL (e.g. AMZN:NASDAQ) and uses an edge function to fetch data from the HTML, extracting information based on the specified classes, and rendering it in a simple table.

## Development

Clone the repository:
```bash
git clone https://github.com/JiaLe0709/finance.git
cd finance
```

You can install dependencies using npm or bun and start the development server:
```bash
npm install && npm run dev
```
or
```bash
bun install && bun dev
```

**Environment Variables:**
```bash
TICKET=
URL=
```

**Note:**
- The TICKET variable can contain multiple values, with both uppercase and lowercase letters allowed. For example:
```bash
TICKET=GOOGL:NASDAQ,AMZN:NASDAQ
```

## Deployment

### Environment Variables
Ensure these environment variables are set for the app to function correctly:
```bash
TICKET=
URL=
```

### Deployment Providers

1. Deploy the app to Vercel or any other provider that supports hosting Next.js applications.

2. Deploy with Docker:
```bash
docker pull jiale0709/finance@latest
```

## License

This project is licensed under the [MIT License](LICENSE).