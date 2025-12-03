import AModal from "@/fer-framework/fe-component/web/AModal";
import { illustrationPrompt } from "@/fer-framework/fe-cores/constants";
import SpinLoading from "@/ts-framework/ts-component/Spin";
import { useHookGeminiToText } from "@/ts-framework/ts-skills/hook/useHookGeminiAI";
import { BulbOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Modal, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

interface IProps {
  item: any;
}

function Illustration({ item }: IProps) {
  const { callGeminiToTextApi, data, isLoading } = useHookGeminiToText();

  const { t } = useTranslation();

  const handleSuggest = async () => {
    try {
      callGeminiToTextApi(illustrationPrompt(item));
    } catch (error) {
      return error;
    }
  };

  return (
    <Card
      title={
        <Flex justify="space-between" align="center" style={{ width: "100%" }}>
          <Title level={4}>
            <BulbOutlined /> {t("_progress.suggestions.title")}
          </Title>

          <Button loading={isLoading} onClick={handleSuggest}>
            {t("_progress.suggestions.buttonTitle")}
          </Button>
        </Flex>
      }>
      {data && (
        <Typography.Paragraph>
          <span dangerouslySetInnerHTML={{ __html: data }} />
        </Typography.Paragraph>
      )}
    </Card>
  );
}

export default Illustration;
