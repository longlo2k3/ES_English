import { FlagOutlined } from "@ant-design/icons";
import { Button, Card, Radio, Space, Typography } from "antd";
import React from "react";

const { Title, Paragraph } = Typography;

interface QuestionsProps {
  currentQuestion: number;
  totalQuestions: number;
  currentQ: any;
  userAnswers: Record<number, number>;
  flagged: Record<number, boolean>;
  handleAnswerChange: (value: number) => void;
  toggleFlag: () => void;
}

function Questions(props: QuestionsProps) {
  const {
    currentQuestion,
    totalQuestions,
    currentQ,
    userAnswers,
    flagged,
    handleAnswerChange,
    toggleFlag,
  } = props;
  return (
    <Card
      bordered={false}
      style={{ minHeight: "calc(100vh - 200px)" }}
      title={
        <Space>
          <Title level={5} style={{ margin: 0 }}>
            Câu {currentQuestion + 1}/{totalQuestions}
          </Title>
          <Button
            icon={<FlagOutlined />}
            type={flagged?.[currentQuestion] ? "primary" : "default"}
            onClick={toggleFlag}>
            {flagged?.[currentQuestion] ? "Bỏ đánh dấu" : "Đánh dấu"}
          </Button>
        </Space>
      }>
      <Paragraph style={{ fontSize: "16px", fontWeight: 500 }}>
        {currentQ?.question_text}
      </Paragraph>

      <Radio.Group
        onChange={(e) => handleAnswerChange(e.target.value)}
        value={userAnswers?.[currentQuestion]}>
        <Space direction="vertical" size="large">
          {currentQ?.options?.map((option: any, index: number) => (
            <Radio key={index} value={index} style={{ fontSize: "16px" }}>
              {option?.label}. {option?.option_text}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Card>
  );
}

export default Questions;
