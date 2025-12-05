import React from "react";
import { Layout, Row, Col, Tabs, Typography, Space, theme } from "antd";

import "antd/dist/reset.css";

import TotalInforCard from "./TotalInfoCard";
import ParamterSkills from "./ParamterSkills";
import ParamterTest from "./ParamterTest";
import ActivityHeatmapCalendar from "./ActivityHeatmapCalendar";
import ParamaterSkillsRadar from "./ParamaterSkillsRadar";
import Illustration from "./Illustration";
import { useTheme } from "@/fer-framework/fe-global/themes";

const { Content } = Layout;

// --- BƯỚC 3: COMPONENT TRANG TIẾN ĐỘ CHÍNH ---

interface IProps {
  data: any;
}

const OverView = ({ data }: IProps) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { mode } = useTheme();
  return (
    <Layout>
      <Content
        style={{
          padding: "24px",
          backgroundColor: mode === "dark" ? colorBgContainer : "#f0f2f5",
        }}>
        <Space direction="vertical" size="large" style={{ display: "flex" }}>
          <Row gutter={[16, 16]}>
            <TotalInforCard item={data} />
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Space
                direction="vertical"
                size="large"
                style={{ display: "flex" }}>
                <ParamterSkills item={data} />

                {/* 4. Thi thử (DÙNG BIỂU ĐỒ ĐƯỜNG) */}
                <ParamterTest item={data} />

                {/* 5. Lịch sử Hoạt động (Heatmap) */}
                <ActivityHeatmapCalendar item={data} />
              </Space>
            </Col>

            {/* --- CỘT BÊN PHẢI (THÔNG TIN PHỤ) --- */}
            <Col xs={24} lg={8}>
              <Space
                direction="vertical"
                size="large"
                style={{ display: "flex" }}>
                <ParamaterSkillsRadar item={data} />

                {/* 3. Flashcards */}
                {/* <Card
                  title={
                    <Title level={4}>
                      <IdcardOutlined /> Flashcards
                    </Title>
                  }>
                  <Statistic
                    title="Tổng số từ đã học"
                    value={flashcards.totalLearned}
                  />
                  <Button
                    type="primary"
                    size="large"
                    block
                    style={{ margin: "24px 0", fontWeight: "bold" }}>
                    Ôn tập ngay ({flashcards.dueForReviewToday} từ)
                  </Button>
                  <Descriptions bordered column={1} size="small">
                    <Descriptions.Item label="Đã thuộc">
                      {flashcards.byStatus.mastered}
                    </Descriptions.Item>
                    <Descriptions.Item label="Đang học">
                      {flashcards.byStatus.learning}
                    </Descriptions.Item>
                    <Descriptions.Item label="Từ mới">
                      {flashcards.byStatus.new}
                    </Descriptions.Item>
                  </Descriptions>
                </Card> */}

                {/* 6. Gợi ý (DÙNG ILLUSTRATION) */}
                <Illustration item={data} />
              </Space>
            </Col>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
};

export default OverView;
