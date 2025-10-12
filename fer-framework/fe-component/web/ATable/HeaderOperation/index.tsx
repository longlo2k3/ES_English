import { Flex, Input, Space } from "antd";
import React from "react";

interface IProps {
  add?: React.ReactNode;
}

function HeaderOperation({ add }: IProps) {
  return (
    <Flex justify="space-between" align="center" style={{ width: "100%" }}>
      <div style={{ flex: 1, paddingRight: 8 }}>
        <Input.Search placeholder="Nội dung tìm kiếm" allowClear />
      </div>
      <div style={{ flex: 2, paddingLeft: 8, textAlign: "right" }}>
        {add && add}
      </div>
    </Flex>
  );
}

export default HeaderOperation;
