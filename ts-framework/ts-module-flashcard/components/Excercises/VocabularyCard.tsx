import ACard from "@/fer-framework/fe-component/web/ACard";
import { usePostMutation } from "@/fer-framework/fe-cores/hooks/useApiMutaton";
import { SoundOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { Button, Flex, Image, Space, Typography } from "antd";
import React, { useMemo } from "react";
import {
  useGetSavedFlashCardQuery,
  usePostSaveFlashCardMutation,
} from "../../apis";

interface VocabularyCardProps {
  data: any;
  type: "front" | "back";
}

const { Title, Text } = Typography;

function VocabularyCard(props: VocabularyCardProps) {
  const { data, type } = props;

  const { data: SavedData, refetch } = useGetSavedFlashCardQuery(null);

  const isSaved = useMemo(() => {
    return !!SavedData?.items.find((item: any) => item?._id === data?._id);
  }, [SavedData, data?._id]);

  const { callPostApi, isLoading } = usePostMutation({
    useMutationHook: usePostSaveFlashCardMutation,
    onSuccess: (data) => {
      refetch();
    },
  });

  const handlePlayAudio = (e: any) => {
    e.stopPropagation();
    try {
      const audio = new Audio(data?.audio_url);
      audio.play();
    } catch (error) {
      console.error("Không thể phát âm thanh:", error);
    }
  };

  const handleToggleSave = (e: any) => {
    e.stopPropagation();
    callPostApi({ flashcard_id: data?._id });
  };

  const ActionButtons = () => (
    <Space style={{ width: "100%", justifyContent: "flex-end" }}>
      <Button
        type="text"
        shape="circle"
        icon={
          <SoundOutlined
            style={{
              fontSize: 20,
            }}
          />
        }
        onClick={handlePlayAudio}
      />
      <Button
        type="text"
        shape="circle"
        icon={
          isSaved ? (
            <StarFilled
              style={{
                fontSize: 20,
              }}
            />
          ) : (
            <StarOutlined
              style={{
                fontSize: 20,
              }}
            />
          )
        }
        onClick={handleToggleSave}
        style={{ color: isSaved ? "#fadb14" : "inherit" }}
        loading={isLoading}
      />
    </Space>
  );

  return (
    <ACard
      style={{
        border: "none",
        height: "100%",
      }}
      styles={{
        body: {
          height: "100%",
          padding: 0,
        },
      }}>
      <Flex vertical style={{ height: "100%" }}>
        <ActionButtons />
        {type === "front" && (
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}>
            <Flex vertical gap={8} align="center">
              <Title level={1} style={{ margin: 0, color: "#0052cc" }}>
                {data?.word} <Text>({data?.part_of_speech})</Text>
              </Title>
              <Text>[{data?.phonetic}]</Text>
              <Text type="secondary">Ex: {data?.example_en}</Text>
            </Flex>
          </div>
        )}
        {type === "back" && (
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}>
            <Flex vertical gap={8} align="center">
              <Image
                src={data?.image_url}
                width={300}
                style={{
                  borderRadius: 4,
                }}
                alt="ảnh minh họa"
                preview={false}
              />
              <Title level={3} style={{ margin: 0, color: "#0052cc" }}>
                {data?.meaning_vi}
              </Title>
              <Text type="secondary">Exp: {data?.example_vi}</Text>
            </Flex>
          </div>
        )}
      </Flex>
    </ACard>
  );
}

export default VocabularyCard;
