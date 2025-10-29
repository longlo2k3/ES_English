"use client";

import { useParams } from "next/navigation";
import React from "react";
import { useGetContentByTopicQuery } from "@/ts-framework/ts-skills/apis";
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
  const { topic_id } = params;

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
    answeredQuestionIds,
    lastAnswer,
    nextQuestion,
    resetQuiz,
    isLoading,
    onFinish,
  } = useHookQuiz({
    useHookApi: useGetContentByTopicQuery,
    paramsApi: {
      topic_id: topic_id,
      type: "LISTENING_AUDIO",
    },
    form,
    type: "document",
  });

  return isLoading ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Spin spinning={isLoading} />
    </div>
  ) : (
    <GlobalBackground
      rollbackUrl="/skills/listening"
      title="English FlashCard Practice"
      description="Flip the card to see the answer."
      isBodyCard>
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) =>
          console.log("values", {
            ...values,
            id: data?._id,
          })
        }>
        <QuizProgress
          current={currentQuestionIndex + 1}
          total={totalQuestions}
          score={score}
          answered={answeredQuestionIds.size}
          progress={progress}
        />

        <QuizQuestion question={data} />

        {showResult && lastAnswer && (
          <QuizResult
            isCorrect={lastAnswer.isCorrect}
            correctAnswer={lastAnswer.correctAnswer}
          />
        )}

        <QuizActions
          showResult={showResult}
          isLastQuestion={isLastQuestion}
          onNext={nextQuestion}
          onReset={resetQuiz}
        />
      </Form>

      {/* {isQuizCompleted && (
        <QuizCompletion score={score} total={totalQuestions} />
      )} */}
    </GlobalBackground>
  );
}

export default Excercise;
