import { NextRequest, NextResponse } from 'next/server';
import { getSnippetById } from '@/app/model/codesnippet';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const snippetId = params.id;
    const snippet = await getSnippetById(snippetId);
    if (!snippet) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 });
    }
    return NextResponse.json(snippet, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch snippet' }, { status: 500 });
  }
}
