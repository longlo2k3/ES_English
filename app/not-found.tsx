"use client";
import React from "react";
import { Button, Flex, Result, Layout } from "antd";

const NotFound: React.FC = () => (
  <Layout style={{ height: "100vh" }}>
    <Flex vertical align="center" justify="center" style={{ height: "100vh" }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" href="/home">
            Back Home
          </Button>
        }
      />
    </Flex>
  </Layout>
);

export default NotFound;
