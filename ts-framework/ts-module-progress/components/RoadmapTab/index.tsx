import ACard from "@/fer-framework/fe-component/web/ACard";
import { Collapse, List, Progress, Tag, Typography } from "antd";

import React from "react";

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface IProps {
  pathData: any;
}

function RoadmapTab(props: IProps) {
  const { pathData } = props;
  return (
    <ACard title="Tiến độ theo Lộ trình" bordered={false}>
      {/* Dùng Collapse để nhóm theo Level (level_id) */}
      <Collapse accordion>
        {Object.keys(pathData).map((levelName) => (
          <Panel
            header={<Title level={4}>{levelName}</Title>}
            key={levelName}
            extra={
              <Text type="secondary">{pathData[levelName].description}</Text>
            }>
            {/* Dùng Collapse lồng nhau để nhóm theo Skill (skill_id) */}
            <Collapse defaultActiveKey={["Kỹ năng Nghe"]}>
              {Object.keys(pathData[levelName].skills).map((skillName) => (
                <Panel
                  header={
                    <span>
                      {pathData[levelName].skills[skillName].icon} {skillName}
                    </span>
                  }
                  key={skillName}>
                  {/* Dùng List để hiển thị các Topic (topic_id) */}
                  <List
                    dataSource={pathData[levelName].skills[skillName].topics}
                    renderItem={(topic: any) => (
                      <List.Item
                        extra={
                          <Tag
                            color={topic.accuracy > 80 ? "success" : "warning"}>
                            {topic.score} điểm
                          </Tag>
                        }>
                        <List.Item.Meta
                          title={topic.id}
                          description={
                            <Progress
                              percent={Math.round(topic.accuracy)}
                              size="small"
                            />
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Panel>
              ))}
            </Collapse>
          </Panel>
        ))}
      </Collapse>
    </ACard>
  );
}

export default RoadmapTab;
