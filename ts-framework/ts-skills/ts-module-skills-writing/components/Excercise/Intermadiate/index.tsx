import { useState } from "react";
import { Card, message, Typography, Form } from "antd";

import { createStyles } from "antd-style";

import {
  QuizActions,
  QuizCompletion,
  QuizHeader,
  QuizProgress,
  QuizResult,
} from "@/ts-framework/ts-skills/components/QuizCore";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { QuizQuestion } from "./QuizQuestion";

const { Title, Paragraph } = Typography;

interface Question {
  id: number;
  url: string;
  options?: any;
}

const questions: Question[] = [
  {
    id: 1,
    url: "",
    options: [
      {
        label: "Milk",
        img: "https://emoji.slack-edge.com/T01B/5f16f0d72cfd0.png",
      },
      {
        label: "Tea",
        img: "https://emoji.slack-edge.com/T01B/5f16f0d72cfd1.png",
      },
      {
        label: "Wine",
        img: "https://emoji.slack-edge.com/T01B/5f16f0d72cfd2.png",
      },
      {
        label: "Coffee",
        img: "https://emoji.slack-edge.com/T01B/5f16f0d72cfd3.png",
      },
    ],
  },
];

function Intermadiate() {
  const [currentQuestion, setCurrentQuestion] = useState(2);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const [form] = Form.useForm();

  const question = questions[currentQuestion];
  const progress = (answeredQuestions.length / questions.length) * 100;

  const { styles } = useStyles();

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer("");
      setShowResult(false);
    } else {
      message.info("Bạn đã hoàn thành tất cả câu hỏi!");
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswer("");
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const isCorrect =
    userAnswer.trim().toLowerCase() === question.answer.toLowerCase();

  return (
    <div className={styles.container}>
      <Link href="/skills/writing" className={styles.rollback}>
        <ArrowLeftOutlined /> Quay lại
      </Link>
      <div className={styles.maxWidth}>
        <QuizHeader
          title="English Writing Practice"
          description="Luyện tập điền từ vào chỗ trống"
        />

        <Card className={styles.card}>
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) =>
              console.log("values>>", {
                ...values,
                id: question.id,
              })
            }>
            <QuizProgress
              current={currentQuestion + 1}
              total={questions.length}
              score={score}
              answered={answeredQuestions.length}
              progress={progress}
            />

            <QuizQuestion />

            {showResult && (
              <QuizResult
                isCorrect={isCorrect}
                correctAnswer={question.answer}
              />
            )}

            <QuizActions
              showResult={showResult}
              isLastQuestion={currentQuestion === questions.length - 1}
              onNext={nextQuestion}
              onReset={resetQuiz}
            />
          </Form>
        </Card>

        {answeredQuestions.length === questions.length && (
          <QuizCompletion score={score} total={questions.length} />
        )}
      </div>
    </div>
  );
}

export default Intermadiate;

const useStyles = createStyles(({ token, css }) => ({
  container: {
    minHeight: "100vh",
    background: "#f0f8ffb3",
    padding: "32px 16px",
    borderRadius: "8px",
  },
  maxWidth: {
    maxWidth: "768px",
    margin: "0 auto",
  },
  card: {
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    marginBottom: "24px",
  },
  rollback: css`
    margin-bottom: 16px;
    color: ${token.colorPrimary} !important;
  `,
}));
