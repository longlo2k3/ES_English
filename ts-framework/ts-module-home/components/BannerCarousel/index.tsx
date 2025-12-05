import { Col, Row, theme, Typography } from "antd";
import React from "react";
import Banner from "./Banner";

import {
  SlideInFromBottom,
  SlideInFromRight,
  ZoomMotion,
} from "@/fer-framework/fe-component/web/MotionWrapper";
import TypeAnimationWrapper from "@/fer-framework/fe-component/web/TypeAnimation";
import { useTranslation } from "react-i18next";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

function BannerCarousel() {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  return (
    <Row align="middle" gutter={48}>
      <Col xs={24} md={12}>
        <ZoomMotion viewport={{ once: true, amount: 0.8 }}>
          <Title
            level={1}
            style={{
              fontSize: "3.2rem",
              marginBottom: 24,
              lineHeight: "1.2",
            }}>
            {t("home.intro.title")}
          </Title>
        </ZoomMotion>
        <TypeAnimationWrapper
          sequence={[{ text: t("home.intro.description"), delay: 1000 }]}
          speed={85}
        />
        <SlideInFromBottom duration={1} viewport={{ once: true, amount: 0.8 }}>
          <Paragraph style={{ marginBottom: 32, fontSize: "16px" }}>
            <Text type="secondary">
              <CheckCircleOutlined
                style={{ color: token.colorSuccess, marginRight: 8 }}
              />
              {t("home.features_list.practice")}
            </Text>
            <br />
            <Text type="secondary">
              <CheckCircleOutlined
                style={{ color: token.colorSuccess, marginRight: 8 }}
              />
              {t("home.features_list.personalize")}
            </Text>
            <br />
            <Text type="secondary">
              <CheckCircleOutlined
                style={{ color: token.colorSuccess, marginRight: 8 }}
              />
              {t("home.features_list.international")}
            </Text>
          </Paragraph>
        </SlideInFromBottom>
      </Col>
      <Col xs={24} md={12} style={{ marginTop: 30 }}>
        <SlideInFromRight viewport={{ once: true, amount: 0.8 }}>
          <Banner />
        </SlideInFromRight>
      </Col>
    </Row>
  );
}

export default BannerCarousel;
