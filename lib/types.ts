export type DifficultyLevel = 'junior' | 'mid' | 'senior';

export interface Question {
  id: string;
  level: DifficultyLevel;
  category: string;
  question: string;
  hints?: string[];
  expectedTopics?: string[];
}

export interface EvaluationResult {
  score?: number;
  feedback: string;
  suggestions?: string[];
  coveredTopics?: string[];
  missingTopics?: string[];
}

export interface EvaluationRequest {
  question: Question;
  answer: string;
  level: DifficultyLevel;
}
