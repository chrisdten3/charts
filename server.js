const express = require('express');
const axios = require('axios');
const app = express();
const port = 5011;

app.get('/stock-data', async (req, res) => {
  try {
    const apiKey = 'L3F6TGY1X7ZYVGYN';
    const symbols = ["AAPL", "AMZN", "MSFT", "GOOGL", "TSLA"];
    const promises = symbols.map(symbol => {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${apiKey}`;
      return axios.get(url);
    });

    // Wait for all requests to complete
    const responses = await Promise.all(promises);

    // Check if all requests were successful
    const errors = responses.filter(response => response.status !== 200);
    if (errors.length > 0) {
      console.log('Errors:', errors.map(error => error.status));
      return res.status(500).send('Error fetching data');
    }

    // Extract data from responses
    const data = responses.map(response => response.data);

    // Data is successfully fetched for all symbols
    res.json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


