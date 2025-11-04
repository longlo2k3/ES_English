import React from "react";
import AModal from "../../AModal";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";

interface IProps {
  open: boolean;
  onCancel: () => void;
  title: string;
  useHookMutation: any;
}

function MultiDeleteModal(props: IProps) {
  const { open, onCancel, title, useHookMutation } = props;
  const { t } = useTranslation();

  return (
    <AModal
      title={title}
      open={open}
      onCancel={onCancel}
      okText={t("common.delete")}
      cancelText={t("common.cancel")}>
      <Typography.Text>{t("table.multiDelete.confirm", { title })}</Typography.Text>
    </AModal>
  );
}

export default MultiDeleteModal;
