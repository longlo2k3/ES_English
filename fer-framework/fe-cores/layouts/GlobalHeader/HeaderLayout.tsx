import React, { useState } from "react";
import ChangeTheme from "../../components/ChangeTheme";
import Account from "@/fer-framework/fe-module-auth/components/Accounts";
import { Flex } from "antd";
import FullScreen from "../../components/FullScreen";
import { LanguageSwitcher } from "../../components/LanguageSwitch";

function HeaderLayout() {
  const [full, setFull] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFull(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setFull(false);
    }
  };

  return (
    <Flex gap={16} justify="center" align="center">
      <LanguageSwitcher />
      <FullScreen toggleFullscreen={toggleFullscreen} full={full} />
      <ChangeTheme />
      <Account />
    </Flex>
  );
}

export default HeaderLayout;
