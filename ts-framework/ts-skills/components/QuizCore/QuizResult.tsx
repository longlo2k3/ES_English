import { Card } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { QuizResultProps } from "@/ts-framework/ts-skills/ts-module-skills-writing/const/type";
import { createStyles } from "antd-style";

export const QuizResult = ({ isCorrect, correctAnswer }: QuizResultProps) => {
  const { styles } = useStyles();
  return (
    <Card
      className={styles.card}
      style={{
        background: isCorrect ? "#f0fdf4" : "#fef2f2",
        borderColor: isCorrect ? "#bbf7d0" : "#fecaca",
      }}
      styles={{ body: { padding: "16px" } }}>
      <div className={styles.content}>
        {isCorrect ? (
          <>
            <CheckCircleOutlined
              style={{ fontSize: "24px", color: "#16a34a" }}
            />
            <div>
              <div className={styles.title} style={{ color: "#166534" }}>
                Chính xác!
              </div>
              <div className={styles.description}>Bạn đã trả lời đúng.</div>
            </div>
          </>
        ) : (
          <>
            <CloseCircleOutlined
              style={{ fontSize: "24px", color: "#dc2626" }}
            />
            <div>
              <div className={styles.title} style={{ color: "#991b1b" }}>
                Chưa chính xác
              </div>
              <div className={styles.description} style={{ color: "#b91c1c" }}>
                Đáp án đúng: <strong>{correctAnswer}</strong>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

const useStyles = createStyles(({ token }) => ({
  card: {
    marginBottom: "24px",
  },
  content: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  title: {
    fontWeight: 600,
    marginBottom: "4px",
  },
  description: {
    fontSize: "14px",
    color: "#15803d",
  },
}));
