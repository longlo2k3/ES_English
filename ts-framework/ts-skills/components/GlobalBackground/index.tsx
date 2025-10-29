"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { QuizHeader } from "@/ts-framework/ts-skills/components/QuizCore";
import ACard from "@/fer-framework/fe-component/web/ACard";
import { createStyles } from "antd-style";

interface IProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  rollbackUrl: string;
  isBodyCard?: boolean;
}

function GlobalBackground(props: IProps) {
  const { title, description, children, rollbackUrl, isBodyCard } = props;
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <Link href={rollbackUrl} className={styles.rollback}>
        <ArrowLeftOutlined /> Quay lại
      </Link>
      <div className={styles.maxWidth}>
        <QuizHeader title={title} description={description} />

        {isBodyCard ? (
          <ACard className={styles.card}>{children}</ACard>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default GlobalBackground;

// useStyles giữ nguyên
const useStyles = createStyles(({ token, css }) => ({
  container: {
    minHeight: "100vh",
    background: "#f0f8ffb3",
    padding: "32px 16px",
    borderRadius: "8px",
  },
  maxWidth: {
    maxWidth: "768px",
    margin: "0 auto",
  },
  card: {
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    marginBottom: "24px",
  },
  rollback: css`
    margin-bottom: 16px;
    color: ${token.colorPrimary} !important;
  `,
}));
