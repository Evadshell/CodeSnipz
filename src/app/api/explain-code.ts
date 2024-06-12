import { NextApiRequest, NextApiResponse } from 'next';
import { openai } from '@ai-sdk/openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    try {
      const response = await openai.completion.create({
        model: 'gpt-3.5-turbo',
        prompt: `Explain the following code in simple terms:\n\n${code}`,
        max_tokens: 150,
      });

      const explanation = response.data.choices[0].text.trim();
      res.status(200).json({ explanation });
    } catch (error) {
      console.error('Error explaining code:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
