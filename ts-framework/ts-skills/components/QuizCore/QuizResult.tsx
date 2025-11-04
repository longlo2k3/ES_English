import { Card } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { QuizResultProps } from "@/ts-framework/ts-skills/ts-module-skills-writing/const/type";
import { createStyles } from "antd-style";
import { useTranslation } from "react-i18next";

export const QuizResult = ({ isCorrect, correctAnswer }: QuizResultProps) => {
  const { styles } = useStyles();
  const { t } = useTranslation();
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
                {t("quiz.result.correct.title")}
              </div>
              <div className={styles.description}>{t("quiz.result.correct.description")}</div>
            </div>
          </>
        ) : (
          <>
            <CloseCircleOutlined
              style={{ fontSize: "24px", color: "#dc2626" }}
            />
            <div>
              <div className={styles.title} style={{ color: "#991b1b" }}>
                {t("quiz.result.incorrect.title")}
              </div>
              <div className={styles.description} style={{ color: "#b91c1c" }}>
                {t("quiz.result.incorrect.description")} <strong>{correctAnswer}</strong>
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
