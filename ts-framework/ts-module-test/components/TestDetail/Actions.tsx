import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

interface ActionsProps {
  currentQuestion: number;
  totalQuestions: number;
  goToQuestion: (questionIndex: number) => void;
}

function Actions(props: ActionsProps) {
  const { currentQuestion, totalQuestions, goToQuestion } = props;

  return (
    <>
      <Button
        icon={<LeftOutlined />}
        onClick={() => goToQuestion(currentQuestion - 1)}
        disabled={currentQuestion === 0}>
        Câu trước
      </Button>
      <Button
        type="primary"
        icon={<RightOutlined />}
        iconPosition="end"
        onClick={() => goToQuestion(currentQuestion + 1)}
        disabled={currentQuestion === totalQuestions - 1}>
        Câu sau
      </Button>
    </>
  );
}

export default Actions;
