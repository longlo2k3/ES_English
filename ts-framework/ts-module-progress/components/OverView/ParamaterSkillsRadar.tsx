import PieChart from "@/ts-framework/ts-component/PieChart";
import RadarChart from "@/ts-framework/ts-component/RadarChart";
import { Card, Typography } from "antd";
import React, { use, useMemo } from "react";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

interface IProps {
  item: any;
}

function ParamaterSkillsRadar({ item }: IProps) {
  const { t } = useTranslation();
  const data = useMemo(() => {
    const defaultSkills = ["LISTENING", "READING", "WRITING", "SPEAKING"];

    const summaryMap =
      item?.skills_summary?.reduce((acc: any, cur: any) => {
        acc[cur.skill] = cur;
        return acc;
      }, {}) || {};

    return defaultSkills.map((skill) => ({
      skill,
      score: summaryMap[skill]?.total_point || 0,
    }));
  }, [item]);

  const config = {
    angleField: "score",
    colorField: "skill",
    label: {
      text: "score",
      style: {
        fontWeight: "bold",
      },
    },
  };
  return (
    <Card
      title={<Title level={4}>{t("_progress.paramaterRadar.title")}</Title>}>
      <PieChart data={data} config={config} />
    </Card>
  );
}

export default ParamaterSkillsRadar;
