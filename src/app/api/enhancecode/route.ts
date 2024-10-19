import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { code, enhancement_request } = body;
console.log(code);
console.log(enhancement_request);
  if (!code) {
    return NextResponse.json({ error: 'Code is required' }, { status: 400 });
  }

  if (!enhancement_request) {
    return NextResponse.json({ error: 'Enhancement request is required' }, { status: 400 });
  }

  try {
    const response = await axios.post('http://localhost:5000/enhance-code', { code, enhancement_request });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

