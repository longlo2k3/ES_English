import { Skeleton } from "antd";
import React from "react";

interface IProps {
  isLoading: boolean;
}

function SkeletonLoading(props: IProps) {
  const { isLoading } = props;
  return <Skeleton loading={isLoading} active />;
}

export default SkeletonLoading;
