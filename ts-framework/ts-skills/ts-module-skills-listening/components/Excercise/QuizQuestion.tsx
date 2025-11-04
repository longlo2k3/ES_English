import { useState, useEffect, useRef } from "react"; // Thêm useEffect
import { Typography, Form, Row, Col, Image, Flex, Spin, Button } from "antd";
import { createStyles } from "antd-style";
import ACard from "@/fer-framework/fe-component/web/ACard";
import SkeletonLoading from "@/ts-framework/ts-component/Skeleton";
import {
  successQues,
  tryAgainSoundUrl,
} from "@/ts-framework/ts-skills/components/SoundEffect";

const { Text } = Typography;

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
  const [selected, setSelected] = useState(null);
  const { styles } = useStyles();

  const audioRef = useRef<HTMLAudioElement>(null);

  const itemData = detailData?.item;
  const questionData = detailData?.questions?.[0];

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

  const handleSelect = (value: any) => {
    setSelected(value);
    form.setFieldsValue({ chosen_option_id: value });
  };

  if (isLoading) {
    return <SkeletonLoading isLoading={isLoading} />;
  }

  if (!questionData) {
    return <Text type="danger">Lỗi: Không tải được dữ liệu câu hỏi.</Text>;
  }

  return (
    <>
      <Form.Item className={styles.section}>
        <Flex align="center" vertical gap={16}>
          <Image
            src={itemData?.media_image_url}
            preview={false}
            alt="ảnh tượng trương"
            width={"60%"}
            height={300}
            style={{
              borderRadius: 4,
            }}
          />
          <Flex vertical align="center" gap={16}>
            <audio
              ref={audioRef}
              src={itemData?.media_audio_url}
              autoPlay
              controls>
              <source src={itemData?.media_audio_url} type="audio/mpeg" />
            </audio>
            <Text italic>{`"${itemData?.body_text}"`}</Text>
          </Flex>
        </Flex>
      </Form.Item>
      <Form.Item
        label={<Text strong>{questionData?.question_text}</Text>}
        name={`chosen_option_id`}>
        <Row gutter={[56, 20]}>
          {questionData?.options?.map((item: any) => {
            let backgroundColor = colors.backgroundDefault;
            let textColor = colors.textDefault;
            let border = colors.borderDefault;

            // Nếu người dùng bỏ qua câu hỏi
            if (isSkip) {
              if (item.is_correct) {
                backgroundColor = colors.backgroundIncorrect;
                textColor = colors.textIncorrect;
                border = colors.borderIncorrect;
              }
            }
            // Nếu người dùng chọn một đáp án
            else if (selected === item._id) {
              if (isCorrect === true) {
                // chọn đúng
                backgroundColor = colors.backgroundCorrect;
                textColor = colors.textCorrect;
                border = colors.borderCorrect;
              } else if (isCorrect === false) {
                // chọn sai
                backgroundColor = colors.backgroundIncorrect;
                textColor = colors.textIncorrect;
                border = colors.borderIncorrect;
              } else {
                // chỉ chọn nhưng chưa check
                backgroundColor = colors.backgroundSelected;
                textColor = colors.textSelected;
                border = colors.borderSelected;
              }
            }
            // Nếu người dùng chọn sai → highlight đáp án đúng thật sự
            else if (isCorrect === false && item.is_correct) {
              backgroundColor = colors.backgroundCorrect;
              textColor = colors.textCorrect;
              border = colors.borderCorrect;
            }

            return (
              <Col xs={12} sm={12} md={12} key={item._id}>
                <ACard
                  hoverable={
                    isCorrect === true || isCorrect === false ? false : true
                  }
                  onClick={() => {
                    if (
                      (isCorrect === false && selected) ||
                      (isCorrect === true && selected)
                    ) {
                      return;
                    } else {
                      handleSelect(item._id);
                    }
                  }}
                  style={{
                    textAlign: "center",
                    backgroundColor,
                    borderRadius: 12,
                    border,
                    transition: "all 0.2s",
                  }}>
                  <Text style={{ color: textColor }}>
                    {item?.label}. {item?.option_text}
                  </Text>
                </ACard>
              </Col>
            );
          })}
        </Row>
      </Form.Item>
    </>
  );
};

const useStyles = createStyles(({ token, css }) => ({
  section: {
    // marginBottom: "24px",
  },
  questionCard: {
    background: "#f9fafb",
    border: "2px dashed #d1d5db",
  },
  questionText: {
    fontSize: "18px",
    textAlign: "center",
    marginBottom: 0,
    fontWeight: 500,
  },
  hintTag: {
    fontSize: "15px",
    borderRadius: "8px",
    padding: "8px 16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  answerInput: {
    fontSize: "18px",
    borderRadius: "8px",
  },
}));
