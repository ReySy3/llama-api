const express = require('express');
const axios = require('axios'); 
require('dotenv').config(); 

const app = express();
const port = 3000;

app.get('/llama32', async (req, res) => {
  const content = req.query.content;

  if (!content) {
    return res.status(400).json({ error: 'Please provide content in the query parameter' });
  }

  const apiUrl = 'https://api.deepinfra.com/v1/openai/chat/completions';

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.DEEPCTL_AUTH_TOKEN}`, 
  };

  const requestData = {
    model: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
    messages: [
      {
        role: 'user',
        content: content,
      },
    ],
  };

  try {
    console.log('Request Data:', requestData);

    const response = await axios.post(apiUrl, requestData, { headers });

    console.log('Response Data:', response.data);
    
    res.json({
      author: 'HARU',
      ...response.data
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
