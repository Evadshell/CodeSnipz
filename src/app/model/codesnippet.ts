import clientPromise from '../lib/db';
import { ObjectId } from 'mongodb';

export interface CodeSnippet {
  _id?: ObjectId;
  userId: string;
  heading: string;
  code: string;
  explanation: string;
}

export async function getCodeSnippets(userId: string): Promise<CodeSnippet[]> {
  const client = await clientPromise;
  const db = client.db('CodeSnip');
  const codeSnippets = db.collection('Codesnip');
  return codeSnippets.find({ userId }).toArray();
}

export async function saveCodeSnippet(snippet: CodeSnippet): Promise<void> {
  const client = await clientPromise;
  const db = client.db('CodeSnip');
  const codeSnippets = db.collection('Codesnip');
  await codeSnippets.insertOne(snippet);
}

export async function deleteCodeSnippet(snippetId: string): Promise<void> {
  const client = await clientPromise;
  const db = client.db('CodeSnip');
  const codeSnippets = db.collection('Codesnip');
  await codeSnippets.deleteOne({ _id: new ObjectId(snippetId) });
}
