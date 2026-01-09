'use client';

import { useRouter } from 'next/navigation';
import { getRandomQuestion } from '@/lib/questions';
import type { DifficultyLevel } from '@/lib/types';

const difficultyOptions: { value: DifficultyLevel; label: string; description: string }[] = [
  {
    value: 'junior',
    label: 'Junior',
    description: 'Podstawowe koncepty i składnia',
  },
  {
    value: 'mid',
    label: 'Mid',
    description: 'Zaawansowane tematy i wzorce',
  },
  {
    value: 'senior',
    label: 'Senior',
    description: 'Zaawansowana optymalizacja i architektura',
  },
];

export default function DifficultySelector() {
  const router = useRouter();

  const handleSelect = (level: DifficultyLevel) => {
    const question = getRandomQuestion(level);
    if (question) {
      router.push(`/trainer/${question.id}?level=${level}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-4 text-black dark:text-zinc-50">
          Code Trainer
        </h1>
        <p className="text-center mb-12 text-zinc-600 dark:text-zinc-400">
          Wybierz poziom trudności, aby rozpocząć trening
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {difficultyOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="p-6 rounded-lg border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors text-left group"
            >
              <h2 className="text-2xl font-semibold mb-2 text-black dark:text-zinc-50 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
                {option.label}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {option.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
