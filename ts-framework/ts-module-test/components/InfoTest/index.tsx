import {
  Alert,
  Avatar,
  Button,
  Card,
  Checkbox,
  Col,
  Descriptions,
  Divider,
  List,
  Row,
  Space,
  Steps,
  theme,
  Typography,
} from "antd";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetMockTestQuery } from "../../apis";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
  ReadOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { formatDate } from "@/fer-framework/fe-cores/utils";
import { useTheme } from "@/fer-framework/fe-global/themes";
// 1. Import hook
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

function InfoTest() {
  const router = useRouter();
  // 2. Khởi tạo hook
  const { t } = useTranslation();

  const { data } = useGetMockTestQuery(null);
  const { mode } = useTheme();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const randomTest = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * data?.items?.length);
    return data?.items?.[randomIndex];
  }, [data]);

  const [agreed, setAgreed] = useState(false);

  // 3. Refactor cấu trúc bài thi: Lấy text từ file json
  const testStructure = [
    {
      title: t("infoTest.structure.phonetics.title"),
      icon: <ReadOutlined />,
      desc: t("infoTest.structure.phonetics.desc"),
    },
    {
      title: t("infoTest.structure.vocab.title"),
      icon: <ReadOutlined />,
      desc: t("infoTest.structure.vocab.desc"),
    },
    {
      title: t("infoTest.structure.error.title"),
      icon: <ReadOutlined />,
      desc: t("infoTest.structure.error.desc"),
    },
    {
      title: t("infoTest.structure.synonym.title"),
      icon: <ReadOutlined />,
      desc: t("infoTest.structure.synonym.desc"),
    },
    {
      title: t("infoTest.structure.completion.title"),
      icon: <ReadOutlined />,
      desc: t("infoTest.structure.completion.desc"),
    },
    {
      title: t("infoTest.structure.reading.title"),
      icon: <ReadOutlined />,
      desc: t("infoTest.structure.reading.desc"),
    },
  ];

  // 4. Refactor quy định: Lấy mảng từ json
  // 'returnObjects: true' rất quan trọng khi lấy về Array hoặc Object
  const rules = t("infoTest.rules.items", { returnObjects: true }) as string[];

  return (
    <>
      <div
        style={{
          backgroundColor: mode === "dark" ? colorBgContainer : "#f0f2f5",
          padding: "40px",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
        }}>
        <Card
          style={{
            width: "100%",
            maxWidth: 900,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
          bodyStyle={{ padding: "40px" }}>
          {/* Header: Tiêu đề và Steps */}
          <div style={{ marginBottom: "30px", textAlign: "center" }}>
            <Title level={2} style={{ margin: 0 }}>
              {t("infoTest.header.title")}
            </Title>
            <Text type="secondary">
              {t("infoTest.header.code")}: {randomTest?._id} |{" "}
              {t("infoTest.header.lastUpdated")}:
              {formatDate(randomTest?.created_at)}
            </Text>

            <div style={{ marginTop: "30px", padding: "0 10%" }}>
              <Steps
                current={0}
                items={[
                  {
                    title: t("infoTest.steps.guide"),
                    icon: <FileTextOutlined />,
                  },
                  {
                    title: t("infoTest.steps.doing"),
                    icon: <PlayCircleOutlined />,
                  },
                  {
                    title: t("infoTest.steps.result"),
                    icon: <CheckCircleOutlined />,
                  },
                ]}
              />
            </div>
          </div>

          {/* Thông báo quan trọng */}
          <Alert
            message={t("infoTest.alert.message")}
            description={t("infoTest.alert.description")}
            type="warning"
            showIcon
            icon={<WarningOutlined />}
            style={{ marginBottom: "30px" }}
          />

          <Row gutter={[32, 32]}>
            {/* Cột trái: Thông tin tổng quan */}
            <Col xs={24} md={14}>
              <Title level={4}>{t("infoTest.overview.title")}</Title>
              <Descriptions bordered column={1} size="middle">
                <Descriptions.Item
                  label={t("infoTest.overview.totalTimeLabel")}>
                  <Space>
                    <ClockCircleOutlined />{" "}
                    <b>{t("infoTest.overview.totalTimeValue")}</b>
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item
                  label={t("infoTest.overview.totalQuestionLabel")}>
                  <Space>
                    <FileTextOutlined />{" "}
                    <b>{t("infoTest.overview.totalQuestionValue")}</b>
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label={t("infoTest.overview.maxScoreLabel")}>
                  {t("infoTest.overview.maxScoreValue")}
                </Descriptions.Item>
              </Descriptions>

              <Divider />

              <Title level={4}>{t("infoTest.structure.title")}</Title>
              <Text type="secondary">{t("infoTest.structure.note")}</Text>
              <List
                itemLayout="horizontal"
                dataSource={testStructure}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ backgroundColor: "#1890ff" }}
                          icon={item.icon}
                        />
                      }
                      title={item.title}
                      description={item.desc}
                    />
                  </List.Item>
                )}
              />
            </Col>

            {/* Cột phải: Quy định */}
            <Col xs={24} md={10} style={{ borderLeft: "1px solid #f0f0f0" }}>
              <Title level={4}>{t("infoTest.rules.title")}</Title>
              <div
                style={{
                  backgroundColor:
                    mode === "dark" ? colorBgContainer : "#fafafa",
                  padding: "20px",
                  borderRadius: "8px",
                }}>
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  {/* Kiểm tra xem rules có phải là mảng không để tránh lỗi render */}
                  {Array.isArray(rules) &&
                    rules.map((rule, index) => (
                      <li
                        key={index}
                        style={{ marginBottom: "12px", color: "#595959" }}>
                        {rule}
                      </li>
                    ))}
                </ul>
              </div>
            </Col>
          </Row>

          <Divider />

          {/* Footer: Action */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
            }}>
            <Checkbox onChange={(e) => setAgreed(e.target.checked)}>
              {t("infoTest.actions.agree")}
            </Checkbox>

            <Button
              type="primary"
              size="large"
              shape="round"
              icon={<PlayCircleOutlined />}
              onClick={() => router.push(`/test/${randomTest?._id}/detail`)}
              disabled={!agreed}
              style={{ width: "200px", height: "50px", fontSize: "18px" }}>
              {t("infoTest.actions.start")}
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}

export default InfoTest;
