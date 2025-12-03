"use client";

import React, { useState } from "react";
import { CloseCircleFilled } from "@ant-design/icons";
import ACard from "@/fer-framework/fe-component/web/ACard";
import { createStyles } from "antd-style";
import CancelModal from "../CancelModa.tsx";
import { Col, Divider, Flex, Row, Typography } from "antd";

interface IProps {
  children?: React.ReactNode;
  isBodyCard?: boolean;
  title?: string | React.ReactNode;
  action?: React.ReactNode[];
  resultScreen?: React.ReactNode;
  rollbackUrl?: string;
}

const { Text, Title } = Typography;

function GlobalBackground(props: IProps) {
  const { children, isBodyCard, title, action, resultScreen, rollbackUrl } =
    props;
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
        <Flex align="center" justify="center" style={{ height: "100%" }}>
          <Row>
            <Col
              style={{
                borderRadius: 10,
                background: "#fff",
                padding: 20,
              }}>
              {title}
              <Divider style={{ borderColor: "#d3d3d3c7", marginTop: 0 }} />
              {children}
            </Col>
            <Col
              style={{
                padding: 20,
                borderRadius: 10,
                background: "#fff",
                marginLeft: 20,
              }}>
              {resultScreen}
            </Col>
          </Row>
        </Flex>
      ) : (
        children
      )}

      {isOpenCancelModal && (
        <CancelModal open={isOpenCancelModal} onCancel={handleCancel} />
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
    padding: "28px 16px",
  },
  maxWidth: {
    maxWidth: "768px",
    margin: "0 auto",
  },
  card: {
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    width: "calc(100% - 600px)",
    height: "100vh",
  },
  rollback: css`
    margin-bottom: 16px;
    color: #808080ff !important;
    font-size: 40px;
    position: absolute;
    top: 16px;
    left: 16px;
    cursor: pointer;
  `,
}));
