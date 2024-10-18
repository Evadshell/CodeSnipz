import clientPromise from '../lib/db';
import { ObjectId, WithId, Document } from 'mongodb';
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
  const snippets = await codeSnippets.find({ userId }).toArray();
  
  // Map the documents to match the CodeSnippet type
  return snippets.map((snippet: WithId<Document>) => ({
    _id: snippet._id,
    userId: snippet.userId,
    heading: snippet.heading,
    code: snippet.code,
    explanation: snippet.explanation,
  })) as CodeSnippet[];}

export async function saveCodeSnippet(snippet: CodeSnippet): Promise<void> {
  const client = await clientPromise;
  const db = client.db('CodeSnip');
  const codeSnippets = db.collection('Codesnip');
  console.log(snippet);
  await codeSnippets.insertOne(snippet);
}

export async function deleteCodeSnippet(snippetId: string): Promise<void> {
  const client = await clientPromise;
  const db = client.db('CodeSnip');
  const codeSnippets = db.collection('Codesnip');
  await codeSnippets.deleteOne({ _id: new ObjectId(snippetId) });
}
export async function getSnippetById(snippetId: string): Promise<CodeSnippet | null> {
  const client = await clientPromise;
  const db = client.db('CodeSnip');
  const codeSnippets = db.collection('Codesnip');
  return codeSnippets.findOne({ _id: new ObjectId(snippetId) }) as Promise<CodeSnippet | null>;}
