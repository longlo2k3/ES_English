import LevelCard from "@/ts-framework/ts-skills/components/LevelCard";
import { Tabs } from "antd";
import { TabsProps } from "antd/lib";
import React, { useMemo, useState } from "react";
import TopicTable from "../Topics";
import { useSelectLevelQuery, useSelectSkillQuery } from "../../../apis";
import { useTranslation } from "react-i18next";

const getTitle = (name: string, t: any) => {
  switch (name) {
    case "Beginner":
      return t("table.level.beginnerTitle");
    case "Intermediate":
      return t("table.level.intermediateTitle");
    default:
      return t("table.level.advancedTitle");
  }
};

const getDesc = (code: string, t: any) => {
  switch (code) {
    case "BEGINNER":
      return t("table.level.beginnerDesc");
    case "INTERMEDIATE":
      return t("table.level.intermediateDesc");
    default:
      return t("table.level.advancedDesc");
  }
};

function LevelsTabs() {
  const { t } = useTranslation();
  const [active, setActive] = useState("BEGINNER");

  const { data: SkillData } = useSelectSkillQuery(null);

  const skillWriting = useMemo(() => {
    return SkillData?.find((item: any) => item.code === "LISTENING");
  }, [SkillData]);

  const { data: levelData } = useSelectLevelQuery(null);

  const items: TabsProps["items"] = levelData?.map((item: any) => {
    return {
      key: item.code,
      label: (
        <LevelCard
          key={item.code}
          title={getTitle(item.name, t)}
          code={item.code}
          desc={getDesc(item.code, t)}
          isActive={active === item.code}
        />
      ),
      children: <TopicTable skill_id={skillWriting?._id} level_id={item._id} />,
    };
  });

  return (
    <Tabs
      tabPosition="top"
      defaultActiveKey="BEGINNER"
      items={items}
      onChange={(activeKey) => {
        setActive(activeKey);
      }}
    />
  );
}

export default LevelsTabs;
