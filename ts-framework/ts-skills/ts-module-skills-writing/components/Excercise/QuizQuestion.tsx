import { useState, useEffect } from "react"; // Thêm useEffect
import { Typography, Form, Row, Col, Image, Flex, Spin } from "antd";
import { createStyles } from "antd-style";
import ACard from "@/fer-framework/fe-component/web/ACard";
import SpinLoading from "@/ts-framework/ts-component/Spin";
import SkeletonLoading from "@/ts-framework/ts-component/Skeleton";
import {
  successQues,
  tryAgainSoundUrl,
} from "@/ts-framework/ts-skills/components/SoundEffect";
import CKEditorWrapper from "@/ts-framework/ts-component/CKEditorWrapper";

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
          <Flex align="center" gap={16}>
            <Text italic>{`"${itemData?.body_text}"`}</Text>
          </Flex>
        </Flex>
      </Form.Item>
      <Form.Item
        label={<Text strong>{questionData?.question_text}</Text>}
        name={`chosen_option_id`}>
        <CKEditorWrapper isDisabled={false} height={100} />
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
