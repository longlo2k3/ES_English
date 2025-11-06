import { Card, Flex, Typography } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { QuizResultProps } from "@/ts-framework/ts-skills/ts-module-skills-writing/const/type";
import { createStyles } from "antd-style";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

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
            <div>
              <Flex align="center" gap={8}>
                <CheckCircleOutlined
                  style={{ fontSize: "24px", color: "#16a34a" }}
                />
                <Title level={4} style={{ marginBottom: 0, color: "#16a34a" }}>
                  {t("quiz.result.correct.title")}
                </Title>
              </Flex>
              <div className={styles.description}>
                <strong>{correctAnswer}</strong>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <Flex align="center" gap={8}>
                <CloseCircleOutlined
                  style={{ fontSize: "24px", color: "#dc2626" }}
                />
                <Title level={4} style={{ marginBottom: 0, color: "#b91c1c" }}>
                  {" "}
                  {t("quiz.result.incorrect.title")}
                </Title>
              </Flex>
              <div className={styles.description} style={{ color: "#b91c1c" }}>
                {/* {t("quiz.result.incorrect.description")}{" "} */}
                <strong>{correctAnswer}</strong>
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
  description: {
    marginTop: "8px",
    fontSize: "14px",
    color: "#15803d",
  },
}));
