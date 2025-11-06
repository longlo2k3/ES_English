import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Radio,
  Space,
  Button,
  Statistic,
  Modal,
  Typography,
  Divider,
  Tag,
  Alert,
} from "antd";
import {
  ClockCircleOutlined,
  LeftOutlined,
  RightOutlined,
  CheckOutlined,
  FlagOutlined, // Icon để đánh dấu
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Countdown } = Statistic;

// Dữ liệu mẫu cho bài thi
const examData = [
  {
    question: 'Which word is a synonym for "happy"?',
    options: ["Sad", "Joyful", "Angry", "Tired"],
    correctAnswer: 1, // index của 'Joyful'
  },
  {
    question: "Choose the correct sentence:",
    options: [
      "He go to school everyday.",
      "He goes to school everyday.",
      "He going to school everyday.",
      "He gone to school everyday.",
    ],
    correctAnswer: 1,
  },
  {
    question: 'What is the past tense of "eat"?',
    options: ["Eaten", "Ate", "Eating", "Eats"],
    correctAnswer: 1,
  },
  // ... thêm 37 câu nữa để đủ 40 câu
];

// Giả lập 40 câu hỏi
const totalQuestions = 40;
for (let i = 3; i < totalQuestions; i++) {
  examData.push({
    question: `Đây là nội dung câu hỏi số ${i + 1}.`,
    options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
    correctAnswer: 0,
  });
}

const MockExamInterface = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0); // Vị trí câu hỏi hiện tại
  const [userAnswers, setUserAnswers] = useState(
    new Array(totalQuestions).fill(null)
  ); // Mảng lưu các câu trả lời
  const [flagged, setFlagged] = useState(new Array(totalQuestions).fill(false)); // Mảng lưu các câu bị đánh dấu

  // Hết giờ
  const onFinish = () => {
    console.log("Hết giờ!");
    showSubmitConfirm();
  };

  // Hiển thị modal xác nhận nộp bài
  const showSubmitConfirm = () => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn nộp bài?",
      content: "Bạn sẽ không thể thay đổi câu trả lời của mình sau khi nộp.",
      okText: "Nộp bài",
      cancelText: "Hủy",
      onOk: () => {
        // Xử lý logic nộp bài tại đây
        console.log("Bài đã được nộp!", userAnswers);
      },
    });
  };

  // Xử lý khi chọn đáp án
  const handleAnswerChange = (e) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = e.target.value;
    setUserAnswers(newAnswers);
  };

  // Chuyển câu hỏi
  const goToQuestion = (index) => {
    if (index >= 0 && index < totalQuestions) {
      setCurrentQuestion(index);
    }
  };

  // Đánh dấu câu hỏi
  const toggleFlag = () => {
    const newFlags = [...flagged];
    newFlags[currentQuestion] = !newFlags[currentQuestion];
    setFlagged(newFlags);
  };

  // Render câu hỏi hiện tại
  const currentQ = examData[currentQuestion];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header của bài thi */}
      <Header
        style={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #f0f0f0",
          padding: "0 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Title level={4} style={{ margin: 0 }}>
          Bài thi thử - 60 Phút
        </Title>
        <Button
          type="primary"
          danger
          icon={<CheckOutlined />}
          onClick={showSubmitConfirm}>
          Nộp bài
        </Button>
      </Header>

      <Layout>
        {/* Nội dung chính: Câu hỏi và đáp án */}
        <Content style={{ padding: "24px" }}>
          <Alert
            message="Hướng dẫn"
            description="Chọn đáp án đúng cho mỗi câu hỏi. Bạn có thể dùng Bảng câu hỏi bên phải để chuyển đến bất kỳ câu nào."
            type="info"
            showIcon
            closable
            style={{ marginBottom: "24px" }}
          />

          <Card
            bordered={false}
            style={{ minHeight: "calc(100vh - 200px)" }}
            title={
              <Space>
                <Title level={5} style={{ margin: 0 }}>
                  Câu {currentQuestion + 1}/{totalQuestions}:
                </Title>
                <Button
                  icon={<FlagOutlined />}
                  type={flagged[currentQuestion] ? "primary" : "default"}
                  onClick={toggleFlag}>
                  {flagged[currentQuestion] ? "Bỏ đánh dấu" : "Đánh dấu"}
                </Button>
              </Space>
            }>
            <Paragraph style={{ fontSize: "16px", fontWeight: 500 }}>
              {currentQ.question}
            </Paragraph>

            {/* Dùng Radio.Group cho câu hỏi 1 lựa chọn */}
            <Radio.Group
              onChange={handleAnswerChange}
              value={userAnswers[currentQuestion]}>
              <Space direction="vertical" size="large">
                {currentQ.options.map((option, index) => (
                  <Radio key={index} value={index} style={{ fontSize: "16px" }}>
                    {String.fromCharCode(65 + index)}. {option}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Card>

          {/* Thanh điều hướng Trước/Sau */}
          <Row justify="space-between" style={{ marginTop: "24px" }}>
            <Button
              icon={<LeftOutlined />}
              onClick={() => goToQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}>
              Câu trước
            </Button>
            <Button
              type="primary"
              icon={<RightOutlined />}
              iconPosition="end"
              onClick={() => goToQuestion(currentQuestion + 1)}
              disabled={currentQuestion === totalQuestions - 1}>
              Câu sau
            </Button>
          </Row>
        </Content>

        {/* Thanh bên: Thời gian và Bảng câu hỏi */}
        <Sider
          width={300}
          theme="light"
          style={{
            padding: "24px",
            borderLeft: "1px solid #f0f0f0",
            overflowY: "auto",
          }}>
          <Title level={5}>Thời gian còn lại</Title>
          <Countdown
            title={
              <Text type="danger">
                <ClockCircleOutlined /> Thời gian
              </Text>
            }
            value={Date.now() + 60 * 60 * 1000} // 60 phút
            onFinish={onFinish}
            valueStyle={{ color: "#cf1322", fontSize: "28px" }}
          />

          <Divider />

          <Title level={5}>Bảng câu hỏi</Title>
          <Paragraph type="secondary">
            Nhấn vào số để chuyển đến câu hỏi đó.
          </Paragraph>
          <Space size={[8, 8]} wrap>
            {Array.from({ length: totalQuestions }, (_, i) => {
              let type = "default";
              if (i === currentQuestion) {
                type = "primary"; // Câu hiện tại
              } else if (userAnswers[i] !== null) {
                type = "dashed"; // Câu đã trả lời (dùng 'dashed' cho nhẹ nhàng)
              }

              return (
                <Button
                  key={i}
                  type={type}
                  shape="circle"
                  onClick={() => goToQuestion(i)}
                  style={{
                    width: 40,
                    height: 40,
                    borderColor: flagged[i] ? "#faad14" : undefined, // Viền vàng nếu bị đánh dấu
                    borderWidth: flagged[i] ? 2 : 1,
                  }}>
                  {i + 1}
                </Button>
              );
            })}
          </Space>
        </Sider>
      </Layout>
    </Layout>
  );
};

export default MockExamInterface;
