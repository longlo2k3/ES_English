import { Empty, Table, TableProps } from "antd";
import React from "react";

function ATable(props: TableProps) {
  return <Table bordered {...props} />;
}

export default ATable;
