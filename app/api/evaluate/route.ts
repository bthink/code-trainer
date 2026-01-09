import { NextRequest, NextResponse } from 'next/server';
import { evaluateAnswer } from '@/lib/openai';
import type { EvaluationRequest } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: EvaluationRequest = await request.json();

    if (!body.question || !body.answer || !body.level) {
      return NextResponse.json(
        { error: 'Missing required fields: question, answer, level' },
        { status: 400 }
      );
    }

    if (typeof body.answer !== 'string' || body.answer.trim().length === 0) {
      return NextResponse.json(
        { error: 'Answer cannot be empty' },
        { status: 400 }
      );
    }

    const result = await evaluateAnswer(body.question, body.answer, body.level);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Evaluation error:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate answer. Please try again.' },
      { status: 500 }
    );
  }
}
