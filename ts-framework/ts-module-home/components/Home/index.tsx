import React from "react";
import { Typography, Steps, theme } from "antd";

import { useTranslation } from "react-i18next";

import { ZoomMotion } from "@/fer-framework/fe-component/web/MotionWrapper";
import { SlideInFromBottom } from "@/fer-framework/fe-component/web/MotionWrapper";
import BannerCarousel from "../BannerCarousel";
import FeatureSection from "../FeatureSection";
import WorkSection from "../WorkSection";
import TestimotialsSection from "../TestimotialsSection";

const { Title } = Typography;

const ESHomepageContent = () => {
  const { token } = theme.useToken();

  const { t } = useTranslation();

  const sectionStyle = {
    padding: "20px 0 60px 0",
    width: "100%",
    background: token.colorBgContainer,
  };

  const darkSectionStyle = {
    padding: "60px 0",
    width: "100%",
    background: token.colorBgLayout,
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
  };

  return (
    <>
      <div style={sectionStyle}>
        <div style={containerStyle}>
          <BannerCarousel />
        </div>
      </div>

      {/* 2. FEATURES SECTION (Tinh chỉnh) */}
      <div style={darkSectionStyle}>
        <div style={{ ...containerStyle, textAlign: "center" }}>
          <ZoomMotion viewport={{ once: true, amount: 0.8 }}>
            <Title level={2} style={{ marginBottom: 48 }}>
              {t("home.features.title")}
            </Title>
          </ZoomMotion>
          <SlideInFromBottom viewport={{ once: true, amount: 0.8 }}>
            <FeatureSection />
          </SlideInFromBottom>
        </div>
      </div>

      {/* 3. HOW IT WORKS SECTION */}
      <div style={sectionStyle}>
        <div style={{ ...containerStyle, textAlign: "center" }}>
          <ZoomMotion viewport={{ once: true, amount: 0.8 }}>
            <Title level={2} style={{ marginBottom: 48 }}>
              {t("home.howItWorks.title")}
            </Title>
          </ZoomMotion>

          <SlideInFromBottom viewport={{ once: true, amount: 0.8 }}>
            <WorkSection />
          </SlideInFromBottom>
        </div>
      </div>

      {/* 4. TESTIMONIALS SECTION (PHẦN MỚI) */}
      <div style={darkSectionStyle}>
        <div style={{ ...containerStyle, textAlign: "center" }}>
          <ZoomMotion viewport={{ once: true, amount: 0.8 }}>
            <Title level={2} style={{ marginBottom: 48 }}>
              {t("home.testimonials.title")}
            </Title>
          </ZoomMotion>

          <SlideInFromBottom viewport={{ once: true, amount: 0.8 }}>
            <TestimotialsSection />
          </SlideInFromBottom>
        </div>
      </div>
    </>
  );
};

export default ESHomepageContent;
