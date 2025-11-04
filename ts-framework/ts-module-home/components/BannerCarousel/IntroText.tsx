import { Button, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const { Text, Title } = Typography;

function IntroText() {
  const { t } = useTranslation();
  return (
    <>
      <Title style={{ margin: 0 }} level={1}>
        {t("home.intro.title")}
      </Title>
      <Text type="secondary">{t("home.intro.description")}</Text>
      <Button href="/home" style={{ width: 150 }} type="primary">
        {t("home.intro.button")}
      </Button>
    </>
  );
}

export default IntroText;
