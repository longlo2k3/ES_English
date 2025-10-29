import { CSSProperties } from "react";
import { Button, Card, Typography } from "antd";
import { createStyles } from "antd-style";
import { QuizCompletionProps } from "@/ts-framework/ts-skills/ts-module-skills-writing/const/type";
import { RedoOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const QuizCompletion = ({
  score,
  total,
  onReset,
}: QuizCompletionProps) => {
  const percentage = Math.round((score / total) * 100);

  const { styles } = useStyles();

  return (
    <Card className={styles.card}>
      <Title level={3}>Hoàn thành! 🎉</Title>
      <Paragraph className={styles.scoreText}>
        Điểm của bạn:{" "}
        <strong className={styles.scoreHighlight}>
          {score}/{total}
        </strong>
      </Paragraph>
      <Paragraph>
        Tỷ lệ chính xác: <strong>{percentage}%</strong>
      </Paragraph>

      <Button
        type="primary"
        size="large"
        onClick={onReset}
        icon={<RedoOutlined />}>
        Làm lại
      </Button>
    </Card>
  );
};

const useStyles = createStyles(({ token }) => ({
  card: {
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    background: "linear-gradient(to right, #eff6ff, #ede9fe)",
  },
  scoreText: {
    fontSize: "18px",
  },
  scoreHighlight: {
    color: "#2563eb",
  },
}));
