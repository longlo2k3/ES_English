import AModal from "@/fer-framework/fe-component/web/AModal";
import { BarcodeOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React from "react";
import {
  usePostConfirmCodeMutation,
  usePostRegisterMutation,
} from "../../apis";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

interface IProps {
  open: boolean;
  onCancel: () => void;
  item: any;
}

export const VerifyCode = (props: IProps) => {
  const { t } = useTranslation();
  const { open, onCancel, item } = props;
  const [form] = Form.useForm();

  const [postConfirmCode] = usePostConfirmCodeMutation();
  const [postRegister, { isLoading }] = usePostRegisterMutation();

  const handleSubmit = async (values: any) => {
    try {
      const data = await postConfirmCode({
        code: values.code,
        email: item.email,
      }).unwrap();

      const register = await postRegister({
        username: item.username,
        password: item.password,
        email: item.email,
      }).unwrap();

      onCancelModal();
      toast.success(register?.data?.message || t("auth.verify.toastSuccess"));
    } catch (error: any) {
      toast.error(error.error?.message || t("auth.verify.toastError"));
    }
  };

  const onCancelModal = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <AModal
      title={t("auth.verify.title")}
      open={open}
      onCancel={onCancelModal}
      onOk={handleSubmit}
      okText={t("auth.verify.ok")}
      destroyOnHidden
      width={500}
      footer={[
        <Button key="btn-cancel" onClick={onCancelModal}>
          {t("common.cancel")}
        </Button>,
        <Button
          key="btn-verify"
          loading={isLoading}
          type="primary"
          form={"form-verify"}
          htmlType="submit">
          {t("auth.verify.create")}
        </Button>,
      ]}
      centered>
      <ToastContainer position="top-right" autoClose={3000} />
      <Form
        id={"form-verify"}
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        style={{ width: "100%", textAlign: "center" }}>
        <Form.Item
          name="code"
          label={t("auth.verify.form.code.label")}
          rules={[
            { required: true, message: t("auth.verify.form.code.required") },
          ]}>
          <Input.OTP size="large" />
        </Form.Item>
      </Form>
    </AModal>
  );
};
