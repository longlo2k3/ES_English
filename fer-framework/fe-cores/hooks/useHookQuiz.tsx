import { useState, useMemo, useCallback, useEffect } from "react";
import { FormInstance, message } from "antd";
import { useTranslation } from "react-i18next";
import { useFetchContentDetail } from "@/fer-framework/fe-cores/utils";
import {
  useAnswerQuestionMutation,
  useStartQuestionMutation,
  useSubmitQuestionMutation,
} from "@/ts-framework/ts-skills/apis";

interface IProps {
  useHookApi: any;
  paramsApi?: any;
  skill_id?: any;
  level_id?: any;
  topic_id?: any;
  form: FormInstance;
  type: "choice" | "document";
}

export const useHookQuiz = (props: IProps) => {
  const { t } = useTranslation();
  const { useHookApi, paramsApi, form, type, skill_id, level_id, topic_id } =
    props;

  const [isViewResult, setIsViewResult] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState(
    new Set<string>()
  );

  const [isSkip, setIsSkip] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<{
    isCorrect: boolean;
    correctAnswer: string;
  } | null>(null);

  const {
    data: passagesData,
    isLoading: passagesLoading,
    refetch,
  } = useHookApi(paramsApi, {
    skip: !paramsApi,
  });

  const passages = useMemo(() => passagesData?.items || [], [passagesData]);
  const totalQuestions = useMemo(() => passages.length, [passages]);
  const currentPassage = useMemo(
    () => passages[currentQuestionIndex],
    [passages, currentQuestionIndex]
  );

  // call API
  const { data: detailData, loading: detailLoading } = useFetchContentDetail(
    currentPassage?._id
  );

  const [postStartQuestion, { isLoading: startLoading }] =
    useStartQuestionMutation();
  const [postAnswerQuestion, { isLoading: answerLoading }] =
    useAnswerQuestionMutation();
  const [postSubmitQuestion, { isLoading: submitLoading }] =
    useSubmitQuestionMutation();

  const isLastQuestion = useMemo(
    () => currentQuestionIndex === totalQuestions - 1,
    [currentQuestionIndex, totalQuestions]
  );

  useEffect(() => {
    setProgress((answeredQuestionIds.size / totalQuestions) * 100);
  }, [answeredQuestionIds, totalQuestions]);
  // const progress = useMemo(
  //   () => (answeredQuestionIds.size / totalQuestions) * 100,
  //   [answeredQuestionIds, totalQuestions]
  // );
  const isQuizCompleted = useMemo(
    () => answeredQuestionIds.size === totalQuestions,
    [answeredQuestionIds, totalQuestions]
  );

  const onFinish = useCallback(
    async (values: { chosen_option_id: string }) => {
      const { chosen_option_id } = values;

      const currentQuestion = (detailData as any)?.questions?.[0];
      if (!currentQuestion || !currentQuestion._id) {
        message.error(t("quiz.errors.noQuestionData"));
        return;
      }
      const question_id = currentQuestion._id;

      try {
        const startData = await postStartQuestion({
          skill_id: skill_id,
          level_id: level_id,
          topic_id: topic_id,
          content_item_id: (detailData as any)?.item?._id,
          attempt_scope: "CONTENT",
        }).unwrap();

        const attempt_id = startData?._id;
        if (!attempt_id) {
          message.error(t("quiz.errors.cannotStartAttempt"));
          return;
        }
        const answerRes = await postAnswerQuestion({
          attempt_id: attempt_id,
          question_id: question_id,
          chosen_option_id: chosen_option_id,
          answer_text: null,
        }).unwrap();

        const submitRes = await postSubmitQuestion({
          attempt_id: attempt_id,
        }).unwrap();

        const correctAnswerOption = currentQuestion?.options?.find(
          (option: any) => option.is_correct === true
        );
        const correctAnswerText =
          correctAnswerOption?.text || t("quiz.errors.noCorrectAnswerFound");

        setLastAnswer({
          isCorrect: answerRes.is_correct,
          correctAnswer: correctAnswerText,
        });

        setScore((p) => p + submitRes.totalScore);

        setAnsweredQuestionIds((prevSet) => {
          const newSet = new Set(prevSet);
          newSet.add(question_id);
          return newSet;
        });

        setShowResult(true);
      } catch (error) {
        console.error("Lỗi khi nộp bài:", error);
        message.error(t("quiz.errors.submitFailed"));
      }
    },
    [
      detailData,
      skill_id,
      level_id,
      topic_id,
      postStartQuestion,
      postAnswerQuestion,
      postSubmitQuestion,
      setLastAnswer,
      setScore,
      setAnsweredQuestionIds,
      setShowResult,
      t,
    ]
  );

  const nextQuestion = useCallback(() => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setIsSkip(false);
    } else {
      message.info(t("quiz.info.completedAllQuestions"));
    }
  }, [isLastQuestion, t]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestionIds(new Set());
    setLastAnswer(null);
    form.resetFields();
    setIsSkip(false);
    setIsViewResult(false);
  }, [form]);

  useEffect(() => {
    setShowResult(false);
    setLastAnswer(null);
    form.resetFields();
  }, [currentQuestionIndex, form]);

  // const onRefresh = useCallback(() => refetch(), [refetch]);

  const onViewResult = () => {
    setIsViewResult(true);
  };

  const onSkip = useCallback(() => {
    setIsSkip(true);
    setProgress((prevProgress) => prevProgress + 100 / totalQuestions);
    setAnsweredQuestionIds((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.add((detailData as any)?.questions?.[0]?._id);
      return newSet;
    });
    form.resetFields();
  }, [isSkip, detailData, form, answeredQuestionIds]);

  return {
    data: detailData,
    currentPassage,
    currentQuestionIndex,
    totalQuestions,
    showResult,
    score,
    progress,
    isLastQuestion,
    isQuizCompleted,
    answeredQuestionIds,
    lastAnswer,
    isSkip,
    isLoading: passagesLoading,
    isLoadingQuestion: detailLoading,
    isLoadingButton: startLoading || answerLoading || submitLoading,
    isViewResult,
    // onRefresh,
    onSkip,
    onViewResult,
    onFinish,
    nextQuestion,
    resetQuiz,
  };
};
