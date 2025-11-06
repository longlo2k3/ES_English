import ACard from "@/fer-framework/fe-component/web/ACard";
import { Radar } from "@ant-design/charts";
import {
  CheckCircleOutlined,
  HistoryOutlined,
  RiseOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Calendar, Col, Row, Statistic, Tooltip } from "antd";
import dayjs from "dayjs";
import React from "react";

interface IProps {
  totalScore: number;
  overallAccuracy: number;
  allActivityData: any[];
  radarData: any[];
}

function OverViewTab(props: IProps) {
  const { totalScore, overallAccuracy, allActivityData, radarData } = props;

  // Cấu hình Biểu đồ Radar
  const radarConfig = {
    data: radarData,
    xField: "skill",
    yField: "score",
    meta: {
      score: { alias: "Tổng điểm", min: 0 },
    },
    area: {},
    point: {},
  };

  const dateCellRender = (value: any, data: any) => {
    const dateStr = value.format("YYYY-MM-DD");
    const activities = data.filter(
      (record: any) => dayjs(record.createdAt).format("YYYY-MM-DD") === dateStr
    );

    if (activities.length > 0) {
      return (
        <Tooltip title={`${activities.length} hoạt động`}>
          <div
            style={{
              background: "#d6f4ff",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0,
              opacity: 0.5 + activities.length / 5,
            }}
          />
        </Tooltip>
      );
    }
    return null;
  };

  return (
    <Row gutter={[16, 16]}>
      {/* Thống kê nhanh */}
      <Col xs={24} md={6}>
        <ACard bordered={false}>
          <Statistic
            title="Tổng điểm"
            value={totalScore}
            prefix={<TrophyOutlined />}
          />
        </ACard>
      </Col>
      <Col xs={24} md={6}>
        <ACard bordered={false}>
          <Statistic
            title="Tổng hoạt động"
            value={allActivityData.length}
            prefix={<CheckCircleOutlined />}
          />
        </ACard>
      </Col>
      <Col xs={24} md={6}>
        <ACard bordered={false}>
          <Statistic
            title="Độ chính xác"
            value={overallAccuracy}
            suffix="%"
            prefix={<RiseOutlined />}
          />
        </ACard>
      </Col>
      <Col xs={24} md={6}>
        <ACard bordered={false}>
          <Statistic
            title="Hoạt động cuối"
            value={dayjs(allActivityData[0].last_activity_at).fromNow()}
            prefix={<HistoryOutlined />}
          />
        </ACard>
      </Col>

      {/* Biểu đồ & Lịch */}
      <Col xs={24} lg={12}>
        <ACard
          title="Phân bổ Kỹ năng (Tổng điểm)"
          bordered={false}
          style={{ height: "100%" }}>
          {/* Sử dụng component Radar của @ant-design/charts */}
          <Radar {...radarConfig} height={350} />
        </ACard>
      </Col>
      <Col xs={24} lg={12}>
        <ACard title="Lịch học" bordered={false} style={{ height: "100%" }}>
          {/* Dùng Calendar với custom cell render */}
          <Calendar
            fullscreen={false}
            dateCellRender={(value) => dateCellRender(value, allActivityData)}
          />
        </ACard>
      </Col>
    </Row>
  );
}

export default OverViewTab;
