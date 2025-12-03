import React, { useMemo, useState } from "react";
import {
  Card,
  Result,
  Button,
  Row,
  Col,
  Statistic,
  Progress,
  Typography,
  Alert,
  Divider,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  TrophyOutlined,
  RightOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import HistoryTest from "../HistoryTest";

const { Title, Text } = Typography;

interface TestResultProps {
  attempt_id: string;
  correct: number;
  wrong: number;
  total_questions: number;
  score: number;
}

interface IProps {
  data: TestResultProps;
  onReset: () => void;
}

const TestResult = ({ data, onReset }: IProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const percentage = useMemo(() => {
    return Math.round((data.correct / data.total_questions) * 100);
  }, [data]);

  const getLevelRecommendation = (percent: number) => {
    if (percent >= 80) {
      return {
        level: "Nâng cao",
        message: "Xuất sắc! Bạn có nền tảng rất vững chắc.",
        description:
          "Bạn nên bắt đầu ngay với các bài học nâng cao (Advanced) để thử thách bản thân với các chủ đề chuyên sâu.",
        type: "success",
        icon: <TrophyOutlined />,
      };
    } else if (percent >= 50) {
      return {
        level: "Trung cấp",
        message: "Khá tốt! Bạn đã nắm được kiến thức cơ bản.",
        description:
          "Trình độ Intermediate là điểm khởi đầu phù hợp để bạn mở rộng vốn từ vựng và ngữ pháp phức tạp hơn.",
        type: "info",
        icon: <CheckCircleOutlined />,
      };
    } else {
      return {
        level: "Cơ bản  ",
        message: "Cần cố gắng thêm! Đừng nản chí.",
        description:
          "Chúng tôi khuyên bạn nên bắt đầu từ Beginner để xây dựng lại nền tảng vững chắc nhất.",
        type: "warning",
        icon: <ReloadOutlined />,
      };
    }
  };

  const recommendation = getLevelRecommendation(percentage);

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "800px",
        margin: "0 auto",
      }}>
      <Card
        bordered={false}
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}>
        {/* Phần Header kết quả */}
        <Result
          status={percentage >= 50 ? "success" : "warning"}
          title={
            percentage >= 50
              ? "Hoàn thành bài kiểm tra!"
              : "Đã hoàn thành bài kiểm tra"
          }
          subTitle={`Mã lần thi: ${data.attempt_id}`}
          extra={[
            <Button
              key="next"
              size="large"
              icon={<RightOutlined />}
              onClick={() => setIsOpen(true)}>
              Xem lịch sử bài test
            </Button>,
            <Button
              key="retry"
              type="primary"
              size="large"
              onClick={() => {
                onReset();
                router.refresh();
              }}>
              Làm lại bài test
            </Button>,
          ]}
        />

        <Divider />

        {/* Phần thống kê chi tiết */}
        <Row gutter={[24, 24]} align="middle" justify="center">
          {/* Cột biểu đồ tròn hiển thị điểm số */}
          <Col xs={24} sm={8} style={{ textAlign: "center" }}>
            <Progress
              type="circle"
              percent={percentage}
              format={(percent: any) => (
                <div
                  style={{
                    color: percent >= 50 ? "#52c41a" : "#faad14",
                  }}>{`${percent}%`}</div>
              )}
              strokeColor={percentage >= 50 ? "#52c41a" : "#faad14"}
              width={140}
            />
            <div
              style={{ marginTop: 10, fontWeight: "bold", color: "#8c8c8c" }}>
              Tổng điểm
            </div>
          </Col>

          {/* Cột các con số thống kê */}
          <Col xs={24} sm={16}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card
                  size="small"
                  bordered={false}
                  style={{ backgroundColor: "#f6ffed", textAlign: "center" }}>
                  <Statistic
                    title="Câu đúng"
                    value={data.correct}
                    valueStyle={{ color: "#3f8600" }}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  size="small"
                  bordered={false}
                  style={{ backgroundColor: "#fff1f0", textAlign: "center" }}>
                  <Statistic
                    title="Câu sai"
                    value={data.wrong}
                    valueStyle={{ color: "#cf1322" }}
                    prefix={<CloseCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  size="small"
                  bordered={false}
                  style={{ backgroundColor: "#e6f7ff", textAlign: "center" }}>
                  <Statistic
                    title="Tổng câu"
                    value={data.total_questions}
                    valueStyle={{ color: "#096dd9" }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Phần đề xuất Level */}
            <div style={{ marginTop: "24px" }}>
              <Alert
                message={
                  <Title level={4} style={{ margin: 0 }}>
                    Đề xuất: {recommendation.level}
                  </Title>
                }
                description={<Text>{recommendation.description}</Text>}
                type={recommendation.type as any}
                showIcon
                icon={recommendation.icon}
                style={{ borderRadius: "8px" }}
              />
            </div>
          </Col>
        </Row>
      </Card>

      <HistoryTest
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        attempt_id={data?.attempt_id}
      />
    </div>
  );
};

export default TestResult;
