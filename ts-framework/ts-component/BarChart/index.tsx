import { Bar } from "@ant-design/charts";
import { title } from "process";
import React from "react";

interface IProps {
  data: any;
  config?: any;
}

function BarChart({ data, config }: IProps) {
  const configChart = {
    data,
    columnWidthRatio: 0.5,
    color: "#3498ff",
    minBarWidth: 0.0,
    axis: {
      x: {
        tick: false,
        title: false,
      },
      y: {
        grid: false,
        tick: false,
        label: false,
        title: false,
      },
    },
    barStyle: {
      minHeight: 0,
    },
    ...config,
  };

  return <Bar {...configChart} />;
}

export default BarChart;
