import { useState, useEffect, useRef } from "react";
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
  Tooltip, // <-- Thêm
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

const { Text } = Typography;

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
  const [selected, setSelected] = useState(null);

  const audioRef = useRef<HTMLAudioElement>(null);

  const itemData = detailData?.item;
  const questionData = detailData?.questions?.[0];
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setSelected(null);
  }, [detailData]);

  useEffect(() => {
    setSelected(null);
  }, [isSkip]);

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
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ language: "en-US" });
    }
  };

  const handleReset = () => {
    resetTranscript();
    form.setFieldsValue({ chosen_option_id: "" });
  };

  const handleSelect = (value: any) => {
    setSelected(value);
    form.setFieldsValue({ chosen_option_id: value });
  };

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

  console.log("detailData>>", detailData);

  return (
    <>
      <Form.Item name={"content"} hidden />
      <Form.Item>
        <Flex align="center" vertical gap={16}>
          <Image
            src={itemData?.media_image_url}
            preview={false}
            alt="ảnh tượng trương"
            width={"100%"}
            height={300}
            style={{
              borderRadius: 4,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <Flex vertical align="center" gap={16}>
            {itemData?.media_audio_url && (
              <audio
                ref={audioRef}
                src={itemData?.media_audio_url}
                autoPlay
                controls>
                <source src={itemData?.media_audio_url} type="audio/mpeg" />
              </audio>
            )}
            <Text italic>{`"${itemData?.body_text}"`}</Text>
          </Flex>
        </Flex>
      </Form.Item>
      <Form.Item
        label={
          <Text style={{ fontSize: 16 }} strong>
            {questionData?.question_text}
          </Text>
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
