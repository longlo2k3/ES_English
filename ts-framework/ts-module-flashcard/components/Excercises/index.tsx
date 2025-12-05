import GlobalBackground from "@/ts-framework/ts-skills/components/GlobalBackground";
import React, { useMemo } from "react";
import { FlashcardArray, useFlashcardArray } from "react-quizlet-flashcard";
import "react-quizlet-flashcard/dist/index.css";
import { useGetFlasCardByTopicQuery } from "../../apis";
import { useParams } from "next/navigation";
import VocabularyCard from "./VocabularyCard";
import { Button, Col, Flex, Row, Spin } from "antd";
import {
  LeftCircleFilled,
  LeftOutlined,
  RightCircleFilled,
} from "@ant-design/icons";
import { useTheme } from "@/fer-framework/fe-global/themes";

function FlashcardDeck({ deck }: any) {
  const flipArrayHook = useFlashcardArray({
    deckLength: deck.length,
    showProgressBar: true,
    showCount: false,
    showControls: false,
    cycle: true,
  });

  const { mode } = useTheme();

  return (
    <Flex vertical align="center" justify="center" gap={18}>
      <FlashcardArray
        deck={deck}
        flipArrayHook={flipArrayHook}
        style={{
          textAlign: "center",
        }}
      />
      <Flex gap={10}>
        <LeftCircleFilled
          style={{ fontSize: 24, color: mode === "dark" ? "white" : "black" }}
          onClick={() => flipArrayHook.prevCard()}
        />
        <span style={{ color: mode === "dark" ? "white" : "black" }}>
          {flipArrayHook.currentCard + 1} / {deck.length}
        </span>
        <RightCircleFilled
          style={{ fontSize: 24, color: mode === "dark" ? "white" : "black" }}
          onClick={() => flipArrayHook.nextCard()}
        />
      </Flex>
    </Flex>
  );
}

function Excercise() {
  const prams = useParams();
  const { topic_id } = prams;

  const { data, isLoading } = useGetFlasCardByTopicQuery(
    {
      topic_id: topic_id as string,
    },
    {
      skip: !topic_id,
    }
  );

  const deck = useMemo(() => {
    if (!data?.items) {
      return [];
    }

    return data.items
      .map((item: any) => {
        if (!item) return null;

        return {
          id: item._id,
          front: {
            html: <VocabularyCard data={item} type="front" />,
          },
          back: {
            html: <VocabularyCard data={item} type="back" />,
          },
        };
      })
      .filter(Boolean);
  }, [data]);

  const renderContent = () => {
    if (isLoading || !topic_id) {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spin spinning={isLoading} />
        </div>
      );
    }

    if (!isLoading && deck.length === 0) {
      return (
        <div style={{ textAlign: "center" }}>
          No cards found for this topic.
        </div>
      );
    }

    return <FlashcardDeck deck={deck} />;
  };

  return <GlobalBackground>{renderContent()}</GlobalBackground>;
}

export default Excercise;
