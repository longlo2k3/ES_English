import ACard from "@/fer-framework/fe-component/web/ACard";
import { Progress, Table, Tag, Typography } from "antd";
import React from "react";
import dayjs from "dayjs";
import ATable from "@/fer-framework/fe-component/web/ATable";
import { ColumnProps } from "antd/es/table";
import { useHookTable } from "@/fer-framework/fe-cores/common/table";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

interface IProps {
  item: any;
}

function HistoryTab(props: IProps) {
  const { item } = props;

  const { t } = useTranslation();
  const tableColumns: ColumnProps<any>[] = [
    {
      title: t("_progress.history.topic"),
      dataIndex: ["topic_details", "title"],
      key: "title",
      width: 300,
      ellipsis: true,
    },
    {
      title: t("_progress.history.skill"),
      dataIndex: "skill_name",
      key: "skill_name",
      width: 150,
      ellipsis: true,
    },
    {
      title: t("_progress.history.level"),
      dataIndex: "level",
      key: "level",
      width: 150,
      ellipsis: true,
    },
    {
      title: t("_progress.history.point"),
      dataIndex: "point",
      key: "point",
      align: "center",
      width: 100,
      ellipsis: true,
      sorter: (a: any, b: any) => a.point - b.point,
    },
    {
      title: t("_progress.history.correct"),
      dataIndex: "total_questions_topic",
      key: "total_questions_topic",
      width: 150,
      align: "center",
      ellipsis: true,
      sorter: (a: any, b: any) =>
        a.total_questions_topic - b.total_questions_topic,
    },
    {
      title: t("_progress.history.total"),
      dataIndex: "correct_count",
      width: 150,
      align: "center",
      key: "correct_count",
      ellipsis: true,
      sorter: (a: any, b: any) => a.correct_count - b.correct_count,
    },
    {
      title: t("_progress.history.accuracy"),
      key: "accuracy",
      ellipsis: true,
      width: 150,
      render: (_: any, record: any) => (
        <Progress percent={record.progress_percent} size="small" />
      ),
      sorter: (a: any, b: any) =>
        a.correct_count / a.total_attempts - b.correct_count / b.total_attempts,
    },
    {
      title: t("_progress.history.date"),
      dataIndex: "last_activity_at",
      key: "date",
      ellipsis: true,
      width: 150,
      align: "center",
      render: (date: any) => dayjs(date).format("HH:mm DD/MM/YYYY"),
      sorter: (a: any, b: any) =>
        dayjs(a.last_activity_at).valueOf() -
        dayjs(b.last_activity_at).valueOf(),
      defaultSortOrder: "descend",
    },
  ];

  return (
    <ACard title={t("_progress.history.all")} bordered={false}>
      <ATable
        columns={tableColumns}
        dataSource={item?.progress || []}
        rowKey="_id"
        scroll={{ x: 1500 }}
        pagination={{ pageSize: 10 }}
      />
    </ACard>
  );
}

export default HistoryTab;
