import type { Question, DifficultyLevel } from './types';

export const questions: Question[] = [
  // Junior level
  {
    id: 'junior-1',
    level: 'junior',
    category: 'JavaScript Basics',
    question: 'Co to jest closure w JavaScript?',
    hints: ['Pomyśl o zakresie zmiennych', 'Funkcja wewnątrz funkcji'],
    expectedTopics: ['scope', 'lexical scoping', 'function scope'],
  },
  {
    id: 'junior-2',
    level: 'junior',
    category: 'JavaScript Basics',
    question: 'Jaka jest różnica między `let`, `const` i `var`?',
    hints: ['Pomyśl o hoisting', 'Pomyśl o zakresie blokowym'],
    expectedTopics: ['variable declaration', 'hoisting', 'block scope', 'temporal dead zone'],
  },
  {
    id: 'junior-3',
    level: 'junior',
    category: 'JavaScript Basics',
    question: 'Co to jest hoisting w JavaScript?',
    hints: ['Pomyśl o kolejności wykonywania kodu', 'Jak działa interpreter'],
    expectedTopics: ['hoisting', 'execution context', 'variable hoisting', 'function hoisting'],
  },
  // Mid level
  {
    id: 'mid-1',
    level: 'mid',
    category: 'JavaScript Advanced',
    question: 'Jak działa event loop w JavaScript?',
    hints: ['Pomyśl o kolejności wykonywania', 'Call stack vs callback queue'],
    expectedTopics: ['event loop', 'call stack', 'callback queue', 'microtasks', 'macrotasks'],
  },
  {
    id: 'mid-2',
    level: 'mid',
    category: 'JavaScript Advanced',
    question: 'Jaka jest różnica między `==` i `===`?',
    hints: ['Pomyśl o konwersji typów', 'Type coercion'],
    expectedTopics: ['type coercion', 'strict equality', 'loose equality', 'type conversion'],
  },
  {
    id: 'mid-3',
    level: 'mid',
    category: 'JavaScript Advanced',
    question: 'Jak działa prototyp w JavaScript?',
    hints: ['Prototype chain', 'Inheritance'],
    expectedTopics: ['prototype', 'prototype chain', 'inheritance', '__proto__', 'Object.create'],
  },
  // Senior level
  {
    id: 'senior-1',
    level: 'senior',
    category: 'JavaScript Performance',
    question: 'Wyjaśnij garbage collection w JavaScript',
    hints: ['Mark and sweep', 'Memory management'],
    expectedTopics: ['garbage collection', 'memory management', 'mark and sweep', 'memory leaks'],
  },
  {
    id: 'senior-2',
    level: 'senior',
    category: 'JavaScript Patterns',
    question: 'Jak zaimplementować debounce/throttle?',
    hints: ['Timing functions', 'Event optimization'],
    expectedTopics: ['debounce', 'throttle', 'performance optimization', 'event handling'],
  },
  {
    id: 'senior-3',
    level: 'senior',
    category: 'React Performance',
    question: 'Jak optymalizować wydajność w React?',
    hints: ['Re-rendering', 'Memoization'],
    expectedTopics: ['React.memo', 'useMemo', 'useCallback', 'code splitting', 'lazy loading'],
  },
];

export function getQuestionsByLevel(level: DifficultyLevel): Question[] {
  return questions.filter((q) => q.level === level);
}

export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}

export function getRandomQuestion(level: DifficultyLevel): Question | undefined {
  const levelQuestions = getQuestionsByLevel(level);
  if (levelQuestions.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * levelQuestions.length);
  return levelQuestions[randomIndex];
}
