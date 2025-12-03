import { useTheme } from "@/fer-framework/fe-global/themes";
import { Area } from "@ant-design/charts";
import { theme } from "antd";
import { title } from "process";
import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  data: any;
  config?: any;
}

function AreaChart({ data, config }: IProps) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { t } = useTranslation();

  const { mode } = useTheme();

  const configChart = {
    data,
    style: {
      fill: "linear-gradient(-90deg, white 0%, #2389ff 100%)",
    },
    axis: {
      x: {
        labelAutoRotate: false,
        labelAutoEllipsis: true,
        labelLineWidth: 10,
        title: t("_progress.parameterTest.areaChart.xAxisTitle"),
        labelFill: mode === "dark" ? "#fff" : "#000",
        titleFill: mode === "dark" ? "#fff" : "#000",
      },
      y: {
        title: t("_progress.parameterTest.areaChart.yAxisTitle"),
        labelFill: mode === "dark" ? "#fff" : "#000",
        titleFill: mode === "dark" ? "#fff" : "#000",
      },
    },
    xField: {
      x: {
        title: {
          text: t("_progress.parameterTest.areaChart.xFieldTitle"),
        },
      },
    },
    line: {
      style: {
        stroke: "#2389ff",
        lineWidth: 2,
      },
    },
    point: {
      sizeField: 4,
      style: {
        stroke: "#2389ff",
        fill: "#fff",
      },
    },
    ...config,
  };

  return <Area {...configChart} />;
}

export default AreaChart;
