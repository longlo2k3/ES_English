import React, { useMemo, useState } from "react";
import {
  useGetSavedFlashCardQuery,
  usePostSaveFlashCardMutation,
} from "../../apis";
import ATable from "@/fer-framework/fe-component/web/ATable";
import { ColumnProps } from "antd/es/table";
import ACard from "@/fer-framework/fe-component/web/ACard";
import { Input, Modal, Tooltip } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import AModal from "@/fer-framework/fe-component/web/AModal";
import { usePostMutation } from "@/fer-framework/fe-cores/hooks/useApiMutaton";
import { useHookTable } from "@/fer-framework/fe-cores/common/table";

interface IProps {
  open: boolean;
  onCancel: () => void;
}

interface WordData {
  _id: string;
  word: string;
  phonetic: string;
  part_of_speech: string;
  meaning_vi: string;
  example_en: string;
  example_vi: string;
  audio_url: string;
  image_url: string;
  created_at: string;
}

function SavedList(props: IProps) {
  const { open, onCancel } = props;

  const {
    dataSource,
    pagination,
    isLoading: loading,
    refresh,
  } = useHookTable({
    useHookApi: useGetSavedFlashCardQuery,
    paramsApi: null,
  });
  const [value, setValue] = useState("");

  const { callPostApi, isLoading } = usePostMutation({
    useMutationHook: usePostSaveFlashCardMutation,
    onSuccess: (data) => {
      refresh();
    },
  });

  const onSubmit = (id: string) => {
    callPostApi({ flashcard_id: id });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const filterd = useMemo(() => {
    return (
      dataSource?.filter((item: WordData) =>
        item.word.toLowerCase().includes(value.toLowerCase())
      ) || []
    );
  }, [dataSource, value]);

  const columns: ColumnProps<any>[] = [
    {
      title: "Từ vựng",
      dataIndex: "word",
      key: "word",
      width: 150,
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Phiên âm",
      dataIndex: "phonetic",
      key: "phonetic",
      width: 120,
    },
    {
      title: "Loại từ",
      dataIndex: "part_of_speech",
      key: "part_of_speech",
      width: 100,
    },
    {
      title: "Nghĩa (VI)",
      dataIndex: "meaning_vi",
      key: "meaning_vi",
      width: 120,
    },
    {
      title: "Ví dụ (EN)",
      dataIndex: "example_en",
      key: "example_en",
      ellipsis: true,
    },
    {
      title: "Ví dụ (VI)",
      dataIndex: "example_vi",
      key: "example_vi",
      ellipsis: true,
    },
    {
      title: "Hoạt động",
      key: "operation",
      align: "center",
      fixed: "right",
      width: 120,
      render: (_, record) => {
        return (
          <Tooltip title="Hủy lưu">
            <DeleteFilled
              onClick={() => onSubmit(record._id)}
              style={{ color: "red", cursor: "pointer" }}
            />
          </Tooltip>
        );
      },
    },
  ];
  return (
    <AModal
      title="Danh sách từ vựng đã lưu"
      open={open}
      width={800}
      fullHeight
      onCancel={onCancel}
      destroyOnHidden
      footer={(_, { CancelBtn }) => (
        <>
          <CancelBtn />
        </>
      )}>
      <ACard
        title={
          <Input.Search
            value={value}
            onChange={onChange}
            placeholder="Nội dung tìm kiếm"
            allowClear
          />
        }>
        <ATable
          dataSource={dataSource}
          pagination={pagination}
          columns={columns}
          loading={isLoading}
        />
      </ACard>
    </AModal>
  );
}

export default SavedList;
