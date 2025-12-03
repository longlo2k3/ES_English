import React from "react";
import { Card, Flex, Progress, Space, Statistic, Typography } from "antd";
import Mascot from "@/ts-framework/ts-component/Mascot";
import { QuizResult } from "./QuizResult";

const { Text, Title } = Typography;

interface IProps {
  current: number;
  totalQuestions: number;
  score: number;
  progress: number;
  answered: number;
  isCorrect: boolean;
  correctAnswerCount: number;
  incorrectAnswerCount: number;
}

const QuizResultScreen = (props: IProps) => {
  const {
    current,
    totalQuestions,
    score,
    progress,
    answered,
    isCorrect,
    correctAnswerCount,
    incorrectAnswerCount,
  } = props;

  return (
    <Space direction="vertical" align="center" size="middle">
      <Mascot
        triggerState={
          isCorrect === true
            ? "correct"
            : isCorrect === false
            ? "incorrect"
            : "speaking"
        }
      />
      <Progress
        type="circle"
        percent={progress}
        size={200}
        strokeWidth={12}
        format={(percent) => (
          <Flex vertical align="center" justify="center">
            <Text
              style={{
                fontSize: "1.5em",
                fontWeight: "bold",
                lineHeight: 1.1,
              }}>
              {percent?.toFixed(0)}%
            </Text>
            <Text
              style={{
                fontSize: "-2em",
                textTransform: "uppercase",
                color: "rgba(0, 0, 0, 0.65)",
              }}>
              Hoàn thành
            </Text>
          </Flex>
        )}
      />

      <Text type="secondary" style={{ marginTop: -15, fontSize: "1.1em" }}>
        Câu {current}/{totalQuestions}
      </Text>

      <Statistic
        title="ĐIỂM SỐ HIỆN TẠI"
        value={score}
        suffix="điểm"
        style={{ marginTop: 24, textAlign: "center" }}
        valueStyle={{ fontSize: "2.8em", fontWeight: 600 }}
      />

      <Text type="secondary" style={{ fontSize: "1.1em" }}>
        Đúng: {correctAnswerCount}, Sai: {incorrectAnswerCount}
      </Text>
    </Space>
  );
};

export default QuizResultScreen;
