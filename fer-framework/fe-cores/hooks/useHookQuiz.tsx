import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { FormInstance, message } from "antd";
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
  const { useHookApi, paramsApi, form, type, skill_id, level_id, topic_id } =
    props;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState(
    new Set<string>()
  );
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

  const [postStartQuestion] = useStartQuestionMutation();
  const [postAnswerQuestion] = useAnswerQuestionMutation();
  const [postSubmitQuestion] = useSubmitQuestionMutation();

  const isLastQuestion = useMemo(
    () => currentQuestionIndex === totalQuestions - 1,
    [currentQuestionIndex, totalQuestions]
  );
  const progress = useMemo(
    () => (answeredQuestionIds.size / totalQuestions) * 100,
    [answeredQuestionIds, totalQuestions]
  );
  const isQuizCompleted = useMemo(
    () => answeredQuestionIds.size === totalQuestions,
    [answeredQuestionIds, totalQuestions]
  );

  const onFinish = useCallback(
    async (values: { chosen_option_id: string }) => {
      const { chosen_option_id } = values;

      const currentQuestion = detailData?.questions?.[0];
      if (!currentQuestion || !currentQuestion._id) {
        message.error("Không tìm thấy dữ liệu câu hỏi.");
        return;
      }
      const question_id = currentQuestion._id;

      try {
        const startData = await postStartQuestion({
          skill_id: skill_id,
          level_id: level_id,
          topic_id: topic_id,
          content_item_id: detailData?.item?._id,
          attempt_scope: "CONTENT",
        }).unwrap();

        const attempt_id = startData?._id;
        if (!attempt_id) {
          message.error("Không thể bắt đầu lượt làm bài.");
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
          correctAnswerOption?.text || "Không tìm thấy đáp án đúng";

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
        message.error("Đã xảy ra lỗi khi nộp bài. Vui lòng thử lại.");
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
    ]
  );

  const nextQuestion = useCallback(() => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      message.info("Bạn đã hoàn thành tất cả câu hỏi!");
    }
  }, [isLastQuestion]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestionIds(new Set());
    setLastAnswer(null);
    form.resetFields();
  }, [form]);

  useEffect(() => {
    setShowResult(false);
    setLastAnswer(null);
    form.resetFields();
  }, [currentQuestionIndex, form]);

  // const onRefresh = useCallback(() => refetch(), [refetch]);

  const [isViewResult, setIsViewResult] = useState(false);

  const onViewResult = () => {
    setIsViewResult(true);
  };
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
    isLoading: passagesLoading || detailLoading,
    isViewResult,
    // onRefresh,
    onViewResult,
    onFinish,
    nextQuestion,
    resetQuiz,
  };
};
