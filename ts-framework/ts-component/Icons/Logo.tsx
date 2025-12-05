import React from "react";

interface LogoIconProps {
  width?: number;
  height?: number;
}

function LogoIcon({ width = 60, height = 60 }: LogoIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 60 60">
      <defs>
        <pattern
          id="imgPattern"
          patternUnits="userSpaceOnUse"
          width={width}
          height={height}>
          <image href="/logo.png" x="0" y="0" width={width} height={height} />
        </pattern>
      </defs>

      <rect
        width={width}
        height={height}
        x="10"
        y="10"
        rx="20"
        ry="20"
        fill="url(#imgPattern)"
      />

      <text
        x="50%"
        y="115"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill="url(#imgPattern)">
        SVG
      </text>
    </svg>
  );
}

export default LogoIcon;
