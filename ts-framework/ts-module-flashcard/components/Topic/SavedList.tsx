import React, { useMemo, useState } from "react";
import {
  useGetSavedFlashCardQuery,
  usePostSaveFlashCardMutation,
} from "../../apis";
import ATable from "@/fer-framework/fe-component/web/ATable";
import { ColumnProps } from "antd/es/table";
import ACard from "@/fer-framework/fe-component/web/ACard";
import { Button, Input, Tooltip } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import AModal from "@/fer-framework/fe-component/web/AModal";
import { usePostMutation } from "@/fer-framework/fe-cores/hooks/useApiMutaton";
import { useHookTable } from "@/fer-framework/fe-cores/common/table";
import { useTranslation } from "react-i18next"; // 👈 thêm dòng này

interface IProps {
  open: boolean;
  onCancel: () => void;
}

function SavedList({ open, onCancel }: IProps) {
  const { t } = useTranslation(); // 👈 hook i18n
  const { dataSource, pagination, refresh } = useHookTable({
    useHookApi: useGetSavedFlashCardQuery,
    paramsApi: null,
  });

  const [value, setValue] = useState("");

  const { callPostApi, isLoading } = usePostMutation({
    useMutationHook: usePostSaveFlashCardMutation,
    onSuccess: () => refresh(),
  });

  const onSubmit = (id: string) => callPostApi({ flashcard_id: id });

  const filterd = useMemo(
    () =>
      dataSource?.filter((item: any) =>
        item.word.toLowerCase().includes(value.toLowerCase())
      ) || [],
    [dataSource, value]
  );

  const columns: ColumnProps<any>[] = [
    {
      title: t("savedList.word"),
      dataIndex: "word",
      key: "word",
      width: 150,
      ellipsis: true,
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: t("savedList.phonetic"),
      dataIndex: "phonetic",
      key: "phonetic",
      width: 120,
      ellipsis: true,
    },
    {
      title: t("savedList.partOfSpeech"),
      dataIndex: "part_of_speech",
      key: "part_of_speech",
      width: 100,
      ellipsis: true,
    },
    {
      title: t("savedList.meaningVi"),
      dataIndex: "meaning_vi",
      key: "meaning_vi",
      width: 120,
      ellipsis: true,
    },
    {
      title: t("savedList.exampleEn"),
      dataIndex: "example_en",
      key: "example_en",
      ellipsis: true,
    },
    {
      title: t("savedList.exampleVi"),
      dataIndex: "example_vi",
      key: "example_vi",
      ellipsis: true,
    },
    {
      title: t("savedList.action"),
      key: "operation",
      align: "center",
      fixed: "right",
      ellipsis: true,
      width: 120,
      render: (_, record) => (
        <Tooltip title={t("savedList.unsave")}>
          <DeleteFilled
            onClick={() => onSubmit(record._id)}
            style={{ color: "red", cursor: "pointer" }}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <AModal
      title={t("savedList.title")}
      open={open}
      width={800}
      fullHeight
      onCancel={onCancel}
      destroyOnHidden
      footer={[
        <Button key="back" onClick={onCancel}>
          {t("savedList.close")}
        </Button>,
      ]}>
      <ACard
        title={
          <Input.Search
            value={value}
            style={{
              width: "50%",
            }}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t("savedList.searchPlaceholder")}
            allowClear
          />
        }>
        <ATable
          dataSource={filterd}
          pagination={pagination}
          columns={columns}
          loading={isLoading}
        />
      </ACard>
    </AModal>
  );
}

export default SavedList;
