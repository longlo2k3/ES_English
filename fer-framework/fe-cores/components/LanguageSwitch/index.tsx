"use client";

import { useTranslation } from "react-i18next";
import { Dropdown, Button, Tooltip, Select } from "antd";
import type { MenuProps } from "antd"; // Import type MenuProps
import { GlobalOutlined } from "@ant-design/icons"; // Thay thế icon Languages
import type { MenuInfo } from "rc-menu/lib/interface";

const languages = [
  { value: "vi", label: "Tiếng Việt" },
  { value: "en", label: "English" },
];

interface IProps {
  type?: "select" | "icon";
}

export function LanguageSwitcher(props: IProps) {
  const { i18n, t } = useTranslation();

  const { type = "icon" } = props;

  const handleMenuClick = (e: MenuInfo) => {
    i18n.changeLanguage(e.key as string);
  };

  const items: MenuProps["items"] = languages.map((lang) => ({
    key: lang.value,
    label: lang.label,
  }));

  const menuProps = {
    items,
    onClick: handleMenuClick,
    selectedKeys: [i18n.language],
  };

  return (
    <>
      {type === "icon" ? (
        <Tooltip title={t("header.language")}>
          <Dropdown
            trigger={["click"]}
            menu={menuProps}
            placement="bottomRight">
            <Button type="text" icon={<GlobalOutlined />} />
          </Dropdown>
        </Tooltip>
      ) : (
        <Select
          value={i18n.language}
          size="middle"
          options={languages}
          onChange={(e: string) => i18n.changeLanguage(e)}
          placeholder="Please select"
        />
      )}
    </>
  );
}
