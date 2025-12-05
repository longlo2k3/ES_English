import ACard from "@/fer-framework/fe-component/web/ACard";
import {
  Collapse,
  Descriptions,
  Flex,
  List,
  Progress,
  Space,
  Tag,
  Typography,
} from "antd";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface IProps {
  item: any;
}

function RoadmapTab({ item }: IProps) {
  const { t } = useTranslation();

  // ---- Chuyển progress thành dạng nhóm theo Level -> Skill -> Topic ----
  const pathData = useMemo(() => {
    const result: any = {};

    item?.progress?.forEach((i: any) => {
      const levelName = i.level; // Ví dụ: "Beginner"
      const skillName = i.skill_name; // Ví dụ: "Listening"
      if (!result[levelName]) {
        result[levelName] = {
          description: `${t("_progress.roadmap.des", {
            levelName: levelName,
          })}`,
          skills: {},
        };
      }

      if (!result[levelName].skills[skillName]) {
        result[levelName].skills[skillName] = {
          icon:
            skillName === "Listening"
              ? "🎧"
              : skillName === "Reading"
              ? "📘"
              : "📚",
          topics: [],
        };
      }

      result[levelName].skills[skillName].topics.push({
        id: i.topic_details.title,
        accuracy: i.progress_percent,
        score: i.point,
        correct_count: i.correct_count,
        total_questions_topic: i.total_questions_topic,
      });
    });

    return result;
  }, [item, t]);

  // ------------------- Render UI --------------------
  return (
    <ACard title={t("_progress.roadmap.title")} bordered={false}>
      <Collapse accordion>
        {Object.keys(pathData).map((levelName) => (
          <Panel
            header={<Title level={4}>{levelName}</Title>}
            key={levelName}
            extra={
              <Text type="secondary">{pathData[levelName].description}</Text>
            }>
            <Collapse defaultActiveKey={["Listening"]}>
              {Object.keys(pathData[levelName].skills).map((skillName) => (
                <Panel
                  header={
                    <span>
                      {pathData[levelName].skills[skillName].icon} {skillName}
                    </span>
                  }
                  key={skillName}>
                  <List
                    dataSource={pathData[levelName].skills[skillName].topics}
                    renderItem={(topic: any) => (
                      <List.Item
                        extra={
                          <Flex vertical gap={4} style={{ marginLeft: 8 }}>
                            <Tag
                              style={{ textAlign: "center" }}
                              color={
                                topic.accuracy > 80 ? "success" : "warning"
                              }>
                              {t("_progress.roadmap.score", {
                                score: topic.score,
                              })}
                            </Tag>

                            <Typography.Text type="secondary">
                              {t("_progress.roadmap.correct", {
                                correct_count: topic.correct_count,
                                total_questions_topic:
                                  topic.total_questions_topic,
                              })}
                            </Typography.Text>
                          </Flex>
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
