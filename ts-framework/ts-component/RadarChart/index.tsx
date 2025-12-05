import { Radar } from "@ant-design/charts";
import React from "react";

interface RadarChartProps {
  data: any;
  config: any;
}

function RadarChart({ data, config }: RadarChartProps) {
  const radarChartConfig = {
    data,

    height: 280,
    meta: {
      score: {
        min: 0,
        max: 100,
        nice: true,
      },
    },
    area: {
      style: {
        fillOpacity: 0.2,
      },
    },
    point: {},
    line: {
      style: {
        lineWidth: 2,
      },
    },

    ...config,
  };

  return <Radar {...radarChartConfig} />;
}

export default RadarChart;
