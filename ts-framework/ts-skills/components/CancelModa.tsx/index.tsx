import AModal from "@/fer-framework/fe-component/web/AModal";
import { Button, Flex, Typography } from "antd";
import React from "react";
import { useRouter } from "next/navigation";
import Mascot from "@/ts-framework/ts-component/Mascot";
import "./index.scss";

interface IProps {
  open: boolean;
  onCancel: () => void;
}

function CancelModal({ open, onCancel }: IProps) {
  const router = useRouter();
  return (
    <AModal
      // title={<Mascot message={`Bạn thực sự muốn thoát không?`} />}
      open={open}
      onCancel={onCancel}
      onOk={() => {
        router.back();
        onCancel();
      }}
      // cancelText="No"
      // okText="Yes"
      //   footer={[
      //   <Button
      //     key="back"
      //     onClick={() => {
      //       router.back();
      //       onCancel();
      //     }}>
      //     Đúng vậy
      //   </Button>,
      //   <Button key="submit" type="primary" onClick={onCancel}>
      //     Không muốn
      //   </Button>,
      // ]}
      footer={null}>
      <Mascot message={`Bạn thực sự muốn thoát không?`} />
      {/* <Typography.Text>Bạn có thực sự muốn thoát ôn tập không?</Typography.Text> */}
      <div>
        <Flex justify="end" style={{ width: "100%" }}>
          <Button
            className="chat-bubble user"
            style={{
              height: 44,
            }}
            onClick={() => {
              onCancel();
            }}>
            Không, Tôi muốn ở lại.
          </Button>
        </Flex>
        <Flex justify="end" style={{ width: "100%", marginTop: 4 }}>
          <Typography.Link
            type="secondary"
            onClick={() => {
              router.back();
              onCancel();
            }}>
            Đúng, Tôi muốn thoát.
          </Typography.Link>
        </Flex>
      </div>
    </AModal>
  );
}

export default CancelModal;
