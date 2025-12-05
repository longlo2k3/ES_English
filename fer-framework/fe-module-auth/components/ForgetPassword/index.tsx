"use client";

import AModal from "@/fer-framework/fe-component/web/AModal";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForgetPWMutation, useResetPWMutation } from "../../apis";
import VerifyOTP from "./VerifyOTP";

const { Link } = Typography;

function ForgetPassword() {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenVerify, setIsOpenVerify] = useState<boolean>(false);

  const [isVerifyOTP, setIsVerifyOTP] = useState<boolean>(false);

  const [form] = useForm();

  const hanldeVerifyOTP = () => {
    setIsVerifyOTP(true);
  };

  const [postForgetPW, { isLoading }] = useForgetPWMutation();
  const [postResetPW, { isLoading: isLoadingReset }] = useResetPWMutation();

  const handleSubmit = async (values: any) => {
    try {
      if (!isVerifyOTP) {
        const data = await postForgetPW({ email: values.email }).unwrap();
        setIsOpenVerify(true);
        message.success(data?.message || t("auth.signUp.toastSent"));
      } else {
        const data = await postResetPW({
          email: values.email,
          new_password: values.password,
        }).unwrap();

        onCancel();

        message.success(data?.message || t("auth.signUp.toastSent"));
      }
    } catch (error: any) {
      message.error(error?.message || t("auth.signUp.toastError"));
    }
  };

  const onCancel = () => {
    setIsOpen(false);
    form.resetFields();
    setIsVerifyOTP(false);
  };

  return (
    <>
      <Link onClick={() => setIsOpen(true)}>
        {t("auth.forgetPassword.link")}
      </Link>

      <AModal
        open={isOpen}
        onCancel={onCancel}
        title={t("auth.forgetPassword.link")}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            {t("auth.forgetPassword.btnCancel")}
          </Button>,
          <Button
            key="submit"
            loading={isLoading || isLoadingReset}
            type="primary"
            onClick={() => form.submit()}>
            {t("auth.forgetPassword.btnSubmit")}
          </Button>,
        ]}>
        <Form
          form={form}
          id={"form-forgetpw"}
          onFinish={handleSubmit}
          layout="vertical">
          <Form.Item
            name="email"
            label={t("auth.form.email.label")}
            rules={[
              { required: true, message: t("auth.form.email.required") },
            ]}>
            <Input
              prefix={<UserOutlined />}
              size="large"
              placeholder={t("auth.form.email.placeholder")}
              autoComplete="nope"
            />
          </Form.Item>

          {isVerifyOTP && (
            <Form.Item
              name="password"
              label={t("auth.forgetPassword.password.label")}
              rules={[
                {
                  required: true,
                  message: t("auth.forgetPassword.password.required"),
                },
              ]}>
              <Input.Password
                prefix={<LockOutlined />}
                size="large"
                placeholder={t("auth.forgetPassword.password.placeholder")}
                autoComplete="new-password"
              />
            </Form.Item>
          )}
        </Form>
      </AModal>

      <VerifyOTP
        open={isOpenVerify}
        onCancel={() => setIsOpenVerify(false)}
        email={form.getFieldValue("email")}
        hanldeVerifyOTP={hanldeVerifyOTP}
      />
    </>
  );
}

export default ForgetPassword;
