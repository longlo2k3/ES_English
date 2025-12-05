import { Spin } from "antd";
import React from "react";

interface IProps {
  isLoading: boolean;
  tip?: string;
}

function SpinLoading(props: IProps) {
  const { isLoading, tip } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Spin spinning={isLoading} tip={tip} />
    </div>
  );
}

export default SpinLoading;
