// import { useState } from "react";
// import { Card, message, Typography, Form } from "antd";

// import { createStyles } from "antd-style";

// import {
//   QuizActions,
//   QuizCompletion,
//   QuizHeader,
//   QuizProgress,
//   QuizQuestion,
//   QuizResult,
// } from "@/ts-framework/ts-component/QuizCore";
// import { ArrowLeftOutlined } from "@ant-design/icons";
// import Link from "next/link";

// const { Title, Paragraph } = Typography;

// interface Question {
//   id: number;
//   sentence: string;
//   answer: string;
// }

// const questions: Question[] = [
//   {
//     id: 1,
//     sentence: "I _____ to the store yesterday.",
//     answer: "went",
//   },
//   {
//     id: 2,
//     sentence: "She _____ studying English for three years.",
//     answer: "has been",
//   },
//   {
//     id: 3,
//     sentence: "If I _____ rich, I would travel the world.",
//     answer: "were",
//   },
//   {
//     id: 4,
//     sentence: "The book _____ by millions of people.",
//     answer: "was read",
//   },
//   {
//     id: 5,
//     sentence: "They _____ their homework before dinner.",
//     answer: "had finished",
//   },
// ];

// function BeginnerExcercise() {
//   const [currentQuestion, setCurrentQuestion] = useState(2);
//   const [userAnswer, setUserAnswer] = useState("");
//   const [showResult, setShowResult] = useState(false);
//   const [score, setScore] = useState(0);
//   const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

//   const [form] = Form.useForm();

//   const question = questions[currentQuestion];
//   const progress = (answeredQuestions.length / questions.length) * 100;

//   const { styles } = useStyles();

//   const nextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setUserAnswer("");
//       setShowResult(false);
//     } else {
//       message.info("Bạn đã hoàn thành tất cả câu hỏi!");
//     }
//   };

//   const resetQuiz = () => {
//     setCurrentQuestion(0);
//     setUserAnswer("");
//     setShowResult(false);
//     setScore(0);
//     setAnsweredQuestions([]);
//   };

//   const isCorrect =
//     userAnswer.trim().toLowerCase() === question.answer.toLowerCase();

//   return (
//     <div className={styles.container}>
//       <Link href="/skills/writing" className={styles.rollback}>
//         <ArrowLeftOutlined /> Quay lại
//       </Link>
//       <div className={styles.maxWidth}>
//         <QuizHeader
//           title="English Writing Practice"
//           description="Luyện tập điền từ vào chỗ trống"
//         />

//         <Card className={styles.card}>
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={(values) =>
//               console.log("values>>", {
//                 ...values,
//                 id: question.id,
//               })
//             }>
//             <QuizProgress
//               current={currentQuestion + 1}
//               total={questions.length}
//               score={score}
//               answered={answeredQuestions.length}
//               progress={progress}
//             />

//             <QuizQuestion
//               question={question}
//               userAnswer={userAnswer}
//               onAnswerChange={setUserAnswer}
//               disabled={showResult}
//             />

//             {showResult && (
//               <QuizResult
//                 isCorrect={isCorrect}
//                 correctAnswer={question.answer}
//               />
//             )}

//             <QuizActions
//               showResult={showResult}
//               isLastQuestion={currentQuestion === questions.length - 1}
//               onNext={nextQuestion}
//               onReset={resetQuiz}
//             />
//           </Form>
//         </Card>

//         {answeredQuestions.length === questions.length && (
//           <QuizCompletion score={score} total={questions.length} />
//         )}
//       </div>
//     </div>
//   );
// }

// export default BeginnerExcercise;

// const useStyles = createStyles(({ token, css }) => ({
//   container: {
//     minHeight: "100vh",
//     background: "#f0f8ffb3",
//     padding: "32px 16px",
//     borderRadius: "8px",
//   },
//   maxWidth: {
//     maxWidth: "768px",
//     margin: "0 auto",
//   },
//   card: {
//     boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
//     marginBottom: "24px",
//   },
//   rollback: css`
//     margin-bottom: 16px;
//     color: ${token.colorPrimary} !important;
//   `,
// }));
import { Card, message, Typography, Form } from "antd";
import { createStyles } from "antd-style";
import {
  QuizActions,
  QuizCompletion,
  QuizHeader,
  QuizProgress,
  QuizQuestion,
  QuizResult,
} from "@/ts-framework/ts-skills/components/QuizCore";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";

// Import hook vừa tạo

import { useEffect } from "react"; // Cần cho effect reset form
import { useQuiz } from "@/fer-framework/fe-cores/hooks/useHookQuiz";

// Giả sử bạn có component Loading
// import { LoadingSpinner } from "@/components/LoadingSpinner";
// Giả sử bạn có hook useApi
// import { useApi } from "@/hooks/useApi";

const { Title, Paragraph } = Typography;

interface Question {
  id: number;
  sentence: string;
  answer: string;
}

// Dữ liệu này sẽ đến từ `useApi` của bạn
const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    sentence: "I _____ to the store yesterday.",
    answer: "went",
  },
  {
    id: 2,
    sentence: "She _____ studying English for three years.",
    answer: "has been",
  },
  {
    id: 3,
    sentence: "If I _____ rich, I would travel the world.",
    answer: "were",
  },
  {
    id: 4,
    sentence: "The book _____ by millions of people.",
    answer: "was read",
  },
  {
    id: 5,
    sentence: "They _____ their homework before dinner.",
    answer: "had finished",
  },
];

/**
 * Component Cha: Chịu trách nhiệm fetch dữ liệu
 */
function BeginnerExcercise() {
  // ---- BƯỚC 1: LẤY DỮ LIỆU TỪ API ----
  // Đây là nơi bạn dùng useApi.
  // Tôi sẽ giả lập kết quả trả về của nó.
  // const { data: questions, isLoading, error } = useApi<Question[]>("/api/quiz/beginner");

  // Giả lập
  const {
    data: questions,
    isLoading,
    error,
  } = {
    data: MOCK_QUESTIONS,
    isLoading: false,
    error: null,
  };

  const { styles } = useStyles();

  // ---- BƯỚC 2: XỬ LÝ TRẠNG THÁI LOADING/ERROR ----
  if (isLoading) {
    // return <LoadingSpinner />; // Hiển thị loading
    return <div className={styles.container}>Đang tải...</div>;
  }

  if (error || !questions || questions.length === 0) {
    return <div className={styles.container}>Không thể tải bài tập.</div>;
  }

  // ---- BƯỚC 3: RENDER COMPONENT CON VỚI DỮ LIỆU ----
  // Chúng ta truyền `questions` vào component con
  // để hook `useQuiz` có thể được gọi một cách an toàn
  return <QuizContent questions={questions} />;
}

/**
 * Component Con: Chứa toàn bộ logic và UI của Quiz
 */
interface QuizContentProps {
  questions: Question[];
}

function QuizContent({ questions }: QuizContentProps) {
  const [form] = Form.useForm();
  const { styles } = useStyles();

  // ---- BƯỚC 4: GỌI CUSTOM HOOK ----
  // Tất cả logic state (useState, v.v.) giờ đã nằm trong hook này
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    showResult,
    score,
    progress,
    isLastQuestion,
    isQuizCompleted,
    answeredQuestionIds,
    lastAnswer,
    nextQuestion,
    resetQuiz,
  } = useQuiz(questions, form);

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
          {/* ---- BƯỚC 5: KẾT NỐI FORM VÀ HOOK ---- */}
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) =>
              // console.log("values", {
              //   ...values,
              //   id: currentQuestion.id,
              // })
              nextQuestion()
            }>
            <QuizProgress
              current={currentQuestionIndex + 1}
              total={totalQuestions}
              score={score}
              answered={answeredQuestionIds.size}
              progress={progress}
            />

            <QuizQuestion question={currentQuestion} disabled={showResult} />

            {showResult && lastAnswer && (
              <QuizResult
                isCorrect={lastAnswer.isCorrect}
                correctAnswer={currentQuestion.answer}
              />
            )}

            <QuizActions
              showResult={showResult}
              isLastQuestion={isLastQuestion}
              onNext={nextQuestion}
              onReset={resetQuiz}
            />
          </Form>
        </Card>

        {isQuizCompleted && (
          <QuizCompletion score={score} total={totalQuestions} />
        )}
      </div>
    </div>
  );
}

export default BeginnerExcercise;

// useStyles giữ nguyên
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
