import ATable from "@/fer-framework/fe-component/web/ATable";
import { Tag } from "antd";
import { ColumnType } from "antd/es/table";
import Link from "next/link";
import React from "react";
import { useGetTopicBySkillAndLevelQuery } from "../../../apis";
import { useHookTable } from "@/fer-framework/fe-cores/common/table";
import { useTranslation } from "react-i18next";

interface IProps {
  skill_id: number;
  level_id: number;
}

interface IColumn {
  _id: string;
  title: string;
  description: string;
  level_id: {
    _id: string;
    name: string;
    code: string;
  };
  skill_id: {
    _id: string;
    name: string;
    code: string;
  };
  exercises: number;
}

function TopicTable(props: IProps) {
  const { skill_id, level_id } = props;

  const { t } = useTranslation();

  const columns: ColumnType<IColumn>[] = [
    {
      title: t("table.column.topic"),
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: t("table.column.description"),
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: t("table.column.level"),
      dataIndex: "level_id",
      key: "level_id",
      align: "center",
      ellipsis: true,
      render: (_) => (
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
          {_?.name}
        </Tag>
      ),
    },
    {
      title: t("table.column.exerciseCount"),
      dataIndex: "exercises",
      key: "exercises",
      width: 150,
      align: "center",
      ellipsis: true,
    },
    {
      title: t("table.column.action"),
      key: "operation",
      align: "center",
      render: (_, record) => (
        <Link
          rel="prefetch"
          href={`/skills/listening/${record.skill_id?._id}/${record.level_id?._id}/${record._id}`}>
          {t("table.column.doExercise")}
        </Link>
      ),
    },
  ];

  const { dataSource, pagination, isLoading } = useHookTable({
    useHookApi: useGetTopicBySkillAndLevelQuery,
    paramsApi: {
      skill_id: skill_id,
      level_id: level_id,
    },
  });
  return (
    <ATable
      dataSource={dataSource}
      columns={columns as IColumn[]}
      bordered
      pagination={pagination}
      size="small"
      loading={isLoading}
    />
  );
}

export default TopicTable;
