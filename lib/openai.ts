import OpenAI from 'openai';
import type { Question, DifficultyLevel, EvaluationResult } from './types';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function evaluateAnswer(
  question: Question,
  answer: string,
  level: DifficultyLevel
): Promise<EvaluationResult> {
  const prompt = `Jesteś ekspertem technicznym oceniającym odpowiedzi na pytania techniczne podczas rozmów rekrutacyjnych.

Pytanie: ${question.question}
Poziom trudności: ${level}
Kategoria: ${question.category}
${question.expectedTopics ? `Oczekiwane tematy: ${question.expectedTopics.join(', ')}` : ''}

Odpowiedź kandydata:
${answer}

Oceń odpowiedź kandydata według następujących kryteriów:
1. Poprawność merytoryczna
2. Kompletność odpowiedzi
3. Zrozumienie konceptu
4. Jakość wyjaśnienia
5. Pokrycie oczekiwanych tematów (jeśli podane)

Zwróć odpowiedź w formacie JSON:
{
  "score": <liczba 0-100>,
  "feedback": "<szczegółowy feedback w języku polskim>",
  "suggestions": ["<sugestia 1>", "<sugestia 2>", ...],
  "coveredTopics": ["<temat 1>", "<temat 2>", ...],
  "missingTopics": ["<temat 1>", "<temat 2>", ...]
}

Odpowiedz TYLKO w formacie JSON, bez dodatkowego tekstu.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Jesteś ekspertem technicznym oceniającym odpowiedzi na pytania techniczne. Zawsze odpowiadasz w formacie JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    const result = JSON.parse(content) as EvaluationResult;
    return result;
  } catch (error) {
    console.error('Error evaluating answer:', error);
    throw new Error('Failed to evaluate answer');
  }
}
