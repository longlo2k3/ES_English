import ACard from "@/fer-framework/fe-component/web/ACard";
import AModal from "@/fer-framework/fe-component/web/AModal";
import { useHookTable } from "@/fer-framework/fe-cores/common/table";
import { useGetTopicBySkillAndLevelQuery } from "@/ts-framework/ts-skills/apis";
import { Col, List, Row, Tag, Tooltip, Typography } from "antd";
import { createStyles } from "antd-style";
import React, { useMemo } from "react";
import Mascot from "../Mascot";
import HeaderOperation from "@/fer-framework/fe-component/web/ATable/HeaderOperation";
import { useRouter } from "next/navigation";
import { SlideInFromBottom } from "@/fer-framework/fe-component/web/MotionWrapper";
import { useTheme } from "@/fer-framework/fe-global/themes";

interface IProps {
  open: boolean;
  onCancel: () => void;
  skill_id: number;
  level_id: number;
  type: string;
}

const { Text, Paragraph } = Typography;

function TopicModal(props: IProps) {
  const { open, onCancel, skill_id, level_id, type } = props;
  const { styles } = useStyles();
  const router = useRouter();

  const { mode } = useTheme();

  const { dataSource, isLoading } = useHookTable({
    useHookApi: useGetTopicBySkillAndLevelQuery,
    paramsApi: {
      skill_id: skill_id,
      level_id: level_id,
    },
    config: ["title", "description"],
  });

  return (
    <AModal
      className={mode === "dark" ? styles.containerDark : styles.container}
      open={open}
      onCancel={onCancel}
      title={
        <div>
          <HeaderOperation />
        </div>
      }
      width={"calc(100vw - 300px)"}
      footer={null}
      fullHeight
      destroyOnHidden>
      <div style={{ position: "absolute", top: "50%", right: 0 }}>
        <Mascot message={`Hãy một chọn chủ đề!`} />
      </div>
      <div style={{ marginTop: 16 }}>
        <List
          dataSource={dataSource}
          grid={{ gutter: 16, sm: 1, md: 2, xl: 4 }}
          loading={isLoading}
          renderItem={(item: any, index: number) => {
            const duration = 0.8 + index * 0.2;
            return (
              <SlideInFromBottom type="animate" duration={duration}>
                <List.Item style={{ paddingBottom: 16 }}>
                  <ACard
                    hoverable
                    title={item.title}
                    style={{
                      minWidth: 200,
                      width: 250,
                    }}
                    styles={{
                      body: {
                        minHeight: 100,
                      },
                    }}
                    onClick={() => {
                      router.push(
                        `/skills/${type}/${item.skill_id._id}/${item.level_id._id}/${item._id}`
                      );
                    }}>
                    <Tooltip title={item.description}>
                      <Paragraph ellipsis={{ rows: 1, expandable: false }}>
                        {item.description}
                      </Paragraph>
                    </Tooltip>
                    <Tag color="blue">{item.skill_id.name}</Tag>
                    <Tag color="green">{item.level_id.name}</Tag>
                  </ACard>
                </List.Item>
              </SlideInFromBottom>
            );
          }}
        />
      </div>
    </AModal>
  );
}

export default TopicModal;

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    .ant-modal-content {
      background: linear-gradient(135deg, #d4f1ff 0%, #e8e5ff 100%);
    }
    .ant-modal-title {
      background: linear-gradient(135deg, #d4f1ff 0%, #e8e5ff 100%);
    }
  `,

  containerDark: css``,
}));
