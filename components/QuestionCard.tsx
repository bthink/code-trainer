import type { Question } from '@/lib/types';

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 uppercase">
            {question.level}
          </span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {question.category}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
          Pytanie
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-base leading-relaxed text-zinc-800 dark:text-zinc-200 mb-6">
          {question.question}
        </p>
        {question.hints && question.hints.length > 0 && (
          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-sm font-semibold mb-3 text-zinc-700 dark:text-zinc-300">
              Podpowiedzi:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              {question.hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
