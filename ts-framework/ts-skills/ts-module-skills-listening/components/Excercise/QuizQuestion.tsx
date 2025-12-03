import { useEffect, useRef } from "react";
import { Typography, Form, Row, Col, Image, Flex, Alert, Badge } from "antd";
import ACard from "@/fer-framework/fe-component/web/ACard";
import SkeletonLoading from "@/ts-framework/ts-component/Skeleton";
import {
  successQues,
  tryAgainSoundUrl,
} from "@/ts-framework/ts-skills/components/SoundEffect";
import {
  SlideInFromBottom,
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

const colors = {
  backgroundCorrect: "#d7ffb8",
  backgroundIncorrect: "#ffdfe0",
  backgroundDefault: "#f9fafb",
  backgroundSelected: "#DDF4FF",
  textDefault: "#000000",
  textCorrect: "#58CC02",
  textIncorrect: "#FF4B4B",
  textSelected: "#1899D6",
  borderDefault: "1px solid #e5e5e5",
  borderCorrect: "1px solid #58CC02",
  borderIncorrect: "1px solid #FF4B4B",
  borderSelected: "1px solid #1899D6",
};

export const QuizQuestion = ({
  detailData,
  isLoading,
  isCorrect,
  isSkip,
}: IProps) => {
  const form = Form.useFormInstance();

  console.log("detailData>>", detailData);

  // Refactor 1: Sử dụng Form.useWatch làm nguồn sự thật duy nhất
  const selected = Form.useWatch("chosen_option_id", form);

  const audioRef = useRef<HTMLAudioElement>(null);

  const itemData = detailData?.item;
  const questionData = detailData?.questions?.[0];

  // Refactor 2: Gộp các useEffects reset
  useEffect(() => {
    // Reset lựa chọn khi câu hỏi mới được tải hoặc khi skip
    form.setFieldsValue({ chosen_option_id: null });
  }, [detailData, isSkip, form]);

  // Refactor 3: Tối ưu useEffect âm thanh
  useEffect(() => {
    let soundUrl: string | undefined;

    if (isCorrect === true) {
      soundUrl = successQues;
    } else if (isCorrect === false || isSkip === true) {
      // Gộp logic
      soundUrl = tryAgainSoundUrl;
    }

    // Chỉ phát âm thanh nếu soundUrl được xác định
    if (soundUrl) {
      // Tạm dừng âm thanh gợi ý nếu nó đang phát
      audioRef.current?.pause();

      const effectAudio = new Audio(soundUrl);
      effectAudio.play().catch((e) => {
        console.warn("Lỗi phát âm thanh tự động:", e);
      });

      // Cleanup function cho âm thanh hiệu ứng
      return () => {
        effectAudio.pause();
        effectAudio.currentTime = 0;
      };
    }
  }, [isCorrect, isSkip]);

  // Refactor 4: Thêm logic guard vào handleSelect
  const handleSelect = (value: string) => {
    // Không cho phép chọn nếu đã check hoặc đã skip
    if (isCorrect !== undefined || isSkip) {
      return;
    }
    form.setFieldsValue({ chosen_option_id: value });
  };

  // Refactor 5: Tách logic style ra hàm riêng
  const getOptionStyle = (item: any) => {
    const isChosen = selected === item._id;
    const isActualCorrect = item.is_correct;

    // Trường hợp 1: Đã Skip
    if (isSkip) {
      // Logic gốc của bạn: highlight đáp án đúng bằng màu đỏ (sai)
      if (isActualCorrect) {
        return {
          backgroundColor: colors.backgroundIncorrect,
          textColor: colors.textIncorrect,
          border: colors.borderIncorrect,
          badgeColor: colors.textIncorrect,
        };
      }
      return {}; // Mặc định
    }

    // Trường hợp 2: Đã Check (isCorrect có giá trị true/false)
    if (isCorrect !== undefined) {
      if (isChosen) {
        // Đây là đáp án người dùng đã chọn
        return isCorrect
          ? {
              // Chọn Đúng
              backgroundColor: colors.backgroundCorrect,
              textColor: colors.textCorrect,
              border: colors.borderCorrect,
              badgeColor: colors.textCorrect,
            }
          : {
              // Chọn Sai
              backgroundColor: colors.backgroundIncorrect,
              textColor: colors.textIncorrect,
              border: colors.borderIncorrect,
              badgeColor: colors.textIncorrect,
            };
      }
      if (isActualCorrect) {
        // Đây là đáp án đúng (khi người dùng chọn sai)
        return {
          backgroundColor: colors.backgroundCorrect,
          textColor: colors.textCorrect,
          border: colors.borderCorrect,
          badgeColor: colors.textCorrect,
        };
      }
      return {}; // Mặc định (cho các đáp án sai khác)
    }

    // Trường hợp 3: Mới chỉ chọn (chưa Check)
    if (isChosen) {
      return {
        backgroundColor: colors.backgroundSelected,
        textColor: colors.textSelected,
        border: colors.borderSelected,
        badgeColor: colors.textSelected,
      };
    }

    // Trường hợp 4: Mặc định
    return {};
  };

  if (isLoading) {
    return <SkeletonLoading isLoading={isLoading} />;
  }

  if (!questionData) {
    // Refactor 6: Dùng Alert cho thông báo lỗi
    return (
      <Alert
        message="Lỗi"
        description="Không tải được dữ liệu câu hỏi. Vui lòng thử lại."
        type="error"
        showIcon
      />
    );
  }

  const hasSubmitted = isCorrect !== undefined || isSkip;

  return (
    <>
      {/* Refactor 6: Loại bỏ Form.Item không cần thiết */}
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

      {itemData?.body_text && (
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

      {/* Form.Item này chủ yếu dùng để hiển thị label */}
      <Form.Item
        label={
          <ZoomMotion type="animate" duration={0.8}>
            <Title level={4}>{questionData?.question_text}</Title>
          </ZoomMotion>
        }
        name="chosen_option_id">
        <Row gutter={[56, 20]}>
          {questionData?.options?.map((item: any) => {
            // Lấy style từ hàm helper
            const { backgroundColor, textColor, border, badgeColor } =
              getOptionStyle(item);

            return (
              <Col xs={12} sm={12} md={12} key={item._id}>
                <SlideInFromBottom type="animate" duration={0.8}>
                  <ACard
                    hoverable={!hasSubmitted} // Đơn giản hóa
                    onClick={() => handleSelect(item._id)} // Đơn giản hóa
                    style={{
                      textAlign: "center",
                      backgroundColor:
                        backgroundColor || colors.backgroundDefault,
                      borderRadius: 12,
                      border: border || colors.borderDefault,
                      transition: "all 0.2s",
                      cursor: hasSubmitted ? "not-allowed" : "pointer", // Thêm cursor
                    }}>
                    <Flex gap={8}>
                      <Badge
                        count={item?.label}
                        color={badgeColor || "rgb(186 181 171)"}></Badge>
                      <Text style={{ color: textColor || colors.textDefault }}>
                        {item?.option_text}
                      </Text>
                    </Flex>
                  </ACard>
                </SlideInFromBottom>
              </Col>
            );
          })}
        </Row>
      </Form.Item>
    </>
  );
};
