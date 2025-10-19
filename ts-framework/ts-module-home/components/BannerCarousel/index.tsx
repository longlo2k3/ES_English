import { Flex } from "antd";
import React from "react";
import Banner from "./Banner";
import IntroText from "./IntroText";
import { useResponsive } from "antd-style";

function BannerCarousel() {
  const { md, lg, xl } = useResponsive();
  return (
    <Flex vertical={!xl} gap={!xl ? 16 : 32} justify="center" align="center">
      {md && (
        <Flex vertical flex={1} gap={8} justify="center">
          <Banner />
        </Flex>
      )}
      <Flex vertical flex={1} gap={8} justify="center">
        <IntroText />
      </Flex>
    </Flex>
  );
}

export default BannerCarousel;
