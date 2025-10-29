import ATable from "@/fer-framework/fe-component/web/ATable";
import { Tag, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import Link from "next/link";
import React from "react";
import { useGetTopicBySkillAndLevelQuery } from "../../../apis";

interface IProps {
  skill_id: number;
  level_id: number;
}

function TopicTable(props: IProps) {
  const { skill_id, level_id } = props;

  const { data } = useGetTopicBySkillAndLevelQuery(
    {
      skill_id: skill_id,
      level_id: level_id,
    },
    {
      skip: !skill_id || !level_id,
    }
  );

  const columns: ColumnProps<any>[] = [
    {
      title: "Chủ đề",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Loại cấp độ",
      dataIndex: "level_id",
      key: "level_id",
      align: "center",
      ellipsis: true,
      render: (_) => (
        <Tag
          style={{
            textAlign: "center",
            lineHeight: "25px",
            color: "#6a11cb",
            fontWeight: 500,
            border: `1px solid #6a11cb`,
            width: 100,
          }}
          color="#6b11cb53">
          {_?.name}
        </Tag>
      ),
    },
    {
      title: "Số lượng bài",
      dataIndex: "exercises",
      key: "exercises",
      width: 150,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Hoạt động",
      key: "operation",
      align: "center",
      render: (_, record) => {
        return (
          <Link
            rel="prefetch"
            key={_}
            href={`/skills/writing/${record.name}/${record.level}/${record.id}`}>
            Làm bài
          </Link>
        );
      },
    },
  ];
  return (
    <ATable dataSource={data?.items || []} columns={columns} size="small" />
  );
}

export default TopicTable;
