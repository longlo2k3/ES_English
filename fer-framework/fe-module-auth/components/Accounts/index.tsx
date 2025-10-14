import {
  InfoCircleOutlined,
  LockOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { MenuProps } from "antd/lib";
import React from "react";
import { logout } from "../Login/actions";

function Account() {
  const handleLogout = async () => {
    await logout(); // Gọi server action
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a href="/home">Profile</a>,
      icon: <InfoCircleOutlined />,
    },
    {
      key: "2",
      label: <a href="/home">Change password</a>,
      icon: <LockOutlined />,
    },
    {
      key: "3",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];
  return (
    <Dropdown trigger={["click"]} menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Avatar icon={<UserOutlined />} />
      </a>
    </Dropdown>
  );
}

export default Account;
