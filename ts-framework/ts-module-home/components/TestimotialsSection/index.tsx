import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const { Title, Paragraph, Text } = Typography;

function TestimotialsSection() {
  const { t } = useTranslation();
  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={8}>
        <Card bordered={false} style={{ height: "100%" }}>
          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{ marginBottom: 16 }}
          />
          <Paragraph style={{ fontStyle: "italic", minHeight: 100 }}>
            {t("home.testimonials.testimonial1")}
          </Paragraph>
          <Text strong>{t("home.testimonials.name1")}</Text>
          <br />
          <Text type="secondary">{t("home.testimonials.role1")}</Text>
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card bordered={false} style={{ height: "100%" }}>
          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{ marginBottom: 16 }}
          />
          <Paragraph style={{ fontStyle: "italic", minHeight: 100 }}>
            {t("home.testimonials.testimonial2")}
          </Paragraph>
          <Text strong>{t("home.testimonials.name2")}</Text>
          <br />
          <Text type="secondary">{t("home.testimonials.role2")}</Text>
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card bordered={false} style={{ height: "100%" }}>
          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{ marginBottom: 16 }}
          />
          <Paragraph style={{ fontStyle: "italic", minHeight: 100 }}>
            {t("home.testimonials.testimonial3")}
          </Paragraph>
          <Text strong>{t("home.testimonials.name3")}</Text>
          <br />
          <Text type="secondary">{t("home.testimonials.role3")}</Text>
        </Card>
      </Col>
    </Row>
  );
}

export default TestimotialsSection;
