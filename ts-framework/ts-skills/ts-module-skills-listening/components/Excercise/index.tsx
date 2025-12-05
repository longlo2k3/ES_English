"use client";

import { useParams } from "next/navigation";
import React from "react";
import { useGetContentByTopicQuery } from "@/ts-framework/ts-skills/apis";
import { Col, Form, Row } from "antd";

import {
  QuizActions,
  QuizCompletion,
  QuizProgress,
} from "@/ts-framework/ts-skills/components/QuizCore";
import { useHookQuiz } from "@/ts-framework/ts-skills/hook/useHookQuiz";
import { QuizQuestion } from "./QuizQuestion";
import GlobalBackground from "@/ts-framework/ts-skills/components/GlobalBackground";
import SpinLoading from "@/ts-framework/ts-component/Spin";
import QuizResultScreen from "@/ts-framework/ts-skills/components/QuizCore/QuizResultScreen";

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
    correctAnswerCount,
    incorrectAnswerCount,
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
    skill_id: skill_id as any,
    level_id: level_id as any,
    topic_id: topic_id as any,
    form,
    type: "choice",
  });

  if (isLoading) {
    return <SpinLoading isLoading={isLoading} />;
  }

  return (
    <>
      {!isViewResult ? (
        <GlobalBackground
          title={
            <QuizProgress
              current={currentQuestionIndex + 1}
              total={totalQuestions}
              score={score}
              answered={answeredQuestionIds.size}
              progress={progress}
            />
          }
          resultScreen={
            <QuizResultScreen
              isCorrect={lastAnswer?.isCorrect as boolean}
              correctAnswerCount={correctAnswerCount}
              incorrectAnswerCount={incorrectAnswerCount}
              score={score}
              progress={progress}
              totalQuestions={totalQuestions}
              current={currentQuestionIndex + 1}
              answered={answeredQuestionIds.size}
            />
          }
          rollbackUrl="/skills/listening"
          isBodyCard>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "900px" }}>
            <QuizQuestion
              key={currentQuestionIndex}
              detailData={data}
              isLoading={isLoadingQuestion}
              isCorrect={lastAnswer?.isCorrect}
              isSkip={isSkip}
              correctAnswer={lastAnswer?.correctAnswer}
            />

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
        </GlobalBackground>
      ) : (
        <QuizCompletion
          score={score}
          total={totalQuestions}
          onReset={resetQuiz}
          answered={answeredQuestionIds.size}
          correctAnswers={correctAnswerCount}
          incorrectAnswers={incorrectAnswerCount}
          url="/skills/listening"
        />
      )}
    </>
  );
}

export default Excercise;
