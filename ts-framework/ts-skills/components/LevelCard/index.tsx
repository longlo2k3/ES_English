import ACard from "@/fer-framework/fe-component/web/ACard";
import ATitle from "@/fer-framework/fe-component/web/ATitle";
import { Flex, Tag, Typography } from "antd";
import { useResponsive } from "antd-style";
import React from "react";

const { Text } = Typography;

interface IProps {
  title: string;
  code: string;
  desc: string;
  isActive: boolean;
}

function LevelCard(props: IProps) {
  const { title, code, desc, isActive } = props;
  const { xs, sm, md, lg, xl, xxl } = useResponsive();

  return (
    <ACard
      style={{
        width: xl ? 400 : lg ? 300 : 250,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        backgroundColor: isActive ? "#2574fc1d" : "#ffffff",
      }}
      styles={{
        body: {
          padding: 24,
        },
      }}>
      <Flex align="start" vertical gap={8}>
        <ATitle level={5}>{title}</ATitle>
        <Tag
          style={{
            textAlign: "center",
            lineHeight: "25px",
            color: "#2575fc",
            fontWeight: 500,
            border: `1px solid #2575fc`,
            width: 100,
          }}
          color="#2574fc1d">
          {code}
        </Tag>
        <Flex>
          <Text type="secondary">{desc}</Text>
        </Flex>
      </Flex>
    </ACard>
  );
}

export default LevelCard;
