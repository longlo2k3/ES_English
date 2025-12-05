"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ConfigProvider,
  ConfigProviderProps,
  ThemeConfig,
  theme as themConfig,
} from "antd";

import { merge } from "lodash";

const ThemeContext = createContext({
  mode: "light",
  toggleTheme: (_mode: "dark" | "light") => {},
});

interface IProps extends ConfigProviderProps {
  children: React.ReactNode;
  defaultTheme?: "dark" | "light";
  theme?: ThemeConfig;
}

export default function ThemeProvider(props: IProps) {
  const { children, defaultTheme = "light", theme, ...otherProps } = props;
  const [mode, setMode] = useState<"light" | "dark">("light");

  const {
    token: { colorBgContainer, headerBg },
  }: { token: any } = themConfig.useToken();

  const toggleTheme = (_mode: "dark" | "light") => {
    setMode(_mode);
    localStorage.setItem("mode", _mode);
  };

  const _themeConfig = merge(
    {
      algorithm:
        mode === "dark"
          ? themConfig.darkAlgorithm
          : themConfig.defaultAlgorithm,
      token: {
        headerBg: mode === "dark" ? headerBg : colorBgContainer,
      },
    },
    theme
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ConfigProvider theme={_themeConfig} {...otherProps}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
