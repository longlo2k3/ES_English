import { CSSProperties, ReactNode } from "react";
import { Typography } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";

const { Title, Paragraph } = Typography;

interface QuizHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export const QuizHeader = ({ title, description, icon }: QuizHeaderProps) => {
  const { styles } = useStyle();
  return (
    <div className={styles.header}>
      <div className={styles.iconWrapper}>
        {icon || <BookOutlined className={styles.icon} />}
        <Title level={2} style={{ marginBottom: 0 }}>
          {title}
        </Title>
      </div>
      {description && (
        <Paragraph className={styles.description}>{description}</Paragraph>
      )}
    </div>
  );
};

const useStyle = createStyles(({ token, css }) => ({
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  iconWrapper: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
  },
  description: {
    color: "#4b5563",
  },
  icon: css`
    font-size: 32px;
    color: ${token.colorPrimary} !important;
  `,
}));
