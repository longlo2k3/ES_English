import React from "react";
import ChatBot, { Button, Flow } from "react-chatbotify";
import { callGeminiAPI } from "../../hooks/gemini";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

function ChatbotWrapper() {
  const { t } = useTranslation();
  const settings = {
    general: {
      primaryColor: "#2575fc",
      secondaryColor: "#6a11cb",
      fontFamily: "Arial, sans-serif",
      floating: true,
      showFooter: false,
    },
    audio: {
      disabled: false,
    },
    chatHistory: {
      display: false,
    },
    header: {
      title: "ESbot",
      buttons: [Button.CLOSE_CHAT_BUTTON],
    },
  };

  const styles = {
    headerStyle: {
      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      color: "#ffffff",
      padding: "10px",
    },
    chatWindowStyle: {
      backgroundColor: "#f2f2f2",
    },
    sendButtonStyle: {
      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    },
    botOptionHoveredStyle: {
      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    },
    tooltipStyle: {
      display: "none",
    },
    chatButtonStyle: {
      width: "50px",
      height: "50px",
    },
  };

  const flow = {
    start: {
      message: t("chatBot.startMessage"),
      path: "ai_response",
    },
    ai_response: {
      message: async (params: any) => {
        const userQuestion = params.userInput;
        const response = await callGeminiAPI(userQuestion);
        return response;
      },
      path: "ai_response",
    },
  };

  return (
    <ChatBot
      key={i18next.language} // ép re-mount lại khi thay đổi ngôn ngữ
      styles={styles}
      settings={settings as any}
      flow={flow}
    />
  );
}

export default ChatbotWrapper;
