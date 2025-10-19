import React from "react";
import { Carousel, Image } from "antd";
import { useResponsive } from "antd-style";

function Banner() {
  return (
    <Carousel
      style={{ maxWidth: 650 }}
      autoplay={{ dotDuration: true }}
      adaptiveHeight={true}
      autoplaySpeed={5000}>
      <div
        style={{
          borderRadius: 12,
        }}>
        <Image
          src="/tienganh6.jpg"
          alt="Banner tiếng anh"
          width={"100%"}
          height={500}
          preview={false}
          style={{
            borderRadius: 12,
          }}
        />
      </div>
      <div
        style={{
          borderRadius: 12,
        }}>
        <Image
          src="/tienganh5.jpg"
          alt="Banner tiếng anh"
          width={"100%"}
          height={500}
          preview={false}
          style={{
            borderRadius: 12,
          }}
        />
      </div>
      <div
        style={{
          borderRadius: 12,
        }}>
        <Image
          src="/tienganh4.jpg"
          alt="Banner tiếng anh"
          width={"100%"}
          height={500}
          preview={false}
          style={{
            borderRadius: 12,
          }}
        />
      </div>
    </Carousel>
  );
}

export default Banner;
