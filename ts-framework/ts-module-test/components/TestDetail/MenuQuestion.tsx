import { ClockCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Space, Statistic, Typography } from "antd";
import { ButtonType } from "antd/es/button";
import React from "react";

const { Title, Paragraph, Text } = Typography;

const { Timer } = Statistic;

interface MenuQuestionProps {
  deadline: number;
  totalQuestions: number;
  currentQuestion: number;
  answeredCount: number;
  userAnswers: (string | null)[];
  flagged: boolean[];
  goToQuestion: (index: number) => void;
  onFinish: () => void;
}

function MenuQuestion(props: MenuQuestionProps) {
  const {
    deadline,
    totalQuestions,
    currentQuestion,
    answeredCount,
    userAnswers,
    flagged,
    goToQuestion,
    onFinish,
  } = props;

  return (
    <>
      <Title level={5}>Thời gian còn lại</Title>

      <Timer
        title={
          <Text type="danger">
            <ClockCircleOutlined /> Thời gian
          </Text>
        }
        type="countdown"
        value={deadline}
        onFinish={onFinish}
        valueStyle={{ color: "#cf1322", fontSize: "28px" }}
      />

      <Divider />

      <Title level={5}>Bảng câu hỏi</Title>
      <Paragraph type="secondary">
        Nhấn vào số để chuyển đến câu hỏi đó.
      </Paragraph>

      <Space style={{ marginBottom: "16px" }}>
        <Text>
          Đã làm: {answeredCount}/{totalQuestions}
        </Text>
      </Space>

      <Space size={[8, 8]} wrap>
        {Array.from({ length: totalQuestions }, (_, i) => {
          let type: ButtonType = "default";
          if (i === currentQuestion) {
            type = "primary";
          } else if (userAnswers[i] !== null) {
            type = "dashed";
          }

          return (
            <Button
              key={i}
              type={type}
              shape="circle"
              onClick={() => goToQuestion(i)}
              style={{
                width: 40,
                height: 40,
                borderColor: flagged[i] ? "#faad14" : undefined,
                borderWidth: flagged[i] ? 2 : 1,
              }}>
              {i + 1}
            </Button>
          );
        })}
      </Space>
    </>
  );
}

export default MenuQuestion;
