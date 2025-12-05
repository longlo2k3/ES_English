import { Calendar, Card, Tooltip, Typography } from "antd";
import React, { useMemo } from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";

import ColumnChart from "@/ts-framework/ts-component/ColumnChart";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

function ActivityHeatmapCalendar({ item }: { item: any }) {
  const { t, i18n } = useTranslation();

  const data = useMemo(() => {
    return item?.study_time?.daily.map((i: any) => {
      const date = dayjs(i?.date).locale(i18n.language).format("dddd");

      return {
        date: date,
        hours: i?.duration === 0 ? 0 : Number((i?.duration / 3600).toFixed(1)),
      };
    });
  }, [item, i18n.language]);

  const config = {
    data,
    xField: "date",
    yField: "hours",
    height: 250,
  };

  return (
    <Card
      title={
        <Title level={4}>
          {t("_progress.parameterTest.columnChart.activity_history_7_days")}
        </Title>
      }>
      <ColumnChart data={data} config={config} />
    </Card>
  );
}

export default ActivityHeatmapCalendar;
