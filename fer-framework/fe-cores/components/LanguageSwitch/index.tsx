"use client";

import { useTranslation } from "react-i18next";
import { Dropdown, Button, Tooltip } from "antd";
import type { MenuProps } from "antd"; // Import type MenuProps
import { GlobalOutlined } from "@ant-design/icons"; // Thay thế icon Languages
import type { MenuInfo } from "rc-menu/lib/interface";

const languages = [
  { code: "vi", name: "Tiếng Việt" },
  { code: "en", name: "English" },
];

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const handleMenuClick = (e: MenuInfo) => {
    i18n.changeLanguage(e.key as string);
  };

  const items: MenuProps["items"] = languages.map((lang) => ({
    key: lang.code,
    label: lang.name,
  }));

  const menuProps = {
    items,
    onClick: handleMenuClick,
    selectedKeys: [i18n.language],
  };

  return (
    <Tooltip title={t("header.language")}>
      <Dropdown trigger={["click"]} menu={menuProps} placement="bottomRight">
        <Button type="text" icon={<GlobalOutlined />} />
      </Dropdown>
    </Tooltip>
  );
}
