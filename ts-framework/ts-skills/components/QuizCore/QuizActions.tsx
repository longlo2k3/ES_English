import { Button, Form } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

interface QuizActionsProps {
  showResult: boolean;
  isLastQuestion: boolean;
  onNext: () => void;
  onReset: () => void;
  onViewResult: () => void;
  isCorrect?: boolean;
  onSkip?: () => void;
  isSkip?: boolean;
  isLoadingButton?: boolean;
  isLoading?: boolean;
}

export const QuizActions = ({
  showResult,
  isLastQuestion,
  onNext,
  onViewResult,
  isCorrect,
  onSkip,
  isSkip,
  isLoadingButton,
  isLoading,
}: QuizActionsProps) => {
  const { styles } = useStyles();

  const { t } = useTranslation();

  const form = Form.useFormInstance();
  const selected = Form.useWatch("chosen_option_id", form);

  useEffect(() => {
    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();

        const selected = form.getFieldValue("chosen_option_id");

        if (selected && !showResult && !isSkip) {
          form.submit();
        }
        if ((showResult || isSkip) && !isLastQuestion) {
          onNext();
          return;
        }

        if ((showResult || isSkip) && isLastQuestion) {
          onViewResult();
          return;
        }
      }
    };
    document.addEventListener("keydown", handleEnterKey);
    return () => {
      document.removeEventListener("keydown", handleEnterKey);
    };
  }, [form, showResult, isSkip]);

  return (
    !isLoading && (
      <Form.Item className={styles.container}>
        {!showResult && !isSkip ? (
          <>
            <Button
              style={{
                backgroundColor: "#ffffff",
                color: "#7d7d7dff",
                border: "1px solid #E5E5E5",
              }}
              size="large"
              onClick={onSkip}
              className={styles.button}>
              {t("quiz.actions.skip")}
            </Button>
            <Button
              type="primary"
              style={{ backgroundColor: "rgb(88, 204, 2)" }}
              size="large"
              htmlType="submit"
              disabled={!selected}
              loading={isLoadingButton}
              className={styles.button}>
              {t("quiz.actions.check")}
            </Button>
          </>
        ) : (
          <>
            {!isLastQuestion ? (
              <Button
                type="primary"
                size="large"
                onClick={onNext}
                style={{
                  backgroundColor:
                    isCorrect === true ? "rgb(88, 204, 2)" : "rgb(255, 75, 75)",
                }}
                className={styles.button}>
                {t("quiz.actions.continue")}
              </Button>
            ) : (
              <Button
                type="primary"
                size="large"
                icon={<RedoOutlined />}
                onClick={onViewResult}
                style={{
                  backgroundColor:
                    isCorrect === true ? "rgb(88, 204, 2)" : "rgb(255, 75, 75)",
                }}
                className={styles.button}>
                {t("quiz.actions.result")}
              </Button>
            )}
          </>
        )}
      </Form.Item>
    )
  );
};

const useStyles = createStyles(({ token }) => ({
  container: {
    width: "100%",
    display: "flex",
    gap: "12px",
    justifyContent: "end",
  },
  button: {
    height: "48px",
    width: "150px",
    fontSize: "16px",
    borderRadius: "8px",
    flex: 1,
    marginLeft: "12px",
  },
}));
