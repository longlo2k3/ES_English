import { Col, Flex, Row, Typography } from "antd";

import React from "react";
import SkillCard from "./SkillCard";
import { SKILLS } from "../../const/data";

const { Text, Title } = Typography;

function IntroCard() {
  return (
    <Flex vertical gap={12} style={{ marginTop: 12 }}>
      <Title style={{ margin: 0 }} level={3}>
        Các kỹ năng tiếng anh
      </Title>
      <Text type="secondary">
        Chọn kỹ năng bạn muốn cải thiện để bắt đầu học ngay hôm nay
      </Text>
      <Row gutter={[16, 24]} wrap>
        {SKILLS.map((item, index) => (
          <Col key={index} className="gutter-row" xs={24} sm={12} lg={6}>
            <SkillCard {...item} />
          </Col>
        ))}
      </Row>
    </Flex>
  );
}

export default IntroCard;
