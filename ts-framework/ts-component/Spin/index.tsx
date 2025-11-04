import { Spin } from "antd";
import React from "react";

interface IProps {
  isLoading: boolean;
}

function SpinLoading(props: IProps) {
  const { isLoading } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Spin spinning={isLoading} />
    </div>
  );
}

export default SpinLoading;
