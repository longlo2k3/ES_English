import ACard from "@/fer-framework/fe-component/web/ACard";
import { Flex, Typography } from "antd";

import React from "react";
import { useTranslation } from "react-i18next";

const { Text, Title, Link } = Typography;

interface IProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  link: string;
}

function SkillCard(props: IProps) {
  const { icon, title, desc, link } = props;

  const { t } = useTranslation();

  return (
    <ACard
      style={{
        width: 300,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
      styles={{
        body: {
          padding: 24,
        },
      }}>
      <Flex vertical gap={12} justify="center" align="center">
        {icon}

        <Title level={4} style={{ marginBottom: 8 }}>
          {title}
        </Title>
        <Text type="secondary" style={{ textAlign: "center" }}>
          {desc}
        </Text>

        <Link underline href={link}>
          {t("home.skills.button")}
        </Link>
      </Flex>
    </ACard>
  );
}

export default SkillCard;
