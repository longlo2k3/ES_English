// // "use client";

// // import { useParams } from "next/navigation";
// // import React from "react";
// // import {
// //   useGetContentByTopicQuery,
// //   useGetTopicByTypeQuery,
// // } from "@/ts-framework/ts-skills/apis";
// // import { Form, Spin } from "antd";

// // import {
// //   QuizActions,
// //   QuizCompletion,
// //   QuizProgress,
// //   QuizResult,
// // } from "@/ts-framework/ts-component/QuizCore";
// // import { useHookQuiz } from "@/fer-framework/fe-cores/hooks/useHookQuiz";
// // import { QuizQuestion } from "./QuizQuestion";
// // import GlobalBackground from "@/ts-framework/ts-component/GlobalBackground";

// // function Excercise() {
// //   const params = useParams();
// //   const { topic_id } = params;

// //   const [form] = Form.useForm();

// //   const {
// //     data,
// //     currentQuestion,
// //     currentQuestionIndex,
// //     totalQuestions,
// //     showResult,
// //     score,
// //     progress,
// //     isLastQuestion,
// //     isQuizCompleted,
// //     answeredQuestionIds,
// //     lastAnswer,
// //     nextQuestion,
// //     resetQuiz,
// //     isLoading,
// //     onFinish,
// //   } = useHookQuiz({
// //     // useHookApi: useGetContentByTopicQuery,
// //     // paramsApi: {
// //     //   topic_id: topic_id,
// //     //   type: "READING_PASSAGE",
// //     // },
// //     // form,
// //     useHookApi: useGetTopicByTypeQuery,
// //     paramsApi: {
// //       type: "READING_PASSAGE",
// //     },
// //     form,
// //   });

// //   return isLoading ? (
// //     <div style={{ display: "flex", justifyContent: "center" }}>
// //       <Spin spinning={isLoading} />
// //     </div>
// //   ) : (
// //     <GlobalBackground
// //       rollbackUrl="/skills/reading"
// //       title="English Reading Practice"
// //       description="Flip the card to see the answer."
// //       isBodyCard>
// //       <Form form={form} layout="vertical" onFinish={onFinish}>
// //         <QuizProgress
// //           current={currentQuestionIndex + 1}
// //           total={totalQuestions}
// //           score={score}
// //           answered={answeredQuestionIds.size}
// //           progress={progress}
// //         />

// //         <QuizQuestion question={data} />

// //         {showResult && lastAnswer && (
// //           <QuizResult
// //             isCorrect={lastAnswer.isCorrect}
// //             correctAnswer={currentQuestion?.answer}
// //           />
// //         )}

// //         <QuizActions
// //           showResult={showResult}
// //           isLastQuestion={isLastQuestion}
// //           onNext={nextQuestion}
// //           onReset={resetQuiz}
// //         />
// //       </Form>

// //       {/* {isQuizCompleted && (
// //         <QuizCompletion score={score} total={totalQuestions} />
// //       )} */}
// //     </GlobalBackground>
// //   );
// // }

// // export default Excercise;
// "use client";

// import { useParams } from "next/navigation";
// import React from "react";
// import {
//   useGetContentByTopicQuery,
//   useGetTopicByTypeQuery,
// } from "@/ts-framework/ts-skills/apis";
// import { Form, Spin } from "antd";

// import {
//   QuizActions,
//   QuizCompletion,
//   QuizProgress,
//   QuizResult,
// } from "@/ts-framework/ts-component/QuizCore";
// import { useHookQuiz } from "@/fer-framework/fe-cores/hooks/useHookQuiz";
// import { QuizQuestion } from "./QuizQuestion";
// import GlobalBackground from "@/ts-framework/ts-component/GlobalBackground";

// function Excercise() {
//   const params = useParams();
//   const { topic_id } = params;

//   const [form] = Form.useForm();

//   const {
//     data,
//     currentQuestionIndex,
//     totalQuestions,
//     showResult,
//     score,
//     progress,
//     isLastQuestion,
//     isQuizCompleted,
//     answeredQuestionIds,
//     lastAnswer,
//     nextQuestion,
//     resetQuiz,
//     isLoading,
//     onFinish,
//   } = useHookQuiz({
//     useHookApi: useGetTopicByTypeQuery,
//     paramsApi: {
//       type: "READING_PASSAGE",
//     },
//     form,
//   });

//   return isLoading ? (
//     <div style={{ display: "flex", justifyContent: "center" }}>
//       <Spin spinning={isLoading} />
//     </div>
//   ) : (
//     <GlobalBackground
//       rollbackUrl="/skills/reading"
//       title="English Reading Practice"
//       description="Flip the card to see the answer."
//       isBodyCard>
//       <Form form={form} layout="vertical" onFinish={onFinish}>
//         <QuizProgress
//           current={currentQuestionIndex + 1}
//           total={totalQuestions}
//           score={score}
//           answered={answeredQuestionIds.size}
//           progress={progress}
//         />

//         <QuizQuestion detailData={data} isLoading={isLoading} />

//         {showResult && lastAnswer && (
//           <QuizResult
//             isCorrect={lastAnswer.isCorrect}
//             correctAnswer={lastAnswer.correctAnswer}
//           />
//         )}

//         <QuizActions
//           showResult={showResult}
//           isLastQuestion={isLastQuestion}
//           onNext={nextQuestion}
//           onReset={resetQuiz}
//         />
//       </Form>
//       {/*
//       {isQuizCompleted && (
//         <QuizCompletion score={score} total={totalQuestions} />
//       )} */}
//     </GlobalBackground>
//   );
// }

// export default Excercise;

"use client";

import { useParams } from "next/navigation";
import React from "react";
import {
  useGetContentByTopicQuery,
  useGetTopicByTypeQuery,
} from "@/ts-framework/ts-skills/apis";
import { Form, Spin } from "antd";

import {
  QuizActions,
  QuizCompletion,
  QuizProgress,
  QuizResult,
} from "@/ts-framework/ts-skills/components/QuizCore";
import { useHookQuiz } from "@/fer-framework/fe-cores/hooks/useHookQuiz";
import { QuizQuestion } from "./QuizQuestion";
import GlobalBackground from "@/ts-framework/ts-skills/components/GlobalBackground";

function Excercise() {
  const params = useParams();
  const { topic_id, level_id, skill_id } = params;

  const [form] = Form.useForm();

  const {
    data,
    currentQuestionIndex,
    totalQuestions,
    showResult,
    score,
    progress,
    isLastQuestion,
    isQuizCompleted,
    isViewResult,
    answeredQuestionIds,
    lastAnswer,
    nextQuestion,
    resetQuiz,
    isLoading,
    onFinish,
    onViewResult,
  } = useHookQuiz({
    useHookApi: useGetContentByTopicQuery,
    paramsApi: {
      topic_id: topic_id,
      type: "READING_PASSAGE",
    },
    skill_id,
    level_id,
    topic_id,
    form,
    type: "choice",
  });

  return isLoading ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Spin spinning={isLoading} />
    </div>
  ) : (
    <GlobalBackground
      rollbackUrl="/skills/reading"
      title="English Reading Practice"
      description="Look at the picture and read the passage to answer the questions."
      isBodyCard>
      {!isViewResult ? (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <QuizProgress
            current={currentQuestionIndex + 1}
            total={totalQuestions}
            score={score}
            answered={answeredQuestionIds.size}
            progress={progress}
          />

          <QuizQuestion
            detailData={data}
            isLoading={isLoading}
            isCorrect={lastAnswer?.isCorrect}
            correctAnswer={lastAnswer?.correctAnswer}
          />

          {/* {showResult && lastAnswer && (
            <QuizResult
              isCorrect={lastAnswer.isCorrect}
              correctAnswer={lastAnswer.correctAnswer}
            />
          )} */}

          <QuizActions
            showResult={showResult}
            isLastQuestion={isLastQuestion}
            onNext={nextQuestion}
            onReset={resetQuiz}
            onViewResult={onViewResult}
          />
        </Form>
      ) : (
        <QuizCompletion
          score={score}
          total={totalQuestions}
          onReset={resetQuiz}
        />
      )}
    </GlobalBackground>
  );
}

export default Excercise;
