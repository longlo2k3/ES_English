import { Progress } from "antd";
import { QuizProgressProps } from "@/ts-framework/ts-skills/ts-module-skills-writing/const/type";
import { createStyles } from "antd-style";
import { useTranslation } from "react-i18next";

export const QuizProgress = ({
  current,
  total,
  score,
  answered,
  progress,
}: QuizProgressProps) => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span className={styles.label}>
          {t("quiz.progress.question")} {current} / {total}
        </span>
        <span className={styles.score}>
          {t("quiz.progress.score")} : {score} / {answered}
        </span>
      </div>
      <Progress
        percent={progress}
        strokeColor={{
          "100%": "rgb(88, 204, 2)",
        }}
        showInfo={false}
      />
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  container: {
    marginBottom: "24px",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  label: {
    fontSize: "14px",
    color: "#4b5563",
  },
  score: {
    fontSize: "14px",
    fontWeight: 600,
    // color: "#2563eb",
    color: "#000000",
  },
}));
