import { useState, useMemo, useCallback, useEffect } from "react";
import { FormInstance, message } from "antd";
import { useTranslation } from "react-i18next";

import {
  useAnswerQuestionMutation,
  useResultsQuestionMutation,
  useStartQuestionMutation,
  useSubmitQuestionMutation,
} from "@/ts-framework/ts-skills/apis";
import { useHookGemini } from "@/ts-framework/ts-skills/hook/useHookGeminiAI";
import {
  promptNoEmpty,
  promptEmpty,
  promptSpeaking,
} from "../../../fer-framework/fe-cores/constants";
import { useFetchContentDetail } from "../utils";

type QuizType = "choice" | "document" | "audio";

interface IProps {
  useHookApi: any;
  paramsApi?: any;
  skill_id?: string;
  level_id?: string;
  topic_id?: string;
  form: FormInstance;
  type: QuizType;
}

interface AnswerResult {
  isCorrect: boolean;
  correctAnswer: string;
}

interface SubmitValues {
  chosen_option_id?: string;
  content?: string;
  result?: string;
}

export const useHookQuiz = (props: IProps) => {
  const { t } = useTranslation();
  const { useHookApi, paramsApi, form, type, skill_id, level_id, topic_id } =
    props;

  // ============ STATE MANAGEMENT ============
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isViewResult, setIsViewResult] = useState(false);
  const [isSkip, setIsSkip] = useState(false);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState(
    new Set<string>()
  );
  const [comment, setComment] = useState("");
  const [lastAnswer, setLastAnswer] = useState<AnswerResult | null>(null);
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
  const [incorrectAnswerCount, setIncorrectAnswerCount] = useState<number>(0);

  // ============ API HOOKS ============
  const {
    data: passagesData,
    isLoading: passagesLoading,
    refetch,
  } = useHookApi(paramsApi, { skip: !paramsApi });

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

  // ============ COMPUTED VALUES ============
  const passages = useMemo(() => passagesData?.items || [], [passagesData]);
  const totalQuestions = useMemo(() => passages.length, [passages]);
  const currentPassage = useMemo(
    () => passages[currentQuestionIndex],
    [passages, currentQuestionIndex]
  );
  const isLastQuestion = useMemo(
    () => currentQuestionIndex === totalQuestions - 1,
    [currentQuestionIndex, totalQuestions]
  );
  const isQuizCompleted = useMemo(
    () => totalQuestions > 0 && answeredQuestionIds.size === totalQuestions,
    [answeredQuestionIds, totalQuestions]
  );

  const { data: detailData, loading: detailLoading } = useFetchContentDetail(
    currentPassage?._id
  );

  const currentQuestion = useMemo(
    () => (detailData as any)?.questions?.[0],
    [detailData]
  );

  // ============ FUNCSTION COUNT CORRECT INCORRECT
  const handleSetCorrectAnswerCount = useCallback((isCorrect: boolean) => {
    if (isCorrect === true) {
      setCorrectAnswerCount((prevCount) => prevCount + 1);
    } else {
      setIncorrectAnswerCount((prevCount) => prevCount + 1);
    }
  }, []);

  // ============ EFFECTS ============
  // Update progress
  useEffect(() => {
    if (totalQuestions > 0) {
      setProgress((answeredQuestionIds.size / totalQuestions) * 100);
    } else {
      setProgress(0);
    }
  }, [answeredQuestionIds, totalQuestions]);

  // Save final results for document/audio types
  // useEffect(() => {
  //   if (!isQuizCompleted || totalQuestions === 0) return;
  //   if (type !== "document" && type !== "audio") return;

  //   const finalScore = (score / (totalQuestions * 10)) * 10;

  //   resultsQuestion({
  //     topic_id: topic_id,
  //     score: finalScore,
  //     band_score: 0,
  //     feedback: comment,
  //   })
  //     .unwrap()
  //     .then(() => {
  //       console.log("Final results saved successfully!");
  //     })
  //     .catch((err) => console.error("Error saving final results:", err));
  // }, [
  //   isQuizCompleted,
  //   type,
  //   totalQuestions,
  //   score,
  //   comment,
  //   topic_id,
  //   resultsQuestion,
  // ]);

  // Reset result state when question changes
  useEffect(() => {
    setShowResult(false);
    setLastAnswer(null);
    form.resetFields();
  }, [currentQuestionIndex, form]);

  // ============ HELPER FUNCTIONS ============
  const startAttempt = useCallback(async () => {
    const startData = await postStartQuestion({
      skill_id: skill_id as any,
      level_id: level_id as any,
      topic_id: topic_id as any,
      content_item_id: (detailData as any)?.item?._id,
      attempt_scope: "CONTENT",
    }).unwrap();

    const attempt_id = startData?._id;
    if (!attempt_id) {
      throw new Error(t("quiz.errors.cannotStartAttempt"));
    }
    return attempt_id;
  }, [postStartQuestion, skill_id, level_id, topic_id, detailData, t]);

  const submitAnswer = useCallback(
    async (
      attempt_id: string,
      question_id: string,
      chosen_option_id: string | null
    ) => {
      const answerRes = await postAnswerQuestion({
        attempt_id,
        question_id,
        chosen_option_id,
        answer_text: null,
      }).unwrap();

      const submitRes = await postSubmitQuestion({
        attempt_id,
      }).unwrap();

      return { answerRes, submitRes };
    },
    [postAnswerQuestion, postSubmitQuestion]
  );

  const getCorrectAnswer = useCallback(
    (question: any) => {
      const correctAnswerOption = question?.options?.find(
        (option: any) => option.is_correct === true
      );
      return correctAnswerOption?.text || t("quiz.errors.noCorrectAnswerFound");
    },
    [t]
  );

  const updateQuizState = useCallback(
    (
      isCorrect: boolean,
      correctAnswer: string,
      addedScore: number,
      question_id?: string
    ) => {
      setLastAnswer({ isCorrect, correctAnswer });
      setScore((prev) => prev + addedScore);
      if (question_id) {
        setAnsweredQuestionIds((prevSet) => new Set(prevSet).add(question_id));
      }
      setShowResult(true);

      handleSetCorrectAnswerCount(isCorrect);
    },
    []
  );

  // ============ CHOICE TYPE HANDLERS ============
  const handleChoiceSubmit = useCallback(
    async (values: SubmitValues) => {
      if (!currentQuestion?._id) {
        message.error(t("quiz.errors.noQuestionData"));
        return;
      }

      const { chosen_option_id } = values;
      if (!chosen_option_id) {
        message.error(t("quiz.errors.noChoice"));
        return;
      }

      try {
        const attempt_id = await startAttempt();
        const { answerRes, submitRes } = await submitAnswer(
          attempt_id,
          currentQuestion._id,
          chosen_option_id
        );

        const correctAnswer = getCorrectAnswer(currentQuestion);
        updateQuizState(
          answerRes.is_correct,
          correctAnswer,
          submitRes.totalScore,
          currentQuestion._id
        );
      } catch (error) {
        console.error("Error submitting choice:", error);
        message.error(t("quiz.errors.submitFailed"));
      }
    },
    [
      currentQuestion,
      t,
      startAttempt,
      submitAnswer,
      getCorrectAnswer,
      updateQuizState,
    ]
  );

  const handleChoiceSkip = useCallback(async () => {
    if (!currentQuestion?._id) {
      message.error(t("quiz.errors.noQuestionData"));
      return;
    }

    try {
      setIsSkip(true);
      const attempt_id = await startAttempt();
      const { answerRes, submitRes } = await submitAnswer(
        attempt_id,
        currentQuestion._id,
        null
      );

      const correctAnswer = getCorrectAnswer(currentQuestion);
      updateQuizState(
        answerRes.is_correct,
        correctAnswer,
        submitRes.totalScore,
        currentQuestion._id
      );
    } catch (error) {
      console.error("Error skipping choice:", error);
      message.error(t("quiz.errors.submitFailed"));
    }
  }, [
    currentQuestion,
    t,
    startAttempt,
    submitAnswer,
    getCorrectAnswer,
    updateQuizState,
  ]);

  // ============ DOCUMENT TYPE HANDLERS ============
  const handleDocumentSubmit = useCallback(
    async (values: SubmitValues) => {
      const questionId = (detailData as any)?.item?._id;
      if (!questionId) {
        message.error(t("quiz.errors.noQuestionData"));
        return;
      }

      try {
        const { score, comment, isCorrect } = await callGeminiApi(
          promptNoEmpty(values)
        );

        resultsQuestion({
          topic_id: topic_id as string,
          score: score,
          content_item_id: (detailData as any)?.item?._id,
          feedback: comment,
        });

        setComment((prev) => prev + (prev ? "\n" : "") + comment);
        updateQuizState(isCorrect, comment, score, questionId);
      } catch (error) {
        console.error("Error calling Gemini:", error);
        message.error(t("quiz.errors.geminiFailed", "Cannot call AI to grade"));
      }
    },
    [callGeminiApi, updateQuizState, t, detailData]
  );

  const handleDocumentSkip = useCallback(async () => {
    const questionId = (detailData as any)?.item?._id;
    if (!questionId) {
      message.error(t("quiz.errors.noQuestionData"));
      return;
    }

    const questionText = (detailData as any)?.item?.body_text;

    try {
      const geminiResult = await callGeminiApi(promptEmpty(questionText));

      if (!geminiResult) {
        throw new Error("Invalid AI response");
      }

      resultsQuestion({
        topic_id: topic_id as string,
        score: 0,
        content_item_id: (detailData as any)?.item?._id,
        feedback: comment,
      });

      setIsSkip(true);
      updateQuizState(
        false,
        `Answer Correct: ${geminiResult?.answer}`,
        0,
        questionId
      );
    } catch (error) {
      console.error("Error calling Gemini (skip):", error);
      message.error(t("quiz.errors.geminiFailed", "Cannot call AI to grade"));
    }
  }, [detailData, callGeminiApi, updateQuizState, t]);

  // ============ AUDIO TYPE HANDLERS ============
  const handleAudioSubmit = useCallback(
    async (values: SubmitValues) => {
      const questionId = (detailData as any)?.item?._id;
      if (!questionId) {
        message.error(t("quiz.errors.noQuestionData"));
        return;
      }

      try {
        const { score, comment, isCorrect } = await callGeminiApi(
          promptSpeaking(values)
        );

        resultsQuestion({
          topic_id: topic_id as string,
          score: score,
          content_item_id: (detailData as any)?.item?._id,
          feedback: comment,
        });

        setComment((prev) => prev + (prev ? "\n" : "") + comment);
        updateQuizState(isCorrect, comment, score, questionId);
      } catch (error) {
        console.error("Error calling Gemini:", error);
        message.error(t("quiz.errors.geminiFailed", "Cannot call AI to grade"));
      }
    },
    [callGeminiApi, updateQuizState, t, detailData]
  );

  const handleAudioSkip = useCallback(async () => {
    const questionId = (detailData as any)?.item?._id;
    if (!questionId) {
      message.error(t("quiz.errors.noQuestionData"));
      return;
    }

    const questionText = (detailData as any)?.item?.body_text;

    try {
      const { score, comment, isCorrect } = await callGeminiApi(
        promptSpeaking({ content: "", result: questionText })
      );

      resultsQuestion({
        topic_id: topic_id as string,
        score: 0,
        content_item_id: (detailData as any)?.item?._id,
        feedback: comment,
      });

      setComment((prev) => prev + (prev ? "\n" : "") + comment);
      setIsSkip(true);
      updateQuizState(isCorrect, comment, score, questionId);
    } catch (error) {
      console.error("Error calling Gemini:", error);
      message.error(t("quiz.errors.geminiFailed", "Cannot call AI to grade"));
    }
  }, [detailData, callGeminiApi, updateQuizState, t]);

  // ============ MAIN HANDLERS ============
  const onFinish = useCallback(
    async (values: SubmitValues) => {
      switch (type) {
        case "choice":
          await handleChoiceSubmit(values);
          break;
        case "document":
          await handleDocumentSubmit(values);
          break;
        case "audio":
          await handleAudioSubmit(values);
          break;
      }
    },
    [type, handleChoiceSubmit, handleDocumentSubmit, handleAudioSubmit]
  );

  const onSkip = useCallback(async () => {
    switch (type) {
      case "choice":
        await handleChoiceSkip();
        break;
      case "document":
        await handleDocumentSkip();
        break;
      case "audio":
        await handleAudioSkip();
        break;
    }
  }, [type, handleChoiceSkip, handleDocumentSkip, handleAudioSkip]);

  // ============ NAVIGATION HANDLERS ============
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
    setComment("");
    setIsSkip(false);
    setIsViewResult(false);
    setCorrectAnswerCount(0);
    setIncorrectAnswerCount(0);
    form.resetFields();
  }, [form]);

  const onViewResult = useCallback(() => {
    setIsViewResult(true);
  }, []);

  // ============ RETURN VALUES ============
  return {
    // Data
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
    correctAnswerCount,
    incorrectAnswerCount,

    // Loading states
    isLoading: passagesLoading,
    isLoadingQuestion: detailLoading,
    isLoadingButton: startLoading || answerLoading || submitLoading,
    isLoadingGemini,
    isViewResult,

    // Handlers
    onSkip,
    onViewResult,
    onFinish,
    nextQuestion,
    resetQuiz,
    refetch,
  };
};
