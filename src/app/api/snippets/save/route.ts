// import { NextRequest, NextResponse } from 'next/server';
// import { saveCodeSnippet } from '@/app/model/codesnippet';

// export  async function POST(req: NextRequest, res: NextResponse) {
//   if (req.method === 'POST') {
//     try {
//       const snippet = req.body;
//       console.log(req.body);
//       await saveCodeSnippet(snippet);
//       // res.status(200).json({ message: 'Code snippet saved successfully' });
//       return NextResponse.json(saveCodeSnippet, { status: 200 });

//     } catch (error) {
//       return NextResponse.json({ error: 'Failed to save code snippet' }, { status: 500 });

//     }
//   } else {
//     return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
//   }
// }
// src/app/api/snippets/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { saveCodeSnippet } from '@/app/model/codesnippet';

export async function POST(req: NextRequest) {
  try {
    const snippet = await req.json(); // Parse JSON body
    console.log(snippet); // Debug log
    await saveCodeSnippet(snippet);
    return NextResponse.json({ message: 'Code snippet saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving code snippet:', error); // Debug log
    return NextResponse.json({ error: 'Failed to save code snippet' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Handle GET request if necessary
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
