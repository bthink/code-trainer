import { notFound } from 'next/navigation';
import { getQuestionById } from '@/lib/questions';
import QuestionCard from '@/components/QuestionCard';
import MonacoEditor from '@/components/MonacoEditor';
import EvaluationPanel from '@/components/EvaluationPanel';
import NavigationBar from '@/components/NavigationBar';

interface TrainerPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ level?: string }>;
}

export default async function TrainerPage({ params, searchParams }: TrainerPageProps) {
  const { id } = await params;
  const { level } = await searchParams;
  const question = getQuestionById(id);

  if (!question) {
    notFound();
  }

  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-black">
      <NavigationBar currentQuestion={question} level={level as 'junior' | 'mid' | 'senior' | undefined} />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 min-w-[300px]">
          <QuestionCard question={question} />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <MonacoEditor questionId={id} />
          </div>
          <div className="h-1/2 min-h-[200px] border-t border-zinc-200 dark:border-zinc-800">
            <EvaluationPanel question={question} level={level as 'junior' | 'mid' | 'senior' | undefined} />
          </div>
        </div>
      </div>
    </div>
  );
}
