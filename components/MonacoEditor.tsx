'use client';

import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor';

interface MonacoEditorProps {
  questionId: string;
}

export default function MonacoEditor({ questionId }: MonacoEditorProps) {
  const [code, setCode] = useState('');
  const [editorInstance, setEditorInstance] = useState<editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    const savedCode = localStorage.getItem(`answer-${questionId}`);
    if (savedCode) {
      setCode(savedCode);
    }
  }, [questionId]);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    setEditorInstance(editor);
  };

  const handleChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    localStorage.setItem(`answer-${questionId}`, newCode);
  };

  return (
    <div className="h-full flex flex-col bg-zinc-900">
      <div className="px-4 py-2 border-b border-zinc-700 bg-zinc-800">
        <h3 className="text-sm font-semibold text-zinc-300">Twoja odpowiedź</h3>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="markdown"
          theme="vs-dark"
          value={code}
          onChange={handleChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
          }}
        />
      </div>
    </div>
  );
}

export function getEditorContent(): string {
  return '';
}
