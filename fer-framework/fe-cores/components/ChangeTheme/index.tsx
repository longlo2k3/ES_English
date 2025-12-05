import React from "react";
import { Button, Tooltip } from "antd";
import { SunFilled, MoonFilled } from "@ant-design/icons";
import { useTheme } from "@/fer-framework/fe-global/themes";
import { useTranslation } from "react-i18next";

const ChangeTheme: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  const { t } = useTranslation();
  return (
    <Tooltip
      title={mode === "dark" ? t("header.themeDark") : t("header.themeLight")}>
      <Button
        type="text"
        icon={mode === "dark" ? <SunFilled /> : <MoonFilled />}
        onClick={() => toggleTheme(mode === "dark" ? "light" : "dark")}
      />
    </Tooltip>
  );
};

export default ChangeTheme;
