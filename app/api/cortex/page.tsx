import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { NextResponse } from 'next/server';

const api_key = "sk-61B0p5iYw4YKZwY20fmOAp4qxQtT4TLb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://api.h10.pro/chat/completions',
      data: {
        messages: [{
          role: "system",
          content: req.body,
        }],
      },
      headers: {
        'api-key': api_key,
        'Content-Type': 'application/json', // Ensure the correct content type
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    console.log(response.data["choices"][0]);

    // If the request is successful, respond with JSON using NextResponse.json
    return NextResponse.json({ resp: JSON.stringify(response.data["choices"][0]) });
  } catch (error) {
    console.error('Error in API request:', error);
    
    // Handle the error if needed
    return NextResponse.json({ error: 'Internal Server Error' });
  }
};
