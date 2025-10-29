import LevelCard from "@/ts-framework/ts-skills/components/LevelCard";
import { Tabs } from "antd";
import { TabsProps } from "antd/lib";
import React, { useMemo, useState } from "react";
import TopicTable from "../Topics";
import { useSelectLevelQuery, useSelectSkillQuery } from "../../../apis";

function LevelsTabs() {
  const [active, setActive] = useState("Beginner");

  const { data: SkillData } = useSelectSkillQuery(null);

  const skillWriting = useMemo(() => {
    return SkillData?.find((item: any) => item.code === "WRITING");
  }, [SkillData]);

  const { data: levelData } = useSelectLevelQuery(null);

  const items: TabsProps["items"] = levelData?.map((item: any) => {
    return {
      key: item.code,
      label: (
        <LevelCard
          title={
            item.name === "Beginner"
              ? "Cấp độ cơ bản"
              : item.name === "Intermediate"
              ? "Cấp độ trung cấp"
              : "Cấp độ nâng cao"
          }
          code={item.code}
          desc={
            item.code === "BEGINNER"
              ? "Dành cho người mới bắt đầu"
              : item.code === "INTERMEDIATE"
              ? "Dành cho người đã có nền tảng"
              : "Dành cho người đã thành thạo"
          }
          isActive={active === item.code}
        />
      ),
      children: <TopicTable skill_id={skillWriting?._id} level_id={item._id} />,
    };
  });
  return (
    <Tabs
      tabPosition="top"
      defaultActiveKey="Beginner"
      items={items}
      onChange={(activeKey) => {
        setActive(activeKey);
      }}
    />
  );
}

export default LevelsTabs;
