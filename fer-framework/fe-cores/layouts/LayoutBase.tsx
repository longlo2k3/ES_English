"use client";

import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Image, Layout, Menu, theme } from "antd";
import { useTheme } from "antd-style";
import HeaderLayout from "./HeaderLayout";
import ChatBotWrapper from "../components/ChatBotWrapper";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

interface IProps {
  children: React.ReactNode;
}

const LayoutBase: React.FC<IProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { defaultAlgorithm, darkAlgorithm } = theme;

  const { mode, toggleTheme } = useTheme();

  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        theme={mode === "dark" ? "dark" : "light"}
        onCollapse={(value) => setCollapsed(value)}>
        <div style={{ textAlign: "center" }} className="demo-logo-vertical">
          <Image
            src="./logo.png"
            alt="logo"
            width={100}
            height={100}
            preview={false}
          />
        </div>
        <Menu
          style={{ height: "100%" }}
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
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
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[{ title: "User" }, { title: "Bill" }]}
          />
          <div
            style={{
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
            {children}
          </div>
          <div style={{ position: "absolute", bottom: 40, right: 40 }}>
            <ChatBotWrapper />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ES English ©{new Date().getFullYear()} Created by Long Ch1
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutBase;
