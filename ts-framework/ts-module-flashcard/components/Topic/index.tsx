import ATable from "@/fer-framework/fe-component/web/ATable";
import { ColumnProps } from "antd/es/table";
import React, { useState } from "react";
import { useGetTopicFlashCardQuery } from "../../apis";
import { Button, Flex, Tooltip, Typography } from "antd";
import { SnippetsOutlined } from "@ant-design/icons";
import { useHookTable } from "@/fer-framework/fe-cores/common/table";
import SavedList from "./SavedList";
import Link from "next/link";

const { Title, Text } = Typography;

function TopicTable() {
  const [isOpen, setIsOpen] = useState(false);

  const { dataSource, pagination, isLoading } = useHookTable({
    useHookApi: useGetTopicFlashCardQuery,
    paramsApi: {
      type: "FLASHCARD",
    },
  });

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
          <Link rel="prefetch" key={_} href={`/flashcard/${record?._id}`}>
            Làm bài
          </Link>
        );
      },
    },
  ];
  return (
    <>
      <Flex vertical gap={18} style={{ padding: 18 }}>
        <Flex justify="space-between">
          <Text strong>Chủ đề</Text>
          <Tooltip title="Xem danh sách từ vựng đã lưu">
            <Button
              onClick={() => setIsOpen(true)}
              type="primary"
              icon={<SnippetsOutlined />}>
              Xem danh sách
            </Button>
          </Tooltip>
        </Flex>
        <ATable
          dataSource={dataSource}
          pagination={pagination}
          columns={columns}
          size="small"
          loading={isLoading}
        />
      </Flex>

      <SavedList open={isOpen} onCancel={() => setIsOpen(false)} />
    </>
  );
}

export default TopicTable;
