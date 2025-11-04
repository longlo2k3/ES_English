import AModal from "@/fer-framework/fe-component/web/AModal";
import { Button, Typography } from "antd";
import Link from "next/link";
import React from "react";

interface IProps {
  open: boolean;
  onCancel: () => void;
  rollbackUrl: string;
}

function CancelModal({ open, onCancel, rollbackUrl }: IProps) {
  return (
    <AModal
      title="Thoát bài tập"
      open={open}
      onCancel={onCancel}
      onOk={() => {
        window.location.href = rollbackUrl;
        onCancel();
      }}
      cancelText="No"
      okText="Yes"
      footer={[
        <Button key="back" onClick={onCancel}>
          No
        </Button>,
        <Button
          key="submit"
          type="primary"
          // style={{ backgroundColor: "rgb(88, 204, 2)" }}
          onClick={() => {
            onCancel();
            window.location.href = rollbackUrl;
          }}>
          Yes
        </Button>,
      ]}>
      <Typography.Text>Bạn có thực sự muốn thoát ôn tập không?</Typography.Text>
    </AModal>
  );
}

export default CancelModal;
