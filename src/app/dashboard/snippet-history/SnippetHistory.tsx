"use client";
import { auth } from "@/app/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
interface Snippet {
  id: string;
  heading: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

const SnippetHistory: React.FC<{ user?: User }> = ({ user }) => {
  // const session =  auth();
  const [snips, setSnips] = useState<Snippet[]>([]);
  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await axios.get(
          `/api/snippets/getsnips?userId=${user?.id}`
        );
        console.log(response.data);
        setSnips(
          response.data.map((snippet: any, index: number) => ({
            id: snippet._id,
            heading: snippet.heading,
          }))
        );

        // console.log(snips);
      } catch (error) {
        console.error("Error fetching code snippets:", error);
      }
    };
    fetchSnippets();
  }, [user?.id]);
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/sniphistory/${id}`);
  };
  return (
    <div>
      <h1>Snippet History</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {snips.map((snippet) => (
          <Card
            key={snippet?.id}
            onClick={() => handleCardClick(snippet.id)}
            style={{ cursor: "pointer", width: "300px" }}
          >
            <CardHeader>
              <CardTitle>{snippet?.heading}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default SnippetHistory;
