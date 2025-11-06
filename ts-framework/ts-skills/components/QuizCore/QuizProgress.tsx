import { Progress, Row, Col, Typography } from "antd";
import { useTranslation } from "react-i18next"; // <-- Giữ lại
// import { QuizProgressProps } from "@/ts-framework/ts-skills/ts-module-skills-writing/const/type";

const { Text } = Typography;

// Giả định kiểu dữ liệu props (bạn có thể import từ file gốc)
type QuizProgressProps = {
  current: number;
  total: number;
  score: number;
  answered: number;
  progress: number;
};

export const QuizProgress = ({
  current,
  total,
  score,
  answered,
  progress,
}: QuizProgressProps) => {
  const { t } = useTranslation();

  return (
    <div style={{ marginBottom: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 8 }}>
        <Col>
          <Text type="secondary">
            {t("quiz.progress.question")} {current} / {total}
          </Text>
        </Col>

        <Col>
          <Text strong>
            {t("quiz.progress.score")} : {score} / {answered * 10}
          </Text>
        </Col>
      </Row>

      <Progress
        percent={progress}
        strokeColor={{
          "100%": "rgb(88, 204, 2)",
        }}
        status="active"
        showInfo={false}
      />
    </div>
  );
};
