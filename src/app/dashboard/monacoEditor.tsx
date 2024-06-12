// src/components/MonacoEditor.tsx
import React, { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { detectLanguage } from '@/utils/detectLanguage';

interface MonacoEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ value, onChange }) => {
  const [language, setLanguage] = useState<string>('javascript');

  useEffect(() => {
    setLanguage(detectLanguage(value));
  }, [value]);

  return (
    <div>
      <div className="mb-2 text-sm text-gray-600">Detected Language: {language}</div>
      <Editor
        height="40vh"
        language={language}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default MonacoEditor;
