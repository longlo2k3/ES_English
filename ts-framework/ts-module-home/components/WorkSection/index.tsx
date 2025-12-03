import { Steps } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const { Step } = Steps;

function WorkSection() {
  const { t } = useTranslation();
  return (
    <Steps current={-1} responsive>
      <Step
        title={t("home.howItWorks.step1")}
        description={t("home.howItWorks.step1Desc")}
      />
      <Step
        title={t("home.howItWorks.step2")}
        description={t("home.howItWorks.step2Desc")}
      />
      <Step
        title={t("home.howItWorks.step3")}
        description={t("home.howItWorks.step3Desc")}
      />
      <Step
        title={t("home.howItWorks.step4")}
        description={t("home.howItWorks.step4Desc")}
      />
    </Steps>
  );
}

export default WorkSection;
