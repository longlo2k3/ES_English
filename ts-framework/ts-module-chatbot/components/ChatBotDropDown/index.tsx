import { WechatOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { MenuProps } from "antd/lib";
import React from "react";
import ChatbotWrapper from "../ChatbotWrapper";

function ChatBotDropDown() {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <ChatbotWrapper />,
    },
  ];
  return (
    <a onClick={(e) => e.preventDefault()}>
      <Dropdown trigger={["click"]} menu={{ items }} placement="topLeft" arrow>
        <Avatar
          size={54}
          style={{
            color: "#ffffff",
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          }}
          icon={<WechatOutlined />}
        />
      </Dropdown>
    </a>
  );
}

export default ChatBotDropDown;
