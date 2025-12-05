import { Typography } from "antd";
import { TitleProps } from "antd/es/typography/Title";
import React from "react";

const { Title } = Typography;

interface IProps extends TitleProps {
  children: React.ReactNode;
}

function ATitle(props: IProps) {
  const { children, ...orther } = props;
  return (
    <Title style={{ margin: 0 }} {...orther}>
      {children}
    </Title>
  );
}

export default ATitle;
