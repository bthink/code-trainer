'use client';

import { useRouter } from 'next/navigation';
import { getQuestionsByLevel, getRandomQuestion } from '@/lib/questions';
import type { DifficultyLevel, Question } from '@/lib/types';

interface NavigationBarProps {
  currentQuestion: Question;
  level?: DifficultyLevel;
}

export default function NavigationBar({ currentQuestion, level }: NavigationBarProps) {
  const router = useRouter();

  const handleNextQuestion = () => {
    const questions = getQuestionsByLevel(level || currentQuestion.level);
    const currentIndex = questions.findIndex((q) => q.id === currentQuestion.id);
    const nextIndex = (currentIndex + 1) % questions.length;
    const nextQuestion = questions[nextIndex];
    router.push(`/trainer/${nextQuestion.id}?level=${level || currentQuestion.level}`);
  };

  const handleRandomQuestion = () => {
    const question = getRandomQuestion(level || currentQuestion.level);
    if (question) {
      router.push(`/trainer/${question.id}?level=${level || currentQuestion.level}`);
    }
  };

  const handleBackToDashboard = () => {
    router.push('/');
  };

  return (
    <div className="px-6 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between">
      <button
        onClick={handleBackToDashboard}
        className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        ← Powrót do wyboru poziomu
      </button>
      <div className="flex gap-2">
        <button
          onClick={handleRandomQuestion}
          className="px-4 py-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          Losowe pytanie
        </button>
        <button
          onClick={handleNextQuestion}
          className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Następne pytanie →
        </button>
      </div>
    </div>
  );
}
