import { NextRequest, NextResponse } from 'next/server';
import { getCodeSnippets } from '@/app/model/codesnippet';

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
    }

    const snippets = await getCodeSnippets(userId);
    return NextResponse.json(snippets, { status: 200 });
  } catch (error) {
    console.error('Error retrieving code snippets:', error);
    return NextResponse.json({ error: 'Failed to retrieve code snippets' }, { status: 500 });
  }
}
