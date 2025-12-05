import {
  CheckCircleOutlined,
  FieldTimeOutlined,
  FireOutlined,
  HistoryOutlined,
  RiseOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Card, Col, Statistic, Typography } from "antd";
import React, { useMemo } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

interface TotalInfoCardProps {
  item: any;
}

function TotalInforCard({ item }: TotalInfoCardProps) {
  const { t } = useTranslation();

  const accuracy = useMemo(() => {
    if (!item || item.total_user_attempts === 0) return 0;
    return (
      (item?.total_user_score / (item?.total_user_questions * 10)) * 100 || 0
    );
  }, [item]);

  return (
    <>
      {/* Thẻ Chuỗi ngày được làm nổi bật */}
      <Col xs={24} md={6}>
        <Card
          style={{
            background: "linear-gradient(135deg, #f6e384, #ffd57e)",
            color: "#a05e03",
            border: "none",
          }}>
          <Statistic
            title={t("_progress.overview.total")}
            value={`${item?.total_user_score || 0} ${t(
              "_progress.overview.point"
            )}`}
            prefix={<TrophyOutlined />}
          />
        </Card>
      </Col>
      {/* Các thẻ thông thường */}
      <Col xs={24} md={6}>
        <Card>
          <Statistic
            title={t("_progress.overview.timeline")}
            value={`${((item?.study_time?.total_7days || 0) / 60 / 60).toFixed(
              1
            )} ${t("_progress.overview.hour")}`}
            prefix={<CheckCircleOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} md={6}>
        <Card>
          <Statistic
            title={t("_progress.overview.accuracy")}
            value={accuracy.toFixed(2)}
            suffix="%"
            prefix={<RiseOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} md={6}>
        <Card>
          <Statistic
            title={t("_progress.overview.lastTime")}
            value={
              item?.study_time?.daily?.[item?.study_time?.daily?.length - 1]
                ?.date
            }
            prefix={<HistoryOutlined />}
          />
        </Card>
      </Col>
    </>
  );
}

export default TotalInforCard;
