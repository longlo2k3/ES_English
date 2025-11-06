import ACard from "@/fer-framework/fe-component/web/ACard";
import { Progress, Table, Tag, Typography } from "antd";
import React from "react";
import dayjs from "dayjs";
import ATable from "@/fer-framework/fe-component/web/ATable";
import { ColumnProps } from "antd/es/table";

const { Text } = Typography;

interface IProps {
  allActivityData: any[];
  topicLookup: any;
  skillLookup: any;
}

function HistoryTab(props: IProps) {
  const { allActivityData, topicLookup, skillLookup } = props;

  const tableColumns: ColumnProps<any>[] = [
    {
      title: "Chủ đề (Topic)",
      dataIndex: "topic_id",
      key: "topic",
      render: (topic_id: string) => topicLookup[topic_id]?.name || "Không rõ",
    },
    {
      title: "Kỹ năng (Skill)",
      dataIndex: "skill_id",
      key: "skill",
      render: (skill_id: string) => {
        const skill = skillLookup[skill_id];
        return skill ? <Tag icon={skill.icon}>{skill.name}</Tag> : "Không rõ";
      },
    },
    {
      title: "Điểm",
      dataIndex: "total_score",
      key: "score",
      sorter: (a: any, b: any) => a.total_score - b.total_score,
      render: (score: number) => (
        <Text strong style={{ color: "#1890ff" }}>
          {score}
        </Text>
      ),
    },
    {
      title: "Độ chính xác",
      key: "accuracy",
      render: (_: any, record: any) => (
        <Progress
          percent={Math.round(
            (record.correct_count / record.total_attempts) * 100
          )}
          size="small"
        />
      ),
      sorter: (a: any, b: any) =>
        a.correct_count / a.total_attempts - b.correct_count / b.total_attempts,
    },
    {
      title: "Ngày hoàn thành",
      dataIndex: "last_activity_at",
      key: "date",
      render: (date: any) => dayjs(date).format("HH:mm DD/MM/YYYY"),
      sorter: (a: any, b: any) =>
        dayjs(a.last_activity_at).valueOf() -
        dayjs(b.last_activity_at).valueOf(),
      defaultSortOrder: "descend",
    },
  ];

  return (
    <ACard title="Tất cả hoạt động" bordered={false}>
      <ATable
        columns={tableColumns}
        dataSource={allActivityData}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </ACard>
  );
}

export default HistoryTab;
