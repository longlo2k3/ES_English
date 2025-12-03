import { Flex, Image, Typography } from "antd";
import React from "react";
import { useCollapsed } from "../GlobalLayoutBase/CollapsedProvider";
import LogoIcon from "@/ts-framework/ts-component/Icons/Logo";

function GlobalLogo() {
  const { collapsed, toggleCollapsed } = useCollapsed();

  return (
    <div className="demo-logo">
      <Flex justify="center" align="center" style={{ margin: "10px 0" }}>
        {/* <Image width={60} height={60} src="/logo.png" preview={false} /> */}
        <LogoIcon width={60} height={60} />
        <Typography.Title
          level={4}
          style={{
            margin: 0,
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: collapsed ? "none" : "block",
          }}>
          ES English
        </Typography.Title>
      </Flex>
    </div>
  );
}

export default GlobalLogo;
