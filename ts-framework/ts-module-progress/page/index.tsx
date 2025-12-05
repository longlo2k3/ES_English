import { Layout, Tabs, theme, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import HistoryTab from "../components/HistoryTab";
import { useGetProgressQuery } from "../apis";
import SpinLoading from "@/ts-framework/ts-component/Spin";
import { useTheme } from "@/fer-framework/fe-global/themes";
import { useTranslation } from "react-i18next";
import OverView from "../components/OverView";
import RoadmapTab from "../components/RoadmapTab";

const { Title } = Typography;

function Page() {
  const { data, isLoading } = useGetProgressQuery(null);
  const { t } = useTranslation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { mode } = useTheme();
  const items = [
    {
      key: "1",
      label: t("_progress.tab.overview"),
      children: <OverView data={data} />,
    },
    {
      key: "2",
      label: t("_progress.tab.roadmap"),
      children: <RoadmapTab item={data} />,
    },
    {
      key: "3",
      label: t("_progress.tab.history"),
      children: <HistoryTab item={data} />,
    },
  ];
  return (
    <Layout
      color={mode === "dark" ? colorBgContainer : "#f0f2f5"}
      style={{ padding: "24px" }}>
      <Content>
        <Title level={2} style={{ marginBottom: "24px" }}>
          {t("_progress.title")}
        </Title>
        {isLoading ? (
          <SpinLoading isLoading={isLoading} />
        ) : (
          <Tabs defaultActiveKey="1" type="card" items={items} />
        )}
      </Content>
    </Layout>
  );
}

export default Page;
