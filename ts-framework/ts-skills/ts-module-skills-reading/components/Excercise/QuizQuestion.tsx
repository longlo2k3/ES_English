import { useState, useEffect } from "react"; // Thêm useEffect
import { Typography, Form, Row, Col, Image, Flex, Spin } from "antd";
import { createStyles } from "antd-style";
import ACard from "@/fer-framework/fe-component/web/ACard";
import SpinLoading from "@/ts-framework/ts-component/Spin";

const { Text } = Typography;

interface IProps {
  detailData: any;
  isLoading: boolean;
  isCorrect?: boolean;
  correctAnswer?: string;
}

export const QuizQuestion = ({ detailData, isLoading, isCorrect }: IProps) => {
  const form = Form.useFormInstance();
  const [selected, setSelected] = useState(null);
  const { styles } = useStyles();

  const itemData = detailData?.item;
  const questionData = detailData?.questions?.[0];

  useEffect(() => {
    setSelected(null);
  }, [detailData]);

  const handleSelect = (value: any) => {
    setSelected(value);
    form.setFieldsValue({ chosen_option_id: value });
  };

  if (isLoading) {
    return <SpinLoading isLoading={true} style={{ minHeight: 400 }} />;
  }

  if (!questionData) {
    return <Text type="danger">Lỗi: Không tải được dữ liệu câu hỏi.</Text>;
  }

  console.log("isCorrect", isCorrect);

  return (
    <>
      <Form.Item className={styles.section}>
        <Flex align="center" vertical gap={16}>
          <Image
            src={itemData?.media_image_url}
            preview={false}
            alt="ảnh tượng trương"
            width={"100%"}
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
        <Row gutter={[56, 20]}>
          {questionData?.options?.map((item: any) => {
            let backgroundColor = "#f9fafb";
            let textColor = "#000000";

            if (selected === item._id && isCorrect === undefined) {
              backgroundColor = "#6b11cb";
              textColor = "#ffffff";
            } else if (selected === item._id && isCorrect === true) {
              backgroundColor = "#22c55e";
              textColor = "#ffffff";
            } else if (selected === item._id && isCorrect === false) {
              backgroundColor = "#ef4444";
              textColor = "#ffffff";
            } else if (item.is_correct === true && isCorrect === false) {
              backgroundColor = "#22c55e";
              textColor = "#ffffff";
            }

            return (
              <Col xs={12} sm={12} md={12} key={item._id}>
                <ACard
                  hoverable
                  onClick={() => handleSelect(item._id)}
                  style={{
                    textAlign: "center",
                    backgroundColor,
                    borderRadius: 12,
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
    marginBottom: "24px",
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
