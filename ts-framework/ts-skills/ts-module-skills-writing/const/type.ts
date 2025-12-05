export interface Question {
  id: number;
  sentence: string;
  answer: string;
  hints: string[];
}

export interface QuizProgressProps {
  current: number;
  total: number;
  score: number;
  answered: number;
  progress: number;
}

export interface QuizResultProps {
  isCorrect: boolean;
  correctAnswer: string;
}

export interface QuizCompletionProps {
  score: number;
  total: number;
  onReset: () => void;
  answered: number;
  url: string;
  correctAnswers: number;
  incorrectAnswers: number;
}
