import { NextRequest, NextResponse } from 'next/server';
import { getCodeSnippets } from '@/app/model/codesnippet';

export default async function POST(req: NextRequest) {
    
  if (req.method === 'GET') {
    try {
      const { userId } = req.query;
      const snippets = await getCodeSnippets(userId as string);
      return NextResponse.json(snippets, { status: 200 });

    } catch (error) {
    //   res.status(500).json({ error: 'Failed to retrieve code snippets' });
      return NextResponse.json({ error: 'Code is required' }, { status: 500 });

    }
  } else {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });

  }
}
