import { useState, useEffect, useRef, useMemo } from "react";
// Thêm Input, Tooltip, Flex, Button, Spin từ antd
import {
  Typography,
  Form,
  Row,
  Col,
  Image,
  Flex,
  Spin,
  Button,
  Input, // <-- Thêm
  Tooltip,
  Alert, // <-- Thêm
} from "antd";
// Thêm icon
import { AudioOutlined, ClearOutlined } from "@ant-design/icons"; // <-- Thêm
import { createStyles } from "antd-style";
import ACard from "@/fer-framework/fe-component/web/ACard";
import SkeletonLoading from "@/ts-framework/ts-component/Skeleton";
import {
  successQues,
  tryAgainSoundUrl,
} from "@/ts-framework/ts-skills/components/SoundEffect";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { evaluateSpeech } from "../../const/data";
import {
  SlideInFromLeft,
  SlideInFromRight,
  ZoomMotion,
} from "@/fer-framework/fe-component/web/MotionWrapper";

const { Text, Title } = Typography;

interface IProps {
  detailData: any;
  isLoading: boolean;
  isCorrect?: boolean;
  correctAnswer?: string;
  isSkip?: boolean;
}
export const QuizQuestion = ({
  detailData,
  isLoading,
  isCorrect,
  isSkip,
}: IProps) => {
  const form = Form.useFormInstance();
  const [result, setResult] = useState<any>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

  const itemData = useMemo(() => {
    return detailData?.item;
  }, [detailData]);

  const questionData = useMemo(() => {
    return detailData?.questions?.[0];
  }, [detailData]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    let soundUrl;
    if (isCorrect === true) {
      soundUrl = successQues;
      audioRef.current?.pause();
    } else if (isCorrect === false) {
      soundUrl = tryAgainSoundUrl;
      audioRef.current?.pause();
    } else if (isSkip === true) {
      soundUrl = tryAgainSoundUrl;
      audioRef.current?.pause();
    }
    const audio = new Audio(soundUrl);
    audio.play().catch((e) => {
      console.warn("Lỗi phát âm thanh tự động:", e);
    });
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isCorrect, isSkip]);

  useEffect(() => {
    form.setFieldsValue({ chosen_option_id: transcript });
  }, [transcript, form]);

  const handleToggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setEndTime(performance.now());
    } else {
      resetTranscript();
      setResult(null);
      setStartTime(performance.now());
      SpeechRecognition.startListening({
        language: "en-US",
        continuous: false,
      });
    }
  };

  useEffect(() => {
    if (!listening && transcript && startTime && endTime) {
      const duration = (endTime - startTime) / 1000; // giây
      const score = evaluateSpeech(
        questionData?.question_text || "",
        transcript,
        duration
      );
      setResult(score);
      form.setFieldsValue({
        result: score,
      });
    }
  }, [listening]);

  useEffect(() => {
    form.setFieldValue("content", questionData?.question_text);
  }, [questionData]);

  if (isLoading) {
    return <SkeletonLoading isLoading={isLoading} />;
  }

  if (!questionData) {
    return <Text type="danger">Lỗi: Không tải được dữ liệu câu hỏi.</Text>;
  }
  if (!browserSupportsSpeechRecognition) {
    return (
      <Text type="danger">
        Trình duyệt của bạn không hỗ trợ nhận dạng giọng nói.
      </Text>
    );
  }

  return (
    <>
      <Form.Item name={"content"} hidden />
      <Form.Item name={"result"} hidden />
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <SlideInFromLeft type="animate" duration={0.8}>
            <Image
              src={itemData?.media_image_url}
              preview={true}
              alt="ảnh tượng trưng"
              width={"100%"}
              height={300}
              style={{
                borderRadius: 12,
                objectFit: "cover", // Gợi ý: 'cover' thường đẹp hơn 'fill'
                objectPosition: "center",
              }}
            />
          </SlideInFromLeft>
        </Col>
        <Col xs={24} lg={12}>
          <Flex vertical justify="center" gap={8} style={{ height: "100%" }}>
            <SlideInFromRight type="animate" duration={0.8}>
              <Title level={5}>Âm thanh gợi ý:</Title>
            </SlideInFromRight>
            <SlideInFromRight type="animate" duration={1}>
              <audio
                ref={audioRef}
                src={itemData?.media_audio_url}
                // autoPlay // Cân nhắc bỏ autoPlay nếu nó xung đột với âm thanh hiệu ứng
                controls
                style={{ width: "100%" }}>
                <source src={itemData?.media_audio_url} type="audio/mpeg" />
              </audio>
            </SlideInFromRight>
          </Flex>
        </Col>
      </Row>

      {itemData.body_text && (
        <ZoomMotion type="animate" duration={0.8}>
          <Alert
            message={itemData.body_text}
            type="info"
            showIcon
            style={{ marginBottom: 24, fontSize: 16 }}
            closable
          />
        </ZoomMotion>
      )}

      <Form.Item
        label={
          <ZoomMotion type="animate" duration={0.8}>
            <Title level={4}>{questionData?.question_text}</Title>
          </ZoomMotion>
        }
        name={`chosen_option_id`}
        style={{ textAlign: "center" }}>
        <Tooltip title={listening ? "Dừng ghi âm" : "Nhấn để nói"}>
          <Button
            type="primary"
            shape="round"
            danger={listening}
            icon={listening ? <Spin /> : <AudioOutlined />}
            onClick={handleToggleListening}
            size="large"
            style={{ width: 180 }}>
            {listening ? "Đang ghi âm..." : "Nhấn để nói"}
          </Button>
        </Tooltip>
      </Form.Item>
    </>
  );
};
