"use client";

import {
  InfoCircleOutlined,
  LockOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { MenuProps } from "antd/lib";
import React, { use, useState } from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";

// Components
import { authSelectors } from "../../reducers";
import ChangePassword from "../ChangePassword";
import ProfileModal from "../Profile";
import { useTranslation } from "react-i18next";
// Apis

// Constants

function Account() {
  const router = useRouter();
  const { t } = useTranslation();

  const [open, setOpen] = useState<string>("");
  const onCancel = () => setOpen("");

  const userInfor = useSelector((state: any) => authSelectors.getUser(state));

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: t("account.profile"),
      icon: <InfoCircleOutlined />,
      onClick: () => setOpen("profile"),
    },
    {
      key: "2",
      label: t("account.changePassword"),
      icon: <LockOutlined />,
      onClick: () => setOpen("change-password"),
    },
    {
      key: "3",
      label: t("account.logout"),
      icon: <LogoutOutlined />,
      onClick: () => {
        localStorage.removeItem("token");
        deleteCookie("token");
        router.refresh();
      },
    },
  ];
  return (
    <>
      <Dropdown trigger={["click"]} menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Avatar
            size={46}
            src={userInfor?.user?.avatar_url}
            icon={<UserOutlined />}
          />
        </a>
      </Dropdown>
      <ProfileModal open={open === "profile"} onCancel={onCancel} />
      <ChangePassword open={open === "change-password"} onCancel={onCancel} />
    </>
  );
}

export default Account;
