"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeftOutlined, CloseCircleFilled } from "@ant-design/icons";
import ACard from "@/fer-framework/fe-component/web/ACard";
import { createStyles } from "antd-style";
import CancelModal from "../CancelModa.tsx";
import { Flex } from "antd";

interface IProps {
  children?: React.ReactNode;
  rollbackUrl: string;
  isBodyCard?: boolean;
}

function GlobalBackground(props: IProps) {
  const { children, rollbackUrl, isBodyCard } = props;
  const { styles } = useStyles();

  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);

  const handleCancel = () => {
    setIsOpenCancelModal(false);
  };

  return (
    <div className={styles.container}>
      <CloseCircleFilled
        className={styles.rollback}
        onClick={() => setIsOpenCancelModal(true)}
      />
      {isBodyCard ? (
        <ACard
          style={{
            height: "100%",
          }}
          className={styles.card}>
          {children}
        </ACard>
      ) : (
        children
      )}

      {isOpenCancelModal && (
        <CancelModal
          open={isOpenCancelModal}
          onCancel={handleCancel}
          rollbackUrl={rollbackUrl}
        />
      )}
    </div>
  );
}

export default GlobalBackground;

const useStyles = createStyles(({ token, css }) => ({
  container: {
    minHeight: "100vh",
    background: "#f0f8ffb3",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  maxWidth: {
    maxWidth: "768px",
    margin: "0 auto",
  },
  card: {
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    margin: "0 calc(50% - 384px)",
    height: "100vh",
  },
  rollback: css`
    margin-bottom: 16px;
    color: #808080ff !important;
    font-size: 40px;
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
  `,
}));
