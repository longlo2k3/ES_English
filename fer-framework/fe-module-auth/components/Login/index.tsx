"use client";

import GlobalLogo from "@/fer-framework/fe-cores/layouts/GlobalSider/GlobalLogo";
import { Card, Flex, Layout, Segmented, theme, Typography } from "antd";

import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

// Components

// Apis
import { ToastContainer } from "react-toastify";
import LoginForm from "./LoginForm";
import { LanguageSwitcher } from "@/fer-framework/fe-cores/components/LanguageSwitch";
import { SlideInFromLeft } from "@/fer-framework/fe-component/web/MotionWrapper";
import SignUp from "../SignUp";
import FramerMotionWrapper from "@/ts-framework/ts-component/FramerMotionWrapper";

const { Title, Text } = Typography;

function FormLogin() {
  const { t } = useTranslation();
  const [type, setType] = useState<string>("login");

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Flex vertical gap={24} justify="space-between">
        <FramerMotionWrapper
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          duration={0.8}
          viewport={{ once: true, amount: 0.8 }}>
          <Flex justify="space-between" align="center">
            <GlobalLogo />
            <LanguageSwitcher type="select" />
          </Flex>
        </FramerMotionWrapper>

        <Card
          style={{
            border: "none",
            padding: 40,
            height: 570,
          }}>
          <Flex vertical justify="center" align="center">
            <SlideInFromLeft viewport={{ once: true, amount: 0.8 }}>
              <Title level={2} style={{ textAlign: "start" }}>
                {t("auth.login.title")}
              </Title>
            </SlideInFromLeft>
            <SlideInFromLeft
              duration={1}
              viewport={{ once: true, amount: 0.8 }}>
              <Text type="secondary">{t("auth.login.description")}</Text>
            </SlideInFromLeft>
          </Flex>

          <SlideInFromLeft
            duration={1.2}
            viewport={{ once: true, amount: 0.8 }}
            style={{
              marginTop: 20,
            }}>
            <Flex justify="center">
              <Segmented<string>
                value={type}
                defaultValue="login"
                options={[
                  {
                    label: t("auth.login.submit"),
                    value: "login",
                  },
                  {
                    label: t("auth.signUp.createAccount"),
                    value: "register",
                  },
                ]}
                onChange={(value) => {
                  setType(value);
                }}
                size="large"
              />
            </Flex>
            {type === "login" ? <LoginForm /> : <SignUp />}
          </SlideInFromLeft>
        </Card>

        <FramerMotionWrapper
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          duration={0.8}
          viewport={{ once: true, amount: 0.8 }}>
          <Flex justify="center">
            <Text type="secondary" style={{ textAlign: "center" }}>
              ES English ©{new Date().getFullYear()} Created by Long Ch1
            </Text>
          </Flex>
        </FramerMotionWrapper>
      </Flex>
    </>
  );
}

export default memo(FormLogin);
