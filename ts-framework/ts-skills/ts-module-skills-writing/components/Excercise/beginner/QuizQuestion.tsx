import { CSSProperties } from "react";
import { Card, Typography, Space, Tag, Input, Button, Form } from "antd";
import { createStyles } from "antd-style";
import CKEditorWrapper from "@/ts-framework/ts-component/CKEditorWrapper";

const { Title, Paragraph } = Typography;

interface QuizQuestionProps {
  question: any;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
  disabled?: boolean;
}

export const QuizQuestion = ({
  question,
  userAnswer,
  onAnswerChange,
  disabled = false,
}: QuizQuestionProps) => {
  const { styles } = useStyles();
  return (
    <>
      <Form.Item className={styles.section}>
        <Title level={4} style={{ marginBottom: "16px" }}>
          Điền từ thích hợp vào chỗ trống:
        </Title>
        <Card
          className={styles.questionCard}
          styles={{ body: { padding: "24px" } }}>
          <Paragraph className={styles.questionText}>
            {question.sentence}
          </Paragraph>
        </Card>
      </Form.Item>

      <Form.Item
        name={"result"}
        label={<Title level={5}>Câu trả lời của bạn:</Title>}
        className={styles.section}>
        {/* <Input
          size="large"
          placeholder="Nhập câu trả lời..."
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          disabled={disabled}
          className={styles.answerInput}
        /> */}
        <CKEditorWrapper height={200} isDisabled={false} />
      </Form.Item>
    </>
  );
};

const useStyles = createStyles(({ token, css }) => ({
  section: {
    marginBottom: "24px",
  },
  questionCard: {
    background: "#f9fafb",
    border: "2px dashed #d1d5db",
  },
  questionText: {
    fontSize: "18px",
    textAlign: "center",
    marginBottom: 0,
    fontWeight: 500,
  },
  hintTag: {
    fontSize: "15px",
    borderRadius: "8px",
    padding: "8px 16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  answerInput: {
    fontSize: "18px",
    borderRadius: "8px",
  },
}));
