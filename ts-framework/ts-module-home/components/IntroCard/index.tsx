import { Col, Flex, Row, Typography } from "antd";
import React, { useEffect, useMemo } from "react";
import SkillCard from "./SkillCard";
import { SKILLS } from "../../const/data";
import { useTranslation } from "react-i18next";

const { Text, Title } = Typography;

function IntroCard() {
  const { t } = useTranslation();

  const translatedItems = useMemo(() => {
    return SKILLS.map((item) => ({
      ...item,
      title: t(item.title),
      desc: t(item.desc),
    }));
  }, [t]);

  return (
    <Flex vertical gap={12} style={{ marginTop: 12 }}>
      <Title style={{ margin: 0 }} level={3}>
        {t("home.introCard.title")}
      </Title>
      <Text type="secondary">{t("home.introCard.description")} </Text>
      <Row gutter={[16, 24]} wrap>
        {translatedItems.map((item, index) => (
          <Col key={index} className="gutter-row" xs={24} sm={12} lg={6}>
            <SkillCard {...item} />
          </Col>
        ))}
      </Row>
    </Flex>
  );
}

export default IntroCard;
