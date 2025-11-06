import { useState, useMemo, useCallback, useEffect } from "react";
import { FormInstance, message } from "antd";
import { useTranslation } from "react-i18next";
import {
  htmlToText,
  useFetchContentDetail,
} from "@/fer-framework/fe-cores/utils";
import {
  useAnswerQuestionMutation,
  useResultsQuestionMutation,
  useStartQuestionMutation,
  useSubmitQuestionMutation,
} from "@/ts-framework/ts-skills/apis";
import { useHookGemini } from "@/ts-framework/ts-skills/hook/useHookGeminiAI";
import { promptNoEmpty, promptEmpty, promptSpeaking } from "../constants";

interface IProps {
  useHookApi: any;
  paramsApi?: any;
  skill_id?: any;
  level_id?: any;
  topic_id?: any;
  form: FormInstance;
  type: "choice" | "document" | "audio";
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
  const [comment, setComment] = useState("");

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
  const [resultsQuestion, { isLoading: resultsLoading }] =
    useResultsQuestionMutation();

  const {
    callGeminiApi,
    data: geminiData,
    isLoading: isLoadingGemini,
  } = useHookGemini();

  const isLastQuestion = useMemo(
    () => currentQuestionIndex === totalQuestions - 1,
    [currentQuestionIndex, totalQuestions]
  );

  useEffect(() => {
    if (totalQuestions > 0) {
      setProgress((answeredQuestionIds.size / totalQuestions) * 100);
    } else {
      setProgress(0);
    }
  }, [answeredQuestionIds, totalQuestions]);

  const isQuizCompleted = useMemo(
    () => totalQuestions > 0 && answeredQuestionIds.size === totalQuestions,
    [answeredQuestionIds, totalQuestions]
  );

  const onFinish = useCallback(
    async (values: { chosen_option_id: string; content: string }) => {
      const currentQuestion = (detailData as any)?.questions?.[0];

      if (type === "choice") {
        if (!currentQuestion || !currentQuestion._id) {
          message.error(t("quiz.errors.noQuestionData"));
          return;
        }
        const question_id = currentQuestion._id;
        const { chosen_option_id } = values;
        if (!chosen_option_id) {
          message.error(t("quiz.errors.noChoice"));
          return;
        }

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
      } else if (type === "document") {
        try {
          const { score, comment, isCorrect } = await callGeminiApi(
            promptNoEmpty(values)
          );

          setComment(comment);

          setShowResult(true);
          setLastAnswer({
            isCorrect: isCorrect,
            correctAnswer: comment,
          });

          setScore((p) => p + score);

          // setAnsweredQuestionIds((prevSet) => {
          //   const newSet = new Set(prevSet);
          //   newSet.add(question_id);
          //   return newSet;
          // });
        } catch (error) {
          console.error("Lỗi khi gọi Gemini:", error);
          message.error(
            t("quiz.errors.geminiFailed", "Không thể gọi AI để chấm điểm")
          );
        }
      } else if (type === "audio") {
        try {
          const { score, comment, isCorrect } = await callGeminiApi(
            promptSpeaking(values)
          );

          setComment(comment);

          setShowResult(true);
          setLastAnswer({
            isCorrect: isCorrect,
            correctAnswer: comment,
          });

          setScore((p) => p + score);

          // setAnsweredQuestionIds((prevSet) => {
          //   const newSet = new Set(prevSet);
          //   newSet.add(question_id);
          //   return newSet;
          // });
        } catch (error) {
          console.error("Lỗi khi gọi Gemini:", error);
          message.error(
            t("quiz.errors.geminiFailed", "Không thể gọi AI để chấm điểm")
          );
        }
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
      geminiData,
      t,
      type,
      callGeminiApi,
      geminiData,
    ]
  );

  // Lưu kết quả cuối cùng
  useEffect(() => {
    if (
      (isQuizCompleted && type === "document" && totalQuestions > 0) ||
      (isQuizCompleted && type === "audio" && totalQuestions > 0)
    ) {
      const finalScore = (score / (totalQuestions * 10)) * 10;

      resultsQuestion({
        topic_id: topic_id,
        score: finalScore,
        band_score: 0,
        feedback: comment,
      })
        .unwrap()
        .then(() => {
          console.log("Lưu kết quả cuối cùng thành công!");
        })
        .catch((err) => console.error("Lỗi khi lưu kết quả cuối cùng:", err));
    }
  }, [
    isQuizCompleted,
    type,
    totalQuestions,
    score,
    comment,
    topic_id,
    resultsQuestion,
  ]);

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

  const onViewResult = () => {
    setIsViewResult(true);
  };

  // const onSkip = useCallback(() => {
  //   setIsSkip(true);
  //   if (totalQuestions > 0) {
  //     setProgress((prevProgress) => prevProgress + 100 / totalQuestions);
  //   }
  //   setAnsweredQuestionIds((prevSet) => {
  //     const newSet = new Set(prevSet);
  //     const qId = (detailData as any)?.questions?.[0]?._id;
  //     if (qId) newSet.add(qId);
  //     return newSet;
  //   });
  //   form.resetFields();
  // }, [detailData, form, totalQuestions]);

  const onSkip = useCallback(async () => {
    // const currentQuestion = (detailData as any)?.questions?.[0];
    // if (!currentQuestion || !currentQuestion._id) {
    //   message.error(t("quiz.errors.noQuestionData"));
    //   return;
    // }
    // const question_id = currentQuestion._id;

    if (type === "choice") {
      const currentQuestion = (detailData as any)?.questions?.[0];
      if (!currentQuestion || !currentQuestion._id) {
        message.error(t("quiz.errors.noQuestionData"));
        return;
      }
      const question_id = currentQuestion._id;
      try {
        setIsSkip(true);
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
          chosen_option_id: null,
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
        console.error("Lỗi khi skip (choice):", error);
        message.error(t("quiz.errors.submitFailed"));
      }
    } else if (type === "document") {
      const questionText = (detailData as any)?.item?.body_text;

      try {
        const geminiResult = await callGeminiApi(promptEmpty(questionText));

        if (!geminiResult) {
          throw new Error("Phản hồi từ AI không hợp lệ");
        }

        setIsSkip(true);

        setShowResult(true);
        setLastAnswer({
          isCorrect: false,
          correctAnswer: `Answer Correct: ${geminiResult?.answer}`,
        });

        setScore((p) => p + 0);

        // setAnsweredQuestionIds((prevSet) => {
        //   const newSet = new Set(prevSet);
        //   newSet.add(question_id);
        //   return newSet;
        // });
      } catch (error) {
        console.error("Lỗi khi gọi Gemini (skip):", error);
        message.error(
          t("quiz.errors.geminiFailed", "Không thể gọi AI để chấm điểm")
        );
      }
    } else if (type === "audio") {
      try {
        const questionText = (detailData as any)?.item?.body_text;

        const { score, comment, isCorrect } = await callGeminiApi(
          promptSpeaking(questionText)
        );

        setComment(comment);

        setShowResult(true);
        setLastAnswer({
          isCorrect: isCorrect,
          correctAnswer: comment,
        });

        setScore((p) => p + score);

        // setAnsweredQuestionIds((prevSet) => {
        //   const newSet = new Set(prevSet);
        //   newSet.add(question_id);
        //   return newSet;
        // });
      } catch (error) {
        console.error("Lỗi khi gọi Gemini:", error);
        message.error(
          t("quiz.errors.geminiFailed", "Không thể gọi AI để chấm điểm")
        );
      }
    }
  }, [
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
    type,
    callGeminiApi,
  ]);

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
    geminiData,
    isLoading: passagesLoading,
    isLoadingQuestion: detailLoading,
    isLoadingButton: startLoading || answerLoading || submitLoading,
    isLoadingGemini,
    isViewResult,
    onSkip,
    onViewResult,
    onFinish,
    nextQuestion,
    resetQuiz,
  };
};
