import { useTheme } from "@/fer-framework/fe-global/themes";
import { Column, Line } from "@ant-design/charts";
import { theme } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  data: any;
  config: any;
}

function ColumnChart({ data, config }: IProps) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { mode } = useTheme();

  const { t } = useTranslation();

  const configColumn = {
    data,
    axis: {
      x: {
        labelFill: mode === "dark" ? "#fff" : "#000",
        titleFill: mode === "dark" ? "#fff" : "#000",
      },
      y: {
        grid: true,
        gridLineWidth: 1,
        position: "left",
        title: `${t("_progress.parameterTest.columnChart.title")}`,
        labelFill: mode === "dark" ? "#fff" : "#000",
        titleFill: mode === "dark" ? "#fff" : "#000",
      },
    },
    tooltip: (
      d: any, // Each data item
      index: any, // index
      data: any, // Complete data
      column: any // channel
    ) => ({
      name: `${t("_progress.parameterTest.columnChart.time")}:`,
      value: t("_progress.parameterTest.columnChart.activity", {
        time: column.y.value[index],
      }),
    }),
    ...config,
  };
  return <Column {...configColumn} />;
}

export default ColumnChart;
