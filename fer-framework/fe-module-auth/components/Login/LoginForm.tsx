import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Form, Input } from "antd";
import React from "react";
import ForgetPassword from "../ForgetPassword";
import SignUp from "../SignUp";
import { useTranslation } from "react-i18next";
import { useLazyGetUserQuery, usePostLoginMutation } from "../../apis";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { toast } from "react-toastify";

function LoginForm() {
  const { t } = useTranslation();
  const [postLogin, { isLoading }] = usePostLoginMutation();
  const [
    triggerGetUser,
    { data: userData, error: userError, isLoading: isUserLoading },
  ] = useLazyGetUserQuery();
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const data = await postLogin({
        usernameOrEmail: values.email,
        password: values.password,
      }).unwrap();

      setCookie("token", data.token);
      const user = await triggerGetUser(data.user.id).unwrap();

      localStorage.setItem("userId", JSON.stringify(data.user.id));
      toast.success(t("auth.login.success"));
      router.push("/home");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || t("auth.login.error"));
    }
  };

  return (
    <Form
      form={form}
      name="login-form"
      layout="vertical"
      style={{ marginTop: 20 }}
      onFinish={onFinish}>
      <Form.Item
        name="email"
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
        rules={[{ required: true, message: t("auth.form.password.required") }]}
        style={{ margin: 0 }}>
        <Input.Password
          prefix={<LockOutlined />}
          size="large"
          placeholder={t("auth.form.password.placeholder")}
        />
      </Form.Item>

      <Form.Item>
        <Flex justify="end" align="center">
          <ForgetPassword />
        </Flex>
      </Form.Item>

      {/* <Divider size="middle" style={{ borderWidth: 2 }} /> */}

      <Form.Item>
        <Button
          type="primary"
          loading={isLoading}
          htmlType="submit"
          block
          size="large">
          {t("auth.login.submit")}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
