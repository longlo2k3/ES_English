import { useState, useMemo, useCallback, use } from "react";
import { Button, Modal } from "antd";
import { useFetchStartTest } from "../utils";
import { usePostAnswerExamMutation, usePostSubmitExamMutation } from "../apis";

interface Option {
  label: string;
  option_text: string;
  is_correct: boolean;
  _id: string;
}

interface Question {
  _id: string;
  question_text: string;
  points: number;
  options: Option[];
}

interface ExamItem {
  mapping_id: string;
  test_id: string;
  order_in_test: number;
  bank_question_id: string;
  question: Question;
}

interface ExamData {
  total: number;
  items: ExamItem[];
}

interface SubmissionData {
  bank_question_id: string;
  chosen_option_label: string | null;
}

interface TestResultProps {
  attempt_id: string;
  correct: number;
  wrong: number;
  total_questions: number;
  score: number;
}

interface IProps {
  data: ExamData;
  _id: string;
}

export const useTestExam = (props: IProps) => {
  const { data, _id } = props;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [deadline] = useState(Date.now() + 30 * 60 * 1000);

  const totalQuestions = useMemo(() => data?.total || 0, [data]);
  const examData = useMemo(() => data?.items || [], [data]);

  const [result, setResult] = useState<TestResultProps>({
    attempt_id: "",
    correct: 0,
    wrong: 0,
    total_questions: totalQuestions,
    score: 0,
  });

  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
    new Array(totalQuestions).fill(null)
  );
  const [flagged, setFlagged] = useState<boolean[]>(
    new Array(totalQuestions).fill(false)
  );

  // API
  const { data: StartData } = useFetchStartTest(_id);

  const [postAnswerExam, { isLoading: answerLoading }] =
    usePostAnswerExamMutation();

  const [postSubmitExam, { isLoading: submitLoading }] =
    usePostSubmitExamMutation();

  // Cập nhật lại mảng khi totalQuestions thay đổi
  useMemo(() => {
    if (totalQuestions > 0) {
      setUserAnswers(new Array(totalQuestions).fill(null));
      setFlagged(new Array(totalQuestions).fill(false));
    }
  }, [totalQuestions]);

  const currentQ = useMemo(
    () => examData?.[currentQuestion]?.question,
    [examData, currentQuestion]
  );

  // Xử lý thay đổi câu trả lời
  const handleAnswerChange = useCallback(
    (value: number) => {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestion] = value;
      setUserAnswers(newAnswers);
    },
    [currentQuestion, userAnswers]
  );

  // Chuyển đến câu hỏi
  const goToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalQuestions) {
        setCurrentQuestion(index);
      }
    },
    [totalQuestions]
  );

  // Đánh dấu câu hỏi
  const toggleFlag = useCallback(() => {
    const newFlags = [...flagged];
    newFlags[currentQuestion] = !newFlags[currentQuestion];
    setFlagged(newFlags);
  }, [currentQuestion, flagged]);

  // Format dữ liệu nộp bài
  const formatSubmissionData = useCallback((): SubmissionData[] => {
    return examData.map((item, index) => ({
      bank_question_id: item.bank_question_id,
      chosen_option_label:
        userAnswers[index] !== null
          ? item.question.options[userAnswers[index]!].label
          : null,
    }));
  }, [examData, userAnswers]);

  // Xử lý nộp bài
  const handleSubmit = useCallback(async () => {
    const submissionData = examData.map((item, index) => ({
      bank_question_id: item.bank_question_id,
      chosen_option_label:
        userAnswers[index] !== null
          ? item.question.options[userAnswers[index]!].label
          : "",
    }));

    // // Hiển thị modal kết quả
    // Modal.success({
    //   title: "Nộp bài thành công!",
    //   content: (
    //     <div>
    //       <p>Bài thi của bạn đã được ghi nhận.</p>
    //       <pre
    //         style={{
    //           maxHeight: "300px",
    //           overflow: "auto",
    //           background: "#f5f5f5",
    //           padding: "10px",
    //           borderRadius: "4px",
    //           fontSize: "12px",
    //         }}>
    //         {JSON.stringify(submissionData, null, 2)}
    //       </pre>
    //     </div>
    //   ),
    //   width: 600,
    // });

    // TODO: Gọi API để submit bài thi
    // await submitExam(submissionData);
    await postAnswerExam({
      attempt_id: StartData?.attempt?._id,
      answers: submissionData,
    });
    const res = await postSubmitExam({ attempt_id: StartData?.attempt?._id });

    setResult(res?.data as any);
  }, [_id, examData, postAnswerExam, userAnswers]);

  // Hiển thị modal xác nhận nộp bài
  const showSubmitConfirm = useCallback(() => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn nộp bài?",
      content: "Bạn sẽ không thể thay đổi câu trả lời của mình sau khi nộp.",
      okText: "Nộp bài",
      cancelText: "Hủy",
      onOk: handleSubmit,
    });
  }, [handleSubmit]);

  // Xử lý khi hết giờ
  const onFinish = useCallback(() => {
    console.log("Hết giờ!");
    showSubmitConfirm();
  }, [showSubmitConfirm]);

  // Tính toán số câu đã làm
  const answeredCount = useMemo(
    () => userAnswers.filter((answer) => answer !== null).length,
    [userAnswers]
  );

  // Tính toán số câu đã đánh dấu
  const flaggedCount = useMemo(
    () => flagged.filter((flag) => flag).length,
    [flagged]
  );

  const onReset = useCallback(() => {
    setCurrentQuestion(0);
    setUserAnswers(new Array(totalQuestions).fill(null));
    setFlagged(new Array(totalQuestions).fill(false));
    setResult({
      attempt_id: "",
      correct: 0,
      wrong: 0,
      total_questions: totalQuestions,
      score: 0,
    });
  }, [totalQuestions]);

  return {
    // State
    currentQuestion,
    currentQ,
    totalQuestions,
    examData,
    userAnswers,
    flagged,
    deadline,
    answeredCount,
    flaggedCount,
    submitLoading,
    result,
    onReset,

    // Actions
    handleAnswerChange,
    goToQuestion,
    toggleFlag,
    showSubmitConfirm,
    onFinish,
    formatSubmissionData,
  };
};
