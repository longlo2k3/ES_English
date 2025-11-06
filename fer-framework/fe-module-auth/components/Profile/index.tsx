import AModal from "@/fer-framework/fe-component/web/AModal";
import {
  Avatar,
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { authSelectors } from "../../reducers";
import { useSelector } from "react-redux";
import { useEditUserMutation, useGetUserQuery } from "../../apis";
import UploadFile from "@/fer-framework/fe-module-upload/components/UploadFile";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";

interface IProps {
  open: boolean;
  onCancel: () => void;
}

function ProfileModal(props: IProps) {
  const { open, onCancel } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation();
  // const user = useSelector((state: any) => authSelectors.getUser(state));

  const [isEdit, setIsEdit] = useState(true);

  const onUpdate = () => {
    setIsEdit(false);
  };

  const userInfor = useSelector((state: any) => authSelectors.getUser(state));

  const { data, refetch } = useGetUserQuery({
    id: userInfor?.user?.id as string,
  });

  const [editUser, { isLoading }] = useEditUserMutation();

  useEffect(() => {
    form.setFieldsValue(data?.user);
  }, [data, form]);

  const handleUpdateInfo = async (values: any) => {
    try {
      await editUser({
        body: {
          full_name: values.full_name,
          gender: values.gender,
          age: values.age,
          occupation: values.occupation,
          avatar_url: values.avatar_url,
        },
        params: { id: userInfor?.user?.id as string },
      }).unwrap();

      refetch();
      setIsEdit(true);
    } catch (error) {}
  };

  return (
    <AModal
      title={t("auth.profile.title")}
      open={open}
      onCancel={() => {
        onCancel();
        setIsEdit(true);
      }}
      fullHeight
      destroyOnHidden
      footer={[
        <>
          <Button
            key="btn-cancel"
            onClick={() => {
              onCancel();
              form.resetFields();
              setIsEdit(true);
            }}>
            {t("button.close")}
          </Button>
          ,
          {isEdit ? (
            <Button key="btn-update" type="primary" onClick={onUpdate}>
              {t("auth.profile.update")}
            </Button>
          ) : (
            <>
              <Button
                key="btn-cancel"
                type="dashed"
                onClick={() => {
                  setIsEdit(true);
                }}>
                {t("auth.profile.cancelUpdate")}
              </Button>
              <Button
                key="btn-update-info"
                loading={isLoading}
                type="primary"
                form={"form-update-info"}
                htmlType="submit">
                {t("auth.profile.update")}
              </Button>
            </>
          )}
          ,
        </>,
      ]}>
      <Form
        id={"form-update-info"}
        form={form}
        onFinish={handleUpdateInfo}
        layout="vertical">
        <Form.Item
          name={"avatar_url"}
          label={t("auth.profile.form.avatar.label")}>
          {isEdit ? (
            <Avatar
              size={64}
              src={userInfor?.user?.avatar_url}
              alt="avatar"
              icon={<UserOutlined />}
            />
          ) : (
            <UploadFile
              listType="picture-card"
              initValues={userInfor?.user?.avatar_url}
              maxCount={1}
              multiple={false}
              maxSize={50}
              accept="image/*"
              returnObject={true}>
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>{t("auth.profile.upload")}</div>
              </button>
            </UploadFile>
          )}
        </Form.Item>

        {/* full_name, gender, age, occupation, avatar_url */}

        <Form.Item
          label={t("auth.profile.form.fullName.label")}
          name="full_name">
          <Input
            placeholder={t("auth.profile.form.fullName.placeholder")}
            disabled={isEdit}
          />
        </Form.Item>

        <Form.Item label={t("auth.profile.form.gender.label")} name="gender">
          <Radio.Group disabled={isEdit}>
            <Radio value={"MALE"}>{t("auth.profile.gender.male")}</Radio>
            <Radio value={"FEMALE"}>{t("auth.profile.gender.female")}</Radio>
            <Radio value={"OTHER"}>{t("auth.profile.gender.other")}</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label={t("auth.profile.form.age")} name="age">
          <InputNumber disabled={isEdit} />
        </Form.Item>

        <Form.Item
          label={t("auth.profile.form.occupation.label")}
          name="occupation">
          <Input
            placeholder={t("auth.profile.form.occupation.placeholder")}
            disabled={isEdit}
          />
        </Form.Item>

        <Form.Item
          label={t("auth.profile.form.username.label")}
          name="username">
          <Input disabled />
        </Form.Item>

        <Form.Item label={t("auth.profile.form.email.label")} name="email">
          <Input disabled />
        </Form.Item>

        <Form.Item label={t("auth.profile.form.role.label")} name="role">
          <Select
            options={[
              { label: t("auth.profile.role.learner"), value: "LEARNER" },
              { label: t("auth.profile.role.teacher"), value: "TEACHER" },
              { label: t("auth.profile.role.admin"), value: "ADMIN" },
            ]}
            placeholder={t("auth.profile.form.role.placeholder")}
            disabled
          />
        </Form.Item>

        {/* <Form.Item label="Trạng thái" name="status">
          <Switch disabled />
        </Form.Item>

        <Form.Item label="Ngày tạo" name="created_at">
          <Input disabled />
        </Form.Item> */}
      </Form>
    </AModal>
  );
}

export default ProfileModal;
