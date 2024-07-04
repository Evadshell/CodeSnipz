"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from "@/components/ui/button";
import { FiCopy } from 'react-icons/fi';
interface Snippet {
  id: string;
  heading: string;
  code : string;
  explanation: string;  

}
export default function SnippetDetails() {
  const router = useRouter();
  const { id } = useParams();
  const [snippet, setSnippet] =  useState<Snippet>();
  const [explanation,Setexplanation] = useState('');
  const [context, setContext] = useState('');

  const handleExplainCode = async () => {
    try {
      const response = await axios.post("/api/explaincode", {
        code: snippet?.code,
        context: context,
      });
      Setexplanation(response.data.explanation);
    } catch (error) {
      console.error("Error explaining code:", error);
    }
  };
  useEffect(() => {
    if (id) {
      const fetchSnippet = async () => {
        try {
          const response = await axios.get(`/api/snippets/getsnipbyid/${id}`);
          setSnippet(response.data);
        } catch (error) {
          console.error('Error fetching snippet details:', error);
        }
      };

      fetchSnippet();
    }
  }, [id]);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard!');
    }).catch(err => {
      console.error('Error copying text: ', err);
    });
  };

  if (!snippet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-gray-50 rounded-lg shadow-lg">
      <Card className="relative">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{snippet?.heading}</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <Button
            size="sm"
            className="absolute top-2 right-2 z-10 flex items-center bg-gray-800 text-white hover:bg-gray-700"
            onClick={() => copyToClipboard(snippet.code)}
          >
            <FiCopy className="mr-1" /> Copy
          </Button>
          <div className="mb-4 rounded-md overflow-hidden">
            <SyntaxHighlighter language="javascript" style={materialDark} className="p-3 rounded-md">
              {snippet.code}
            </SyntaxHighlighter>
          </div>
          <p className="text-md">{snippet.explanation}</p>
          <div className="mt-4">
            <label htmlFor="context" className="block font-semibold mb-2">Provide Context</label>
            <textarea
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full border rounded p-2 mb-4"
              placeholder="Explain what part you don't understand or need more details on..."
            />
            <Button
              onClick={handleExplainCode}
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
            >
              Explain Code
            </Button>
            <div className="mt-4">
              <label className="block font-semibold mb-2">Explanation</label>
              <div className="w-full border rounded p-2 bg-gray-100 text-gray-700">
                {explanation ? (
                  <pre className="whitespace-pre-wrap">{explanation}</pre>
                ) : (
                  <span className="italic text-gray-500">Explanation will appear here...</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
