"use client";
import { useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MonacoEditor from "../monacoEditor";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Card {
  id: number;
  heading: string;
  code: string;
  enhancedCode: string;
}

export default function EnhanceCode() {
  const [cards, setCards] = useState<Card[]>([]);
  const [nextId, setNextId] = useState(1);
  const [enhancementRequest, setEnhancementRequest] = useState("");

  const handleCreatePath = () => {
    setCards([
      ...cards,
      { id: nextId, heading: "", code: "", enhancedCode: "" },
    ]);
    setNextId(nextId + 1);
  };

  const handleDeleteCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleEnhanceCode = async (card: Card) => {
    try {
      const response = await axios.post("/api/enhancecode", {
        code: card.code,
        enhancement_request: enhancementRequest,
      });
      const updatedCards = cards.map((c) =>
        c.id === card.id ? { ...c, enhancedCode: response.data.enhanced_code } : c
      );
      setCards(updatedCards);
    } catch (error) {
      console.error("Error enhancing code:", error);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert("Code copied to clipboard!");
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  };

  return (
    <div className="ml-24 p-8">
      <h1 className="text-2xl font-bold mb-4">Enhance Your Code Here</h1>
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
            <label htmlFor={`code-${card.id}`} className="block font-semibold">
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
            <label htmlFor="enhancementRequest" className="block font-semibold">
              Enhancement Request
            </label>
            <textarea
              id="enhancementRequest"
              value={enhancementRequest}
              onChange={(e) => setEnhancementRequest(e.target.value)}
              className="w-full border rounded p-2 mb-2"
              placeholder="Describe how you want to enhance the code..."
            />
          </div>
          <Button
            onClick={() => handleEnhanceCode(card)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
          >
            Enhance Code
          </Button>
          <div className="mt-4">
            <label className="block font-semibold mb-2">Enhanced Code</label>
            <div className="w-full border rounded p-2 bg-gray-100 text-gray-700">
              {card.enhancedCode ? (
                <pre className="whitespace-pre-wrap">{card.enhancedCode}</pre>
              ) : (
                <span className="italic text-gray-500">
                  Enhanced code will appear here...
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
      <Button
        onClick={handleCreatePath}
        className="flex items-center bg-green-500 text-white px-3 py-2 rounded-md"
      >
        <PlusIcon className="h-5 w-6 mr-2" />
        Start Adding
      </Button>
    </div>
  );
}
