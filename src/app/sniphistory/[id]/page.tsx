"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default   function SnippetDetails  (){
  const router = useRouter();
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);

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

  if (!snippet) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Card>
        <CardHeader>
          <CardTitle>{snippet?.heading}</CardTitle>
        </CardHeader>
        <CardContent>
          <SyntaxHighlighter language="javascript" style={materialDark}>
            {snippet.code}
          </SyntaxHighlighter>
          <p>{snippet.explanation}</p>
        </CardContent>
      </Card>
    </div>
  );
}
 
