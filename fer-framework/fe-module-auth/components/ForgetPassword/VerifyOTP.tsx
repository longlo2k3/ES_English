import AModal from "@/fer-framework/fe-component/web/AModal";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useTranslation } from "react-i18next";
import { useVerifyOTPMutation } from "../../apis";

interface IProps {
  open: boolean;
  onCancel: () => void;
  email: string;
  hanldeVerifyOTP: (data: boolean) => void;
}

function VerifyOTP(props: IProps) {
  const { t } = useTranslation();

  const { open, onCancel, email, hanldeVerifyOTP } = props;

  const [form] = useForm();

  const [postVerifyOTP, { isLoading }] = useVerifyOTPMutation();

  const handleSubmit = async (values: any) => {
    try {
      const data = await postVerifyOTP({
        email: email,
        code: values.code,
      }).unwrap();
      hanldeVerifyOTP && hanldeVerifyOTP(true);
      onCancel();
      message.success(data?.message || t("auth.signUp.toastSent"));
    } catch (error: any) {
      message.error(error?.message || t("auth.signUp.toastError"));
    }
  };
  return (
    <AModal
      open={open}
      onCancel={onCancel}
      title={t("auth.forgetPassword.title")}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {t("auth.forgetPassword.btnCancel")}
        </Button>,
        <Button
          key="submit"
          loading={isLoading}
          type="primary"
          onClick={() => form.submit()}>
          {t("auth.forgetPassword.btnSubmit")}
        </Button>,
      ]}>
      <Form
        form={form}
        id={"form-forgetpw"}
        style={{
          textAlign: "center",
        }}
        onFinish={handleSubmit}
        layout="vertical">
        <Form.Item
          name="code"
          rules={[
            {
              required: true,
              message: t("auth.forgetPassword.email.required"),
            },
          ]}>
          <Input.OTP />
        </Form.Item>
      </Form>
    </AModal>
  );
}

export default VerifyOTP;
