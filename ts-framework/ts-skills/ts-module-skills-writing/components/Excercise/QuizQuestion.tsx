import { useState, useEffect, useRef } from "react"; // Thêm useEffect
import {
  Typography,
  Form,
  Row,
  Col,
  Image,
  Flex,
  Spin,
  Input,
  Alert,
} from "antd";
import { createStyles } from "antd-style";
import ACard from "@/fer-framework/fe-component/web/ACard";
import SpinLoading from "@/ts-framework/ts-component/Spin";
import SkeletonLoading from "@/ts-framework/ts-component/Skeleton";
import {
  successQues,
  tryAgainSoundUrl,
} from "@/ts-framework/ts-skills/components/SoundEffect";
import CKEditorWrapper from "@/ts-framework/ts-component/CKEditorWrapper";
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

  const audioRef = useRef<HTMLAudioElement>(null);

  const questionData = detailData?.questions?.[0];

  const itemData = detailData?.item;

  useEffect(() => {
    let soundUrl;

    if (isCorrect === true) {
      soundUrl = successQues;
    } else if (isCorrect === false) {
      soundUrl = tryAgainSoundUrl;
    } else if (isSkip === true) {
      soundUrl = tryAgainSoundUrl;
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
    if (!itemData) return;
    form.setFieldsValue({ content: itemData?.body_text });
  }, [itemData]);

  if (isLoading) {
    return <SkeletonLoading isLoading={isLoading} />;
  }

  return (
    <>
      <Form.Item name={"content"} initialValue={itemData?.body_text} hidden />

      <Row
        gutter={[24, 24]}
        justify={!itemData?.media_audio_url ? "center" : "start"}
        style={{ marginBottom: 24 }}>
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

        {itemData?.media_audio_url && (
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
        )}
      </Row>

      {itemData?.body_text && (
        <ZoomMotion type="animate" duration={0.8}>
          <Alert
            message={itemData.body_text}
            type="info"
            showIcon
            style={{ marginBottom: 24, fontSize: 16 }}
          />
        </ZoomMotion>
      )}

      <Form.Item
        label={
          <ZoomMotion type="animate" duration={0.8}>
            <Title level={4}>{questionData?.question_text}</Title>
          </ZoomMotion>
        }
        name={`chosen_option_id`}>
        <CKEditorWrapper isDisabled={false} height={100} />
      </Form.Item>
    </>
  );
};
