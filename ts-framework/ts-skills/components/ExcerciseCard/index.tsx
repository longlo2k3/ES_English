import { BookOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { createStyles } from "antd-style";
import React from "react";

interface IProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const { Title, Paragraph } = Typography;

function ExcerciseCard(props: IProps) {
  const { title, description, children } = props;
  const { styles } = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.maxWidth}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <BookOutlined style={{ fontSize: "32px", color: "#2563eb" }} />
            <Title level={2} style={{ marginBottom: 0 }}>
              {title}
            </Title>
          </div>
          <Paragraph className={styles.headerText}>{description}</Paragraph>
        </div>

        {children}
      </div>
    </div>
  );
}

export default ExcerciseCard;

const useStyles = createStyles(({ token, css }) => ({
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 100%)",
    padding: "32px 16px",
  },
  maxWidth: {
    maxWidth: "768px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  headerIcon: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
  },
  headerText: {
    color: "#4b5563",
  },
}));
