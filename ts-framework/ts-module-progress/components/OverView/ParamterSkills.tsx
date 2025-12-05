import {
  AudioOutlined,
  CommentOutlined,
  EditOutlined,
  ReadOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import {
  Card,
  Col,
  Progress,
  Row,
  Space,
  Statistic,
  Tabs,
  Typography,
} from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

const { Text, Title } = Typography;

const SkillTabPane = ({ skillData }: any) => {
  const { t } = useTranslation();

  const progress = useMemo(() => {
    if (!skillData) return 0;
    return (
      (Number(skillData?.total_done) /
        Number(skillData?.total_questions_skill_all_topics)) *
      100
    );
  }, [skillData]);
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Row gutter={24}>
        <Col span={12}>
          <Statistic
            title={t("_progress.paramterSkill.completion")}
            value={progress?.toFixed(0) || 0}
            suffix="%"
          />
          <Progress
            percent={Number(progress?.toFixed(0))}
            showInfo={false}
            status="active"
          />
          <Text type="secondary">{`${t(
            "_progress.paramterSkill._completion"
          )}: ${skillData?.total_done || 0} / ${
            skillData?.total_questions_skill_all_topics || 0
          } ${t("_progress.paramterSkill.question")}`}</Text>
        </Col>
        <Col span={12}>
          <Statistic
            title={t("_progress.paramterSkill.point")}
            value={skillData?.total_point || 0}
            suffix={`${t("_progress.paramterSkill._point")}`}
          />
        </Col>
      </Row>
    </Space>
  );
};

interface IProps {
  item: any;
}

function ParamterSkills({ item }: IProps) {
  const { t } = useTranslation();

  const listeningItem = useMemo(() => {
    if (!item?.skills_summary) return;

    return item?.skills_summary?.find(
      (value: any) => value?.skill === "LISTENING"
    );
  }, [item]);

  const readingItem = useMemo(() => {
    if (!item?.skills_summary) return;

    return item?.skills_summary?.find(
      (value: any) => value?.skill === "READING"
    );
  }, [item]);

  const writingItem = useMemo(() => {
    if (!item?.skills_summary) return;

    return item?.skills_summary?.find(
      (value: any) => value?.skill === "WRITING"
    );
  }, [item]);

  const speakingItem = useMemo(() => {
    if (!item?.skills_summary) return;

    return item?.skills_summary?.find(
      (value: any) => value?.skill === "SPEAKING"
    );
  }, [item]);

  return (
    <Card>
      <Tabs defaultActiveKey="1" tabPosition="top" size="large">
        <TabPane
          tab={
            <span>
              <SoundOutlined /> {t("_progress.paramterSkill.listening")}
            </span>
          }
          key="1">
          <SkillTabPane skillData={listeningItem} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <AudioOutlined /> {t("_progress.paramterSkill.speaking")}
            </span>
          }
          key="2">
          <SkillTabPane skillData={speakingItem} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <ReadOutlined /> {t("_progress.paramterSkill.reading")}
            </span>
          }
          key="3">
          <SkillTabPane skillData={readingItem} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <EditOutlined /> {t("_progress.paramterSkill.writing")}
            </span>
          }
          key="4">
          <SkillTabPane skillData={writingItem} />
        </TabPane>
      </Tabs>
    </Card>
  );
}

export default ParamterSkills;
