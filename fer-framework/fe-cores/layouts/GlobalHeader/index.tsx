import { Header } from "antd/es/layout/layout";
import React from "react";
import HeaderLayout from "./HeaderLayout";
import { theme } from "antd";

function GlobalHeader() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 20,
      }}>
      <HeaderLayout />
    </Header>
  );
}

export default GlobalHeader;
