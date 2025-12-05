import { ClockCircleOutlined } from "@ant-design/icons";
import { Progress, Row, Col, Typography, Space, Flex } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

type QuizProgressProps = {
  current: number;
  total: number;
  score: number;
  answered: number;
  progress: number;
};

function fmt(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(mm)}:${pad(ss)}`;
}

export const QuizProgress = ({
  current,
  total,
  score,
  progress,
}: QuizProgressProps) => {
  const { t } = useTranslation();

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ margin: "16px 0" }}>
      {/* Sử dụng Row để sắp xếp mọi thứ trên một hàng */}
      <Row justify="space-between" align="middle" gutter={[16, 0]}>
        {/* 1. Thông tin câu hỏi (bên trái) */}
        <Col>
          <Text type="secondary" style={{ whiteSpace: "nowrap", fontSize: 16 }}>
            {t("quiz.progress.question")} {current} / {total}
          </Text>
        </Col>

        {/* 3. Điểm số (bên phải) */}
        <Col>
          {/* <Text strong style={{ whiteSpace: "nowrap" }}>
            {t("quiz.progress.score")} : {score}
          </Text> */}
          <Flex gap={8} align="center">
            <ClockCircleOutlined
              style={{
                fontSize: 16,
                color: "#1677ff",
              }}
            />
            <Text strong style={{ fontSize: 16, fontFamily: "monospace" }}>
              {fmt(seconds)}
            </Text>
          </Flex>
        </Col>
      </Row>

      {/* 2. Thanh Progress (ở giữa, lấp đầy) */}
      <Progress
        percent={progress}
        strokeColor={{
          "100%": "rgb(88, 204, 2)",
          "0%": "rgb(88, 204, 2)",
        }}
        status="active"
        showInfo={false}
        // Xóa margin-bottom mặc định để căn giữa theo chiều dọc
        style={{ marginBottom: 0 }}
      />
    </div>
  );
};
