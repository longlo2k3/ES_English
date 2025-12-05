"use client";

import { memo } from "react";
import { Pie } from "@ant-design/plots";
import { useTheme } from "@/fer-framework/fe-global/themes";
import { theme } from "antd";

interface Props {
  data: any;
  config?: any;
}

function PieChart(props: Props) {
  const { data, config } = props;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { mode } = useTheme();

  const _config = {
    data,
    legend: {
      color: {
        title: true,
        position: "bottom",
        itemLabelFill: mode === "dark" ? "#fff" : "#000",
      },
    },
    height: 300,
    ...config,
  };
  return <Pie {..._config} />;
}

export default memo(PieChart);
