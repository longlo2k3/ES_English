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
    form.resetFields();
  };

  return (
    <>
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
          label={t("auth.form.emailOrUsername.label")}
          rules={[
            {
              required: true,
              message: t("auth.form.emailOrUsername.required"),
            },
          ]}>
          <Input
            prefix={<UserOutlined />}
            size="large"
            placeholder={t("auth.form.emailOrUsername.placeholder")}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={t("auth.form.password.label")}
          rules={[
            { required: true, message: t("auth.form.password.required") },
          ]}>
          <Input.Password
            prefix={<LockOutlined />}
            size="large"
            placeholder={t("auth.form.password.placeholder")}
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            loading={isLoading}>
            {t("auth.signUp.createAccount")}
          </Button>
        </Form.Item>
      </Form>

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
