"use client";

import React from "react";
import FormLogin from "../components/Login";
import "./index.scss";
import { Card, Flex, Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { SlideInFromRight } from "@/fer-framework/fe-component/web/MotionWrapper";
import Opacity from "@/fer-framework/fe-component/web/MotionWrapper/Opacity";
import TypeAnimationWrapper from "@/fer-framework/fe-component/web/TypeAnimation";

const { Text, Title } = Typography;

export default function Login() {
  return (
    <Flex style={{ height: "100vh", width: "100vw" }}>
      <div
        style={{
          flex: 0.9,
          backgroundColor: "#fff",
          padding: "0 16px",
        }}>
        <FormLogin />
      </div>
      <SlideInFromRight
        style={{
          flex: 1.5,
        }}>
        <div className="background-container">
          <Card className="frosted-card">
            <Flex vertical gap={12}>
              <Flex>
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 48, color: "#fff" }}
                      spin
                    />
                  }
                />
              </Flex>

              <Opacity duration={1}>
                <Title level={4}>ES English - Học tiếng Anh trực tuyến</Title>
              </Opacity>

              <SlideInFromRight duration={1.4}>
                <Text>
                  <TypeAnimationWrapper
                    sequence={[
                      {
                        text: "ES English là hệ thống học tiếng Anh trực tuyến miễn phí, được thiết kế cho mọi cấp độ từ Beginner đến Advanced. Hệ thống giúp bạn nâng cao kỹ năng nghe, nói, đọc và viết thông qua các bài học tương tác, bài tập thực hành, và kiểm tra trình độ định kỳ. Bắt đầu học ngay để nâng cao trình độ tiếng Anh và tự tin giao tiếp trong môi trường quốc tế!",
                        delay: 100,
                      },
                    ]}
                  />
                </Text>
              </SlideInFromRight>
            </Flex>
          </Card>
        </div>
      </SlideInFromRight>
    </Flex>
  );
}
