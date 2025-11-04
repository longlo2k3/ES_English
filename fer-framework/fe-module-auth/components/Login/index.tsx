import { Button, Card, Divider, Flex, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { memo } from "react";

// Components
import SignUp from "../SignUp";
import ForgetPassword from "../ForgetPassword";

// Apis
import { useLazyGetUserQuery, usePostLoginMutation } from "../../apis";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

function FormLogin() {
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: 'url("/tienganh6.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <Card style={{ width: 400, borderRadius: 12 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          {t("auth.login.title")}
        </Title>
        <ToastContainer position="top-right" autoClose={3000} />

        <Form
          form={form}
          name="login-form"
          layout="vertical"
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
            rules={[
              { required: true, message: t("auth.form.password.required") },
            ]}>
            <Input.Password
              prefix={<LockOutlined />}
              size="large"
              placeholder={t("auth.form.password.placeholder")}
            />
          </Form.Item>

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

          <Form.Item style={{ margin: 0 }}>
            <Flex justify="center" align="center">
              <ForgetPassword />
            </Flex>
          </Form.Item>

          <Divider size="middle" style={{ borderWidth: 2 }} />

          <Flex justify="center" align="center">
            <SignUp />
          </Flex>
        </Form>
      </Card>
    </div>
  );
}

export default memo(FormLogin);
