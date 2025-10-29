"use client";

import AModal from "@/fer-framework/fe-component/web/AModal";

import { Button, Form, Input } from "antd";

import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { useChangePWUserMutation } from "../../apis";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

interface IProps {
  open: boolean;
  onCancel: () => void;
}

function ChangePassword(props: IProps) {
  const { open, onCancel } = props;
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
        toast.error(data?.error?.message || "Đổi mật khẩu thành công!");
      } else {
        toast.success(
          data?.data?.message ||
            "Đổi mật khẩu thành công! Vui lòng đăng nhập lại."
        );
        onCancel();
        form.resetFields();
        localStorage.removeItem("token");
        deleteCookie("token");
        router.refresh();
      }
    } catch (error) {
      toast.error(data?.error?.message || "Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  return (
    <AModal
      title={"Đổi mật khẩu"}
      open={open}
      onCancel={onCancel}
      destroyOnHidden
      footer={() => (
        <>
          <Button key={"btn-cancel"} onClick={onCancel}>
            Hủy
          </Button>
          <Button
            key={"btn-ok"}
            form="btn-ok"
            type="primary"
            loading={isLoading}
            htmlType="submit">
            Đổi mật khẩu
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
          toast.error("Đã xảy ra lỗi, vui lòng kiểm tra lại!");
        }}>
        <Form.Item
          name={"old_password"}
          label="Mật khẩu cũ"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu cũ!",
            },
          ]}>
          <Input.Password placeholder="Nhập mật khẩu cũ" />
        </Form.Item>

        <Form.Item
          name={"new_password"}
          label="Mật khẩu mới"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu mới!",
            },
          ]}>
          <Input.Password placeholder="Nhập mật khẩu mới" />
        </Form.Item>
      </Form>
    </AModal>
  );
}

export default ChangePassword;
