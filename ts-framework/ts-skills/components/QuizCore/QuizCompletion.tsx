import { useEffect, useMemo } from "react"; // Thêm useEffect
import {
  Button,
  Col,
  Flex,
  Progress,
  Result,
  Row,
  Statistic,
  Tooltip,
  Typography,
} from "antd";
import { createStyles } from "antd-style";
import { QuizCompletionProps } from "@/ts-framework/ts-skills/ts-module-skills-writing/const/type";
import {
  RedoOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Confetti from "react-confetti";
import {
  compeleteSuccessSoundUrl,
  compeleteFailSoundUrl,
} from "../SoundEffect";
import { useRouter } from "next/navigation";
import ACard from "@/fer-framework/fe-component/web/ACard";
import { ZoomMotion } from "@/fer-framework/fe-component/web/MotionWrapper";
import Mascot from "@/ts-framework/ts-component/Mascot";

const { Title, Paragraph, Text } = Typography;

export const QuizCompletion = ({
  score,
  total,
  onReset,
  answered,
  correctAnswers,
  incorrectAnswers,
  url,
}: QuizCompletionProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const percentage = useMemo(
    () => Math.round((score / (total * 10)) * 100),
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
        style={{ minHeight: "100vh", padding: 16 }}>
        <Result
          status={isSuccess ? "success" : "error"}
          title={
            <>
              {isSuccess
                ? t("quiz.completion.success")
                : t("quiz.completion.tryAgain")}
              <Paragraph type="secondary" style={{ fontSize: 16 }}>
                {isSuccess
                  ? "Chúc mừng bạn đã hoàn thành bài học. Hãy tiếp tục cho bài tiếp theo nhé!"
                  : "Đừng lo lắng. Hãy làm lại bài học để nắm vứng kiến thức nhé!"}
              </Paragraph>
            </>
          }
          subTitle={
            <div style={{ marginTop: 24 }}>
              <div
                style={{
                  position: "absolute",
                  right: "30%",
                  bottom: "25%",
                  zIndex: 9999,
                }}>
                <ZoomMotion duration={0.8}>
                  <Mascot
                    message={
                      isSuccess
                        ? "Whhh! Bạn giỏi quá"
                        : "Huhhh! Mất cái mặt tôi"
                    }
                  />
                </ZoomMotion>
              </div>
              <ACard
                variant="borderless"
                style={{
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                }}>
                <Row align={"middle"} justify={"center"}>
                  <Col span={12}>
                    <Statistic
                      title="ĐIỂM SỐ CỦA BẠN"
                      value={score}
                      suffix="điểm"
                      valueStyle={{
                        fontSize: "2.8em",
                        fontWeight: 600,
                        color: isSuccess ? "#52c41a" : "#ff4d4f",
                      }}
                    />
                  </Col>

                  <Col span={12}>
                    <Row justify="center" align={"middle"}>
                      <Tooltip title="Độ chính xác">
                        <Progress
                          strokeLinecap="butt"
                          type="circle"
                          style={{ marginBottom: 12 }}
                          percent={percentage}
                          format={(percent) => `${percent}%`}
                        />
                      </Tooltip>
                      <div>
                        <Text
                          type="secondary"
                          style={{
                            fontSize: "1.1em",
                            display: "block",
                            marginLeft: 8,
                          }}>
                          Đúng: {correctAnswers}
                        </Text>
                        <Text
                          type="secondary"
                          style={{
                            fontSize: "1.1em",
                            display: "block",
                            marginLeft: 8,
                          }}>
                          Sai: {incorrectAnswers}
                        </Text>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </ACard>
            </div>
          }
          extra={[
            <Button
              type="primary"
              size="large"
              key="retry"
              onClick={onReset}
              icon={<RedoOutlined />}
              style={{
                backgroundColor: isSuccess ? "#58CC02" : "#FF4B4B",
                borderColor: isSuccess ? "#58CC02" : "#FF4B4B",
              }}>
              {t("quiz.completion.retry")}
            </Button>,
            <Button
              size="large"
              key="home"
              icon={<HomeOutlined />}
              onClick={() => router.push(url)}>
              Về chủ đề
            </Button>,
          ]}></Result>
      </Flex>
    </>
  );
};
