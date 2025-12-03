import LevelCard from "@/ts-framework/ts-skills/components/LevelCard";
import ACard from "@/fer-framework/fe-component/web/ACard";
import Mascot, { EonOwlSvg } from "@/ts-framework/ts-component/Mascot";
import { FundOutlined, ReadOutlined, TrophyOutlined } from "@ant-design/icons";
import { Flex, List, Typography } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useSelectLevelQuery,
  useSelectSkillQuery,
} from "@/ts-framework/ts-skills/apis";
import TopicModal from "@/ts-framework/ts-component/TopicModal";
import TypeAnimationWrapper from "@/fer-framework/fe-component/web/TypeAnimation";
import {
  SlideInFromBottom,
  ZoomMotion,
} from "@/fer-framework/fe-component/web/MotionWrapper";
import i18next from "i18next";
import { useTheme } from "@/fer-framework/fe-global/themes";

const { Title, Paragraph } = Typography;

function LevelsTabs() {
  const { data: SkillData } = useSelectSkillQuery(null);
  const { t } = useTranslation();

  const { mode } = useTheme();

  const [active, setActive] = useState("");

  const skillListening = useMemo(() => {
    return SkillData?.find((item: any) => item.code === "LISTENING");
  }, [SkillData]);

  const { data: levelData } = useSelectLevelQuery(null);

  const levelId = useCallback(
    (level: string) => {
      return levelData?.find((item: any) => item.code === level)?._id;
    },
    [levelData]
  );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        background:
          mode === "dark"
            ? "#0f172a"
            : "linear-gradient(135deg, #d4f1ff 0%, #e8e5ff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderRadius: "16px",
      }}>
      <div
        style={{
          position: "absolute",
          display: mode === "dark" ? "none" : "block",
          inset: 0,
          backgroundImage: "radial-gradient(white 2px, transparent 2px)",
          backgroundSize: "20px 20px",
          pointerEvents: "none",
          opacity: 0.4,
        }}></div>
      <ACard
        style={{
          width: 500,
          // background: "#fff",
          borderRadius: "16px",
          // border: "1px solid #f0f0f0",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        }}>
        <div style={{ position: "absolute", top: "50%", right: -180 }}>
          <ZoomMotion type="animate" duration={0.8}>
            <Mascot message={t("skills.mascotMessage")} />
          </ZoomMotion>
        </div>
        <Flex vertical justify="center" align="center">
          <div style={{ position: "absolute", top: 8, left: 12 }}>
            <ZoomMotion type="animate" duration={0.8}>
              <EonOwlSvg width={150} height={150} />
            </ZoomMotion>
          </div>

          <ZoomMotion type="animate" duration={0.8}>
            <Title level={4}>{t("skills.selectLevel")}</Title>
          </ZoomMotion>
          <Paragraph key={i18next.language}>
            <TypeAnimationWrapper
              sequence={[
                {
                  text: t("skills.selectPath"),
                  delay: 100,
                },
              ]}
            />
          </Paragraph>

          <Flex vertical gap={12}>
            <SlideInFromBottom type="animate" duration={1}>
              <LevelCard
                backgroundColor="linear-gradient(90deg, #c3f8a9, #e6f6ea)"
                titleColor="#338b07"
                descColor="#46a814f0"
                icon={<ReadOutlined style={{ color: "#fff", fontSize: 36 }} />}
                onClick={() => setActive("BEGINNER")}
                // 3. Thay thế text cứng bằng t()
                title={t("levels.beginner.title")}
                description={t("levels.beginner.desc")}
              />
            </SlideInFromBottom>

            <SlideInFromBottom type="animate" duration={1.2}>
              <LevelCard
                backgroundColor="linear-gradient(90deg, rgb(169 234 248), rgb(215 235 239))"
                titleColor="#07818c"
                descColor="#0c7479f0"
                icon={<FundOutlined style={{ color: "#fff", fontSize: 36 }} />}
                onClick={() => setActive("INTERMEDIATE")}
                title={t("levels.intermediate.title")}
                description={t("levels.intermediate.desc")}
              />
            </SlideInFromBottom>

            <SlideInFromBottom type="animate" duration={1.4}>
              <LevelCard
                backgroundColor="linear-gradient(90deg, rgb(191 169 248), rgb(244 230 246))"
                titleColor="#5b078b"
                descColor="#7d14a8f0"
                icon={
                  <TrophyOutlined style={{ color: "#fff", fontSize: 36 }} />
                }
                onClick={() => setActive("ADVANCED")}
                title={t("levels.advanced.title")}
                description={t("levels.advanced.desc")}
              />
            </SlideInFromBottom>
          </Flex>
        </Flex>
      </ACard>

      <TopicModal
        open={active === "BEGINNER"}
        onCancel={() => setActive("")}
        skill_id={skillListening?._id}
        level_id={levelId("BEGINNER")}
        type="listening"
      />

      <TopicModal
        open={active === "INTERMEDIATE"}
        onCancel={() => setActive("")}
        skill_id={skillListening?._id}
        level_id={levelId("INTERMEDIATE")}
        type="listening"
      />

      <TopicModal
        open={active === "ADVANCED"}
        onCancel={() => setActive("")}
        skill_id={skillListening?._id}
        level_id={levelId("ADVANCED")}
        type="listening"
      />
    </div>
  );
}

export default LevelsTabs;
