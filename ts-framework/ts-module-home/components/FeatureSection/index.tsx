import ACard from "@/fer-framework/fe-component/web/ACard";
import {
  MessageOutlined,
  ReadOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Row, theme, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const { Title, Paragraph, Text } = Typography;

function FeatureSection() {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <ACard
            hoverable
            bordered={false}
            style={{ height: "100%", padding: "16px" }}>
            <Avatar
              size={64}
              icon={<RobotOutlined />}
              style={{
                backgroundColor: token.colorPrimary,
                marginBottom: 20,
              }}
            />
            <Card.Meta
              title={
                <Title level={4}>{t("home.features.personalized.title")}</Title>
              }
              description={t("home.features.personalized.description")}
            />
          </ACard>
        </Col>
        <Col xs={24} md={8}>
          <Card
            hoverable
            bordered={false}
            style={{ height: "100%", padding: "16px" }}>
            <Avatar
              size={64}
              icon={<ReadOutlined />}
              style={{
                backgroundColor: token.colorSuccess,
                marginBottom: 20,
              }}
            />
            <Card.Meta
              title={
                <Title level={4}>{t("home.features.vocabulary.title")}</Title>
              }
              description={t("home.features.vocabulary.description")}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            hoverable
            bordered={false}
            style={{ height: "100%", padding: "16px" }}>
            <Avatar
              size={64}
              icon={<MessageOutlined />}
              style={{
                backgroundColor: token.colorWarning,
                marginBottom: 20,
              }}
            />
            <Card.Meta
              title={
                <Title level={4}>{t("home.features.speaking.title")}</Title>
              }
              description={t("home.features.speaking.description")}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default FeatureSection;
