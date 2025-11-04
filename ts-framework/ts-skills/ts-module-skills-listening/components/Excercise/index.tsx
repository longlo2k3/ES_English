"use client";

import { useParams } from "next/navigation";
import React from "react";
import { useGetContentByTopicQuery } from "@/ts-framework/ts-skills/apis";
import { Form, Spin } from "antd";

import {
  QuizActions,
  QuizCompletion,
  QuizProgress,
} from "@/ts-framework/ts-skills/components/QuizCore";
import { useHookQuiz } from "@/fer-framework/fe-cores/hooks/useHookQuiz";
import { QuizQuestion } from "./QuizQuestion";
import GlobalBackground from "@/ts-framework/ts-skills/components/GlobalBackground";
import SpinLoading from "@/ts-framework/ts-component/Spin";

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
    isSkip,
    answeredQuestionIds,
    lastAnswer,
    nextQuestion,
    resetQuiz,
    isLoading,
    isLoadingButton,
    isLoadingQuestion,
    onFinish,
    onViewResult,
    onSkip,
  } = useHookQuiz({
    useHookApi: useGetContentByTopicQuery,
    paramsApi: {
      topic_id: topic_id,
      type: "LISTENING_AUDIO",
    },
    skill_id,
    level_id,
    topic_id,
    form,
    type: "choice",
  });

  return isLoading ? (
    <SpinLoading isLoading={isLoading} />
  ) : (
    <GlobalBackground rollbackUrl="/skills/listening" isBodyCard>
      {!isViewResult ? (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{
            height: "100%",
          }}>
          <QuizProgress
            current={currentQuestionIndex + 1}
            total={totalQuestions}
            score={score}
            answered={answeredQuestionIds.size}
            progress={progress}
          />

          <QuizQuestion
            key={currentQuestionIndex}
            detailData={data}
            isLoading={isLoadingQuestion}
            isCorrect={lastAnswer?.isCorrect}
            isSkip={isSkip}
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
            isCorrect={lastAnswer?.isCorrect}
            onSkip={onSkip}
            isSkip={isSkip}
            isLoading={isLoadingQuestion}
            isLoadingButton={isLoadingButton}
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
