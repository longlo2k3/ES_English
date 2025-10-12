import {
  InfoCircleOutlined,
  LockOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { MenuProps } from "antd/lib";
import React from "react";

function Account() {
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
      label: <a href="/home">Logout</a>,
      icon: <LogoutOutlined />,
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
