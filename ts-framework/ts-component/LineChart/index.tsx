import { Line, LineConfig } from "@ant-design/charts";
import React from "react";

interface IProps {
  data: any;

  config?: LineConfig;
}

function LineChart(props: IProps) {
  const { data, config } = props;
  const configChart = {
    data: data,
    label: {
      style: {
        fontSize: 12,
      },
    },

    point: {
      size: 5,
      shape: "diamond",
    },
    tooltip: {
      title: "Điểm",
      items: ["score"],
    },
    smooth: true,

    ...config,
  };
  return <Line {...configChart} />;
}

export default LineChart;
