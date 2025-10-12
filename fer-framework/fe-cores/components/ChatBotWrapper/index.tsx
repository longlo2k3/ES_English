import { WechatOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";

function ChatBotWrapper() {
  return (
    <a onClick={(e) => e.preventDefault()}>
      <Avatar size={54} icon={<WechatOutlined />} />
    </a>
  );
}

export default ChatBotWrapper;
