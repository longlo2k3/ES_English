import { use, useState } from "react";
import { Card, Typography, Form, Row, Col, Image, Flex } from "antd";
import { createStyles } from "antd-style";

const { Title, Text } = Typography;

export const QuizQuestion = () => {
  const form = Form.useFormInstance();
  const [selected, setSelected] = useState(null);

  const { styles } = useStyles();

  const handleSelect = (value) => {
    setSelected(value);
    form.setFieldsValue({ drink: value });
  };

  return (
    <>
      <Form.Item className={styles.section}>
        <Flex align="center" gap={16}>
          <audio controls style={{ width: "150px" }}>
            <source
              src={"/audio/intermediate-exercise.mp3"}
              type="audio/mpeg"
            />
            Trình duyệt không hỗ trợ audio
          </audio>
          <Text>Listen and choose the correct drink:</Text>
        </Flex>
      </Form.Item>
      <Form.Item label="" name={`drink`}>
        <Row gutter={[56, 56]}>
          {drinkOptions.map((item) => (
            <Col xs={12} sm={12} md={12} key={item.label}>
              <Card
                hoverable
                onClick={() => handleSelect(item.label)}
                style={{
                  textAlign: "center",

                  border: `2px solid ${
                    selected === item.label ? "#6b11cbff" : "#e6e6e6ff"
                  }`,
                  transition: "all 0.2s",
                  borderRadius: 12,
                }}>
                <Image
                  src={item.img}
                  alt={item.label}
                  preview={false}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "contain",
                    marginBottom: 8,
                  }}
                />
                <div
                  style={{
                    fontWeight: 500,
                    fontSize: 16,
                  }}>
                  {item.label}
                </div>
              </Card>
            </Col>
          ))}
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
