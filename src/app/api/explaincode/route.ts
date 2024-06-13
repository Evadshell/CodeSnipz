import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { code } = body;

  if (!code) {
    return NextResponse.json({ error: 'Code is required' }, { status: 400 });
  }

  try {
    const response = await axios.post('http://localhost:5000/explain-code', { code });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
