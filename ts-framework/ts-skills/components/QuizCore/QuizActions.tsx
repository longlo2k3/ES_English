import { CSSProperties } from "react";
import { Button, Form } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";

interface QuizActionsProps {
  showResult: boolean;
  isLastQuestion: boolean;
  onNext: () => void;
  onReset: () => void;
  onViewResult: () => void;
}

export const QuizActions = ({
  showResult,
  isLastQuestion,
  onNext,
  onViewResult,
}: QuizActionsProps) => {
  const { styles } = useStyles();
  return (
    <Form.Item>
      {!showResult ? (
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className={styles.button}>
          Kiểm tra
        </Button>
      ) : (
        <>
          {!isLastQuestion ? (
            <Button
              type="primary"
              size="large"
              onClick={onNext}
              className={styles.button}>
              Câu tiếp theo
            </Button>
          ) : (
            <Button
              type="primary"
              size="large"
              icon={<RedoOutlined />}
              onClick={onViewResult}
              className={styles.button}>
              Xem kết quả
            </Button>
          )}
        </>
      )}
    </Form.Item>
  );
};

const useStyles = createStyles(({ token }) => ({
  container: {
    width: "100%",
    display: "flex",
    gap: "12px",
  },
  button: {
    height: "48px",
    width: "100%",
    fontSize: "16px",
    borderRadius: "8px",
    flex: 1,
  },
}));
