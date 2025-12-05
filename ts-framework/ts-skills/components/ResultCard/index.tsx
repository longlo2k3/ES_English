import ACard from "@/fer-framework/fe-component/web/ACard";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  question: {
    answer: string;
  };
  isCorrect: boolean;
}

function ResultCard(props: IProps) {
  const { question, isCorrect } = props;
  const { styles } = useStyles();
  const { t } = useTranslation();
  return (
    <ACard
      className={styles.resultCard}
      style={{
        background: isCorrect ? "#f0fdf4" : "#fef2f2",
        borderColor: isCorrect ? "#bbf7d0" : "#fecaca",
      }}
      styles={{ body: { padding: "16px" } }}>
      <div className={styles.resultContent}>
        {isCorrect ? (
          <>
            <CheckCircleOutlined
              style={{ fontSize: "24px", color: "#16a34a" }}
            />
            <div>
              <div style={{ fontWeight: 600, color: "#166534" }}>
                {t("quiz.result.correct.title")}
              </div>
              <div style={{ fontSize: "14px", color: "#15803d" }}>
                {t("quiz.result.correct.description")}
              </div>
            </div>
          </>
        ) : (
          <>
            <CloseCircleOutlined
              style={{ fontSize: "24px", color: "#dc2626" }}
            />
            <div>
              <div style={{ fontWeight: 600, color: "#991b1b" }}>
                {t("quiz.result.incorrect.title")}
              </div>
              <div style={{ fontSize: "14px", color: "#b91c1c" }}>
                {t("quiz.result.incorrect.description")} <strong>{question.answer}</strong>
              </div>
            </div>
          </>
        )}
      </div>
    </ACard>
  );
}

export default ResultCard;

const useStyles = createStyles(({ token, css }) => ({
  resultCard: {
    marginBottom: "24px",
  },
  resultContent: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
}));
