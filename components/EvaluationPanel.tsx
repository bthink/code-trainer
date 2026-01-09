'use client';

import { useState } from 'react';
import type { Question, DifficultyLevel, EvaluationResult } from '@/lib/types';

interface EvaluationPanelProps {
  question: Question;
  level?: DifficultyLevel;
}

export default function EvaluationPanel({ question, level }: EvaluationPanelProps) {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEvaluate = async () => {
    const answer = localStorage.getItem(`answer-${question.id}`) || '';
    
    if (!answer.trim()) {
      setError('Odpowiedź nie może być pusta');
      return;
    }

    setIsEvaluating(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          answer,
          level: level || question.level,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to evaluate answer');
      }

      const data: EvaluationResult = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas oceny');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-zinc-900">
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
          Ewaluacja odpowiedzi
        </h3>
        <button
          onClick={handleEvaluate}
          disabled={isEvaluating}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          {isEvaluating ? 'Ocenianie...' : 'Oceń odpowiedź'}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
          </div>
        )}
        {isEvaluating && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-zinc-600 dark:text-zinc-400">
              Analizowanie odpowiedzi...
            </span>
          </div>
        )}
        {result && !isEvaluating && (
          <div className="space-y-6">
            {result.score !== undefined && (
              <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Ocena
                  </span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {result.score}/100
                  </span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${result.score}%` }}
                  ></div>
                </div>
              </div>
            )}
            <div>
              <h4 className="text-sm font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
                Feedback
              </h4>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                {result.feedback}
              </p>
            </div>
            {result.suggestions && result.suggestions.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
                  Sugestie poprawy
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
            {result.coveredTopics && result.coveredTopics.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2 text-green-700 dark:text-green-400">
                  Omówione tematy
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.coveredTopics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {result.missingTopics && result.missingTopics.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2 text-orange-700 dark:text-orange-400">
                  Brakujące tematy
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.missingTopics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {!result && !isEvaluating && !error && (
          <div className="flex items-center justify-center h-full text-zinc-500 dark:text-zinc-400">
            <p className="text-sm">Kliknij &quot;Oceń odpowiedź&quot;, aby otrzymać feedback</p>
          </div>
        )}
      </div>
    </div>
  );
}
