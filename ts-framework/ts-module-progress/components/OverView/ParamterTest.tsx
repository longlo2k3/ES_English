import AreaChart from "@/ts-framework/ts-component/AreaChart";
import { Card, Descriptions, Empty, Typography } from "antd";
import React, { use, useMemo } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const { Text, Title } = Typography;

interface IProps {
  item: any;
}

function ParamterTest({ item }: IProps) {
  const { t } = useTranslation();

  const formattedData = useMemo(() => {
    return item?.mock_tests
      ?.map((i: any) => ({
        date: dayjs(i?.submitted_at).format("hh:mm DD/MM"),
        score: i?.test_score,
      }))
      .reverse();
  }, [item]);

  const hightScore = useMemo(() => {
    if (!item?.mock_tests?.length) return 0;
    return Math.max(...item.mock_tests.map((i: any) => i.test_score));
  }, [item]);

  const lowScore = useMemo(() => {
    if (!item?.mock_tests?.length) return 0;
    return Math.min(...item.mock_tests.map((i: any) => i.test_score));
  }, [item]);

  const config = {
    xField: "date",
    yField: "score",
    height: 250,
  };
  return (
    <Card title={<Title level={4}>{t("_progress.parameterTest.title")}</Title>}>
      {formattedData?.length <= 0 ? (
        <Empty />
      ) : (
        <>
          <AreaChart data={formattedData} config={config} />
          <Title level={5} style={{ marginTop: "24px" }}>
            {t("_progress.parameterTest.latestResult", {
              score: item?.mock_tests?.[0]?.test_score,
            })}
          </Title>
          <Descriptions bordered column={2} size="small">
            <Descriptions.Item
              label={t("_progress.parameterTest.highestScoreLabel")}
              span={2}>
              <Text strong style={{ fontSize: "1.2em" }}>
                {t("_progress.parameterTest.scoreUnit", {
                  score: hightScore,
                })}
              </Text>
            </Descriptions.Item>

            <Descriptions.Item
              label={t("_progress.parameterTest.lowestScoreLabel")}
              span={2}>
              <Text strong style={{ fontSize: "1.2em" }}>
                {t("_progress.parameterTest.scoreUnit", {
                  score: lowScore,
                })}
              </Text>
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Card>
  );
}

export default ParamterTest;
