"use client";

import AModal from "@/fer-framework/fe-component/web/AModal";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { usePostSendCodeMutation } from "../../apis";
import { toast, ToastContainer } from "react-toastify";
import { VerifyCode } from "./VerifyCode";
import { useTranslation } from "react-i18next";

function SignUp() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);

  // call apis
  const [postSendCode, { isLoading }] = usePostSendCodeMutation();

  const handleSubmit = async (values: any) => {
    try {
      const data = await postSendCode({ email: values.email }).unwrap();
      setOpenVerify(true);
      toast.success(data?.message || t("auth.signUp.toastSent"));
    } catch (error: any) {
      toast.error(error?.message || t("auth.signUp.toastError"));
    }
  };

  const onCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button color="cyan" variant="solid" onClick={() => setOpen(true)}>
        {t("auth.signUp.createAccount")}
      </Button>

      <AModal
        title={t("auth.signUp.modalTitle")}
        open={open}
        onCancel={onCancel}
        onOk={handleSubmit}
        okText={t("auth.signUp.ok")}
        destroyOnHidden
        width={500}
        footer={[
          <Button key="btn-cancel" onClick={onCancel}>
            {t("common.cancel")}
          </Button>,
          <Button
            key="btn-create"
            loading={isLoading}
            type="primary"
            form={"form-create"}
            htmlType="submit">
            {t("auth.signUp.create")}
          </Button>,
        ]}
        centered>
        <ToastContainer position="top-right" autoClose={3000} />
        <Form
          id={"form-create"}
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          style={{ width: "100%" }}>
          <Form.Item
            name="email"
              label={t("auth.form.email.label")}
              rules={[{ required: true, message: t("auth.form.email.required") }]}>
              <Input
                prefix={<UserOutlined />}
                size="large"
                placeholder={t("auth.form.email.placeholder")}
                autoComplete="nope"
              />
          </Form.Item>

          <Form.Item
            name="username"
              label={t("auth.form.username.label")}
              rules={[{ required: true, message: t("auth.form.username.required") }]}> 
              <Input
                prefix={<UserOutlined />}
                size="large"
                placeholder={t("auth.form.username.placeholder")}
              />
          </Form.Item>

          <Form.Item
            name="password"
              label={t("auth.form.password.label")}
              rules={[{ required: true, message: t("auth.form.password.required") }]}> 
              <Input.Password
                prefix={<LockOutlined />}
                size="large"
                placeholder={t("auth.form.password.placeholder")}
                autoComplete="new-password"
              />
          </Form.Item>
        </Form>
      </AModal>

      <VerifyCode
        open={openVerify}
        onCancel={() => {
          setOpenVerify(false);
          onCancel();
        }}
        item={form.getFieldsValue()}
      />
    </>
  );
}

export default SignUp;
