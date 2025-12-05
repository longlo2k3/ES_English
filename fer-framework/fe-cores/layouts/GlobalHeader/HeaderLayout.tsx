import React, { useMemo, useState } from "react";
import ChangeTheme from "../../components/ChangeTheme";
import Account from "@/fer-framework/fe-module-auth/components/Accounts";
import { Breadcrumb, Flex } from "antd";
import FullScreen from "../../components/FullScreen";
import { LanguageSwitcher } from "../../components/LanguageSwitch";
import { usePathname } from "next/navigation";

function HeaderLayout() {
  const [full, setFull] = useState(false);

  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = useMemo(() => {
    return segments.map((segment, index) => ({
      key: index,
      title: segment,
    }));
  }, [segments]);

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
    <Flex justify="space-between" align="center" style={{ width: "100%" }}>
      <Breadcrumb items={breadcrumbItems} />
      <Flex gap={16} justify="center" align="center">
        <LanguageSwitcher />
        <FullScreen toggleFullscreen={toggleFullscreen} full={full} />
        <ChangeTheme />
        <Account />
      </Flex>
    </Flex>
  );
}

export default HeaderLayout;
