import { Button, Flex, Form, Typography } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import {
  SlideInFromBottom,
  SlideInFromLeft,
  SlideInFromRight,
} from "@/fer-framework/fe-component/web/MotionWrapper";

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

const { Paragraph } = Typography;

export const getButtonSubmit = (children: React.ReactNode) => {
  return (
    <Flex gap={8} justify="end" align="center">
      <Paragraph type="secondary" style={{ margin: 0 }}>
        hoặc nhấn Enter
      </Paragraph>
      {children}
    </Flex>
  );
};

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
  const { t } = useTranslation();

  const form = Form.useFormInstance();
  const selected =
    Form.useWatch("chosen_option_id", form) ||
    form.getFieldValue("chosen_option_id");

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
      <Form.Item>
        {!showResult && !isSkip ? (
          <Flex
            justify="space-between"
            align="center"
            style={{ width: "100%" }}>
            <SlideInFromLeft type="animate">
              <Button
                style={{
                  backgroundColor: "#ffffff",
                  color: "#7d7d7dff",
                  border: "1px solid #E5E5E5",
                }}
                size="large"
                onClick={onSkip}>
                {t("quiz.actions.skip")}
              </Button>
            </SlideInFromLeft>

            <SlideInFromRight type="animate">
              <Flex gap={8} justify="center" align="center">
                <Paragraph type="secondary" style={{ margin: 0 }}>
                  hoặc nhấn Enter
                </Paragraph>
                <Button
                  type="primary"
                  style={{ backgroundColor: "rgb(88, 204, 2)" }}
                  size="large"
                  htmlType="submit"
                  disabled={!selected}
                  loading={isLoadingButton}>
                  {t("quiz.actions.check")}
                </Button>
              </Flex>
            </SlideInFromRight>
          </Flex>
        ) : (
          <>
            {!isLastQuestion ? (
              <SlideInFromBottom type="animate">
                <Flex justify="end" style={{ width: "100%" }}>
                  {getButtonSubmit(
                    <Button
                      type="primary"
                      size="large"
                      onClick={onNext}
                      style={{
                        backgroundColor:
                          isCorrect === true
                            ? "rgb(88, 204, 2)"
                            : "rgb(255, 75, 75)",
                      }}>
                      {t("quiz.actions.continue")}
                    </Button>
                  )}
                </Flex>
              </SlideInFromBottom>
            ) : (
              <SlideInFromBottom type="animate">
                <Flex justify="end" style={{ width: "100%" }}>
                  {getButtonSubmit(
                    <Button
                      type="primary"
                      size="large"
                      icon={<RedoOutlined />}
                      onClick={onViewResult}
                      style={{
                        backgroundColor:
                          isCorrect === true
                            ? "rgb(88, 204, 2)"
                            : "rgb(255, 75, 75)",
                      }}>
                      {t("quiz.actions.result")}
                    </Button>
                  )}
                </Flex>
              </SlideInFromBottom>
            )}
          </>
        )}
      </Form.Item>
    )
  );
};
