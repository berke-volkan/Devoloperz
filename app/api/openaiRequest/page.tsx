// openaiRequest.js

import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const response = await axios.post('https://api.h10.pro/chat/completions', {
      model: 'gpt-4-1106-preview',
      max_tokens: 4096,
      temperature: 1,
      top_p: 0,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: false,
      messages: [
        { role: "user", content: prompt },
      ],
    }, {
      headers: {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
      },
    });

    const generatedText = response.data.choices[0].message.content;
    res.status(200).json({ result: generatedText });
  } catch (error) {
    console.error('Error in API request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
