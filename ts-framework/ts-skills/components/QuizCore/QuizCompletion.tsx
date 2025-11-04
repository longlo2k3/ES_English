import { useEffect, useMemo } from "react"; // Thêm useEffect
import { Button, Flex, Typography } from "antd";
import { createStyles } from "antd-style";
import { QuizCompletionProps } from "@/ts-framework/ts-skills/ts-module-skills-writing/const/type";
import {
  RedoOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Confetti from "react-confetti";
import {
  compeleteSuccessSoundUrl,
  compeleteFailSoundUrl,
} from "../SoundEffect";

const { Title, Paragraph } = Typography;

export const QuizCompletion = ({
  score,
  total,
  onReset,
}: QuizCompletionProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const percentage = useMemo(
    () => Math.round((score / total) * 100),
    [score, total]
  );
  const isSuccess = useMemo(() => percentage >= 80, [percentage]);

  useEffect(() => {
    const soundUrl = isSuccess
      ? compeleteSuccessSoundUrl
      : compeleteFailSoundUrl;
    const audio = new Audio(soundUrl);

    audio.play().catch((e) => {
      console.warn("Lỗi phát âm thanh tự động:", e);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isSuccess]);

  return (
    <>
      {isSuccess && (
        <Confetti
          recycle={false}
          numberOfPieces={300}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}

      <Flex
        vertical
        justify="center"
        align="center"
        style={{ height: "100vh" }}>
        <Title
          level={3}
          className={isSuccess ? styles.titleSuccess : styles.titleTryAgain}>
          {isSuccess ? (
            <>
              <CheckCircleOutlined
                style={{ marginRight: 8, color: "#58CC02" }}
              />
              {t("quiz.completion.success")}
            </>
          ) : (
            <>
              <CloseCircleOutlined
                style={{ marginRight: 8, color: "#FF4B4B" }}
              />
              {t("quiz.completion.tryAgain")}
            </>
          )}
        </Title>

        <Paragraph className={styles.scoreText}>
          {t("quiz.completion.score")}{" "}
          <strong className={styles.scoreHighlight}>
            {score}/{total}
          </strong>
        </Paragraph>
        <Paragraph>
          {t("quiz.completion.accuracy")} <strong>{percentage}%</strong>
        </Paragraph>

        <Button
          type="primary"
          size="large"
          onClick={() => {
            onReset();
          }}
          style={{ backgroundColor: isSuccess ? "#58CC02" : "#FF4B4B" }}
          icon={<RedoOutlined />}>
          {t("quiz.completion.retry")}
        </Button>
      </Flex>
    </>
  );
};

const useStyles = createStyles(({ token }) => ({
  scoreText: {
    fontSize: "18px",
  },
  scoreHighlight: {
    color: "#2563eb",
  },

  titleSuccess: {
    color: token.colorSuccess,
  },

  titleTryAgain: {
    color: token.colorWarning,
  },
}));
