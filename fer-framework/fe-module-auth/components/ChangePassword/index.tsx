"use client";

import AModal from "@/fer-framework/fe-component/web/AModal";

import { Button, Form, Input } from "antd";

import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { useChangePWUserMutation } from "../../apis";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useTranslation } from "react-i18next";

interface IProps {
  open: boolean;
  onCancel: () => void;
}

function ChangePassword(props: IProps) {
  const { open, onCancel } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const router = useRouter();

  const [changPWApi, { isLoading }] = useChangePWUserMutation();

  const onFinish = async (values: any) => {
    try {
      await form.validateFields();

      const data = await changPWApi({
        old_password: values.old_password,
        new_password: values.new_password,
      });

      if (data?.error) {
        toast.error((data?.error as any)?.message || t("auth.changePassword.failed"));
      } else {
        toast.success(data?.data?.message || t("auth.changePassword.success"));
        onCancel();
        form.resetFields();
        localStorage.removeItem("token");
        deleteCookie("token");
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error?.error?.message || t("auth.changePassword.error"));
    }
  };

  return (
    <AModal
      title={t("auth.changePassword.title")}
      open={open}
      onCancel={onCancel}
      destroyOnHidden
      footer={() => (
        <>
          <Button key={"btn-cancel"} onClick={onCancel}>
            {t("common.cancel")}
          </Button>
          <Button
            key={"btn-ok"}
            form="btn-ok"
            type="primary"
            loading={isLoading}
            htmlType="submit">
            {t("auth.changePassword.submit")}
          </Button>
        </>
      )}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Form
        form={form}
        id="btn-ok"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={() => {
          toast.error(t("auth.changePassword.finishFailed"));
        }}>
        <Form.Item
          name={"old_password"}
          label={t("auth.changePassword.form.oldPassword.label")}
          rules={[
            {
              required: true,
              message: t("auth.changePassword.form.oldPassword.required"),
            },
          ]}>
          <Input.Password placeholder={t("auth.changePassword.form.oldPassword.placeholder")} />
        </Form.Item>

        <Form.Item
          name={"new_password"}
          label={t("auth.changePassword.form.newPassword.label")}
          rules={[
            {
              required: true,
              message: t("auth.changePassword.form.newPassword.required"),
            },
          ]}>
          <Input.Password placeholder={t("auth.changePassword.form.newPassword.placeholder")} />
        </Form.Item>
      </Form>
    </AModal>
  );
}

export default ChangePassword;
