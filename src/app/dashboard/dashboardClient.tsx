// src/app/dashboard/DashboardClient.tsx
"use client";
import { Button } from "@/components/ui/button"; // Adjust the import based on your project's structure
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline"; // H
import React, { useState } from "react";
import Navbar from "./navbar";
import MonacoEditor from "./monacoEditor";

interface Card {
  id: number;
  heading: string;
  code: string;
  explanation: string;
}

interface User {
  image: string;
  name: string;
}

interface DashboardClientProps {
  user: User;
}

const DashboardClient: React.FC<DashboardClientProps> = ({ user }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [nextId, setNextId] = useState(1);

  const handleCreatePath = () => {
    setCards([
      ...cards,
      { id: nextId, heading: "", code: "", explanation: "" },
    ]);
    setNextId(nextId + 1);
  };

  const handleDeleteCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <>
      <Navbar user={user} onCreatePath={handleCreatePath} />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="mb-6">
          Manage your code snippets and explanations easily.
        </p>
        {cards.map((card) => (
          <div key={card.id} className="border rounded-md p-4 mb-4 shadow-md">
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor={`heading-${card.id}`}
                className="block font-semibold"
              >
                Heading
              </label>
              <button
                onClick={() => handleDeleteCard(card.id)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
            <textarea
              id={`heading-${card.id}`}
              className="w-full border rounded p-2 mb-2"
              rows={1}
              value={card.heading}
              onChange={(e) => {
                const updatedCards = cards.map((c) =>
                  c.id === card.id ? { ...c, heading: e.target.value } : c
                );
                setCards(updatedCards);
              }}
            />
            <div className="mb-2">
              <label
                htmlFor={`code-${card.id}`}
                className="block font-semibold"
              >
                Code
              </label>
              <MonacoEditor
                value={card.code}
                onChange={(value) => {
                  const updatedCards = cards.map((c) =>
                    c.id === card.id ? { ...c, code: value || "" } : c
                  );
                  setCards(updatedCards);
                }}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor={`explanation-${card.id}`}
                className="block font-semibold"
              >
                Explanation
              </label>
              <textarea
                id={`explanation-${card.id}`}
                className="w-full border rounded p-2"
                rows={3}
                value={card.explanation}
                onChange={(e) => {
                  const updatedCards = cards.map((c) =>
                    c.id === card.id ? { ...c, explanation: e.target.value } : c
                  );
                  setCards(updatedCards);
                }}
              />
            </div>

        <Button
          onClick={handleCreatePath}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Another
        </Button>
          </div>
          
        ))}
      </div>
    </>
  );
};

export default DashboardClient;
