import React, { useState } from "react";
import { useGetTopicFlashCardQuery } from "../../apis";
import { Button, Flex, List, theme, Tooltip, Typography } from "antd";
import { SnippetsOutlined } from "@ant-design/icons";
import { useHookTable } from "@/fer-framework/fe-cores/common/table";
import SavedList from "./SavedList";
import { useTranslation } from "react-i18next";
import ACard from "@/fer-framework/fe-component/web/ACard";
import { useRouter } from "next/navigation";
import {
  SlideInFromBottom,
  ZoomMotion,
} from "@/fer-framework/fe-component/web/MotionWrapper";
import Mascot from "@/ts-framework/ts-component/Mascot";
import HeaderOperation from "@/fer-framework/fe-component/web/ATable/HeaderOperation";
import { useTheme } from "@/fer-framework/fe-global/themes";

function TopicTable() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const { mode } = useTheme();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();

  const { dataSource, isLoading } = useHookTable({
    useHookApi: useGetTopicFlashCardQuery,
    paramsApi: {
      type: "FLASHCARD",
    },
    config: ["title", "description"],
  });

  return (
    <div
      style={{
        width: "100%",
        background:
          mode === "dark"
            ? "#0f172a"
            : "linear-gradient(135deg, #d4f1ff 0%, #e8e5ff 100%)",
        padding: 20,
        borderRadius: "16px",
        height: "100%",
      }}>
      <div style={{ position: "absolute", right: "5%", top: "50%" }}>
        <ZoomMotion duration={0.8}>
          <Mascot message={"Chọn một chủ đề!"} />
        </ZoomMotion>
      </div>

      <Flex justify="space-between" align="center" style={{ marginBottom: 18 }}>
        <HeaderOperation />
        <Button
          onClick={() => setIsOpen(true)}
          type="primary"
          icon={<SnippetsOutlined />}>
          {t("flashCard.savedList")}
        </Button>
      </Flex>

      <List
        dataSource={dataSource}
        grid={{ gutter: 16, sm: 1, md: 2, xl: 4 }}
        loading={isLoading}
        renderItem={(item: any, index: number) => {
          const duration = 0.2 + index * 0.2;
          return (
            <SlideInFromBottom type="animate" duration={duration}>
              <List.Item>
                <ACard
                  title={item.title}
                  hoverable
                  style={{ minWidth: 200, width: 300 }}
                  styles={{
                    body: {
                      minHeight: 90,
                    },
                  }}
                  onClick={() => {
                    router.push(`/flashcard/${item?._id}`);
                  }}>
                  <Tooltip title={item.description}>
                    <Typography.Paragraph ellipsis={{ rows: 2 }}>
                      {item.description}
                    </Typography.Paragraph>
                  </Tooltip>
                </ACard>
              </List.Item>
            </SlideInFromBottom>
          );
        }}
      />

      <SavedList open={isOpen} onCancel={() => setIsOpen(false)} />
    </div>
  );
}

export default TopicTable;
